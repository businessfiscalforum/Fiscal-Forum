"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChartPie } from "react-icons/fa";

export default function AllMutualFundsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            All Mutual Funds
          </h1>
          <div className="w-16"></div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaChartPie className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Grow Smarter, Together</h2>
              <p className="text-emerald-600">
                Professional fund management for every financial goal
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              A mutual fund is more than just an investment product—it is a disciplined and convenient way to grow wealth over time. By pooling money from thousands of investors, mutual funds create a larger portfolio that is professionally managed and diversified across different companies, sectors, and even asset classes. This means that with even a modest investment, you gain access to a wide range of securities that you might never be able to hold individually.
            </p>

            <p>
              The true strength of mutual funds lies in their flexibility. There are funds designed for short-term safety, funds built for long-term growth, and funds that blend both stability and opportunity. For example, equity funds focus on stocks and target higher returns over longer horizons, while debt funds lean on bonds and fixed-income instruments to offer steady and relatively safer growth. Hybrid funds combine both, while index funds track market benchmarks, offering low-cost and transparent exposure. Each option is crafted to serve a particular need, and together they form a universe of opportunities for every kind of investor.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Why It Matters</h3>
            <p className="italic">
              Many first-time investors hesitate, thinking mutual funds are too complex or risky. In reality, they are designed to make investing simple and accessible. Instead of trying to study balance sheets, analyze markets, or predict the next stock movement, you can rely on professional fund managers who make these decisions for you. They track trends, adjust portfolios, and ensure that risks are balanced against rewards, so your money is always working effectively in the background.
            </p>

            <p className="italic">
              Diversification is one of the biggest reasons mutual funds are considered safe compared to individual stock picking. If one company or sector struggles, others can balance it out, reducing the chances of major losses. This is especially important in times of market volatility, where having a diversified portfolio gives you stability and confidence.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Building Wealth for Every Stage of Life</h3>
            <p className="italic">
              Mutual funds are not just about growing wealth—they are about aligning your money with your life goals. A young professional may begin with equity funds to build wealth aggressively, while a retiree might prefer debt funds that offer consistent income. Families saving for education, home purchases, or even retirement can set up Systematic Investment Plans (SIPs), contributing small amounts regularly and watching them compound into significant wealth over time. The beauty lies in the discipline—it transforms saving into investing, and investing into financial freedom.
            </p>

            <p className="italic">
              Over a decade or two, the power of compounding turns even modest contributions into a substantial corpus. Mutual funds are not a get-rich-quick scheme; they are a steady, reliable path that rewards patience, planning, and consistency.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Trust and Transparency</h3>
            <p className="italic">
              One of the key strengths of mutual funds is their regulated nature. Every fund is closely monitored by financial authorities, ensuring that investor interests remain protected. Regular disclosures, performance reports, and transparent fee structures make it easy to understand where your money is and how it is performing. You are never left in the dark, and that accountability builds confidence.
            </p>

            <p className="italic">
              With digital platforms and online tracking, monitoring your investments has never been easier. You can start small, pause or increase contributions, and even redeem funds with just a few clicks, making them one of the most liquid and convenient investment avenues today.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Invest Today, Secure Tomorrow</h3>
            <p className="italic">
              When you choose mutual funds, you are not just investing in markets—you are investing in your dreams. It could be the dream of buying a house, funding a child’s education, enjoying a stress-free retirement, or simply creating a safety net for the future. Each contribution, no matter how small, brings you closer to those dreams.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              Wealth is built one step at a time. With mutual funds, every step is guided, balanced, and directed toward a secure and rewarding future.
            </blockquote>

            <p className="italic">
              Start today, stay consistent, and let your money create opportunities you never thought possible.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/mutual-funds/all")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Start Investing
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
