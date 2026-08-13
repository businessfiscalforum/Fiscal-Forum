"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
import { useEffect, useState, useRef } from "react";
import { BarChart3, BookOpen, Shield, TrendingUp, Wallet, Coins, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import ResearchReportsSection from "./ResearchReportsSection";
import Head from "next/head";

import { useUser } from "@clerk/nextjs";
import { UsersDetail } from "../../provider";
import HomeNewsAndResearchSection from "./HomeResearchAndNewsSection";
import FathomSlider from "./FathomSlider";
import FiscalForumCity from "./FiscalForumCity";
import ScrollAnimationIntro from "./ScrollAnimationIntro";


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
    image: "/images/work-dev-partner.png",
    desc: "Join us in expanding financial services across the country.",
    gradient: "from-emerald-500 to-teal-600",
    hoverGradient: "from-emerald-600 to-teal-700",
    path: "/work-with-us/business-development-partnership",
  },
  {
    title: "Remisorship",
    icon: FaUsers,
    image: "/images/work-remisorship.png",
    desc: "Start referral by remisorship to get benefits.",
    gradient: "from-green-500 to-emerald-600",
    hoverGradient: "from-green-600 to-emerald-700",
    path: "/work-with-us/remisorship",
  },
  {
    title: "B2B Partner",
    icon: FaHandshake,
    image: "/images/work-b2b.png",
    desc: "Collaborate with us to deliver seamless financial integration.",
    gradient: "from-teal-500 to-cyan-600",
    hoverGradient: "from-teal-600 to-cyan-700",
    path: "/work-with-us/b2b-partnership",
  },
];

