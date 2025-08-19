"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaBullseye, FaArrowLeft } from "react-icons/fa";

export default function FuturesOptionsPage() {
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
            Futures & Options (F&O)
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
              <FaBullseye className="text-teal-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Futures & Options</h2>
              <p className="text-teal-600">Hedge risk or speculate on price moves</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              Futures and Options (F&O) are sophisticated derivative instruments that play a crucial role in modern financial markets. These powerful tools allow investors and traders to manage risk, speculate on price movements, and implement complex trading strategies that can generate profits in various market conditions.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Understanding Derivative Instruments</h3>
            
            <p className="italic mb-4">
              Futures and Options (F&O) are derivative instruments that derive their value from an underlying asset such as stocks, indices, commodities, or currencies. Unlike direct equity investments, derivatives don&apos;t represent ownership in the underlying asset but rather contractual agreements based on the asset&apos;s price movements. This fundamental characteristic makes them versatile tools for both hedging existing positions and speculating on future price directions.
            </p>
            
            <p className="italic mb-6">
              Futures are contracts to buy/sell at a predetermined price on a future date, creating an obligation for both parties to fulfill the transaction at expiration. These standardized contracts are traded on exchanges and require margin payments, making them accessible to retail investors while providing the leverage needed for significant market exposure with relatively small capital outlays.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">The Mechanics of Options Trading</h3>
            
            <p className="italic mb-4">
              Options give the right (but not obligation) to buy/sell at a specific price, offering asymmetric risk-reward profiles that can be tailored to various market outlooks. Call options provide the right to purchase an underlying asset at a predetermined strike price, while put options grant the right to sell. This flexibility allows investors to profit from bullish, bearish, or neutral market conditions through different option strategies.
            </p>
            
            <p className="italic mb-6">
              The non-obligatory nature of options means buyers pay a premium for this flexibility, while sellers receive the premium but take on the obligation to fulfill the contract if exercised. This premium structure creates unique profit and loss scenarios that can be used for income generation, protection, or leveraged speculation depending on market conditions and investor objectives.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Strategic Advantages of F&O Trading</h3>
            
            <p className="italic mb-4">
              Hedging against market risk is one of the primary benefits of F&O instruments, allowing investors to protect existing equity positions from adverse price movements. For example, an investor holding a portfolio of stocks can purchase put options to limit downside risk without having to sell the underlying shares, maintaining potential upside while reducing vulnerability to market downturns.
            </p>
            
            <p className="italic mb-4">
              Leverage with lower capital requirement enables traders to control large positions with relatively small investments through margin trading. This amplification effect can significantly increase returns when market movements align with expectations, though it also magnifies potential losses, making risk management essential for sustainable trading success.
            </p>
            
            <p className="italic mb-4">
              Profit potential in both rising and falling markets distinguishes F&O trading from traditional long-only equity investing. Traders can implement bullish strategies using call options or futures, while bearish market views can be expressed through put options or short futures positions, creating opportunities regardless of overall market direction.
            </p>
            
            <p className="italic mb-4">
              Flexibility in trading strategies allows for sophisticated approaches such as spreads, straddles, and condors that can profit from various market conditions including volatility changes, time decay, and directional moves. This strategic versatility makes F&O markets attractive to experienced traders who understand the complex interplay of time, volatility, and price movements.
            </p>
            
            <p className="italic mb-6">
              Portfolio diversification opportunities arise from the ability to trade different asset classes, expiration cycles, and strike prices, creating investment approaches that aren&apos;t directly correlated with traditional stock or bond holdings. This diversification potential can enhance overall portfolio risk-adjusted returns when properly integrated with other investment strategies.
            </p>
            
            <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Critical Risk Considerations</h3>
            
            <p className="italic mb-4">
              High risk due to leverage can result in significant losses that exceed the initial investment, particularly in futures trading where margin requirements allow for substantial position sizes. The amplified exposure means that small adverse price movements can lead to large percentage losses, making proper position sizing and stop-loss implementation crucial for capital preservation.
            </p>
            
            <p className="italic mb-4">
              Complex strategies require expertise in options pricing, volatility analysis, and risk management techniques that go beyond basic stock picking skills. Successful F&O trading demands understanding of Greeks (delta, gamma, theta, vega), expiration dynamics, and the mathematical relationships between various market factors that influence derivative prices.
            </p>
            
            <p className="italic mb-4">
              Time decay affects options value through the theta Greek, causing out-of-the-money options to lose value as expiration approaches. This temporal erosion works against options buyers who must overcome time decay while being right about direction and magnitude of price movements, while simultaneously providing income opportunities for options sellers.
            </p>
            
            <p className="italic mb-4">
              Potential for significant losses exists in both futures and options trading, with futures positions exposing traders to unlimited loss potential on short positions and options selling strategies. The leveraged nature of these instruments means that market gaps, extreme volatility, or unexpected events can result in losses that far exceed initial margin deposits.
            </p>
            
            <p className="italic mb-6">
              Requires active monitoring due to the dynamic nature of derivative pricing, time sensitivity, and margin requirements that can trigger margin calls during adverse market movements. Successful F&O traders must maintain constant awareness of their positions, market conditions, and risk exposure to avoid catastrophic losses and capitalize on trading opportunities as they arise.
            </p>
            
            <div className="bg-teal-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-teal-800 text-lg mb-3">Getting Started with F&O Trading</h4>
              <p className="text-teal-700">
                Before engaging in Futures and Options trading, investors should thoroughly understand the risks involved and consider starting with paper trading or small position sizes to gain experience. Education in options strategies, risk management, and market analysis is essential for developing the skills needed to navigate these complex markets successfully.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100">
              <h4 className="font-bold text-teal-800 text-lg mb-3">Professional Guidance</h4>
              <p className="text-gray-700">
                Given the complexity and risks associated with F&O trading, consulting with experienced financial advisors or derivatives specialists can help investors develop appropriate strategies that align with their risk tolerance and investment objectives while avoiding common pitfalls that lead to significant losses.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}