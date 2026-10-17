/**
 * Fiscal Forum - Universal Subscription-Only Access Model & Customized Reports Test Suite
 *
 * Verifies:
 * 1. Nine canonical subscription plans (strictly server-controlled prices in paise).
 * 2. Calendar-month arithmetic and early renewal extension math.
 * 3. Complete discontinuation of ₹49/₹99 single-report purchases (410 Gone).
 * 4. Universal subscription access enforcement:
 *    - Historical single-report purchasers DENIED ongoing report access.
 *    - Admin users GRANTED verified access.
 *    - Active subscribers GRANTED access based on scope (Pre-Market, Weekly, Combination).
 *    - Expired subscribers DENIED access.
 * 5. Customized Reports ₹599 (59,900 paise) order flow & 5-category normalization.
 * 6. Cryptographic payment & webhook signature verification.
 */

import crypto from "crypto";
import { addMonths } from "date-fns";

// --- Integration Boundary Mocks Setup ---

process.env.RAZORPAY_KEY_SECRET = "test_razorpay_secret_fiscalforum";
process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret_fiscalforum";
process.env.DATABASE_URL = "postgresql://mock_user:mock_pass@localhost:5432/mock_db";

// 1. Mock server-only so Node.js can import Next.js server modules during tests
try {
  const serverOnlyPath = require.resolve("server-only");
  require.cache[serverOnlyPath] = {
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    exports: {},
  } as any;
} catch {
  // Ignore
}

// 2. In-Memory Database Store for Testing
interface UserSubscriptionRow {
  id: string;
  clerkUserId: string;
  customerEmail: string;
  planId: string;
  accessScope: "PRE_MARKET" | "WEEKLY" | "COMBINATION";
  durationMonths: number;
  startDate: Date;
  expiryDate: Date;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  orderId: string;
  paymentId: string;
  amount: number;
  createdAt: Date;
}

interface HistoricalEntitlementRow {
  id: string;
  clerkUserId: string;
  userEmail: string;
  reportId: string;
  orderId: string;
  paymentId: string;
  amount: number;
  status: string;
  createdAt: Date;
}

const mockDbStore = {
  userSubscriptions: [] as UserSubscriptionRow[],
  historicalEntitlements: [] as HistoricalEntitlementRow[],
};

function getDrizzleTableName(table: any): string {
  if (!table) return "";
  const sym = Object.getOwnPropertySymbols(table).find((s) => s.description === "drizzle:Name");
  return sym ? table[sym] : "";
}

function extractSqlConditions(sqlObj: any): Record<string, any> {
  const result: Record<string, any> = {};
  if (!sqlObj || !sqlObj.queryChunks) return result;

  function walk(chunks: any[]) {
    let lastColumn: string | undefined;
    for (const chunk of chunks) {
      if (!chunk) continue;
      if (typeof chunk === "object") {
        if ("name" in chunk && "table" in chunk) {
          lastColumn = chunk.name;
        } else if (chunk.constructor && chunk.constructor.name === "Param" && lastColumn) {
          result[lastColumn] = chunk.value;
          lastColumn = undefined;
        } else if ("queryChunks" in chunk) {
          walk(chunk.queryChunks);
        }
      }
    }
  }

  walk(sqlObj.queryChunks);
  return result;
}

