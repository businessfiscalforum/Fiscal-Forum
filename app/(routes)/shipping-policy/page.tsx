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
  title: "Shipping Policy | Fiscal Forum",
  description:
    "Shipping Policy for orders and services on Fiscal Forum platform.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ShippingPolicyPage() {
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
              Shipping Policy
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
          <Link href="/refund" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Refund &amp; Cancellation
          </Link>
          <Link href="/return-policy" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Return Policy
          </Link>
          <Link href="/shipping-policy" className="px-3 py-1.5 rounded-md bg-[#2F4A3C] text-white font-semibold">
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
            Shipping Policy
          </h1>
        </section>
      </div>

      {/* Content Body */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-10 space-y-6 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          <p className="m-0">
            Orders are shipped through registered domestic courier companies and/or speed post only, within <strong className="font-bold text-[#171512]">1 day</strong> of the order and/or payment, or as per the delivery date agreed at the time of order confirmation, subject to courier company/post office norms.
          </p>
          <p className="m-0">
            The Platform Owner is not liable for any delay in delivery by the courier company or postal authority. Delivery of all orders is made to the address provided by the buyer at the time of purchase, and delivery of services is confirmed to the email ID specified at the time of registration.
          </p>
          <p className="m-0">
            Any shipping costs levied by the seller or the Platform Owner, as applicable, are non-refundable.
          </p>
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

