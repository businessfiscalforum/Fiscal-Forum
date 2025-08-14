"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaCoins,
  FaHandshake,
  FaUsers,
  FaBuilding,
  FaStar,
  FaQuoteLeft,
  FaLock,
  FaRocket,
  FaGem,
  FaHeart,
  FaAward,
  FaCheckCircle,
  FaHeadset,
  FaRegLightbulb,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import HomeResearchAndNewsSection from "./(routes)/_components/HomeResearchAndNewsSection";
import { useState } from "react";
import { BarChart3, BookOpen, Shield, TrendingUp, Wallet } from "lucide-react";
import ResearchReportsSection from "./(routes)/_components/ResearchReportsSection";

const slides = [
  {
    title: "Stock Investment",
    subtitle: "Empower Your Portfolio",
    description:
      "Access real-time market data, advanced charting tools, and expert research to make informed investment decisions. Trade in equities, derivatives, and currencies with confidence.",
    image: "/stock.jpg",
    cta: "Start Trading",
    features: [
      "Zero brokerage on equity delivery",
      "Advanced charting tools",
      "Real-time market alerts",
      "Expert research & recommendations",
    ],
    path: "services/stock-investment",
    stats: [
      { value: "1M+", label: "Active Traders" },
      { value: "5000+", label: "Stocks & ETFs" },
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
    image: "/mutual.jpg",
    cta: "Start Investing",
    features: [
      "500+ fund options",
      "SIP starting from ₹500",
      "Expert research reports",
      "Zero commission plans",
    ],
    path: "services/mutual-funds",
    stats: [
      { value: "₹2.5L Cr", label: "Assets Under Management" },
      { value: "15+", label: "AMC Partners" },
      { value: "98%", label: "Customer Satisfaction" },
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
    image: "/insurance.jpg",
    cta: "Get Quote",
    features: [
      "Coverage up to ₹1 crore",
      "6,000+ network hospitals",
      "No claim bonus up to 50%",
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
    image: "/stock2.jpg",
    cta: "Apply Now",
    features: [
      "Reward points on every purchase",
      "Airport lounge access",
      "Zero liability protection",
      "EMI conversion facility",
    ],
    path: "services/credit-card",
    stats: [
      { value: "50+", label: "Credit Card Variants" },
      { value: "₹10Cr+", label: "Rewards Distributed" },
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
  {
    title: "Savings Accounts",
    subtitle: "Grow Your Wealth",
    description:
      "Maximize your savings with our high-interest savings accounts. Enjoy zero balance requirements, easy online access, and a range of value-added services.",
    image: "/savings.jpg",
    cta: "Open Account",
    features: [
      "Interest rates up to 7%",
      "Zero minimum balance",
      "24/7 mobile banking",
      "Free ATM withdrawals",
    ],
    path: "services/savings-account",
    stats: [
      { value: "50L+", label: "Happy Customers" },
      { value: "₹1000 Cr+", label: "Deposits Managed" },
      { value: "99.9%", label: "Uptime Guarantee" },
    ],
    benefits: [
      "Competitive interest rates",
      "Digital banking solutions",
      "Multiple account variants",
      "24/7 customer support",
    ],
    tagline: "Save Today, Prosper Tomorrow",
  },
  {
    title: "Loans",
    subtitle: "Flexible Financing Solutions",
    description:
      "Get instant access to personal, home, and business loans with competitive interest rates, minimal documentation, and quick disbursal tailored to your needs.",
    image: "/loans.jpg",
    cta: "Apply Now",
    features: [
      "Interest rates from 8.4%",
      "Loan amount up to ₹5 Cr",
      "Instant approval in 24 hours",
      "Flexible repayment tenure",
    ],
    path: "services/loans",
    stats: [
      { value: "₹50,000 Cr+", label: "Loans Disbursed" },
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
    image: "/govt.jpg",
    cta: "View Rates",
    features: [
      "Interest rates up to 7.5%",
      "Tenure from 7 days to 20 years",
      "Monthly/Quarterly interest payout",
      "Loan against FD facility",
    ],
    path: "/govt.jpg",
    stats: [
      { value: "₹1 Lakh Cr+", label: "Deposits Managed" },
      { value: "AAA", label: "Credit Rating" },
      { value: "100%", label: "Capital Guarantee" },
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

// const services = [
//   {
//     name: "Loan Services",
//     icon: FaWallet,
//     desc: "Flexible and quick loans for every need.",
//     gradient: "from-blue-500 to-indigo-600",
//     bgGradient: "from-blue-50 to-indigo-100",
//   },
//   {
//     name: "Insurance Plans",
//     icon: FaShieldAlt,
//     desc: "Comprehensive health and life coverage.",
//     gradient: "from-emerald-500 to-teal-600",
//     bgGradient: "from-emerald-50 to-teal-100",
//   },
//   {
//     name: "Savings Account",
//     icon: FaPiggyBank,
//     desc: "High-interest, zero-minimum balance accounts.",
//     gradient: "from-pink-500 to-rose-600",
//     bgGradient: "from-pink-50 to-rose-100",
//   },
//   {
//     name: "Stock Investment",
//     icon: FaChartLine,
//     desc: "Direct stock market access and tools.",
//     gradient: "from-purple-500 to-violet-600",
//     bgGradient: "from-purple-50 to-violet-100",
//   },
//   {
//     name: "Mutual Funds",
//     icon: FaCoins,
//     desc: "Diversified expert-managed portfolios.",
//     gradient: "from-amber-500 to-orange-600",
//     bgGradient: "from-amber-50 to-orange-100",
//   },
//   {
//     name: "Credit Card",
//     icon: FaCreditCard,
//     desc: "Rewards, cashback, and easy EMIs.",
//     gradient: "from-red-500 to-pink-600",
//     bgGradient: "from-red-50 to-pink-100",
//   },
//   {
//     name: "Govt Bonds & FD",
//     icon: FaUniversity,
//     desc: "Stable income with guaranteed returns.",
//     gradient: "from-green-500 to-emerald-600",
//     bgGradient: "from-green-50 to-emerald-100",
//   },
// ];

const partners = [
  {
    title: "Business Partner",
    icon: FaBuilding,
    desc: "Join us in expanding financial services across the country.",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    title: "Referral Partner",
    icon: FaUsers,
    desc: "Refer and earn with our trusted partnership model.",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    title: "B2B Partner",
    icon: FaHandshake,
    desc: "Collaborate with us to deliver seamless financial integration.",
    gradient: "from-purple-600 to-violet-700",
  },
];

const testimonials = [
  {
    name: "Ravi Kumar",
    text: "Fiscal Forum made banking easier for my startup! Their support team is incredible and the platform is so intuitive.",
    role: "Entrepreneur",
    rating: 5,
    image: "/user1.jpg",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Priya Mehta",
    text: "Great financial guidance, I invested with confidence. The returns have exceeded my expectations completely.",
    role: "Investor",
    rating: 5,
    image: "/user2.jpg",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Ankit Shah",
    text: "Their loan process was fast and transparent. Got approved within 24 hours with minimal documentation.",
    role: "Customer",
    rating: 5,
    image: "/user3.jpg",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Neha Jain",
    text: "Amazing service! I trust them for all money matters. Best financial platform I have ever used.",
    role: "Freelancer",
    rating: 5,
    image: "/user4.jpg",
    gradient: "from-indigo-500 to-purple-600",
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
    desc: "Make informed choices with the best researcg reports designed to empower your next intevtment-clear, actionable, and easy to trust.",
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
];

const logos = [
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
];

export default function HomePage() {
  type TabKey = "investment-products" | "banking-products" | "research-reports";
  const [activeTab, setActiveTab] = useState<TabKey>("investment-products");

  // Tabs Data
  const tabs = [
    { id: "investment-products", label: "Investment Products" },
    { id: "banking-products", label: "Banking Products" },
    // { id: "research-reports", label: "Research Reports" },
  ];

  // Content for each tab
  const content = {
    "investment-products": [
      {
        title: "Stock Investment",
        icon: BarChart3,
        description:
          "Step into the stock market with confidence and curiosity. Grow your wealth one smart choice at a time, guided by insights and people who genuinely care about your progress. Start where you are, invest wisely, and build your tomorrow.",
        link: "/demo/investment-products/stock-investment",
      },
      {
        title: "Mutual Funds",
        icon: TrendingUp,
        description:
          "Invest in mutual funds with the comfort of knowing you're never alone on the journey. Let your money work gently, balancing risk and opportunity, as you focus on living life fully today while planning for tomorrow's dreams.",
        link: "/demo/investment-products/mutual-funds",
      },
      {
        title: "Insurance (Motor, Health, Life)",
        icon: Shield,
        description:
          "Life can be unpredictable, but your peace of mind shouldn't be. From your car to your health to your family's future, our insurance solutions stand by you — protecting what matters most, every single day, with care and trust.",
        link: "/demo/investment-products/insurance",
      },
      {
        title: "FD & Government Bonds",
        icon: Wallet,
        description:
          "Grow your savings safely with a thoughtful mix of Fixed Deposits and Government Bonds. Enjoy steady growth and dependable protection, giving you the calm confidence that your hard-earned money is secure while quietly working for your future goals.",
        link: "/demo/investment-products/fd-gov-bonds",
      },
    ],
    "banking-products": [
      {
        title: "Credit Card",
        icon: Wallet,
        description:
          "Enjoy life's moments with a credit card that matches your lifestyle. From everyday essentials to special treats, spend smartly, earn rewards, and manage your money with ease — all while knowing you have support whenever you need it.",
        link: "/demo/banking-products/credit-card",
      },
      {
        title: "Savings Account",
        icon: Wallet,
        description:
          "Open a savings account that does more than just hold money — let your everyday savings gently grow, giving you freedom to plan, spend wisely, and handle life's surprises with a sense of security and confidence in the future.",
        link: "/demo/banking-products/savings-account",
      },
      {
        title: "Loans",
        icon: Wallet,
        description:
          "Turn your plans into reality with a loan that understands your needs. Whether it's your dream home, a new venture, or unexpected expenses, we're here to help you move forward with clarity, comfort, and a trusted helping hand.",
        link: "/demo/banking-products/loans",
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

  return (
    <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Floating Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div> */}

      {/* Hero Section */}
<section className="relative w-full h-screen overflow-hidden">
  <Swiper
    spaceBetween={30}
    slidesPerView={1}
    loop
    autoplay={{ delay: 6000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    modules={[Autoplay, Pagination]}
    className="w-full h-full"
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index} className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover "
            priority
          />
          {/* Stronger gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row p-4 sm:p-6 md:p-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white w-full max-w-2xl"
            >
              <p className="uppercase tracking-wider text-yellow-300 font-semibold mb-3 text-sm sm:text-base">
                {slide.subtitle}
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                {slide.title}
              </h2>

              <p className="text-sm sm:text-base md:text-lg opacity-90 mb-6 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {slide.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm sm:text-base">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={slide.path}>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg transition-all text-sm sm:text-base">
                    {slide.cta} <FaRocket className="inline ml-2" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-black transition-all text-sm sm:text-base">
                    Talk to Expert
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center mt-8 lg:mt-0 lg:pl-10 text-white gap-6">
            {/* Stats */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Key Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-yellow-300">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Perks of Connecting</h3>
              <ul className="space-y-2">
                {slide.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
                    <FaRegLightbulb className="text-yellow-300 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tagline */}
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-right">
              {slide.tagline}
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Custom Pagination */}
  <div className="swiper-pagination absolute bottom-4 sm:bottom-6 w-full flex justify-center z-20 gap-2"></div>
</section>



      {/* Top Stories */}
      <HomeResearchAndNewsSection />

      {/* Research */}
      <ResearchReportsSection />

      {/* Services Section */}
      <section className=" bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-200/50 to-purple-300/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-200/50 to-teal-300/50 rounded-full blur-3xl"></div>
        </div> */}

        <div className="mx-auto relative z-10">
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent"
          >
            💼 Our Premium Services
          </motion.h2> */}
          <main className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4 md:px-8 py-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-3xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-blue-700 mb-4">
                Our Financial Premium Services
              </h1>
              <p className="text-xl font-bold text-gray-800">
                Tools For Every Financial Move
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`bg-blue-200 hover:bg-blue-300 text-blue-700 px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                    activeTab === tab.id ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {content[activeTab].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform bg-white"
                >
                  <Link href={item.link} passHref>
                    <div className="p-6 space-y-4">
                      {/* Icon */}
                      <div className="p-3 rounded-xl bg-blue-100 flex-shrink-0">
                        {item.icon && (
                          <item.icon className="w-8 h-8 text-blue-700" />
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800">
                        {item.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-600">
                        {item.description}
                      </p>

                      {/* Learn More Button */}
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors duration-300">
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
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* Why Fiscal Forum */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-indigo-200/40 to-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-cyan-200/40 to-blue-300/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div> */}

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
          >
            ✨ Why Choose Fiscal Forum?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xl text-gray-700 max-w-4xl mx-auto mb-16 leading-relaxed"
          ></motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-3xl shadow-xl border border-indigo-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-indigo-700 mb-4 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section className="py-24 bg-gradient-to-br from-white via-purple-50 to-indigo-50 relative">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            🤝 Work With Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div
                  className={`bg-gradient-to-br ${partner.gradient} p-1 rounded-3xl shadow-xl`}
                >
                  <div className="bg-white p-8 rounded-3xl hover:bg-gradient-to-br hover:from-white hover:to-purple-50 transition-all duration-300">
                    <div
                      className={`w-20 h-20 bg-gradient-to-r ${partner.gradient} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                    >
                      <partner.icon className="text-white text-3xl" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-purple-600 transition-colors">
                      {partner.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {partner.desc}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-6 bg-gradient-to-r ${partner.gradient} text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100`}
                    >
                      Join Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-300/30 rounded-full blur-3xl"></div>
        </div> */}

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-16 bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent"
          >
            💬 What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative"
              >
                <div
                  className={`bg-gradient-to-br ${testimonial.gradient} p-1 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="bg-white p-8 rounded-3xl text-left hover:bg-gradient-to-br hover:from-white hover:to-blue-50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <FaQuoteLeft className="text-white text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, index) => (
                            <FaStar
                              key={index}
                              className="text-yellow-400 text-sm"
                            />
                          ))}
                        </div>
                        <h5 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {testimonial.name}
                        </h5>
                        <p className="text-sm text-gray-500 font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed text-lg group-hover:text-gray-800 transition-colors">
                      {testimonial.text}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-sm text-green-600 font-medium">
                        Verified Customer
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations Section */}
      <section className="py-20 bg-gradient-to-r from-white via-indigo-50 to-purple-50 overflow-hidden relative">
        {/* Background gradient blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex animate-scroll"
            style={{
              animation: "scroll 10s linear infinite",
            }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 w-28 h-20 flex items-center justify-center mr-12"
              >
                <Image
                  src={logo}
                  alt={`Partner ${i}`}
                  width={110}
                  height={80}
                  className="object-cover opacity-100 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Keyframes for smooth infinite scroll */}
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white text-center relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div> */}

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaHeart className="text-white text-2xl animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                📧 Stay Connected With Us
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Subscribe to our newsletter for exclusive financial tips, market
                insights, and special offers tailored just for you.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <div className="relative flex-1 w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-4 rounded-2xl text-gray-800 bg-white/95 backdrop-blur-sm border-0 shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl -z-10 blur-xl"></div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
              >
                Subscribe Now
                <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-6 text-white/60"
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span className="text-sm">No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLock className="text-blue-400" />
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGem className="text-purple-400" />
                <span className="text-sm">Premium Content</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-indigo-900 text-white text-center relative overflow-hidden">
        {/* <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        </div> */}

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Ready to Transform Your Financial Future?
            </h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Fiscal Forum for
              their financial needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              Get Started Today
              <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
