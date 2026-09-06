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

const NestIcon = ({ size, className, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size || "24"}
    height={size || "24"}
    className={className}
    {...props}
  >
    {/* Nest bowl (twigs/layers) */}
    <path d="M3 14c0 4.5 4 7 9 7s9-2.5 9-7" />
    <path d="M2 16c1 3.5 4.5 5.5 10 5.5s9-2 10-5.5" />
    <path d="M5 13c1.5.5 3 1 7 1s5.5-.5 7-1" />
    <path d="M4 18h16" />
    {/* Eggs */}
    <path d="M9 10c0-1.5 1-2.5 2-2.5s2 1 2 2.5c0 1.5-1 2.5-2 2.5S9 11.5 9 10z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 9c0-1.5 1-2.5 2-2.5s2 1 2 2.5c0 1.5-1 2.5-2 2.5S12 10.5 12 9z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const investmentOptions = [
  {
    id: "equity-etfs",
    title: "Equity & ETFs",
    description:
      "Own company shares or diversify smartly with ETFs.",
    icon: BarChart3,
    link: "/services/learn-earn/equity-etfs",
    alink: "/services/learn-earn/equity-etfs/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    image: "/images/cat-equity.png",
  },
  {
    id: "futures-options",
    title: "Futures & Options (F&O)",
    description:
      "Hedge risk or speculate on price moves.",
    icon: TrendingUp,
    link: "/services/learn-earn/futures-options",
    alink: "/services/learn-earn/futures-options/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    image: "/images/cat-fo.png",
  },
  {
    id: "ipo",
    title: "Initial Public Offering (IPO)",
    description:
      "Invest early in growing companies.",
    icon: Sparkles,
    link: "/services/learn-earn/ipo",
    alink: "/services/learn-earn/ipo/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
    image: "/images/cat-ipo.png",
  },
  {
    id: "mtf",
    title: "Margin Trading Facility (MTF)",
    description:
      "Buy stocks with borrowed broker funds for leverage.",
    icon: Zap,
    link: "/services/learn-earn/mtf",
    alink: "/services/learn-earn/mtf/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    image: "/images/cat-mtf.png",
  },
  {
    id: "commodities",
    title: "Commodities",
    description:
      "Trade real assets like gold, silver, crude oil.",
    icon: Coins,
    link: "/services/learn-earn/commodities",
    alink: "/services/learn-earn/commodities/apply",
    bgColor: "bg-gradient-to-br from-green-500 to-green-700",
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    image: "/images/cat-commodities.png",
  },
  {
    id: "unlisted-shares",
    title: "Unlisted Shares",
    description:
      "Invest early in companies before listing.",
    icon: Gem,
    link: "/services/learn-earn/unlisted-shares",
    alink: "/services/learn-earn/unlisted-shares/apply",
    bgColor: "bg-white",
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    image: "/images/cat-unlisted.png",
  },
  {
    id: "mutual-funds",
    title: "Mutual Fund",
    description:
      "Diversify your portfolio with our expert-curated mutual fund options.",
    icon: NestIcon,
    link: "/services/mutual-funds",
    alink: "/services/mutual-funds/open-demat-account",
    bgColor: "bg-white",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    image: "/images/cat-mutual.png",
  },
];

