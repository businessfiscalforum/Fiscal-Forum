/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
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
    path: "/services/stock-investment",
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
    image: "/asset-bondfd.jpg",
    gradient: "from-teal-600 via-emerald-500 to-green-600",
    path: "/services/govts-bond-&-fd",
  },
];

const LoanLandingPage = () => {
  const router = useRouter();
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

      console.log("Sending payload:", payload);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/send-quote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

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
      glink: "/services/loan/home-loan/get-quote",
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
      glink: "/services/loan/loan-against-property/get-quote",
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
      glink: "/services/loan/personal-loan/get-quote",
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
      glink: "/services/loan/business-loan/get-quote",
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
      glink: "/services/loan/gold-loan/get-quote",
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
      glink: "/services/loan/car-loan/get-quote",
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
      glink: "/services/loan/education-loan/get-quote",
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
      glink: "/services/loan/loan-against-securities/get-quote",
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-500",
    },
  ];
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
    <>
      <div className="text-gray-800 font-sans bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-20">
        {/* Hero Section */}
        {/* <section className="relative w-full h-[60vh] overflow-hidden">
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
                <div className="absolute inset-0 z-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}/80`}
                  ></div>
                </div>
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
                      className="uppercase tracking-widest text-sm text-green-200 font-semibold mb-2"
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
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Choose Your Loan Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of loan products designed to meet
              every financial need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {loanTypes.map((loan) => {
              const IconComponent = loan.icon;
              return (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform bg-white border border-emerald-100"
                >
                  <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 rounded-xl ${loan.iconBgColor} flex-shrink-0 w-12 h-12 flex items-center justify-center`}
                      >
                        {IconComponent && (
                          <IconComponent
                            className={`w-6 h-6 ${loan.iconColor}`}
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {loan.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="font-semibold text-emerald-600">
                            {loan.rate}
                          </span>
                          <span className="text-gray-500">
                            Up to {loan.maxAmount}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {loan.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {loan.features.slice(0, 3).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-4 pt-4">
                      <Link href={loan.link} passHref>
                        <button className="px-4 py-2 rounded-lg  text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2">
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
                      </Link>

                      <Link href={loan.glink} passHref>
                        <button className="px-4 py-2 rounded-lg  text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-2">
                          Get Quote
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
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* EMI Calculator */}
          <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-2xl mb-16">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Calculate Your EMI
                </h2>
                <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                  Adjust the sliders to estimate your monthly payment
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {/* Loan Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loan Amount (₹):{" "}
                    <span className="font-semibold text-gray-900">
                      {parseInt(formData.loanAmount.toString()).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      name="loanAmount"
                      min="100000"
                      max="50000000"
                      step="200000"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer pl-10"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                      <span>₹1 Lakh</span>
                      <span>₹5 Crore</span>
                    </div>
                  </div>
                </div>

                {/* Tenure */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loan Tenure:{" "}
                    <span className="font-semibold text-gray-900">
                      {formData.tenure} years
                    </span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      name="tenure"
                      min="5"
                      max="30"
                      step="1"
                      value={formData.tenure}
                      onChange={handleChange}
                      className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer pl-10"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                      <span>5 Years</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interest Rate:{" "}
                    <span className="font-semibold text-gray-900">
                      {formData.interestRate.toFixed(2)}% p.a.
                    </span>
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      name="interestRate"
                      min="6"
                      max="15"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={handleChange}
                      className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer pl-10"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                      <span>6%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>

                {/* EMI Summary */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-center shadow-md">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Estimated Monthly EMI
                  </h3>
                  <div className="text-3xl font-bold text-white mb-2">
                    ₹{monthlyEMI.toLocaleString()}
                  </div>
                  <p className="text-emerald-100">
                    At {formData.interestRate}% interest for {formData.tenure}{" "}
                    years
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Eligibility Criteria */}
        <section className="py-16 bg-white shadow-xl">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                Eligibility Criteria
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Check if you meet our simple eligibility requirements
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {eligibilityCriteria.map((criteria, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-emerald-50 p-6 rounded-xl text-center border border-emerald-100"
                >
                  <h3 className="font-semibold text-emerald-900 mb-2">
                    {criteria.label}
                  </h3>
                  <p className="text-emerald-700 font-medium">
                    {criteria.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-800 to-teal-800 shadow-2xl text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Turn Dreams into Reality
              </h2>
              <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
                Flexible financing solutions tailored to your life goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaBolt />
                </div>
                <h3 className="text-lg font-bold mb-2">Instant Approval</h3>
                <p className="text-emerald-100">
                  Get approved within 24 hours with minimal documentation
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaRegMoneyBillAlt />
                </div>
                <h3 className="text-lg font-bold mb-2">Competitive Rates</h3>
                <p className="text-emerald-100">
                  Interest rates starting from 8.4% for qualified borrowers
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaBalanceScale />
                </div>
                <h3 className="text-lg font-bold mb-2">Flexible Tenure</h3>
                <p className="text-emerald-100">
                  Repayment options from 12 months to 30 years
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaAward />
                </div>
                <h3 className="text-lg font-bold mb-2">Referral Rewards</h3>
                <p className="text-emerald-100">
                  Earn 0.5% of loan amount as cashback for referrals
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoanLandingPage;
