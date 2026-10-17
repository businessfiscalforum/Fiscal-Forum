
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
  PaymentReconciliationError,
  reconcilePaymentAndGrantAccess,
} from "@/lib/entitlements";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // 1. Require an authenticated Clerk user.
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Accept only the existing order and payment identifiers.
    const body = await request.json();
    const orderId = body?.orderId;
    const paymentId = body?.paymentId;

    if (
      typeof orderId !== "string" ||
      typeof paymentId !== "string" ||
      !/^order_[A-Za-z0-9]+$/.test(orderId) ||
      !/^pay_[A-Za-z0-9]+$/.test(paymentId)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid order or payment ID." },
        { status: 400 }
      );
    }

    // 3. Reuse the existing server-side Razorpay checks.
    // Ownership is checked against the stored payment attempt.
    // Amount, currency, order association, and captured status
    // are independently verified before access is granted.
    const result = await reconcilePaymentAndGrantAccess({
      orderId,
      paymentId,
      expectedClerkUserId: user.id,
    });

    return NextResponse.json({
      success: true,
      message: "Payment reconciled successfully.",
      reportId: result.reportId,
    });
  } catch (error) {
    if (error instanceof PaymentReconciliationError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
        },
        { status: error.status }
      );
    }

    console.error("Payment reconciliation failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to reconcile payment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
