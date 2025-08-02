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
  Clock,
  User,
  Award,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { FaRocket } from "react-icons/fa";
import Link from "next/link";

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

const CreditCardApplyPage = () => {
  const [selectedCard, setSelectedCard] = useState('premium');
  const [showApplication, setShowApplication] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    panNumber: '',
    aadharNumber: '',
    annualIncome: '',
    employmentType: '',
    company: '',
    address: '',
    city: '',
    pincode: '',
    cardType: 'premium'
  });

  const creditCards = [
    {
      id: 'pixel',
      name: 'HDFC Bank PIXEL Credit Card',
      type: 'Lifestyle',
      annualFee: '₹0',
      joiningFee: '₹0',
      gradient: 'from-blue-500 to-purple-600',
      popular: true,
      features: [
        '5% CashBack on choice of any 2 Packs - Dining & Entertainment, Travel, Grocery, Electronics, Fashion',
        '3% CashBack on choice of any one e-commerce merchant - Amazon or Flipkart or PayZapp',
        '1% Unlimited CashBack on all spends',
        '1% Cashback on UPI Spends (RuPay variant)',
        'Customize your card design and billing cycle',
        'Up to 50 days interest-free credit period'
      ],
      highlights: {
        cashback: '5%',
        creditLimit: '₹2,00,000',
        rewardPoints: 'CashBack System'
      }
    },
    {
      id: 'millennia',
      name: 'HDFC Millennia Credit Card',
      type: 'Online Shopping',
      annualFee: '₹1,000',
      joiningFee: '₹1,000',
      gradient: 'from-green-500 to-teal-600',
      features: [
        '5% Cashback on Amazon, BookMyShow, Cult.fit, Flipkart, Myntra, Sony LIV, Swiggy, Tata CLiQ, Uber and Zomato',
        '1% Cashback on other spends',
        '₹1000 worth gift vouchers on spends of ₹1,00,000 and above in each calendar quarter',
        '10X CashPoints on Amazon, Flipkart, Swiggy, Reliance Smart SuperStore & BigBasket',
        'Up to 50 days interest-free credit period'
      ],
      highlights: {
        cashback: '5%',
        creditLimit: '₹3,00,000',
        rewardPoints: '10X CashPoints'
      }
    },
    {
      id: 'freedom',
      name: 'HDFC Freedom Credit Card',
      type: 'Cashback',
      annualFee: '₹500',
      joiningFee: '₹500',
      gradient: 'from-orange-500 to-red-600',
      features: [
        '10X CashPoints on Big Basket, BookMyShow, OYO, Swiggy & Uber',
        '1 CashPoint per ₹150 spent on other spends',
        'Get ₹500 gift voucher on spends of ₹50,000 per calendar quarter',
        'Up to 50 days interest-free credit period',
        '2 CashPoints per ₹150 spent on other spends'
      ],
      highlights: {
        cashback: '10X',
        creditLimit: '₹1,50,000',
        rewardPoints: '10X CashPoints'
      }
    },
    {
      id: 'fuelplus',
      name: 'HDFC FuelPlus Credit Card',
      type: 'Fuel',
      annualFee: '₹500',
      joiningFee: '₹500',
      gradient: 'from-yellow-500 to-orange-600',
      features: [
        'Earn up to 50 Liters of Free fuel annually',
        'Earn 5% of your spends as Fuel Points at IndianOil outlets, Groceries and Bill Payments',
        'Earn 1 Fuel Point for every Rs. 150 spent on all other purchases',
        'Enjoy 1% Fuel Surcharge waiver',
        'Up to 50 days interest-free period'
      ],
      highlights: {
        cashback: '5%',
        creditLimit: '₹1,00,000',
        rewardPoints: 'Fuel Points'
      }
    },
    {
      id: 'swiggy',
      name: 'HDFC Swiggy Credit Card',
      type: 'Food & Entertainment',
      annualFee: '₹500',
      joiningFee: '₹500',
      gradient: 'from-orange-600 to-pink-600',
      features: [
        '10% Cashback on Swiggy application (Food ordering, Instamart, Dineout & Genie)',
        'Buy 1 Get 1 Free on all tickets via BookMyShow',
        '5X Reward Points on Swiggy and Zomato',
        'Complimentary Swiggy One Membership for 3 months on card activation',
        'Complimentary Annual Memberships of Swiggy One and Times Prime as Welcome Benefit'
      ],
      highlights: {
        cashback: '10%',
        creditLimit: '₹2,00,000',
        rewardPoints: '5X Points'
      }
    },
    {
      id: 'regalia',
      name: 'HDFC Regalia Credit Card',
      type: 'Premium Lifestyle',
      annualFee: '₹2,500',
      joiningFee: '₹2,500',
      gradient: 'from-purple-600 to-indigo-700',
      features: [
        '₹1,500 worth Marriott, Decathlon & more vouchers on quarterly spends of Rs. 1.5 lakh',
        '8 Complimentary airport lounge access worldwide',
        '4 Reward Points for every ₹150 spent',
        'Up to 10X Reward Points via SmartBuy',
        '2X Reward Points on Weekend Dining',
        'Global Personal Concierge - 24 X 7'
      ],
      highlights: {
        cashback: '4X',
        creditLimit: '₹5,00,000',
        rewardPoints: '10X via SmartBuy'
      }
    },
    {
      id: 'tataneu',
      name: 'HDFC Tata Neu Credit Card',
      type: 'Co-branded',
      annualFee: '₹750',
      joiningFee: '₹750',
      gradient: 'from-blue-600 to-purple-700',
      features: [
        '2% back as NeuCoins on Tata Neu and partner Tata Brand Spends',
        'Additional 5% back as NeuCoins on Tata Neu Spends, post registering for Tata NeuPass',
        '1% back as NeuCoins on other spends',
        '1 NeuCoin = ₹1, redeemable on Tata Neu App',
        '4 Complimentary Domestic Airport Lounge Access'
      ],
      highlights: {
        cashback: '5%',
        creditLimit: '₹2,50,000',
        rewardPoints: 'NeuCoins 1:1'
      }
    },
    {
      id: 'indianoil',
      name: 'HDFC IndianOil Credit Card',
      type: 'Fuel',
      annualFee: '₹500',
      joiningFee: '₹500',
      gradient: 'from-green-600 to-blue-600',
      features: [
        'Earn up to 50 Liters of Free fuel annually',
        'Earn 5% of your spends as Fuel Points at IndianOil outlets, Groceries and Bill Payments',
        'Earn 1 Fuel Point for every Rs. 150 spent on all other purchases',
        'Enjoy 1% Fuel Surcharge waiver',
        'Complimentary Club Vistara Silver Tier and MMT Black Elite membership as Welcome benefits'
      ],
      highlights: {
        cashback: '5%',
        creditLimit: '₹1,50,000',
        rewardPoints: 'Fuel Points'
      }
    },
    {
      id: 'marriott',
      name: 'HDFC Marriott Credit Card',
      type: 'Travel & Hospitality',
      annualFee: '₹3,000',
      joiningFee: '₹3,000',
      gradient: 'from-red-600 to-purple-700',
      features: [
        '1 Free Night Award at hotels participating in Marriott Bonvoy® (up to 15,000 Marriott Bonvoy Points)',
        'Marriott Bonvoy® Silver Elite Status & 10 Elite Night Credits',
        'Earn 8 Marriott Bonvoy Points per Rs. 150 spent at hotels participating in Marriott Bonvoy',
        'Earn 4 Marriott Bonvoy Points per Rs. 150 spent on travel, dining & entertainment',
        'Earn 2 Marriott Bonvoy Points per Rs. 150 spent on all other applicable purchases'
      ],
      highlights: {
        cashback: '8X',
        creditLimit: '₹4,00,000',
        rewardPoints: 'Marriott Bonvoy Points'
      }
    },
    {
      id: 'infinia',
      name: 'HDFC Infinia Credit Card',
      type: 'Super Premium',
      annualFee: '₹12,500',
      joiningFee: '₹12,500',
      gradient: 'from-gray-800 to-yellow-600',
      features: [
        '5 Reward Points for every ₹150 spent',
        'Complimentary Club Marriott membership for first year',
        'Complimentary nights & weekend buffet at participating ITC hotels',
        'Unlimited Complimentary golf games at leading courses across India and select courses across the world',
        'Global Personal Concierge - 24 X 7',
        'Metal Card',
        'Unlimited Airport Lounge Access'
      ],
      highlights: {
        cashback: '5X',
        creditLimit: '₹10,00,000+',
        rewardPoints: '5 per ₹150'
      }
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Advanced fraud protection and zero liability on unauthorized transactions'
    },
    {
      icon: Gift,
      title: 'Reward Points',
      description: 'Earn points on every purchase and redeem for exciting rewards'
    },
    {
      icon: Plane,
      title: 'Travel Benefits',
      description: 'Airport lounge access, travel insurance, and exclusive travel deals'
    },
    {
      icon: Smartphone,
      title: 'Digital Wallet',
      description: 'UPI payments, contactless transactions, and mobile app control'
    }
  ];

  const eligibilityCriteria = [
    { label: 'Age', value: '21-65 years' },
    { label: 'Income', value: '₹3,00,000+ annually' },
    { label: 'Employment', value: 'Salaried/Self-employed' },
    { label: 'Credit Score', value: '700+ preferred' }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: 'Choose Card',
      description: 'Select the credit card that suits your lifestyle',
      icon: CreditCard
    },
    {
      step: 2,
      title: 'Fill Application',
      description: 'Complete the online application form',
      icon: User
    },
    {
      step: 3,
      title: 'Document Upload',
      description: 'Upload required documents for verification',
      icon: Shield
    },
    {
      step: 4,
      title: 'Get Approved',
      description: 'Receive instant approval and card delivery',
      icon: CheckCircle
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will contact you within 24 hours.');
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
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-24 lg:pt-45 lg:pb-28 xl:pt-45 xl:pb-32 relative overflow-hidden">
        {/* <div className="absolute inset-0 opacity-10 z-0"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div> */}

        <div className="max-w-[1700px] mx-auto px-6 relative z-10">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="rounded-3xl overflow-hidden shadow-2xl "
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col lg:flex-row h-[800px] items-center justify-between backdrop-blur-xl bg-gradient-to-r ${slide.gradient}/90 p-8 rounded-3xl shadow-2xl border border-white/20
`}
                >
                  <div className="w-full lg:w-1/2 space-y-8">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="uppercase tracking-widest text-sm text-yellow-200 font-semibold"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl text-white/90 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <Link href={slide.path}>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                      >
                        Know More
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full lg:w-1/2 h-full relative"
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
    <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
      {/* Floating Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-24 lg:pt-45 lg:pb-28 xl:pt-45 xl:pb-32 relative overflow-hidden">
        {/* <div className="absolute inset-0 opacity-10 z-0"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div> */}

        <div className="max-w-[1700px] mx-auto px-6 relative z-10">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="rounded-3xl overflow-hidden shadow-2xl "
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col lg:flex-row h-[800px] items-center justify-between backdrop-blur-xl bg-gradient-to-r ${slide.gradient}/90 p-8 rounded-3xl shadow-2xl border border-white/20
`}
                >
                  <div className="w-full lg:w-1/2 space-y-8">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="uppercase tracking-widest text-sm text-yellow-200 font-semibold"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl text-white/90 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <Link href={slide.path}>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                      >
                        Know More
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full lg:w-1/2 h-full relative"
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Apply for Credit Card Online
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get instant approval and unlock a world of financial freedom with exclusive rewards, 
              cashback, and premium benefits
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Instant Approval</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span>Premium Benefits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Credit Cards?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of convenience, security, and rewards with our premium credit card offerings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Cards List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Credit Card</h2>
            <p className="text-gray-600">Explore our comprehensive range of 10 credit cards designed for different lifestyles and needs</p>
          </div>
          
          {/* Quick Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">All Cards</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">Cashback</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">Travel</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">Fuel</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">Premium</button>
          </div>
          
          <div className="space-y-6">
            {creditCards.map((card, index) => (
              <div 
                key={card.id} 
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  selectedCard === card.id ? 'ring-4 ring-blue-500 transform scale-[1.02]' : ''
                } ${card.popular ? 'border-2 border-purple-500' : ''}`}
              >
                {card.popular && (
                  <div className="absolute top-6 right-6 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                    Most Popular
                  </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                  {/* Card Visual */}
                  <div className="lg:col-span-3">
                    <div className={`h-48 bg-gradient-to-br ${card.gradient} p-6 text-white relative rounded-xl`}>
                      <div className="absolute top-4 left-6">
                        <CreditCard className="h-8 w-8" />
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <h3 className="text-lg font-bold">{card.name}</h3>
                        <p className="text-sm opacity-90">{card.type}</p>
                      </div>
                      <div className="absolute bottom-6 right-6">
                        <div className="w-16 h-10 bg-white/20 rounded backdrop-blur-sm flex items-center justify-center">
                          <span className="text-xs font-bold">VISA</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-6">
                        <div className="text-right">
                          <div className="text-sm opacity-75">Card #{index + 1}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="lg:col-span-6">
                    <div className="h-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{card.name}</h3>
                      <p className="text-gray-600 mb-4">{card.type} Credit Card</p>
                      
                      {/* Key Highlights */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-lg text-blue-600">{card.highlights.cashback}</div>
                          <div className="text-xs text-gray-600">Max Cashback</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-green-600">{card.highlights.creditLimit}</div>
                          <div className="text-xs text-gray-600">Credit Limit</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg text-purple-600">{card.highlights.rewardPoints}</div>
                          <div className="text-xs text-gray-600">Rewards</div>
                        </div>
                      </div>

                      {/* Key Features - First 3 */}
                      <div className="space-y-2 flex-1">
                        {card.features.slice(0, 3).map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                        {card.features.length > 3 && (
                          <div className="text-sm text-blue-600 font-medium">
                            +{card.features.length - 3} more benefits
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="lg:col-span-3">
                    <div className="h-full flex flex-col justify-between">
                      {/* Pricing */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Joining Fee:</span>
                            <span className="font-bold text-gray-900">{card.joiningFee}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Annual Fee:</span>
                            <span className="font-bold text-gray-900">{card.annualFee}</span>
                          </div>
                        </div>

                        {/* Special Offers */}
                        {card.joiningFee === '₹0' && (
                          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                            <div className="flex items-center">
                              <Gift className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm text-green-800 font-medium">Lifetime Free</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 mt-6">
                        <button
                          onClick={() => {
                            setSelectedCard(card.id);
                            setFormData({ ...formData, cardType: card.id });
                          }}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                            selectedCard === card.id
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {selectedCard === card.id ? 'Selected' : 'Select Card'}
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedCard(card.id);
                            setFormData({ ...formData, cardType: card.id });
                            setShowApplication(true);
                          }}
                          className="w-full py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all hover:cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Features Section */}
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-3">Complete Benefits & Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {card.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Application Process</h2>
            <p className="text-gray-600">Get your credit card in just 4 easy steps</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <p className="text-gray-600">Check if you meet our simple eligibility requirements</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {eligibilityCriteria.map((criteria, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{criteria.label}</h3>
                <p className="text-blue-600 font-medium">{criteria.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {showApplication && (
        <section className="py-16 bg-white text-black">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Credit Card Application</h2>
              <p className="text-gray-600">Fill in your details to apply for your selected credit card</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="ABCDE1234F"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Employment & Financial Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment & Financial Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Employment Type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="business">Business Owner</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income *</label>
                    <select
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Annual Income</option>
                      <option value="3-5">₹3-5 Lakhs</option>
                      <option value="5-10">₹5-10 Lakhs</option>
                      <option value="10-15">₹10-15 Lakhs</option>
                      <option value="15-25">₹15-25 Lakhs</option>
                      <option value="25+">₹25+ Lakhs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the <span className="text-blue-600 underline">Terms & Conditions</span> and 
                    <span className="text-blue-600 underline"> Privacy Policy</span>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  Submit Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!showApplication && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers and start enjoying premium credit card benefits today
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
      )}
    </div>
    </>
  );
};

export default CreditCardApplyPage;