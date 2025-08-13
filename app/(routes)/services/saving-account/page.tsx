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
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { FaAward, FaMobileAlt, FaPiggyBank, FaRocket, FaWallet } from "react-icons/fa";
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
    <section className="bg-blue-50 pt-16 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-14">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/people.png" // Replace with your image
              alt="Banking team"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Enjoy <span className="text-blue-600">Zero Fee Banking</span> on your Saving Account
            </h2>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-center gap-3">
                <Building2 className="text-blue-600" size={20} />
                RTGS, NEFT, IMPS
              </li>
              <li className="flex items-center gap-3">
                <CreditCard className="text-blue-600" size={20} />
                ATM Transactions, Debit Card
              </li>
              <li className="flex items-center gap-3">
                <Bell className="text-blue-600" size={20} />
                SMS Alerts & <span className="underline cursor-pointer">30 more services</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bank Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* IndusInd Bank */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src="/indus.png" alt="IndusInd Bank" width={40} height={40} />
              </div>
              <h3 className="text-3xl font-semibold text-blue-900">IndusInd Bank</h3>
            </div>
            <ul className="list-disc list-inside text-blue-800 text-sm space-y-2">
              <li>Choose your phone number as your account number.</li>
              <li>Zero AMC charges on your digital card.</li>
              <li>Complete application support.</li>
              <li>Minimum initial deposit ₹5,000.</li>
              <li>Withdrawals allowed after funding completion.</li>
              <li>No hidden charges.</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <Link href="#" className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition text-sm">
                Learn More
              </Link>
              <Link href="#" className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition text-sm">
                Apply
              </Link>
            </div>
          </div>

          {/* Axis Bank */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src="/axis.png" alt="Axis Bank" width={40} height={40} />
              </div>
              <h3 className="text-3xl font-semibold text-blue-900">Axis Bank</h3>
            </div>
            <ul className="list-disc list-inside text-blue-800 text-sm space-y-2">
              <li>Balance requirements vary by branch.</li>
              <li>Range ₹2,500 to ₹10,000 for regular accounts.</li>
              <li>Metro branches require ₹5,000 average balance.</li>
              <li>Lower requirements in rural branches.</li>
              <li>Full application support.</li>
              <li>No hidden charges.</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <Link href="#" className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition text-sm">
                Learn More
              </Link>
              <Link href="#" className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition text-sm">
                Apply
              </Link>
            </div>
          </div>

          {/* Fi Bank */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src="/fi.png" alt="Fi Bank" width={40} height={40} />
              </div>
              <h3 className="text-3xl font-semibold text-blue-900">Fi Bank</h3>
            </div>
            <ul className="list-disc list-inside text-blue-800 text-sm space-y-2">
              <li>No minimum balance, total freedom.</li>
              <li>Keep money flexible, no balance requirements.</li>
              <li>Zero balance account option.</li>
              <li>Simple, convenient banking.</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <Link href="#" className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition text-sm">
                Learn More
              </Link>
              <Link href="#" className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition text-sm">
                Apply
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  );
};

export default CreditCardApplyPage;