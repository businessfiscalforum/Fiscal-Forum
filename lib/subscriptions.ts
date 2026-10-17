import { addMonths } from "date-fns";
import { db } from "../config/db";
import {
  subscriptionPaymentAttemptsTable,
  userSubscriptionsTable,
} from "../config/schema";
import { eq, and, gt, desc } from "drizzle-orm";
import { getRazorpayInstance } from "./razorpay";

export type AccessScope = "PRE_MARKET" | "WEEKLY" | "COMBINATION";
export type PlanDurationMonths = 1 | 3 | 6;

export interface SubscriptionPlanConfig {
  id: string;
  title: string;
  scope: AccessScope;
  durations: Record<
    PlanDurationMonths,
    {
      months: PlanDurationMonths;
      priceInRupees: number;
      priceInPaise: number;
    }
  >;
}

/**
 * Canonical 9 subscription plan configurations across Fiscal Forum.
 * Amounts are strictly server-controlled and stored in paise.
 */
export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlanConfig> = {
  pre_market: {
    id: "pre_market",
    title: "Pre-Market Reports",
    scope: "PRE_MARKET",
    durations: {
      1: { months: 1, priceInRupees: 119, priceInPaise: 11900 },
      3: { months: 3, priceInRupees: 299, priceInPaise: 29900 },
      6: { months: 6, priceInRupees: 569, priceInPaise: 56900 },
    },
  },
  weekly: {
    id: "weekly",
    title: "Weekly Market Reports",
    scope: "WEEKLY",
    durations: {
      1: { months: 1, priceInRupees: 89, priceInPaise: 8900 },
      3: { months: 3, priceInRupees: 199, priceInPaise: 19900 },
      6: { months: 6, priceInRupees: 499, priceInPaise: 49900 },
    },
  },
  combination: {
    id: "combination",
    title: "Pre-Market + Weekly Reports",
    scope: "COMBINATION",
    durations: {
      1: { months: 1, priceInRupees: 169, priceInPaise: 16900 },
      3: { months: 3, priceInRupees: 399, priceInPaise: 39900 },
      6: { months: 6, priceInRupees: 649, priceInPaise: 64900 },
    },
  },
} as const;

export class SubscriptionError extends Error {
  code: string;
  status: number;
  constructor(message: string, code: string, status: number = 400) {
    super(message);
    this.name = "SubscriptionError";
    this.code = code;
    this.status = status;
  }
}

/**
 * Validates and retrieves the canonical plan and duration configuration.
 */
export function getSubscriptionPlan(
  planId: string,
  durationMonths: number
): {
  plan: SubscriptionPlanConfig;
  durationConfig: { months: PlanDurationMonths; priceInRupees: number; priceInPaise: number };
} {
  const normalizedPlanId = (planId || "").trim().toLowerCase().replace(/-/g, "_");
  const plan = SUBSCRIPTION_PLANS[normalizedPlanId];
  if (!plan) {
    throw new SubscriptionError(
      `Invalid subscription plan: '${planId}'. Supported plans: pre_market, weekly, combination.`,
      "INVALID_PLAN",
      400
    );
  }

  const duration = plan.durations[durationMonths as PlanDurationMonths];
  if (!duration) {
    throw new SubscriptionError(
      `Invalid duration: '${durationMonths}' months for plan '${plan.title}'. Available: 1, 3, or 6 months.`,
      "INVALID_DURATION",
      400
    );
  }

  return { plan, durationConfig: duration };
}

/**
 * Calculates start and expiry dates using calendar-month arithmetic.
 * Early renewal for the same access scope extends from current active expiry.
 */
