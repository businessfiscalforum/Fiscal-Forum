"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGem, FaArrowLeft } from "react-icons/fa";

export default function UnlistedSharesPage() {
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
            Unlisted Shares
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
              <FaGem className="text-green-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Unlisted Shares</h2>
              <p className="text-green-600">Invest in companies before listing</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              Unlisted shares represent a unique investment opportunity that allows investors to participate in the growth journey of companies before they enter public markets. These private equity investments can offer substantial returns for those who identify promising companies in their early stages, though they come with distinct risks and challenges that require careful consideration.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Understanding Unlisted Equity</h3>
            
            <p className="italic mb-4">
              Unlisted shares are equity shares of companies that are not listed on any stock exchange, representing ownership stakes in private businesses that operate outside the regulatory framework and transparency requirements of public markets. These companies may be preparing for an IPO or are private companies seeking investment from accredited investors, venture capital firms, or private equity groups.
            </p>
            
            <p className="italic mb-6">
              Investing in unlisted shares provides early access to potential growth stories that may not be available to public market investors until after significant value appreciation has already occurred. This first-mover advantage can be particularly valuable when investing in innovative companies with strong growth prospects that are not yet accessible through traditional stock exchanges.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Strategic Investment Advantages</h3>
            
            <p className="italic mb-4">
              Early investment in potential IPO candidates allows investors to participate in the growth trajectory before public market recognition and valuation expansion. Companies that eventually go public often experience significant price appreciation during their transition from private to public status, creating opportunities for early investors who identified promising businesses before broader market awareness.
            </p>
            
            <p className="italic mb-4">
              Potential for significant returns upon listing can be substantial when investors successfully identify companies that achieve successful public offerings at favorable valuations. The combination of early entry pricing and post-listing market enthusiasm can create compelling return profiles that exceed traditional public market investments, particularly for companies in high-growth sectors or with disruptive business models.
            </p>
            
            <p className="italic mb-4">
              Access to exclusive investment opportunities that are not available to general public market investors, as unlisted shares are typically offered through private placements, employee stock ownership plans, or direct negotiations with company management. This exclusivity can provide access to unique business models, emerging technologies, and growth sectors before they become widely recognized by institutional investors.
            </p>
            
            <p className="italic mb-4">
              Diversification into private companies allows investors to build exposure to businesses that operate outside traditional public market structures, potentially reducing portfolio correlation with stock market movements and economic cycles that affect publicly traded companies. This alternative investment approach can enhance overall portfolio resilience and return potential across different market environments.
            </p>
            
            <p className="italic mb-6">
              Participation in company growth journey enables investors to align their financial interests with management teams focused on executing growth strategies and creating long-term value. This partnership approach can be particularly rewarding when investing in companies with strong competitive advantages, experienced leadership teams, and clear paths to profitability and market expansion.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Critical Risk Considerations</h3>
            
            <p className="italic mb-4">
              Lack of liquidity before listing means investors may be unable to exit their positions until the company completes an IPO, is acquired, or implements a share buyback program. This illiquidity constraint requires long-term investment horizons and the ability to withstand potential delays in realizing investment returns, making unlisted share investments unsuitable for investors requiring regular access to their capital.
            </p>
            
            <p className="italic mb-4">
              No regulatory oversight like listed securities creates additional risks related to financial transparency, corporate governance, and investor protection that are standard in public markets. Private companies are not subject to the same disclosure requirements, auditing standards, and regulatory scrutiny that protect public market investors, requiring investors to conduct thorough due diligence and rely on management representations.
            </p>
            
            <p className="italic mb-4">
              Difficulty in valuation assessment presents challenges for unlisted share investors who must rely on limited financial information, management projections, and comparable company analysis rather than market-driven price discovery mechanisms. This valuation uncertainty can lead to overpayment for shares or missed opportunities due to conservative pricing, making accurate assessment crucial for investment success.
            </p>
            
            <p className="italic mb-4">
              Potential for company failure exists at higher rates in private companies compared to established public companies, as many startups and growth-stage businesses face execution challenges, competitive pressures, and market uncertainties that can lead to business failure or significant value destruction. The all-or-nothing nature of private equity investments means that unsuccessful companies can result in complete loss of invested capital.
            </p>
            
            <p className="italic mb-6">
              Illiquidity until IPO or buyback creates ongoing challenges for portfolio management and risk adjustment, as investors cannot easily rebalance positions or respond to changing market conditions and investment outlooks. This constraint requires careful portfolio construction and risk management to ensure that illiquid positions align with overall investment objectives and risk tolerance levels.
            </p>
            
            <div className="bg-green-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-green-800 text-lg mb-3">Successful Unlisted Share Investing</h4>
              <p className="text-green-700">
                Effective unlisted share investing requires extensive due diligence, industry expertise, and access to deal flow through professional networks or specialized investment platforms. Investors should carefully evaluate company fundamentals, management teams, competitive positioning, and growth prospects while understanding the risks associated with private company investing and illiquidity constraints.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <h4 className="font-bold text-green-800 text-lg mb-3">Professional Guidance Recommended</h4>
              <p className="text-gray-700">
                Given the complexity and risks associated with unlisted share investments, consulting with experienced investment professionals, legal advisors, and tax specialists is highly recommended before committing capital to these alternative investment opportunities. Proper structuring and ongoing monitoring are essential for navigating the unique challenges of private company investing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}