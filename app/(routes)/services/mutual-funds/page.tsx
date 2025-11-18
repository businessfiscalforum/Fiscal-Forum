"use client";
import React, { useEffect, useState } from "react";
import { BarChart3, FolderOpen, UserCheck, Phone } from "lucide-react";

import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaBalanceScale,
  FaUsers,
  FaRegClock,
  FaAward,
  FaHandHoldingUsd,
  FaGem,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { BrokerInfiniteScroll } from "../../_components/Broker"; // Adjust path as needed

export default function MutualPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    // This runs only on the client
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize(); // Check on first load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    null
  );
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: "Please enter your email address", type: "error" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simulate API call

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
      } else {
        setMessage({
          text: data.error || "Subscription failed",
          type: "error",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage({
        text: "Subscription failed. Please sign-in to subscribe.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const cards = [
    {
      id: 1,
      title: "All Mutual Funds",
      description:
        "Invest together, diversify easily, and let professionals grow your money for any goal, big or small.",
      icon: BarChart3,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/services/mutual-funds/all-mutual-funds",
    },
    {
      id: 2,
      title: "Loan Against Mutual Funds",
      description:
        "Unlock quick cash by pledging funds. Cover expenses smartly without selling your long-term mutual fund investments.",
      icon: FaHandHoldingUsd,
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      link: "/services/mutual-funds/loan-against-mutual-funds",
    },
    {
      id: 3,
      title: "Sovereign Gold Bonds (SGBs)",
      description:
        "Grow wealth safely in gold. Earn interest, skip storage worries, and keep your portfolio shining bright.",
      icon: FaGem,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/services/mutual-funds/sovereign-gold-bonds",
    },
  ];

  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [duration, setDuration] = useState<number>(11);
  const [expectedReturn, setExpectedReturn] = useState<number>(15.51);

  // Calculate the future value of SIP investment
  const calculateFutureValue = () => {
    const amount = monthlyAmount;
    const years = duration;
    const rate = expectedReturn / 100;

    // Future Value of SIP formula: FV = P * (((1 + r)^n - 1) / r)
    const futureValue =
      amount * ((Math.pow(1 + rate / 12, years * 12) - 1) / (rate / 12));

    return Math.round(futureValue);
  };

  const totalInvestedAmount = monthlyAmount * 12 * duration;
  const estimatedReturns = calculateFutureValue() - totalInvestedAmount;

  const circumference = 2 * Math.PI * 45; // for r=45
  const investedPortion =
    (totalInvestedAmount / calculateFutureValue()) * circumference;
  const returnsPortion =
    (estimatedReturns / calculateFutureValue()) * circumference;

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-IN").format(num);

  return (
    <>
      {/* Main Layout: Content + Broker Scroll */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-20">
        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full py-10 sm:py-10 md:py-20 mb-16 px-4 overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 py-8"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-4"
              >
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                  <BarChart3 className="text-white w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight"
              >
                Mutual Fund Investment
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg sm:text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed"
              >
                Plan your wealth journey with mutual funds. Explore a variety of
                fund types—from equity to debt to hybrid—designed to meet your
                financial goals. Build a diversified portfolio, manage risk, and
                grow your wealth over time with confidence.
              </motion.p>
            </div>
          </motion.div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              Mutual Funds
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Smart investment solutions tailored to your financial goals
            </p>
          </motion.div>

          {/* Mutual Fund Cards Grid */}
          <div className="max-w-7xl mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl bg-white"
                  >
                    <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    <div className="p-6 space-y-4 h-full flex flex-col cursor-pointer">
                      <div
                        className={`p-3 rounded-xl ${option.iconBgColor} flex-shrink-0 w-12 h-12 flex items-center justify-center`}
                      >
                        {IconComponent && (
                          <IconComponent
                            className={`w-6 h-6 ${option.iconColor}`}
                          />
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {option.title}
                      </h2>
                      <p className="text-sm leading-relaxed flex-grow text-gray-600">
                        {option.description}
                      </p>

                      <div className="pt-4">
                        <Link href={option.link} passHref>
                          <div className="inline-flex items-center gap-2 font-medium text-green-600 hover:text-green-700">
                            Learn More
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-4 h-4"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* SIP Calculator Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-10 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-4 max-w-6xl mx-auto"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* HEADER */}
              <div
                className="
      bg-gradient-to-r from-green-600 to-emerald-600
      px-4 py-4
      sm:px-6 sm:py-5
      lg:px-8 lg:py-6
    "
              >
                <h2
                  className="
        text-xl sm:text-2xl lg:text-3xl
        font-bold text-white mb-1 sm:mb-2
      "
                >
                  SIP Calculator
                </h2>
                <p className="text-green-100 text-xs sm:text-sm lg:text-base leading-relaxed">
                  The SIP calculator helps estimate the potential growth of your
                  investment over time.
                </p>
              </div>

              {/* BODY CONTENT */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                  {/* ---------------- INPUT PANEL ---------------- */}
                  <div className="space-y-5 sm:space-y-7 lg:space-y-8">
                    {/* Box */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          Returns Estimator
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Based on historical performance
                        </p>
                      </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-5 sm:space-y-6 lg:space-y-6">
                      {/* Monthly Investment */}
                      <div>
                        <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                          Monthly Investment Amount
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={monthlyAmount}
                            onChange={(e) =>
                              setMonthlyAmount(Number(e.target.value))
                            }
                            className="
                    w-full pl-10 pr-4 py-3
                    text-base sm:text-lg
                    border-2 border-gray-200 rounded-xl
                    focus:ring-4 focus:ring-green-500/20 focus:border-green-500
                    bg-white shadow-sm
                  "
                            placeholder="₹5,000"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg sm:text-xl font-medium">
                            ₹
                          </div>
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                          Investment Duration
                        </label>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-500">
                            1 Year
                          </span>
                          <div className="bg-green-100 px-3 py-1 rounded-full">
                            <span className="text-sm sm:text-lg font-bold text-green-700">
                              {duration} Years
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">
                            30 Years
                          </span>
                        </div>

                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Expected Returns */}
                      <div>
                        <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
                          Expected Annual Return
                        </label>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-gray-500">
                            8%
                          </span>
                          <div className="bg-blue-100 px-3 py-1 rounded-full">
                            <span className="text-sm sm:text-lg font-bold text-blue-700">
                              {expectedReturn}%
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">
                            30%
                          </span>
                        </div>

                        <input
                          type="range"
                          min="8"
                          max="30"
                          value={expectedReturn}
                          onChange={(e) =>
                            setExpectedReturn(Number(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---------------- RESULTS PANEL ---------------- */}
                  <div className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-50 to-white p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-100">
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-lg">
                      Your total value after {duration} years:
                    </p>

                    <motion.div
                      key={calculateFutureValue()}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 sm:mb-8"
                    >
                      ₹{formatNumber(calculateFutureValue())}
                    </motion.div>

                    <div className="relative mb-6 sm:mb-8">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-28 h-28 sm:w-40 sm:h-40"
                      >
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
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="8"
                          strokeDasharray={`${returnsPortion} ${circumference}`}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                          strokeDashoffset={-investedPortion}
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 w-full">
                      <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-xl">
                        <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full"></div>
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            Invested
                          </span>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-orange-600">
                          ₹{formatNumber(totalInvestedAmount)}
                        </div>
                      </div>

                      <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                            Returns
                          </span>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-blue-600">
                          ₹{formatNumber(estimatedReturns)}
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/services/mutual-funds/open-demat-account"
                      passHref
                    >
                      <button
                        className="
              bg-gradient-to-r from-green-600 to-emerald-600
              hover:from-green-700 hover:to-emerald-700
              text-white px-6 sm:px-10 py-3 sm:py-4
              rounded-full font-bold
              text-base sm:text-lg
              shadow-lg hover:shadow-xl
              transform hover:scale-105 transition-all duration-300
            "
                      >
                        Start Investing Today
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Call to Action (Kickstart & Level Up) */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 group overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 border border-white rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <FolderOpen className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold leading-snug text-white">
                      Begin Your Mutual Fund Journey
                    </h2>
                  </div>

                  {!isSmallScreen && (
                    <p className="text-green-100 text-lg leading-relaxed mb-8">
                      Open an investment account today and start building wealth
                      with diversified mutual fund portfolios — all from the
                      comfort of your home, paperless and hassle-free.
                    </p>
                  )}
                  <Link href={"/services/mutual-funds/open-demat-account"}>
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Start Growing
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative bg-white rounded-3xl p-10 shadow-2xl hover:shadow-3xl border-2 border-green-100 hover:border-green-200 transform hover:-translate-y-3 transition-all duration-500 group overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-24 h-24 border-2 border-green-500 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 border border-green-400 rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <UserCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 leading-snug">
                      Optimize Your Mutual Fund Portfolio
                    </h2>
                  </div>

                  {!isSmallScreen && (
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      Already have mutual fund investments? Shift to direct
                      plans, reduce expense ratios, and maximize your long-term
                      returns with our personalized strategies.
                    </p>
                  )}
                  <Link href={"/services/mutual-funds/already-have-an-account"}>
                    <button className="bg-green-100 border-2 border-green-500 text-green-700 px-8 py-4 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Continue Your Journey
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Account Options (Kickstart & Level Up) */}
          {/* <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-10 flex flex-col justify-between shadow-xl min-h-[300px] hover:-translate-y-2 transition-transform duration-300 group text-white">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <FolderOpen className="w-10 h-10 text-white" />
                    <h2 className="text-3xl font-bold leading-snug">
                      Begin Your Mutual Fund Journey
                    </h2>
                  </div>
                  {!isSmallScreen ? (
                    <p className="text-green-100 text-lg leading-relaxed">
                      Open an investment account today and start building wealth
                      with diversified mutual fund portfolios — all from the
                      comfort of your home, paperless and hassle-free.
                    </p>
                  ) : (
                    <div></div>
                  )}
                </div>
                <button
                  onClick={() =>
                    router.push("/services/mutual-funds/open-demat-account")
                  }
                  className="mt-6 w-fit border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-700 transition-all duration-300"
                >
                  Start Growing
                </button>
              </div>
              <div className="bg-white rounded-3xl p-10 flex flex-col justify-between border-2 border-green-200 shadow-xl min-h-[300px] hover:-translate-y-2 transition-transform duration-300 group">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <UserCheck className="w-10 h-10 text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-800 leading-snug">
                      Optimize Your Mutual Fund Portfolio
                    </h2>
                  </div>
                  {!isSmallScreen ? (
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Already have mutual fund investments? Shift to direct
                      plans, reduce expense ratios, and maximize your long-term
                      returns with our personalized strategies.
                    </p>
                  ) : (
                    <div></div>
                  )}
                </div>
                <button
                  onClick={() =>
                    router.push(
                      "/services/mutual-funds/already-have-an-account"
                    )
                  }
                  className="mt-6 w-fit border border-green-600 text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Continue Your Journey
                </button>
              </div>
            </div>
          </section> */}

          {/* Enhanced Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-10 px-4 mx-4 sm:mx-auto max-w-5xl"
          >
            <div className="bg-gradient-to-br from-teal-600 via-green-600 to-emerald-700 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Text Content - Left Side */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Need Help? Talk to an Expert
                    </h2>
                    <p className="text-lg text-green-100 max-w-md">
                      Get personalized guidance on your investment queries.
                    </p>
                  </div>

                  {/* Buttons - Right Side */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+918696060387"
                      className="bg-white text-green-700 hover:bg-gray-100 px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>

                    <a
                      href="https://wa.me/+918696060387"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* What is a Mutual Fund? */}
          {/* <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                What is a Mutual Fund?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                A <strong>Mutual Fund</strong> pools money from multiple
                investors to invest in stocks, bonds, or other securities.
                Managed by professional fund managers, it offers
                diversification, risk management, and access to expert
                strategies — ideal for both beginners and experienced investors.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 w-5 h-5 mt-1 mr-3" />
                  <span>
                    Professional management with research-backed decisions
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 w-5 h-5 mt-1 mr-3" />
                  <span>Diversification across sectors and asset classes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 w-5 h-5 mt-1 mr-3" />
                  <span>Start with as little as ₹500/month via SIP</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 w-5 h-5 mt-1 mr-3" />
                  <span>
                    Direct plans offer lower expense ratios and higher returns
                  </span>
                </li>
              </ul>
            </div>
          </section> */}

          {/* Grow Your Wealth Section (As Requested) */}
          <section
            className="py-16 bg-gradient-to-r from-rose-700 to-orange-600
 text-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Grow Your Wealth Smartly with Fiscal Forum
              </h2>
              <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
                Diversified investment solutions tailored to your financial
                goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaBalanceScale />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Get Best-Fit Funds, Always
                </h3>
                <p className="text-emerald-100">
                  We guide you with the best fund options for the current market
                  and provide complete fund details.
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaUsers />
                </div>
                <h3 className="text-lg font-bold mb-2">Dedicated Support</h3>
                <p className="text-emerald-100">
                  Dedicated calling support for any changes or help you need.
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaRegClock />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Your Fiscal Forum Investment Kit
                </h3>
                <p className="text-emerald-100">
                  Stay consistent and confident in your
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaAward />
                </div>
                <h3 className="text-lg font-bold mb-2">Referral Rewards</h3>
                <p className="text-emerald-100">
                  Earn commission on friends&apos; investment amounts
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* ✅ Broker Infinite Scroll Sidebar */}
        {/* <aside className="hidden lg:block w-40 bg-white border-l border-gray-200">
          <div className="sticky top-0 flex items-center justify-center py-8">
            <BrokerInfiniteScroll />
          </div>
        </aside> */}
      </div>
    </>
  );
}
