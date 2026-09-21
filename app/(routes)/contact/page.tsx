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
  title: "Contact — Fiscal Forum Finserv",
  description:
    "Whether you have a question about our research, want to explore account opening with one of our partners, or need support — reach out through any of our channels.",
};

export default function ContactPage() {
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
        <section className="pt-14 pb-11 border-b border-[#D9D0BC]">
          <div className="text-[13px] text-[#2F4A3C] font-medium mb-3.5">
            Contact us
          </div>
          <h1 className="font-[family-name:var(--font-source-serif)] font-normal text-[32px] sm:text-[38px] leading-[1.18] mb-4 max-w-[14ch] tracking-[-0.01em]">
            We&apos;d love to hear from you.
          </h1>
          <p className="text-base leading-[1.6] text-[#4A453D] max-w-[46ch] m-0">
            Whether you have a question about our research, want to explore
            account opening with one of our partners, or need support — reach
            out through any of the channels below.
          </p>
        </section>
      </div>

      {/* Channels */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="py-11 border-b border-[#D9D0BC]">
          <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-1.5">
            Get in touch
          </h2>
          <p className="text-[#4A453D] text-sm mb-7 max-w-[52ch] leading-[1.5]">
            Our team is available Monday to Saturday and typically responds
            within one business day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[#D9D0BC]">
            <div className="py-5 sm:pr-5 border-b sm:border-b-0 sm:border-r border-[#D9D0BC]">
              <div className="text-xs text-[#4A453D] mb-2">Email</div>
              <div className="font-[family-name:var(--font-source-serif)] text-[17px] font-normal break-all">
                <a
                  href="mailto:support@fiscalforum.in"
                  className="border-b border-[#D9D0BC] pb-0.5 hover:border-[#2F4A3C] transition-colors"
                >
                  support@fiscalforum.in
                </a>
              </div>
            </div>

            <div className="py-5 sm:px-5 border-b sm:border-b-0 sm:border-r border-[#D9D0BC]">
              <div className="text-xs text-[#4A453D] mb-2">Phone</div>
              <div className="font-[family-name:var(--font-source-serif)] text-[17px] font-normal break-all">
                <a
                  href="tel:+918696060387"
                  className="border-b border-[#D9D0BC] pb-0.5 hover:border-[#2F4A3C] transition-colors"
                >
                  86960 60387
                </a>
              </div>
            </div>

            <div className="py-5 sm:pl-5">
              <div className="text-xs text-[#4A453D] mb-2">WhatsApp</div>
              <div className="font-[family-name:var(--font-source-serif)] text-[17px] font-normal break-all">
                <a
                  href="https://wa.me/918696060387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[#D9D0BC] pb-0.5 hover:border-[#2F4A3C] transition-colors"
                >
                  86960 60387
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Details: Address + Hours & Quick Links */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="py-11 border-b border-[#D9D0BC] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-base font-semibold mb-3.5 pb-2.5 border-b border-[#D9D0BC]">
              Registered address &amp; hours
            </h2>
            <p className="text-sm leading-[1.65] text-[#171512] mb-4">
              581, Azad Nagar
              <br />
              Bhilwara, Rajasthan
              <br />
              India
            </p>
            <div className="flex justify-between text-[13.5px] py-2.5 border-t border-[#D9D0BC]">
              <span className="text-[#4A453D]">Monday – Saturday</span>
              <span className="font-medium">10:00 AM – 7:00 PM IST</span>
            </div>
            <div className="flex justify-between text-[13.5px] py-2.5 border-t border-b border-[#D9D0BC]">
              <span className="text-[#4A453D]">Sunday</span>
              <span className="font-medium">Closed</span>
            </div>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-base font-semibold mb-3.5 pb-2.5 border-b border-[#D9D0BC]">
              Quick links
            </h2>
            <div className="flex justify-between items-baseline gap-4 py-3 border-t border-[#D9D0BC]">
              <span className="text-[13.5px] text-[#171512]">
                Account opening (broking / demat)
              </span>
              <a
                className="text-[13px] text-[#2F4A3C] hover:underline whitespace-nowrap"
                href="mailto:support@fiscalforum.in"
              >
                support@fiscalforum.in
              </a>
            </div>
            <div className="flex justify-between items-baseline gap-4 py-3 border-t border-[#D9D0BC]">
              <span className="text-[13.5px] text-[#171512]">
                Mutual fund distribution
              </span>
              <a
                className="text-[13px] text-[#2F4A3C] hover:underline whitespace-nowrap"
                href="mailto:support@fiscalforum.in"
              >
                support@fiscalforum.in
              </a>
            </div>
            <div className="flex justify-between items-baseline gap-4 py-3 border-t border-[#D9D0BC]">
              <span className="text-[13.5px] text-[#171512]">
                Insurance queries
              </span>
              <a
                className="text-[13px] text-[#2F4A3C] hover:underline whitespace-nowrap"
                href="mailto:support@fiscalforum.in"
              >
                support@fiscalforum.in
              </a>
            </div>
            <div className="flex justify-between items-baseline gap-4 py-3 border-t border-b border-[#D9D0BC]">
              <span className="text-[13.5px] text-[#171512]">
                Loan / credit card queries
              </span>
              <a
                className="text-[13px] text-[#2F4A3C] hover:underline whitespace-nowrap"
                href="mailto:support@fiscalforum.in"
              >
                support@fiscalforum.in
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Regulatory */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-10 pb-14">
          <div className="bg-[#FBF8F1] border border-[#D9D0BC] p-7 sm:p-8 flex justify-between items-center gap-6 flex-wrap">
            <div>
              <div className="font-[family-name:var(--font-source-serif)] text-[13px] text-[#4A453D] mb-2">
                Regulatory contact
              </div>
              <div className="text-[17px] font-medium text-[#171512]">
                Sheela Mehta
              </div>
              <div className="text-[13px] text-[#4A453D] mt-0.5">
                Proprietor, Fiscal Forum Finserv
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

      {/* Page footer note */}
      <div className="max-w-[800px] mx-auto px-6">
        <footer className="border-t border-[#D9D0BC] py-5 text-xs text-[#4A453D] flex justify-between flex-wrap gap-2">
          <span>© 2026 Fiscal Forum Finserv</span>
          <span>Bhilwara, Rajasthan, India</span>
        </footer>
      </div>
    </div>
  );
}