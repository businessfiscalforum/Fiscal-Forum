"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Shield,
  Gift,
  CheckCircle,
  User,
  Bell,
  Star,
  Zap,
  Phone,
  Mail,
  ShieldCheck,
  FileText,
  Headphones,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { FaRocket, FaChartLine } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

// Updated slides with green/teal/emerald theme
const slides = [
  {
    title: "Loan Services",
    subtitle: "Get Instant Access to",
    description:
      "Choose from personal, home, or education loans with low interest rates and flexible repayment options.",
    image: "/asset-loan.jpg",
    gradient: "from-emerald-600 via-teal-500 to-green-600",
    path: "services/loan",
  },
  {
    title: "Insurance Plans",
    subtitle: "Protect Your Future with",
    description:
      "Health, car, and life insurance plans tailored to your needs — secure your family and assets today.",
    image: "/asset-insurance.jpg",
    gradient: "from-green-600 via-emerald-500 to-cyan-600",
    path: "services/insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Grow Your Wealth with a",
    description:
      "High-interest savings accounts with zero balance requirements and easy online access.",
    image: "/asset-saving.jpg",
    gradient: "from-teal-600 via-emerald-500 to-green-600",
    path: "services/saving-account",
  },
  {
    title: "Stock Investment",
    subtitle: "Invest Smartly in the",
    description:
      "Build a diversified portfolio and start investing in the stock market with expert guidance.",
    image: "/asset-stock.jpg",
    gradient: "from-emerald-600 via-green-500 to-teal-600",
    path: "services/stock-investment",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore High-Return",
    description:
      "Access professionally managed mutual funds to meet your financial goals across risk profiles.",
    image: "/asset-mutual.jpg",
    gradient: "from-cyan-600 via-teal-500 to-emerald-600",
    path: "services/mutual-funds",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with a",
    description:
      "Choose the right credit card for rewards, cashback, and low-interest EMIs.",
    image: "/asset-credit.jpg",
    gradient: "from-green-500 via-teal-500 to-emerald-600",
    path: "services/credit-card",
  },
  {
    title: "Govt Bonds & FDs",
    subtitle: "Secure Investments with",
    description:
      "Low-risk government bonds and fixed deposits to preserve capital and earn steady returns.",
    image: "/asset-bondfd.jpg",
    gradient: "from-teal-600 via-emerald-500 to-green-600",
    path: "services/govts-bond-&-fd",
  },
];