export function calculateSubscriptionExpiry(
  now: Date,
  durationMonths: PlanDurationMonths,
  existingActiveExpiry?: Date | null
): { startDate: Date; expiryDate: Date } {
  if (existingActiveExpiry && new Date(existingActiveExpiry) > now) {
    // Early renewal: extend seamlessly from existing expiry date
    return {
      startDate: now,
      expiryDate: addMonths(new Date(existingActiveExpiry), durationMonths),
    };
  }

  // New subscription or renewal after expiry
  return {
    startDate: now,
    expiryDate: addMonths(now, durationMonths),
  };
}

/**
 * Checks whether an authenticated user has an active, non-expired subscription for a given report category.
 */
export async function hasActiveSubscriptionForCategory(
  clerkUserId: string,
  category: "PRE_MARKET" | "WEEKLY"
): Promise<boolean> {
  if (!clerkUserId || typeof clerkUserId !== "string") {
    return false;
  }

  const now = new Date();
  const allowedScopes: AccessScope[] =
    category === "PRE_MARKET"
      ? ["PRE_MARKET", "COMBINATION"]
      : ["WEEKLY", "COMBINATION"];

  try {
    const activeSubs = await db
      .select({ id: userSubscriptionsTable.id, scope: userSubscriptionsTable.accessScope })
      .from(userSubscriptionsTable)
      .where(
        and(
          eq(userSubscriptionsTable.clerkUserId, clerkUserId),
          eq(userSubscriptionsTable.status, "ACTIVE"),
          gt(userSubscriptionsTable.expiryDate, now)
        )
      );

    const subsList = Array.isArray(activeSubs) ? activeSubs : [];
    return subsList.some((sub: { id: string; scope?: string; accessScope?: string }) => {
      const scope = (sub.scope || sub.accessScope) as AccessScope;
      return allowedScopes.includes(scope);
    });
  } catch (err) {
    console.error("Error checking active subscription:", err);
    return false;
  }
}

/**
 * Fetches user subscription details and full purchase history.
 */
export async function getUserSubscriptionDetails(clerkUserId: string) {
  if (!clerkUserId) return { activeSubscriptions: [], history: [] };

  const now = new Date();

  const allRecords = await db
    .select()
    .from(userSubscriptionsTable)
    .where(eq(userSubscriptionsTable.clerkUserId, clerkUserId))
    .orderBy(desc(userSubscriptionsTable.createdAt));

  const activeSubscriptions = allRecords.filter(
    (sub) => sub.status === "ACTIVE" && new Date(sub.expiryDate) > now
  );

  return {
    activeSubscriptions,
    history: allRecords,
  };
}

/**
 * Reconciles subscription payment independently via Razorpay API and activates entitlement.
 * Resolves purchase strictly through server-side database attempt record.
 */
