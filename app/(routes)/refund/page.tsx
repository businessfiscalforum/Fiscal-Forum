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
  title: "Refund Policy — Fiscal Forum Finserv",
  description:
    "Refund Policy for Fiscal Forum Finserv paid digital services, research reports, and subscription terms.",
};

export default function RefundPolicyPage() {
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
          <h1 className="font-[family-name:var(--font-source-serif)] font-normal text-[32px] sm:text-[38px] leading-[1.18] mb-3.5 max-w-[14ch] tracking-[-0.01em]">
            Refund Policy
          </h1>
          <p className="text-base leading-[1.6] text-[#4A453D] max-w-[54ch] m-0">
            This policy applies to paid services offered directly by Fiscal
            Forum Finserv on www.fiscalforum.in, such as subscription-based
            research reports, newsletters, or educational content, including our
            pre-market report service.
          </p>
          <div className="mt-[18px] p-3.5 sm:p-4 bg-[#FBF8F1] border border-[#D9D0BC] text-[13.5px] leading-[1.6] text-[#4A453D] max-w-[56ch]">
            It does not apply to products or services of third parties — brokers,
            AMCs, insurers, banks/NBFCs — we refer you to. Those are governed by
            the respective third party&apos;s own refund and cancellation terms.
          </div>
        </section>
      </div>

      {/* Table of Contents */}
      <div className="max-w-[800px] mx-auto px-6">
        <nav className="py-8 border-b border-[#D9D0BC]">
          <div className="text-xs text-[#4A453D] mb-3.5">On this page</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1.5 list-none m-0 p-0">
            {[
              {
                label: "1. Digital subscription services",
                num: "01",
                href: "#subscriptions",
              },
              {
                label: "2. Eligible & non-refundable cases",
                num: "02",
                href: "#eligible",
              },
              {
                label: "3. How to request a refund",
                num: "03",
                href: "#request",
              },
              { label: "4. Processing time", num: "04", href: "#processing" },
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
          {/* 01. Digital subscription services */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="subscriptions"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">01</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Digital subscription services
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              Our research reports, market updates, and similar subscription
              content are digital products delivered instantly upon payment — via
              WhatsApp, email, or portal access. Given the nature of digital
              content:
            </p>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "Once a subscription period has commenced and content or access has been delivered, no refund will be provided for that billing cycle",
                "You may cancel a recurring subscription at any time to prevent renewal for the next billing cycle; the current paid period will remain active until it ends",
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

          {/* 02. Eligible & non-refundable cases */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="eligible"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">02</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Eligible &amp; non-refundable cases
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              A refund may be considered only in specific situations, at our
              sole discretion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-1">
              {/* Eligible */}
              <div className="border border-[#D9D0BC] border-l-[3px] border-l-[#2F4A3C] p-5 sm:p-[22px]">
                <div className="font-[family-name:var(--font-source-serif)] text-[15px] font-semibold text-[#2F4A3C] mb-3">
                  Eligible for refund
                </div>
                <ul className="list-none m-0 p-0">
                  {[
                    "Duplicate payment made in error for the same subscription or service",
                    "Payment successfully deducted but service/access was never activated due to a technical error on our end",
                    "A payment made for a plan or service we are unable to fulfil",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="relative py-1.5 pl-4 text-[13.5px] leading-[1.55] text-[#171512] before:content-[''] before:absolute before:left-0 before:top-3 before:w-[5px] before:h-[5px] before:bg-[#2F4A3C]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ineligible */}
              <div className="border border-[#D9D0BC] border-l-[3px] border-l-[#9C4A34] p-5 sm:p-[22px]">
                <div className="font-[family-name:var(--font-source-serif)] text-[15px] font-semibold text-[#9C4A34] mb-3">
                  Not eligible for refund
                </div>
                <ul className="list-none m-0 p-0">
                  {[
                    "Change of mind after content or access has been delivered",
                    "Dissatisfaction with market views, research quality, or investment outcomes",
                    "Failure to use the subscribed service within the active period",
                    "Any commissions, brokerage, or charges levied by third-party brokers, AMCs, insurers, or lenders",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="relative py-1.5 pl-4 text-[13.5px] leading-[1.55] text-[#171512] before:content-[''] before:absolute before:left-0 before:top-3 before:w-[5px] before:h-[5px] before:bg-[#9C4A34]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3.5 p-3.5 sm:p-4 bg-[#FBF8F1] border border-[#D9D0BC] text-[13.5px] leading-[1.6] text-[#4A453D] max-w-[62ch]">
              Our content is educational and informational in nature — it is not
              a guarantee of returns.
            </div>
          </div>

          {/* 03. How to request a refund */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="request"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">03</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              How to request a refund
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              To request a refund under an eligible case above, email us at{" "}
              <a
                href="mailto:support@fiscalforum.in"
                className="text-[#2F4A3C] border-b border-[#D9D0BC] no-underline pb-px hover:border-[#2F4A3C] transition-colors"
              >
                support@fiscalforum.in
              </a>{" "}
              within 3 days of the transaction with:
            </p>
            <ol className="list-none m-0 p-0 max-w-[62ch] [counter-reset:step]">
              {[
                "Registered name and contact details",
                "Payment reference or transaction ID",
                "Reason for the refund request",
              ].map((item, index, arr) => (
                <li
                  key={index}
                  className={`[counter-increment:step] flex gap-4 py-3.5 border-t border-[#D9D0BC] text-[14.5px] leading-[1.6] text-[#171512] before:content-[counter(step)] before:shrink-0 before:font-[family-name:var(--font-source-serif)] before:text-[13px] before:text-[#2F4A3C] before:pt-px ${
                    index === arr.length - 1 ? "border-b border-[#D9D0BC]" : ""
                  }`}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 04. Processing time */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="processing"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">04</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Processing time
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              Approved refunds will be processed to the original mode of payment
              within 7–10 business days, subject to your bank or payment
              gateway&apos;s processing timelines.
            </p>
          </div>

          {/* 05. Contact */}
          <div className="py-8 scroll-mt-24" id="contact">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">05</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Contact
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              For refund-related concerns, reach out to our proprietor directly.
            </p>
          </div>
        </section>
      </div>

      {/* Refund Contact Panel */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-10 pb-14">
          <div className="bg-[#FBF8F1] border border-[#D9D0BC] p-7 sm:p-8 flex justify-between items-center gap-6 flex-wrap">
            <div>
              <div className="font-[family-name:var(--font-source-serif)] text-[13px] text-[#4A453D] mb-2">
                Refund contact
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