export default function StockInvestmentPage() {
  const [hoveredOption, setHoveredOption] = useState<(typeof investmentOptions)[0] | null>(
    investmentOptions[0]
  );
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
            className="relative border border-black bg-white rounded-3xl p-8 md:p-12 shadow-md overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FA463]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl pr-16 md:pr-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-black rounded-lg text-black font-bold text-xs uppercase tracking-wider">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Investments
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-none">
                  Smart Stock <span className="text-[#1FA463]">Investment</span> Strategies
                </h1>
                <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                  Navigate the financial markets with absolute confidence. Discover premium investment options tailored to your personal wealth goals, built for long-term growth and success.
                </p>
              </div>
              <div className="flex-shrink-0 absolute top-8 right-8 md:relative md:top-0 md:right-0">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-yellow-100 border border-black rounded-2xl flex items-center justify-center shadow-sm rotate-3 hover:rotate-0 transition-transform">
                  <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-black" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Investment Cards Grid / Interactive Tree */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold uppercase text-black border-b border-black pb-2">
                Our Investment Verticals
              </h2>
              <p className="text-sm md:text-base text-gray-600 font-medium">
                Click on the boxes on tree you want to explore ...
              </p>
            </div>
            
            {/* Unified Responsive Grid: Stacked on Mobile/Tablet, Side-by-Side on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Tree Diagram Column */}
              <div className="col-span-1 lg:col-span-7 border border-black rounded-3xl bg-[#FAF8F5] p-4 md:p-6 shadow-md flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-[800px]">
                  <img
                    src="/investment-tree.jpg"
                    alt="Investment Verticals Tree"
                    className="w-full h-auto block select-none rounded-xl"
                  />
                  
                  {/* Hotspots */}
                  {investmentOptions.map((option) => {
                    // Position mapping for each option ID based on tree structure
                    let coords = { left: "0%", top: "0%", width: "0%", height: "0%" };
                    switch (option.id) {
                      case "equity-etfs":
                        coords = { left: "32.03%", top: "12.94%", width: "12.11%", height: "15.26%" };
                        break;
                      case "futures-options":
                        coords = { left: "55.08%", top: "12.70%", width: "12.60%", height: "15.26%" };
                        break;
                      case "ipo":
                        coords = { left: "23.05%", top: "32.60%", width: "12.21%", height: "15.26%" };
                        break;
                      case "mtf":
                        coords = { left: "63.96%", top: "32.48%", width: "12.40%", height: "15.26%" };
                        break;
                      case "commodities":
                        coords = { left: "29.20%", top: "54.46%", width: "12.11%", height: "15.26%" };
                        break;
                      case "mutual-funds":
                        coords = { left: "43.51%", top: "32.54%", width: "12.21%", height: "15.26%" };
                        break;
                      case "unlisted-shares":
                        coords = { left: "59.67%", top: "54.82%", width: "12.21%", height: "15.26%" };
                        break;
                    }

                    const isHovered = hoveredOption?.id === option.id;

                    return (
                      <Link
                        key={option.id}
                        href={option.link}
                        onMouseEnter={() => setHoveredOption(option)}
                        onClick={(e) => {
                          if (hoveredOption?.id === option.id) {
                            // Already selected, let standard navigation happen
                          } else {
                            // Select it first, prevent immediate navigation on mobile/first-tap
                            e.preventDefault();
                            setHoveredOption(option);
                          }
                        }}
                        className="absolute block group transition-all duration-200"
                        style={{
                          left: coords.left,
                          top: coords.top,
                          width: coords.width,
                          height: coords.height,
                          containerType: "size",
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-[8px] bg-white border border-[#2D3748]/20 flex flex-col items-center justify-center p-[6cqw] text-center transition-all duration-200 ${
                            isHovered
                              ? "border-[#FFD400] shadow-[0_0_12px_rgba(255,212,0,0.5)] scale-[1.03]"
                              : "hover:border-[#FFD400] hover:scale-[1.03]"
                          }`}
                        >
                          <option.icon
                            className="transition-colors duration-200"
                            style={{
                              width: "28cqw",
                              height: "28cqw",
                              marginBottom: "8cqw",
                              color: isHovered ? "#B9903D" : "#1A1A1A",
                            }}
                          />
                          <span
                            className="font-extrabold uppercase leading-tight tracking-wider transition-colors duration-200"
                            style={{
                              fontSize: "9cqw",
                              color: "#1A1A1A",
                            }}
                          >
                            {option.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Detail Card Column */}
              <div className="col-span-1 lg:col-span-5 flex flex-col">
                <div className="flex-grow border border-black bg-white rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between relative overflow-hidden min-h-[320px]">
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#1FA463]" />

                  {hoveredOption ? (
                    <motion.div
                      key={hoveredOption.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-grow flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-4 md:space-y-6">
                        {/* Icon and Category Label */}
                        <div className="flex items-center gap-4">
                          <div className="p-3 md:p-4 bg-emerald-50 border border-black rounded-2xl shadow-sm">
                            {React.createElement(hoveredOption.icon, {
                              className: "w-6 h-6 md:w-8 md:h-8 text-black",
                            })}
                          </div>
                          <div>
                            <span className="text-[10px] md:text-xs font-bold text-[#1FA463] uppercase tracking-widest">
                              Investment Option
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight">
                              {hoveredOption.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 font-semibold text-sm md:text-lg leading-relaxed pt-2">
                          {hoveredOption.description}
                        </p>
                      </div>

                      {/* Illustration Image */}
                      {hoveredOption.image && (
                        <div className="flex justify-center items-center py-4 flex-grow">
                          <img
                            src={hoveredOption.image}
                            alt={hoveredOption.title}
                            className="max-h-32 md:max-h-40 w-auto object-contain transition-all duration-300 transform hover:scale-105"
                          />
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-4 md:pt-6 space-y-3">
                        <Link href={hoveredOption.link}>
                          <button className="w-full bg-[#1FA463] text-white border border-black py-3.5 md:py-4 rounded-xl font-bold hover:bg-[#15824D] hover:shadow-sm  transition-all shadow-sm uppercase text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer">
                            <span>Explore {hoveredOption.title}</span>
                            <span>&rarr;</span>
                          </button>
                        </Link>
                        {hoveredOption.alink && (
                          <Link href={hoveredOption.alink}>
                            <button className="w-full bg-white text-black border border-black py-2.5 md:py-3 rounded-xl font-bold hover:bg-yellow-100 hover:shadow-sm  transition-all shadow-sm uppercase text-[10px] md:text-xs cursor-pointer">
                              Apply Now
                            </button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                      <BarChart3 className="w-16 h-16 text-gray-300 animate-pulse" />
                      <h3 className="text-xl font-bold text-black uppercase">
                        Select a Vertical
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold max-w-xs">
                        Tap or hover over the branches of the investment tree to see descriptions and options.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Split Studio */}
          <PortfolioSplitStudio />

          {/* Call to Action (Kickstart & Level Up) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 items-stretch">
            {/* CTA 1 */}
            <div className="relative bg-[#1FA463] text-black border border-black rounded-2xl md:rounded-3xl p-3.5 sm:p-6 md:p-10 shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between overflow-hidden h-full">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 z-10 flex-1 flex flex-col">
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-white border border-black rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
                    <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                  </div>
                  <h2 className="text-xs sm:text-xl md:text-3xl font-bold uppercase tracking-tight text-black leading-tight flex-1">
                    Start Your Wealth Journey
                  </h2>
                </div>
                <p className="text-black font-semibold text-[11px] sm:text-sm md:text-base leading-tight sm:leading-relaxed flex-1">
                  Ready to take the first step? Open your Demat & Trading account in minutes and begin investing with confidence. Zero paperwork, instant approval, and dedicated live support.
                </p>
              </div>
              <div className="pt-3 sm:pt-6 md:pt-8 z-10 mt-auto">
                <Link href="/services/learn-earn/open-demat-account" className="block w-full md:w-auto">
                  <button className="w-full md:w-auto bg-white text-black border border-black px-2 py-2 sm:px-6 sm:py-3.5 rounded-lg sm:rounded-xl font-bold hover:bg-yellow-100 hover:shadow-sm transition-all shadow-sm uppercase text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-center leading-tight">
                    Start Investing Now
                  </button>
                </Link>
              </div>
            </div>

            {/* CTA 2 */}
            <div className="relative bg-white text-black border border-black rounded-2xl md:rounded-3xl p-3.5 sm:p-6 md:p-10 shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between overflow-hidden h-full">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 z-10 flex-1 flex flex-col">
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-emerald-50 border border-black rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
                  </div>
                  <h2 className="text-xs sm:text-xl md:text-3xl font-bold uppercase tracking-tight text-black leading-tight flex-1">
                    Level Up Your Portfolio
                  </h2>
                </div>
                <p className="text-gray-700 font-semibold text-[11px] sm:text-sm md:text-base leading-tight sm:leading-relaxed flex-1">
                  Already investing? Supercharge your trading strategy with advanced analytical tools, real-time index data, and customized expert insights. Unlock higher financial potential with us.
                </p>
              </div>
              <div className="pt-3 sm:pt-6 md:pt-8 z-10 mt-auto">
                <Link href="/services/learn-earn/already-have-an-account" className="block w-full md:w-auto">
                  <button className="w-full md:w-auto bg-[#1FA463] text-white border border-black px-2 py-2 sm:px-6 sm:py-3.5 rounded-lg sm:rounded-xl font-bold hover:bg-[#15824D] hover:shadow-sm transition-all shadow-sm uppercase text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-center leading-tight">
                    Continue Your Journey
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Expert Support Section */}
          <div className="border border-black bg-white rounded-3xl p-8 shadow-md relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 z-10 relative">
              <div className="text-center lg:text-left space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold uppercase text-black">
                  Need Help? Talk to an Expert
                </h2>
                <p className="text-base text-gray-700 font-semibold max-w-xl">
                  Get personalized, hassle-free guidance on your financial queries from our support desk.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="tel:+918696060387"
                  className="bg-white border border-black text-black hover:bg-yellow-50 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-sm uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/+918696060387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] border border-black text-black hover:bg-[#20ba5a] px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-sm uppercase"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="border border-black bg-white rounded-3xl p-8 md:p-10 shadow-md">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold uppercase text-black leading-none">
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
                    className="bg-[#F4FBF7] border border-black p-6 rounded-2xl shadow-sm hover:-translate-y-0.5 transition-all flex flex-col space-y-3"
                  >
                    <div className="p-2.5 bg-white border border-black rounded-lg w-fit shadow-sm">
                      <Icon className="text-black w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold uppercase text-black leading-tight">
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
