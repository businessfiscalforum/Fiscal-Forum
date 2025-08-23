"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHandHoldingUsd } from "react-icons/fa";

export default function LoanAgainstFundsPage() {
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
            Loan Against Mutual Funds
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
              <FaHandHoldingUsd className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Liquidity Without Letting Go</h2>
              <p className="text-emerald-600">
                Unlock the value of your investments while keeping them intact
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              A loan against mutual funds is a financial solution that allows you to meet urgent needs without selling your investments. Instead of redeeming your mutual funds and disrupting your long-term goals, you can pledge them as collateral and borrow against their value. This way, your investments remain in place, continue to grow, and you still gain access to liquidity when you need it most.
            </p>

            <p>
              Life is full of unexpected turns. A medical emergency, a child’s education, a business opportunity, or even a temporary cash crunch can require immediate funds. Selling your investments during such times might mean losing out on long-term gains or selling at a market low. A loan against mutual funds gives you breathing space, providing quick access to money while your financial plans stay on track.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Why It Matters</h3>
            <p className="italic">
              Traditional loans often involve long approval processes, extensive paperwork, and strict eligibility checks. In contrast, a loan against mutual funds is simpler and faster. Since your investments themselves act as collateral, lenders face lower risks and can process approvals quickly. This means you gain faster access to funds with fewer complications and often at more favorable interest rates compared to unsecured loans like personal loans or credit cards.
            </p>

            <p className="italic">
              Another major advantage is flexibility. You only pay interest on the amount you actually use, not the full sanctioned limit. This makes it cost-effective and ideal for short-term needs where liquidity is key but liquidation of assets would be unwise.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Preserving Growth While Meeting Needs</h3>
            <p className="italic">
              When you sell your mutual funds to cover expenses, you not only reduce your invested corpus but also lose the future growth that those investments would have generated. By opting for a loan against them, you avoid disrupting the compounding process. Your wealth continues to grow quietly in the background, even as you manage immediate requirements with borrowed funds.
            </p>

            <p className="italic">
              This balance—between present needs and future goals—is what makes this option so powerful. It acknowledges that life is unpredictable, but it ensures your financial progress is not sacrificed at the altar of short-term urgency.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Simple, Secure, and Smart</h3>
            <p className="italic">
              The process of availing a loan against mutual funds is straightforward. Once you pledge your units with the lending institution, a credit limit is assigned based on the value of your holdings. The pledged units remain in your name, you continue to enjoy ownership, and you can release them anytime by repaying the borrowed amount. There are no complicated clauses or hidden surprises—just a clean, transparent way to tap into the strength of your own investments.
            </p>

            <p className="italic">
              Many investors find peace of mind knowing that they don’t have to choose between liquid cash and long-term security. With this facility, you can confidently handle financial needs without losing sight of your bigger picture.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Financial Freedom, Reimagined</h3>
            <p className="italic">
              A loan against mutual funds is more than a borrowing tool—it is a strategy. It lets you respond to life’s challenges with resilience and flexibility. It ensures that your investments, which represent years of planning and discipline, remain intact while still empowering you to address the present. In many ways, it turns your mutual funds into both a growth engine and a safety net.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              Don’t choose between progress and stability—have both. Let your investments keep growing while you gain the freedom to handle today’s needs with ease.
            </blockquote>

            <p className="italic">
              With the right approach, your mutual funds can be more than investments—they can be your strongest ally in building a life that balances security with opportunity.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/mutual-funds/loan")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Apply for Loan
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
