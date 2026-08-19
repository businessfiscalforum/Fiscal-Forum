/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  Home,
  Building,
  User,
  Briefcase,
  Coins,
  Car,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  BanknoteArrowUp,
  Clock,
  Percent,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaAward,
  FaBalanceScale,
  FaBolt,
  FaBriefcase,
  FaBuilding,
  FaCar,
  FaCoins,
  FaGraduationCap,
  FaHome,
  FaRegMoneyBillAlt,
  FaRocket,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

const slides = [
  {
    title: "Loan Services",
    subtitle: "Get Instant Access to",
    description:
      "Choose from personal, home, or education loans with low interest rates and flexible repayment options.",
    image: "/asset-loan.jpg",
    path: "/services/loan",
  },
  {
    title: "Insurance Plans",
    subtitle: "Protect Your Future with",
    description:
      "Health, car, and life insurance plans tailored to your needs — secure your family and assets today.",
    image: "/asset-insurance.jpg",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    path: "/services/insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Grow Your Wealth with a",
    description:
      "High-interest savings accounts with zero balance requirements and easy online access.",
    image: "/asset-saving.jpg",
    gradient: "from-teal-600 via-emerald-500 to-green-600",
    path: "/services/saving-account",
  },
  {
    title: "Stock Investment",
    subtitle: "Invest Smartly in the",
    description:
      "Build a diversified portfolio and start investing in the stock market with expert guidance.",
    image: "/asset-stock.jpg",
    gradient: "from-emerald-600 via-green-500 to-teal-600",
    path: "/services/learning-centre",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore High-Return",
    description:
      "Access professionally managed mutual funds to meet your financial goals across risk profiles.",
    image: "/asset-mutual.jpg",
    gradient: "from-cyan-600 via-teal-500 to-emerald-600",
    path: "/services/mutual-funds",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with a",
    description:
      "Choose the right credit card for rewards, cashback, and low-interest EMIs.",
    image: "/asset-credit.jpg",
    gradient: "from-green-500 via-teal-500 to-emerald-600",
    path: "/services/credit-card",
  },
  {
    title: "Govt Bonds & FDs",
    subtitle: "Secure Investments with",
    description:
      "Low-risk government bonds and fixed deposits to preserve capital and earn steady returns.",
    image: "/asset-fd.jpg",
    gradient: "from-teal-600 via-green-500 to-emerald-600",
    path: "/services/govt-bonds-and-fd",
  },
];

