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
export const metadata: Metadata = {
  title: "Fiscal Forum",
  description: "Financial discussions and insights",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={""}>
          {/* <GlowCursor /> */}
          <GoogleAnalytics/>
          <Analytics />
          <SpeedInsights />
          <Navbar />
          <Provider>{children}</Provider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
