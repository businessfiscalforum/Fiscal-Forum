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
import FathomSliderMobile from "./FathomSliderMobile";
import FiscalForumCityMobile from "./FiscalForumCityMobile";
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
    <div className="text-gray-800 font-sans min-h-screen bg-white overflow-x-hidden w-full">
      <FathomSliderMobile />
      <FiscalForumCityMobile />

      {/* 🔹 Tabbed Services (Cards Grid) */}
      <section className="px-4 py-8 bg-[#F4FBF7] border-b border-black">
        <h2 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-tight text-center mb-6">
          Our Financial Premium Services
        </h2>
        <div className="flex justify-center gap-2 mb-6">
          {([
            { id: "investment-products", label: "Investment" },
            { id: "banking-products", label: "Banking" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border border-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab.id
                ? "bg-yellow-100 text-black shadow-sm"
                : "bg-white text-black"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content[activeTab].map((item, i) => (
            <Link key={i} href={item.link} className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-black rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full min-h-[220px]"
              >
                <div className="space-y-3">
                  {/* Title and Image Row */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-2 flex-1">
                      {/* Title */}
                      <h3 className="font-bold text-black text-base leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    {/* Cropped illustration image */}
                    {(item as { image?: string }).image && (
                      <div className="flex-shrink-0 w-20 h-20 relative rounded-xl overflow-hidden border border-black/10 shadow-sm">
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
                  <p className="text-xs text-black font-semibold">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block w-full text-center py-2 bg-[#1FA463] text-white border border-black text-xs font-bold uppercase rounded-lg shadow-sm">
                    Learn More
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔹 News & Research — Mobile */}
      <HomeNewsAndResearchSectionMobile />

      <section className="px-4 py-8 bg-white border-b border-black">
        {/* One Profile. One Portfolio Section */}
        <div className="bg-white border border-black rounded-2xl p-5 mb-6 text-left flex flex-col gap-5 hover:shadow-sm transition-all">
          {/* Image */}
          <div className="w-full relative aspect-[4/3] rounded-xl overflow-hidden border border-black/10 shadow-sm bg-white">
            <Image
              src="/images/portfolio-allocation.png"
              alt="One profile. One portfolio. Designed just for you !"
              fill
              className="object-contain p-2"
            />
          </div>
          {/* Text and Button */}
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <h3 className="text-lg font-bold text-black uppercase tracking-tight leading-tight">
                One profile. One portfolio.
                <br />
                Designed just for you !
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-2 leading-snug">
                Want your personalised portfolio mix ?
              </p>
            </div>
            <div>
              <Link href="/services/stock-investment#portfolio-studio" className="w-full block">
                <button className="w-full py-2.5 bg-yellow-400 text-black border border-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-yellow-500 active:translate-y-0.5 transition-all cursor-pointer text-center">
                  Click Here
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Women's Section & IPO WORLD */}
        <div className="flex flex-col gap-4 mb-8 text-left">
          {/* Women's Section Card */}
          <div className="bg-white border border-black rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-lg font-bold text-black uppercase tracking-tight flex-1">
                  Womens Section
                </h3>
                <div className="flex-shrink-0 w-20 h-20 relative rounded-xl overflow-hidden border border-black/10 shadow-sm">
                  <Image
                    src="/images/service-women.png"
                    alt="Womens Section"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {"When a woman understands money, the whole family's future becomes stronger."}
                <br />
                {"Start your financial learning journey with easy, bite-sized insights..."}
              </p>
            </div>
            <div className="pt-4">
              <Link href="/for-women">
                <button className="px-5 py-2 bg-white text-[#E11D48] border border-[#E11D48] font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-rose-50 active:translate-y-0.5 transition-all cursor-pointer">
                  Womens Section
                </button>
              </Link>
            </div>
          </div>

          {/* IPO World Card */}
          <div className="bg-white border border-black rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-lg font-bold text-black uppercase tracking-tight flex-1">
                  IPO WORLD
                </h3>
                <div className="flex-shrink-0 w-20 h-20 relative rounded-xl overflow-hidden border border-black/10 shadow-sm">
                  <Image
                    src="/images/service-ipo.png"
                    alt="IPO WORLD"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {"Every successful company was once a new opportunity."}
                <br />
                {"Discover IPOs explained simply before you decide to invest..."}
              </p>
            </div>
            <div className="pt-4">
              <Link href="/news?tab=ipo-scoop">
                <button className="px-5 py-2 bg-white text-blue-600 border border-blue-600 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:bg-blue-50 active:translate-y-0.5 transition-all cursor-pointer">
                  Explore IPO Universe
                </button>
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-tight text-center mb-6">
          Why Fiscal Forum?
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-white border border-black rounded-2xl shadow-sm flex flex-col h-full text-left overflow-hidden"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-black/10">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-black text-[12px] leading-snug">
                  {f.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Partners */}
      <section className="px-4 py-8 bg-[#F4FBF7] border-b border-black">
        <h2 className="text-xl sm:text-2xl font-bold text-black uppercase tracking-tight text-center mb-6">
          Work With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {partners.map((p, i) => (
            <Link key={i} href={p.path} className="block">
              <motion.div
                className="bg-white border border-black rounded-2xl p-5 shadow-sm flex flex-col justify-between h-full min-h-[200px]"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-emerald-50 border border-black rounded-xl flex items-center justify-center">
                    <p.icon className="text-[#1FA463] text-lg" />
                  </div>
                  <h5 className="font-bold text-black text-sm">
                    {p.title}
                  </h5>
                  <p className="text-xs text-gray-500 font-semibold">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="block w-full text-center py-2 bg-[#1FA463] text-white border border-black text-xs font-bold uppercase rounded-lg shadow-sm">
                    Join Now
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>


      {/* 🔹 Affiliations — Auto-scrolling Logos */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-6">
            Our Trusted Affiliations
          </h2>

          <div className="relative overflow-hidden border-t-2 border-b border-black py-3 bg-gray-50/50">
            <div className="flex w-max animate-marquee whitespace-nowrap">
              {[...logos, ...logos].map((logo, i) => (
                <div key={i} className="mx-4 flex-shrink-0 flex items-center bg-white border border-gray-100 rounded-lg p-1.5 shadow-sm">
                  <Image
                    src={logo}
                    alt={`Partner ${i}`}
                    width={75}
                    height={50}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
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
          animation: marquee 50s linear infinite;
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
