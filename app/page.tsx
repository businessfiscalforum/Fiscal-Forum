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
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import HomeResearchAndNewsSection from "./(routes)/components/HomeResearchAndNewsSection";
import { useState } from "react";
import { BarChart3, BookOpen, Shield, TrendingUp, Wallet } from "lucide-react";
import ResearchReportsSection from "./(routes)/components/ResearchReportsSection";

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
  }
];

const logos = [
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/navuma.png",
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/navuma.png",
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/navuma.png",
  "/alice-blue.png",
  "/angel-one.png",
  "/choice.png",
  "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/navuma.png",
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
        {/* Swiper will control background image and content */}
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
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                {/* <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                /> */}
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}/80`}
                ></div>
              </div>

              {/* Content */}
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
                      <FaRocket className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper Pagination is now styled */}
        <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
      </section>

      {/* Top Stories */}
      <HomeResearchAndNewsSection/>

      {/* Research */ }
      <ResearchReportsSection/>

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
                  <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>

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
          >

          </motion.p>

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
          className="object-cover opacity-70 hover:opacity-100 transition-opacity"
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
