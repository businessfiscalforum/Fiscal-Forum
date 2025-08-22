"use client";
import React, { useState } from "react";
import {
  BarChart3,
  FolderOpen,
  UserCheck,
  ArrowRight,
  Phone,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
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
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { BrokerInfiniteScroll } from "../../_components/Broker"; // Adjust path as needed

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

export default function MutualPage() {
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
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
      link: "/mutual-funds/all",
    },
    {
      id: 2,
      title: "Loan Against Mutual Funds",
      description:
        "Unlock quick cash by pledging funds. Cover expenses smartly without selling your long-term mutual fund investments.",
      icon: FaHandHoldingUsd,
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      link: "/mutual-funds/loan",
    },
    {
      id: 3,
      title: "Sovereign Gold Bonds (SGBs)",
      description:
        "Grow wealth safely in gold. Earn interest, skip storage worries, and keep your portfolio shining bright.",
      icon: FaGem,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/mutual-funds/sgb",
    },
  ];

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
                <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
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
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Pagination */}
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section>
      </div>

      {/* Main Layout: Content + Broker Scroll */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 pt-20">
        {/* Main Content */}
        <main className="flex-1">
          {/* <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h4 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Get Smarter Market Insights Delivered Daily
              </h4>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay ahead of the curve with expert-curated market reports,
                pre-market updates, and IPO alerts — straight to your inbox.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-10 h-10 text-green-600 mr-3" />
                <span className="text-lg font-semibold text-gray-700">
                  Daily Market Reports
                </span>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:opacity-70 text-white font-bold rounded-lg transition flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </form>

              {message && (
                <div
                  className={`mt-4 text-sm px-4 py-3 rounded-lg text-center ${
                    message.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Unsubscribe anytime. Your data is secure with us.
              </p>
            </div>
          </section> */}
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
          <section className="py-16 my-10 mx-4 sm:mx-auto max-w-4xl text-center bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-2xl px-6">
            <Phone className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Need Help? Talk to an Expert
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get personalized guidance on opening your queries related to
              mutual funds.
            </p>
            <button
              onClick={() => router.push("/services/stock-investment/contact")}
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition flex items-center gap-3 mx-auto"
            >
              <Phone className="w-5 h-5" />
              Schedule a Free Call
            </button>
          </section>

          {/* Account Options (Kickstart & Level Up) */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Start Investing in Mutual Funds */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-10 flex flex-col justify-between shadow-xl min-h-[300px] hover:-translate-y-2 transition-transform duration-300 group text-white">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <FolderOpen className="w-10 h-10 text-white" />
                    <h2 className="text-3xl font-bold leading-snug">
                      Begin Your Mutual Fund Journey
                    </h2>
                  </div>
                  <p className="text-green-100 text-lg leading-relaxed">
                    Open an investment account today and start building wealth
                    with diversified mutual fund portfolios — all from the
                    comfort of your home, paperless and hassle-free.
                  </p>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      "/services/mutual-funds/open-demat-account"
                    )
                  }
                  className="mt-6 w-fit border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-green-700 transition-all duration-300"
                >
                  Start Growing
                </button>
              </div>

              {/* Already Investing in Mutual Funds */}
              <div className="bg-white rounded-3xl p-10 flex flex-col justify-between border-2 border-green-200 shadow-xl min-h-[300px] hover:-translate-y-2 transition-transform duration-300 group">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <UserCheck className="w-10 h-10 text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-800 leading-snug">
                      Optimize Your Mutual Fund Portfolio
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Already have mutual fund investments? Shift to direct plans,
                    reduce expense ratios, and maximize your long-term returns
                    with our personalized strategies.
                  </p>
                </div>
                <button
                  onClick={() =>
                    router.push("/services/mutual-funds/already-have-an-account")
                  }
                  className="mt-6 w-fit border border-green-600 text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Continue Your Journey
                </button>
              </div>
            </div>
          </section>

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
                  Risk-Adjusted Returns
                </h3>
                <p className="text-emerald-100">
                  Portfolio optimization for maximum returns with controlled
                  risk
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaUsers />
                </div>
                <h3 className="text-lg font-bold mb-2">Expert Management</h3>
                <p className="text-emerald-100">
                  Professional fund managers with proven track records
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaRegClock />
                </div>
                <h3 className="text-lg font-bold mb-2">Flexible SIP Options</h3>
                <p className="text-emerald-100">
                  Start investing with as little as ₹500 per month
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaAward />
                </div>
                <h3 className="text-lg font-bold mb-2">Referral Rewards</h3>
                <p className="text-emerald-100">
                  Earn 1% commission on friends&apos; investment amounts
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
