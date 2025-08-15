"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Shield,
  Plane,
  Gift,
  Smartphone,
  CheckCircle,
  ArrowRight,
  User,
  UserCheck,
  FolderOpen,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { FaAward, FaBalanceScale, FaChartLine, FaGem, FaHandHoldingUsd, FaRegBuilding, FaRegClock, FaRocket, FaUsers } from "react-icons/fa";
import Link from "next/link";

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

const MutualPage = () => {
  const [selectedCard, setSelectedCard] = useState("premium");
  const [showApplication, setShowApplication] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    aadharNumber: "",
    annualIncome: "",
    employmentType: "",
    company: "",
    address: "",
    city: "",
    pincode: "",
    cardType: "premium",
  });

  const creditCards = [
    {
      id: "pixel",
      name: "HDFC Bank PIXEL Credit Card",
      type: "Lifestyle",
      annualFee: "₹0",
      joiningFee: "₹0",
      gradient: "from-blue-500 to-purple-600",
      popular: true,
      features: [
        "5% CashBack on choice of any 2 Packs - Dining & Entertainment, Travel, Grocery, Electronics, Fashion",
        "3% CashBack on choice of any one e-commerce merchant - Amazon or Flipkart or PayZapp",
        "1% Unlimited CashBack on all spends",
        "1% Cashback on UPI Spends (RuPay variant)",
        "Customize your card design and billing cycle",
        "Up to 50 days interest-free credit period",
      ],
      highlights: {
        cashback: "5%",
        creditLimit: "₹2,00,000",
        rewardPoints: "CashBack System",
      },
    },
    // ... other credit cards
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description:
        "Advanced fraud protection and zero liability on unauthorized transactions",
    },
    {
      icon: Gift,
      title: "Reward Points",
      description:
        "Earn points on every purchase and redeem for exciting rewards",
    },
    {
      icon: Plane,
      title: "Travel Benefits",
      description:
        "Airport lounge access, travel insurance, and exclusive travel deals",
    },
    {
      icon: Smartphone,
      title: "Digital Wallet",
      description:
        "UPI payments, contactless transactions, and mobile app control",
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
      title: "Choose Card",
      description: "Select the credit card that suits your lifestyle",
      icon: CreditCard,
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
      icon: Shield,
    },
    {
      step: 4,
      title: "Get Approved",
      description: "Receive instant approval and card delivery",
      icon: CheckCircle,
    },
  ];

  const cards = [
    {
      id: 1,
      title: "All Mutual Funds",
      description: "Invest together, diversify easily, and let professionals grow your money for any goal, big or small.",
      icon: BarChart3,
      iconBgColor:"bg-purple-100",
      iconColor: "text-purple-600",
      link: "/mutual-funds/all"
    },
    {
      id: 2,
      title: "Loan Against Mutual Funds",
      description: "Unlock quick cash by pledging funds. Cover expenses smartly without selling your long-term mutual fund investments.",
      icon: FaHandHoldingUsd,
      iconBgColor:"bg-emerald-100",
      iconColor: "text-emerald-600",
      link: "/mutual-funds/loan"
    },
    {
      id: 3,
      title: "Sovereign Gold Bonds (SGBs)",
      description: "Grow wealth safely in gold. Earn interest, skip storage worries, and keep your portfolio shining bright.",
      icon: FaGem,
      iconBgColor:"bg-orange-100",
      iconColor: "text-orange-600",
      link: "/mutual-funds/sgb"
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert(
      "Application submitted successfully! We will contact you within 24 hours."
    );
  };

  return (
    <>
      <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] overflow-hidden">
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

          {/* Swiper Pagination */}
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section>
      </div>
      
      <div className="min-h-screen bg-gray-50">
        {/* Credit Cards List */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Mutual Funds</h2>
              <p className="text-lg text-blue-700 max-w-2xl mx-auto">
                Smart investment solutions tailored to your financial goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl bg-white"
                >
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <Link href={option.link} passHref>
                    <div className="p-6 space-y-4 h-full flex flex-col cursor-pointer bg-white">
                      {/* Icon */}
                      <div
                        className={`p-3 rounded-xl ${option.iconBgColor} flex-shrink-0 w-12 h-12 flex items-center justify-center`}
                      >
                        {React.createElement(option.icon, {
                          className: `w-6 h-6 ${option.iconColor}`
                        })}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800">
                        {option.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm leading-relaxed flex-grow text-gray-600">
                        {option.description}
                      </p>

                      {/* Learn More Button */}
                      <div className="pt-4">
                        <div className="inline-flex items-center gap-2 font-medium text-green-600 hover:text-green-700">
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
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
                  <p className="text-blue-600 font-medium">{criteria.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Account Options */}
<section className="bg-white py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            {/* Open Demat Account */}
            <div className="bg-blue-600 rounded-3xl p-10 flex flex-col justify-between shadow-xl min-h-[250px] hover:-translate-y-2 transition-transform duration-300 group">
              <div className="flex items-center gap-4">
                <FolderOpen className="w-10 h-10 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <h2 className="text-white text-3xl md:text-4xl font-bold leading-snug">
                  Open Demat Account.
                </h2>
              </div>
              <button
                onClick={()=>{router.push("/services/mutual-funds/open-demat-account")}}
                className="mt-8 w-fit border border-white text-white px-6 py-3 rounded-full text-base font-medium hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Click here
              </button>
            </div>

            {/* Already Have An Account */}
            <div className="bg-white rounded-3xl p-10 flex flex-col justify-between border shadow-xl min-h-[250px] hover:-translate-y-2 transition-transform duration-300 group">
              <div className="flex items-center gap-4">
                <UserCheck className="w-10 h-10 text-blue-600 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <h2 className="text-blue-900 text-3xl md:text-4xl font-bold leading-snug">
                  Already Have An Account
                </h2>
              </div>
              <button
                onClick={()=>{router.push("/services/mutual-funds/already-have-an-account")}}
                className="mt-8 w-fit border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-base font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Click here
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Grow Your Wealth Smartly</h2>
              <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
                Diversified investment solutions tailored to your financial goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaBalanceScale />
                </div>
                <h3 className="text-lg font-bold mb-2">Risk-Adjusted Returns</h3>
                <p className="text-emerald-100">Portfolio optimization for maximum returns with controlled risk</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaUsers />
                </div>
                <h3 className="text-lg font-bold mb-2">Expert Management</h3>
                <p className="text-emerald-100">Professional fund managers with proven track records</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaRegClock />
                </div>
                <h3 className="text-lg font-bold mb-2">Flexible SIP Options</h3>
                <p className="text-emerald-100">Start investing with as little as ₹500 per month</p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-yellow-400 text-2xl mb-4">
                  <FaAward />
                </div>
                <h3 className="text-lg font-bold mb-2">Referral Rewards</h3>
                <p className="text-emerald-100">Earn 1% commission on friends&apos; investment amounts</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MutualPage;