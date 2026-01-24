import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { ClerkProvider } from "@clerk/nextjs";
// import { GlowCursor } from "./(routes)/components/GlowCursor";
import Navbar from "./(routes)/_components/Navbar";
import Provider from "./provider";
import Footer from "./(routes)/_components/Footer";
import { GoogleAnalytics } from "./(routes)/_components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL("https://www.fiscalforum.in"),
  title: {
    default: "Fiscal Forum - Financial Discussions & Insights", 
    template: "%s | Fiscal Forum",
  },
  description: "Join Fiscal Forum for the latest financial discussions, market insights, and expert advice.",
  keywords: ["Finance", "Forum", "Fiscal Forum", "Investment", "India Finance"],
  
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  openGraph: {
    title: "Fiscal Forum",
    description: "Financial discussions and insights",
    url: "https://www.fiscalforum.in",
    siteName: "Fiscal Forum",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // Google Site Name
  const siteNameJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fiscal Forum",
    "alternateName": ["FiscalForum", "FF"], 
    "url": "https://www.fiscalforum.in",
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNameJsonLd) }}
          />
        </head>
        <body className="antialiased">
          <GoogleAnalytics />
          <Analytics />
          <SpeedInsights />

          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Provider>{children}</Provider>
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}