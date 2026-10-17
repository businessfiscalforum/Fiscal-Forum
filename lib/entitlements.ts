import { db } from "../config/db";
import { purchaseEntitlementsTable, paymentAttemptsTable } from "../config/schema";
import { eq, and } from "drizzle-orm";
import { getRazorpayInstance } from "./razorpay";
import { hasActiveSubscriptionForCategory } from "./subscriptions";

export class PaymentReconciliationError extends Error {
  code: string;
  status: number;
  paymentStatus?: string;

  constructor(message: string, code: string, status: number = 400, paymentStatus?: string) {
    super(message);
    this.name = "PaymentReconciliationError";
    this.code = code;
    this.status = status;
    this.paymentStatus = paymentStatus;
  }
}

export interface ReconcilePaymentParams {
  orderId: string;
  paymentId: string;
  signature?: string;
  expectedClerkUserId?: string;
  expectedReportId?: string;
}

export interface ReconciledPaymentResult {
  orderId: string;
  paymentId: string;
  clerkUserId: string;
  userEmail: string;
  reportId: string;
  amount: number;
  currency: string;
}

/**
 * Authorizes report access under the Universal Subscription-Only access model:
 * 1. Verified Clerk ADMIN privilege -> true (ADMIN)
 * 2. Active, non-expired subscription covering category -> true (SUBSCRIBED)
 * 3. Historical single purchases -> NO LONGER GRANTS ACCESS. All customers must subscribe.
 * 4. Otherwise -> false (SUBSCRIPTION_REQUIRED)
 */
export async function hasReportAccess(
  clerkUserId: string | null | undefined,
  userRole: string | undefined,
  reportType?: string | null
): Promise<{ hasAccess: boolean; reason: "ADMIN" | "SUBSCRIBED" | "SUBSCRIPTION_REQUIRED" }> {
  // 1. Verified Admin privilege
  if (userRole === "ADMIN") {
    return { hasAccess: true, reason: "ADMIN" };
  }

  if (!clerkUserId || typeof clerkUserId !== "string") {
    return { hasAccess: false, reason: "SUBSCRIPTION_REQUIRED" };
  }

  // 2. Identify report category
  const normalizedType = (reportType || "").toLowerCase();
  const isPreMarket = normalizedType.includes("pre-market");
  const isWeekly = normalizedType.includes("weekly");

  if (!isPreMarket && !isWeekly) {
    return { hasAccess: false, reason: "SUBSCRIPTION_REQUIRED" };
  }

  const category: "PRE_MARKET" | "WEEKLY" = isPreMarket ? "PRE_MARKET" : "WEEKLY";

  // 3. Strictly verify active subscription in user_subscriptions
  const isSubscribed = await hasActiveSubscriptionForCategory(clerkUserId, category);

  if (isSubscribed) {
    return { hasAccess: true, reason: "SUBSCRIBED" };
  }

  return { hasAccess: false, reason: "SUBSCRIPTION_REQUIRED" };
}

/**
 * Checks whether a user owns an active purchase entitlement for a given report.
 * Strictly checks `clerkUserId + reportId`.
 * Never authorizes access based on email matching alone.
 */
export async function hasPurchasedReport(
  clerkUserId: string,
  reportIdOrEmail: string,
  optionalReportId?: string
): Promise<boolean> {
  // Support both (clerkUserId, reportId) and legacy (clerkUserId, userEmail, reportId)
  const reportId = optionalReportId || reportIdOrEmail;

  if (
    !clerkUserId ||
    typeof clerkUserId !== "string" ||
    !reportId ||
    typeof reportId !== "string"
  ) {
    return false;
  }

  // Query database strictly by clerkUserId and reportId
  const existing = await db
    .select({ id: purchaseEntitlementsTable.id })
    .from(purchaseEntitlementsTable)
    .where(
      and(
        eq(purchaseEntitlementsTable.clerkUserId, clerkUserId),
        eq(purchaseEntitlementsTable.reportId, reportId),
        eq(purchaseEntitlementsTable.status, "ACTIVE")
      )
    )
    .limit(1);

  return existing.length > 0;
}

/**
 * Atomically grants a purchase entitlement to a user with conflict handling.
 * Ensures idempotency and prevents race conditions or duplicate entitlement records.
 */
export async function grantPurchaseEntitlement(params: {
  clerkUserId: string;
  userEmail: string;
  reportId: string;
  orderId: string;
  paymentId: string;
  amount: number;
}): Promise<void> {
  const { clerkUserId, userEmail, reportId, orderId, paymentId, amount } = params;

  if (!clerkUserId || !reportId || !orderId || !paymentId) {
    throw new Error("Missing required parameters to grant purchase entitlement.");
  }

  await db
    .insert(purchaseEntitlementsTable)
    .values({
      clerkUserId,
      userEmail: userEmail || "",
      reportId,
      orderId,
      paymentId,
      amount,
      status: "ACTIVE",
    })
    .onConflictDoNothing({
      target: [purchaseEntitlementsTable.clerkUserId, purchaseEntitlementsTable.reportId],
    });
}

