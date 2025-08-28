import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
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
  '/api/car-insurance',
  '/api/car-loan',
  '/api/business-loan',
  '/api/bdp',
  '/api/b2b-partner',
  '/api/commercial-vehicle-insurance',
  '/api/dematApply',
  '/api/document-support',
  '/api/education-loan',
  '/api/gold-loan',
  '/api/health-insurance',
  '/api/home-loan',
  '/api/investment-form',
  '/api/lap-loan',
  '/api/las-loan',
  '/api/life-insurance',
  '/api/mfpreferences',
  '/api/mfTransfer',
  '/api/newsletter',
  '/api/personal-accident-insurance',
  '/api/personal-loan',
  '/api/property-insurance',
  '/api/reports',
  '/api/rp',
  '/api/savings-account',
  '/api/schedule-call',
  '/api/send-quote',
  '/api/subscribe',
  '/api/transfer-demat',
  '/api/travel-insurance',
  '/api/two-wheeler-insurance',
  '/api/yahoo-stock-data',
  '/work-with-us',
  '/ipo',
  '/contact',
  '/services(.*)',
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