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
import PortfolioSplitStudio from "./PortfolioSplitStudio";

const investmentOptions = [
  {
    id: "equity-etfs",
    title: "Equity & ETFs",
    description:
      "Own company shares or diversify smartly with ETFs.",
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
      "Hedge risk or speculate on price moves.",
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
      "Invest early in growing companies.",
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
      "Buy stocks with borrowed broker funds for leverage.",
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
      "Trade real assets like gold, silver, crude oil.",
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
      "Invest early in companies before listing.",
    icon: Gem,
    link: "/services/stock-investment/unlisted-shares",
    alink: "/services/stock-investment/unlisted-shares/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export default function StockInvestmentPage() {
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
      {/* Main Layout: Content */}
      <div className="min-h-screen bg-[#F4FBF7] pt-32 pb-20">
        <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative border-2 border-black bg-white rounded-3xl p-8 md:p-12 shadow-[4px_4px_0px_#000] overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FA463]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-black rounded-lg text-black font-bold text-xs uppercase tracking-wider">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Investments
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight leading-none">
                  Smart Stock <span className="text-[#1FA463]">Investment</span> Strategies
                </h1>
                <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                  Navigate the financial markets with absolute confidence. Discover premium investment options tailored to your personal wealth goals, built for long-term growth and success.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-yellow-100 border-2 border-black rounded-2xl flex items-center justify-center shadow-[3px_3px_0px_#000] rotate-3 hover:rotate-0 transition-transform">
                  <TrendingUp className="w-12 h-12 text-black" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Investment Cards Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase text-black border-b-2 border-black pb-2">
              Our Investment Verticals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {investmentOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all overflow-hidden flex flex-col group"
                  >
                    <Link href={option.link} className="flex-grow flex flex-col p-6 space-y-4">
                      {/* colored accent bar */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#1FA463]" />
                      
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-emerald-50 border border-black rounded-xl shadow-[2px_2px_0px_#000]">
                          {IconComponent && (
                            <IconComponent className="w-6 h-6 text-black" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">
                          EXPLORE &rarr;
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-black text-black uppercase tracking-tight">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-700 font-semibold leading-relaxed flex-grow">
                        {option.description}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Portfolio Split Studio */}
          <PortfolioSplitStudio />

          {/* Call to Action (Kickstart & Level Up) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CTA 1 */}
            <div className="relative bg-[#1FA463] text-black border-2 border-black rounded-3xl p-8 md:p-10 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-all flex flex-col justify-between overflow-hidden">
              <div className="space-y-6 z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <FolderOpen className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                    Start Your Wealth Journey
                  </h2>
                </div>
                <p className="text-black font-semibold text-base leading-relaxed">
                  Ready to take the first step? Open your Demat & Trading account in minutes and begin investing with confidence. Zero paperwork, instant approval, and dedicated live support.
                </p>
              </div>
              <div className="pt-8 z-10">
                <Link href="/services/stock-investment/open-demat-account">
                  <button className="w-full sm:w-auto bg-white text-black border-2 border-black px-6 py-3.5 rounded-xl font-black hover:bg-yellow-100 hover:shadow-[3px_3px_0px_#000] active:translate-y-[2px] transition-all shadow-[2px_2px_0px_#000] uppercase text-sm">
                    Start Investing Now
                  </button>
                </Link>
              </div>
            </div>

            {/* CTA 2 */}
            <div className="relative bg-white text-black border-2 border-black rounded-3xl p-8 md:p-10 shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-all flex flex-col justify-between overflow-hidden">
              <div className="space-y-6 z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]">
                    <UserCheck className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                    Level Up Your Portfolio
                  </h2>
                </div>
                <p className="text-gray-700 font-semibold text-base leading-relaxed">
                  Already investing? Supercharge your trading strategy with advanced analytical tools, real-time index data, and customized expert insights. Unlock higher financial potential with us.
                </p>
              </div>
              <div className="pt-8 z-10">
                <Link href="/services/stock-investment/already-have-an-account">
                  <button className="w-full sm:w-auto bg-[#1FA463] text-white border-2 border-black px-6 py-3.5 rounded-xl font-black hover:bg-[#15824D] hover:shadow-[3px_3px_0px_#000] active:translate-y-[2px] transition-all shadow-[2px_2px_0px_#000] uppercase text-sm">
                    Continue Your Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Expert Support Section */}
          <div className="border-2 border-black bg-white rounded-3xl p-8 shadow-[4px_4px_0px_#000] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 z-10 relative">
              <div className="text-center lg:text-left space-y-2">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-black">
                  Need Help? Talk to an Expert
                </h2>
                <p className="text-base text-gray-700 font-semibold max-w-xl">
                  Get personalized, hassle-free guidance on your financial queries from our support desk.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="tel:+918696060387"
                  className="bg-white border-2 border-black text-black hover:bg-yellow-50 px-6 py-3.5 rounded-xl font-black transition-all shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 text-sm uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/+918696060387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] border-2 border-black text-black hover:bg-[#20ba5a] px-6 py-3.5 rounded-xl font-black transition-all shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 text-sm uppercase"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="border-2 border-black bg-white rounded-3xl p-8 md:p-10 shadow-[4px_4px_0px_#000]">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-none">
                Grow Smarter, Invest Better
              </h2>
              <p className="text-base text-gray-600 font-medium">
                Everything you need to succeed in the markets — all in one powerful, transparent platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Free Premarket Reports",
                  icon: FaChartLine,
                  desc: "Stay ahead with daily premarket reports and sector updates.",
                },
                {
                  title: "24/7 Dedicated Support",
                  icon: FaHeadset,
                  desc: "Enjoy quick query resolution and hassle-free account support.",
                },
                {
                  title: "Brokerage Cashback",
                  icon: FaRocket,
                  desc: "Enhance your investing journey, now with exciting brokerage cashbacks.",
                },
                {
                  title: "Refer & Earn",
                  icon: FaAward,
                  desc: "Get premium rewards for every friend who starts investing with you.",
                },
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#F4FBF7] border-2 border-black p-6 rounded-2xl shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] transition-all flex flex-col space-y-3"
                  >
                    <div className="p-2.5 bg-white border border-black rounded-lg w-fit shadow-[1px_1px_0px_#000]">
                      <Icon className="text-black w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black uppercase text-black leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
