"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// import "swiper/css";
// import "swiper/css/pagination";
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
  FaLaptopCode,
  FaGlobe,
  FaHandsHelping,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart3, BookOpen, Shield, TrendingUp, Wallet } from "lucide-react";
import ResearchReportsSection from "./ResearchReportsSection";
import Head from "next/head";

import { useUser } from "@clerk/nextjs";
import { UsersDetail } from "../../provider";
import HomeNewsAndResearchSection from "./HomeResearchAndNewsSection";
import FathomSlider from "./FathomSlider";
import FiscalForumCity from "./FiscalForumCity";


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
  "/lic.png",
  "/dhan.png",
  "/fyers.png",
  // "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  // "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/lic.png",
  "/dhan.png",
  "/fyers.png",
  // "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  // "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/lic.png",
  "/dhan.png",
  "/fyers.png",
  // "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  // "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/alice-blue.png",
  "/insurance-dekho.png",
  "/lic.png",
  // "/square-insurance.png",
  "/angel-one.png",
  "/choice.png",
  // "/motilal-oswal.png",
  "/Nj-wealth.png",
  "/prudent.png",
  "/upstox.png",
  "/nuvama.png",
  "/dhan.png",
  "/fyers.png",
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

// const securityFeatures = [
//   {
//     title: "Bank-Grade Security",
//     icon: FaShieldAlt,
//     desc: "256-bit SSL encryption and multi-factor authentication to keep your financial data completely secure.",
//   },
//   {
//     title: "Real-Time Monitoring",
//     icon: FaChartLine,
//     desc: "24/7 fraud detection and real-time transaction monitoring for your peace of mind.",
//   },
//   {
//     title: "Insured Deposits",
//     icon: FaUniversity,
//     desc: "All deposits are insured up to ₹5 lakhs by DICGC, ensuring complete protection of your funds.",
//   },
// ];

export default function HomeDesktop() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    // This runs only on the client
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize(); // Check on first load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

  const [userDetail, setUserDetail] = useState<UsersDetail | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchUser = async () => {
      try {
        const userEmail = user.emailAddresses[0]?.emailAddress;
        if (!userEmail) throw new Error("Logged-in user email not found");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users?email=${encodeURIComponent(
            userEmail
          )}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            console.log("User not found, you may need to create it first");
            return;
          }
          throw new Error(`Failed to fetch user: ${res.statusText}`);
        }

        const data: UsersDetail = await res.json();
        setUserDetail(data);
        // console.log("Fetched user:", data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [isLoaded, user]);

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>
          Fiscal Forum | Financial Insights, Research & Premium Services
        </title>
        <meta
          name="description"
          content="Fiscal Forum offers financial research, premium services, and expert insights. Explore tools, reports, and a trusted ecosystem to grow your financial journey."
        />
        <meta
          name="keywords"
          content="Fiscal Forum, financial services, research reports, investment tools, finance insights, premium financial services"
        />
        <meta name="author" content="Fiscal Forum" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.fiscalforum.in/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Fiscal Forum | Financial Insights, Research & Premium Services"
        />
        <meta
          property="og:description"
          content="Explore financial research, premium services, and tools designed for every financial move at Fiscal Forum."
        />
        <meta property="og:url" content="https://www.fiscalforum.in/" />
        <meta property="og:site_name" content="Fiscal Forum" />
        <meta property="og:image" content="https://www.fiscalforum.in/cover.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fiscal Forum | Financial Insights, Research & Premium Services"
        />
        <meta
          name="twitter:description"
          content="Financial tools, premium services, and expert research from Fiscal Forum."
        />
        <meta name="twitter:image" content="https://www.fiscalforum.in/cover.jpg" />
        <meta name="twitter:site" content="@fiscalforum" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fiscal Forum",
              url: "https://www.fiscalforum.in",
              logo: "https://www.fiscalforum.in/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/fiscal-forum",
                "https://twitter.com/fiscalforum",
              ],
            }),
          }}
        />
      </Head>

      <div className="text-gray-800 font-sans min-h-screen overflow-x-hidden w-full">
        <FathomSlider />
        <FiscalForumCity />

        {/* Enhanced Services Section */}
        <section className="py-16 bg-[#F4FBF7] border-b border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-4xl mx-auto flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-[#1FA463]/10 border border-black rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <FaCoins className="text-black text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
                Our Financial Premium Services
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-2">
                Tools For Every Financial Move
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-3 mb-10 border-b border-black pb-4"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border border-black rounded-xl transition-all ${activeTab === tab.id
                    ? "bg-yellow-100 text-black shadow-sm translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black hover:bg-emerald-50 shadow-sm"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {content[activeTab].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-yellow-50 border border-black rounded-2xl p-6 shadow-md  hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col h-full justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-emerald-50 border border-black rounded-xl flex items-center justify-center">
                      {item.icon && (
                        <item.icon className="w-6 h-6 text-[#1FA463]" />
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-black leading-snug">
                      {item.title}
                    </h4>

                    {/* Description */}
                    {!isSmallScreen && (
                      <p className="text-xs sm:text-sm leading-relaxed text-gray-500 font-semibold">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Learn More Button */}
                  <div className="mt-6">
                    <Link href={item.link} className="block w-full">
                      <button className="w-full bg-[#1FA463] text-white border border-black py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-sm hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 transition-all flex items-center justify-center gap-1.5">
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="w-4 h-4"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <HomeNewsAndResearchSection />

        {/* Enhanced Why Fiscal Forum Section */}
        <section className="py-16 bg-white border-b border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-[#1FA463]/10 border border-black rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <FaAward className="text-black text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
                Why Choose Fiscal Forum?
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-2 max-w-lg mx-auto">
                Experience the difference with our comprehensive financial ecosystem designed for your success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-black rounded-2xl p-6 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col h-full text-left"
                >
                  <div className="w-12 h-12 bg-emerald-50 border border-black rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="text-[#1FA463] text-xl" />
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">
                    {feature.title}
                  </h4>
                  {!isSmallScreen && (
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-500 font-semibold">
                      {feature.desc}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Work With Us Section */}
        <section className="py-16 bg-[#F4FBF7] border-b border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-12 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-[#1FA463]/10 border border-black rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <FaHandshake className="text-black text-2xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
                Work With Us
              </h2>
              <p className="text-sm font-semibold text-gray-500 mt-2 max-w-lg mx-auto">
                Join our growing network of partners and unlock new opportunities together
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-black rounded-2xl p-6 shadow-md  hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col justify-between h-full text-left"
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-emerald-50 border border-black rounded-xl flex items-center justify-center">
                      <partner.icon className="text-[#1FA463] text-xl" />
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-black leading-snug">
                      {partner.title}
                    </h4>

                    {/* Desc */}
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold">
                      {partner.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={partner.path}
                      className="block w-full text-center py-2.5 bg-[#1FA463] text-white border border-black font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-sm transition-all"
                    >
                      Join Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* Enhanced Affiliations Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight mb-8">
              Our Trusted Affiliations
            </h2>

            <div className="relative overflow-hidden border-t-2 border-b border-black py-4 bg-gray-50/50">
              <div
                className="flex animate-scroll"
                style={{
                  animation: "scroll 20s linear infinite",
                }}
              >
                {[...logos, ...logos].map((logo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-28 h-16 flex items-center justify-center mr-12 bg-white border border-gray-100 rounded-lg p-2 shadow-sm"
                  >
                    <Image
                      src={logo}
                      alt={`Partner ${i}`}
                      width={90}
                      height={60}
                      className="object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
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
    </>
  );
}
