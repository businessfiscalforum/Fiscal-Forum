import type { Metadata } from "next";
import './globals.css';
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./(routes)/_components/Navbar";
import Provider from "./provider";
import Footer from "./(routes)/_components/Footer";
import { GoogleAnalytics } from "./(routes)/_components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FomoStack from "./(routes)/_components/FomoStack";
import LiveUserPulse from "./(routes)/_components/LiveUserPulse"
import PopupController from "./(routes)/_components/PopupController";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fiscalforum.in"),
  title: {
    default: "Fiscal Forum", 
    template: "%s | Fiscal Forum", 
  },
  description: "Join Fiscal Forum for the latest financial discussions, market insights, and expert advice.",
  keywords: ["Finance", "Forum", "Fiscal Forum", "Investment", "India Finance"],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
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
  other: {
    "site_name": "Fiscal Forum",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const siteNameJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fiscal Forum",
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
        <body className={""}>
          {/* <GlowCursor /> */}
          <GoogleAnalytics/>
          <Analytics />
          <SpeedInsights />
          <Navbar />
          <FomoStack />
          <LiveUserPulse/>
          {/* <PopupController /> */}
          <Provider>{children}</Provider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}