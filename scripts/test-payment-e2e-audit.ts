/**
 * Fiscal Forum - Comprehensive Payment Lifecycle, Security Audit & E2E Validation Test Suite
 *
 * Covers:
 * Phase 2: Order Creation, Pricing Security, and Input Validation
 * Phase 3: Payment Verification Security, Signature Math, and Error Handling
 * Phase 4: Concurrency, Idempotency, and Duplicate Genuine Payments
 * Phase 5: Razorpay Webhook Processing, Leasing, and Untracked Orders
 * Phase 6: Universal Subscription Entitlements, Scopes, and Protected PDF Streaming
 * Phase 7: Refunds, Payment Failures, and Late Failure State Preservation
 * Phase 10: End-to-End Scenarios A through H
 */

import crypto from "crypto";
import { addMonths } from "date-fns";
import { NextRequest } from "next/server";
import { Readable } from "stream";

// Environment Setup
process.env.RAZORPAY_KEY_ID = "rzp_test_fiscalforum123";
process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_test_fiscalforum123";
process.env.RAZORPAY_KEY_SECRET = "test_razorpay_secret_fiscalforum";
process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret_fiscalforum";
process.env.DATABASE_URL = "postgresql://mock_user:mock_pass@localhost:5432/mock_db";

// 1. Mock server-only
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

// 2. Mock Clerk User State
interface MockClerkUser {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  emailAddresses: { emailAddress: string }[];
  phoneNumbers?: { phoneNumber: string }[];
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

// 3. In-Memory Store & Drizzle Mock
interface SubscriptionPaymentAttemptRow {
  id: string;
  orderId: string | null;
  clerkUserId: string;
  customerEmail: string;
  customerName: string | null;
  customerPhone: string | null;
  planId: string;
  accessScope: string;
  durationMonths: number;
  amount: number;
  currency: string;
  status: string;
  paymentId?: string | null;
  signature?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

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
  updatedAt?: Date;
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

interface ResearchReportRow {
  id: string;
  title: string;
  reportType: string;
  price: number | null;
  published: boolean;
  driveFileId?: string;
  pdfUrl?: string;
}

interface CustomReportRow {
  id: string;
  clerkUserId?: string | null;
  name: string;
  email: string;
  mobile: string;
  category: string;
  paymentStatus: string;
  processingStatus: string;
  amount: number;
  currency: string;
  orderId?: string | null;
  paymentId?: string | null;
  paidAt?: Date | null;
}

class AuditDbStore {
  subscriptionAttempts: SubscriptionPaymentAttemptRow[] = [];
  userSubscriptions: UserSubscriptionRow[] = [];
  webhookEvents: WebhookEventRow[] = [];
  researchReports: ResearchReportRow[] = [];
  customReports: CustomReportRow[] = [];

