"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGem, FaArrowLeft } from "react-icons/fa";

export default function MTFPage() {
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
            MTF - Margin Trading Facility
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
              <h2 className="text-2xl font-bold text-gray-800">MTF - Margin Trading Facility</h2>
              <p className="text-green-600">Leverage your trades with enhanced buying power</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              Margin Trading Facility (MTF) is a powerful financial service that allows investors to trade in securities with leverage by borrowing funds from their broker against eligible collateral. This facility enhances buying power, enabling traders to take larger positions than their available capital would typically permit, thereby amplifying both potential returns and risks.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Understanding Margin Trading</h3>
            
            <p className="italic mb-4">
              MTF enables investors to buy stocks by depositing only a fraction of the total transaction value as margin, while the broker finances the remaining amount. This borrowed capital allows for increased exposure to the market, making it a popular choice among active traders and short-to-medium-term investors seeking to maximize capital efficiency and capitalize on market opportunities without full upfront payment.
            </p>
            
            <p className="italic mb-6">
              The facility operates within a dedicated MTF account, separate from regular cash or delivery accounts, and is governed by SEBI regulations and exchange-mandated margin requirements. All trades executed under MTF are subject to specific risk management protocols, including margin calls, mark-to-market monitoring, and automatic square-off mechanisms in case of insufficient collateral.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Key Benefits of MTF</h3>
            
            <p className="italic mb-4">
              <strong>Enhanced Buying Power:</strong> Investors can take positions significantly larger than their available cash balance by leveraging the margin provided by the broker, allowing for greater market exposure and potential profit generation from smaller capital outlays.
            </p>
            
            <p className="italic mb-4">
              <strong>Cost-Effective Leverage:</strong> Compared to personal loans or other forms of credit, MTF typically offers lower interest rates on borrowed funds, especially when used for short-term trading strategies, making it a more economical way to access capital for trading purposes.
            </p>
            
            <p className="italic mb-4">
              <strong>Faster Execution & Settlement:</strong> MTF trades are settled within the same framework as normal delivery trades but with the advantage of leverage. The integration with your Demat and trading account ensures seamless execution, monitoring, and settlement of leveraged positions.
            </p>
            
            <p className="italic mb-4">
              <strong>Tax Efficiency on Long-Term Gains:</strong> If securities purchased under MTF are held beyond 12 months, any profits may qualify for long-term capital gains treatment (subject to applicable tax laws), offering a strategic advantage over purely speculative short-term trading.
            </p>
            
            <p className="italic mb-4">
              <strong>Eligible Collateral Usage:</strong> Investors can pledge existing shares, mutual funds, or cash as margin collateral, unlocking liquidity from their portfolio without selling assets, thus maintaining ownership while gaining access to trading capital.
            </p>
            
            <h3 className="text-xl font-semibold text-green-800 mt-8 mb-4">Risk Factors and Considerations</h3>
            
            <p className="italic mb-4">
              <strong>Leverage Amplifies Losses:</strong> While profits are magnified with leverage, so are losses. A small adverse movement in the stock price can result in significant losses relative to the initial margin deposited, potentially leading to a negative equity position if not managed carefully.
            </p>
            
            <p className="italic mb-4">
              <strong>Margin Calls and Fund Maintenance:</strong> Brokers monitor MTF accounts daily and may issue margin calls if the value of pledged collateral falls below the required threshold. Failure to meet these calls can lead to forced liquidation of positions at unfavorable prices.
            </p>
            
            <p className="italic mb-4">
              <strong>Automatic Square-Off Mechanism:</strong> In case of shortfall in margin or failure to replenish funds, brokers have the right to automatically square off positions without prior notice, which could result in substantial losses and missed recovery opportunities.
            </p>
            
            <p className="italic mb-4">
              <strong>Interest Charges Apply:</strong> Borrowed funds attract interest charges, which accrue on a daily basis and can erode profits if positions are held for extended periods. It’s essential to factor in financing costs when planning MTF trades.
            </p>
            
            <p className="italic mb-6">
              <strong>Not Suitable for All Investors:</strong> Due to its high-risk nature, MTF is best suited for experienced traders who understand market volatility, risk management, and leverage dynamics. It is not recommended for risk-averse investors or those with low tolerance for capital fluctuations.
            </p>
            
            <div className="bg-green-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-green-800 text-lg mb-3">Smart Use of MTF</h4>
              <p className="text-green-700">
                Successful use of Margin Trading Facility requires disciplined trading strategies, strict stop-loss adherence, continuous monitoring of positions, and awareness of market trends. Always assess the risk-reward ratio before entering leveraged trades and avoid over-leveraging your portfolio to maintain financial stability.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <h4 className="font-bold text-green-800 text-lg mb-3">Regulatory Compliance & Safety</h4>
              <p className="text-gray-700">
                MTF is regulated by SEBI and operates under strict guidelines to protect investor interests. All transactions are transparently reported, and client securities are held in segregated demat accounts. Ensure you use MTF only through SEBI-registered brokers with robust risk management systems and clear disclosure policies.
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