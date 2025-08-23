"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCoins } from "react-icons/fa";

export default function SGBPage() {
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
            Sovereign Gold Bonds (SGBs)
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
              <FaCoins className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">The Golden Investment</h2>
              <p className="text-emerald-600">
                Earn returns and preserve wealth with government-backed security
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Gold has always been more than just a precious metal—it is a symbol of trust, security, and timeless value. Across generations, families have relied on gold not only as jewelry but as a shield against inflation and uncertainty. While traditional gold comes with concerns of storage, purity, and safety, Sovereign Gold Bonds (SGBs) offer a modern, convenient, and rewarding way to invest in this age-old asset.
            </p>

            <p>
              Issued by the Government of India and backed by the Reserve Bank of India, SGBs combine the cultural strength of gold with the reliability of sovereign security. They are denominated in grams of gold, ensuring that their value moves in line with the price of the precious metal. But unlike physical gold, they also offer interest income, adding a new dimension to wealth preservation and growth.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Why It Matters</h3>
            <p className="italic">
              Inflation slowly erodes the purchasing power of money. Gold, on the other hand, has historically served as a hedge, maintaining its value even in times of economic turmoil. By investing in SGBs, you protect your wealth while avoiding the risks associated with physical storage or theft. Your gold is recorded securely in digital or certificate form, leaving you free from worries about safekeeping.
            </p>

            <p className="italic">
              What sets SGBs apart is the fixed interest rate they carry—paid semi-annually on the initial investment. This makes them a dual-benefit product: while the gold price appreciation builds long-term wealth, the interest income provides steady returns. For investors seeking both security and growth, this unique combination is unmatched.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">A Smarter Way to Own Gold</h3>
            <p className="italic">
              Buying gold jewelry often comes with making charges, purity concerns, and emotional limitations on selling. With SGBs, these drawbacks disappear. You gain pure exposure to gold prices, without any of the additional costs or complications. Since they are tradable on exchanges, you also enjoy liquidity, with the ability to sell them in the secondary market if needed, before maturity.
            </p>

            <p className="italic">
              Furthermore, holding SGBs till maturity offers attractive tax benefits. The capital gains tax on redemption is exempt, making them even more efficient than other gold investment avenues such as ETFs or physical bars and coins.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Building a Future That Shines</h3>
            <p className="italic">
              For centuries, families have passed gold down as a legacy, a treasure that carries both emotional and financial weight. Sovereign Gold Bonds modernize that legacy, allowing you to pass on not just wealth, but also the assurance of government-backed security and the convenience of digital ownership. Whether you’re planning for children’s education, safeguarding retirement, or simply diversifying your portfolio, SGBs can anchor your financial journey with stability and strength.
            </p>

            <p className="italic">
              In uncertain times, gold shines brightest. And with SGBs, you can hold that shine without compromise—secure, transparent, and rewarding.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Timeless Value, Modern Form</h3>
            <p className="italic">
              Every investment should bring peace of mind, and SGBs are built with exactly that purpose. They merge the enduring value of gold with the innovation of structured investment products. By choosing them, you choose not just stability, but also growth that is aligned with one of the world’s most trusted assets.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              Gold has always been a safe haven—now it’s also an income-generating investment. With Sovereign Gold Bonds, your future shines brighter.
            </blockquote>

            <p className="italic">
              Invest with confidence, hold with pride, and let your wealth grow in the most trusted metal of all time—without ever worrying about locks, vaults, or purity.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/mutual-funds/sgb")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Invest in SGB
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
