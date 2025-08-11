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
} from "lucide-react";

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

const CreditCardApplyPage = () => {
  const [selectedCard, setSelectedCard] = useState("premium");
  const [showApplication, setShowApplication] = useState(false);
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
    {
      id: "millennia",
      name: "HDFC Millennia Credit Card",
      type: "Online Shopping",
      annualFee: "₹1,000",
      joiningFee: "₹1,000",
      gradient: "from-green-500 to-teal-600",
      features: [
        "5% Cashback on Amazon, BookMyShow, Cult.fit, Flipkart, Myntra, Sony LIV, Swiggy, Tata CLiQ, Uber and Zomato",
        "1% Cashback on other spends",
        "₹1000 worth gift vouchers on spends of ₹1,00,000 and above in each calendar quarter",
        "10X CashPoints on Amazon, Flipkart, Swiggy, Reliance Smart SuperStore & BigBasket",
        "Up to 50 days interest-free credit period",
      ],
      highlights: {
        cashback: "5%",
        creditLimit: "₹3,00,000",
        rewardPoints: "10X CashPoints",
      },
    },
    {
      id: "freedom",
      name: "HDFC Freedom Credit Card",
      type: "Cashback",
      annualFee: "₹500",
      joiningFee: "₹500",
      gradient: "from-orange-500 to-red-600",
      features: [
        "10X CashPoints on Big Basket, BookMyShow, OYO, Swiggy & Uber",
        "1 CashPoint per ₹150 spent on other spends",
        "Get ₹500 gift voucher on spends of ₹50,000 per calendar quarter",
        "Up to 50 days interest-free credit period",
        "2 CashPoints per ₹150 spent on other spends",
      ],
      highlights: {
        cashback: "10X",
        creditLimit: "₹1,50,000",
        rewardPoints: "10X CashPoints",
      },
    },
    {
      id: "fuelplus",
      name: "HDFC FuelPlus Credit Card",
      type: "Fuel",
      annualFee: "₹500",
      joiningFee: "₹500",
      gradient: "from-yellow-500 to-orange-600",
      features: [
        "Earn up to 50 Liters of Free fuel annually",
        "Earn 5% of your spends as Fuel Points at IndianOil outlets, Groceries and Bill Payments",
        "Earn 1 Fuel Point for every Rs. 150 spent on all other purchases",
        "Enjoy 1% Fuel Surcharge waiver",
        "Up to 50 days interest-free period",
      ],
      highlights: {
        cashback: "5%",
        creditLimit: "₹1,00,000",
        rewardPoints: "Fuel Points",
      },
    },
    {
      id: "swiggy",
      name: "HDFC Swiggy Credit Card",
      type: "Food & Entertainment",
      annualFee: "₹500",
      joiningFee: "₹500",
      gradient: "from-orange-600 to-pink-600",
      features: [
        "10% Cashback on Swiggy application (Food ordering, Instamart, Dineout & Genie)",
        "Buy 1 Get 1 Free on all tickets via BookMyShow",
        "5X Reward Points on Swiggy and Zomato",
        "Complimentary Swiggy One Membership for 3 months on card activation",
        "Complimentary Annual Memberships of Swiggy One and Times Prime as Welcome Benefit",
      ],
      highlights: {
        cashback: "10%",
        creditLimit: "₹2,00,000",
        rewardPoints: "5X Points",
      },
    },
    {
      id: "regalia",
      name: "HDFC Regalia Credit Card",
      type: "Premium Lifestyle",
      annualFee: "₹2,500",
      joiningFee: "₹2,500",
      gradient: "from-purple-600 to-indigo-700",
      features: [
        "₹1,500 worth Marriott, Decathlon & more vouchers on quarterly spends of Rs. 1.5 lakh",
        "8 Complimentary airport lounge access worldwide",
        "4 Reward Points for every ₹150 spent",
        "Up to 10X Reward Points via SmartBuy",
        "2X Reward Points on Weekend Dining",
        "Global Personal Concierge - 24 X 7",
      ],
      highlights: {
        cashback: "4X",
        creditLimit: "₹5,00,000",
        rewardPoints: "10X via SmartBuy",
      },
    },
    {
      id: "tataneu",
      name: "HDFC Tata Neu Credit Card",
      type: "Co-branded",
      annualFee: "₹750",
      joiningFee: "₹750",
      gradient: "from-blue-600 to-purple-700",
      features: [
        "2% back as NeuCoins on Tata Neu and partner Tata Brand Spends",
        "Additional 5% back as NeuCoins on Tata Neu Spends, post registering for Tata NeuPass",
        "1% back as NeuCoins on other spends",
        "1 NeuCoin = ₹1, redeemable on Tata Neu App",
        "4 Complimentary Domestic Airport Lounge Access",
      ],
      highlights: {
        cashback: "5%",
        creditLimit: "₹2,50,000",
        rewardPoints: "NeuCoins 1:1",
      },
    },
    {
      id: "indianoil",
      name: "HDFC IndianOil Credit Card",
      type: "Fuel",
      annualFee: "₹500",
      joiningFee: "₹500",
      gradient: "from-green-600 to-blue-600",
      features: [
        "Earn up to 50 Liters of Free fuel annually",
        "Earn 5% of your spends as Fuel Points at IndianOil outlets, Groceries and Bill Payments",
        "Earn 1 Fuel Point for every Rs. 150 spent on all other purchases",
        "Enjoy 1% Fuel Surcharge waiver",
        "Complimentary Club Vistara Silver Tier and MMT Black Elite membership as Welcome benefits",
      ],
      highlights: {
        cashback: "5%",
        creditLimit: "₹1,50,000",
        rewardPoints: "Fuel Points",
      },
    },
    {
      id: "marriott",
      name: "HDFC Marriott Credit Card",
      type: "Travel & Hospitality",
      annualFee: "₹3,000",
      joiningFee: "₹3,000",
      gradient: "from-red-600 to-purple-700",
      features: [
        "1 Free Night Award at hotels participating in Marriott Bonvoy® (up to 15,000 Marriott Bonvoy Points)",
        "Marriott Bonvoy® Silver Elite Status & 10 Elite Night Credits",
        "Earn 8 Marriott Bonvoy Points per Rs. 150 spent at hotels participating in Marriott Bonvoy",
        "Earn 4 Marriott Bonvoy Points per Rs. 150 spent on travel, dining & entertainment",
        "Earn 2 Marriott Bonvoy Points per Rs. 150 spent on all other applicable purchases",
      ],
      highlights: {
        cashback: "8X",
        creditLimit: "₹4,00,000",
        rewardPoints: "Marriott Bonvoy Points",
      },
    },
    {
      id: "infinia",
      name: "HDFC Infinia Credit Card",
      type: "Super Premium",
      annualFee: "₹12,500",
      joiningFee: "₹12,500",
      gradient: "from-gray-800 to-yellow-600",
      features: [
        "5 Reward Points for every ₹150 spent",
        "Complimentary Club Marriott membership for first year",
        "Complimentary nights & weekend buffet at participating ITC hotels",
        "Unlimited Complimentary golf games at leading courses across India and select courses across the world",
        "Global Personal Concierge - 24 X 7",
        "Metal Card",
        "Unlimited Airport Lounge Access",
      ],
      highlights: {
        cashback: "5X",
        creditLimit: "₹10,00,000+",
        rewardPoints: "5 per ₹150",
      },
    },
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
      icon: <FaChartLine className="text-2xl" />,
      link: "/mutual-funds/all"
    },
    {
      id: 2,
      title: "Loan Against Mutual Funds",
      description: "Unlock quick cash by pledging funds. Cover expenses smartly without selling your long-term mutual fund investments.",
      icon: <FaHandHoldingUsd className="text-2xl" />,
      link: "/mutual-funds/loan"
    },
    {
      id: 3,
      title: "Sovereign Gold Bonds (SGBs)",
      description: "Grow wealth safely in gold. Earn interest, skip storage worries, and keep your portfolio shining bright.",
      icon: <FaGem className="text-2xl" />,
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
        {/* Floating Background Elements */}
        {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div> */}

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

          {/* Swiper Pagination is now styled */}
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {card.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {card.description}
                </p>
                
                <div className="text-center">
                  <a 
                    href={card.link}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Learn More
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

        {/* Application Process */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Simple Application Process
              </h2>
              <p className="text-gray-600">
                Get your credit card in just 4 easy steps
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
        </section> */}

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
                onClick={() => alert("Open Demat Account clicked")}
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
                onClick={() => alert("Already Have An Account clicked")}
                className="mt-8 w-fit border border-blue-600 text-blue-600 px-6 py-3 rounded-full text-base font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Click here
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* {!showApplication && (
          <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of satisfied customers and start enjoying premium
                credit card benefits today
              </p>
              <button
                onClick={() => setShowApplication(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </section>
        )} */}
      </div>
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
    </>
  );
};

export default CreditCardApplyPage;
