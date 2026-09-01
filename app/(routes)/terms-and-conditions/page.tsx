import React from "react";
import { Source_Serif_4 } from "next/font/google";
import { metadata } from "./metadata";
export { metadata };

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-serif",
});

export default function TermsAndConditionsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="text-base leading-[1.6] text-[#4A453D] max-w-[56ch] m-0">
            Welcome to www.fiscalforum.in, owned and operated by Fiscal Forum
            Finserv, a sole proprietorship firm owned by Sheela Mehta. By
            accessing or using this Site, you agree to be bound by these Terms
            &amp; Conditions. If you do not agree, please do not use the Site.
          </p>
        </section>
      </div>

      {/* Table of Contents */}
      <div className="max-w-[800px] mx-auto px-6">
        <nav className="py-8 border-b border-[#D9D0BC]">
          <div className="text-xs text-[#4A453D] mb-3.5">On this page</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1.5 list-none m-0 p-0">
            {[
              { label: "1. About us", num: "01", href: "#about" },
              { label: "2. Nature of services", num: "02", href: "#services" },
              {
                label: "3. No investment advice",
                num: "03",
                href: "#noadvice",
              },
              { label: "4. Eligibility", num: "04", href: "#eligibility" },
              {
                label: "5. User responsibilities",
                num: "05",
                href: "#responsibilities",
              },
              {
                label: "6. Intellectual property",
                num: "06",
                href: "#ip",
              },
              {
                label: "7. Third-party platforms",
                num: "07",
                href: "#thirdparty",
              },
              {
                label: "8. Limitation of liability",
                num: "08",
                href: "#liability",
              },
              {
                label: "9. Regulatory compliance",
                num: "09",
                href: "#compliance",
              },
              { label: "10. Termination", num: "10", href: "#termination" },
              { label: "11. Governing law", num: "11", href: "#law" },
              { label: "12. Changes to terms", num: "12", href: "#changes" },
              { label: "13. Contact us", num: "13", href: "#contact" },
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
          {/* 01. About us */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="about">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">01</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              About us
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              Fiscal Forum Finserv is a sole proprietorship, wealth management,
              financial education, and research firm. We earn revenue through
              referral and affiliate arrangements with stockbroking platforms —
              such as Angel One, Alice Blue, and Fyers — mutual fund distribution
              under our AMFI Registration Number (ARN), insurance POS
              partnerships, and bank/NBFC DSA loan and credit card tie-ups.
            </p>
          </div>

          {/* 02. Nature of services */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="services"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">02</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Nature of services
            </h2>

            <div className="mt-1">
              {[
                {
                  title: "Research & educational content",
                  desc: "Reports, newsletters, and market updates published by us are for informational and educational purposes only. They do not constitute investment advice, a recommendation to buy or sell any security, or a guarantee of returns.",
                },
                {
                  title: "Mutual fund distribution",
                  desc: "We distribute mutual fund schemes as an AMFI-registered distributor. We are not a SEBI-registered Investment Adviser unless separately stated, and commissions may be earned from AMCs on distribution.",
                },
                {
                  title: "Broking / demat referrals",
                  desc: "Account opening with our broking partners is governed entirely by that broker's own terms, KYC process, and regulatory obligations. Fiscal Forum acts only as a referral partner.",
                },
                {
                  title: "Insurance POS",
                  desc: "Insurance products are facilitated under applicable IRDAI POS regulations; the insurer's policy terms govern the actual contract.",
                },
                {
                  title: "Loan / credit card DSA",
                  desc: "Loan and credit card facilitation is subject to the sole discretion, terms, and approval process of the respective bank or NBFC.",
                },
              ].map((service, index, arr) => (
                <div
                  key={index}
                  className={`py-4.5 border-t border-[#D9D0BC] ${
                    index === arr.length - 1 ? "border-b border-[#D9D0BC]" : ""
                  }`}
                >
                  <div className="font-[family-name:var(--font-source-serif)] text-[15px] font-medium text-[#171512] mb-1.5">
                    {service.title}
                  </div>
                  <div className="text-sm leading-[1.65] text-[#4A453D] max-w-[62ch]">
                    {service.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 03. No investment advice */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="noadvice"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">03</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              No investment advice / no guarantee
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              Investments in securities, mutual funds, and insurance are subject
              to market risks. Past performance is not indicative of future
              results. You are solely responsible for your investment decisions.
            </p>
            <div className="mt-3.5 p-3.5 sm:p-4 bg-[#FBF8F1] border border-[#D9D0BC] text-[13.5px] leading-[1.6] text-[#4A453D] max-w-[62ch]">
              Please read all scheme-related and product-related documents
              carefully before investing.
            </div>
          </div>

          {/* 04. Eligibility */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="eligibility"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">04</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Eligibility
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              You must be at least 18 years old and legally capable of entering
              into a binding contract to use our services.
            </p>
          </div>

          {/* 05. User responsibilities */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="responsibilities"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">05</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              User responsibilities
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              You agree to:
            </p>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "Provide accurate and complete information during onboarding and KYC",
                "Not use the Site for any unlawful purpose",
                "Not misrepresent, reproduce, or redistribute our proprietary research or reports without permission",
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

          {/* 06. Intellectual property */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="ip">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">06</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Intellectual property
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              All content on this Site — including reports, logos, graphics, and
              text — is the property of Fiscal Forum Finserv unless otherwise
              stated, and may not be copied, reproduced, or distributed without
              prior written consent.
            </p>
          </div>

          {/* 07. Third-party platforms */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="thirdparty"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">07</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Third-party platforms
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              We are not liable for the acts, omissions, service quality,
              execution, or outcomes of third-party brokers, AMCs, insurers,
              banks, or NBFCs we refer you to. Your relationship with such
              entities is governed independently by their own terms and
              agreements.
            </p>
          </div>

          {/* 08. Limitation of liability */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="liability"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">08</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Limitation of liability
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              To the fullest extent permitted by law, Fiscal Forum Finserv shall
              not be liable for any direct, indirect, incidental, or
              consequential loss — including trading or investment losses —
              arising from your use of the Site, our content, or third-party
              services referred through us.
            </p>
          </div>

          {/* 09. Regulatory compliance */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="compliance"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">09</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Regulatory compliance
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              Our services are provided in accordance with applicable SEBI, AMFI,
              IRDAI, and RBI regulations, as relevant to each business line. Any
              regulatory registration numbers — ARN, POS certification, and so
              on — applicable to us will be displayed on the Site or provided on
              request.
            </p>
          </div>

          {/* 10. Termination */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="termination"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">10</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Termination
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              We reserve the right to suspend or terminate access to the Site or
              our services at our discretion, including for suspected misuse or
              violation of these Terms.
            </p>
          </div>

          {/* 11. Governing law */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="law">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">11</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Governing law
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              These Terms are governed by the laws of India, and any disputes
              shall be subject to the exclusive jurisdiction of the courts at
              Bhilwara, Rajasthan, India.
            </p>
          </div>

          {/* 12. Changes to terms */}
          <div
            className="py-8 border-b border-[#D9D0BC] scroll-mt-24"
            id="changes"
          >
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">12</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Changes to terms
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              We may revise these Terms at any time. Continued use of the Site
              after changes constitutes acceptance of the updated Terms.
            </p>
          </div>

          {/* 13. Contact us */}
          <div className="py-8 scroll-mt-24" id="contact">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">13</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Contact us
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              For questions about these Terms, reach out to our proprietor
              directly.
            </p>
          </div>
        </section>
      </div>

      {/* Terms Contact Panel */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-10 pb-14">
          <div className="bg-[#FBF8F1] border border-[#D9D0BC] p-7 sm:p-8 flex justify-between items-center gap-6 flex-wrap">
            <div>
              <div className="font-[family-name:var(--font-source-serif)] text-[13px] text-[#4A453D] mb-2">
                Terms contact
              </div>
              <div className="text-[17px] font-medium text-[#171512]">
                Sheela Mehta
              </div>
              <div className="text-[13px] text-[#4A453D] mt-0.5 leading-[1.6]">
                Proprietor, Fiscal Forum Finserv
                <br />
                581, Azad Nagar, Bhilwara, Rajasthan · 86960 60387
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