/**
 * Shared, idempotent payment reconciliation and entitlement creation function.
 * Used by both browser payment verification and Razorpay webhook processing.
 *
 * Requirements enforced:
 * 1. Payment attempt record must exist in the database.
 * 2. If expectedClerkUserId is provided, it must match the attempt's clerkUserId.
 * 3. If expectedReportId is provided, it must match the attempt's reportId.
 * 4. Payment is verified via the Razorpay Server API.
 * 5. Payment ID must match.
 * 6. Payment order_id must match stored attempt order_id.
 * 7. Payment status must strictly be 'captured' (authorized or failed payments are rejected).
 * 8. Payment amount in paise must match stored attempt amount.
 * 9. Payment currency must match stored attempt currency.
 * 10. Database changes (updating payment attempt to 'paid' and granting entitlement) are atomic.
 * 11. Entitlement creation uses onConflictDoNothing on [clerkUserId, reportId] to guarantee idempotency.
 */
export async function reconcilePaymentAndGrantAccess(
  params: ReconcilePaymentParams
): Promise<ReconciledPaymentResult> {
  const { orderId, paymentId, signature, expectedClerkUserId, expectedReportId } = params;

  if (!orderId || !paymentId) {
    throw new PaymentReconciliationError(
      "Missing required orderId or paymentId for reconciliation.",
      "MISSING_PARAMETERS",
      400
    );
  }

  // 1. Fetch stored payment attempt
  const [attempt] = await db
    .select()
    .from(paymentAttemptsTable)
    .where(eq(paymentAttemptsTable.orderId, orderId))
    .limit(1);

  if (!attempt) {
    throw new PaymentReconciliationError(
      `Payment attempt record not found for order ${orderId}.`,
      "ORDER_NOT_FOUND",
      404
    );
  }

  // 2. Validate ownership if expectedClerkUserId is specified (browser verification)
  if (expectedClerkUserId && attempt.clerkUserId !== expectedClerkUserId) {
    throw new PaymentReconciliationError(
      "Forbidden: This order does not belong to the authenticated user.",
      "FORBIDDEN_USER",
      403
    );
  }

  // 3. Validate report if expectedReportId is specified
  if (expectedReportId && attempt.reportId !== expectedReportId) {
    throw new PaymentReconciliationError(
      "Order does not match the requested report.",
      "REPORT_MISMATCH",
      400
    );
  }

  // 4. Query payment directly from Razorpay API
  const razorpay = getRazorpayInstance();
  const payment = await razorpay.payments.fetch(paymentId);

  if (!payment) {
    throw new PaymentReconciliationError(
      `Payment ${paymentId} could not be retrieved from Razorpay.`,
      "PAYMENT_NOT_FOUND",
      404
    );
  }

  // 5. Verify payment ID
  if (payment.id !== paymentId) {
    throw new PaymentReconciliationError(
      "Payment ID mismatch.",
      "PAYMENT_ID_MISMATCH",
      400
    );
  }

  // 6. Verify associated order ID
  if (payment.order_id !== orderId) {
    throw new PaymentReconciliationError(
      "Payment is not associated with this order.",
      "ORDER_MISMATCH",
      400
    );
  }

  // 7. Strictly require captured payment status (never grant access on 'authorized' or 'failed')
  if (payment.status !== "captured") {
    throw new PaymentReconciliationError(
      `Payment is currently in '${payment.status}' status. Access is only unlocked once payment is captured.`,
      "PAYMENT_NOT_CAPTURED",
      400,
      payment.status
    );
  }

  // 8. Verify amount in paise matches stored attempt amount
  if (Number(payment.amount) !== Number(attempt.amount)) {
    throw new PaymentReconciliationError(
      "Captured payment amount does not match the expected order amount.",
      "AMOUNT_MISMATCH",
      400
    );
  }

  // 9. Verify currency matches
  if (payment.currency?.toUpperCase() !== attempt.currency?.toUpperCase()) {
    throw new PaymentReconciliationError(
      "Payment currency does not match the order currency.",
      "CURRENCY_MISMATCH",
      400
    );
  }

  // 10. Execute atomic database update and entitlement grant
  type DbOrTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0] | typeof db;
  const executeAtomicUpdates = async (tx: DbOrTransaction) => {
    await tx
      .update(paymentAttemptsTable)
      .set({
        status: "paid",
        paymentId,
        ...(signature ? { signature } : {}),
      })
      .where(eq(paymentAttemptsTable.orderId, orderId));

    await tx
      .insert(purchaseEntitlementsTable)
      .values({
        clerkUserId: attempt.clerkUserId,
        userEmail: attempt.userEmail,
        reportId: attempt.reportId,
        orderId,
        paymentId,
        amount: attempt.amount,
        status: "ACTIVE",
      })
      .onConflictDoNothing({
        target: [purchaseEntitlementsTable.clerkUserId, purchaseEntitlementsTable.reportId],
      });
  };

  if (typeof db.transaction === "function") {
    await db.transaction(executeAtomicUpdates);
  } else {
    await executeAtomicUpdates(db);
  }

  return {
    orderId,
    paymentId,
    clerkUserId: attempt.clerkUserId,
    userEmail: attempt.userEmail,
    reportId: attempt.reportId,
    amount: attempt.amount,
    currency: attempt.currency,
  };
}
