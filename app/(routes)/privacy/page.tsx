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

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-base leading-[1.6] text-[#4A453D] max-w-[52ch] m-0">
            Fiscal Forum Finserv (&quot;Fiscal Forum,&quot; &quot;we,&quot;
            &quot;us,&quot; &quot;our&quot;), a sole proprietorship firm owned by
            Sheela Mehta, operates www.fiscalforum.in and provides wealth
            management, financial education, research, mutual fund distribution,
            insurance POS, and loan/credit-card referral services. This policy
            explains how we collect, use, share, and protect your personal
            information. By using our Site or services, you consent to the
            practices described below.
          </p>
        </section>
      </div>

      {/* Table of Contents */}
      <div className="max-w-[800px] mx-auto px-6">
        <nav className="py-8 border-b border-[#D9D0BC]">
          <div className="text-xs text-[#4A453D] mb-3.5">On this page</div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-1.5 list-none m-0 p-0">
            {[
              { label: "1. Information we collect", num: "01", href: "#collect" },
              { label: "2. How we use your information", num: "02", href: "#use" },
              { label: "3. Sharing of information", num: "03", href: "#sharing" },
              { label: "4. Cookies", num: "04", href: "#cookies" },
              { label: "5. Data security", num: "05", href: "#security" },
              { label: "6. Data retention", num: "06", href: "#retention" },
              { label: "7. Your rights", num: "07", href: "#rights" },
              { label: "8. Third-party links", num: "08", href: "#thirdparty" },
              { label: "9. Children's privacy", num: "09", href: "#children" },
              { label: "10. Changes to this policy", num: "10", href: "#changes" },
              { label: "11. Contact", num: "11", href: "#contact" },
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
          {/* 01. Information we collect */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="collect">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">01</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Information we collect
            </h2>

            <h3 className="font-[family-name:var(--font-source-serif)] text-[15.5px] font-semibold mt-1 mb-2.5">
              Information you provide directly
            </h3>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "Name, email address, phone number, city/address",
                "PAN, Aadhaar (last 4 digits or as required), bank/demat account details — only where required to facilitate account opening with our broking, mutual fund, or insurance partners",
                "KYC documents submitted for onboarding with partner platforms (Angel One, Alice Blue, Fyers, AMCs, insurers, or lending partners)",
                "Communications you send us — queries, feedback, support requests",
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

            <h3 className="font-[family-name:var(--font-source-serif)] text-[15.5px] font-semibold mt-[22px] mb-2.5">
              Information collected automatically
            </h3>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "IP address, browser type, device information",
                "Pages visited, time spent, referral source, via cookies and analytics tools",
                "WhatsApp/Telegram interactions if you subscribe to our research or report channels",
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

            <h3 className="font-[family-name:var(--font-source-serif)] text-[15.5px] font-semibold mt-[22px] mb-2.5">
              Information from third parties
            </h3>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "Confirmation of account opening or transaction status from broker, AMC, insurer, or bank/NBFC partners we refer you to",
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

          {/* 02. How we use your information */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="use">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">02</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              How we use your information
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              We use your information to:
            </p>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "Facilitate account opening and referrals with our broker, AMC, insurer, and lending partners",
                "Deliver research reports, newsletters, and market updates you've subscribed to",
                "Respond to your queries and provide customer support",
                "Improve our Site, content, and services",
                "Comply with SEBI, AMFI, IRDAI, RBI, and other applicable regulatory requirements",
                "Send you service updates, and — where you've opted in — promotional communications",
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
            <div className="mt-3.5 p-3.5 sm:p-4 bg-[#FBF8F1] border border-[#D9D0BC] text-[13.5px] leading-[1.6] text-[#4A453D] max-w-[62ch]">
              We do not use your data for stock recommendations or trading calls;
              our content is factual and educational in nature, consistent with
              our regulatory positioning.
            </div>
          </div>

          {/* 03. Sharing of information */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="sharing">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">03</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Sharing of information
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              We share information only:
            </p>
            <ul className="list-none m-0 mb-1 p-0 max-w-[62ch]">
              {[
                "With the broking, AMC, insurance, or lending partner you choose to be referred to, solely to complete your onboarding or transaction",
                "With service providers who help us operate the Site — hosting, analytics, email/WhatsApp delivery — under confidentiality obligations",
                "When required by law, regulation, court order, or a request from SEBI, AMFI, IRDAI, RBI, or other authorities",
                "With your explicit consent",
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
            <div className="mt-3.5 p-3.5 sm:p-4 bg-[#FBF8F1] border border-[#D9D0BC] text-[13.5px] leading-[1.6] text-[#4A453D] max-w-[62ch]">
              We do not sell your personal data to third parties.
            </div>
          </div>

          {/* 04. Cookies */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="cookies">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">04</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Cookies
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              Our Site may use cookies to remember preferences, understand usage
              patterns, and improve user experience. You can disable cookies
              through your browser settings, though some features may not function
              properly as a result.
            </p>
          </div>

          {/* 05. Data security */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="security">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">05</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Data security
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              We use reasonable administrative, technical, and physical safeguards
              to protect your information.
            </p>
          </div>

          {/* 06. Data retention */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="retention">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">06</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Data retention
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              We retain personal information only as long as necessary to fulfil
              the purposes described above, or as required by applicable law and
              regulatory record-keeping norms, such as SEBI/AMFI KYC retention
              requirements.
            </p>
          </div>

          {/* 07. Your rights */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="rights">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">07</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Your rights
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] mb-3 max-w-[62ch]">
              You may:
            </p>
            <ul className="list-none m-0 mb-3 p-0 max-w-[62ch]">
              {[
                "Request access to, or correction of, your personal information",
                "Withdraw consent for marketing communications at any time",
                "Request deletion of your data, subject to regulatory record-retention obligations",
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
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:support@fiscalforum.in"
                className="text-[#2F4A3C] border-b border-[#D9D0BC] no-underline pb-px hover:border-[#2F4A3C] transition-colors"
              >
                support@fiscalforum.in
              </a>
              .
            </p>
          </div>

          {/* 08. Third-party links */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="thirdparty">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">08</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Third-party links
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              Our Site may link to third-party platforms — brokers, AMCs, insurers,
              lenders. We are not responsible for the privacy practices of these
              third parties; please review their respective privacy policies.
            </p>
          </div>

          {/* 09. Children's privacy */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="children">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">09</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Children&apos;s privacy
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              Our services are not directed at individuals under 18. We do not
              knowingly collect data from minors.
            </p>
          </div>

          {/* 10. Changes to this policy */}
          <div className="py-8 border-b border-[#D9D0BC] scroll-mt-24" id="changes">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">10</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Changes to this policy
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              We may update this Privacy Policy periodically. Changes will be
              posted on this page with a revised &quot;Last updated&quot; date.
            </p>
          </div>

          {/* 11. Contact */}
          <div className="py-8 scroll-mt-24" id="contact">
            <div className="text-[13px] text-[#2F4A3C] font-medium mb-2">11</div>
            <h2 className="font-[family-name:var(--font-source-serif)] text-[21px] font-normal mb-3.5">
              Contact
            </h2>
            <p className="text-[14.5px] leading-[1.7] text-[#4A453D] m-0 max-w-[62ch]">
              For privacy-related concerns, reach out to our proprietor directly.
            </p>
          </div>
        </section>
      </div>

      {/* Privacy Contact Panel */}
      <div className="max-w-[800px] mx-auto px-6">
        <section className="pt-10 pb-14">
          <div className="bg-[#FBF8F1] border border-[#D9D0BC] p-7 sm:p-8 flex justify-between items-center gap-6 flex-wrap">
            <div>
              <div className="font-[family-name:var(--font-source-serif)] text-[13px] text-[#4A453D] mb-2">
                Privacy contact
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