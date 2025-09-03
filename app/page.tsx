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
  FaLock,
  FaRocket,
  FaAward,
  FaCheckCircle,
  FaHeadset,
  FaRegLightbulb,
  FaShieldAlt,
  FaChartLine,
  FaUniversity,
  FaLaptopCode,
  FaGlobe,
  FaHandsHelping,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import HomeResearchAndNewsSection from "./(routes)/_components/HomeResearchAndNewsSection";
import { useEffect, useState } from "react";
import { BarChart3, BookOpen, Shield, TrendingUp, Wallet } from "lucide-react";
import ResearchReportsSection from "./(routes)/_components/ResearchReportsSection";

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
      { value: "50+", label: "Credit Card Variants" },
      { value: "₹10K", label: "Rewards Distributed" },
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
    image: "/bg.jpg",
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
      { value: "₹10K", label: "Deposits Managed" },
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
      { value: "₹50K", label: "Loans Disbursed" },
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
    path: "/services/govt-bond-&-fd",
    stats: [
      { value: "₹10K", label: "Deposits Managed" },
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

const securityFeatures = [
  {
    title: "Bank-Grade Security",
    icon: FaShieldAlt,
    desc: "256-bit SSL encryption and multi-factor authentication to keep your financial data completely secure.",
  },
  {
    title: "Real-Time Monitoring",
    icon: FaChartLine,
    desc: "24/7 fraud detection and real-time transaction monitoring for your peace of mind.",
  },
  {
    title: "Insured Deposits",
    icon: FaUniversity,
    desc: "All deposits are insured up to ₹5 lakhs by DICGC, ensuring complete protection of your funds.",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
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
        setMessage({
          text: data.message || "Successfully subscribed!",
          type: "success",
        });
        setEmail("");
      } else {
        setMessage({
          text: data.error || "Subscription failed",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Subscription failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
        link: "/services/govt-bonds-&-fd",
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
      {
        title: "Savings Account",
        icon: Wallet,
        description:
          "Open a savings account that does more than just hold money — let your everyday savings gently grow, giving you freedom to plan, spend wisely, and handle life's surprises with a sense of security and confidence in the future.",
        link: "/services/saving-account",
      },
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

  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return (
    <div
      className="text-gray-800 font-sans min-h-screen"
      style={{
        fontFamily:
          "'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif",
      }}
    >
      {/* Hero Section with Enhanced Carousel */}
      <section className="relative w-full h-auto lg:h-screen overflow-y-auto lg:overflow-hidden">
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
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-green-900/60 to-teal-900/40"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col lg:flex-row px-6 sm:px-8 md:px-10 py-20 sm:py-20 md:py-20">
                <div className="w-full lg:w-1/2 flex items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-white w-full max-w-2xl"
                  >
                    <p
                      className="uppercase tracking-wider text-emerald-300 font-semibold mb-3 text-sm sm:text-base bg-emerald-800/30 px-4 py-2 rounded-full inline-block backdrop-blur-sm"
                      style={{ textAlign: "left" }}
                    >
                      {slide.subtitle}
                    </p>
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent"
                      style={{ textAlign: "left" }}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className="text-sm sm:text-base md:text-lg opacity-90 mb-6 leading-relaxed max-w-xl bg-black/20 p-4 rounded-xl backdrop-blur-sm"
                      style={{ textAlign: "left" }}
                    >
                      {slide.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {slide.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-sm sm:text-base bg-emerald-800/30 p-3 rounded-lg backdrop-blur-sm"
                          style={{ textAlign: "left" }}
                        >
                          <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={slide.path}>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold shadow-2xl transition-all text-sm sm:text-base"
                        >
                          {slide.cta} <FaRocket className="inline ml-2" />
                        </motion.button>
                      </Link>
                      <Link href="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 border-2 border-emerald-400 text-emerald-100 rounded-xl font-bold hover:bg-emerald-400 hover:text-emerald-900 transition-all text-sm sm:text-base backdrop-blur-sm"
                        >
                          Talk to Expert
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
                <div
                  className="w-full lg:w-1/2 flex flex-col justify-center mt-8 lg:mt-0 lg:pl-10 text-white gap-6"
                  style={{ textAlign: "left" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl border border-white/20"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-4 text-emerald-200">
                      Key Statistics
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {slide.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                            {stat.value}
                          </div>
                          <div className="text-xs sm:text-sm opacity-80">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-2xl border border-white/20"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-4 text-emerald-200">
                      Perks of Connecting
                    </h3>
                    <ul className="space-y-2">
                      {slide.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm sm:text-base"
                        >
                          <FaRegLightbulb className="text-emerald-300 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight text-right bg-gradient-to-r from-emerald-200 to-teal-300 bg-clip-text text-transparent"
                  >
                    {slide.tagline}
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination absolute bottom-4 sm:bottom-6 w-full flex justify-center z-20 gap-2"></div>
      </section>

      {/* Referral section */}
      {user && (
        <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-200/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-8 p-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent"
            >
              🎉 Referral Program
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Invite your friends to join Fiscal Forum and earn exclusive rewards. 
              Share your unique referral code and start building your financial network today!
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Earn Credits</h3>
                <p className="text-gray-600">
                  Get 10 referral credits for each successful signup. Use credits for premium features and exclusive content.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHandshake className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Build Network</h3>
                <p className="text-gray-600">
                  Connect with like-minded financial enthusiasts and grow your professional network in the finance industry.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaAward className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Exclusive Rewards</h3>
                <p className="text-gray-600">
                  Unlock special benefits, early access to new features, and VIP treatment as you earn more referral credits.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Start Referring?</h3>
              <p className="text-indigo-100 mb-6">
                Join thousands of users who are already earning rewards through our referral program.
              </p>
              <Link
                href="/referrals"
                className="inline-flex items-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaRocket className="mr-2" />
                View My Referrals
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <HomeResearchAndNewsSection />
      <ResearchReportsSection />

      {/* Enhanced Services Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto relative z-10">
          <main className="px-4 md:px-8 py-20">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-4xl mx-auto"
            >
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl mb-8 shadow-2xl">
                <FaCoins className="text-white text-3xl" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
                Our Financial Premium Services
              </h1>
              <p className="text-2xl font-semibold text-gray-700 bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                Tools For Every Financial Move
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl"
                      : "bg-white/80 text-emerald-700 hover:bg-white shadow-lg backdrop-blur-sm border border-emerald-200"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content[activeTab].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="group relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 transform bg-white/80 backdrop-blur-sm border border-emerald-100 hover:border-emerald-300 flex flex-col h-full"
                >
                  <Link href={item.link} passHref>
                    <div className="p-8 space-y-6 flex flex-col h-full">
                      {/* Icon - Centered, No Background */}
                      <div className="flex flex-col items-center justify-center space-y-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                          {item.icon && (
                            <item.icon className="w-8 h-8 text-white" />
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 text-center leading-tight">
                          {item.title}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-600 text-center flex-grow">
                        {item.description}
                      </p>

                      {/* Learn More Button */}
                      <div className="mt-auto">
                        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group-hover:shadow-2xl transform group-hover:scale-105">
                          Learn More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* Enhanced Why Fiscal Forum Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
        {/* Enhanced background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-200/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-200/10 to-cyan-300/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl mb-8 shadow-2xl">
              <FaAward className="text-white text-4xl" />
            </div>
            <h2 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent pb-10">
              Why Choose Fiscal Forum?
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed bg-white/60 p-6 rounded-2xl backdrop-blur-sm">
              Experience the difference with our comprehensive financial
              ecosystem designed for your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-500/25 transition-all duration-500 h-full">
                  <div className="relative mb-8">
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div> */}
                    <div className="relative w-20 h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-6">
                      <feature.icon className="text-emerald-700 group-hover:text-white text-3xl transition-colors duration-500" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-emerald-700 mb-6 group-hover:text-teal-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors text-lg">
                    {feature.desc}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute bottom-6 right-6 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Enhanced Features */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Advanced Financial Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 border border-emerald-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                    <service.icon className="text-white text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-700 mb-4">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Enhanced Security & Trust Section */}
      {/* <section className="py-20 bg-gradient-to-br from-emerald-100 to-teal-100 relative">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-600 to-teal-700 p-6 rounded-3xl mb-8 shadow-2xl">
              <FaShieldAlt className="text-white text-4xl" />
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              🛡️ Your Security is Our Priority
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((security, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <security.icon className="text-white text-2xl" />
                </div>
                <h4 className="text-xl font-bold text-emerald-700 mb-4">
                  {security.title}
                </h4>
                <p className="text-gray-600">{security.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Enhanced Work With Us Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl mb-8 shadow-2xl">
              <FaHandshake className="text-white text-4xl" />
            </div>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Work With Us
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto bg-white/60 p-6 rounded-2xl backdrop-blur-sm">
              Join our growing network of partners and unlock new opportunities
              together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
            {partners.map((partner, i) => (
              <Link
                href={partner.path}
                key={i}
                className="group relative h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="relative w-full h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div
                    className={`relative bg-gradient-to-br ${partner.gradient} p-1 rounded-3xl shadow-2xl h-full`}
                  >
                    {/* flex + full height for equal alignment */}
                    <div className="bg-white p-10 rounded-3xl hover:bg-gradient-to-br hover:from-white hover:to-emerald-50 transition-all duration-500 h-full flex flex-col">
                      {/* Icon */}
                      <div className="relative mb-8">
                        <div
                          className={`relative w-24 h-24 bg-gradient-to-r ${partner.gradient} rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}
                        >
                          <partner.icon className="text-white text-4xl" />
                        </div>
                      </div>

                      {/* Title + Desc (flex-grow keeps button aligned at bottom) */}
                      <div className="flex-grow">
                        <h4 className="text-2xl font-bold mb-6 text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {partner.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors text-lg">
                          {partner.desc}
                        </p>
                      </div>

                      {/* Button pinned at bottom */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`mt-8 bg-gradient-to-r ${partner.gradient} hover:${partner.hoverGradient} text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0`}
                      >
                        Join Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      {/* <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-200/30 to-emerald-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl mb-10 shadow-2xl">
              <FaQuoteLeft className="text-white text-4xl" />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent pb-10">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto bg-white/60 p-6 rounded-2xl backdrop-blur-sm">
              Real stories from real people who trust us with their financial
              journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  className={`relative bg-gradient-to-br ${testimonial.gradient} p-1 rounded-3xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500`}
                >
                  <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl text-left hover:bg-gradient-to-br hover:from-white hover:to-emerald-50 transition-all duration-500">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div
                          className={`relative w-20 h-20 bg-gradient-to-r ${testimonial.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}
                        >
                          <FaQuoteLeft className="text-white text-2xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, index) => (
                            <FaStar
                              key={index}
                              className="text-amber-400 text-lg"
                            />
                          ))}
                        </div>
                        <h5 className="font-bold text-2xl text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {testimonial.name}
                        </h5>
                        <p className="text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full inline-block mt-2">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic leading-relaxed text-lg group-hover:text-gray-800 transition-colors mb-6">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <FaCheckCircle className="text-emerald-500 text-lg" />
                      <span className="text-emerald-600 font-semibold bg-emerald-50 px-4 py-2 rounded-full">
                        Verified Customer
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Enhanced Affiliations Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative ">
        {/* Background gradient blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-green-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-center">
            Our Trusted Affiliations
          </h2>
        </motion.div>

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
      {/* <section className="py-28 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <FaHeart className="text-white text-2xl animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                📧 Stay Connected With Us
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                Subscribe to our newsletter for exclusive financial tips, market
                insights, and special offers tailored just for you.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 border border-emerald-300 rounded-full bg-white text-base text-gray-800 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all duration-300 shadow-lg"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-base uppercase tracking-wide rounded-full transition-all shadow-xl hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <div
                className={`mt-4 text-sm px-6 py-3 rounded-full max-w-xs mx-auto text-center font-medium ${
                  message.type === "success"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm"
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" />
                <span>No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLock className="text-emerald-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGem className="text-emerald-400" />
                <span>Exclusive Content</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="relative">
              <div className="relative w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <FaRocket className="text-white text-3xl" />
              </div>
            </div>

            <h3 className="text-5xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent leading-tight">
              Ready to Transform Your Financial Future?
            </h3>

            <p className="text-2xl text-white/90 max-w-4xl mx-auto bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20">
              Join thousands of satisfied customers who trust Fiscal Forum for
              their financial needs. Start your journey towards financial
              freedom today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-4 group text-xl"
              >
                Get Started Today
                <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-2xl" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-emerald-900 font-bold px-12 py-6 rounded-full transition-all duration-300 flex items-center gap-4 group text-xl backdrop-blur-sm"
              >
                Schedule a Call
                <FaHeadset className="group-hover:rotate-12 transition-transform text-2xl" />
              </motion.button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
              <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                <FaShieldAlt className="text-emerald-400 text-xl" />
                <span className="text-white/90 font-semibold">100% Secure</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                <FaAward className="text-emerald-400 text-xl" />
                <span className="text-white/90 font-semibold">
                  Award Winning
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                <FaUsers className="text-emerald-400 text-xl" />
                <span className="text-white/90 font-semibold">
                  50L+ Customers
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md">
                <FaHeadset className="text-emerald-400 text-xl" />
                <span className="text-white/90 font-semibold">
                  24/7 Support
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              <div className="text-center bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  ₹10,000 Cr+
                </div>
                <div className="text-white/80">Assets Managed</div>
              </div>
              <div className="text-center bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  99.8%
                </div>
                <div className="text-white/80">Uptime</div>
              </div>
              <div className="text-center bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  4.9★
                </div>
                <div className="text-white/80">Customer Rating</div>
              </div>
              <div className="text-center bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  15+
                </div>
                <div className="text-white/80">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #14b8a6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #0d9488);
        }

        /* Enhanced swiper pagination */
        .swiper-pagination-bullet {
          background: rgba(16, 185, 129, 0.5) !important;
          opacity: 1 !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          transition: all 0.3s ease !important;
        }

        .swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #10b981, #14b8a6) !important;
          transform: scale(1.2) !important;
          border-color: rgba(255, 255, 255, 0.8) !important;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.6) !important;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property:
            color, background-color, border-color, transform, opacity,
            box-shadow;
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced gradient animations */
        .gradient-animation {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
