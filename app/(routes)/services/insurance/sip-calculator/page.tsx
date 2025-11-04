"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const SIPCalculatorPage = () => {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [duration, setDuration] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);

  // Calculations
  const totalInvestedAmount = monthlyAmount * duration * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const months = duration * 12;

  const futureValue =
    monthlyRate === 0
      ? totalInvestedAmount
      : monthlyAmount *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

  const estimatedReturns = futureValue - totalInvestedAmount;

  // For SVG pie chart
  const circumference = 2 * Math.PI * 45;
  const investedPortion = (totalInvestedAmount / futureValue) * circumference;
  const returnsPortion = (estimatedReturns / futureValue) * circumference;

  // Format number with commas (e.g., 1234567 → 12,34,567)
  const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-30">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center px-4"
      >
        {/* Main Card */}
        <div className="w-full max-w-6xl">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                SIP Calculator
              </h1>
              <p className="text-green-100">
                Estimate the potential growth of your Systematic Investment Plan
                (SIP) over time.
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Panel */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Returns Estimator
                      </p>
                      <p className="text-sm text-gray-600">
                        Estimation is based on historical performance
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Monthly Investment Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={monthlyAmount}
                          onChange={(e) =>
                            setMonthlyAmount(
                              Math.max(0, Number(e.target.value))
                            )
                          }
                          min="0"
                          className="w-full pl-12 pr-6 py-4 text-xl border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white shadow-sm"
                          placeholder="₹5,000"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-medium">
                          ₹
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Investment Duration ({duration} years)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>1 Year</span>
                        <span>30 Years</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-3">
                        Expected Annual Return ({expectedReturn}%)
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="30"
                        value={expectedReturn}
                        onChange={(e) =>
                          setExpectedReturn(Number(e.target.value))
                        }
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>8%</span>
                        <span>30%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
                  <p className="text-gray-600 mb-4 text-lg">
                    The total value of your investment after {duration} years
                    will be
                  </p>

                  <motion.div
                    key={Math.round(futureValue)}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8"
                  >
                    ₹{formatNumber(futureValue)}
                  </motion.div>

                  <div className="relative mb-8">
                    <svg viewBox="0 0 100 100" className="w-40 h-40">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="8"
                        strokeDasharray={`${investedPortion} ${circumference}`}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="8"
                        strokeDasharray={`${returnsPortion} ${circumference}`}
                        strokeDashoffset={-investedPortion}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8 w-full">
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="font-semibold text-gray-700">
                          Invested
                        </span>
                      </div>
                      <div className="text-xl font-bold text-orange-600">
                        ₹{formatNumber(totalInvestedAmount)}
                      </div>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold text-gray-700">
                          Returns
                        </span>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        ₹{formatNumber(estimatedReturns)}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/services/mutual-funds/open-demat-account"
                    passHref
                  >
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Start Investing Today
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ➕ What is SIP Calculator? Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-16 bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-200/50"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What is a SIP Calculator?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                A <strong>SIP (Systematic Investment Plan) Calculator</strong>{" "}
                is a financial tool that helps you estimate the potential future
                value of your regular mutual fund investments made at fixed
                intervals (usually monthly).
              </p>

              <p>
                It uses the concept of **compounding** to project how your money
                can grow over time based on your investment amount, duration,
                and expected rate of return.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
                SIP Formula
              </h3>

              <p>
                The future value of a SIP is calculated using the **future value
                of an annuity due** formula:
              </p>

              <div className="bg-gray-50 p-6 rounded-xl text-center font-mono text-lg">
                <p>
                  <span className="font-bold">FV = P ×</span>
                  <span className="block mt-2">{"((1 + r)ⁿ - 1)"}</span>
                  <span className="block mt-1">-------------</span>
                  <span className="block mt-1">r</span>
                </p>
              </div>

              <p className="mt-4">Where:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>FV</strong> = Future Value of your SIP investment
                </li>
                <li>
                  <strong>P</strong> = Monthly investment amount
                </li>
                <li>
                  <strong>r</strong> = Monthly rate of return (Annual return ÷
                  12 ÷ 100)
                </li>
                <li>
                  <strong>n</strong> = Total number of SIP payments (Months =
                  Years × 12)
                </li>
              </ul>

              <p className="mt-4">
                <em>Note:</em> This calculator assumes that returns are
                compounded monthly and that the investment is made at the
                beginning of each period (annuity due).
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default SIPCalculatorPage;
