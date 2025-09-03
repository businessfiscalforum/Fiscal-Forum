"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaChartLine, FaArrowLeft } from "react-icons/fa";

export default function EquityETFsPage() {
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
            Equity & ETFs Investment
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
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaChartLine className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Equity & ETFs</h2>
              <p className="text-emerald-600">Own company shares or diversify with ETFs</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              Equity investing and Exchange-Traded Funds (ETFs) represent two of the most popular ways to participate in the stock market. These investment vehicles offer distinct advantages for building wealth over time while providing different levels of risk and diversification.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Understanding Equity Investments</h3>
            
            <p className="italic mb-4">
              Equity investing involves buying shares of companies listed on stock exchanges, making you a partial owner of those businesses. When you purchase equity shares, you acquire voting rights and may receive dividends when companies distribute profits to shareholders. This direct ownership stake allows you to benefit from a company&apos;s growth through capital appreciation.
            </p>
            
            <p className="italic mb-6">
              Ownership in real businesses means your investment value is directly tied to company performance, market conditions, and broader economic factors. Successful equity investing requires research, patience, and a long-term perspective as stock prices can fluctuate significantly in the short term but historically tend to appreciate over extended periods.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">The Power of ETFs</h3>
            
            <p className="italic mb-4">
              Exchange-Traded Funds (ETFs) allow you to invest in a diversified portfolio of stocks or bonds in a single transaction, providing instant diversification. These funds track specific indexes, sectors, or asset classes, spreading risk across multiple holdings rather than concentrating it in individual companies. This approach reduces the impact of any single security&apos;s poor performance on your overall investment.
            </p>
            
            <p className="italic mb-6">
              Portfolio diversification with ETFs makes them particularly appealing to new investors or those seeking to minimize risk while still participating in market growth. ETFs typically have lower expense ratios than actively managed mutual funds and offer the flexibility of trading throughout market hours like individual stocks.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Key Benefits of Equity & ETF Investments</h3>
            
            <p className="italic mb-4">
              Potential for long-term wealth creation is one of the primary advantages of equity investing, as stock markets have historically delivered strong returns over extended periods. Companies that consistently grow their earnings and expand their market presence can generate substantial returns for patient investors who hold their shares through market cycles.
            </p>
            
            <p className="italic mb-4">
              Dividend income from profitable companies provides a steady stream of passive income, especially from established corporations that regularly distribute portions of their profits to shareholders. This dual benefit of capital appreciation and income generation makes equities attractive for both growth and income-focused investors.
            </p>
            
            <p className="italic mb-6">
              Liquidity - easy to buy and sell - ensures that you can convert your investments to cash relatively quickly during market hours. This flexibility allows you to respond to changing financial needs or market opportunities without being locked into long-term commitments.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Understanding the Risks</h3>
            
            <p className="italic mb-4">
              Market volatility can cause value fluctuations in both individual stocks and ETFs, leading to periods where your investments may be worth less than your original purchase price. These price swings are normal characteristics of equity markets and reflect changing investor sentiment, economic conditions, and company-specific developments.
            </p>
            
            <p className="italic mb-4">
              Potential for capital loss exists whenever you invest in equities, as there&apos;s no guarantee that stock prices will increase over time. Companies can face financial difficulties, industry disruptions, or competitive challenges that negatively impact their share prices, sometimes resulting in significant losses for investors.
            </p>
            
            <p className="italic mb-4">
              Company-specific risks affect individual equity holdings, where factors such as management decisions, product failures, or regulatory changes can disproportionately impact a single stock. This concentration risk is one reason why diversification through ETFs is often recommended for risk-averse investors.
            </p>
            
            <p className="italic mb-6">
              Economic and geopolitical factors influence entire markets and can cause broad-based declines in equity values. Events such as recessions, interest rate changes, currency fluctuations, or international conflicts can create challenging environments for equity investors across all sectors and regions.
            </p>
            
            <div className="bg-emerald-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Investment Strategy Considerations</h4>
              <p className="text-emerald-700">
                Successful equity and ETF investing requires understanding your risk tolerance, investment timeline, and financial goals. While equities offer the potential for higher returns, they also come with increased volatility compared to fixed-income investments. A balanced approach often includes both individual stocks for potential growth and ETFs for diversification and risk management.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Getting Started</h4>
              <p className="text-gray-700">
                Before investing in equities or ETFs, consider consulting with a financial advisor to develop a strategy that aligns with your objectives. Research different investment options, understand the fees associated with various funds, and start with a diversified approach to minimize risk while building your investment knowledge and experience.
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