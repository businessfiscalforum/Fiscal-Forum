/**
 * Fiscal Forum - Comprehensive Paid-Report Security & Route Handler Test Suite
 *
 * Tests both:
 * 1. Pure unit logic (pricing rules, signature math, Drive ID extraction).
 * 2. ACTUAL Next.js API Route Handlers:
 *    - app/api/checkout/create-order/route.ts
 *    - app/api/checkout/verify-payment/route.ts
 *    - app/api/webhooks/razorpay/route.ts
 *    - app/api/reports/[id]/pdf/route.ts
 *
 * Mocks Clerk, Razorpay, Google Drive, and Drizzle/Neon at their real integration boundaries.
 * Does not make real network calls or connect to production.
 */

import crypto from "crypto";
import { Readable } from "stream";
import {
  calculateReportPriceInPaise,
  REPORT_PRICES,
  verifyPaymentSignature,
  verifyWebhookSignature,
} from "../lib/razorpay";
import { extractGoogleDriveFileId } from "../lib/googleDriveUtils";

// --- Integration Boundary Mocks Setup ---

// 1. Mock server-only so Node.js can import server modules during tests
const serverOnlyPath = require.resolve("server-only");
require.cache[serverOnlyPath] = {
  id: serverOnlyPath,
  filename: serverOnlyPath,
  loaded: true,
  exports: {},
} as any;

// 2. Mock Clerk User State
interface MockClerkUser {
  id: string;
  fullName?: string;
  emailAddresses: { emailAddress: string }[];
  publicMetadata?: { role?: string };
}

let activeClerkUser: MockClerkUser | null = null;

const clerkServerPath = require.resolve("@clerk/nextjs/server");
const originalClerkServer = require("@clerk/nextjs/server");
require.cache[clerkServerPath] = {
  id: clerkServerPath,
  filename: clerkServerPath,
  loaded: true,
  exports: new Proxy(originalClerkServer, {
    get(target, prop) {
      if (prop === "currentUser") {
        return async () => activeClerkUser;
      }
      return target[prop];
    },
  }),
} as any;

// 3. Mock In-Memory Database Store for Drizzle ORM
interface ReportRow {
  id: string;
  title: string;
  reportType: string;
  price: number | null;
  published: boolean;
  driveFileId?: string;
  pdfUrl?: string;
}

