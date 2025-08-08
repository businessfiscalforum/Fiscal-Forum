"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  Car,
  Heart,
  Building2,
  Plane,
  CheckCircle,
  Phone,
  FileText,
  Clock,
  Award,
  Users,
  Briefcase,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";

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


const InsuranceLandingPage = () => {
  const router = useRouter();

  type InsuranceType = {
    id: string;
    title: string;
    icon: React.ElementType;
    description: string;
    features: string[];
    coverage: string;
    premium: string;
    gradient: string;
    popular?: boolean;
  };

  const insuranceTypes: InsuranceType[] = [
    {
      id: "car-insurance",
      title: "Car Insurance",
      icon: Car,
      description:
        "Comprehensive protection for your vehicle with third-party liability, own damage, and add-on covers",
      features: [
        "Third-party liability",
        "Own damage coverage",
        "Zero depreciation",
        "24/7 roadside assistance",
      ],
      coverage: "Up to ₹5 Crores",
      premium: "₹4,000/year onwards",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "shop-insurance",
      title: "Shop Insurance",
      icon: Building2,
      description:
        "Business protection for shops, offices, and commercial establishments against various risks",
      features: [
        "Stock & inventory",
        "Equipment coverage",
        "Business interruption",
        "Public liability",
      ],
      coverage: "Up to ₹10 Crores",
      premium: "₹6,000/year onwards",
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      id: "commercial-insurance",
      title: "Commercial Insurance",
      icon: Briefcase,
      description:
        "Comprehensive business insurance covering property, liability, and employee benefits",
      features: [
        "Property insurance",
        "Liability coverage",
        "Employee benefits",
        "Cyber insurance",
      ],
      coverage: "Up to ₹100 Crores",
      premium: "₹25,000/year onwards",
      gradient: "from-red-500 to-red-600",
    },
    {
      id: "travel-insurance",
      title: "Travel Insurance",
      icon: Plane,
      description:
        "Travel worry-free with coverage for medical emergencies, trip cancellation, and baggage loss",
      features: [
        "Medical emergencies",
        "Trip cancellation",
        "Baggage loss",
        "Flight delays",
      ],
      coverage: "Up to ₹50 Lakhs",
      premium: "₹300/trip onwards",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      id: "group-health",
      title: "Group Health",
      icon: Users,
      description:
        "Employee health insurance plans for organizations with comprehensive medical coverage",
      features: [
        "Employee coverage",
        "Family floater",
        "Maternity benefits",
        "Wellness programs",
      ],
      coverage: "Up to ₹25 Lakhs",
      premium: "₹15,000/employee/year",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: "child-insurance",
      title: "Child Insurance",
      icon: Heart,
      description:
        "Secure your child's future with education and marriage benefit plans",
      features: [
        "Education planning",
        "Marriage benefits",
        "Life cover",
        "Premium waiver",
      ],
      coverage: "Up to ₹1 Crore",
      premium: "₹10,000/year onwards",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      id: "rural-insurance",
      title: "Rural & Crop Insurance",
      icon: MapPin,
      description:
        "Protect farmers and rural communities with crop, livestock, and weather insurance",
      features: [
        "Crop protection",
        "Livestock cover",
        "Weather insurance",
        "Equipment coverage",
      ],
      coverage: "Up to ₹10 Lakhs",
      premium: "₹2,000/year onwards",
      gradient: "from-lime-500 to-lime-600",
    },
  ];

  const claimSteps = [
    {
      step: 1,
      title: "Report Claim",
      description: "Inform us about the incident within 24 hours",
      icon: Phone,
    },
    {
      step: 2,
      title: "Submit Documents",
      description: "Upload required documents online",
      icon: FileText,
    },
    {
      step: 3,
      title: "Claim Processing",
      description: "Our team processes your claim quickly",
      icon: Clock,
    },
    {
      step: 4,
      title: "Settlement",
      description: "Receive claim amount in your account",
      icon: CheckCircle,
    },
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Best Prices",
      description: "Compare and get the lowest premium rates",
    },
    {
      icon: ShieldCheck,
      title: "Quick Claims",
      description: "Fast claim settlement with 98% success rate",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 customer support from insurance experts",
    },
    {
      icon: CheckCircle,
      title: "Easy Process",
      description: "Simple online process with instant policy issuance",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] overflow-hidden">
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
                        Get Quote
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>

      {/* Header */}
      <div className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        {/* <div className="text-center text-white py-12 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Complete Insurance Solutions
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-3 opacity-90 font-light">
            Your Trusted Protection Partner
          </p>
          <p className="text-base lg:text-lg opacity-75 max-w-2xl mx-auto">
            From life insurance to business protection - comprehensive coverage 
            for all your insurance needs with competitive premiums and quick claims
          </p>
        </div> */}
      </div>

      <div className="bg-white shadow-2xl overflow-hidden">
        {/* Hero Section */}
        {/* <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Your Perfect Insurance
            </h2>
            <p className="text-lg lg:text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              Compare plans, check coverage, and get instant quotes across all insurance 
              categories. Your peace of mind is just one click away.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="text-2xl lg:text-3xl font-bold mb-2">1Cr+</div>
                <div className="opacity-90">Policies Sold</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl lg:text-3xl font-bold mb-2">98%</div>
                <div className="opacity-90">Claim Settlement</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl lg:text-3xl font-bold mb-2">4.9★</div>
                <div className="opacity-90">Customer Rating</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Insurance Types Section */}
        <div className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Choose Your Insurance Type
            </h3>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of insurance products designed to protect 
              what matters most to you
            </p>
          </div>

          {/* Insurance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceTypes.map((insurance) => {
              const IconComponent = insurance.icon;
              return (
                <div
                  key={insurance.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group flex flex-col relative"
                >
                  {insurance.popular && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>
                  )}
                  
                  {/* Icon and Header */}
                  <div className="flex items-center mb-4">
                    <div
                      className={`bg-gradient-to-r ${insurance.gradient} p-3 rounded-xl`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-bold text-gray-800">
                        {insurance.title}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="font-semibold text-green-600">
                          {insurance.premium}
                        </span>
                        <span>{insurance.coverage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {insurance.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-1 gap-2">
                      {insurance.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <button
                      onClick={() => router.push(`/insurance/${insurance.id}`)}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-3 py-2 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-50 text-sm"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/insurance/${insurance.id}/quote`)
                      }
                      className={`flex-1 bg-gradient-to-r ${insurance.gradient} hover:scale-105 text-white px-3 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm`}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why Choose Us */}
          <section className="py-12 bg-white mt-16 rounded-2xl shadow-lg">
            <div className="mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Why Choose Us
                </h2>
                <p className="text-gray-600">
                  Your trusted insurance partner with unmatched benefits
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-blue-500 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Claim Process */}
          <section className="py-12 bg-gray-100 mt-8 rounded-2xl">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Simple Claim Process
                </h2>
                <p className="text-gray-600">
                  Get your claims settled in just 4 easy steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {claimSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="bg-emerald-500 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto">
                        <step.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-emerald-100 text-emerald-600 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default InsuranceLandingPage;