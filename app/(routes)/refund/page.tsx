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
  title: "Refund & Return Policy — Fiscal Forum Finserv",
  description:
    "Refund, Cancellation and Return Policy for products and services on Fiscal Forum Finserv platform.",
};

export default function RefundPolicyPage() {
  const points = [
    {
      num: 1,
      text: (
        <>
          Cancellations will only be considered if the request is made <strong className="font-bold text-[#171512]">7 days</strong> of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
        </>
      ),
    },
    {
      num: 2,
      text: (
        <>
          <strong className="font-bold text-[#171512]">8696060387</strong> does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
        </>
      ),
    },
    {
      num: 3,
      text: (
        <>
          In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within <strong className="font-bold text-[#171512]">7 days</strong> of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong className="font-bold text-[#171512]">7 days</strong> of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.
        </>
      ),
    },
    {
      num: 4,
      text: (
        <>
          In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.
        </>
      ),
    },
    {
      num: 5,
      text: (
        <>
          In case of any refunds approved by <strong className="font-bold text-[#171512]">8696060387</strong>, it will take <strong className="font-bold text-[#171512]">1 days</strong> for the refund to be processed to you.
        </>
      ),
    },
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
              Fiscal Forum Finserv
            </div>
            <div className="text-xs text-[#4A453D]">
              Refund, Cancellation &amp; Return
            </div>
          </div>
        </header>
      </div>

      {/* Hero Header */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="pt-12 pb-8 border-b border-[#D9D0BC]">
          <h1 className="font-[family-name:var(--font-source-serif)] font-bold text-[32px] sm:text-[40px] leading-[1.18] mb-4 text-[#171512] underline decoration-2 underline-offset-4">
            Refund and Cancellation policy
          </h1>
          <p className="text-base sm:text-[16.5px] leading-[1.65] text-[#3D3833] max-w-[64ch] m-0">
            This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
          </p>
        </section>
      </div>

      {/* Content Body - Refund & Cancellation */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-10 border-b border-[#D9D0BC] space-y-6 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          {points.map((p) => (
            <div
              key={p.num}
              className="py-5 border-b border-[#D9D0BC]/60 last:border-b-0 flex gap-4 items-start"
            >
              <span className="font-semibold text-[#171512] min-w-[24px]">
                {p.num}.
              </span>
              <p className="m-0">{p.text}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Hero Header - Return Policy */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="pt-12 pb-6 border-b border-[#D9D0BC]">
          <h2 className="font-[family-name:var(--font-source-serif)] font-bold text-[28px] sm:text-[34px] leading-[1.18] mb-2 text-[#171512] underline decoration-2 underline-offset-4">
            Return Policy
          </h2>
        </section>
      </div>

      {/* Content Body - Return Policy */}
      <div className="max-w-[850px] mx-auto px-6">
        <section className="py-8 space-y-6 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#2C2825]">
          <p className="m-0">
            We offer refund / exchange within first <strong className="font-bold text-[#171512]">1 days</strong> from the date of your purchase. If <strong className="font-bold text-[#171512]">1 days</strong> have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.
          </p>

          <p className="m-0">
            You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.
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