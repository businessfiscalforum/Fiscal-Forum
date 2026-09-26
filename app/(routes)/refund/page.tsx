import React from "react";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Fiscal Forum",
  description:
    "Refund and Cancellation Policy for products and services on Fiscal Forum platform.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RefundPolicyPage() {
  const points = [
    "Cancellations will only be considered if the request is made within 7 days of placing the order. Requests may not be entertained if the order has already been communicated to the seller/merchant and shipping has begun, or the product is out for delivery — in that case, you may reject the product at the doorstep.",
    "8696060387 does not accept cancellation requests for perishable items such as flowers or eatables. However, a refund or replacement may be made if the user establishes that the quality of the delivered product is not good.",
    "For damaged or defective items, report to our customer service team within 7 days of receipt. The request will be entertained once the seller/merchant has inspected and confirmed the issue.",
    "If the product received does not match what was shown on the site or your expectations, notify customer service within 7 days of receiving the product. The team will review the complaint and take an appropriate decision.",
    "For complaints regarding products that come with a manufacturer's warranty, please refer the issue directly to the manufacturer.",
    (
      <>
        Approved refunds will be processed within <strong className="font-bold text-[#171512]">1 day</strong>.
      </>
    ),
  ];

  return (
    <div
      className={`min-h-screen bg-[#F3EEE3] text-[#171512] pt-24 sm:pt-28 pb-16 font-sans selection:bg-[#2F4A3C] selection:text-white ${sourceSerif.variable}`}
    >
      {/* Header */}
      <div className="max-w-[850px] mx-auto px-6">
        <header className="border-b border-[#D9D0BC] py-5">
          <div className="flex justify-between items-baseline gap-4 flex-wrap">
            <div className="font-[family-name:var(--font-source-serif)] font-semibold text-lg tracking-[0.01em]">
              FISCAL <span className="text-[#2F4A3C]">FORUM</span>
            </div>
            <div className="text-xs text-[#4A453D]">
              Refund &amp; Cancellation
            </div>
          </div>
        </header>

        {/* Policy Navigation Bar */}
        <nav className="flex flex-wrap gap-2 sm:gap-4 py-4 border-b border-[#D9D0BC] text-xs sm:text-sm font-medium text-[#4A453D]">
          <Link href="/terms-and-conditions" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/refund" className="px-3 py-1.5 rounded-md bg-[#2F4A3C] text-white font-semibold">
            Refund &amp; Cancellation
          </Link>
          <Link href="/return-policy" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Return Policy
          </Link>
          <Link href="/shipping-policy" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Shipping Policy
          </Link>
        </nav>
      </div>

      {/* Hero Header */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="pt-10 pb-8 border-b border-[#D9D0BC]">
          <span className="inline-block px-3 py-1 bg-[#2F4A3C] text-white text-xs font-semibold tracking-wider uppercase rounded-full mb-3">
            Legal
          </span>
          <h1 className="font-[family-name:var(--font-source-serif)] font-bold text-[32px] sm:text-[40px] leading-[1.18] mb-4 text-[#171512]">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-base sm:text-[15.5px] leading-[1.75] text-[#2C2825] max-w-[64ch] m-0">
            This Refund and Cancellation Policy outlines how you can cancel or seek a refund for a product or service purchased through the Platform.
          </p>
        </section>
      </div>

      {/* Content Body */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-10 space-y-6 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          {points.map((p, index) => (
            <div
              key={index}
              className="py-4 border-b border-[#D9D0BC]/60 flex gap-4 items-start"
            >
              <span className="font-semibold text-[#171512] min-w-[24px]">
                {index + 1}.
              </span>
              <p className="m-0">{p}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Page Footer Note */}
      <div className="max-w-[850px] mx-auto px-6 mt-6">
        <footer className="border-t border-[#D9D0BC] py-6 text-xs text-[#4A453D] flex justify-between flex-wrap gap-2">
          <span>&copy; Fiscal Forum &middot; <a href="mailto:contact@fiscalforum.in" className="hover:underline">contact@fiscalforum.in</a></span>
          <span>Bhilwara, Rajasthan, India</span>
        </footer>
      </div>
    </div>
  );
}