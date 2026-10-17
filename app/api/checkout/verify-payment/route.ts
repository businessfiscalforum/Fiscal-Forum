import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { verifyPaymentSignature } from "../../../../lib/razorpay";
import { reconcilePaymentAndGrantAccess, PaymentReconciliationError } from "../../../../lib/entitlements";

export async function POST(req: NextRequest) {
  try {
    // 1. Require Clerk authentication
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Authentication required to verify payment.", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    const clerkUserId = user.id;

    // 2. Validate all request fields
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, reportId } = body;

    if (
      !razorpay_order_id || typeof razorpay_order_id !== "string" ||
      !razorpay_payment_id || typeof razorpay_payment_id !== "string" ||
      !razorpay_signature || typeof razorpay_signature !== "string" ||
      !reportId || typeof reportId !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid payment verification parameters." },
        { status: 400 }
      );
    }

    // 3. Cryptographically verify signature using server secret
    const isValidSignature = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { error: "Invalid payment signature. Verification failed." },
        { status: 400 }
      );
    }

    // 4. Delegate to shared, idempotent reconciliation function
    try {
      await reconcilePaymentAndGrantAccess({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        expectedClerkUserId: clerkUserId,
        expectedReportId: reportId,
      });
    } catch (reconcileErr: unknown) {
      if (reconcileErr instanceof PaymentReconciliationError) {
        return NextResponse.json(
          {
            error: reconcileErr.message,
            code: reconcileErr.code,
            ...(reconcileErr.paymentStatus ? { status: reconcileErr.paymentStatus } : {}),
          },
          { status: reconcileErr.status }
        );
      }
      throw reconcileErr;
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified! Your report access is unlocked permanently.",
      pdfAccessUrl: `/api/reports/${reportId}/pdf`,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Payment verification failure:", errMsg);
    return NextResponse.json(
      { error: "Failed to verify payment." },
      { status: 500 }
    );
  }
}
