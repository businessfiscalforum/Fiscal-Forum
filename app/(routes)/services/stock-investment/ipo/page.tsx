"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaRocket, FaArrowLeft } from "react-icons/fa";

export default function IPOPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">
            Initial Public Offering (IPO)
          </h1>
          <div className="w-16"></div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <FaRocket className="text-green-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Initial Public Offering</h2>
              <p className="text-green-600">Invest in companies before listing</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              An Initial Public Offering (IPO) represents a significant milestone in a company&apos;s growth journey, marking the transition from private ownership to public trading. This process opens up investment opportunities for retail and institutional investors to participate in potentially high-growth companies before they begin regular market trading.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Understanding the IPO Process</h3>
            
            <p className="italic mb-4">
              An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time on a stock exchange, transforming from a privately held entity to a publicly traded company. During this process, the company works with investment banks to determine the appropriate offering price, number of shares to be sold, and regulatory requirements needed for exchange listing.
            </p>
            
            <p className="italic mb-6">
              Investors can buy shares during the IPO period at the offer price before regular trading begins, providing an opportunity to acquire shares at what may be a favorable valuation compared to secondary market pricing. This early access period typically lasts several days and is managed through the company&apos;s designated brokers and financial institutions.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">The Capital Raising Mechanism</h3>
            
            <p className="italic mb-4">
              An IPO allows a company to raise capital from public investors by selling ownership stakes in exchange for funding that can be used for expansion, debt reduction, research and development, or other corporate purposes. This capital raising process provides companies with access to significantly larger funding pools compared to private equity or debt financing options.
            </p>
            
            <p className="italic mb-6">
              The company&apos;s shares are listed on a stock exchange, enabling anyone to buy and sell them in the secondary market after the IPO concludes. This liquidity creation is mutually beneficial - companies gain access to capital while investors receive tradable securities that can be bought and sold based on market conditions and investment strategies.
            </p>
            
            <p className="italic mb-6">
              This process transforms a private company into a public one, subjecting it to increased regulatory oversight, financial transparency requirements, and public scrutiny. The transition brings both opportunities for growth through public capital markets and challenges related to meeting ongoing reporting obligations and managing shareholder expectations.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Strategic Investment Advantages</h3>
            
            <p className="italic mb-4">
              Early investment in growing companies through IPOs allows investors to participate in the growth trajectory from the beginning, potentially capturing significant value appreciation as the company expands its market presence and profitability. This first-mover advantage can be particularly valuable when investing in innovative companies with strong growth prospects.
            </p>
            
            <p className="italic mb-4">
              Potential for significant returns if company performs well can be substantial, as successful IPO investments have historically generated outsized returns for early investors who identify promising companies before broader market recognition. The combination of growth potential and early entry pricing can create compelling long-term investment opportunities.
            </p>
            
            <p className="italic mb-4">
              Allocation at fixed price before market fluctuations provides investors with the opportunity to acquire shares at the IPO price, which may be lower than subsequent market trading levels. This price certainty eliminates the risk of entering at unfavorable valuations that can occur when buying shares after they begin regular trading.
            </p>
            
            <p className="italic mb-4">
              Diversification into new sectors becomes possible through IPO investing, as companies from emerging industries or innovative business models enter public markets. This access allows investors to build exposure to cutting-edge technologies, disruptive business models, and growth sectors that may not be available through existing public company investments.
            </p>
            
            <p className="italic mb-6">
              Participation in company growth story enables investors to align their financial interests with management teams focused on executing growth strategies and creating shareholder value. This alignment can be particularly powerful when investing in companies with strong competitive advantages, experienced leadership teams, and clear paths to profitability.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Important Risk Considerations</h3>
            
            <p className="italic mb-4">
              No historical trading data for evaluation means investors must rely on prospectus information, management presentations, and industry analysis rather than market-driven price discovery mechanisms. This lack of trading history makes it more challenging to assess fair value and potential price volatility compared to established public companies.
            </p>
            
            <p className="italic mb-4">
              High volatility after listing is common for IPO stocks as the market digests the company&apos;s fundamentals, adjusts to new information, and establishes a trading range based on supply and demand dynamics. This initial price discovery process can result in significant short-term price swings that may not reflect long-term value creation potential.
            </p>
            
            <p className="italic mb-4">
              Lock-in periods may apply to certain shareholders, including company insiders and early investors, restricting their ability to sell shares for specified timeframes after the IPO. These restrictions can create artificial supply constraints that may affect trading liquidity and price formation in the early stages of public trading.
            </p>
            
            <p className="italic mb-4">
              Market sentiment can affect pricing during and after the IPO process, with broader market conditions, sector performance, and investor appetite for new issues influencing both the offering success and initial trading performance. Negative market conditions or sector-specific concerns can impact even fundamentally sound companies during their public debut.
            </p>
            
            <p className="italic mb-6">
              Potential for underperformance exists when companies fail to meet investor expectations, face execution challenges, or operate in competitive environments that limit their ability to achieve projected growth rates. The transition from private to public company status also introduces new pressures related to quarterly reporting and shareholder communications that can impact management focus and decision-making.
            </p>
            
            <div className="bg-green-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-green-800 text-lg mb-3">Successful IPO Investing Strategies</h4>
              <p className="text-green-700">
                Effective IPO investing requires thorough due diligence on company fundamentals, management teams, competitive positioning, and growth prospects. Investors should carefully review prospectus documents, understand the company&apos;s business model and risks, and consider how the investment fits within their overall portfolio allocation and risk tolerance framework.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <h4 className="font-bold text-green-800 text-lg mb-3">Long-term Perspective</h4>
              <p className="text-gray-700">
                While IPO investing can offer attractive returns, it&apos;s important to maintain a long-term perspective and avoid making investment decisions based solely on short-term price movements. Companies that go public are often in growth phases that require patience and continued evaluation as they execute their business strategies and navigate market challenges.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/stock-investment/open-demat-account")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Explore
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}