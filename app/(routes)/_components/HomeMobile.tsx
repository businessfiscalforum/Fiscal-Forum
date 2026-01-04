"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaCoins,
  FaHandshake,
  FaUsers,
  FaBuilding,
  FaLock,
  FaRocket,
  FaAward,
  FaHeadset,
  FaLaptopCode,
  FaGlobe,
  FaHandsHelping,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { BarChart3, BookOpen, Shield, TrendingUp, Wallet } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import HomeNewsAndResearchSectionMobile from "./HomeResearchAndNewsSection";
import ResearchReportsSectionMobile from "./ResearchReportsSection";

const slides = [
  {
    title: "Stock Investment",
    subtitle: "Empower Your Portfolio",
    description:
      "Access real-time market data, advanced charting tools, and expert research to make informed investment decisions. Trade in equities, derivatives, and currencies with confidence.",
    image: "/bg.jpg",
    cta: "Start Trading",
    features: [
      "Zero brokerage on equity delivery",
      "Advanced charting tools",
      "Real-time market alerts",
      "Expert research & recommendations",
    ],
    path: "services/stock-investment",
    stats: [
      { value: "100+", label: "Active Traders" },
      { value: "50+", label: "Stocks & ETFs" },
      { value: "24/7", label: "Market Support" },
    ],
    benefits: [
      "High liquidity markets",
      "Diverse investment options",
      "Professional research tools",
      "Secure trading platform",
    ],
    tagline: "Trade Smarter, Grow Faster",
  },
  {
    title: "Mutual Funds",
    subtitle: "Smart Investment Solutions",
    description:
      "Diversify your portfolio with our expert-curated mutual fund options. Systematic investment plans, goal-based investing, and professional fund management.",
    image: "/bg.jpg",
    cta: "Start Investing",
    features: [
      "500+ fund options",
      "SIP starting from ₹500",
      "Expert research reports",
      "Zero commission plans",
    ],
    path: "services/mutual-funds",
    stats: [
      { value: "₹5K+", label: "Assets Under Management" },
      { value: "5+", label: "AMC Partners" },
      { value: "95%", label: "Customer Satisfaction" },
    ],
    benefits: [
      "Professional fund management",
      "Diversification benefits",
      "Flexible investment options",
      "Regular performance tracking",
    ],
    tagline: "Invest Wisely, Prosper Always",
  },
  {
    title: "Insurance",
    subtitle: "Comprehensive Protection",
    description:
      "Protect your family's future with our extensive insurance plans. Cashless hospitalization, wide network of hospitals, and coverage for critical illnesses.",
    image: "/bg.jpg",
    cta: "Get Quote",
    features: [
      "Coverage up to ₹1 crore",
      "6,000+ network hospitals",
      "No claim bonus up to 40%",
      "Family floater plans",
    ],
    path: "services/insurance",
    stats: [
      { value: "95%", label: "Claim Settlement Ratio" },
      { value: "24x7", label: "Customer Support" },
      { value: "15+", label: "Insurance Partners" },
    ],
    benefits: [
      "Comprehensive health coverage",
      "Life protection plans",
      "Motor insurance solutions",
      "Quick claim settlement",
    ],
    tagline: "Secure Today, Empower Tomorrow",
  },
  {
    title: "Credit Cards",
    subtitle: "Premium Financial Companion",
    description:
      "Choose from our range of credit cards with exclusive rewards, cashback offers, and lifestyle benefits. Build credit history while enjoying premium privileges.",
    image: "/bg.jpg",
    cta: "Apply Now",
    features: [
      "Reward points on every purchase",
      "Airport lounge access",
      "Zero liability protection",
      "EMI conversion facility",
    ],
    path: "services/credit-card",
    stats: [
      { value: "10+", label: "Credit Card Variants" },
      { value: "₹1K", label: "Rewards Distributed" },
      { value: "24x7", label: "Fraud Monitoring" },
    ],
    benefits: [
      "Exclusive lifestyle benefits",
      "Travel perks & lounge access",
      "Cashback on every transaction",
      "EMI options for big purchases",
    ],
    tagline: "Spend Smart, Earn More",
  },
  // {
  //   title: "Savings Accounts",
  //   subtitle: "Grow Your Wealth",
  //   description:
  //     "Maximize your savings with our high-interest savings accounts. Enjoy zero balance requirements, easy online access, and a range of value-added services.",
  //   image: "/bg.jpg",
  //   cta: "Open Account",
  //   features: [
  //     "Interest rates up to 7%",
  //     "Zero minimum balance",
  //     "24/7 mobile banking",
  //     "Free ATM withdrawals",
  //   ],
  //   path: "services/savings-account",
  //   stats: [
  //     { value: "5K+", label: "Happy Customers" },
  //     { value: "₹5K", label: "Deposits Managed" },
  //     { value: "99.9%", label: "Uptime Guarantee" },
  //   ],
  //   benefits: [
  //     "Competitive interest rates",
  //     "Digital banking solutions",
  //     "Multiple account variants",
  //     "24/7 customer support",
  //   ],
  //   tagline: "Save Today, Prosper Tomorrow",
  // },
  {
    title: "Loans",
    subtitle: "Flexible Financing Solutions",
    description:
      "Get instant access to personal, home, and business loans with competitive interest rates, minimal documentation, and quick disbursal tailored to your needs.",
    image: "/bg.jpg",
    cta: "Apply Now",
    features: [
      "Interest rates from 8.4%",
      "Loan amount up to ₹5 Cr",
      "Instant approval in 24 hours",
      "Flexible repayment tenure",
    ],
    path: "services/loans",
    stats: [
      { value: "₹10K", label: "Loans Disbursed" },
      { value: "95%", label: "Customer Approval" },
      { value: "24 hrs", label: "Fastest Approval" },
    ],
    benefits: [
      "Competitive interest rates",
      "Quick processing & disbursal",
      "Minimal documentation",
      "Flexible repayment options",
    ],
    tagline: "Your Dreams, Our Commitment",
  },
  {
    title: "Govt Bonds & FDs",
    subtitle: "Secure Investment Growth",
    description:
      "Maximize your savings with our competitive fixed deposit and government bond schemes. Guaranteed returns, flexible tenures, and multiple payout options for your financial security.",
    image: "/bg.jpg",
    cta: "View Rates",
    features: [
      "Interest rates up to 7.5%",
      "Tenure from 7 days to 20 years",
      "Monthly/Quarterly interest payout",
      "Loan against FD facility",
    ],
    path: "/services/govt-bond-and-fd",
    stats: [
      { value: "₹5K", label: "Deposits Managed" },
      { value: "AAA", label: "Credit Rating" },
      { value: "90%", label: "Capital Guarantee" },
    ],
    benefits: [
      "Guaranteed returns",
      "Government-backed security",
      "Flexible investment tenures",
      "Regular interest payouts",
    ],
    tagline: "Stability You Can Trust",
  },
];

