import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/',
  '/users',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/services(.*)',         
  '/news',
  '/reports',
  '/api/news',
  '/api/reports',
  '/api/send-quote', 
  '/api/users',
  '/api/applications', 
           '/api/car-insurance',
         '/api/health-insurance',
         '/api/life-insurance',
         '/api/two-wheeler-insurance',
         '/api/commercial-vehicle-insurance',
         '/api/personal-accident-insurance',
         '/api/property-insurance',
         '/api/travel-insurance',
  '/work-with-us',
  '/ipo'
])

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'ADMIN') {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}