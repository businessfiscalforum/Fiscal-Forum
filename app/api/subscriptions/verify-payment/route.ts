import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { verifyPaymentSignature } from "../../../../lib/razorpay";
import {
  reconcileSubscriptionPayment,
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
        { success: false, error: "Please sign in to verify your subscription payment." },
        { status: 401, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (
      !razorpay_order_id || typeof razorpay_order_id !== "string" ||
      !razorpay_payment_id || typeof razorpay_payment_id !== "string" ||
      !razorpay_signature || typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid payment verification parameters." },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    // 1. Cryptographically verify signature
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature. Verification failed." },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    // 2. Reconcile payment via server DB record & activate subscription entitlement
    const result = await reconcileSubscriptionPayment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      expectedClerkUserId: user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subscription activated successfully!",
        subscription: result,
      },
      { status: 200, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    if (error instanceof SubscriptionError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: error.status, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const diag = logSafeDiagnostic("Subscription verify-payment", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify subscription payment." },
      { status: diag.httpStatus >= 400 && diag.httpStatus < 600 ? diag.httpStatus : 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
