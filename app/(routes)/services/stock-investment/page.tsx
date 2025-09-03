"use client";
import React, { useState } from "react";
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

const slides = [
  {
    title: "Loan Services",
    subtitle: "Get Instant Access to",
    description:
      "Choose from personal, home, or education loans with low interest rates and flexible repayment options.",
    image: "/asset-loan.jpg",
    gradient: "from-blue-600 via-blue-500 to-purple-600",
    path: "services/loan",
  },
  {
    title: "Insurance Plans",
    subtitle: "Protect Your Future with",
    description:
      "Health, car, and life insurance plans tailored to your needs — secure your family and assets today.",
    image: "/asset-insurance.jpg",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    path: "services/insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Grow Your Wealth with a",
    description:
      "High-interest savings accounts with zero balance requirements and easy online access.",
    image: "/asset-saving.jpg",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    path: "services/saving-account",
  },
  {
    title: "Stock Investment",
    subtitle: "Invest Smartly in the",
    description:
      "Build a diversified portfolio and start investing in the stock market with expert guidance.",
    image: "/asset-stock.jpg",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    path: "services/stock-investment",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore High-Return",
    description:
      "Access professionally managed mutual funds to meet your financial goals across risk profiles.",
    image: "/asset-mutual.jpg",
    gradient: "from-cyan-600 via-blue-500 to-indigo-600",
    path: "services/mutual-funds",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with a",
    description:
      "Choose the right credit card for rewards, cashback, and low-interest EMIs.",
    image: "/asset-credit.jpg",
    gradient: "from-orange-600 via-red-500 to-pink-600",
    path: "services/credit-card",
  },
  {
    title: "Govt Bonds & FDs",
    subtitle: "Secure Investments with",
    description:
      "Low-risk government bonds and fixed deposits to preserve capital and earn steady returns.",
    image: "/asset-bondfd.jpg",
    gradient: "from-yellow-600 via-amber-500 to-orange-600",
    path: "services/govts-bond-&-fd",
  },
];

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

  return (
    <>
      {/* Hero Section */}
      <div className="text-gray-800 font-sans bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
        <section className="relative w-full h-[50vh] overflow-hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="absolute inset-0 z-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}/80`}
                  ></div>
                </div>
                <div className="relative z-10 h-full flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white max-w-xl"
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="uppercase tracking-widest text-sm text-yellow-200 font-semibold mb-2"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <Link href={slide.path}>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center gap-3"
                      >
                        Know More
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section>
      </div>

      {/* Main Layout: Content + Sidebar */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-20">
        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              Stock Investment
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Choose the right investment path to grow your wealth with
              confidence and clarity.
            </p>
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

          <section className="py-16 my-10 mx-4 sm:mx-auto max-w-4xl text-center bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-2xl px-6">
            <Phone className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Need Help? Talk to an Expert
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get personalized guidance on opening your queries related to
              mutual funds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  router.push("/services/stock-investment/contact")
                }
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition flex items-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Schedule a Free Call
              </button>
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/+918696060387" // Pre-filled number
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition flex items-center gap-3" // Similar styling to the call button
              >
                <FaWhatsapp className="w-5 h-5" />{" "}
                {/* Make sure to import FaWhatsapp */}
                Chat with Us
              </a>
            </div>
          </section>

          {/* Call to Action (Kickstart & Level Up) */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-10 flex flex-col justify-between shadow-xl min-h-[300px] hover:-translate-y-2 transition-transform duration-300 group text-white">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <FolderOpen className="w-10 h-10 text-white" />
                    <h2 className="text-3xl font-bold leading-snug">
                      Start Your Wealth Journey
                    </h2>
                  </div>
                  <p className="text-green-100 text-lg leading-relaxed">
                    Ready to take the first step? Open your Demat & Trading
                    account in minutes and begin investing with confidence. Zero
                    paperwork, instant approval, and full support every step of
                    the way.
                  </p>
                </div>
                <button
                  onClick={() =>
                    router.push("/services/stock-investment/open-demat-account")
                  }
                  className="mt-6 w-fit border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-700 transition-all duration-300"
                >
                  Start Investing Now
                </button>
              </div>

              <div className="bg-white rounded-3xl p-10 flex flex-col justify-between border-2 border-green-200 shadow-xl min-h-[300px] hover:-translate-y-2 transition-transform duration-300 group">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <UserCheck className="w-10 h-10 text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-800 leading-snug">
                      Level Up Your Portfolio
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Already investing? Supercharge your strategy with advanced
                    tools, real-time analytics, and personalized insights.
                    Unlock higher potential and trade smarter with our premium
                    platform.
                  </p>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      "/services/stock-investment/already-have-an-account"
                    )
                  }
                  className="mt-6 w-fit border border-green-600 text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Continue Your Journey
                </button>
              </div>
            </div>
          </section>

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
