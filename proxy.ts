import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
  "/api/news",
  "/api/news/ipo-scoop",
  "/api/news/corp-pulse",
  "/api/news/news-buzz",
  "/api/reports",
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
  // "/api/reports",
  "/api/rp",
  "/api/savings-account",
  "/api/schedule-call",
  // "/api/send-quote",
  "/api/subscribe",
  "/api/transfer-demat",
  "/api/travel-insurance",
  "/api/two-wheeler-insurance",
  "/work-with-us/:path*",
  "/ipo",
  "/contact",
  "/privacy",
  "/terms-and-conditions",
  "/api/referrals",
  "/sitemap.xml",
  "/robots.txt",
  "/bonds.json",
  "/for-women",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPartnerRoute = createRouteMatcher(["/crm(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  //Google search engine bot bypass
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /googlebot|bingbot|yandex|baiduspider/i.test(userAgent);

  // Public routes → Clerk skip
  if (isBot || isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protected routes
  await auth.protect();

  // Role-based checks
  const user = await auth();

  // Bypass role metadata checks in local development to simplify testing
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  if (isAdminRoute(req) && user?.sessionClaims?.metadata?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  if (isPartnerRoute(req) && user?.sessionClaims?.metadata?.role !== "PARTNER") {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }
});



