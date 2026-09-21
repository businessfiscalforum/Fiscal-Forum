import React from "react";
import { Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Shipping Policy — Fiscal Forum Finserv",
  description:
    "Shipping Policy for orders and services on Fiscal Forum Finserv platform.",
};

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
              Fiscal Forum Finserv
            </div>
            <div className="text-xs text-[#4A453D]">
              Shipping &amp; Delivery
            </div>
          </div>
        </header>
      </div>

      {/* Hero Header */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="pt-12 pb-8 border-b border-[#D9D0BC]">
          <h1 className="font-[family-name:var(--font-source-serif)] font-bold text-[32px] sm:text-[40px] leading-[1.18] mb-4 text-[#171512] underline decoration-2 underline-offset-4">
            Shipping Policy
          </h1>
        </section>
      </div>

      {/* Content Body */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-10 space-y-6 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          <p className="m-0">
            The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within <strong className="font-bold text-[#171512]">1 days</strong> from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.
          </p>
        </section>
      </div>

      {/* Page Footer Note */}
      <div className="max-w-[850px] mx-auto px-6 mt-6">
        <footer className="border-t border-[#D9D0BC] py-6 text-xs text-[#4A453D] flex justify-between flex-wrap gap-2">
          <span>© Fiscal Forum Finserv</span>
          <span>Bhilwara, Rajasthan, India</span>
        </footer>
      </div>
    </div>
  );
}