const LoanLandingPage = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanAmount: 7500000,
    tenure: 20,
    interestRate: 8.5,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "interestRate" || name === "loanAmount" || name === "tenure"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        loanAmount: formData.loanAmount,
        tenure: formData.tenure,
        interestRate: formData.interestRate,
        loanType: "home-loan",
      };

      // console.log("Sending payload:", payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/send-quote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // console.log("Response status:", response.status);
      const result = await response.json();
      // console.log("Response data:", result);

      setIsSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      loanAmount: 7500000,
      tenure: 20,
      interestRate: 8.5,
    });
  };

  // EMI Calculation: (P * R * (1+R)^N) / ((1+R)^N - 1)
  const calculateEMI = () => {
    const principal = formData.loanAmount;
    const monthlyRate = formData.interestRate / 12 / 100; // Convert annual to monthly
    const totalMonths = formData.tenure * 12;

    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) return 0;

    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  };

  const monthlyEMI = calculateEMI();

  type LoanType = {
    id: string;
    title: string;
    icon: React.ElementType;
    description: string;
    features: string[];
    rate: string;
    maxAmount: string;
    link: string;
    glink: string;
    iconColor: string;
    iconBgColor: string;
  };

  const loanTypes: LoanType[] = [
    {
      id: "home-loan",
      title: "Home Loan",
      icon: FaHome,
      description:
        "Buy your dream home with competitive interest rates starting from 8.5% per annum",
      features: [
        "Up to ₹5 Crores",
        "Tenure up to 30 years",
        "Minimal documentation",
        "Quick approval",
      ],
      rate: "8.5% onwards",
      maxAmount: "₹5 Cr",
      link: "/services/loan/home-loan",
      glink: "/services/loan/home-loan/apply",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "loan-against-property",
      title: "Loan Against Property",
      icon: FaBuilding,
      description:
        "Unlock the value of your property for any financial need with attractive rates",
      features: [
        "Up to ₹10 Crores",
        "Flexible repayment",
        "Retain property ownership",
        "Multiple end-use",
      ],
      rate: "9.0% onwards",
      maxAmount: "₹10 Cr",
      link: "/services/loan/loan-against-property",
      glink: "/services/loan/loan-against-property/apply",
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "personal-loan",
      title: "Personal Loan",
      icon: FaUser,
      description:
        "Meet your personal financial goals with instant approval and no collateral",
      features: [
        "Up to ₹40 Lakhs",
        "No collateral required",
        "Instant approval",
        "Flexible tenure",
      ],
      rate: "10.5% onwards",
      maxAmount: "₹40 L",
      link: "/services/loan/personal-loan",
      glink: "/services/loan/personal-loan/apply",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "business-loan",
      title: "Business Loan",
      icon: FaBriefcase,
      description:
        "Grow your business with customized financing solutions and expert guidance",
      features: [
        "Up to ₹50 Crores",
        "Working capital",
        "Equipment financing",
        "Overdraft facility",
      ],
      rate: "11.0% onwards",
      maxAmount: "₹50 Cr",
      link: "/services/loan/business-loan",
      glink: "/services/loan/business-loan/apply",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "gold-loan",
      title: "Gold Loan",
      icon: FaCoins,
      description:
        "Get instant cash against your gold ornaments with minimal paperwork",
      features: [
        "Up to ₹1 Crore",
        "Instant approval",
        "Retain gold ownership",
        "Flexible repayment",
      ],
      rate: "7.5% onwards",
      maxAmount: "₹1 Cr",
      link: "/services/loan/gold-loan",
      glink: "/services/loan/gold-loan/apply",
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      id: "car-loan",
      title: "Car Loan",
      icon: FaCar,
      description:
        "Drive home your dream car with easy EMIs and quick processing",
      features: [
        "Up to ₹2 Crores",
        "New & used cars",
        "Up to 90% financing",
        "Quick disbursal",
      ],
      rate: "8.0% onwards",
      maxAmount: "₹2 Cr",
      link: "/services/loan/car-loan",
      glink: "/services/loan/car-loan/apply",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      id: "education-loan",
      title: "Education Loan",
      icon: FaGraduationCap,
      description:
        "Invest in your future with comprehensive education financing solutions",
      features: [
        "Up to ₹1.5 Crores",
        "Abroad & domestic",
        "Moratorium period",
        "Tax benefits",
      ],
      rate: "9.5% onwards",
      maxAmount: "₹1.5 Cr",
      link: "/services/loan/education-loan",
      glink: "/services/loan/education-loan/apply",
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-500",
    },
    {
      id: "loan-against-securities",
      title: "Loan Against Securities",
      icon: FaShieldAlt,
      description: "Get instant liquidity against securities while they grow",
      features: [
        "Up to ₹1.5 Crores",
        "Retain ownership of securities",
        "Quick processing & disbursal",
        "Tax-efficient financing",
      ],
      rate: "9.5% onwards",
      maxAmount: "₹1.5 Cr",
      link: "/services/loan/loan-against-securities",
      glink: "/services/loan/loan-against-securities/apply",
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-500",
    },
  ];

  const filteredLoans = useMemo(() => {
    if (activeCategory === "all") return loanTypes;
    if (activeCategory === "consumer") {
      return loanTypes.filter(loan => ["personal-loan", "car-loan", "education-loan"].includes(loan.id));
    }
    if (activeCategory === "asset") {
      return loanTypes.filter(loan => ["home-loan", "loan-against-property", "gold-loan", "loan-against-securities"].includes(loan.id));
    }
    if (activeCategory === "business") {
      return loanTypes.filter(loan => ["business-loan"].includes(loan.id));
    }
    return loanTypes;
  }, [activeCategory, loanTypes]);

  const eligibilityCriteria = [
    { label: "Age", value: "21-65 years" },
    { label: "Income", value: "₹3,00,000+ annually" },
    { label: "Employment", value: "Salaried/Self-employed" },
    { label: "Credit Score", value: "700+ preferred" },
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Choose Loan Type",
      description: "Select the loan that suits your lifestyle",
      icon: BanknoteArrowUp,
    },
    {
      step: 2,
      title: "Fill Application",
      description: "Complete the online application form",
      icon: User,
    },
    {
      step: 3,
      title: "Document Upload",
      description: "Upload required documents for verification",
      icon: ShieldCheck,
    },
    {
      step: 4,
      title: "Get Approved",
      description: "Receive instant approval",
      icon: CheckCircle,
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#F2F8F4] text-[#111315] pt-32 pb-16 font-sans relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(17,19,21,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(17,19,21,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title / Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111315] mb-4">
            LOAN SERVICES
          </h1>
          <p className="text-lg md:text-xl text-[#5B6B7C] max-w-3xl mx-auto font-medium">
            Curated rates and flexible repayment options for every financial goal.
          </p>
        </div>

        {/* Outlined Pill Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 border-b border-[#111315] pb-8">
          {[
            { id: "all", label: "ALL LOANS" },
            { id: "consumer", label: "PERSONAL & CONSUMER" },
            { id: "asset", label: "ASSET & PROPERTY" },
            { id: "business", label: "BUSINESS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold border border-[#111315] transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#5C9A78] text-white shadow-sm"
                  : "bg-white text-[#111315] hover:bg-[#F2F8F4]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredLoans.map((loan) => {
            const IconComponent = loan.icon;
            // Determine category label
            let catLabel = "LOAN";
            if (
              [
                "home-loan",
                "loan-against-property",
                "gold-loan",
                "loan-against-securities",
              ].includes(loan.id)
            ) {
              catLabel = "ASSET";
            } else if (
              ["personal-loan", "car-loan", "education-loan"].includes(loan.id)
            ) {
              catLabel = "CONSUMER";
            } else if (loan.id === "business-loan") {
              catLabel = "BUSINESS";
            }

            return (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#111315] rounded-[24px] overflow-hidden shadow-sm flex flex-col justify-between h-full p-6 hover:-translate-y-1 transition-transform"
              >
                <div>
                  {/* Top Row Badges */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#D9F0E1] text-[#2F5541] border border-[rgba(17,19,21,0.15)] px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wider uppercase">
                      {catLabel}
                    </span>
                    <span className="bg-white text-[#111315] border border-[#111315] px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase">
                      {loan.rate}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-xl ${loan.iconBgColor} flex items-center justify-center w-10 h-10`}
                    >
                      {IconComponent && (
                        <IconComponent className={`w-5 h-5 ${loan.iconColor}`} />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#111315]">
                      {loan.title}
                    </h3>
                  </div>

                  <p className="text-[#5B6B7C] text-sm leading-relaxed mb-4">
                    {loan.description}
                  </p>

                  <div className="border-b border-[rgba(17,19,21,0.12)] my-4"></div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {loan.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-[#5B6B7C] font-medium"
                      >
                        <CheckCircle className="text-[#5C9A78] flex-shrink-0 w-4 h-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[rgba(17,19,21,0.08)]">
                  <div>
                    <span className="text-[0.65rem] text-[#8B98A6] font-bold uppercase tracking-wider block">
                      MAX AMOUNT
                    </span>
                    <span className="text-[#111315] font-bold text-sm">
                      {loan.maxAmount}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={loan.link} passHref>
                      <button className="px-4 py-2 rounded-full text-xs font-semibold text-[#5B6B7C] hover:text-[#111315] transition-colors cursor-pointer">
                        Details
                      </button>
                    </Link>
                    <Link href={loan.glink} passHref>
                      <button className="bg-[#5C9A78] hover:bg-[#2F5541] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer">
                        Apply Now →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* EMI Calculator */}
        <div className="bg-white border border-[#111315] rounded-[28px] p-8 max-w-4xl mx-auto shadow-sm mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase">
              ESTIMATE YOUR MONTHLY EMI
            </h2>
            <p className="text-sm text-[#5B6B7C] font-medium">
              Adjust the parameters to estimate your monthly payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#8B98A6] uppercase tracking-wider mb-2">
                  LOAN AMOUNT (₹):{" "}
                  <span className="text-[#111315] font-extrabold text-sm ml-1">
                    {parseInt(formData.loanAmount.toString()).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </label>
                <input
                  type="range"
                  name="loanAmount"
                  min="100000"
                  max="50000000"
                  step="200000"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#D9F0E1] rounded-lg appearance-none cursor-pointer accent-[#5C9A78]"
                />
                <div className="flex justify-between text-[10px] font-bold text-[#8B98A6] mt-1">
                  <span>₹1 LAKH</span>
                  <span>₹5 CRORE</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B98A6] uppercase tracking-wider mb-2">
                  LOAN TENURE:{" "}
                  <span className="text-[#111315] font-extrabold text-sm ml-1">
                    {formData.tenure} Years
                  </span>
                </label>
                <input
                  type="range"
                  name="tenure"
                  min="5"
                  max="30"
                  step="1"
                  value={formData.tenure}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#D9F0E1] rounded-lg appearance-none cursor-pointer accent-[#5C9A78]"
                />
                <div className="flex justify-between text-[10px] font-bold text-[#8B98A6] mt-1">
                  <span>5 YEARS</span>
                  <span>30 YEARS</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8B98A6] uppercase tracking-wider mb-2">
                  INTEREST RATE (% P.A.):{" "}
                  <span className="text-[#111315] font-extrabold text-sm ml-1">
                    {formData.interestRate.toFixed(2)}%
                  </span>
                </label>
                <input
                  type="range"
                  name="interestRate"
                  min="6"
                  max="15"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#D9F0E1] rounded-lg appearance-none cursor-pointer accent-[#5C9A78]"
                />
                <div className="flex justify-between text-[10px] font-bold text-[#8B98A6] mt-1">
                  <span>6%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>

            {/* EMI Output Card */}
            <div className="bg-[#D9F0E1] border border-[rgba(17,19,21,0.15)] rounded-[20px] p-6 text-center h-full flex flex-col justify-center items-center">
              <h3 className="text-sm font-bold text-[#2F5541] tracking-wider uppercase mb-2">
                ESTIMATED MONTHLY EMI
              </h3>
              <div className="text-4xl font-extrabold text-[#2F5541] mb-2">
                ₹{monthlyEMI.toLocaleString()}
              </div>
              <p className="text-xs text-[#2F5541]/80 font-medium">
                Computed at {formData.interestRate}% interest rate for{" "}
                {formData.tenure} years.
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase">
              ELIGIBILITY CRITERIA
            </h2>
            <p className="text-sm text-[#5B6B7C] font-medium">
              Check if you meet our baseline guidelines
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {eligibilityCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-white border border-[#111315] p-5 rounded-[20px] text-center shadow-sm"
              >
                <h3 className="text-xs font-bold text-[#8B98A6] uppercase tracking-wider mb-2">
                  {criteria.label}
                </h3>
                <p className="text-[#111315] font-extrabold text-sm sm:text-base">
                  {criteria.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="bg-white border border-[#111315] rounded-[28px] p-8 max-w-5xl mx-auto shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase">
              Features & Benefits
            </h2>
            <p className="text-sm text-[#5B6B7C] font-medium">
              Why clients prefer our verified direct lending networks
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBolt />,
                title: "Instant Approval",
                text: "Get approved within 24 hours with minimal documents.",
              },
              {
                icon: <FaRegMoneyBillAlt />,
                title: "Competitive Rates",
                text: "Interest rates starting from 7.5% onwards.",
              },
              {
                icon: <FaBalanceScale />,
                title: "Flexible Tenure",
                text: "Repayment options from 12 months up to 30 years.",
              },
              {
                icon: <FaAward />,
                title: "Referral Rewards",
                text: "Earn 0.5% of the loan amount for successful referrals.",
              },
            ].map((feat, index) => (
              <div
                key={index}
                className="p-5 border-r last:border-0 border-[rgba(17,19,21,0.08)] lg:block flex flex-col items-center text-center lg:text-left lg:items-start"
              >
                <div className="text-[#5C9A78] text-2xl mb-3">{feat.icon}</div>
                <h4 className="text-base font-bold text-[#111315] mb-2">
                  {feat.title}
                </h4>
                <p className="text-xs text-[#5B6B7C] leading-relaxed">
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanLandingPage;
