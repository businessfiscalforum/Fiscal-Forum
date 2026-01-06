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
    template: "%s",
  },

  description: "Financial discussions and insights",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
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
          <FomoStack />
          <LiveUserPulse/>
          <PopupController />
          <Provider>{children}</Provider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}