const partners = [
  {
    title: "Business Development Partner",
    icon: FaBuilding,
    desc: "Join us in expanding financial services across the country.",
    gradient: "from-emerald-500 to-teal-600",
    hoverGradient: "from-emerald-600 to-teal-700",
    path: "/work-with-us/business-development-partnership",
  },
  {
    title: "Remisorship",
    icon: FaUsers,
    desc: "Start referral by remisorship to get benefits.",
    gradient: "from-green-500 to-emerald-600",
    hoverGradient: "from-green-600 to-emerald-700",
    path: "/work-with-us/remisorship",
  },
  {
    title: "B2B Partner",
    icon: FaHandshake,
    desc: "Collaborate with us to deliver seamless financial integration.",
    gradient: "from-teal-500 to-cyan-600",
    hoverGradient: "from-teal-600 to-cyan-700",
    path: "/work-with-us/b2b-partnership",
  },
];

const testimonials = [
  {
    name: "Ravi Kumar",
    text: "Fiscal Forum made banking easier for my startup! Their support team is incredible and the platform is so intuitive.",
    role: "Entrepreneur",
    rating: 5,
    image: "/user1.jpg",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    name: "Priya Mehta",
    text: "Great financial guidance, I invested with confidence. The returns have exceeded my expectations completely.",
    role: "Investor",
    rating: 5,
    image: "/user2.jpg",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    name: "Ankit Shah",
    text: "Their loan process was fast and transparent. Got approved within 24 hours with minimal documentation.",
    role: "Customer",
    rating: 5,
    image: "/user3.jpg",
    gradient: "from-teal-400 to-cyan-600",
  },
  {
    name: "Neha Jain",
    text: "Amazing service! I trust them for all money matters. Best financial platform I have ever used.",
    role: "Freelancer",
    rating: 5,
    image: "/user4.jpg",
    gradient: "from-emerald-500 to-green-600",
  },
];

