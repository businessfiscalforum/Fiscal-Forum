import React from "react";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Fiscal Forum",
  description:
    "Terms & Conditions for access to and use of Fiscal Forum platform.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-serif",
});

export default function TermsAndConditionsPage() {
  const conditions = [
    "To access and use the Services, you agree to provide true, accurate and complete information during and after registration, and you are responsible for all acts done through your registered account.",
    "Neither we nor any third parties warrant the accuracy, timeliness, performance, completeness or suitability of information and materials offered on the Platform for any specific purpose. Such information may contain inaccuracies or errors, and we exclude liability for these to the fullest extent permitted by law.",
    "Your use of the Services and the Platform is entirely at your own risk and discretion, for which we are not liable. You must independently assess whether the Services meet your requirements.",
    "All content on the Platform and the Services is proprietary to us or licensed to us. You have no authority to claim any intellectual property rights, title or interest in that content, including its design, layout, look and graphics.",
    "Unauthorised use of the Platform and/or Services may lead to action against you under these Terms and/or applicable law.",
    "You agree to pay the charges associated with availing the Services.",
    "You agree not to use the Platform or Services for any purpose that is unlawful, illegal or forbidden by these Terms or by Indian or local laws applicable to you.",
    "The Platform and Services may contain links to third-party websites. Accessing these links subjects you to the terms of use, privacy policy and other policies of those third-party websites. These links are provided solely for your convenience.",
    "Initiating a transaction for the Services creates a legally binding and enforceable contract between you and the Platform Owner.",
    "You shall indemnify and hold harmless the Platform Owner, its affiliates and group companies, and their respective officers, directors, agents and employees, from any claim, demand or action (including reasonable attorney's fees) arising from your breach of these Terms, the Privacy Policy, other policies, or your violation of any law or third-party rights (including intellectual property rights).",
    "Neither party shall be liable for failure to perform an obligation under these Terms where performance is prevented or delayed by a force majeure event.",
    "These Terms, and any dispute or claim relating to them or their enforceability, are governed by and construed in accordance with the laws of India.",
    "All disputes arising out of or in connection with these Terms are subject to the exclusive jurisdiction of the courts in Bhilwara, Rajasthan.",
    "All concerns or communications relating to these Terms should be sent using the contact information provided on the Platform.",
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
              Terms of Use
            </div>
          </div>
        </header>

        {/* Policy Navigation Bar */}
        <nav className="flex flex-wrap gap-2 sm:gap-4 py-4 border-b border-[#D9D0BC] text-xs sm:text-sm font-medium text-[#4A453D]">
          <Link href="/terms-and-conditions" className="px-3 py-1.5 rounded-md bg-[#2F4A3C] text-white font-semibold">
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
            Terms &amp; Conditions
          </h1>
        </section>
      </div>

      {/* Content Body */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-10 space-y-6 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          {/* Notice Box 1 */}
          <div className="p-4 sm:p-5 bg-[#EAE2D2] border border-[#D9D0BC] rounded-md text-[#171512] text-sm sm:text-[14.5px] leading-[1.65]">
            This document is an electronic record generated under the Information Technology Act, 2000 and does not require any physical or digital signature. Published per Rule 3(1) of the IT (Intermediaries Guidelines) Rules, 2011.
          </div>

          <p className="m-0">
            This document governs access to and use of <strong className="font-bold text-[#171512]">https://www.fiscalforum.in</strong> (&quot;Website&quot;), including the related mobile site and mobile application (together, the &quot;Platform&quot;).
          </p>

          <p className="m-0">
            The Platform is owned by <strong className="font-bold text-[#171512]">8696060387</strong>, a company incorporated under the Companies Act, 1956, with its registered office at A-581 Azad Nagar, Bhilwara (&quot;Platform Owner&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
          </p>

          <p className="m-0">
            Your use of the Platform, its services and tools is governed by the following Terms of Use, together with all applicable policies incorporated herein by reference. If you transact on the Platform, you are subject to the policies applicable to that transaction. By using the Platform, you contract with the Platform Owner and these Terms, along with the applicable policies, constitute your binding obligations. Any additional or conflicting terms you propose are expressly rejected. These Terms may be modified at any time without notice; it is your responsibility to review them periodically.
          </p>

          <p className="m-0">
            For the purposes of these Terms, &quot;you&quot;, &quot;your&quot; or &quot;user&quot; means any natural or legal person who has agreed to become a user/buyer on the Platform.
          </p>

          {/* Notice Box 2 */}
          <div className="p-4 sm:p-5 bg-[#EAE2D2] border border-[#D9D0BC] rounded-md text-[#171512] font-semibold leading-[1.65]">
            By accessing, browsing or otherwise using the Platform, you indicate your agreement to all the Terms and Conditions below. Please read them carefully before proceeding.
          </div>

          <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[22px] sm:text-[26px] text-[#171512] pt-6 pb-2 border-b border-[#D9D0BC]/60">
            Conditions of Use
          </h2>

          <div className="space-y-4 pt-2">
            {conditions.map((item, index) => (
              <div key={index} className="py-3 border-b border-[#D9D0BC]/60 flex gap-4 items-start">
                <span className="font-semibold text-[#171512] min-w-[24px]">
                  {index + 1}.
                </span>
                <p className="m-0">{item}</p>
              </div>
            ))}
          </div>
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