// Build Drizzle-compatible mock database client
const mockDrizzleDb = {
  select: (_fields?: any) => ({
    from: (table: any) => ({
      where: (condition: any) => {
        const tableName = getDrizzleTableName(table);
        const conds = extractSqlConditions(condition);

        if (tableName === "user_subscriptions") {
          const now = new Date();
          const results = mockDbStore.userSubscriptions
            .filter((sub) => {
              if (conds.clerk_user_id && sub.clerkUserId !== conds.clerk_user_id) return false;
              if (conds.status && sub.status !== conds.status) return false;
              if (conds.expiry_date && sub.expiryDate <= conds.expiry_date) return false;
              if (sub.expiryDate <= now) return false;
              return true;
            })
            .map((sub) => ({
              id: sub.id,
              scope: sub.accessScope,
              accessScope: sub.accessScope,
              clerkUserId: sub.clerkUserId,
              status: sub.status,
              expiryDate: sub.expiryDate,
              durationMonths: sub.durationMonths,
              amount: sub.amount,
              createdAt: sub.createdAt,
            }));
          return {
            orderBy: () => Promise.resolve(results),
            then: (resolve: any) => resolve(results),
            [Symbol.iterator]: () => results[Symbol.iterator](),
          };
        }

        if (tableName === "purchase_entitlements") {
          const results = mockDbStore.historicalEntitlements.filter((ent) => {
            if (conds.clerk_user_id && ent.clerkUserId !== conds.clerk_user_id) return false;
            if (conds.report_id && ent.reportId !== conds.report_id) return false;
            return true;
          });
          return {
            limit: async () => results,
            then: (resolve: any) => resolve(results),
          };
        }

        return Promise.resolve([]);
      },
      orderBy: () => Promise.resolve(mockDbStore.userSubscriptions),
    }),
  }),
};