export async function reconcileSubscriptionPayment(params: {
  orderId: string;
  paymentId: string;
  signature?: string;
  expectedClerkUserId?: string;
}) {
  const { orderId, paymentId, signature, expectedClerkUserId } = params;

  if (!orderId || !paymentId) {
    throw new SubscriptionError(
      "Missing required orderId or paymentId.",
      "MISSING_PARAMETERS",
      400
    );
  }

  // 1. Fetch server-side attempt record
  const [attempt] = await db
    .select()
    .from(subscriptionPaymentAttemptsTable)
    .where(eq(subscriptionPaymentAttemptsTable.orderId, orderId))
    .limit(1);

  if (!attempt) {
    throw new SubscriptionError(
      `Subscription order '${orderId}' not found.`,
      "ORDER_NOT_FOUND",
      404
    );
  }

  // 2. Validate user ownership if specified (browser verification)
  if (expectedClerkUserId && attempt.clerkUserId !== expectedClerkUserId) {
    throw new SubscriptionError(
      "Order does not belong to the authenticated user.",
      "FORBIDDEN_USER",
      403
    );
  }

  // 3. Check if this exact paymentId has already activated an entitlement
  const [existingPayment] = await db
    .select()
    .from(userSubscriptionsTable)
    .where(eq(userSubscriptionsTable.paymentId, paymentId))
    .limit(1);

  if (existingPayment) {
    // Already processed idempotently
    return {
      orderId,
      paymentId,
      clerkUserId: attempt.clerkUserId,
      planId: attempt.planId,
      accessScope: attempt.accessScope,
      startDate: existingPayment.startDate,
      expiryDate: existingPayment.expiryDate,
      alreadyProcessed: true,
    };
  }

  // 4. Fetch payment details directly from Razorpay API
  const razorpay = getRazorpayInstance();
  const payment = await razorpay.payments.fetch(paymentId);

  if (!payment) {
    throw new SubscriptionError(
      `Payment '${paymentId}' could not be retrieved from Razorpay.`,
      "PAYMENT_NOT_FOUND",
      404
    );
  }

  // 5. Verify payment properties
  if (payment.id !== paymentId) {
    throw new SubscriptionError("Payment ID mismatch.", "PAYMENT_ID_MISMATCH", 400);
  }

  if (payment.order_id !== orderId) {
    throw new SubscriptionError("Payment order_id mismatch.", "ORDER_MISMATCH", 400);
  }

  if (payment.status !== "captured") {
    throw new SubscriptionError(
      `Payment is currently in '${payment.status}' status. Access is only unlocked when captured.`,
      "PAYMENT_NOT_CAPTURED",
      400
    );
  }

  if (Number(payment.amount) !== Number(attempt.amount)) {
    throw new SubscriptionError("Payment amount mismatch.", "AMOUNT_MISMATCH", 400);
  }

  if (payment.currency?.toUpperCase() !== attempt.currency?.toUpperCase()) {
    throw new SubscriptionError("Payment currency mismatch.", "CURRENCY_MISMATCH", 400);
  }

  // 6. Calculate calendar expiry
  // Check for any currently active subscription of the same access scope to support early renewal extension
  const now = new Date();
  const activeSubs = await db
    .select()
    .from(userSubscriptionsTable)
    .where(
      and(
        eq(userSubscriptionsTable.clerkUserId, attempt.clerkUserId),
        eq(userSubscriptionsTable.accessScope, attempt.accessScope),
        eq(userSubscriptionsTable.status, "ACTIVE"),
        gt(userSubscriptionsTable.expiryDate, now)
      )
    )
    .orderBy(desc(userSubscriptionsTable.expiryDate))
    .limit(1);

  const existingActiveExpiry = activeSubs.length > 0 ? activeSubs[0].expiryDate : null;
  const { startDate, expiryDate } = calculateSubscriptionExpiry(
    now,
    attempt.durationMonths as PlanDurationMonths,
    existingActiveExpiry
  );

  // 7. Atomic database updates
  type DbOrTx = Parameters<Parameters<typeof db.transaction>[0]>[0] | typeof db;
  const executeUpdates = async (tx: DbOrTx) => {
    await tx
      .update(subscriptionPaymentAttemptsTable)
      .set({
        status: "paid",
        paymentId,
        ...(signature ? { signature } : {}),
      })
      .where(eq(subscriptionPaymentAttemptsTable.orderId, orderId));

    await tx
      .insert(userSubscriptionsTable)
      .values({
        clerkUserId: attempt.clerkUserId,
        customerEmail: attempt.customerEmail,
        planId: attempt.planId,
        durationMonths: attempt.durationMonths,
        accessScope: attempt.accessScope,
        amount: attempt.amount,
        orderId,
        paymentId,
        startDate,
        expiryDate,
        status: "ACTIVE",
      })
      .onConflictDoNothing();
  };

  if (typeof db.transaction === "function") {
    await db.transaction(executeUpdates);
  } else {
    await executeUpdates(db);
  }

  return {
    orderId,
    paymentId,
    clerkUserId: attempt.clerkUserId,
    planId: attempt.planId,
    accessScope: attempt.accessScope,
    startDate,
    expiryDate,
    alreadyProcessed: false,
  };
}