const features = [
  {
    title: "Certified Market Updates",
    icon: FaLock,
    desc: "Stay ahead with timely, verified market news and insights so you can make smart decisions with confidence.",
  },
  {
    title: "Research Reports That Guide Your Next Move",
    icon: FaAward,
    desc: "Make informed choices with the best research reports designed to empower your next investment-clear, actionable, and easy to trust.",
  },
  {
    title: "Everything in One Place",
    icon: FaRocket,
    desc: "Enjoy all your financial services under one trusted roof-the more you see, the more you use, the more rewards you unlock.",
  },
  {
    title: "Trusted Partners & Dedicated Support",
    icon: FaHeadset,
    desc: "We're connected with prominent companies and back you with reliable, friendly support whenever you need a helping hand.",
  },
  {
    title: "Exclusive Rewards & Cashback",
    icon: FaCoins,
    desc: "Every services you choose brings unique perks, tailored rewards, and cashback benefits that add extra value to your journey",
  },
  {
    title: "24X7 Call Support",
    icon: FaCoins,
    desc: "Get your queries solved by scheduling a call, we will call you on your preferred scheduled time",
  },
];

const logos = [
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
];

// Additional content for enhanced sections
const additionalServices = [
  {
    title: "Digital Banking",
    icon: FaLaptopCode,
    desc: "Experience the future of banking with our cutting-edge digital platform. Seamless transactions, instant transfers, and 24/7 account management at your fingertips.",
  },
  {
    title: "Global Markets",
    icon: FaGlobe,
    desc: "Access international markets and diversify your portfolio globally. Trade in US stocks, international ETFs, and foreign currencies with expert guidance.",
  },
  {
    title: "Financial Advisory",
    icon: FaHandsHelping,
    desc: "Get personalized financial advice from certified advisors. Wealth management, tax planning, and retirement strategies tailored to your goals.",
  },
];
// Content for each tab
const content = {
  "investment-products": [
    {
      title: "Stock Investment",
      icon: BarChart3,
      description:
        "Step into the stock market with confidence and curiosity. Grow your wealth one smart choice at a time, guided by insights and people who genuinely care about your progress. Start where you are, invest wisely, and build your tomorrow.",
      link: "/services/stock-investment",
    },
    {
      title: "Mutual Funds",
      icon: TrendingUp,
      description:
        "Invest in mutual funds with the comfort of knowing you're never alone on the journey. Let your money work gently, balancing risk and opportunity, as you focus on living life fully today while planning for tomorrow's dreams.",
      link: "/services/mutual-funds",
    },
    {
      title: "Insurance",
      icon: Shield,
      description:
        "Life can be unpredictable, but your peace of mind shouldn't be. From your car to your health to your family's future, our insurance solutions stand by you — protecting what matters most, every single day, with care and trust.",
      link: "/services/insurance",
    },
    {
      title: "FD & Govt. Bonds",
      icon: Wallet,
      description:
        "Grow your savings safely with a thoughtful mix of Fixed Deposits and Government Bonds. Enjoy steady growth and dependable protection, giving you the calm confidence that your hard-earned money is secure while you're working.",
      link: "/services/govt-bonds-and-fd",
    },
  ],
  "banking-products": [
    {
      title: "Credit Card",
      icon: Wallet,
      description:
        "Enjoy life's moments with a credit card that matches your lifestyle. From everyday essentials to special treats, spend smartly, earn rewards, and manage your money with ease — all while knowing you have support whenever you need it.",
      link: "/services/credit-card",
    },
    // {
    //   title: "Savings Account",
    //   icon: Wallet,
    //   description:
    //     "Open a savings account that does more than just hold money — let your everyday savings gently grow, giving you freedom to plan, spend wisely, and handle life's surprises with a sense of security and confidence in the future.",
    //   link: "/services/saving-account",
    // },
    {
      title: "Loans",
      icon: Wallet,
      description:
        "Turn your plans into reality with a loan that understands your needs. Whether it's your dream home, a new venture, or unexpected expenses, we're here to help you move forward with clarity, comfort, and a trusted helping hand.",
      link: "/services/loan",
    },
  ],
  "research-reports": [
    {
      title: "Pre-Market Research Report",
      icon: BookOpen,
      description:
        "Start your trading day informed and prepared. Our pre-market research reports give you key insights, trends, and data before the bell rings — helping you make timely, confident financial decisions while others are still guessing.",
      link: "/demo/research-reports/pre-market-report",
    },
    {
      title: "Thematic Report",
      icon: BarChart3,
      description:
        "Stay ahead of the curve with in-depth thematic reports that spotlight emerging trends and sectors. Understand the bigger picture, identify new opportunities, and align your investments with themes shaping tomorrow's markets and industries.",
      link: "/demo/research-reports/thematic-report",
    },
    {
      title: "Equity Research Report",
      icon: BookOpen,
      description:
        "Invest smarter with detailed equity research reports crafted to decode company performance, growth potential, and market positioning. Get clear, unbiased insights that help you evaluate stocks with confidence and make informed calls that suit your goals.",
      link: "/demo/research-reports/equity-report",
    },
  ],
};

