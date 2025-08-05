"use client";

import React from "react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";

const slides = [
  {
    title: "Car Insurance",
    subtitle: "Protect Your Drive with",
    description:
      "Get comprehensive car insurance that covers accidents, theft, and third-party liabilities — drive worry-free.",
    image: "/asset1.jpg",
    gradient: "from-blue-600 via-blue-500 to-purple-600",
    path: "/car-insurance",
  },
  {
    title: "Health",
    subtitle: "Safeguard Your Health",
    description:
      "Stay financially prepared for medical emergencies with customizable health insurance plans for individuals and families.",
    image: "/asset3.jpg",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    path: "/health-insurance",
  },
  {
    title: "Life Insurance",
    subtitle: "Explore",
    description:
      "Plan for tomorrow with life insurance solutions designed to support your loved ones even in your absence.",
    image: "/asset4.jpg",
    gradient: "from-indigo-600 via-purple-500 to-pink-600",
    path: "/life-insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Open a High-Interest",
    description:
      "Grow your money safely with easy access and competitive interest rates. Perfect for everyday banking needs.",
    image: "/asset5.jpg",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    path: "/savings-account",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with the Right",
    description:
      "Enjoy cashback, rewards, and easy EMIs with credit cards suited to your lifestyle and spending habits.",
    image: "/asset2.jpg",
    gradient: "from-orange-600 via-red-500 to-pink-600",
    path: "/credit-card",
  },
  {
    title: "Stock Market",
    subtitle: "Start Investing in the",
    description:
      "Tap into long-term growth by investing in equity markets. Build wealth through diversified stocks tailored to your financial goals.",
    image: "/asset6.jpg",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    path: "/stock-investment",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore",
    description:
      "Choose from a range of mutual fund schemes managed by experts to suit your investment horizon and risk appetite.",
    image: "/asset7.jpg",
    gradient: "from-cyan-600 via-blue-500 to-indigo-600",
    path: "/mutual-funds",
  },
];

const LoanLandingPage = () => {
  const router = useRouter();

  type LoanType = {
    id: string;
    title: string;
    icon: React.ElementType;
    description: string;
    features: string[];
    rate: string;
    maxAmount: string;
    gradient: string;
  };

  const loanTypes: LoanType[] = [
    {
      id: "home-loan",
      title: "Home Loan",
      icon: Home,
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
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "loan-against-property",
      title: "Loan Against Property",
      icon: Building,
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
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      id: "personal-loan",
      title: "Personal Loan",
      icon: User,
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
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "business-loan",
      title: "Business Loan",
      icon: Briefcase,
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
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "gold-loan",
      title: "Gold Loan",
      icon: Coins,
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
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      id: "car-loan",
      title: "Car Loan",
      icon: Car,
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
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "education-loan",
      title: "Education Loan",
      icon: GraduationCap,
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
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "loan-against-securities",
      title: "Loan Against Securities",
      icon: ShieldCheck,
      description: "Get instant liquidity against securities while they grow",
      features: [
        "Up to ₹1.5 Crores",
        "Retain ownership of securities",
        "Quick processing & disbursal",
        "Tax-efficient financing",
      ],
      rate: "9.5% onwards",
      maxAmount: "₹1.5 Cr",
      gradient: "from-slate-500 to-gray-600",
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
      <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
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
      </div>
      {/* Header */}
      <div className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="text-center text-white pt-16 pb-12 px-4">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 
            bg-gradient-to-r from-white via-blue-100 to-purple-100 
            bg-clip-text text-transparent
            leading-tight"
          >
            Complete Loan Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90 font-light">
            Your Trusted Financial Partner
          </p>
          <p className="text-lg opacity-75 max-w-2xl mx-auto">
            From home loans to business financing - we have got all your loan
            needs covered with competitive rates and quick approvals
          </p>
        </div>
      </div>

      <div className="bg-white shadow-2xl overflow-hidden">
        {/* Loan Types Section */}
        <div className="p-12 md:p-20 bg-gray-50">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Loan Type
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of loan products designed to meet
              every financial need
            </p>
          </div>

          {/* Loan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan) => {
              const IconComponent = loan.icon;
              return (
                <div
                  key={loan.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group flex flex-col"
                >
                  {/* Icon and Header */}
                  <div className="flex items-center mb-6">
                    <div
                      className={`bg-gradient-to-r ${loan.gradient} p-3 rounded-xl`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-gray-800">
                        {loan.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-semibold text-green-600">
                          {loan.rate}
                        </span>
                        <span>Up to {loan.maxAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {loan.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-3">
                      {loan.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button
                      onClick={() => router.push(`/services/loan/${loan.id}`)}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-50"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/services/loan/${loan.id}/get-quote`)
                      }
                      className={`flex-1 bg-gradient-to-r ${loan.gradient} hover:scale-105 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Application Process */}
          <section className="py-16 bg-white">
            <div className=" mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Simple Application Process
                </h2>
                <p className="text-gray-600">
                  Get your loan in just 4 easy steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Eligibility Criteria */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Eligibility Criteria
                </h2>
                <p className="text-gray-600">
                  Check if you meet our simple eligibility requirements
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {eligibilityCriteria.map((criteria, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl text-center shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {criteria.label}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {criteria.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LoanLandingPage;