// Inject mock into require.cache BEFORE loading database-dependent modules
const configDbPath = require.resolve("../config/db");
require.cache[configDbPath] = {
  id: configDbPath,
  filename: configDbPath,
  loaded: true,
  exports: { db: mockDrizzleDb },
} as any;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName}${detail ? ` - ${detail}` : ""}`);
  }
}

async function runTestSuite() {
  console.log("================================================================================");
  console.log("FISCAL FORUM: UNIVERSAL SUBSCRIPTION-ONLY MODEL & CUSTOMIZED REPORTS TESTS");
  console.log("================================================================================\n");

  // Dynamic import of modules after DB mock injection
  const {
    SUBSCRIPTION_PLANS,
    getSubscriptionPlan,
    calculateSubscriptionExpiry,
    SubscriptionError,
  } = await import("../lib/subscriptions");

  const {
    CUSTOM_REPORT_PRICE,
    validateCustomReportCategory,
    CustomReportError,
  } = await import("../lib/customReports");

  const {
    verifyPaymentSignature,
    verifyWebhookSignature,
  } = await import("../lib/razorpay");

  const { hasReportAccess } = await import("../lib/entitlements");

  // ---------------------------------------------------------------------------
  // TEST SUITE 1: Canonical Nine Subscription Plans & Matrix
  // ---------------------------------------------------------------------------
  console.log("[1] Nine Approved Subscription Plans & Pricing Matrix");

  const plans = Object.keys(SUBSCRIPTION_PLANS);
  assert(plans.length === 3, "Exactly 3 distinct subscription plans configured", `Found ${plans.length}`);
  assert(plans.includes("pre_market"), "Pre-Market plan exists");
  assert(plans.includes("weekly"), "Weekly Market plan exists");
  assert(plans.includes("combination"), "Combination plan exists");

  // Pre-Market Plan Checks
  const pm1 = getSubscriptionPlan("pre_market", 1);
  assert(pm1.durationConfig.priceInRupees === 119 && pm1.durationConfig.priceInPaise === 11900, "Pre-Market 1 Month = ₹119 (11,900 paise)");
  const pm3 = getSubscriptionPlan("pre_market", 3);
  assert(pm3.durationConfig.priceInRupees === 299 && pm3.durationConfig.priceInPaise === 29900, "Pre-Market 3 Months = ₹299 (29,900 paise)");
  const pm6 = getSubscriptionPlan("pre_market", 6);
  assert(pm6.durationConfig.priceInRupees === 569 && pm6.durationConfig.priceInPaise === 56900, "Pre-Market 6 Months = ₹569 (56,900 paise)");

  // Weekly Market Plan Checks
  const wk1 = getSubscriptionPlan("weekly", 1);
  assert(wk1.durationConfig.priceInRupees === 89 && wk1.durationConfig.priceInPaise === 8900, "Weekly Market 1 Month = ₹89 (8,900 paise)");
  const wk3 = getSubscriptionPlan("weekly", 3);
  assert(wk3.durationConfig.priceInRupees === 199 && wk3.durationConfig.priceInPaise === 19900, "Weekly Market 3 Months = ₹199 (19,900 paise)");
  const wk6 = getSubscriptionPlan("weekly", 6);
  assert(wk6.durationConfig.priceInRupees === 499 && wk6.durationConfig.priceInPaise === 49900, "Weekly Market 6 Months = ₹499 (49,900 paise)");

  // Combination Plan Checks
  const cb1 = getSubscriptionPlan("combination", 1);
  assert(cb1.durationConfig.priceInRupees === 169 && cb1.durationConfig.priceInPaise === 16900, "Combination 1 Month = ₹169 (16,900 paise)");
  const cb3 = getSubscriptionPlan("combination", 3);
  assert(cb3.durationConfig.priceInRupees === 399 && cb3.durationConfig.priceInPaise === 39900, "Combination 3 Months = ₹399 (39,900 paise)");
  const cb6 = getSubscriptionPlan("combination", 6);
  assert(cb6.durationConfig.priceInRupees === 649 && cb6.durationConfig.priceInPaise === 64900, "Combination 6 Months = ₹649 (64,900 paise)");

  // Plan Normalization & Invalid Input Rejection
  assert(getSubscriptionPlan("PRE-MARKET", 1).plan.id === "pre_market", "Normalizes uppercase/hyphenated 'PRE-MARKET'");
  assert(getSubscriptionPlan("pre_market", 1).plan.scope === "PRE_MARKET", "Pre-Market has PRE_MARKET scope");
  assert(getSubscriptionPlan("weekly", 1).plan.scope === "WEEKLY", "Weekly has WEEKLY scope");
  assert(getSubscriptionPlan("combination", 1).plan.scope === "COMBINATION", "Combination has COMBINATION scope");

  let threwInvalidPlan = false;
  try {
    getSubscriptionPlan("crypto_insider", 1);
  } catch (err) {
    if (err instanceof SubscriptionError && err.code === "INVALID_PLAN") threwInvalidPlan = true;
  }
  assert(threwInvalidPlan, "Rejects unknown subscription plan name");

  let threwInvalidDuration = false;
  try {
    getSubscriptionPlan("pre_market", 12);
  } catch (err) {
    if (err instanceof SubscriptionError && err.code === "INVALID_DURATION") threwInvalidDuration = true;
  }
  assert(threwInvalidDuration, "Rejects unapproved subscription duration (12 months)");

  // ---------------------------------------------------------------------------
  // TEST SUITE 2: Calendar-Month Arithmetic & Early Renewal Extensions
  // ---------------------------------------------------------------------------
  console.log("\n[2] Calendar-Month Arithmetic & Early Renewal Math");

  const baseDate = new Date("2026-01-31T00:00:00Z");
  const plusOneMonth = addMonths(baseDate, 1);
  assert(
    plusOneMonth.getMonth() === 1 && plusOneMonth.getDate() === 28,
    "Calendar math handles January 31 + 1 month = February 28"
  );

  const leapBase = new Date("2028-01-31T00:00:00Z");
  const leapPlusOne = addMonths(leapBase, 1);
  assert(
    leapPlusOne.getMonth() === 1 && leapPlusOne.getDate() === 29,
    "Calendar math handles leap year January 31 + 1 month = February 29"
  );

  // New subscription expiry
  const now = new Date("2026-10-12T10:00:00Z");
  const newSub = calculateSubscriptionExpiry(now, 3);
  assert(
    newSub.expiryDate.toISOString() === addMonths(now, 3).toISOString(),
    "New 3-month subscription expires exactly 3 calendar months from purchase"
  );

  // Early renewal calculation: extends from existing active expiry
  const activeExpiry = new Date("2026-11-20T10:00:00Z");
  const earlyRenewal = calculateSubscriptionExpiry(now, 6, activeExpiry);
  assert(
    earlyRenewal.expiryDate.toISOString() === addMonths(activeExpiry, 6).toISOString(),
    "Early renewal extends seamlessly from active expiry date, NOT from today"
  );

  // Post-expiry renewal: extends from now, NOT from old expired date
  const pastExpiry = new Date("2026-08-01T10:00:00Z");
  const postExpiryRenewal = calculateSubscriptionExpiry(now, 1, pastExpiry);
  assert(
    postExpiryRenewal.expiryDate.toISOString() === addMonths(now, 1).toISOString(),
    "Renewal after expiration starts from now, not from old expired date"
  );

  // ---------------------------------------------------------------------------
  // TEST SUITE 3: Discontinuation of ₹49/₹99 Single Purchases (410 Gone)
  // ---------------------------------------------------------------------------
  console.log("\n[3] Complete Discontinuation of Single-Report Purchase Endpoints");

  // Dynamically invoke app/api/checkout/create-order route POST
  const createOrderModule = await import("../app/api/checkout/create-order/route");
  const createOrderResponse = await createOrderModule.POST();
  const createOrderJson = await createOrderResponse.json();

  assert(
    createOrderResponse.status === 410,
    "POST /api/checkout/create-order returns HTTP 410 Gone"
  );
  assert(
    createOrderJson.code === "DISCONTINUED_PURCHASE_FLOW",
    "Returns code DISCONTINUED_PURCHASE_FLOW"
  );
  assert(
    createOrderJson.subscribeUrl === "/reports/join",
    "Redirects customers to /reports/join subscription page"
  );

  // ---------------------------------------------------------------------------
  // TEST SUITE 4: Universal Subscription-Only Report Access Control
  // ---------------------------------------------------------------------------
  console.log("\n[4] Universal Subscription-Only Report Access Enforcement");

  // 4.1 Unauthenticated customer
  const unauthAccess = await hasReportAccess(null, undefined, "Pre-Market Research Report");
  assert(!unauthAccess.hasAccess && unauthAccess.reason === "SUBSCRIPTION_REQUIRED", "Unauthenticated user denied with SUBSCRIPTION_REQUIRED");

  // 4.2 Verified Clerk ADMIN access
  const adminAccess = await hasReportAccess("user_admin_123", "ADMIN", "Pre-Market Research Report");
  assert(adminAccess.hasAccess && adminAccess.reason === "ADMIN", "Verified Admin granted access without subscription");

  // 4.3 Historical single-purchase customer without active subscription
  // Populate historical single-report entitlement in mock db
  mockDbStore.historicalEntitlements.push({
    id: "ent_hist_1",
    clerkUserId: "user_historical_only",
    userEmail: "historical@example.com",
    reportId: "report_pm_1",
    orderId: "order_old_49",
    paymentId: "pay_old_49",
    amount: 4900,
    status: "ACTIVE",
    createdAt: new Date("2026-01-01"),
  });

  const historicalPurchaserAccess = await hasReportAccess("user_historical_only", "USER", "Pre-Market Research Report");
  assert(
    !historicalPurchaserAccess.hasAccess && historicalPurchaserAccess.reason === "SUBSCRIPTION_REQUIRED",
    "Historical single purchaser strictly DENIED ongoing report access (Universal subscription required)"
  );

  // 4.4 Active Pre-Market Subscriber
  mockDbStore.userSubscriptions.push({
    id: "sub_pm_1",
    clerkUserId: "user_subscriber_pm",
    customerEmail: "pm_sub@example.com",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    startDate: new Date(),
    expiryDate: addMonths(new Date(), 1),
    status: "ACTIVE",
    orderId: "order_sub_pm",
    paymentId: "pay_sub_pm",
    amount: 11900,
    createdAt: new Date(),
  });

  const pmSubAccessToPM = await hasReportAccess("user_subscriber_pm", "USER", "Pre-Market Research Report");
  assert(pmSubAccessToPM.hasAccess && pmSubAccessToPM.reason === "SUBSCRIBED", "Pre-Market subscriber GRANTED access to Pre-Market report");

  const pmSubAccessToWeekly = await hasReportAccess("user_subscriber_pm", "USER", "Weekly Research Report");
  assert(!pmSubAccessToWeekly.hasAccess && pmSubAccessToWeekly.reason === "SUBSCRIPTION_REQUIRED", "Pre-Market subscriber DENIED access to Weekly report");

  // 4.5 Active Weekly Subscriber
  mockDbStore.userSubscriptions.push({
    id: "sub_wk_1",
    clerkUserId: "user_subscriber_wk",
    customerEmail: "wk_sub@example.com",
    planId: "weekly",
    accessScope: "WEEKLY",
    durationMonths: 3,
    startDate: new Date(),
    expiryDate: addMonths(new Date(), 3),
    status: "ACTIVE",
    orderId: "order_sub_wk",
    paymentId: "pay_sub_wk",
    amount: 19900,
    createdAt: new Date(),
  });

  const wkSubAccessToWeekly = await hasReportAccess("user_subscriber_wk", "USER", "Weekly Research Report");
  assert(wkSubAccessToWeekly.hasAccess && wkSubAccessToWeekly.reason === "SUBSCRIBED", "Weekly subscriber GRANTED access to Weekly report");

  const wkSubAccessToPM = await hasReportAccess("user_subscriber_wk", "USER", "Pre-Market Research Report");
  assert(!wkSubAccessToPM.hasAccess && wkSubAccessToPM.reason === "SUBSCRIPTION_REQUIRED", "Weekly subscriber DENIED access to Pre-Market report");

  // 4.6 Active Combination Subscriber (Both Scopes)
  mockDbStore.userSubscriptions.push({
    id: "sub_combo_1",
    clerkUserId: "user_subscriber_combo",
    customerEmail: "combo_sub@example.com",
    planId: "combination",
    accessScope: "COMBINATION",
    durationMonths: 6,
    startDate: new Date(),
    expiryDate: addMonths(new Date(), 6),
    status: "ACTIVE",
    orderId: "order_sub_combo",
    paymentId: "pay_sub_combo",
    amount: 64900,
    createdAt: new Date(),
  });

  const comboSubAccessPM = await hasReportAccess("user_subscriber_combo", "USER", "Pre-Market Research Report");
  assert(comboSubAccessPM.hasAccess && comboSubAccessPM.reason === "SUBSCRIBED", "Combination subscriber GRANTED access to Pre-Market report");

  const comboSubAccessWeekly = await hasReportAccess("user_subscriber_combo", "USER", "Weekly Research Report");
  assert(comboSubAccessWeekly.hasAccess && comboSubAccessWeekly.reason === "SUBSCRIBED", "Combination subscriber GRANTED access to Weekly report");

  // 4.7 Expired Subscriber
  mockDbStore.userSubscriptions.push({
    id: "sub_expired_1",
    clerkUserId: "user_subscriber_expired",
    customerEmail: "expired@example.com",
    planId: "combination",
    accessScope: "COMBINATION",
    durationMonths: 1,
    startDate: new Date("2026-08-01"),
    expiryDate: new Date("2026-09-01"), // Expired in past
    status: "ACTIVE",
    orderId: "order_sub_exp",
    paymentId: "pay_sub_exp",
    amount: 16900,
    createdAt: new Date("2026-08-01"),
  });

  const expiredSubAccess = await hasReportAccess("user_subscriber_expired", "USER", "Pre-Market Research Report");
  assert(!expiredSubAccess.hasAccess && expiredSubAccess.reason === "SUBSCRIPTION_REQUIRED", "Expired subscriber strictly DENIED access");

  // ---------------------------------------------------------------------------
  // TEST SUITE 5: Customized Reports (₹599 One-Time Payment & 5 Categories)
  // ---------------------------------------------------------------------------
  console.log("\n[5] Customized Reports Flow & Canonical Category Normalization");

  assert(CUSTOM_REPORT_PRICE.RUPEES === 599, "Customized Report price is exactly ₹599");
  assert(CUSTOM_REPORT_PRICE.PAISE === 59900, "Customized Report price is exactly 59,900 paise");

  // Canonical category validations
  assert(validateCustomReportCategory("Mutual Funds") === "Mutual Funds", "Validates 'Mutual Funds'");
  assert(validateCustomReportCategory("mutual fund") === "Mutual Funds", "Normalizes 'mutual fund' to 'Mutual Funds'");
  assert(validateCustomReportCategory("Stocks") === "Stocks", "Validates 'Stocks'");
  assert(validateCustomReportCategory("stock") === "Stocks", "Normalizes 'stock' to 'Stocks'");
  assert(validateCustomReportCategory("Credit Card") === "Credit Card", "Validates 'Credit Card'");
  assert(validateCustomReportCategory("credit cards") === "Credit Card", "Normalizes 'credit cards' to 'Credit Card'");
  assert(validateCustomReportCategory("Insurance") === "Insurance", "Validates 'Insurance'");
  assert(validateCustomReportCategory("Loans") === "Loans", "Validates 'Loans'");
  assert(validateCustomReportCategory("loan") === "Loans", "Normalizes 'loan' to 'Loans'");

  let threwInvalidCat = false;
  try {
    validateCustomReportCategory("Cryptocurrency");
  } catch (err) {
    if (err instanceof CustomReportError && err.code === "INVALID_CATEGORY") threwInvalidCat = true;
  }
  assert(threwInvalidCat, "Rejects unsupported customized report category");

  let threwMissingCat = false;
  try {
    validateCustomReportCategory("");
  } catch (err) {
    if (err instanceof CustomReportError && err.code === "MISSING_CATEGORY") threwMissingCat = true;
  }
  assert(threwMissingCat, "Rejects empty customized report category");

  // ---------------------------------------------------------------------------
  // TEST SUITE 6: Cryptographic Signatures & Verification
  // ---------------------------------------------------------------------------
  console.log("\n[6] Razorpay Payment & Webhook Cryptographic Signatures");

  const orderId = "order_test_998877";
  const paymentId = "pay_test_112233";
  const validPaymentSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  assert(
    verifyPaymentSignature(orderId, paymentId, validPaymentSignature),
    "Cryptographically verifies valid payment signature"
  );
  assert(
    !verifyPaymentSignature(orderId, paymentId, "tampered_signature_hex"),
    "Rejects invalid/tampered payment signature"
  );
  assert(
    !verifyPaymentSignature(orderId, "pay_wrong", validPaymentSignature),
    "Rejects payment signature with mismatched payment ID"
  );

  const webhookBody = JSON.stringify({ event: "payment.captured", id: "evt_123" });
  const validWebhookSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(webhookBody)
    .digest("hex");

  assert(
    verifyWebhookSignature(webhookBody, validWebhookSignature),
    "Cryptographically verifies valid webhook signature"
  );
  assert(
    !verifyWebhookSignature(webhookBody, "invalid_webhook_sig"),
    "Rejects invalid/tampered webhook signature"
  );

  // ---------------------------------------------------------------------------
  // FINAL SUMMARY
  // ---------------------------------------------------------------------------
  console.log("\n================================================================================");
  console.log(`TEST SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log("================================================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution failed with error:", err);
  process.exit(1);
});
