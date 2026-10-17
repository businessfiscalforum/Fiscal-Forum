/**
 * End-to-end integration test for POST /api/subscriptions/create-order
 * Verifies real Neon DB attempt insertion, real Razorpay Test Mode order creation,
 * and orderId database linking.
 */

import { NextRequest } from "next/server";
import postgres from "postgres";

// Load environment variables from .env.local
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(".env.local") });

// Mock server-only for Next.js server module loading in node
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

// Mock Clerk's currentUser to return a test user
const mockClerkUser = {
  id: "user_test_debug_subscription_123",
  firstName: "Test",
  lastName: "Subscriber",
  emailAddresses: [{ emailAddress: "test-debug@fiscalforum.in" }],
  phoneNumbers: [{ phoneNumber: "+919876543210" }],
};

try {
  const clerkPath = require.resolve("@clerk/nextjs/server");
  const clerkMod = require(clerkPath);
  require.cache[clerkPath] = {
    ...require.cache[clerkPath],
    exports: {
      ...clerkMod,
      currentUser: async () => mockClerkUser,
    },
  } as any;
} catch {
  // Ignore
}

async function runTest() {
  console.log("==================================================================");
  console.log("TESTING POST /api/subscriptions/create-order (END-TO-END)");
  console.log("==================================================================");

  const { POST } = await import("../app/api/subscriptions/create-order/route");

  const req = new NextRequest("http://localhost:3000/api/subscriptions/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Origin": "http://localhost:3000",
    },
    body: JSON.stringify({
      planId: "weekly",
      durationMonths: 1, // Weekly 1 month = ₹89 = 8,900 paise
    }),
  });

  const res = await POST(req);
  const data = await res.json();

  console.log("HTTP Status:", res.status);
  console.log("Response Success:", data.success);
  console.log("Response Order ID:", data.orderId ? data.orderId.slice(0, 10) + "..." : "none");
  console.log("Response Amount (paise):", data.amount);
  console.log("Response Currency:", data.currency);
  console.log("Response Plan Title:", data.planTitle);
  console.log("Response Duration Months:", data.durationMonths);

  if (res.status !== 201 || !data.success || !data.orderId) {
    console.error("TEST FAILED! Full response:", data);
    process.exit(1);
  }

  // Verify DB linking
  const client = postgres(process.env.DATABASE_URL!, { max: 1 });
  try {
    const [dbRow] = await client`
      SELECT id, clerk_user_id, plan_id, amount, status, order_id
      FROM subscription_payment_attempts
      WHERE order_id = ${data.orderId};
    `;

    console.log("Database Attempt Row Found:", !!dbRow);
    console.log("Database Order ID matches:", dbRow?.order_id === data.orderId);
    console.log("Database Status:", dbRow?.status);

    if (!dbRow || dbRow.order_id !== data.orderId) {
      console.error("DB check failed! Order was not linked in subscription_payment_attempts.");
      process.exit(1);
    }

    // Clean up test attempt record
    await client`DELETE FROM subscription_payment_attempts WHERE id = ${dbRow.id}`;
    console.log("Cleaned up test record from database successfully.");
  } finally {
    await client.end();
  }

  console.log("==================================================================");
  console.log("ALL E2E SUBSCRIPTION ORDER CHECKS PASSED SUCCESSFULLY!");
  console.log("==================================================================");
  process.exit(0);
}

runTest().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