  reset() {
    this.subscriptionAttempts = [];
    this.userSubscriptions = [];
    this.webhookEvents = [];
    this.researchReports = [];
    this.customReports = [];
  }
}

const auditDb = new AuditDbStore();

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

let mockRazorpayOrdersShouldFail = false;
let mockRazorpayPaymentsShouldFail = false;
let mockDbInsertShouldFail = false;

// Razorpay mock fetch data
const razorpayPaymentsMap = new Map<string, any>();
const razorpayOrdersMap = new Map<string, any>();

// Mock Google Drive
const mockDriveFiles = new Map<string, { content: Buffer; mimeType: string; name: string }>();
let driveClientShouldError = false;

const googleDriveModulePath = require.resolve("../lib/googleDrive");
require.cache[googleDriveModulePath] = {
  id: googleDriveModulePath,
  filename: googleDriveModulePath,
  loaded: true,
  exports: {
    extractGoogleDriveFileId: (urlOrId: string | null | undefined): string | null => {
      if (!urlOrId || typeof urlOrId !== "string") return null;
      const clean = urlOrId.trim();
      const match = clean.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) return match[1];
      if (/^[a-zA-Z0-9_-]{20,}$/.test(clean)) return clean;
      return null;
    },
    downloadDriveFileStream: async (fileId: string) => {
      if (driveClientShouldError) {
        throw new Error("Google Drive API error: 403 Forbidden service account access");
      }
      const file = mockDriveFiles.get(fileId);
      if (!file) {
        throw new Error("File not found in Drive");
      }
      return {
        stream: Readable.from(file.content),
        mimeType: file.mimeType,
        name: file.name,
      };
    },
  },
} as any;

// Mock Razorpay Module
const razorpayModulePath = require.resolve("../lib/razorpay");
const originalRazorpay = require("../lib/razorpay");
require.cache[razorpayModulePath] = {
  id: razorpayModulePath,
  filename: razorpayModulePath,
  loaded: true,
  exports: {
    ...originalRazorpay,
    getRazorpayInstance: () => ({
      orders: {
        create: async (opts: any) => {
          if (mockRazorpayOrdersShouldFail) {
            const err: any = new Error("Gateway timeout communicating with Razorpay");
            err.statusCode = 504;
            throw err;
          }
          const orderId = `order_${Math.random().toString(36).substring(2, 10)}`;
          const order = {
            id: orderId,
            amount: opts.amount,
            currency: opts.currency,
            receipt: opts.receipt,
            status: "created",
            notes: opts.notes,
          };
          razorpayOrdersMap.set(orderId, order);
          return order;
        },
        fetchPayments: async (orderId: string) => {
          const list: any[] = [];
          for (const p of razorpayPaymentsMap.values()) {
            if (p.order_id === orderId) list.push(p);
          }
          return { items: list };
        },
      },
      payments: {
        fetch: async (paymentId: string) => {
          if (mockRazorpayPaymentsShouldFail) {
            throw new Error("Razorpay API down");
          }
          return razorpayPaymentsMap.get(paymentId) || null;
        },
      },
    }),
  },
} as any;

// Mock DB module
const dbModulePath = require.resolve("../config/db");
require.cache[dbModulePath] = {
  id: dbModulePath,
  filename: dbModulePath,
  loaded: true,
  exports: {
    db: {
      select: (_fields?: any) => ({
        from: (table: any) => ({
          where: (condition: any) => {
            const queryFn = async () => {
              const tableName = getDrizzleTableName(table);
              const conds = extractSqlConditions(condition);

              if (tableName === "subscription_payment_attempts") {
                if (conds.order_id) {
                  return auditDb.subscriptionAttempts.filter((a) => a.orderId === conds.order_id);
                }
                if (conds.id) {
                  return auditDb.subscriptionAttempts.filter((a) => a.id === conds.id);
                }
                if (conds.payment_id) {
                  return auditDb.subscriptionAttempts.filter((a) => a.paymentId === conds.payment_id);
                }
                return auditDb.subscriptionAttempts;
              }

              if (tableName === "user_subscriptions") {
                const now = new Date();
                return auditDb.userSubscriptions.filter((sub) => {
                  if (conds.clerk_user_id && sub.clerkUserId !== conds.clerk_user_id) return false;
                  if (conds.access_scope && sub.accessScope !== conds.access_scope) return false;
                  if (conds.status && sub.status !== conds.status) return false;
                  if (conds.payment_id && sub.paymentId !== conds.payment_id) return false;
                  if (conds.order_id && sub.orderId !== conds.order_id) return false;
                  if (conds.expiry_date && !(new Date(sub.expiryDate) > now)) return false;
                  return true;
                });
              }

              if (tableName === "webhook_events") {
                if (conds.event_id) {
                  return auditDb.webhookEvents.filter((e) => e.eventId === conds.event_id);
                }
                return auditDb.webhookEvents;
              }

              if (tableName === "research_reports") {
                if (conds.id) {
                  return auditDb.researchReports.filter((r) => r.id === conds.id);
                }
                return auditDb.researchReports;
              }

              if (tableName === "custom_reports") {
                if (conds.order_id) {
                  return auditDb.customReports.filter((c) => c.orderId === conds.order_id);
                }
                return auditDb.customReports;
              }

              return [];
            };

            return {
              limit: async (_n: number) => {
                const res = await queryFn();
                return res.slice(0, _n);
              },
              orderBy: () => ({
                limit: async (_n: number) => {
                  const res = await queryFn();
                  return res.slice(0, _n);
                },
              }),
              then: (onfulfilled: any, onrejected: any) => queryFn().then(onfulfilled, onrejected),
            };
          },
          orderBy: () => ({
            then: (onfulfilled: any, onrejected: any) => {
              const tableName = getDrizzleTableName(table);
              if (tableName === "user_subscriptions") {
                return Promise.resolve(auditDb.userSubscriptions).then(onfulfilled, onrejected);
              }
              return Promise.resolve([]).then(onfulfilled, onrejected);
            },
          }),
        }),
      }),
      insert: (table: any) => ({
        values: (data: any) => {
          if (mockDbInsertShouldFail) {
            throw new Error("PostgresError: Connection refused or table locked");
          }
          const tableName = getDrizzleTableName(table);

          if (tableName === "subscription_payment_attempts") {
            const row: SubscriptionPaymentAttemptRow = {
              id: `att_${Math.random().toString(36).substring(2, 9)}`,
              orderId: data.orderId || null,
              clerkUserId: data.clerkUserId,
              customerEmail: data.customerEmail,
              customerName: data.customerName || null,
              customerPhone: data.customerPhone || null,
              planId: data.planId,
              accessScope: data.accessScope,
              durationMonths: data.durationMonths,
              amount: data.amount,
              currency: data.currency || "INR",
              status: data.status || "PENDING",
              paymentId: data.paymentId || null,
              signature: data.signature || null,
              createdAt: new Date(),
            };
            auditDb.subscriptionAttempts.push(row);
            return {
              returning: async () => [row],
              then: (onfulfilled: any, onrejected: any) => Promise.resolve([row]).then(onfulfilled, onrejected),
            };
          }

          if (tableName === "user_subscriptions") {
            // Check unique constraint on paymentId and orderId
            const conflictPayment = auditDb.userSubscriptions.find((s) => s.paymentId === data.paymentId);
            const conflictOrder = auditDb.userSubscriptions.find((s) => s.orderId === data.orderId);

            const row: UserSubscriptionRow = {
              id: `sub_${Math.random().toString(36).substring(2, 9)}`,
              clerkUserId: data.clerkUserId,
              customerEmail: data.customerEmail,
              planId: data.planId,
              accessScope: data.accessScope,
              durationMonths: data.durationMonths,
              startDate: data.startDate || new Date(),
              expiryDate: data.expiryDate,
              status: data.status || "ACTIVE",
              orderId: data.orderId,
              paymentId: data.paymentId,
              amount: data.amount,
              createdAt: new Date(),
            };

            return {
              onConflictDoNothing: (_opts?: any) => {
                if (!conflictPayment && !conflictOrder) {
                  auditDb.userSubscriptions.push(row);
                }
                return Promise.resolve([row]);
              },
              then: (onfulfilled: any, onrejected: any) => {
                if (!conflictPayment && !conflictOrder) {
                  auditDb.userSubscriptions.push(row);
                }
                return Promise.resolve([row]).then(onfulfilled, onrejected);
              },
            };
          }

          if (tableName === "webhook_events") {
            const existing = auditDb.webhookEvents.find((e) => e.eventId === data.eventId);
            if (existing) {
              const err: any = new Error("Unique constraint violation: event_id");
              err.code = "23505";
              throw err;
            }
            const row: WebhookEventRow = {
              id: `evt_row_${Math.random().toString(36).substring(2, 9)}`,
              eventId: data.eventId,
              eventType: data.eventType,
              payload: data.payload,
              status: data.status || "PROCESSING",
              createdAt: new Date(),
            };
            auditDb.webhookEvents.push(row);
            return {
              then: (onfulfilled: any, onrejected: any) => Promise.resolve([row]).then(onfulfilled, onrejected),
            };
          }

          if (tableName === "custom_reports") {
            const row: CustomReportRow = {
              id: `cr_${Math.random().toString(36).substring(2, 9)}`,
              clerkUserId: data.clerkUserId || null,
              name: data.name,
              email: data.email,
              mobile: data.mobile,
              category: data.category,
              paymentStatus: data.paymentStatus || "PENDING",
              processingStatus: data.processingStatus || "PENDING",
              amount: data.amount,
              currency: data.currency || "INR",
              orderId: data.orderId || null,
              paymentId: data.paymentId || null,
            };
            auditDb.customReports.push(row);
            return {
              returning: async () => [row],
              then: (onfulfilled: any, onrejected: any) => Promise.resolve([row]).then(onfulfilled, onrejected),
            };
          }

          return {
            returning: async () => [],
            then: (onfulfilled: any, onrejected: any) => Promise.resolve([]).then(onfulfilled, onrejected),
          };
        },
      }),
      update: (table: any) => ({
        set: (data: any) => ({
          where: (condition: any) => {
            const tableName = getDrizzleTableName(table);
            const conds = extractSqlConditions(condition);

            if (tableName === "subscription_payment_attempts") {
              const attempt = auditDb.subscriptionAttempts.find((a) => {
                if (conds.order_id && a.orderId === conds.order_id) return true;
                if (conds.id && a.id === conds.id) return true;
                return false;
              });
              if (attempt) {
                Object.assign(attempt, data);
              }
            }

            if (tableName === "webhook_events") {
              const event = auditDb.webhookEvents.find((e) => e.eventId === conds.event_id);
              if (event) {
                Object.assign(event, data);
              }
            }

            if (tableName === "custom_reports") {
              const cr = auditDb.customReports.find((c) => {
                if (conds.id && c.id === conds.id) return true;
                if (conds.order_id && c.orderId === conds.order_id) return true;
                return false;
              });
              if (cr) {
                Object.assign(cr, data);
              }
            }

            return {
              then: (onfulfilled: any, onrejected: any) => Promise.resolve().then(onfulfilled, onrejected),
            };
          },
        }),
      }),
      transaction: async (cb: any) => {
        // Run callback using the mock client
        return cb(require("../config/db").db);
      },
    },
  },
} as any;

// --- Test Assertions & Runner ---
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
    console.error(`  ✗ FAIL: ${testName}${detail ? ` -> ${detail}` : ""}`);
  }
}