const homeSlides = [
  {
    title: "NSE SCREENER LIKE NEVER BEFORE",
    image: "/images/screener-preview.png",
    text: "Want to screen stocks but according to your criterias ?",
    link: "/reports#equity-screener",
  },
  {
    title: "ALL SECTORS HEATMAP AT ONE PLACE ...",
    image: "/images/heatmap-preview.png",
    text: "Want all sectors returns heatmap in one single interface ?",
    link: "/reports#sectoral-heatmap",
  },
  {
    title: "THEME BASED SECTORS ANALYSIS ...",
    image: "/images/theme-sectors-preview.png",
    text: "Want to analyse various theme based sectors in INDIA ?",
    link: "/reports#theme-based-sectors",
  },
  {
    title: "WHOLE SECTORAL ANALYSIS AT SINGLE PLACE",
    image: "/images/whole-sectoral-preview.jpg",
    text: "Want every sector analysis at one go ?",
    link: "/reports#sectoral-overview",
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
    image: "/images/why-market-updates.png",
  },
  {
    title: "Research Reports That Guide Your Next Move",
    image: "/images/why-research-reports.png",
  },
  {
    title: "Everything in One Place",
    image: "/images/why-one-place.png",
  },
  {
    title: "Trusted Partners & Dedicated Support",
    image: "/images/why-partners-support.png",
  },
  {
    title: "Exclusive Rewards & Cashback",
    image: "/images/why-rewards-cashback.png",
  },
  {
    title: "24X7 Call Support",
    image: "/images/why-call-support.png",
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
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNextSlide = () => {
    setDirection(1);
    setActiveSlideIndex((prev) => (prev + 1) % homeSlides.length);
    setIsAutoPlaying(false);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setActiveSlideIndex((prev) => (prev - 1 + homeSlides.length) % homeSlides.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > activeSlideIndex ? 1 : -1);
    setActiveSlideIndex(idx);
    setIsAutoPlaying(false);
  };

  const [activeRowIdx, setActiveRowIdx] = useState(0);
  const [allocations, setAllocations] = useState([
    { id: "equity", name: "EQUITY", value: 20, min: 10, max: 35, color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: TrendingUp, textColor: "text-emerald-700" },
    { id: "mutualFund", name: "MUTUAL FUND", value: 45, min: 30, max: 55, color: "text-blue-600 bg-blue-50 border-blue-200", icon: BarChart3, textColor: "text-blue-700" },
    { id: "fAndO", name: "F&O", value: 0, min: 0, max: 10, color: "text-rose-600 bg-rose-50 border-rose-200", icon: TrendingUp, textColor: "text-rose-700" },
    { id: "mtf", name: "MTF", value: 0, min: 0, max: 10, color: "text-amber-600 bg-amber-50 border-amber-200", icon: Wallet, textColor: "text-amber-700" },
    { id: "ipo", name: "IPO", value: 10, min: 5, max: 20, color: "text-purple-600 bg-purple-50 border-purple-200", icon: Rocket, textColor: "text-purple-700" },
    { id: "bonds", name: "BONDS", value: 20, min: 10, max: 25, color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: Shield, textColor: "text-yellow-700" },
    { id: "commodities", name: "COMMODITIES", value: 5, min: 2, max: 10, color: "text-teal-600 bg-teal-50 border-teal-200", icon: Coins, textColor: "text-teal-700" },
  ]);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      // Rotate active row index for highlighting
      setActiveRowIdx((prevIdx) => (prevIdx + 1) % 7);

      // Randomly change all allocations keeping sum at 100% and respecting bounds
      setAllocations((prev) => {
        let attempts = 0;
        while (attempts < 100) {
          const values = prev.map((c) => c.min);
          let currentSum = values.reduce((a, b) => a + b, 0);
          const targetSum = 100;
          let remaining = targetSum - currentSum;

          while (remaining > 0) {
            const eligibleIndices = [];
            for (let i = 0; i < prev.length; i++) {
              if (values[i] < prev[i].max) {
                eligibleIndices.push(i);
              }
            }
            if (eligibleIndices.length === 0) break;
            const randIdx = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
            values[randIdx] += 1;
            remaining -= 1;
          }

          // Ensure all values have moved (changed) from their previous values
          const allChanged = values.every((val, idx) => val !== prev[idx].value);
          if (allChanged || attempts > 80) {
            return prev.map((c, idx) => ({ ...c, value: values[idx] }));
          }
          attempts++;
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(mainInterval);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveSlideIndex((prev) => (prev + 1) % homeSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    const completed = sessionStorage.getItem("scrollAnimationCompleted");
    if (completed === "true") {
      setAnimationCompleted(true);
    }
  }, []);

  useEffect(() => {
    // This runs only on the client
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize(); // Check on first load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (animationCompleted) {
      const timer = setTimeout(() => {
        const element = document.getElementById("fiscal-forum-city");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animationCompleted]);
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
          "Own a part of India's leading companies and grow your wealth over time. Learn how stocks work, discover high-potential opportunities, and invest with confidence backed by research. Start your investing journey today.",
        link: "/services/stock-investment",
        image: "/images/service-stock.png",
      },
      {
        title: "Mutual Funds",
        icon: TrendingUp,
        description:
          "Let experts manage your investments while you focus on your goals. Explore professionally managed funds that help build wealth through diversified investing with any budget. Find the right fund for your financial future.",
        link: "/services/mutual-funds",
        image: "/images/service-mutual.png",
      },
      {
        title: "Insurance",
        icon: Shield,
        description:
          "Protect what matters most before life surprises you. Compare health, life, and vehicle insurance plans that safeguard your family and financial security. Choose protection that's made for your needs.",
        link: "/services/insurance",
        image: "/images/service-insurance.png",
      },
      {
        title: "FD & Government Bonds",
        icon: Wallet,
        description:
          "Earn stable returns while keeping your money secure. Discover Fixed Deposits and Government Bonds designed for predictable income and lower investment risk. Grow your savings with confidence.",
        link: "/services/govt-bonds-and-fd",
        image: "/images/service-bonds.png",
      },
    ],
    "banking-products": [
      {
        title: "Credit Card",
        icon: Wallet,
        description:
          "Enjoy life's moments with a credit card that matches your lifestyle. From everyday essentials to special treats, spend smartly, earn rewards, and manage your money with ease — all while knowing you have support whenever you need it.",
        link: "/services/credit-card",
        image: "/images/service-card.png",
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
        image: "/images/service-loans.png",
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
        <div className="relative w-full">
          <AnimatePresence mode="sync">
            {!animationCompleted ? (
              <motion.div
                key="intro"
                exit={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <ScrollAnimationIntro
                  onComplete={() => {
                    setAnimationCompleted(true);
                    sessionStorage.setItem("scrollAnimationCompleted", "true");
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="city"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full"
              >
                <FiscalForumCity />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Services Section */}
        <section className="py-16 bg-[#F4FBF7] border-b border-black">
          <div className="m. ax-w-7xl mx-auto px-4 md:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-4xl mx-auto flex flex-col items-center"
            >
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
              {content[activeTab].map((item, index) => {
                const total = content[activeTab].length;
                const isLeft = index < total / 2;
                const xOffset = isLeft ? -120 : 120;
                return (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    initial={{ opacity: 0, x: xOffset, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 14,
                      delay: index * 0.08,
                    }}
                    className="bg-white border border-black rounded-2xl p-6 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col h-full justify-between"
                  >
                    <div className="space-y-4">
                      {/* Title and Image Row */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-3 flex-1">
                          {/* Title */}
                          <h4 className="text-xl font-bold text-black leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        {/* Cropped illustration image */}
                        {(item as { image?: string }).image && (
                          <div className="flex-shrink-0 w-24 h-24 relative rounded-2xl overflow-hidden border border-black/10 shadow-sm">
                            <Image
                              src={(item as { image?: string }).image!}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {!isSmallScreen && (
                        <p className="text-xs sm:text-sm leading-relaxed text-black font-semibold">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-6">
                      <Link href={item.link} className="block w-full">
                        <button className="revolving-border-btn shadow-sm hover:-translate-y-0.5 transition-all">
                          <span className="revolving-border-btn-content py-2.5 text-xs sm:text-sm tracking-wider gap-1.5">
                            EXPLORE HERE
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
                          </span>
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
        {/* Screener and Heatmap Grid Section */}
        <section className="py-16 bg-[#F4FBF7] border-b border-black overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-8">
              Financial Services Like NEVER Before
            </h2>
            <div className="relative min-h-[320px]">
              
              {/* Prev Button */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-[-20px] md:left-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-black bg-white hover:bg-gray-50 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>

              {/* Active Card */}
              <motion.div
                key={`slide-${activeSlideIndex}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    handleNextSlide();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrevSlide();
                  }
                }}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-black rounded-3xl p-6 md:p-8 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col justify-between text-left cursor-grab active:cursor-grabbing select-none"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight mb-6">
                    {homeSlides[activeSlideIndex].title}
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-full sm:w-[380px] md:w-[480px] shrink-0 relative aspect-[16/10] rounded-2xl overflow-hidden border border-black/10 shadow-sm bg-white">
                      <Image
                        src={homeSlides[activeSlideIndex].image}
                        alt={homeSlides[activeSlideIndex].title}
                        fill
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-4">
                      <p className="text-lg md:text-xl font-bold text-gray-800 leading-snug">
                        {homeSlides[activeSlideIndex].text}
                      </p>
                      <div>
                        <Link href={homeSlides[activeSlideIndex].link}>
                          <button className="px-6 py-2.5 bg-yellow-400 text-black border border-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-yellow-500 hover:-translate-y-0.5 transition-all cursor-pointer">
                            CLICK HERE
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNextSlide}
                className="absolute right-[-20px] md:right-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-black bg-white hover:bg-gray-50 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>

            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {homeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeSlideIndex === idx
                      ? "bg-[#1FA463] w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <HomeNewsAndResearchSection />

        {/* Enhanced Why Fiscal Forum Section */}
        <section className="py-16 bg-white border-b border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
            {/* One Profile. One Portfolio Section */}
            <div className="w-full max-w-5xl bg-white border border-black rounded-3xl p-6 md:p-8 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 text-left">
              {/* Table side */}
              <div className="w-full md:w-[380px] shrink-0 bg-[#fcfdfd] border border-black/10 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <span>ASSET CLASS</span>
                  <span>ALLOCATION</span>
                </div>
                <div className="space-y-2">
                  {allocations.map((row, idx) => {
                    const IconComponent = row.icon;
                    const isActive = idx === activeRowIdx;
                    return (
                      <div
                        key={row.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "bg-gray-50/80 border-black/20 shadow-sm scale-[1.01]"
                            : "bg-white border-black/5 hover:border-black/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Round Icon */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${row.color} shrink-0`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          {/* Name */}
                          <span className="font-bold text-xs sm:text-sm text-black tracking-tight">
                            {row.name}
                          </span>
                        </div>
                        
                        {/* Percentage Allocation */}
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base sm:text-lg text-black tracking-tight min-w-[45px] text-right">
                            {row.value}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Text and Button side */}
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black uppercase tracking-tight leading-tight">
                    One profile. One portfolio.
                    <br />
                    Designed just for you !
                  </h3>
                  <p className="text-base md:text-lg font-semibold text-gray-800 mt-4 leading-snug">
                    Want your personalised portfolio mix ?
                  </p>
                </div>
                <div>
                  <Link href="/services/stock-investment#portfolio-studio">
                    <button className="px-6 py-3 bg-yellow-400 text-black border border-black font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-sm hover:bg-yellow-500 hover:-translate-y-0.5 transition-all cursor-pointer">
                      Click Here
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Women's Section & IPO WORLD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-16 text-left">
              {/* Women's Section Card */}
              <div className="bg-white border border-black rounded-2xl p-6 md:p-8 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight flex-1">
                      Womens Section
                    </h3>
                    <div className="flex-shrink-0 w-24 h-24 relative rounded-2xl overflow-hidden border border-black/10 shadow-sm">
                      <Image
                        src="/images/service-women.png"
                        alt="Womens Section"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    {"When a woman understands money, the whole family's future becomes stronger."}
                    <br />
                    {"Start your financial learning journey with easy, bite-sized insights..."}
                  </p>
                </div>
                <div className="pt-6">
                  <Link href="/for-women">
                    <button className="px-6 py-2.5 bg-white text-[#E11D48] border border-[#E11D48] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-sm hover:bg-rose-50 hover:-translate-y-0.5 transition-all cursor-pointer">
                      Womens Section
                    </button>
                  </Link>
                </div>
              </div>

              {/* IPO World Card */}
              <div className="bg-white border border-black rounded-2xl p-6 md:p-8 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight flex-1">
                      IPO WORLD
                    </h3>
                    <div className="flex-shrink-0 w-24 h-24 relative rounded-2xl overflow-hidden border border-black/10 shadow-sm">
                      <Image
                        src="/images/service-ipo.png"
                        alt="IPO WORLD"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                    {"Every successful company was once a new opportunity."}
                    <br />
                    {"Discover IPOs explained simply before you decide to invest..."}
                  </p>
                </div>
                <div className="pt-6">
                  <Link href="/news?tab=ipo-scoop">
                    <button className="px-6 py-2.5 bg-white text-blue-600 border border-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-sm hover:bg-blue-50 hover:-translate-y-0.5 transition-all cursor-pointer">
                      Explore IPO Universe
                    </button>
                  </Link>
                </div>
              </div>
            </div>

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
              {features.map((feature, index) => {
                const total = features.length;
                const isLeft = index < total / 2;
                const xOffset = isLeft ? -120 : 120;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: xOffset, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 14,
                      delay: index * 0.08,
                    }}
                    className="bg-white border border-black rounded-2xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col h-full text-left overflow-hidden"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-black/10">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <h4 className="text-base sm:text-lg font-bold text-black leading-snug">
                        {feature.title}
                      </h4>
                    </div>
                  </motion.div>
                )
              })}
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
                  className="bg-white border border-black rounded-2xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col justify-between h-full text-left overflow-hidden"
                >
                  <div className="space-y-0">
                    {/* Header Image with Overlapping Icon */}
                    <div className="relative w-full">
                      <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-black/10">
                        <Image
                          src={partner.image}
                          alt={partner.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Icon */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-white border border-black rounded-full flex items-center justify-center shadow-md z-10">
                        <partner.icon className="text-[#1FA463] text-2xl" />
                      </div>
                    </div>

                    {/* Text content with offset padding for overlapping icon */}
                    <div className="pt-10 px-6 pb-4 space-y-3">
                      {/* Title */}
                      <h4 className="text-lg font-bold text-black leading-snug">
                        {partner.title}
                      </h4>

                      {/* Desc */}
                      <p className="text-xs sm:text-sm text-gray-500 font-semibold">
                        {partner.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
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
          @keyframes border-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .revolving-border-btn {
            position: relative;
            overflow: hidden;
            padding: 3px;
            background: #000;
            border-radius: 12px;
            display: block;
            width: 100%;
            border: none;
            cursor: pointer;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .revolving-border-btn::before {
            content: '';
            position: absolute;
            inset: -1000%;
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              #fff 8%,
              #fff 22%,
              transparent 30%,
              transparent 100%
            );
            animation: border-spin 4s linear infinite;
          }

          .revolving-border-btn-content {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #000;
            color: #fff;
            border-radius: 9px;
            font-weight: 700;
            text-transform: uppercase;
            transition: background-color 0.3s ease;
          }

          .revolving-border-btn:hover {
            box-shadow: 0 0 16px rgba(255, 255, 255, 0.35);
          }

          .revolving-border-btn:hover .revolving-border-btn-content {
            background-color: #1c1c1e;
          }

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
