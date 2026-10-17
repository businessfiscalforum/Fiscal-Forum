import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "../../../../lib/razorpay";
import {
  reconcileCustomReportPayment,
  CustomReportError,
} from "../../../../lib/customReports";

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

    // 1. Cryptographically verify signature using server secret
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

    // 2. Reconcile captured payment and update report status
    const result = await reconcileCustomReportPayment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your payment was successful! Your report will be sent over WhatsApp or email.",
        customReportId: result.customReportId,
        category: result.category,
      },
      { status: 200, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    if (error instanceof CustomReportError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: error.status, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const errMsg = error instanceof Error ? error.message : "Internal error";
    console.error("Custom report payment verification error:", errMsg);
    return NextResponse.json(
      { success: false, error: "Failed to verify payment." },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
