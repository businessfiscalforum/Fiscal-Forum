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
  title: "Privacy Policy | Fiscal Forum",
  description:
    "Privacy Policy describing how 8696060387 collects, uses, and protects your information on Fiscal Forum platform.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </div>
          </div>
        </header>

        {/* Policy Navigation Bar */}
        <nav className="flex flex-wrap gap-2 sm:gap-4 py-4 border-b border-[#D9D0BC] text-xs sm:text-sm font-medium text-[#4A453D]">
          <Link href="/terms-and-conditions" className="px-3 py-1.5 rounded-md hover:bg-[#EAE2D2] transition-colors">
            Terms &amp; Conditions
          </Link>
          <Link href="/privacy" className="px-3 py-1.5 rounded-md bg-[#2F4A3C] text-white font-semibold">
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
            Privacy Policy
          </h1>
        </section>
      </div>

      {/* Content Body */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-10 space-y-8 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          {/* Introduction */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Introduction
            </h2>
            <p className="m-0">
              This Privacy Policy describes how <strong className="font-bold text-[#171512]">8696060387</strong> and its affiliates (&quot;8696060387&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) collect, use, share, protect or otherwise process your information/personal data through <strong className="font-bold text-[#171512]">https://www.fiscalforum.in</strong> (&quot;Platform&quot;). You may browse certain sections of the Platform without registering. We do not offer products or services under this Platform outside India, and your personal data is primarily stored and processed in India.
            </p>
            <p className="m-0">
              By visiting the Platform, providing your information, or availing any product/service offered on it, you expressly agree to be bound by this Privacy Policy, the Terms of Use, and applicable service/product terms, and to be governed by the laws of India, including those applicable to data protection and privacy. If you do not agree, please do not use or access the Platform.
            </p>
          </div>

          {/* Collection */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Collection
            </h2>
            <p className="m-0">
              We collect your personal data when you use the Platform, our services, or otherwise interact with us. Information collected may include name, date of birth, address, telephone/mobile number, email ID, and proof of identity or address. Some sensitive personal data — such as bank account, credit or debit card, other payment instrument information, or biometric/physiological information — may be collected with your consent to enable certain features. You always have the option not to provide information by choosing not to use a particular service or feature. We may track your behaviour and preferences on the Platform on an aggregated basis, and collect information related to your transactions on the Platform and with third-party business partners.
            </p>
            <p className="m-0">
              Where a third-party business partner collects your personal data directly, you are governed by their privacy policy, and we are not responsible for their privacy practices. If you receive an email or call from anyone claiming to represent 8696060387 asking for your debit/credit card PIN or net-banking/mobile-banking password, never provide it — report any such disclosure to law enforcement immediately.
            </p>
          </div>

          {/* Usage */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Usage
            </h2>
            <p className="m-0">
              We use personal data to provide the requested services, assist sellers and business partners with order fulfilment, enhance customer experience, resolve disputes, troubleshoot problems, inform you of offers and updates, customise your experience, detect and prevent fraud and other criminal activity, enforce our terms, and conduct marketing research and analysis. Where we use your data for marketing, we will provide an option to opt out. Your access to certain products/services may be affected if permission to use data is not provided.
            </p>
          </div>

          {/* Sharing */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Sharing
            </h2>
            <p className="m-0">
              We may share personal data within our group entities and affiliates to provide access to their services, and disclose it to third parties such as sellers, business partners, logistics partners, payment instrument issuers and reward programs where necessary to provide services, comply with legal obligations, enforce our user agreement, or support marketing and fraud-prevention activities. We may disclose personal and sensitive personal data to government or law enforcement agencies where required by law, or in the good-faith belief that disclosure is reasonably necessary to comply with legal process, enforce our Terms of Use or Privacy Policy, respond to third-party rights claims, or protect the rights, property or safety of our users or the public.
            </p>
          </div>

          {/* Security Precautions */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Security Precautions
            </h2>
            <p className="m-0">
              We adopt reasonable security practices and procedures to protect your personal data from unauthorised access, disclosure, loss or misuse, and use a secure server for account information. However, transmission of information over the internet is not completely secure, and by using the Platform you accept the inherent risks of data transmission online. You are responsible for protecting your own login and password.
            </p>
          </div>

          {/* Data Deletion and Retention */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Data Deletion and Retention
            </h2>
            <p className="m-0">
              You may delete your account via your profile and settings, which results in loss of all account-related information, or you may write to us for assistance. We may delay or refuse deletion where there are pending grievances, claims or shipments. We retain personal data only as long as required for the purpose it was collected, or as required by law, and may retain data to prevent fraud or abuse, or keep it in anonymised form for analytics and research.
            </p>
          </div>

          {/* Your Rights */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Your Rights
            </h2>
            <p className="m-0">
              You may access, rectify and update your personal data directly through the functionalities provided on the Platform.
            </p>
          </div>

          {/* Consent */}
          <div className="pb-6 border-b border-[#D9D0BC]/60 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Consent
            </h2>
            <p className="m-0">
              By visiting the Platform or providing information, you consent to the collection, use, storage, disclosure and processing of your information as described in this Privacy Policy. If you disclose personal data relating to others, you represent that you have authority to do so. You consent to being contacted via SMS, instant messaging, call and/or email for the purposes described here. You may withdraw consent by writing to the Grievance Officer with the subject line &quot;Withdrawal of consent for processing personal data&quot;; withdrawal is not retrospective, and we may restrict or deny services where the withdrawn information was necessary to provide them.
            </p>
          </div>

          {/* Changes to this Privacy Policy */}
          <div className="pb-6 space-y-4">
            <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[20px] sm:text-[22px] text-[#171512]">
              Changes to this Privacy Policy
            </h2>
            <p className="m-0">
              We may update this Privacy Policy to reflect changes in our information practices, and will notify you of significant changes as required under applicable law. Please check this page periodically.
            </p>
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