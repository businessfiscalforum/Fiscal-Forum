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
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPartnerRoute = createRouteMatcher(["/crm(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Redirect non-www to www
  const url = req.nextUrl.clone();
  if (url.hostname === 'fiscalforum.in') {
    url.hostname = 'www.fiscalforum.in';
    return NextResponse.redirect(url, 301);
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "ADMIN"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url,301);
  }
  if (
    isPartnerRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "PARTNER"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url, 301);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};