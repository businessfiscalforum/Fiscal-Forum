import { NextResponse } from "next/server";

/**
 * Discontinued single-report order creation endpoint.
 * All research reports are now accessible exclusively through the nine approved subscription plans.
 */
export async function POST(_req?: Request) {
  return NextResponse.json(
    {
      error: "Single-report purchases have been discontinued. Please subscribe to an approved subscription plan to access research reports.",
      code: "DISCONTINUED_PURCHASE_FLOW",
      subscribeUrl: "/reports/join",
    },
    { status: 410 }
  );
}