export default function HomeMobile() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "investment-products" | "banking-products"
  >("investment-products");
  const { user } = useUser();

  // 🛠️ Reuse `slides`, `partners`, `features`, `content` from original — ensure they’re in scope
  // (For submission, assume they’re imported or defined above)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Same logic as desktop — keep it
  };

  return (
    <div className="text-gray-800 font-sans min-h-screen bg-white">
      {/* 🔹 Half-Height Hero Slider */}
      <section className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[40vh] overflow-hidden">
  <Swiper
    spaceBetween={20}
    slidesPerView={1}
    loop
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    modules={[Autoplay, Pagination]}
    className="w-full h-full"
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index} className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-green-900/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-end h-full px-4 sm:px-8 pb-10 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="
              w-full max-w-md
              bg-white/15 backdrop-blur-lg
              rounded-2xl
              p-4 sm:p-6
              text-white
              shadow-xl
              border border-white/20
            "
          >
            <p className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">
              {slide.subtitle}
            </p>

            <h2 className="text-lg sm:text-xl font-bold mt-1">
              {slide.title}
            </h2>

            <p className="text-sm opacity-90 mt-1 line-clamp-2">
              {slide.description}
            </p>

            <div className="mt-4">
              <Link href={slide.path}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="
                    px-4 py-2
                    bg-gradient-to-r from-emerald-500 to-teal-500
                    text-white text-sm font-semibold
                    rounded-full
                    shadow-md
                  "
                >
                  {slide.cta}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


      {/* 🔹 News & Research — Mobile */}
      <HomeNewsAndResearchSectionMobile />

      {/* 🔹 Research Reports — Mobile */}
      <ResearchReportsSectionMobile />

      {/* 🔹 Tabbed Services (Cards Grid) */}
      <section className="px-4 py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 pb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex justify-center">
          Our Financial Premium Services
        </h2>
        <div className="flex justify-center gap-2 mb-6">
          {[
            { id: "investment-products", label: "Investment" },
            { id: "banking-products", label: "Banking" },
          ].map((tab) => (
            <button
              key={tab.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {content[activeTab].map((item, i) => (
            <Link key={i} href={item.link} className="block">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100 transition-all min-h-56"
              >
                <div className="p-4 text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-3">
                    {item.icon && (
                      <item.icon className="text-emerald-700 w-6 h-6" />
                    )}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs rounded-full font-medium">
                      Learn More
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔹 Why Choose Us — Glossy Cards */}
      <section className="px-4 py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 pb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex justify-center">
          Why Fiscal Forum?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 relative overflow-hidden flex flex-col h-full min-h-[180px]"
            >
              {/* Glow effect (unchanged) */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl -translate-y-10 translate-x-10"></div>

              <div className="relative p-5 flex flex-col items-center text-center flex-grow">
                {/* Icon — centered, above text */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="text-white text-lg" />
                </div>

                {/* Title & Description — now centered under icon */}
                <div className="flex flex-col items-center">
                  <h4 className="font-semibold text-gray-800 text-base mb-2">
                    {f.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 max-w-[90%]">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Partners — Horizontal Scroll Cards */}
      <section className="px-4 py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 pb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex justify-center">
          Work With Us
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {partners.map((p, i) => (
            <Link key={i} href={p.path} className="flex-shrink-0 w-48">
              <motion.div
                whileHover={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden h-full min-h-[180px] flex flex-col"
              >
                <div className={`h-1.5 bg-gradient-to-r ${p.gradient}`}></div>
                <div className="p-4 text-center flex flex-col flex-grow">
                  <div
                    className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${p.gradient} flex items-center justify-center mb-3 flex-shrink-0`}
                  >
                    <p.icon className="text-white text-lg" />
                  </div>
                  <h5 className="font-semibold text-gray-800 text-sm mb-1">
                    {p.title}
                  </h5>
                  <p className="text-xs text-gray-600 mt-1 flex-grow">
                    {p.desc}
                  </p>
                  <button
                    className={`mt-3 w-full py-2 text-xs font-medium text-white bg-gradient-to-r ${p.gradient} rounded-full`}
                    // Optional: prevent button from triggering link twice
                    onClick={(e) => e.preventDefault()}
                  >
                    Join Now
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Referral section — Compact Mobile Version */}
{user && (
  <section className="py-8 md:py-16 bg-white relative overflow-hidden">
    {/* Background Blobs (optional on mobile — keep only if low-cost) */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-purple-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-indigo-200/20 to-cyan-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 md:mt-4 pb-2 md:pb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        Referral Program
      </h2>

      <motion.p

        className="text-sm sm:text-base text-gray-600 mb-6 md:mb-8 max-w-xl mx-auto"
      >
        Invite friends to Fiscal Forum and earn rewards. Share your code and grow your network today!
      </motion.p>

      {/* Compact 1-col layout on mobile, 3-col on md+ */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
        {[
          {
            title: "Earn Credits",
            desc: "Get 10 credits per signup. Redeem for premium features & content.",
            icon: <FaUsers className="text-white text-lg" />,
            gradient: "from-green-500 to-emerald-600",
          },
          {
            title: "Build Network",
            desc: "Connect with finance enthusiasts and grow your professional circle.",
            icon: <FaHandshake className="text-white text-lg" />,
            gradient: "from-green-500 to-teal-600",
          },
          {
            title: "Exclusive Rewards",
            desc: "Unlock VIP access, early features, and special perks as you refer more.",
            icon: <FaAward className="text-white text-lg" />,
            gradient: "from-teal-500 to-emerald-600",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
              {item.icon}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 rounded-xl p-5 sm:p-6 text-white"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-2">Ready to Start Referring?</h3>
        <p className="text-indigo-100 text-xs sm:text-sm mb-4">
          Join thousands earning rewards through our referral program.
        </p>
        <Link
          href="/referrals"
          className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-emerald-600 font-semibold rounded-full text-xs sm:text-sm shadow hover:bg-gray-100 transition-colors duration-300"
        >
          <FaRocket className="mr-1.5 text-sm" />
          View My Referrals
        </Link>
      </motion.div>
    </div>
  </section>
)}

      {/* 🔹 Affiliations — Auto-scrolling Logos */}
      <section className="py-8 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 pb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex justify-center">
          Our Trusted Affiliations
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="mx-4 flex-shrink-0 h-12 flex items-center"
              >
                <Image
                  src={logo}
                  alt={`Partner ${i}`}
                  width={80}
                  height={48}
                  className="object-contain opacity-100 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 4s linear infinite;
        }
      `}</style>
      <style jsx>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          width: 20px !important;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
