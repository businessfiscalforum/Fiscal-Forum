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
  Building2,
  Bell,
  Star,
  Users,
  Award,
  TrendingUp,
  Zap,
  Lock,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaAward,
  FaMobileAlt,
  FaPiggyBank,
  FaRocket,
  FaWallet,
  FaChartLine,
  FaRupeeSign,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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

  const bankOffers = [
    {
      id: 1,
      name: "IndusInd Bank",
      logo: "/indus.png",
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
      offer: "Rewards",
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
      offer: "Rewards",
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
      offer: "Rewards",
    },
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
      <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
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

        {/* Zero Fee Banking Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Enjoy <span className="text-blue-600">Zero Fee Banking</span> on
                your Saving Account
              </h2>
              <p className="text-lg text-blue-700 max-w-3xl mx-auto">
                Experience hassle-free banking with no hidden charges and
                complete transparency
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6">
                    Key Benefits
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-blue-600 w-4 h-4" />
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
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="text-blue-600 w-4 h-4" />
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
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bell className="text-blue-600 w-4 h-4" />
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
                      <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FaChartLine className="text-blue-600 w-4 h-4" />
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
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/people.png"
                      alt="Banking team"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                        <Star className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">4.9/5 Rating</p>
                        <p className="text-sm text-gray-600">
                          Based on 15,000+ reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Offers Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Exclusive Bank Offers
              </h2>
              <p className="text-lg text-blue-700 max-w-3xl mx-auto">
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
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100 transition-all duration-300 flex flex-col"
                >
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                  {/* Main content fills available height */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    {/* Top section */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center">
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
                            <div className="flex items-center gap-1">
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
                            </div>
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
                        {bank.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0 w-4 h-4" />
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Buttons section always at bottom */}
                    <div className="flex gap-3 mt-auto">
                      <Link href="#" className="flex-1">
                        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                          Learn More
                        </button>
                      </Link>
                      <Link href="#" className="flex-1">
                        <button className="w-full bg-white border-2 border-blue-500 text-blue-600 px-4 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Banking Solutions?
              </h2>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                Experience the future of banking with our innovative services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mb-4">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Processing</h3>
                <p className="text-indigo-200">
                  Get your account opened within 15 minutes with digital KYC
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-4">
                  <Lock className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
                <p className="text-indigo-200">
                  Advanced encryption and multi-factor authentication for
                  complete safety
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-4">
                  <Users className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                <p className="text-indigo-200">
                  Dedicated customer service available anytime, anywhere
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mb-4">
                  <Award className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Award Winning</h3>
                <p className="text-indigo-200">
                  Recognized as the best digital banking platform of 2024
                </p>
              </div>
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
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200"></div>
                  )}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white border-2 border-blue-500 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Banking Experience?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers enjoying zero-fee banking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                Call Now: +91 8010-888-888
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                Email Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreditCardApplyPage;
