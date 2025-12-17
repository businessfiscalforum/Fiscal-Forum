import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, userAgent } from "next/server";


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
  "/work-with-us/:path*",
  "/ipo",
  "/contact",
  "/privacy",
  "/terms-&-conditions",
  "/sitemap.xml",
  "/robots.txt",
]);

export default clerkMiddleware(async (auth, req) => {
  const { isBot } = userAgent(req);


  if (isBot) {
    return NextResponse.next();
  }

  /**
   * Protect all non-public routes
   */
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};