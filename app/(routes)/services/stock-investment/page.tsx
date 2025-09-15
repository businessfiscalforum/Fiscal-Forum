"use client";
import React, { useEffect, useState } from "react";
import {
  Gem,
  Coins,
  Zap,
  Sparkles,
  TrendingUp,
  BarChart3,
  FolderOpen,
  UserCheck,
  Phone,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaChartLine,
  FaHeadset,
  FaRocket,
  FaAward,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { BrokerInfiniteScroll } from "../../_components/Broker";

const investmentOptions = [
  {
    id: "equity-etfs",
    title: "Equity & ETFs",
    description:
      "Own company shares or diversify smartly with ETFs. Spread risk, build wealth steadily, grow alongside markets.",
    icon: BarChart3,
    link: "/services/stock-investment/equity-etfs",
    alink: "/services/stock-investment/equity-etfs/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "futures-options",
    title: "Futures & Options (F&O)",
    description:
      "Hedge risk or speculate on price moves. Requires strategy, discipline, and knowledge to manage market uncertainty.",
    icon: TrendingUp,
    link: "/services/stock-investment/futures-options",
    alink: "/services/stock-investment/futures-options/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "ipo",
    title: "Initial Public Offering (IPO)",
    description:
      "Invest early in growing companies. Get front-row access to expansion and potential long-term wealth creation.",
    icon: Sparkles,
    link: "/services/stock-investment/ipo",
    alink: "/services/stock-investment/ipo/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: "mtf",
    title: "Margin Trading Facility (MTF)",
    description:
      "Borrow to buy more shares. Seize opportunities responsibly — leverage magnifies gains but can increase losses.",
    icon: Zap,
    link: "/services/stock-investment/mtf",
    alink: "/services/stock-investment/mtf/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "commodities",
    title: "Commodities",
    description:
      "Trade real assets like gold, silver, crude oil. Diversify portfolios, hedge inflation, and balance equity exposure.",
    icon: Coins,
    link: "/services/stock-investment/commodities",
    alink: "/services/stock-investment/commodities/apply",
    bgColor: "bg-gradient-to-br from-green-500 to-green-700",
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: "unlisted-shares",
    title: "Unlisted Shares",
    description:
      "Invest early in companies before listing. Join growth journey, enjoy potential big returns upon public offering.",
    icon: Gem,
    link: "/services/stock-investment/unlisted-shares",
    alink: "/services/stock-investment/unlisted-shares/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export default function CreditCardApplyPage() {
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
      {/* Main Layout: Content + Sidebar */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-20">
        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
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
                Smart Stock Investment Strategies
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg sm:text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed"
              >
                Navigate the markets with confidence. Discover diversified
                investment options tailored to your goals, whether you&apos;re
                building long-term wealth or seeking strategic opportunities.
              </motion.p>
            </div>
          </motion.div>

          {/* Investment Cards Grid */}
          <div className="max-w-7xl mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentOptions.map((option, index) => {
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
                    <Link href={option.link} passHref>
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
                        <div className="flex gap-4 pt-4">
                          {/* <div className="px-4 py-2 rounded-lg  text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2">
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
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 mx-4 sm:mx-auto max-w-6xl"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  SIP Calculator
                </h2>
                <p className="text-green-100">
                  The SIP calculator helps estimate the potential growth of your
                  Systematic Investment Plan (SIP) investment over your chosen
                  time frame. SIP is a convenient method to save for your
                  long-term financial goals.
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Enhanced Input Panel */}
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
                          Estimation is based on the past performance
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
                              setMonthlyAmount(Number(e.target.value))
                            }
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
                          Investment Duration
                        </label>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500">1 Year</span>
                          <div className="bg-green-100 px-4 py-2 rounded-full">
                            <span className="text-lg font-bold text-green-700">
                              {duration} Years
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            30 Years
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-3">
                          Expected Annual Return
                        </label>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500">8%</span>
                          <div className="bg-blue-100 px-4 py-2 rounded-full">
                            <span className="text-lg font-bold text-blue-700">
                              {expectedReturn}%
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">30%</span>
                        </div>
                        <input
                          type="range"
                          min="8"
                          max="30"
                          value={expectedReturn}
                          onChange={(e) =>
                            setExpectedReturn(Number(e.target.value))
                          }
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Results Panel */}
                  <div className="flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
                    <p className="text-gray-600 mb-4 text-lg">
                      The total value of your investment after {duration} years
                      will be
                    </p>

                    <motion.div
                      key={calculateFutureValue()}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8"
                    >
                      ₹{formatNumber(calculateFutureValue())}
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
                      href="/services/stock-investment/open-demat-account"
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
                      Start Your Wealth Journey
                    </h2>
                  </div>

                  {!isSmallScreen && (
                    <p className="text-green-100 text-lg leading-relaxed mb-8">
                      Ready to take the first step? Open your Demat & Trading
                      account in minutes and begin investing with confidence.
                      Zero paperwork, instant approval, and full support every
                      step of the way.
                    </p>
                  )}
                  <Link href={"/services/stock-investment/open-demat-account"}>
                  <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Investing Now
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
                      Level Up Your Portfolio
                    </h2>
                  </div>

                  {!isSmallScreen && (
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      Already investing? Supercharge your strategy with advanced
                      tools, real-time analytics, and personalized insights.
                      Unlock higher potential and trade smarter with our premium
                      platform.
                    </p>
                  )}


                  <Link href={"/services/stock-investment/already-have-an-account"}>
                  <button className="bg-green-100 border-2 border-green-500 text-green-700 px-8 py-4 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Continue Your Journey
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Enhanced Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-10 mx-4 sm:mx-auto max-w-5xl"
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

          {/* Features Section */}
          <section className="py-16 bg-gradient-to-r from-green-900 to-emerald-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Grow Smarter, Invest Better with Fiscal Forum
              </h2>
              <p className="text-xl text-green-200 max-w-3xl mx-auto">
                Everything you need to succeed in the markets — all in one
                powerful platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-green-300 text-2xl mb-4">
                  <FaChartLine />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  Free Premarket Reports
                </h3>
                <p className="text-green-100">
                  Stay ahead with daily premarket reports.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-green-300 text-2xl mb-4">
                  <FaHeadset />
                </div>
                <h3 className="text-lg font-bold mb-2">
                  24/7 Dedicated Support
                </h3>
                <p className="text-green-100">
                  Enjoy quick query resolution and hassle-free Demat account
                  support.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-green-300 text-2xl mb-4">
                  <FaRocket />
                </div>
                <h3 className="text-lg font-bold mb-2">Brokerage Cashback</h3>
                <p className="text-green-100">
                  Enhance your investing journey, now with exciting bokerage
                  cashbacks.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-green-300 text-2xl mb-4">
                  <FaAward />
                </div>
                <h3 className="text-lg font-bold mb-2">Refer & Earn</h3>
                <p className="text-green-100">
                  Get Rewards for every friend who starts investing with you.
                  Get rewarded for smart trading.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