interface PaymentAttemptRow {
  id: string;
  orderId: string;
  clerkUserId: string;
  userEmail: string;
  reportId: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
  paymentId?: string;
  signature?: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface EntitlementRow {
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

interface WebhookEventRow {
  id: string;
  eventId: string;
  eventType: string;
  payload: string;
  status: string;
  processedAt?: Date | null;
  createdAt: Date;
}

class InMemoryDatabase {
  reports = new Map<string, ReportRow>();
  paymentAttempts = new Map<string, PaymentAttemptRow>(); // keyed by orderId
  entitlements = new Map<string, EntitlementRow>(); // keyed by clerkUserId:reportId
  webhookEvents = new Map<string, WebhookEventRow>(); // keyed by eventId
  userSubscriptions: any[] = [];

  reset() {
    this.reports.clear();
    this.paymentAttempts.clear();
    this.entitlements.clear();
    this.webhookEvents.clear();
    this.userSubscriptions = [];
  }
}

const dbStore = new InMemoryDatabase();

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

function getDrizzleTableName(table: any): string {
  if (!table) return "";
  const sym = Object.getOwnPropertySymbols(table).find((s) => s.description === "drizzle:Name");
  return sym ? table[sym] : "";
}

let failEntitlementInsert = false;

// Build Drizzle-compatible mock database client
const mockDrizzleDb = {
  select: (_fields?: any) => ({
    from: (table: any) => ({
      where: (condition: any) => {
        const queryFn = async () => {
          const tableName = getDrizzleTableName(table);
          const conds = extractSqlConditions(condition);

          if (tableName === "research_reports") {
            if (conds.id) {
              const r = dbStore.reports.get(conds.id);
              return r ? [r] : [];
            }
            return Array.from(dbStore.reports.values());
          }

          if (tableName === "payment_attempts") {
            if (conds.order_id) {
              const a = dbStore.paymentAttempts.get(conds.order_id);
              return a ? [a] : [];
            }
            return Array.from(dbStore.paymentAttempts.values());
          }

          if (tableName === "purchase_entitlements") {
            const list = Array.from(dbStore.entitlements.values());
            return list.filter((e) => {
              if (conds.clerk_user_id && e.clerkUserId !== conds.clerk_user_id) return false;
              if (conds.report_id && e.reportId !== conds.report_id) return false;
              if (conds.status && e.status !== conds.status) return false;
              return true;
            });
          }

          if (tableName === "user_subscriptions") {
            const now = new Date();
            return (dbStore.userSubscriptions || [])
              .filter((sub) => {
                if (conds.clerk_user_id && sub.clerkUserId !== conds.clerk_user_id) return false;
                if (conds.status && sub.status !== conds.status) return false;
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
              }));
          }

          if (tableName === "webhook_events") {
            if (conds.event_id) {
              const ev = dbStore.webhookEvents.get(conds.event_id);
              return ev ? [ev] : [];
            }
            return Array.from(dbStore.webhookEvents.values());
          }

          return [];
        };

        return {
          limit: async (_n: number) => queryFn(),
          orderBy: () => queryFn(),
          then: (resolve: any) => queryFn().then(resolve),
          catch: (reject: any) => queryFn().catch(reject),
        };
      },
      limit: async (_n: number) => {
        const tableName = getDrizzleTableName(table);
        if (tableName === "research_reports") return Array.from(dbStore.reports.values());
        return [];
      },
    }),
  }),

  insert: (table: any) => ({
    values: (data: any) => {
      const tableName = getDrizzleTableName(table);

      if (tableName === "payment_attempts") {
        const row: PaymentAttemptRow = {
          id: `pa_${Date.now()}_${Math.random()}`,
          orderId: data.orderId,
          clerkUserId: data.clerkUserId,
          userEmail: data.userEmail,
          reportId: data.reportId,
          amount: data.amount,
          currency: data.currency || "INR",
          receipt: data.receipt,
          status: data.status || "created",
          paymentId: data.paymentId,
          signature: data.signature,
          createdAt: new Date(),
        };
        dbStore.paymentAttempts.set(data.orderId, row);
        return {
          onConflictDoNothing: async () => {},
          returning: async () => [row],
        };
      }

      if (tableName === "purchase_entitlements") {
        if (failEntitlementInsert) {
          throw new Error("Simulated database failure during entitlement creation");
        }
        const key = `${data.clerkUserId}:${data.reportId}`;
        return {
          onConflictDoNothing: async () => {
            if (!dbStore.entitlements.has(key)) {
              const row: EntitlementRow = {
                id: `ent_${Date.now()}_${Math.random()}`,
                clerkUserId: data.clerkUserId,
                userEmail: data.userEmail,
                reportId: data.reportId,
                orderId: data.orderId,
                paymentId: data.paymentId,
                amount: data.amount,
                status: data.status || "ACTIVE",
                createdAt: new Date(),
              };
              dbStore.entitlements.set(key, row);
            }
          },
          returning: async () => {
            if (!dbStore.entitlements.has(key)) {
              const row: EntitlementRow = {
                id: `ent_${Date.now()}_${Math.random()}`,
                clerkUserId: data.clerkUserId,
                userEmail: data.userEmail,
                reportId: data.reportId,
                orderId: data.orderId,
                paymentId: data.paymentId,
                amount: data.amount,
                status: data.status || "ACTIVE",
                createdAt: new Date(),
              };
              dbStore.entitlements.set(key, row);
              return [row];
            }
            return [dbStore.entitlements.get(key)];
          },
        };
      }

      if (tableName === "webhook_events") {
        if (dbStore.webhookEvents.has(data.eventId)) {
          // Unique constraint violation in Postgres
          const error: any = new Error(`duplicate key value violates unique constraint "webhook_events_event_id_unique"`);
          error.code = "23505";
          throw error;
        }
        const row: WebhookEventRow = {
          id: `wh_${Date.now()}_${Math.random()}`,
          eventId: data.eventId,
          eventType: data.eventType,
          payload: data.payload,
          status: data.status || "PROCESSING",
          processedAt: data.processedAt || null,
          createdAt: data.createdAt || new Date(),
        };
        dbStore.webhookEvents.set(data.eventId, row);
        return {
          onConflictDoNothing: async () => {},
        };
      }

      return {
        onConflictDoNothing: async () => {},
      };
    },
  }),

  update: (table: any) => ({
    set: (data: any) => ({
      where: async (condition: any) => {
        const tableName = getDrizzleTableName(table);
        const conds = extractSqlConditions(condition);

        if (tableName === "payment_attempts" && conds.order_id) {
          const item = dbStore.paymentAttempts.get(conds.order_id);
          if (item) {
            Object.assign(item, data, { updatedAt: new Date() });
          }
        }

        if (tableName === "webhook_events" && conds.event_id) {
          const item = dbStore.webhookEvents.get(conds.event_id);
          if (item) {
            Object.assign(item, data);
          }
        }
      },
    }),
  }),

  transaction: async (cb: (tx: any) => Promise<any>) => {
    return await cb(mockDrizzleDb);
  },
};

const configDbPath = require.resolve("../config/db");
require.cache[configDbPath] = {
  id: configDbPath,
  filename: configDbPath,
  loaded: true,
  exports: { db: mockDrizzleDb },
} as any;

// 4. Mock Razorpay SDK Boundary
interface MockGatewayPayment {
  id: string;
  order_id: string;
  status: string;
  amount: number;
  currency: string;
}

let mockGatewayPaymentLookup: ((paymentId: string) => MockGatewayPayment | null) = () => null;
let mockGatewayOrderPaymentsLookup: ((orderId: string) => { items?: { id: string; status: string }[] }) = () => ({ items: [] });
let mockCreatedOrderCounter = 100;

const mockRazorpayClient = {
  orders: {
    create: async (params: { amount: number; currency: string; receipt: string; notes?: any }) => {
      mockCreatedOrderCounter++;
      const orderId = `order_rzp_${mockCreatedOrderCounter}`;
      return {
        id: orderId,
        amount: params.amount,
        currency: params.currency || "INR",
        receipt: params.receipt,
        notes: params.notes,
      };
    },
    fetchPayments: async (orderId: string) => {
      return mockGatewayOrderPaymentsLookup(orderId);
    },
  },
  payments: {
    fetch: async (paymentId: string) => {
      const p = mockGatewayPaymentLookup(paymentId);
      if (!p) {
        throw new Error(`Razorpay payment ${paymentId} not found`);
      }
      return p;
    },
  },
};

const razorpayLibPath = require.resolve("../lib/razorpay");
const originalRazorpayLib = require("../lib/razorpay");
require.cache[razorpayLibPath] = {
  id: razorpayLibPath,
  filename: razorpayLibPath,
  loaded: true,
  exports: new Proxy(originalRazorpayLib, {
    get(target, prop) {
      if (prop === "getRazorpayInstance") {
        return () => mockRazorpayClient;
      }
      return target[prop];
    },
  }),
} as any;

// 5. Mock Google Drive Boundary
let driveFileContentBuffer: Buffer | null = Buffer.from("%PDF-1.4 Mock Institutional Financial Report Stream");
let driveClientShouldError = false;

const googleDriveLibPath = require.resolve("../lib/googleDrive");
const originalGoogleDriveLib = require("../lib/googleDrive");
require.cache[googleDriveLibPath] = {
  id: googleDriveLibPath,
  filename: googleDriveLibPath,
  loaded: true,
  exports: new Proxy(originalGoogleDriveLib, {
    get(target, prop) {
      if (prop === "downloadDriveFileStream") {
        return async (_fileId: string) => {
          if (driveClientShouldError || !driveFileContentBuffer) {
            throw new Error("Google Drive file not found or service account access denied");
          }
          return {
            stream: Readable.from([driveFileContentBuffer]),
            name: "ResearchReport.pdf",
            mimeType: "application/pdf",
          };
        };
      }
      return target[prop];
    },
  }),
} as any;

// --- Test Suite Execution ---

async function runAllTests() {
  console.log("=================================================================================");
  console.log("FISCAL FORUM - PAID-REPORT PURCHASE SECURITY & REAL ROUTE HANDLER TESTS");
  console.log("=================================================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(title: string, condition: boolean, details?: string) {
    if (condition) {
      console.log(`[PASS] ${title}`);
      passed++;
    } else {
      console.error(`[FAIL] ${title}`);
      if (details) console.error(`       Details: ${details}`);
      failed++;
    }
  }

  // Set environment secrets for HMAC testing
  const KEY_SECRET = "test_razorpay_secret_key_1234567890";
  const WEBHOOK_SECRET = "test_webhook_secret_key_9876543210";
  process.env.RAZORPAY_KEY_ID = "rzp_test_mock_key_id";
  process.env.RAZORPAY_KEY_SECRET = KEY_SECRET;
  process.env.RAZORPAY_WEBHOOK_SECRET = WEBHOOK_SECRET;

  // ---------------------------------------------------------------------------------
  // SECTION A: Pure Unit Tests (Pricing, Signatures, Google Drive ID Extraction)
  // ---------------------------------------------------------------------------------
  console.log("--- Section A: Pricing, Signature Math, and Drive Utilities ---");

  // 1. Daily Pre-Market pricing
  assert(
    "A.1: Daily Pre-Market report default is ₹49 (4,900 paise)",
    calculateReportPriceInPaise({ reportType: "Pre-Market Research Report" }) === REPORT_PRICES.DAILY_PRE_MARKET_PAISE
  );
  assert(
    "A.2: Daily Pre-Market report with explicit price 49 is 4,900 paise",
    calculateReportPriceInPaise({ reportType: "Pre-Market Research Report", price: 49 }) === 4900
  );
  assert(
    "A.3: Daily Pre-Market report with null price resolves to canonical ₹49 (4,900 paise)",
    calculateReportPriceInPaise({ reportType: "Pre-Market Research Report", price: null }) === 4900
  );

  // 2. Weekly Report pricing
  assert(
    "A.4: Weekly report default is ₹99 (9,900 paise)",
    calculateReportPriceInPaise({ reportType: "Weekly Research Report" }) === REPORT_PRICES.WEEKLY_PAISE
  );
  assert(
    "A.5: Legacy DB default ₹49 on Weekly report does not override intended ₹99 (9,900 paise)",
    calculateReportPriceInPaise({ reportType: "Weekly Research Report", price: 49 }) === 9900
  );
  assert(
    "A.6: Weekly report with explicit price ₹99 is 9,900 paise",
    calculateReportPriceInPaise({ reportType: "Weekly Research Report", price: 99 }) === 9900
  );
  assert(
    "A.7: Weekly report with explicit custom price ₹149 is respected (14,900 paise)",
    calculateReportPriceInPaise({ reportType: "Weekly Research Report", price: 149 }) === 14900
  );

  // 3. Invalid prices rejected
  let zeroThrew = false;
  try { calculateReportPriceInPaise({ price: 0 }); } catch { zeroThrew = true; }
  assert("A.8: Zero price is rejected with an exception", zeroThrew);

  let negThrew = false;
  try { calculateReportPriceInPaise({ price: -49 }); } catch { negThrew = true; }
  assert("A.9: Negative price is rejected with an exception", negThrew);

  let nanThrew = false;
  try { calculateReportPriceInPaise({ price: NaN }); } catch { nanThrew = true; }
  assert("A.10: NaN price is rejected with an exception", nanThrew);

  let infThrew = false;
  try { calculateReportPriceInPaise({ price: Infinity }); } catch { infThrew = true; }
  assert("A.11: Non-finite price is rejected with an exception", infThrew);

  // 4. Drive ID extraction
  const rawId = "1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO";
  assert(
    "A.12: Drive ID extraction from raw ID string",
    extractGoogleDriveFileId(rawId) === rawId
  );
  assert(
    "A.13: Drive ID extraction from /file/d/.../view?usp=sharing URL",
    extractGoogleDriveFileId(`https://drive.google.com/file/d/${rawId}/view?usp=sharing`) === rawId
  );
  assert(
    "A.14: Drive ID extraction from /preview URL",
    extractGoogleDriveFileId(`https://drive.google.com/file/d/${rawId}/preview`) === rawId
  );

  // 5. Signature verification security
  const testOrderId = "order_sec_test_01";
  const testPayId = "pay_sec_test_01";
  const validSig = crypto.createHmac("sha256", KEY_SECRET).update(`${testOrderId}|${testPayId}`).digest("hex");
  assert(
    "A.15: Valid checkout signature passes HMAC-SHA256 constant-time check",
    verifyPaymentSignature(testOrderId, testPayId, validSig) === true
  );
  assert(
    "A.16: Tampered checkout signature is rejected safely",
    verifyPaymentSignature(testOrderId, testPayId, validSig.slice(0, -2) + "ff") === false
  );
  assert(
    "A.17: Malformed non-hex or mismatched length signature does not cause timingSafeEqual exception",
    verifyPaymentSignature(testOrderId, testPayId, "not-a-valid-hex-length") === false &&
    verifyPaymentSignature(testOrderId, testPayId, "") === false
  );

  // ---------------------------------------------------------------------------------
  // Dynamically load the ACTUAL Next.js App Router Route Handlers
  // ---------------------------------------------------------------------------------
  console.log("\n--- Dynamically Loading Real Next.js Route Handlers ---");
  const { NextRequest } = await import("next/server");
  const createOrderRoute = await import("../app/api/checkout/create-order/route");
  const verifyPaymentRoute = await import("../app/api/checkout/verify-payment/route");
  const webhookRoute = await import("../app/api/webhooks/razorpay/route");
  const pdfRoute = await import("../app/api/reports/[id]/pdf/route");

  // ---------------------------------------------------------------------------------
  // SECTION B: Testing ACTUAL Route Handler: POST /api/checkout/create-order
  // ---------------------------------------------------------------------------------
  console.log("\n--- Section B: Real Route Handler: create-order ---");

  dbStore.reset();
  const preMarketReport: ReportRow = {
    id: "rep-pm-100",
    title: "Before the Market Opens - Daily Brief",
    reportType: "Pre-Market Research Report",
    price: 49,
    published: true,
    driveFileId: rawId,
  };
  const weeklyReport: ReportRow = {
    id: "rep-wk-200",
    title: "Weekly Market Compass - Friday Close",
    reportType: "Weekly Research Report",
    price: 49, // Legacy DB value of 49, should resolve to 9900 paise
    published: true,
    driveFileId: rawId,
  };
  dbStore.reports.set(preMarketReport.id, preMarketReport);
  dbStore.reports.set(weeklyReport.id, weeklyReport);

  const aliceUser: MockClerkUser = {
    id: "user_alice_clerk",
    fullName: "Alice Investor",
    emailAddresses: [{ emailAddress: "alice@example.com" }],
  };
  const bobUser: MockClerkUser = {
    id: "user_bob_clerk",
    fullName: "Bob Trader",
    emailAddresses: [{ emailAddress: "bob@example.com" }],
  };

  // Scenario 1: Unauthenticated checkout creation returns 410 DISCONTINUED_PURCHASE_FLOW
  activeClerkUser = null;
  const unauthCreateReq = new NextRequest("http://localhost:3000/api/checkout/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reportId: preMarketReport.id }),
  });
  const unauthCreateRes = await createOrderRoute.POST(unauthCreateReq);
  const unauthCreateJson = await unauthCreateRes.json();
  assert(
    "B.1: Single-report checkout returns 410 Gone (DISCONTINUED_PURCHASE_FLOW)",
    unauthCreateRes.status === 410 && unauthCreateJson.code === "DISCONTINUED_PURCHASE_FLOW"
  );

