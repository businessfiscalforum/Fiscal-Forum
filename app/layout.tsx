import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GlowCursor } from "./(routes)/components/GlowCursor";
import Navbar from "./(routes)/components/Navbar";
import Provider from "./provider";
import Footer from "./(routes)/components/Footer";

export const metadata: Metadata = {
  title: "Fiscal Forum",
  description: "Financial discussions and insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={""}>
          <GlowCursor />
          <Navbar />
          <Provider>{children}</Provider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
