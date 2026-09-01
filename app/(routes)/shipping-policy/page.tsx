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
  title: "Shipping & Delivery Policy — Fiscal Forum Finserv",
  description:
    "Shipping & Delivery Policy for Fiscal Forum Finserv digital services, research reports, and electronic delivery timelines.",
};

export default function ShippingPolicyPage() {
  return (
    <div
      className={`min-h-screen bg-[#F3EEE3] text-[#171512] pt-24 sm:pt-28 pb-12 font-sans selection:bg-[#2F4A3C] selection:text-white ${sourceSerif.variable}`}
    >
      {/* Header */}
      <div className="max-w-[800px] mx-auto px-6">
        <header className="border-b border-[#D9D0BC] py-5">
          <div className="flex justify-between items-baseline gap-4 flex-wrap">
            <div className="font-[family-name:var(--font-source-serif)] font-semibold text-lg tracking-[0.01em]">
              Fiscal Forum Finserv
            </div>
            <div className="text-xs text-[#4A453D]">
              A Sole Proprietorship Firm
            </div>
          </div>
        </header>
      </div>

      {/* Hero */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-14 pb-10 border-b border-[#D9D0BC]">
          <div className="text-[13px] text-[#2F4A3C] font-medium mb-3.5">
            Last updated 01 September 2026
          </div>
          <h1 className="font-[family-name:var(--font-source-serif)] font-normal text-[32px] sm:text-[38px] leading-[1.18] mb-3.5 max-w-[16ch] tracking-[-0.01em]">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-base leading-[1.6] text-[#4A453D] max-w-[54ch] m-0">
            Fiscal Forum Finserv does not sell or ship any physical products.
            All our offerings — research reports, newsletters, market updates,
            and educational content — are digital services delivered
            electronically. This policy explains how and when you can expect to
            receive access to what you&apos;ve paid for.
          </p>
        </section>
      </div>

      {/* Table of Contents */}
      <div className="max-w-[800px] mx-auto px-6">
        <nav className="py-8 border-b border-[#D9D0BC]">
          <div className="text-xs text-[#4A453D] mb-3.5">On this page</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1.5 list-none m-0 p-0">
            {[
              {
                label: "1. Mode of delivery",
                num: "01",
                href: "#mode",
              },
              {
                label: "2. Delivery timelines",
                num: "02",
                href: "#timelines",
              },
              {
                label: "3. Non-delivery",
                num: "03",
                href: "#nondelivery",
              },
              {
                label: "4. No physical shipping",
                num: "04",
                href: "#physical",
              },
              { label: "5. Contact", num: "05", href: "#contact" },
            ].map((item) => (
              <li key={item.num}>
                <a
                  href={item.href}
                  className="flex justify-between gap-3 text-[13.5px] py-1.5 border-b border-[#D9D0BC] text-[#171512] hover:text-[#2F4A3C] transition-colors no-underline"
                >
                  <span>{item.label}</span>
                  <span className="text-[#4A453D]">{item.num}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Policy Body */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-12 pb-2">
          {/* 01. Mode of delivery */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="mode">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">01</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Mode of delivery
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              Depending on the service, access or content is delivered via one or
              more of the following:
            </p>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "WhatsApp or Telegram channel access",
                "Email",
                "Access credentials to a client portal or dashboard, where applicable",
              ].map((item, index, arr) => (
                <li
                  key={index}
                  className={`relative py-2 pl-[18px] pr-0 text-[14.5px] leading-[1.6] text-[#171512] border-t border-[#D9D0BC] before:content-[''] before:absolute before:left-0 before:top-4 before:w-1.5 before:h-1.5 before:bg-[#2F4A3C] ${
                    index === arr.length - 1 ? "border-b border-[#D9D0BC]" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 02. Delivery timelines */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="timelines"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">02</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Delivery timelines
            </h2>

            <div className="mt-1">
              <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-2 sm:gap-6 py-4.5 border-t border-[#D9D0BC]">
                <div>
                  <div className="font-[family-name:var(--font-source-serif)] text-[15px] font-medium text-[#171512]">
                    Instant-access subscriptions
                  </div>
                  <div className="inline-block mt-2 text-xs text-[#2F4A3C] font-medium">
                    Within 24 hours
                  </div>
                </div>
                <div className="text-sm leading-[1.6] text-[#4A453D]">
                  Research and report subscriptions. Access is typically granted
                  within 24 hours of successful payment confirmation.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-2 sm:gap-6 py-4.5 border-t border-b border-[#D9D0BC]">
                <div>
                  <div className="font-[family-name:var(--font-source-serif)] text-[15px] font-medium text-[#171512]">
                    Account opening &amp; onboarding referrals
                  </div>
                  <div className="inline-block mt-2 text-xs text-[#2F4A3C] font-medium">
                    Set by partner
                  </div>
                </div>
                <div className="text-sm leading-[1.6] text-[#4A453D]">
                  Broking, mutual fund, insurance, or loan/credit card
                  applications. Timelines are determined entirely by the
                  respective broker, AMC, insurer, or bank/NBFC partner and are
                  outside our control — please refer to that partner&apos;s own
                  processing timelines.
                </div>
              </div>
            </div>
          </div>

          {/* 03. Non-delivery */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="nondelivery"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">03</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Non-delivery
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              If you do not receive access within the stated timeframe after
              successful payment, please contact us at{" "}
              <a
                href="mailto:support@fiscalforum.in"
                className="text-[#2F4A3C] border-b border-[#D9D0BC] no-underline pb-px hover:border-[#2F4A3C] transition-colors"
              >
                support@fiscalforum.in
              </a>{" "}
              or 86960 60387 with your payment reference, and we will resolve it
              promptly.
            </p>
          </div>

          {/* 04. No physical shipping */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="physical"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">04</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              No physical shipping
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              As we do not deal in physical goods, no shipping charges, courier
              tracking, or delivery addresses are applicable to any service on
              this Site.
            </p>
          </div>

          {/* 05. Contact */}
          <div className="py-8 scroll-mt-24" id="contact">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">05</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Contact
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              For delivery-related concerns, reach out to our proprietor
              directly.
            </p>
          </div>
        </section>
      </div>

      {/* Delivery Contact Panel */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-10 pb-14">
          <div className="bg-[#FBF8F1] border border-[#D9D0BC] p-7 sm:p-8 flex justify-between items-center gap-6 flex-wrap">
            <div>
              <div className="font-[family-name:var(--font-source-serif)] text-[13px] text-[#4A453D] mb-2">
                Delivery contact
              </div>
              <div className="text-[17px] font-medium text-[#171512]">
                Sheela Mehta
              </div>
              <div className="text-[13px] text-[#4A453D] mt-0.5 leading-[1.6]">
                Proprietor, Fiscal Forum Finserv
                <br />
                86960 60387
              </div>
            </div>
            <a
              href="mailto:support@fiscalforum.in"
              className="text-[13.5px] text-[#171512] border-b border-[#D9D0BC] pb-0.5 hover:border-[#2F4A3C] transition-colors"
            >
              support@fiscalforum.in
            </a>
          </div>
        </section>
      </div>

      {/* Page Footer Note */}
      <div className="max-w-[800px] mx-auto px-6">
        <footer className="border-t border-[#D9D0BC] py-5 text-xs text-[#4A453D] flex justify-between flex-wrap gap-2">
          <span>© 2026 Fiscal Forum Finserv</span>
          <span>Bhilwara, Rajasthan, India</span>
        </footer>
      </div>
    </div>
  );
}
