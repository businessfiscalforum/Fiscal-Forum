"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaDollarSign, FaArrowLeft } from "react-icons/fa";

export default function CommoditiesPage() {
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
            Commodities Trading
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
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
              <FaDollarSign className="text-teal-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Commodities</h2>
              <p className="text-teal-600">Trade real assets like gold, silver, crude oil</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              Commodities trading represents a unique investment avenue that allows participants to engage with tangible assets that form the foundation of global economic activity. From precious metals to agricultural products and energy resources, commodity markets offer diverse opportunities for investors and traders seeking exposure to real-world assets with intrinsic value.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Understanding Commodity Markets</h3>
            
            <p className="italic mb-4">
              Commodities trading involves buying and selling physical goods like metals (gold, silver), energy (crude oil, natural gas), and agricultural products (wheat, cotton), providing exposure to essential resources that drive modern economies. These tangible assets have inherent value based on their utility, scarcity, and demand across various industries and consumer markets.
            </p>
            
            <p className="italic mb-6">
              These assets can be traded through futures contracts on commodity exchanges, allowing investors to gain exposure without physically owning or storing the underlying commodities. This financialization of commodity markets enables retail and institutional investors to participate in price movements of essential resources through standardized, exchange-traded instruments that provide liquidity and price transparency.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Strategic Investment Benefits</h3>
            
            <p className="italic mb-4">
              Diversification beyond equity markets is one of the primary advantages of commodity investing, as commodity prices often have low correlation with stock and bond markets, providing portfolio risk reduction benefits. This non-correlation characteristic makes commodities valuable for constructing balanced investment portfolios that can perform across different economic cycles and market conditions.
            </p>
            
            <p className="italic mb-4">
              Hedge against inflation makes commodities particularly attractive during periods of rising prices, as the value of tangible assets typically increases alongside general price levels. This protective quality stems from commodities&apos; role as inputs in production processes and consumer goods, making them natural inflation beneficiaries when currency purchasing power declines.
            </p>
            
            <p className="italic mb-4">
              Global market exposure through commodity trading provides access to international supply and demand dynamics, geopolitical events, and economic factors that influence resource prices worldwide. This global perspective allows investors to participate in growth stories from emerging markets and developed economies alike through a single asset class.
            </p>
            
            <p className="italic mb-4">
              Leverage opportunities in commodity futures markets enable traders to control large positions with relatively small capital outlays, amplifying potential returns when market movements align with expectations. This margin-based trading approach allows for efficient capital utilization while providing access to markets that might otherwise require substantial upfront investments for direct commodity ownership.
            </p>
            
            <p className="italic mb-6">
              Seasonal trading opportunities arise from the cyclical nature of many commodities, particularly agricultural products and energy resources that experience predictable supply and demand patterns throughout the year. Knowledgeable traders can capitalize on these seasonal trends by understanding planting cycles, harvest periods, weather patterns, and consumption behaviors that drive price movements.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Critical Risk Factors</h3>
            
            <p className="italic mb-4">
              High volatility in commodity prices can result from supply disruptions, demand shocks, geopolitical tensions, and macroeconomic factors that create significant price swings in short timeframes. This volatility characteristic requires active risk management and can lead to substantial losses when positions move against expectations, particularly in leveraged trading environments.
            </p>
            
            <p className="italic mb-4">
              Geopolitical and weather factors play crucial roles in commodity pricing, with international conflicts, trade disputes, regulatory changes, and natural disasters capable of creating sudden supply constraints or demand shifts. These external forces are often unpredictable and can cause dramatic price movements that are difficult to hedge or anticipate through fundamental analysis alone.
            </p>
            
            <p className="italic mb-4">
              Storage and delivery complexities associated with physical commodity ownership create additional costs and logistical challenges that can impact investment returns. While futures contracts eliminate the need for physical storage, the potential for delivery requirements and the costs associated with maintaining physical positions add layers of complexity that require specialized knowledge and infrastructure.
            </p>
            
            <p className="italic mb-4">
              Leverage can magnify losses in commodity trading, with margin requirements allowing for substantial position sizes that can result in losses exceeding initial investments during volatile market conditions. The amplification effect of borrowed capital means that small adverse price movements can trigger margin calls or forced liquidations that can devastate trading accounts without proper risk management protocols.
            </p>
            
            <p className="italic mb-6">
              Requires specialized knowledge of supply chains, production processes, inventory levels, and global economic factors that influence commodity markets, making successful trading more challenging than traditional equity investing. Understanding the fundamental drivers of commodity prices, including weather patterns, crop reports, inventory data, and industrial demand, is essential for making informed trading decisions in these complex markets.
            </p>
            
            <div className="bg-teal-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-teal-800 text-lg mb-3">Successful Commodity Trading Approaches</h4>
              <p className="text-teal-700">
                Effective commodity trading requires understanding of both technical and fundamental analysis, with successful traders combining chart patterns, price action, and supply-demand fundamentals to make informed decisions. Staying informed about global economic indicators, weather forecasts, government reports, and geopolitical developments is essential for navigating the complex factors that drive commodity price movements.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100">
              <h4 className="font-bold text-teal-800 text-lg mb-3">Risk Management Considerations</h4>
              <p className="text-gray-700">
                Given the inherent volatility and leverage in commodity markets, implementing strict risk management protocols including position sizing, stop-loss orders, and portfolio diversification is crucial for long-term trading success. New commodity traders should consider starting with small positions and educational resources before committing significant capital to these complex markets.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}