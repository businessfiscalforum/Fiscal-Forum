
import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPreview = process.env.VERCEL_ENV === "preview";

const clerkPublishableKey = isPreview
  ? process.env.NEXT_PUBLIC_PREVIEW_CLERK_PUBLISHABLE_KEY
  : process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const clerkSecretKey = isPreview
  ? process.env.PREVIEW_CLERK_SECRET_KEY
  : process.env.CLERK_SECRET_KEY;

if (!clerkPublishableKey || !clerkSecretKey) {
  throw new Error(
    `Missing Clerk keys for ${isPreview ? "Preview" : "Production/Development"} environment.`
  );
}

const isPublicRoute = createRouteMatcher([
  "/",
  "/users",
  "/sign-in",
  "/sign-in/:path*",
  "/sign-up",
  "/sign-up/:path*",
  "/services",
  "/services/:path*",
  "/about-us",
  "/news",
  "/news/:path*",
  "/newsletter",
  "/newsletter/:path*",
  "/reports",
  "/reports/:path*",
  "/research",
  "/research/:path*",
  "/screener",
  "/screener/:path*",
  "/api/news",
  "/api/news/ipo-scoop",
  "/api/news/corp-pulse",
  "/api/news/news-buzz",
  "/api/reports",
  "/api/webhooks/razorpay",
  "/api/checkout/:path*",
  "/api/subscriptions/:path*",
  "/api/custom-reports",
  "/api/custom-reports/:path*",
  "/api/send-quote",
  "/api/users",
  "/api/car-insurance",
  "/api/car-loan",
  "/api/business-loan",
  "/api/bdp",
  "/api/b2b-partner",
  "/api/commercial-vehicle-insurance",
  "/api/dematApply",
  "/api/document-support",
  "/api/education-loan",
  "/api/gold-loan",
  "/api/health-insurance",
  "/api/home-loan",
  "/api/investment-form",
  "/api/lap-loan",
  "/api/las-loan",
  "/api/life-insurance",
  "/api/mfpreferences",
  "/api/mfTransfer",
  "/api/newsletter",
  "/api/personal-accident-insurance",
  "/api/personal-loan",
  "/api/property-insurance",
  "/api/rp",
  "/api/savings-account",
  "/api/schedule-call",
  "/api/subscribe",
  "/api/transfer-demat",
  "/api/travel-insurance",
  "/api/two-wheeler-insurance",
  "/work-with-us/:path*",
  "/contact",
  "/contacts",
  "/privacy",
  "/terms-and-conditions",
  "/terms",
  "/refund",
  "/shipping-policy",
  "/shipping",
  "/api/referrals",
  "/sitemap.xml",
  "/robots.txt",
  "/bonds.json",
  "/for-women",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPartnerRoute = createRouteMatcher(["/crm(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = /googlebot|bingbot|yandex|baiduspider/i.test(
      userAgent
    );

    if (isBot || isPublicRoute(req)) {
      return NextResponse.next();
    }

    await auth.protect();

    const user = await auth();

    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }

    if (
      isAdminRoute(req) &&
      user?.sessionClaims?.metadata?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url), 302);
    }

    if (
      isPartnerRoute(req) &&
      user?.sessionClaims?.metadata?.role !== "PARTNER"
    ) {
      return NextResponse.redirect(new URL("/", req.url), 302);
    }
  },
  {
    publishableKey: clerkPublishableKey,
    secretKey: clerkSecretKey,
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