async function runComprehensiveAudit() {
  console.log("================================================================================");
  console.log("FISCAL FORUM - RAZORPAY PURCHASE FLOW SECURITY AUDIT & E2E TEST SUITE");
  console.log("================================================================================\n");

  // Load Route Handlers dynamically
  const createOrderRoute = await import("../app/api/subscriptions/create-order/route");
  const verifyPaymentRoute = await import("../app/api/subscriptions/verify-payment/route");
  const webhookRoute = await import("../app/api/webhooks/razorpay/route");
  const pdfRoute = await import("../app/api/reports/[id]/pdf/route");
  const accessRoute = await import("../app/api/reports/[id]/access/route");
  const { verifyPaymentSignature, verifyWebhookSignature } = await import("../lib/razorpay");
  const { hasReportAccess } = await import("../lib/entitlements");

  // Fixtures
  const subscriberAlice: MockClerkUser = {
    id: "user_alice_test_101",
    firstName: "Alice",
    lastName: "Trader",
    emailAddresses: [{ emailAddress: "alice@fiscalforum.in" }],
    phoneNumbers: [{ phoneNumber: "+919876543210" }],
    publicMetadata: { role: "USER" },
  };

  const attackerBob: MockClerkUser = {
    id: "user_bob_test_202",
    firstName: "Bob",
    lastName: "Attacker",
    emailAddresses: [{ emailAddress: "bob@fiscalforum.in" }],
    phoneNumbers: [{ phoneNumber: "+919876543211" }],
    publicMetadata: { role: "USER" },
  };

  const adminSuper: MockClerkUser = {
    id: "user_admin_test_999",
    firstName: "Admin",
    lastName: "User",
    emailAddresses: [{ emailAddress: "admin@fiscalforum.in" }],
    publicMetadata: { role: "ADMIN" },
  };

  // Setup sample reports in DB
  const preMarketReport: ResearchReportRow = {
    id: "rep_pm_daily_001",
    title: "Nifty 50 Pre-Market Strategy Oct 22",
    reportType: "Pre-Market Research Report",
    price: 49,
    published: true,
    driveFileId: "drive_file_pm_001_id_abcxyz123",
  };

  const weeklyReport: ResearchReportRow = {
    id: "rep_wk_review_002",
    title: "Weekly Equity & Sector Review W43",
    reportType: "Weekly Market Report",
    price: 99,
    published: true,
    driveFileId: "drive_file_wk_002_id_abcxyz123",
  };

  auditDb.researchReports.push(preMarketReport, weeklyReport);
  mockDriveFiles.set(preMarketReport.driveFileId!, {
    content: Buffer.from("%PDF-1.4 Mock Pre-Market Private Content"),
    mimeType: "application/pdf",
    name: "pre_market_report.pdf",
  });
  mockDriveFiles.set(weeklyReport.driveFileId!, {
    content: Buffer.from("%PDF-1.4 Mock Weekly Private Content"),
    mimeType: "application/pdf",
    name: "weekly_report.pdf",
  });

  // ---------------------------------------------------------------------------
  // PHASE 2: Order Creation and Pricing Tests
  // ---------------------------------------------------------------------------
  console.log("[Phase 2] Order Creation, Server Pricing & Input Sanitization");

  // 2.1 Unauthenticated user rejected
  activeClerkUser = null;
  const unauthReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "weekly", durationMonths: 1 }),
  });
  const unauthRes = await createOrderRoute.POST(unauthReq);
  assert(unauthRes.status === 401, "2.1 Unauthenticated user rejected with 401");

  // 2.2 Missing request body / fields
  activeClerkUser = subscriberAlice;
  const missingBodyReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const missingBodyRes = await createOrderRoute.POST(missingBodyReq);
  assert(missingBodyRes.status === 400, "2.2 Empty request body rejected with 400");

  // 2.3 Invalid plan ID
  const invalidPlanReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "super_vip_lifetime", durationMonths: 1 }),
  });
  const invalidPlanRes = await createOrderRoute.POST(invalidPlanReq);
  assert(invalidPlanRes.status === 400, "2.3 Invalid plan ID rejected with 400");

  // 2.4 Non-string planId (number or object) does NOT crash with 500 TypeError
  const nonStringPlanReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: 12345, durationMonths: 1 }),
  });
  const nonStringPlanRes = await createOrderRoute.POST(nonStringPlanReq);
  assert(nonStringPlanRes.status === 400, "2.4 Non-string planId safely rejected with 400");

  // 2.5 Invalid duration (e.g. 12 months, -1, float 1.5, or 'abc')
  const invalidDurReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "weekly", durationMonths: 12 }),
  });
  const invalidDurRes = await createOrderRoute.POST(invalidDurReq);
  assert(invalidDurRes.status === 400, "2.5 Unapproved duration (12 months) rejected with 400");

  const floatDurReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "weekly", durationMonths: 1.5 }),
  });
  const floatDurRes = await createOrderRoute.POST(floatDurReq);
  assert(floatDurRes.status === 400, "2.6 Fractional duration (1.5) rejected with 400");

  // 2.7 Client attempts to inject price / currency (e.g. 1 rupee or USD)
  const tamperReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      planId: "combination",
      durationMonths: 3, // Canonical price is ₹399 = 39,900 paise
      amount: 100, // Client tries ₹1
      currency: "USD", // Client tries USD
    }),
  });
  const tamperRes = await createOrderRoute.POST(tamperReq);
  const tamperData = await tamperRes.json();
  assert(
    tamperRes.status === 201 &&
    tamperData.amount === 39900 &&
    tamperData.currency === "INR",
    "2.7 Client price/currency tampering strictly ignored: canonical ₹399 (39,900 paise) INR used"
  );

  // 2.8 Database attempt record links Razorpay orderId
  const dbAttempt = auditDb.subscriptionAttempts.find((a) => a.orderId === tamperData.orderId);
  assert(
    dbAttempt !== undefined &&
    dbAttempt.amount === 39900 &&
    dbAttempt.status === "PENDING" &&
    dbAttempt.clerkUserId === subscriberAlice.id,
    "2.8 Payment attempt successfully persisted in PENDING status with correct clerkUserId and amount"
  );

  // 2.9 Gateway failure returns safe error without leaking internal credentials
  mockRazorpayOrdersShouldFail = true;
  const failGatewayReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "pre_market", durationMonths: 1 }),
  });
  const failGatewayRes = await createOrderRoute.POST(failGatewayReq);
  const failGatewayData = await failGatewayRes.json();
  assert(
    failGatewayRes.status === 500 &&
    !JSON.stringify(failGatewayData).includes(process.env.RAZORPAY_KEY_SECRET!),
    "2.9 Gateway order failure safely handled with 500 and zero credential leakage"
  );
  mockRazorpayOrdersShouldFail = false;

  // ---------------------------------------------------------------------------
  // PHASE 3: Payment Verification Security Tests
  // ---------------------------------------------------------------------------
  console.log("\n[Phase 3] Payment Verification Security & Signature Validation");

  // Create real test attempt for Alice: Pre-Market 1 Month = ₹119 = 11,900 paise
  const testOrderId = "order_test_alice_pm_100";
  const testPaymentId = "pay_test_alice_pm_100";
  const validSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${testOrderId}|${testPaymentId}`)
    .digest("hex");

  auditDb.subscriptionAttempts.push({
    id: "att_alice_pm_100",
    orderId: testOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: subscriberAlice.emailAddresses[0].emailAddress,
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    amount: 11900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  // Setup Razorpay mock payment
  razorpayPaymentsMap.set(testPaymentId, {
    id: testPaymentId,
    order_id: testOrderId,
    status: "captured",
    amount: 11900,
    currency: "INR",
  });

  // 3.1 Unauthenticated verification rejected
  activeClerkUser = null;
  const unauthVerifyReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const unauthVerifyRes = await verifyPaymentRoute.POST(unauthVerifyReq);
  assert(unauthVerifyRes.status === 401, "3.1 Unauthenticated verification rejected (401)");

  // 3.2 Missing or invalid parameters
  activeClerkUser = subscriberAlice;
  const missingParamsReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ razorpay_order_id: testOrderId }),
  });
  const missingParamsRes = await verifyPaymentRoute.POST(missingParamsReq);
  assert(missingParamsRes.status === 400, "3.2 Missing verification parameters rejected (400)");

  // 3.3 Invalid signature rejected
  const tamperedSigReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: "invalid_tampered_signature_hex",
    }),
  });
  const tamperedSigRes = await verifyPaymentRoute.POST(tamperedSigReq);
  assert(tamperedSigRes.status === 400, "3.3 Tampered payment signature rejected (400)");

  // 3.4 Wrong secret signature rejected
  const wrongSecretSig = crypto
    .createHmac("sha256", "wrong_attacker_secret")
    .update(`${testOrderId}|${testPaymentId}`)
    .digest("hex");
  const wrongSecretReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: wrongSecretSig,
    }),
  });
  const wrongSecretRes = await verifyPaymentRoute.POST(wrongSecretReq);
  assert(wrongSecretRes.status === 400, "3.4 Signature generated with wrong secret rejected (400)");

  // 3.5 Broken Object-Level Authorization: Bob tries to verify Alice's order
  activeClerkUser = attackerBob;
  const bofReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const bofRes = await verifyPaymentRoute.POST(bofReq);
  const bofData = await bofRes.json();
  assert(
    bofRes.status === 403 && bofData.code === "FORBIDDEN_USER",
    "3.5 Cross-user order verification strictly rejected with 403 FORBIDDEN_USER"
  );

  // 3.6 Non-captured payment status (e.g. 'authorized') rejected
  activeClerkUser = subscriberAlice;
  razorpayPaymentsMap.set(testPaymentId, {
    id: testPaymentId,
    order_id: testOrderId,
    status: "authorized", // not captured yet!
    amount: 11900,
    currency: "INR",
  });
  const authorizedReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const authorizedRes = await verifyPaymentRoute.POST(authorizedReq);
  const authData = await authorizedRes.json();
  assert(
    authorizedRes.status === 400 && authData.code === "PAYMENT_NOT_CAPTURED",
    "3.6 'authorized' (non-captured) payment status rejected: no access granted"
  );

  // 3.7 Amount mismatch rejected (e.g. Razorpay captured ₹50 instead of ₹119)
  razorpayPaymentsMap.set(testPaymentId, {
    id: testPaymentId,
    order_id: testOrderId,
    status: "captured",
    amount: 5000, // Only ₹50!
    currency: "INR",
  });
  const underpaidReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const underpaidRes = await verifyPaymentRoute.POST(underpaidReq);
  const underpaidData = await underpaidRes.json();
  assert(
    underpaidRes.status === 400 && underpaidData.code === "AMOUNT_MISMATCH",
    "3.7 Underpaid payment amount rejected with 400 AMOUNT_MISMATCH"
  );

  // 3.8 Payment order_id mismatch rejected
  razorpayPaymentsMap.set(testPaymentId, {
    id: testPaymentId,
    order_id: "order_different_order_id_999",
    status: "captured",
    amount: 11900,
    currency: "INR",
  });
  const orderMismatchReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const orderMismatchRes = await verifyPaymentRoute.POST(orderMismatchReq);
  const orderMismatchData = await orderMismatchRes.json();
  assert(
    orderMismatchRes.status === 400 && orderMismatchData.code === "ORDER_MISMATCH",
    "3.8 Payment associated with different order rejected with 400 ORDER_MISMATCH"
  );

  // 3.9 Valid Captured Payment unlocks subscription and updates attempt to PAID
  razorpayPaymentsMap.set(testPaymentId, {
    id: testPaymentId,
    order_id: testOrderId,
    status: "captured",
    amount: 11900,
    currency: "INR",
  });
  const validVerifyReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const validVerifyRes = await verifyPaymentRoute.POST(validVerifyReq);
  const validVerifyData = await validVerifyRes.json();
  assert(
    validVerifyRes.status === 200 && validVerifyData.success === true,
    "3.9 Valid payment verified successfully: 200 OK returned"
  );

  const updatedAttempt = auditDb.subscriptionAttempts.find((a) => a.orderId === testOrderId);
  assert(
    updatedAttempt?.status === "PAID" && updatedAttempt?.paymentId === testPaymentId,
    "3.10 Subscription payment attempt updated to canonical 'PAID' status"
  );

  const createdSub = auditDb.userSubscriptions.find((s) => s.paymentId === testPaymentId);
  assert(
    createdSub !== undefined &&
    createdSub.clerkUserId === subscriberAlice.id &&
    createdSub.accessScope === "PRE_MARKET" &&
    createdSub.status === "ACTIVE",
    "3.11 User subscription record created with status ACTIVE and scope PRE_MARKET"
  );

  // 3.12 Replay attack / idempotent re-verification
  const replayVerifyReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    }),
  });
  const replayVerifyRes = await verifyPaymentRoute.POST(replayVerifyReq);
  const replayVerifyData = await replayVerifyRes.json();
  const subCount = auditDb.userSubscriptions.filter((s) => s.paymentId === testPaymentId).length;
  assert(
    replayVerifyRes.status === 200 &&
    replayVerifyData.subscription?.alreadyProcessed === true &&
    subCount === 1,
    "3.12 Replayed verification request is idempotent: returns 200 without duplicate row"
  );

  // ---------------------------------------------------------------------------
  // PHASE 4: Double Payment, Concurrency & Duplicate Processing
  // ---------------------------------------------------------------------------
  console.log("\n[Phase 4] Concurrency Race Conditions & Duplicate Processing");

  // 4.1 Concurrent Verification & Webhook Execution for the same payment
  const concurrentOrderId = "order_concurrent_test_300";
  const concurrentPaymentId = "pay_concurrent_test_300";
  const concurrentSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${concurrentOrderId}|${concurrentPaymentId}`)
    .digest("hex");

  auditDb.subscriptionAttempts.push({
    id: "att_concurrent_300",
    orderId: concurrentOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: subscriberAlice.emailAddresses[0].emailAddress,
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "weekly",
    accessScope: "WEEKLY",
    durationMonths: 1,
    amount: 8900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  razorpayPaymentsMap.set(concurrentPaymentId, {
    id: concurrentPaymentId,
    order_id: concurrentOrderId,
    status: "captured",
    amount: 8900,
    currency: "INR",
  });

  // Prepare simultaneous verification request & webhook request
  const clientReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: concurrentOrderId,
      razorpay_payment_id: concurrentPaymentId,
      razorpay_signature: concurrentSig,
    }),
  });

  const webhookBody = JSON.stringify({
    entity: "event",
    id: "evt_concurrent_race_01",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: concurrentPaymentId,
          order_id: concurrentOrderId,
          status: "captured",
          amount: 8900,
          currency: "INR",
        },
      },
    },
  });

  const webhookSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(webhookBody)
    .digest("hex");

  const serverWebhookReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": webhookSig,
    },
    body: webhookBody,
  });

  // Execute both concurrently
  const [clientResult, webhookResult] = await Promise.all([
    verifyPaymentRoute.POST(clientReq),
    webhookRoute.POST(serverWebhookReq),
  ]);

  const concurrentSubRows = auditDb.userSubscriptions.filter((s) => s.paymentId === concurrentPaymentId);
  assert(
    clientResult.status === 200 &&
    webhookResult.status === 200 &&
    concurrentSubRows.length === 1,
    `4.1 Concurrency race between frontend verify and webhook produces exactly ONE active subscription (found ${concurrentSubRows.length})`
  );

  // 4.2 Separate genuine payments for the same user & plan extends active duration
  // Alice now has a Weekly 1-month subscription expiring 1 month from now.
  // Alice intentionally buys another Weekly 1-month subscription (Order 2).
  const renewalOrderId = "order_renewal_weekly_400";
  const renewalPaymentId = "pay_renewal_weekly_400";
  const renewalSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${renewalOrderId}|${renewalPaymentId}`)
    .digest("hex");

  auditDb.subscriptionAttempts.push({
    id: "att_renewal_weekly_400",
    orderId: renewalOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: subscriberAlice.emailAddresses[0].emailAddress,
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "weekly",
    accessScope: "WEEKLY",
    durationMonths: 1,
    amount: 8900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  razorpayPaymentsMap.set(renewalPaymentId, {
    id: renewalPaymentId,
    order_id: renewalOrderId,
    status: "captured",
    amount: 8900,
    currency: "INR",
  });

  const renewalReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: renewalOrderId,
      razorpay_payment_id: renewalPaymentId,
      razorpay_signature: renewalSig,
    }),
  });

  const renewalRes = await verifyPaymentRoute.POST(renewalReq);
  assert(renewalRes.status === 200, "4.2 Second genuine payment verified successfully");

  const allAliceWeeklySubs = auditDb.userSubscriptions.filter(
    (s) => s.clerkUserId === subscriberAlice.id && s.accessScope === "WEEKLY"
  );
  assert(
    allAliceWeeklySubs.length === 2,
    "4.3 Both distinct payment records are preserved for the customer"
  );

  const initialSub = allAliceWeeklySubs.find((s) => s.paymentId === concurrentPaymentId);
  const renewalSub = allAliceWeeklySubs.find((s) => s.paymentId === renewalPaymentId);
  const expectedExtendedExpiry = addMonths(new Date(initialSub!.expiryDate), 1);

  assert(
    new Date(renewalSub!.expiryDate).getTime() === expectedExtendedExpiry.getTime(),
    "4.4 Renewal subscription extends seamlessly from previous subscription expiry date"
  );

  // ---------------------------------------------------------------------------
  // PHASE 5: Webhook Security and Reliability
  // ---------------------------------------------------------------------------
  console.log("\n[Phase 5] Webhook Security, Signature Verification & Idempotency");

  // 5.1 Invalid webhook signature rejected
  const badSigReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": "bad_signature_hex",
    },
    body: JSON.stringify({ event: "payment.captured", id: "evt_bad_sig" }),
  });
  const badSigRes = await webhookRoute.POST(badSigReq);
  assert(badSigRes.status === 400, "5.1 Webhook with invalid HMAC signature rejected with 400");

  // 5.2 Missing signature header rejected
  const missingSigReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "payment.captured", id: "evt_no_sig" }),
  });
  const missingSigRes = await webhookRoute.POST(missingSigReq);
  assert(missingSigRes.status === 400, "5.2 Missing signature header rejected with 400");

  // 5.3 Untracked order returns retryable 500 & leaves event marked FAILED
  const untrackedBody = JSON.stringify({
    entity: "event",
    id: "evt_untracked_order_999",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_untracked_999",
          order_id: "order_not_in_database_404",
          status: "captured",
          amount: 11900,
          currency: "INR",
        },
      },
    },
  });
  const untrackedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(untrackedBody)
    .digest("hex");

  const untrackedReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": untrackedSig,
    },
    body: untrackedBody,
  });
  const untrackedRes = await webhookRoute.POST(untrackedReq);
  const untrackedEvt = auditDb.webhookEvents.find((e) => e.eventId === "evt_untracked_order_999");
  assert(
    untrackedRes.status === 500 && untrackedEvt?.status === "FAILED",
    "5.3 Untracked order returns retryable 500 and event status is marked FAILED"
  );

  // 5.4 Active concurrent lease returns retryable 503
  auditDb.webhookEvents.push({
    id: "evt_row_active_lease",
    eventId: "evt_currently_running_worker",
    eventType: "payment.captured",
    payload: "{}",
    status: "PROCESSING",
    createdAt: new Date(), // Started just now
  });

  const activeLeaseBody = JSON.stringify({
    entity: "event",
    id: "evt_currently_running_worker",
    event: "payment.captured",
  });
  const activeLeaseSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(activeLeaseBody)
    .digest("hex");

  const activeLeaseReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": activeLeaseSig,
    },
    body: activeLeaseBody,
  });
  const activeLeaseRes = await webhookRoute.POST(activeLeaseReq);
  assert(
    activeLeaseRes.status === 503,
    "5.4 Active concurrent webhook worker returns retryable 503"
  );

  // ---------------------------------------------------------------------------
  // PHASE 6: Subscription, Entitlement & PDF Access Tests
  // ---------------------------------------------------------------------------
  console.log("\n[Phase 6] Subscription Scopes & Server-Side Protected PDF Streaming");

  // 6.1 Unauthenticated user denied access to PDF
  activeClerkUser = null;
  const unauthPdfReq = new NextRequest("http://localhost:3000/api/reports/rep_pm_daily_001/pdf");
  const unauthPdfRes = await pdfRoute.GET(unauthPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(unauthPdfRes.status === 401, "6.1 Unauthenticated PDF access denied with 401 AUTH_REQUIRED");

  // 6.2 Pre-Market subscriber GRANTED access to Pre-Market report with security headers
  activeClerkUser = subscriberAlice;
  const pmPdfReq = new NextRequest("http://localhost:3000/api/reports/rep_pm_daily_001/pdf");
  const pmPdfRes = await pdfRoute.GET(pmPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(
    pmPdfRes.status === 200 &&
    pmPdfRes.headers.get("Cache-Control") === "private, no-cache, no-store, must-revalidate" &&
    pmPdfRes.headers.get("X-Content-Type-Options") === "nosniff" &&
    pmPdfRes.headers.get("Content-Type") === "application/pdf",
    "6.2 Pre-Market subscriber GRANTED access to Pre-Market PDF with strict security cache headers"
  );

  // 6.3 Pre-Market subscriber DENIED access to Weekly report
  // (Let's test with a fresh user Charlie who ONLY has Pre-Market)
  const charliePmOnly: MockClerkUser = {
    id: "user_charlie_pm_only",
    emailAddresses: [{ emailAddress: "charlie@fiscalforum.in" }],
    publicMetadata: { role: "USER" },
  };
  auditDb.userSubscriptions.push({
    id: "sub_charlie_pm",
    clerkUserId: charliePmOnly.id,
    customerEmail: "charlie@fiscalforum.in",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    startDate: new Date(),
    expiryDate: addMonths(new Date(), 1),
    status: "ACTIVE",
    orderId: "order_charlie_pm",
    paymentId: "pay_charlie_pm",
    amount: 11900,
    createdAt: new Date(),
  });

  activeClerkUser = charliePmOnly;
  const wkDeniedReq = new NextRequest("http://localhost:3000/api/reports/rep_wk_review_002/pdf");
  const wkDeniedRes = await pdfRoute.GET(wkDeniedReq, { params: Promise.resolve({ id: weeklyReport.id }) });
  assert(
    wkDeniedRes.status === 403,
    "6.3 Pre-Market only subscriber strictly DENIED access to Weekly report (403)"
  );

  // 6.4 Verified Admin granted access without personal subscription
  activeClerkUser = adminSuper;
  const adminPdfReq = new NextRequest("http://localhost:3000/api/reports/rep_wk_review_002/pdf");
  const adminPdfRes = await pdfRoute.GET(adminPdfReq, { params: Promise.resolve({ id: weeklyReport.id }) });
  assert(adminPdfRes.status === 200, "6.4 Verified Admin role GRANTED access to all reports without subscription");

  // 6.5 Expired subscriber strictly DENIED access
  const expiredUser: MockClerkUser = {
    id: "user_david_expired",
    emailAddresses: [{ emailAddress: "david@fiscalforum.in" }],
    publicMetadata: { role: "USER" },
  };
  auditDb.userSubscriptions.push({
    id: "sub_david_expired",
    clerkUserId: expiredUser.id,
    customerEmail: "david@fiscalforum.in",
    planId: "combination",
    accessScope: "COMBINATION",
    durationMonths: 1,
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    expiryDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // expired 30 days ago!
    status: "ACTIVE", // status was ACTIVE, but expiry date is in the past
    orderId: "order_david_expired",
    paymentId: "pay_david_expired",
    amount: 16900,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  });

  activeClerkUser = expiredUser;
  const expiredAccessCheck = await hasReportAccess(expiredUser.id, "USER", "Pre-Market Research Report");
  assert(
    !expiredAccessCheck.hasAccess && expiredAccessCheck.reason === "SUBSCRIPTION_REQUIRED",
    "6.5 Past-expiry subscriber strictly DENIED access (SUBSCRIPTION_REQUIRED)"
  );

  // ---------------------------------------------------------------------------
  // PHASE 7: Refunds and Failed Payments
  // ---------------------------------------------------------------------------
  console.log("\n[Phase 7] Payment Failures, Late Webhooks & Refund Handling");

  // 7.1 payment.failed webhook marks PENDING attempt as FAILED
  const failedOrderId = "order_failed_test_701";
  const failedPaymentId = "pay_failed_test_701";
  auditDb.subscriptionAttempts.push({
    id: "att_failed_701",
    orderId: failedOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: "alice@fiscalforum.in",
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    amount: 11900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  const failedPayload = JSON.stringify({
    entity: "event",
    id: "evt_payment_failed_701",
    event: "payment.failed",
    payload: {
      payment: {
        entity: {
          id: failedPaymentId,
          order_id: failedOrderId,
          status: "failed",
          amount: 11900,
          currency: "INR",
        },
      },
    },
  });

  const failedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(failedPayload)
    .digest("hex");

  const failedReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": failedSig,
    },
    body: failedPayload,
  });

  const failedRes = await webhookRoute.POST(failedReq);
  const updatedFailedAttempt = auditDb.subscriptionAttempts.find((a) => a.orderId === failedOrderId);
  const subCreatedForFailed = auditDb.userSubscriptions.find((s) => s.paymentId === failedPaymentId);

  assert(
    failedRes.status === 200 &&
    updatedFailedAttempt?.status === "FAILED" &&
    subCreatedForFailed === undefined,
    "7.1 payment.failed updates PENDING attempt to FAILED without granting entitlement"
  );

  // 7.2 Late payment.failed must NEVER overwrite an already captured/PAID attempt
  // Setup captured attempt
  const lateFailOrderId = "order_late_fail_702";
  const lateFailPaymentId = "pay_late_fail_702";
  auditDb.subscriptionAttempts.push({
    id: "att_late_fail_702",
    orderId: lateFailOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: "alice@fiscalforum.in",
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    amount: 11900,
    currency: "INR",
    status: "PAID", // Already marked PAID!
    paymentId: lateFailPaymentId,
    createdAt: new Date(),
  });

  const lateFailPayload = JSON.stringify({
    entity: "event",
    id: "evt_late_payment_failed_702",
    event: "payment.failed",
    payload: {
      payment: {
        entity: {
          id: "pay_card_fail_prev",
          order_id: lateFailOrderId,
          status: "failed",
          amount: 11900,
          currency: "INR",
        },
      },
    },
  });

  const lateFailSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(lateFailPayload)
    .digest("hex");

  const lateFailReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": lateFailSig,
    },
    body: lateFailPayload,
  });

  await webhookRoute.POST(lateFailReq);
  const preservedPaidAttempt = auditDb.subscriptionAttempts.find((a) => a.orderId === lateFailOrderId);
  assert(
    preservedPaidAttempt?.status === "PAID",
    "7.2 Late payment.failed event strictly preserves captured 'PAID' state without regression"
  );

  // 7.3 refund.processed: Partial refund does NOT mark payment refunded or revoke access
  const refundTestPaymentId = "pay_refund_partial_703";
  auditDb.subscriptionAttempts.push({
    id: "att_refund_703",
    orderId: "order_refund_partial_703",
    clerkUserId: subscriberAlice.id,
    customerEmail: "alice@fiscalforum.in",
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    amount: 11900,
    currency: "INR",
    status: "PAID",
    paymentId: refundTestPaymentId,
    createdAt: new Date(),
  });

  const partialRefundPayload = JSON.stringify({
    entity: "event",
    id: "evt_refund_partial_703",
    event: "refund.processed",
    payload: {
      refund: {
        entity: {
          id: "rfnd_part_001",
          payment_id: refundTestPaymentId,
          amount: 5000, // Partial refund: ₹50 out of ₹119
          currency: "INR",
        },
      },
      payment: {
        entity: {
          id: refundTestPaymentId,
          amount: 11900,
          amount_refunded: 5000,
        },
      },
    },
  });

  const partialRefundSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(partialRefundPayload)
    .digest("hex");

  const partialRefundReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": partialRefundSig,
    },
    body: partialRefundPayload,
  });

  await webhookRoute.POST(partialRefundReq);
  const partialAttempt = auditDb.subscriptionAttempts.find((a) => a.paymentId === refundTestPaymentId);
  assert(
    partialAttempt?.status === "PAID",
    "7.3 Partial refund does not revoke access or mark status REFUNDED"
  );

  // 7.4 refund.processed: Full refund updates attempt status to REFUNDED
  const fullRefundPayload = JSON.stringify({
    entity: "event",
    id: "evt_refund_full_704",
    event: "refund.processed",
    payload: {
      refund: {
        entity: {
          id: "rfnd_full_002",
          payment_id: refundTestPaymentId,
          amount: 11900, // Full refund ₹119
          currency: "INR",
        },
      },
      payment: {
        entity: {
          id: refundTestPaymentId,
          amount: 11900,
          amount_refunded: 11900,
        },
      },
    },
  });

  const fullRefundSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(fullRefundPayload)
    .digest("hex");

  const fullRefundReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": fullRefundSig,
    },
    body: fullRefundPayload,
  });

  await webhookRoute.POST(fullRefundReq);
  assert(
    partialAttempt?.status === "REFUNDED",
    "7.4 Full refund successfully updates attempt status to REFUNDED for audit tracking"
  );

  // ---------------------------------------------------------------------------
  // PHASE 10: Complete End-to-End Scenarios A through H
  // ---------------------------------------------------------------------------
  console.log("\n[Phase 10] Complete End-to-End Scenarios Validation");

  // Scenario A: Successful purchase flow (create -> verify -> PDF stream)
  activeClerkUser = subscriberAlice;
  const e2eOrderReq = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId: "combination", durationMonths: 6 }), // ₹649 = 64,900 paise
  });
  const e2eOrderRes = await createOrderRoute.POST(e2eOrderReq);
  const e2eOrderData = await e2eOrderRes.json();
  assert(e2eOrderRes.status === 201 && e2eOrderData.amount === 64900, "Scenario A.1: Order created for Combination 6 Months (₹649)");

  const e2ePaymentId = `pay_e2e_${Date.now()}`;
  razorpayPaymentsMap.set(e2ePaymentId, {
    id: e2ePaymentId,
    order_id: e2eOrderData.orderId,
    status: "captured",
    amount: 64900,
    currency: "INR",
  });

  const e2eSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${e2eOrderData.orderId}|${e2ePaymentId}`)
    .digest("hex");

  const e2eVerifyReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: e2eOrderData.orderId,
      razorpay_payment_id: e2ePaymentId,
      razorpay_signature: e2eSig,
    }),
  });
  const e2eVerifyRes = await verifyPaymentRoute.POST(e2eVerifyReq);
  assert(e2eVerifyRes.status === 200, "Scenario A.2: Payment verified and subscription created");

  const e2ePdfReq = new NextRequest(`http://localhost:3000/api/reports/${weeklyReport.id}/pdf`);
  const e2ePdfRes = await pdfRoute.GET(e2ePdfReq, { params: Promise.resolve({ id: weeklyReport.id }) });
  assert(e2ePdfRes.status === 200, "Scenario A.3: Combination subscriber immediately streams Weekly PDF");

  // Scenario B: User closes browser after paying (Webhook reconciles entitlement)
  const bOrderId = "order_b_closed_browser";
  const bPaymentId = "pay_b_closed_browser";
  auditDb.subscriptionAttempts.push({
    id: "att_b_closed_browser",
    orderId: bOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: "alice@fiscalforum.in",
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    amount: 11900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  razorpayPaymentsMap.set(bPaymentId, {
    id: bPaymentId,
    order_id: bOrderId,
    status: "captured",
    amount: 11900,
    currency: "INR",
  });

  const bWebhookBody = JSON.stringify({
    entity: "event",
    id: "evt_b_closed_browser",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: bPaymentId,
          order_id: bOrderId,
          status: "captured",
          amount: 11900,
          currency: "INR",
        },
      },
    },
  });

  const bWebhookSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(bWebhookBody)
    .digest("hex");

  const bWebhookReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": bWebhookSig,
    },
    body: bWebhookBody,
  });

  const bWebhookRes = await webhookRoute.POST(bWebhookReq);
  const bRecoveredSub = auditDb.userSubscriptions.find((s) => s.paymentId === bPaymentId);
  assert(
    bWebhookRes.status === 200 && bRecoveredSub?.status === "ACTIVE",
    "Scenario B: Webhook reconciles payment and recovers entitlement when browser is closed"
  );

  // Scenario C: Duplicate delivery (same webhook delivered twice)
  const cWebhookReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": bWebhookSig,
    },
    body: bWebhookBody,
  });
  const cWebhookRes = await webhookRoute.POST(cWebhookReq);
  const bSubCount = auditDb.userSubscriptions.filter((s) => s.paymentId === bPaymentId).length;
  assert(
    cWebhookRes.status === 200 && bSubCount === 1,
    "Scenario C: Duplicate webhook delivery returns 200 without creating duplicate subscription"
  );

  // Scenario D: Failed payment
  const dOrderId = "order_d_failed";
  const dPaymentId = "pay_d_failed";
  auditDb.subscriptionAttempts.push({
    id: "att_d_failed",
    orderId: dOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: "alice@fiscalforum.in",
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "weekly",
    accessScope: "WEEKLY",
    durationMonths: 1,
    amount: 8900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  const dWebhookBody = JSON.stringify({
    entity: "event",
    id: "evt_d_failed",
    event: "payment.failed",
    payload: {
      payment: {
        entity: {
          id: dPaymentId,
          order_id: dOrderId,
          status: "failed",
          amount: 8900,
        },
      },
    },
  });

  const dWebhookSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(dWebhookBody)
    .digest("hex");

  const dWebhookReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": dWebhookSig,
    },
    body: dWebhookBody,
  });

  await webhookRoute.POST(dWebhookReq);
  const dAttempt = auditDb.subscriptionAttempts.find((a) => a.orderId === dOrderId);
  const dSub = auditDb.userSubscriptions.find((s) => s.orderId === dOrderId);
  assert(
    dAttempt?.status === "FAILED" && dSub === undefined,
    "Scenario D: Failed payment marks attempt FAILED and grants NO subscription"
  );

  // Scenario E: Tampered payment
  const eVerifyReq = new NextRequest("http://localhost:3000/api/subscriptions/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id: dOrderId,
      razorpay_payment_id: "pay_tampered_123",
      razorpay_signature: "tampered_fake_signature",
    }),
  });
  const eVerifyRes = await verifyPaymentRoute.POST(eVerifyReq);
  assert(eVerifyRes.status === 400, "Scenario E: Tampered payment verification rejected with 400");

  // Scenario F: Unauthorized report access
  activeClerkUser = attackerBob;
  const fPdfReq = new NextRequest(`http://localhost:3000/api/reports/${preMarketReport.id}/pdf`);
  const fPdfRes = await pdfRoute.GET(fPdfReq, { params: Promise.resolve({ id: preMarketReport.id }) });
  assert(fPdfRes.status === 403, "Scenario F: Unauthorized user access denied with 403");

  // Scenario G: Duplicate genuine payments (Verified in Phase 4.2-4.4)
  assert(allAliceWeeklySubs.length === 2, "Scenario G: Two separate genuine payments preserved and renewal math applied");

  // Scenario H: Recovery from transient failure
  mockRazorpayPaymentsShouldFail = true;
  const hOrderId = "order_h_transient_fail";
  const hPaymentId = "pay_h_transient_fail";
  auditDb.subscriptionAttempts.push({
    id: "att_h_fail",
    orderId: hOrderId,
    clerkUserId: subscriberAlice.id,
    customerEmail: "alice@fiscalforum.in",
    customerName: "Alice Trader",
    customerPhone: "+919876543210",
    planId: "pre_market",
    accessScope: "PRE_MARKET",
    durationMonths: 1,
    amount: 11900,
    currency: "INR",
    status: "PENDING",
    createdAt: new Date(),
  });

  const hWebhookBody = JSON.stringify({
    entity: "event",
    id: "evt_h_transient",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: hPaymentId,
          order_id: hOrderId,
          status: "captured",
          amount: 11900,
        },
      },
    },
  });

  const hWebhookSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(hWebhookBody)
    .digest("hex");

  const hWebhookReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": hWebhookSig,
    },
    body: hWebhookBody,
  });

  const hFailRes = await webhookRoute.POST(hWebhookReq);
  assert(hFailRes.status === 500, "Scenario H.1: Transient gateway error returns retryable 500");

  // Recovery: Razorpay API becomes available again, event retried
  mockRazorpayPaymentsShouldFail = false;
  razorpayPaymentsMap.set(hPaymentId, {
    id: hPaymentId,
    order_id: hOrderId,
    status: "captured",
    amount: 11900,
    currency: "INR",
  });

  const hRetryReq = new NextRequest("http://localhost:3000/api/webhooks/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": hWebhookSig,
    },
    body: hWebhookBody,
  });

  const hRecoverRes = await webhookRoute.POST(hRetryReq);
  const hRecoveredSub = auditDb.userSubscriptions.find((s) => s.paymentId === hPaymentId);
  assert(
    hRecoverRes.status === 200 && hRecoveredSub?.status === "ACTIVE",
    "Scenario H.2: System smoothly recovers on retry without data corruption"
  );

  console.log("\n================================================================================");
  console.log(`TOTAL AUDIT TEST SUITE RESULTS: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log("================================================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runComprehensiveAudit().catch((err) => {
  console.error("Audit Test Suite Unhandled Error:", err);
  process.exit(1);
});