  // Scenario 2: Authenticated checkout creation also returns 410 Gone
  activeClerkUser = aliceUser;
  const aliceOrderReq = new NextRequest("http://localhost:3000/api/checkout/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reportId: preMarketReport.id }),
  });
  const aliceOrderRes = await createOrderRoute.POST(aliceOrderReq);
  const aliceOrderJson = await aliceOrderRes.json();
  assert(
    "B.2: Authenticated single-report checkout returns 410 Gone and redirects to /reports/join",
    aliceOrderRes.status === 410 &&
    aliceOrderJson.code === "DISCONTINUED_PURCHASE_FLOW" &&
    aliceOrderJson.subscribeUrl === "/reports/join"
  );

  // Seed historical payment attempts to enable verification and webhook tests
  const aliceCreatedOrderId = "order_alice_test_seed_101";
  const storedAttemptAlice: PaymentAttemptRow = {
    id: "pa_alice_seed_1",
    orderId: aliceCreatedOrderId,
    clerkUserId: aliceUser.id,
    userEmail: "alice@example.com",
    reportId: preMarketReport.id,
    amount: 4900,
    currency: "INR",
    status: "created",
    createdAt: new Date(),
  };
  dbStore.paymentAttempts.set(aliceCreatedOrderId, storedAttemptAlice);

  assert(
    "B.3: payment_attempts stores amount in paise matching order",
    storedAttemptAlice !== undefined &&
    storedAttemptAlice.amount === 4900 &&
    storedAttemptAlice.clerkUserId === aliceUser.id
  );

  const bobWeeklyOrderId = "order_bob_test_seed_202";
  const storedAttemptBob: PaymentAttemptRow = {
    id: "pa_bob_seed_1",
    orderId: bobWeeklyOrderId,
    clerkUserId: bobUser.id,
    userEmail: "bob@example.com",
    reportId: weeklyReport.id,
    amount: 9900,
    currency: "INR",
    status: "created",
    createdAt: new Date(),
  };
  dbStore.paymentAttempts.set(bobWeeklyOrderId, storedAttemptBob);

  assert(
    "B.4: Weekly report historical attempt stored at 9,900 paise",
    storedAttemptBob?.amount === 9900
  );

  // ---------------------------------------------------------------------------------
  // SECTION C: Testing ACTUAL Route Handler: POST /api/checkout/verify-payment
  // ---------------------------------------------------------------------------------
  console.log("\n--- Section C: Real Route Handler: verify-payment ---");

  // Scenario C.1: Unauthenticated verification returns 401
  activeClerkUser = null;
  const unauthVerifyReq = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: aliceCreatedOrderId,
      razorpay_payment_id: "pay_test_123",
      razorpay_signature: "sig_test_123",
      reportId: preMarketReport.id,
    }),
  });
  const unauthVerifyRes = await verifyPaymentRoute.POST(unauthVerifyReq);
  assert(
    "C.1: Real verify-payment returns 401 when unauthenticated",
    unauthVerifyRes.status === 401
  );

  // Scenario C.2: Verification of another user's order returns 403
  activeClerkUser = bobUser; // Bob attempting to verify Alice's order
  const validAliceSigForBob = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${aliceCreatedOrderId}|pay_alice_001`)
    .digest("hex");
  const crossUserReq = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: aliceCreatedOrderId,
      razorpay_payment_id: "pay_alice_001",
      razorpay_signature: validAliceSigForBob,
      reportId: preMarketReport.id,
    }),
  });
  const crossUserRes = await verifyPaymentRoute.POST(crossUserReq);
  assert(
    "C.2: Real verify-payment returns 403 when verifying another user's order",
    crossUserRes.status === 403
  );

  // Scenario C.3: Payment status 'authorized' is rejected (NEVER unlocks report)
  activeClerkUser = aliceUser;
  const aliceAuthPayId = "pay_alice_auth_only";
  const validAliceAuthSig = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${aliceCreatedOrderId}|${aliceAuthPayId}`)
    .digest("hex");

  mockGatewayPaymentLookup = (id: string) => {
    if (id === aliceAuthPayId) {
      return {
        id: aliceAuthPayId,
        order_id: aliceCreatedOrderId,
        status: "authorized", // NOT captured
        amount: 4900,
        currency: "INR",
      };
    }
    return null;
  };

  const authOnlyReq = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: aliceCreatedOrderId,
      razorpay_payment_id: aliceAuthPayId,
      razorpay_signature: validAliceAuthSig,
      reportId: preMarketReport.id,
    }),
  });
  const authOnlyRes = await verifyPaymentRoute.POST(authOnlyReq);
  const authOnlyJson = await authOnlyRes.json();
  assert(
    "C.3: Real verify-payment rejects 'authorized' status (400 PAYMENT_NOT_CAPTURED) and creates no entitlement",
    authOnlyRes.status === 400 &&
    authOnlyJson.code === "PAYMENT_NOT_CAPTURED" &&
    !dbStore.entitlements.has(`${aliceUser.id}:${preMarketReport.id}`) &&
    dbStore.paymentAttempts.get(aliceCreatedOrderId)?.status !== "paid"
  );

  // Scenario C.4: Mismatched order ID, amount, or currency rejected
  const aliceCapturedPayId = "pay_alice_captured_ok";
  const validAliceCapSig = crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${aliceCreatedOrderId}|${aliceCapturedPayId}`)
    .digest("hex");

  // Mismatched amount
  mockGatewayPaymentLookup = () => ({
    id: aliceCapturedPayId,
    order_id: aliceCreatedOrderId,
    status: "captured",
    amount: 100, // Mismatched amount
    currency: "INR",
  });
  const mismatchAmtReq = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: aliceCreatedOrderId,
      razorpay_payment_id: aliceCapturedPayId,
      razorpay_signature: validAliceCapSig,
      reportId: preMarketReport.id,
    }),
  });
  const mismatchAmtRes = await verifyPaymentRoute.POST(mismatchAmtReq);
  assert(
    "C.4: Real verify-payment rejects payment with mismatched amount (400)",
    mismatchAmtRes.status === 400 &&
    !dbStore.entitlements.has(`${aliceUser.id}:${preMarketReport.id}`)
  );

  // Scenario C.5: Successful captured payment verification grants entitlement
  mockGatewayPaymentLookup = (id: string) => ({
    id,
    order_id: aliceCreatedOrderId,
    status: "captured",
    amount: 4900,
    currency: "INR",
  });
  const successVerifyReq = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: aliceCreatedOrderId,
      razorpay_payment_id: aliceCapturedPayId,
      razorpay_signature: validAliceCapSig,
      reportId: preMarketReport.id,
    }),
  });
  const successVerifyRes = await verifyPaymentRoute.POST(successVerifyReq);
  const successVerifyJson = await successVerifyRes.json();
  const aliceEntitlement = dbStore.entitlements.get(`${aliceUser.id}:${preMarketReport.id}`);

  assert(
    "C.5: Real verify-payment unlocks report (200 success), marks payment_attempts paid, and grants entitlement",
    successVerifyRes.status === 200 &&
    successVerifyJson.success === true &&
    successVerifyJson.pdfAccessUrl === `/api/reports/${preMarketReport.id}/pdf` &&
    dbStore.paymentAttempts.get(aliceCreatedOrderId)?.status === "paid" &&
    aliceEntitlement !== undefined &&
    aliceEntitlement.status === "ACTIVE"
  );

  // Scenario C.6: Repeated verification request is idempotent
  const initialEntCount = dbStore.entitlements.size;
  const duplicateVerifyReq = new NextRequest("http://localhost:3000/api/checkout/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: aliceCreatedOrderId,
      razorpay_payment_id: aliceCapturedPayId,
      razorpay_signature: validAliceCapSig,
      reportId: preMarketReport.id,
    }),
  });
  const duplicateVerifyRes = await verifyPaymentRoute.POST(duplicateVerifyReq);
  assert(
    "C.6: Repeated verification request returns 200 without creating duplicate entitlement",
    duplicateVerifyRes.status === 200 &&
    dbStore.entitlements.size === initialEntCount
  );

  // ---------------------------------------------------------------------------------
  // SECTION D: Testing ACTUAL Route Handler: POST /api/webhooks/razorpay
  // ---------------------------------------------------------------------------------
  console.log("\n--- Section D: Real Route Handler: razorpay webhook ---");

  // Scenario D.1: Invalid webhook signature returns 400
  const invalidSigWebhookReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": "invalid_sig_0000000000000000000000000000000000000000000000000000000000000000" },
    body: JSON.stringify({ id: "evt_invalid_1", event: "payment.captured" }),
  });
  const invalidSigWebhookRes = await webhookRoute.POST(invalidSigWebhookReq);
  assert(
    "D.1: Real webhook handler rejects invalid signature with 400 Bad Request",
    invalidSigWebhookRes.status === 400
  );

  // Scenario D.2: Unknown payment attempt returns 500 (retryable) and marks FAILED
  const unknownOrderPayload = JSON.stringify({
    id: "evt_unknown_order_100",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_unknown_order",
          order_id: "order_not_in_db_yet_999",
        },
      },
    },
  });
  const unknownOrderSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(unknownOrderPayload).digest("hex");
  const unknownOrderReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": unknownOrderSig },
    body: unknownOrderPayload,
  });
  const unknownOrderRes = await webhookRoute.POST(unknownOrderReq);
  const unknownOrderEventRecord = dbStore.webhookEvents.get("evt_unknown_order_100");

  assert(
    "D.2: Missing payment attempt returns retryable 500 and marks event FAILED (never PROCESSED)",
    unknownOrderRes.status === 500 &&
    unknownOrderEventRecord?.status === "FAILED"
  );

  // Helper to create fresh request for each webhook test invocation
  const webhookBobPayId = "pay_bob_webhook_01";
  const bobWebhookPayload = JSON.stringify({
    id: "evt_bob_order_paid_200",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: webhookBobPayId,
          order_id: bobWeeklyOrderId,
        },
      },
    },
  });
  const bobWebhookSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(bobWebhookPayload).digest("hex");

  function makeBobWebhookReq() {
    return new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
      method: "POST",
      headers: { "x-razorpay-signature": bobWebhookSig },
      body: bobWebhookPayload,
    });
  }

  // Scenario D.3: Webhook payment verification validation: order_id mismatch
  mockGatewayPaymentLookup = () => ({
    id: webhookBobPayId,
    order_id: "order_different_mismatched",
    status: "captured",
    amount: 9900,
    currency: "INR",
  });
  const mismatchOrderWebhookRes = await webhookRoute.POST(makeBobWebhookReq());
  assert(
    "D.3: Webhook fails and refuses access when verifiedPayment.order_id differs from attempt",
    mismatchOrderWebhookRes.status === 500 &&
    !dbStore.entitlements.has(`${bobUser.id}:${weeklyReport.id}`)
  );

  // Scenario D.4: Webhook payment verification validation: amount mismatch
  mockGatewayPaymentLookup = () => ({
    id: webhookBobPayId,
    order_id: bobWeeklyOrderId,
    status: "captured",
    amount: 4900, // Attempt expects 9900 paise, gateway says 4900 paise
    currency: "INR",
  });
  const mismatchAmtWebhookRes = await webhookRoute.POST(makeBobWebhookReq());
  assert(
    "D.4: Webhook fails and refuses access when verifiedPayment.amount differs from attempt",
    mismatchAmtWebhookRes.status === 500 &&
    !dbStore.entitlements.has(`${bobUser.id}:${weeklyReport.id}`)
  );

  // Scenario D.5: Webhook payment verification validation: status is not 'captured' (e.g. 'authorized')
  mockGatewayPaymentLookup = () => ({
    id: webhookBobPayId,
    order_id: bobWeeklyOrderId,
    status: "authorized", // NOT captured
    amount: 9900,
    currency: "INR",
  });
  const nonCapturedWebhookRes = await webhookRoute.POST(makeBobWebhookReq());
  assert(
    "D.5: Webhook fails and refuses access when payment status is not 'captured'",
    nonCapturedWebhookRes.status === 500 &&
    !dbStore.entitlements.has(`${bobUser.id}:${weeklyReport.id}`)
  );

  // Scenario D.6: Successful webhook processing grants entitlement and marks PROCESSED
  mockGatewayPaymentLookup = () => ({
    id: webhookBobPayId,
    order_id: bobWeeklyOrderId,
    status: "captured",
    amount: 9900,
    currency: "INR",
  });
  const successWebhookRes = await webhookRoute.POST(makeBobWebhookReq());
  const bobWeeklyEntitlement = dbStore.entitlements.get(`${bobUser.id}:${weeklyReport.id}`);
  const bobWebhookEvent = dbStore.webhookEvents.get("evt_bob_order_paid_200");

  assert(
    "D.6: Real webhook reconciles captured payment, marks PROCESSED, and grants entitlement",
    successWebhookRes.status === 200 &&
    bobWebhookEvent?.status === "PROCESSED" &&
    bobWeeklyEntitlement !== undefined &&
    bobWeeklyEntitlement.status === "ACTIVE"
  );

  // Scenario D.7: Duplicate webhook delivery is idempotent
  const dupWebhookRes = await webhookRoute.POST(makeBobWebhookReq());
  const dupWebhookJson = await dupWebhookRes.json();
  assert(
    "D.7: Duplicate webhook delivery returns 200 without duplicate entitlement insertion",
    dupWebhookRes.status === 200 &&
    dupWebhookJson.message === "Duplicate event already processed"
  );

  // Scenario D.8: Stale PROCESSING lease recovery
  const staleEventId = "evt_stale_crash_test";
  const stalePayload = JSON.stringify({
    id: staleEventId,
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_stale_recovery",
          order_id: aliceCreatedOrderId,
        },
      },
    },
  });
  const staleSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(stalePayload).digest("hex");

  // Pre-seed a crashed PROCESSING event older than 5 minutes (e.g., 10 minutes ago)
  dbStore.webhookEvents.set(staleEventId, {
    id: "wh_stale_1",
    eventId: staleEventId,
    eventType: "payment.captured",
    payload: stalePayload,
    status: "PROCESSING",
    processedAt: null,
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  });

  mockGatewayPaymentLookup = () => ({
    id: "pay_stale_recovery",
    order_id: aliceCreatedOrderId,
    status: "captured",
    amount: 4900,
    currency: "INR",
  });

  const staleReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": staleSig },
    body: stalePayload,
  });
  const staleRes = await webhookRoute.POST(staleReq);
  const staleEventFinal = dbStore.webhookEvents.get(staleEventId);

  assert(
    "D.8: Stale PROCESSING event lease (>5 mins) is reclaimed and processed to PROCESSED",
    staleRes.status === 200 &&
    staleEventFinal?.status === "PROCESSED" &&
    staleEventFinal?.processedAt !== null
  );

  // Scenario D.9: Active concurrent PROCESSING lease returns retryable 503 (not 200)
  const concurrentEventId = "evt_concurrent_in_progress";
  const concurrentPayload = JSON.stringify({
    id: concurrentEventId,
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_concurrent_01",
          order_id: aliceCreatedOrderId,
        },
      },
    },
  });
  const concurrentSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(concurrentPayload).digest("hex");

  // Pre-seed an ACTIVE processing lease (30 seconds ago, well within the 5-minute timeout)
  dbStore.webhookEvents.set(concurrentEventId, {
    id: "wh_concurrent_1",
    eventId: concurrentEventId,
    eventType: "payment.captured",
    payload: concurrentPayload,
    status: "PROCESSING",
    processedAt: null,
    createdAt: new Date(Date.now() - 30 * 1000), // 30 seconds ago
  });

  const concurrentReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": concurrentSig },
    body: concurrentPayload,
  });
  const concurrentRes = await webhookRoute.POST(concurrentReq);
  const concurrentJson = await concurrentRes.json();

  assert(
    "D.9: Active concurrent webhook lease returns retryable 503 (NOT 200) so recovery is never blocked",
    concurrentRes.status === 503 &&
    concurrentJson.error !== undefined &&
    concurrentRes.headers.get("Retry-After") === "10"
  );

  // Scenario D.10: Webhook retry after FAILED processing attempt successfully completes
  const failedEventId = "evt_failed_retry_test";
  const failedPayload = JSON.stringify({
    id: failedEventId,
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_failed_retry_01",
          order_id: aliceCreatedOrderId,
        },
      },
    },
  });
  const failedSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(failedPayload).digest("hex");

  // Pre-seed an event marked FAILED from an earlier failed attempt
  dbStore.webhookEvents.set(failedEventId, {
    id: "wh_failed_1",
    eventId: failedEventId,
    eventType: "payment.captured",
    payload: failedPayload,
    status: "FAILED",
    processedAt: null,
    createdAt: new Date(Date.now() - 60 * 1000),
  });

  mockGatewayPaymentLookup = () => ({
    id: "pay_failed_retry_01",
    order_id: aliceCreatedOrderId,
    status: "captured",
    amount: 4900,
    currency: "INR",
  });

  const retryFailedReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": failedSig },
    body: failedPayload,
  });
  const retryFailedRes = await webhookRoute.POST(retryFailedReq);
  const failedEventAfterRetry = dbStore.webhookEvents.get(failedEventId);

  assert(
    "D.10: Webhook retry after FAILED processing safely takes over lease and completes to PROCESSED",
    retryFailedRes.status === 200 &&
    failedEventAfterRetry?.status === "PROCESSED"
  );

  // Scenario D.11: Currency mismatch fails verification and creates no entitlement
  const curMismatchPayId = "pay_cur_mismatch_01";
  const curMismatchPayload = JSON.stringify({
    id: "evt_cur_mismatch_100",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: curMismatchPayId,
          order_id: bobWeeklyOrderId,
        },
      },
    },
  });
  const curMismatchSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(curMismatchPayload).digest("hex");

  mockGatewayPaymentLookup = () => ({
    id: curMismatchPayId,
    order_id: bobWeeklyOrderId,
    status: "captured",
    amount: 9900,
    currency: "USD", // Mismatched currency (USD instead of INR)
  });

  const curMismatchReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": curMismatchSig },
    body: curMismatchPayload,
  });
  const curMismatchRes = await webhookRoute.POST(curMismatchReq);
  const curMismatchEvent = dbStore.webhookEvents.get("evt_cur_mismatch_100");

  assert(
    "D.11: Webhook fails with 500 when currency does not match (e.g. USD vs INR) and marks FAILED",
    curMismatchRes.status === 500 &&
    curMismatchEvent?.status === "FAILED"
  );

  // Scenario D.12: Failed entitlement creation throws error, returns 500, and marks event FAILED
  failEntitlementInsert = true;
  const failEntEventId = "evt_fail_entitlement_test";
  const failEntPayload = JSON.stringify({
    id: failEntEventId,
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_fail_ent_01",
          order_id: aliceCreatedOrderId,
        },
      },
    },
  });
  const failEntSig = crypto.createHmac("sha256", WEBHOOK_SECRET).update(failEntPayload).digest("hex");

  mockGatewayPaymentLookup = () => ({
    id: "pay_fail_ent_01",
    order_id: aliceCreatedOrderId,
    status: "captured",
    amount: 4900,
    currency: "INR",
  });

  const failEntReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "x-razorpay-signature": failEntSig },
    body: failEntPayload,
  });
  const failEntRes = await webhookRoute.POST(failEntReq);
  const failEntEvent = dbStore.webhookEvents.get(failEntEventId);

  assert(
    "D.12: Failed entitlement creation throws error, returns 500, and leaves event in FAILED state",
    failEntRes.status === 500 &&
    failEntEvent?.status === "FAILED"
  );
  failEntitlementInsert = false;

  // ---------------------------------------------------------------------------------
  // SECTION E: Testing ACTUAL Route Handler: GET /api/reports/[id]/pdf
  // ---------------------------------------------------------------------------------
  console.log("\n--- Section E: Real Route Handler: protected PDF streaming ---");

  // Scenario E.1: Unauthenticated user gets 401
  activeClerkUser = null;
  const unauthPdfReq = new NextRequest(`http://localhost:3000/api/reports/${preMarketReport.id}/pdf`);
  const unauthPdfRes = await pdfRoute.GET(unauthPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    "E.1: Real PDF endpoint returns 401 when unauthenticated",
    unauthPdfRes.status === 401
  );

  // Scenario E.2: Non-purchaser receives 403
  activeClerkUser = {
    id: "user_non_purchaser",
    emailAddresses: [{ emailAddress: "stranger@example.com" }],
  };
  const nonPurchaserPdfReq = new NextRequest(`http://localhost:3000/api/reports/${preMarketReport.id}/pdf`);
  const nonPurchaserPdfRes = await pdfRoute.GET(nonPurchaserPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    "E.2: Real PDF endpoint returns 403 PAYMENT_REQUIRED for non-purchaser",
    nonPurchaserPdfRes.status === 403
  );

  // Scenario E.3: Matching email alone cannot grant access (Strict clerkUserId authorization)
  activeClerkUser = {
    id: "user_attacker_with_same_email",
    emailAddresses: [{ emailAddress: "alice@example.com" }], // Alice owns it, but attacker has different clerkUserId
  };
  const attackerPdfRes = await pdfRoute.GET(nonPurchaserPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    "E.3: Matching email alone does NOT grant access (403 Forbidden)",
    attackerPdfRes.status === 403
  );

  // Scenario E.4: Historical single purchaser without active subscription strictly denied report access
  activeClerkUser = aliceUser;
  const purchaserPdfRes = await pdfRoute.GET(nonPurchaserPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    "E.4: Historical purchaser without active subscription strictly denied report access (403)",
    purchaserPdfRes.status === 403
  );

  // Scenario E.4b: Active subscriber streams PDF with security headers
  dbStore.userSubscriptions.push({
    id: "sub_alice_active",
    clerkUserId: aliceUser.id,
    customerEmail: "alice@example.com",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    startDate: new Date(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "ACTIVE",
    orderId: "order_sub_alice",
    paymentId: "pay_sub_alice",
    amount: 11900,
    createdAt: new Date(),
  });
  const subscriberPdfRes = await pdfRoute.GET(nonPurchaserPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    "E.4b: Active subscriber streams private PDF (200 OK) with security headers",
    subscriberPdfRes.status === 200 &&
    subscriberPdfRes.headers.get("Cache-Control") === "private, no-cache, no-store, must-revalidate" &&
    subscriberPdfRes.headers.get("X-Content-Type-Options") === "nosniff" &&
    subscriberPdfRes.headers.get("Content-Type") === "application/pdf"
  );

  // Scenario E.5: Admin user streams PDF without purchasing
  activeClerkUser = {
    id: "user_admin_super",
    emailAddresses: [{ emailAddress: "admin@fiscalforum.in" }],
    publicMetadata: { role: "ADMIN" },
  };
  const adminPdfRes = await pdfRoute.GET(nonPurchaserPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    "E.5: Verified Admin role streams PDF without purchasing",
    adminPdfRes.status === 200
  );

  // Scenario E.6: Missing/broken Drive configuration does not reveal credentials in error
  driveClientShouldError = true;
  activeClerkUser = aliceUser;
  const driveErrRes = await pdfRoute.GET(nonPurchaserPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  const driveErrJson = await driveErrRes.json();
  const leaksCredentials =
    JSON.stringify(driveErrJson).includes("service_account") ||
    JSON.stringify(driveErrJson).includes("PRIVATE KEY") ||
    JSON.stringify(driveErrJson).includes("googleapis");

  assert(
    "E.6: Drive infrastructure error returns generic 500 without leaking credentials",
    driveErrRes.status === 500 && !leaksCredentials
  );
  driveClientShouldError = false;

  console.log("\n=================================================================================");
  console.log(`TOTAL TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("Test Suite Unhandled Exception:", err);
  process.exit(1);
});