const CreditCardApplyPage = () => {
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

  const bankOffers = [
    {
      id: 1,
      name: "IndusInd Bank",
      logo: "/indusind.png",
      features: [
        "Choose your phone number as your easy-to-remember account number.",
        "Zero AMC charges on your digital card — save more every year.",
        "Complete application support for a smooth, hassle-free banking experience.",
        "Minimum initial deposit: ₹5,000 during account opening on the same day.",
        "Withdrawals allowed 15 minutes after initial funding is completed.",
        "No hidden charges — complete transparency for your peace of mind.",
      ],
      rating: 4.8,
      reviews: "12,450",
      offer: "Cashback Upto ₹250",
      link: "/services/saving-account/indusInd",
      alink: "/services/saving-account/indusInd/apply",
    },
    {
      id: 2,
      name: "AXIS Bank",
      logo: "/axis.png",
      features: [
        "Minimum average balance varies by branch location.",
        "Range: ₹2,500 to ₹10,000 for regular savings accounts.",
        "Metro and urban branches usually require ₹5,000 average balance.",
        "Semi-urban and rural branches often have lower balance requirements.",
        "Complete application support for a smooth, hassle-free banking experience.",
        "No hidden charges — complete transparency for your peace of mind.",
      ],
      rating: 4.6,
      reviews: "18,760",
      offer: "Cashback Upto ₹250",
      link: "/services/saving-account/axis",
      alink: "/services/saving-account/axis/apply",
    },
    {
      id: 3,
      name: "FI Bank",
      logo: "/fi.png",
      features: [
        "Enjoy hassle-free banking with our zero balance account — no minimum balance, total freedom.",
        "Zero balance savings account: keep your money flexible, with no balance requirements ever.",
        "Open your zero balance account — simple, convenient, and no minimum balance to maintain.",
        "Instant account opening with Aadhaar-based KYC.",
        "24/7 mobile banking with advanced security features.",
        "Free debit card with zero forex markup on international transactions.",
      ],
      rating: 4.9,
      reviews: "8,920",
      offer: "Cashback Upto ₹250",
      link: "/services/saving-account/fi",
      alink: "/services/saving-account/fi/apply",
    },
  ];

  // State to manage expanded features for each bank
  const [expandedBanks, setExpandedBanks] = useState<Record<number, boolean>>({});

  // Toggle function for expanding/collapsing features
  const toggleFeatures = (bankId: number) => {
    setExpandedBanks(prev => ({
      ...prev,
      [bankId]: !prev[bankId]
    }));
  };

  return (
    <>
      <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] overflow-hidden">
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

          {/* Swiper Pagination is now styled */}
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section>

        {/* Zero Fee Banking Section */}
        <section className="py-16 bg-gradient-to-r from-teal-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
                Enjoy <span className="text-emerald-600">Zero Fee Banking</span>{" "}
                on your Saving Account
              </h2>
              <p className="text-lg text-teal-700 max-w-3xl mx-auto">
                Experience hassle-free banking with no hidden charges and
                complete transparency
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-emerald-100">
                  <h3 className="text-2xl font-bold text-teal-900 mb-6">
                    Key Benefits
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-emerald-600 w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          RTGS, NEFT, IMPS
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Free fund transfers with instant processing
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="text-emerald-600 w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          ATM Transactions, Debit Card
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Zero charges on all ATM withdrawals and card
                          transactions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Bell className="text-emerald-600 w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          SMS Alerts & 30+ Services
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Stay informed with free notifications and value-added
                          services
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <FaChartLine className="text-emerald-600 w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Higher Interest Rates
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Earn up to 7% annual interest on your savings
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/people.png"
                      alt="Banking team"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {/* <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                        <Star className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">4.9/5 Rating</p>
                        <p className="text-sm text-gray-600">
                          Based on 1,000+ reviews
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Bank Offers Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
                Exclusive Bank Offers
              </h2>
              <p className="text-lg text-teal-700 max-w-3xl mx-auto">
                Special deals and benefits from top financial institutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {bankOffers.map((bank) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100 transition-all duration-300 flex flex-col"
                >
                  <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>

                  {/* Main content fills available height */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    {/* Top section */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-white border border-emerald-200 rounded-md p-1 flex-shrink-0">
                            <Image
                              src={bank.logo}
                              alt={`${bank.name} Logo`}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {bank.name}
                            </h3>
                            {/* <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(bank.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-1">
                                {bank.rating} ({bank.reviews})
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-3 py-2 rounded-lg inline-flex items-center gap-2 mb-4">
                          <Gift className="w-4 h-4" />
                          {bank.offer}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {/* Show first 3 features always */}
                        {bank.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                        
                        {/* Show additional features based on expanded state */}
                        {expandedBanks[bank.id] && 
                          bank.features.slice(3).map((feature, index) => (
                            <li key={index + 3} className="flex items-start gap-2">
                              <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                              <span className="text-gray-700 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                      
                      {/* Expand/Collapse Button */}
                      {bank.features.length > 3 && (
                        <button
                          onClick={() => toggleFeatures(bank.id)}
                          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm mb-6"
                        >
                          {expandedBanks[bank.id] ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View More Benefits
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Buttons section always at bottom */}
                    <div className="flex gap-3 pt-4 justify-evenly">
                      <Link href={bank.link} passHref>
                        <button className="inline-flex items-center gap-1 px-3 py-2 rounded-lg 
               text-emerald-600 font-medium text-md 
               hover:text-emerald-700 transition">
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

                      <Link href={bank.alink} passHref>
                        <button className="inline-flex items-center gap-1 px-3 py-2 rounded-lg 
               bg-gradient-to-r from-emerald-500 to-teal-600 
               hover:from-emerald-600 hover:to-teal-700 
               text-white font-medium text-md 
               transition-all duration-300 shadow-md 
               hover:shadow-lg transform hover:scale-105">
                          Apply Now
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
              ))}
            </div>
          </div>
        </section>

        

        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple Application Process
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get your account in just 4 easy steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {applicationSteps.map((step, index) => (
                <div key={index} className="text-center relative">
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-emerald-200"></div>
                  )}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white border-2 border-emerald-500 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Banking Experience?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying zero-fee banking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-r from-teal-900 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Banking Solutions?
              </h2>
              <p className="text-xl text-teal-200 max-w-3xl mx-auto">
                Experience the future of banking with our innovative services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Trusted Banking Partners
                </h3>
                <p className="text-teal-200">
                  Partnered with leading top banks you know and trust for
                  complete peace of mind
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-4">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Convenient Branch Access
                </h3>
                <p className="text-teal-200">
                  Get an account with a nearby branch — making deposits and
                  transactions easy anytime
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mb-4">
                  <FileText className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  100% Paperless Process
                </h3>
                <p className="text-teal-200">
                  Enjoy a quick, secure, and fully online process — no paperwork
                  hassles at all
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center mb-4">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Account Opening</h3>
                <p className="text-teal-200">
                  Open your bank account in less than 10 minutes and get started
                  instantly
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center mb-4">
                  <Headphones className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Dedicated Customer Support
                </h3>
                <p className="text-teal-200">
                  Get reliable support for queries, help, or guidance whenever
                  you need it most
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreditCardApplyPage;