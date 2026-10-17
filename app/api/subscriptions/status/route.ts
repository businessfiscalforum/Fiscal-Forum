import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  getUserSubscriptionDetails,
  hasActiveSubscriptionForCategory,
} from "../../../../lib/subscriptions";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
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

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json(
        {
          success: true,
          isAuthenticated: false,
          activeSubscriptions: [],
          canAccessPreMarket: false,
          canAccessWeekly: false,
          history: [],
        },
        { status: 200, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const { activeSubscriptions, history } = await getUserSubscriptionDetails(user.id);
    const [canAccessPreMarket, canAccessWeekly] = await Promise.all([
      hasActiveSubscriptionForCategory(user.id, "PRE_MARKET"),
      hasActiveSubscriptionForCategory(user.id, "WEEKLY"),
    ]);

    const isAdmin =
      (user.publicMetadata?.role as string) === "ADMIN" ||
      user.emailAddresses.some((e) =>
        ["admin@fiscalforum.in", "contact@fiscalforum.in", "nakul@fiscalforum.in"].includes(
          e.emailAddress.toLowerCase()
        )
      );

    return NextResponse.json(
      {
        success: true,
        isAuthenticated: true,
        userId: user.id,
        isAdmin,
        activeSubscriptions,
        canAccessPreMarket: isAdmin || canAccessPreMarket,
        canAccessWeekly: isAdmin || canAccessWeekly,
        history,
      },
      { status: 200, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Internal error";
    console.error("Subscription status error:", errMsg);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscription status." },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
