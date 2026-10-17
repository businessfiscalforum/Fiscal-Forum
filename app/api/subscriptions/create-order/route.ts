import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../../config/db";
import { subscriptionPaymentAttemptsTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { getRazorpayInstance } from "../../../../lib/razorpay";
import {
  getSubscriptionPlan,
  SubscriptionError,
} from "../../../../lib/subscriptions";

import { logSafeDiagnostic } from "../../../../lib/diagnosticLogger";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: "Please sign in to purchase or renew a subscription." },
        { status: 401, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { planId, durationMonths } = body;

    if (!planId || !durationMonths) {
      return NextResponse.json(
        { success: false, error: "Both planId and durationMonths are required." },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const { plan, durationConfig } = getSubscriptionPlan(
      planId,
      Number(durationMonths)
    );

    const email = user.emailAddresses[0]?.emailAddress || "customer@fiscalforum.in";
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Fiscal Forum Member";
    const phone = user.phoneNumbers[0]?.phoneNumber || null;

    // 1. Create a pending payment attempt in the database
    const [attempt] = await db
      .insert(subscriptionPaymentAttemptsTable)
      .values({
        clerkUserId: user.id,
        customerEmail: email,
        customerName: name,
        customerPhone: phone,
        planId: plan.id,
        accessScope: plan.scope,
        durationMonths: durationConfig.months,
        amount: durationConfig.priceInPaise,
        currency: "INR",
        status: "PENDING",
      })
      .returning();

    // 2. Create the Razorpay Order with strictly server-controlled pricing
    const razorpay = getRazorpayInstance();
    const receipt = `sub_${attempt.id.replace(/-/g, "").slice(0, 10)}_${Date.now()}`.slice(0, 40);

    const order = await razorpay.orders.create({
      amount: durationConfig.priceInPaise,
      currency: "INR",
      receipt,
      notes: {
        purchaseType: "SUBSCRIPTION",
        attemptId: attempt.id,
        planId: plan.id,
        scope: plan.scope,
        durationMonths: String(durationConfig.months),
        clerkUserId: user.id,
      },
    });

    // 3. Link Razorpay orderId with the attempt
    await db
      .update(subscriptionPaymentAttemptsTable)
      .set({ orderId: order.id })
      .where(eq(subscriptionPaymentAttemptsTable.id, attempt.id));

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: "INR",
        keyId,
        planTitle: plan.title,
        durationMonths: durationConfig.months,
        userName: name,
        userEmail: email,
        plan: {
          id: plan.id,
          title: plan.title,
          scope: plan.scope,
          durationMonths: durationConfig.months,
          priceInRupees: durationConfig.priceInRupees,
        },
        prefill: {
          name,
          email,
          contact: phone || undefined,
        },
      },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    if (error instanceof SubscriptionError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: error.status, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const diag = logSafeDiagnostic("Subscription create-order", error);

    // Determine safe client-facing error message and status
    let clientMessage = "Failed to initialize subscription checkout.";
    let clientStatus = 500;

    if (diag.httpStatus === 401 && diag.exceptionName === "RazorpayAPIError") {
      clientMessage = "Payment gateway authentication failed. Please check server gateway credentials.";
      clientStatus = 502;
    } else if (diag.httpStatus === 400 && diag.providerErrorCode) {
      clientMessage = `Payment gateway rejected order: ${diag.message}`;
      clientStatus = 400;
    } else if (diag.exceptionName === "PostgresError") {
      clientMessage = "Database error occurred during subscription attempt creation.";
      clientStatus = 500;
    }

    return NextResponse.json(
      {
        success: false,
        error: clientMessage,
        ...(diag.providerErrorCode ? { providerErrorCode: diag.providerErrorCode } : {}),
      },
      { status: clientStatus, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
