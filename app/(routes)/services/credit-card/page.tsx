// app/credit-cards/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFilePdf, FaInfoCircle, FaStar } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

// Define the enhanced card data type
interface CreditCard {
  id: string;
  bank: string;
  logo: string;
  cardName: string;
  // --- New Fields ---
  cardImage: string;
  tagline?: string;
  cashbackRate?: string;
  rewardPoints?: string;
  welcomeBonus?: string;
  features: string[]; // Concise list for grid view
  detailedBenefits: string[]; // Detailed list for modal
  // --- End New Fields ---
  benefits: string[]; // Original benefits list
  eligibilityNote: string;
  howToApply: string[];
  pdfLink: string;
  applyLink: string;
}

// Enhanced Data for credit cards with new fields
const creditCards: CreditCard[] = [
  {
    id: "hdfc",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC Credit Cards",
    cardImage: "/Hdfc Bank.svg", // Placeholder
    tagline: "Versatile Rewards & Benefits",
    cashbackRate: "Up to 10%",
    rewardPoints: "Reward Points/Cashback",
    welcomeBonus: "Varies by Card",
    features: [
      "Reward points/cashback",
      "Airport lounge access",
      "Zero liability protection",
      "EMI conversion",
      "Up to 10% cashback offers",
      "Fuel surcharge waiver",
    ],
    detailedBenefits: [
      "Earn reward points or cashback on all purchases (varies by specific card).",
      "Complimentary access to airport lounges (e.g., 6 visits/year on some cards).",
      "Zero liability protection against unauthorized transactions.",
      "Convert high-value purchases into easy EMIs.",
      "Avail cashback offers up to 10% on select categories (e.g., online spends, Amazon, Flipkart, Swiggy).",
      "Get 1% fuel surcharge waiver on transactions between ₹500 and ₹4000.",
      "Dining discounts at partner outlets (e.g., 15% off).",
    ],
    benefits: [
      "Reward points on every purchase",
      "Airport lounge access",
      "Zero liability protection",
      "EMI conversion facility",
      "Cashback offers up to 10%",
      "Fuel surcharge waiver",
    ],
    eligibilityNote: "Fill in your details to check eligibility. HDFC will suggest the most suitable card based on your income and credit score.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1ey1TyO_pAKxOMzkbwKnlzFrKGaWxhAQY/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19iYW5r&bank_source=aGRmY19iYW5r&agent_code=",
  },
  {
    id: "indusind",
    bank: "IndusInd Bank",
    logo: "/indusind.png",
    cardName: "IndusInd Credit Cards",
    cardImage: "/Indusind Bank.svg", // Placeholder
    tagline: "Premium Lifestyle Rewards",
    cashbackRate: "Up to 10%",
    rewardPoints: "Edge Points / Rewards",
    welcomeBonus: "Varies by Card",
    features: [
      "Platinum Aura & Edge benefits",
      "Unlimited rewards on shopping",
      "Fuel surcharge waiver",
      "Movie & dining discounts",
      "Free add-on cards",
      "Fast-track airport security",
    ],
    detailedBenefits: [
      "Earn high reward points (e.g., 8 Edge Points per ₹100 on select spends).",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹4000.",
      "2 complimentary movie tickets per month via BookMyShow (on some cards).",
      "Complimentary domestic lounge visits (e.g., 4 visits/quarter).",
      "Exclusive travel, dining, and shopping privileges.",
      "Free add-on cards for family members (terms apply).",
      "Fast-track security clearance at airports.",
      "Personal Accident and Lost Baggage Insurance.",
    ],
    benefits: [
      "Platinum Aura & Edge benefits",
      "Unlimited rewards on shopping",
      "Fuel surcharge waiver",
      "Movie & dining discounts",
      "Free add-on cards",
      "Fast-track airport security",
    ],
    eligibilityNote: "Submit your details to know eligibility. IndusInd will recommend the best card option based on your profile and financials.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1eKIZY1oSNe_Ot9584QsVzmIu1MWHoxte/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aW5kdXNpbmRfYmFuaw==&bank_source=aW5kdXNfYmFuaw==&agent_code=",
  },
  {
    id: "hsbc",
    bank: "HSBC Bank",
    logo: "/hsbc.png",
    cardName: "HSBC Credit Cards",
    cardImage: "/Hsbc Bank.svg", // Placeholder
    tagline: "Flat Cashback on All Spends",
    cashbackRate: "5%",
    rewardPoints: "HSBC Rewards",
    welcomeBonus: "Varies by Card",
    features: [
      "Flat 5% cashback on all spends",
      "No joining or annual fees*",
      "Global acceptance",
      "Contactless payments",
      "24x7 concierge service",
      "Travel & dining privileges",
    ],
    detailedBenefits: [
      "Flat 5% cashback on all domestic and international spends.",
      "No joining fee and no annual fee (subject to HSBC terms and conditions).",
      "Earn HSBC Rewards points per ₹100 spent.",
      "Complimentary membership to HSBC Global Concierge Services.",
      "Exclusive dining and entertainment discounts.",
      "Travel insurance and purchase protection.",
      "Contactless payment technology for faster checkout.",
    ],
    benefits: [
      "Flat 5% cashback on all spends",
      "No joining or annual fees",
      "Global acceptance",
      "Contactless payments",
      "24x7 concierge service",
      "Travel & dining privileges",
    ],
    eligibilityNote: "Provide your information to verify eligibility. HSBC automatically selects the best card as per your credit history and income.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1TR_E3PojHQQA6UUqgr2cOfPcSCvRcysW/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19iYW5r&bank_source=aHNiY19iYW5r&agent_code=",
  },
  {
    id: "hdfc-swiggy",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC Swiggy Credit Card",
    cardImage: "/Hdfc Swiggy.svg", // Placeholder
    tagline: "Extra Cashback on Food & More",
    cashbackRate: "Up to 10%",
    rewardPoints: "Cashback / Reward Points",
    welcomeBonus: "Complimentary 3 months Swiggy One membership",
    features: [
      "10% cashback on Swiggy",
      "5% cashback on other online spends",
      "Dining discounts",
      "Fuel surcharge waiver",
    ],
    detailedBenefits: [
      "10% cashback on Swiggy orders (food ordering, Instamart, Dineout, Genie).",
      "5% cashback on other online spends (Amazon, Flipkart, etc.).",
      "Complimentary 3 months Swiggy One membership on card activation.",
      "Dining discounts at select partner restaurants.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹4000.",
      "Earn reward points on all other purchases.",
    ],
    benefits: [
      "Extra cashback on Swiggy orders",
      "Dining discounts",
      "Reward points on online spends",
      "Fuel surcharge waiver",
    ],
    eligibilityNote: "Check eligibility by filling your details. HDFC evaluates your credit score and income to provide the most relevant card.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1ey1TyO_pAKxOMzkbwKnlzFrKGaWxhAQY/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19zd2lnZ3k=&bank_source=aGRmY19iYW5r&agent_code=",
  },
  {
    id: "axis-lic",
    bank: "Axis Bank",
    logo: "/axis.png",
    cardName: "Axis LIC Credit Card",
    cardImage: "/Axis Lic.svg", // Placeholder
    tagline: "Rewards on LIC Premiums",
    cashbackRate: "Up to 4%",
    rewardPoints: "Axis Reward Points",
    welcomeBonus: "Varies by Card",
    features: [
      "Reward points on LIC premiums",
      "Airport lounge access",
      "Dining and shopping offers",
    ],
    detailedBenefits: [
      "Earn accelerated Axis Reward Points when paying LIC premiums.",
      "Complimentary access to domestic airport lounges.",
      "Special offers and discounts on dining and shopping.",
      "Earn standard Axis Reward Points on all other spends.",
      "Zero liability for unauthorized transactions.",
    ],
    benefits: [
      "Reward points on LIC premium payments",
      "Airport lounge access",
      "Dining and shopping offers",
    ],
    eligibilityNote: "Fill in your details to proceed. Axis Bank matches your profile with the best LIC credit card variant available.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1jO0DMuJlStdcylan4b9ST_ExLWzN37Kb/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=YXhpc19saWM=&bank_source=YXhpc19saWM=&agent_code=",
  },
  {
    id: "yes-popclub",
    bank: "Yes Bank",
    logo: "/yesbank.png",
    cardName: "Yes Bank Pop Club Credit Card",
    cardImage: "/Yes Popclub.svg", // Placeholder
    tagline: "Flat Cashback on Everything",
    cashbackRate: "5%",
    rewardPoints: "Pop Coins",
    welcomeBonus: "₹500 Cashback",
    features: [
      "Flat 5% cashback on all categories",
      "No annual fee",
      "Instant digital card",
      "Fuel surcharge waiver",
      "Movie & food discounts",
    ],
    detailedBenefits: [
      "Flat 5% cashback on all domestic and international spends.",
      "No annual fee or joining fee.",
      "Instant digital card upon approval.",
      "Earn 10 Pop Coins per ₹100 spent.",
      "Exclusive discounts on movies, dining, and online shopping.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹4000.",
      "Easy redemption of Pop Coins for vouchers or merchandise.",
      "Complimentary lost card liability insurance cover up to your credit limit.",
    ],
    benefits: [
      "Flat 5% cashback on all categories",
      "No annual fee",
      "Instant digital card",
      "Fuel surcharge waiver",
      "Movie & food discounts",
    ],
    eligibilityNote: "Enter your details to check eligibility. Yes Bank will filter the right Pop Club card based on your income and credit record.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1KrMSQ8lPi4_kUYpn41KqlS5gpziYjfWM/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=eWVzX3BvcGNsdWI=&bank_source=eWVzX3BvcGNsdWI=&agent_code=",
  },
  {
    id: "hsbc-liveplus",
    bank: "HSBC Bank",
    logo: "/hsbc.png",
    cardName: "HSBC Live Plus Card",
    cardImage: "/Hsbc Live Plus.svg", // Placeholder
    tagline: "Cashback on Daily Expenses",
    cashbackRate: "Up to 10%",
    rewardPoints: "HSBC Rewards",
    welcomeBonus: "Varies by Card",
    features: [
      "Cashback on daily expenses",
      "Dining & travel discounts",
      "Global acceptance",
    ],
    detailedBenefits: [
      "Earn cashback on everyday spending categories (specific rates vary).",
      "Exclusive dining discounts locally and across Asia.",
      "Travel discounts and offers.",
      "Global acceptance for international transactions.",
      "Earn HSBC Rewards points on all purchases.",
      "Access to HSBC Global Concierge Services.",
    ],
    benefits: [
      "Cashback on daily expenses",
      "Dining & travel discounts",
      "Global acceptance",
    ],
    eligibilityNote: "Provide your details to check eligibility. HSBC recommends Live Plus card based on your spending profile and financial history.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1TR_E3PojHQQA6UUqgr2cOfPcSCvRcysW/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19saXZlX3BsdXM=&bank_source=aHNiY19iYW5r&agent_code=",
  },
  {
    id: "hsbc-travelone",
    bank: "HSBC Bank",
    logo: "/hsbc.png",
    cardName: "HSBC TravelOne Card",
    cardImage: "/Hsbc Travelone card.svg", // Placeholder
    tagline: "Earn Air Miles & Travel Perks",
    cashbackRate: "Miles/Points per ₹100",
    rewardPoints: "HSBC Rewards / Air Miles",
    welcomeBonus: "Varies by Card",
    features: [
      "Air miles on every spend",
      "Airport lounge access",
      "Travel insurance",
    ],
    detailedBenefits: [
      "Earn air miles or HSBC Rewards points on every rupee spent.",
      "Complimentary access to domestic and international airport lounges.",
      "Comprehensive travel insurance covering accidents, delays, and lost baggage.",
      "Earn accelerated points/miles on travel-related spends.",
      "Priority check-in and boarding privileges (on select airlines).",
      "Travel discounts and exclusive offers.",
    ],
    benefits: [
      "Air miles on every spend",
      "Airport lounge access",
      "Travel insurance",
    ],
    eligibilityNote: "Fill in your details to see if you qualify. HSBC automatically finds the best travel card depending on your income and credit.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1TR_E3PojHQQA6UUqgr2cOfPcSCvRcysW/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY190cmF2ZWxvbmVfY2FyZA==&bank_source=aHNiY19iYW5r&agent_code=",
  },
  {
    id: "axis-fd",
    bank: "Axis Bank",
    logo: "/axis.png",
    cardName: "Axis Bank FD Credit Card",
    cardImage: "/Axis bank Fd Card.svg", // Placeholder
    tagline: "Credit Card Against Fixed Deposit",
    cashbackRate: "N/A",
    rewardPoints: "Axis Reward Points",
    welcomeBonus: "N/A",
    features: [
      "Get a credit card against FD",
      "High approval chances",
      "Low annual fee",
    ],
    detailedBenefits: [
      "Designed for customers holding a Fixed Deposit with Axis Bank.",
      "High approval chances as the credit limit is backed by the FD.",
      "Earn Axis Reward Points on spends.",
      "Lower annual fees compared to regular credit cards.",
      "Standard credit card features like EMI conversion, insurance (subject to terms).",
    ],
    benefits: [
      "Get a credit card against FD",
      "High approval chances",
      "Low annual fee",
    ],
    eligibilityNote: "Enter your details to verify eligibility. Axis offers FD-backed cards based on your deposit and income profile.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1jO0DMuJlStdcylan4b9ST_ExLWzN37Kb/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=YXhpc19iYW5rX2ZkX2NyZWRpdF9jYXJk&bank_source=YXhpc19iYW5r&agent_code=",
  },
  {
    id: "tataneu",
    bank: "TataNeu", // Note: Co-branded with HDFC
    logo: "/tataneu.png",
    cardName: "TataNeu Credit Card",
    cardImage: "/Tataneu Card.svg", // Placeholder
    tagline: "Rewards on Tata Brand Spends",
    cashbackRate: "Up to 5%",
    rewardPoints: "NeuCoins",
    welcomeBonus: "Varies by Card",
    features: [
      "Rewards on Tata brand spends",
      "Shopping discounts",
      "Fuel surcharge waiver",
    ],
    detailedBenefits: [
      "Earn accelerated NeuCoins when shopping at Tata brands (Tata CLiQ, Croma, Tanishq, etc.).",
      "Earn NeuCoins on all other spends.",
      "Exclusive shopping discounts and offers within the Tata ecosystem.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹4000.",
      "Redeem NeuCoins for products, vouchers, or experiences on the Tata Neu platform.",
      "Standard HDFC Bank credit card benefits like insurance, EMI options.",
    ],
    benefits: [
      "Rewards on Tata brand spends",
      "Shopping discounts",
      "Fuel surcharge waiver",
    ],
    eligibilityNote: "Provide your details to check eligibility. TataNeu will suggest the right card based on your spending capacity and profile.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?path=/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/TATA%20Neu%20Infinity%20HDFC%20Bank%20Credit%20Card/TATA_Neu_Infinity_Card_FAQ.pdf",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=dGF0YW5ldV9jYXJk&bank_source=dGF0YW5ldQ==&agent_code=",
  },
  {
    id: "hdfc-giga",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC GIGA Credit Card",
    cardImage: "/Hdfc Giga.svg", // Placeholder
    tagline: "Special Rewards on Online Spends",
    cashbackRate: "Up to 10%",
    rewardPoints: "Giga Points / Cashback",
    welcomeBonus: "Varies by Card",
    features: [
      "Special rewards on online spends",
      "Travel & dining discounts",
      "Fuel surcharge waiver",
    ],
    detailedBenefits: [
      "Earn high rewards (e.g., 10X CashPoints) on top online merchants (Amazon, Flipkart, Swiggy, etc.).",
      "Earn standard rewards on all other spends.",
      "Exclusive travel and dining discounts.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹4000.",
      "Convert purchases into EMIs.",
      "Up to 50 days interest-free credit period.",
    ],
    benefits: [
      "Special rewards on online spends",
      "Travel & dining discounts",
      "Fuel surcharge waiver",
    ],
    eligibilityNote: "Fill your details to know eligibility. HDFC will shortlist GIGA or other suitable cards as per your credit score and income.",
    howToApply: ["Click 'Apply'", "Fill your details", "Get your credit card within 5-7 days"],
    pdfLink: "https://drive.google.com/file/d/1ey1TyO_pAKxOMzkbwKnlzFrKGaWxhAQY/view?usp=sharing",
    applyLink: "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19naWdh&bank_source=Z0lnYV9idXNpbmVzc19jcmVkaXRfY2FyZA==&agent_code=",
  },
];

export default function CreditCardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);

  const openModal = (card: CreditCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800 pt-20"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header className="py-12 px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
            Find Your Perfect Credit Card
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compare top credit cards from leading banks. Discover rewards, cashback, and features tailored to your lifestyle.
          </p>
        </motion.div>
      </header>

      {/* Main Grid */}
      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creditCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 bg-white border border-emerald-100 flex flex-col h-full"
              >
                {/* Gradient Top Border */}
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-600 w-full"></div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Bank Logo & Card Name */}
                  <div className="flex items-start gap-2 mb-3">
                    <div className="bg-white border border-emerald-200 rounded-md p-1 flex-shrink-0">
                      <Image
                        src={card.logo}
                        alt={`${card.bank} Logo`}
                        width={32}
                        height={32}
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">{card.cardName}</h3>
                      {card.tagline && <p className="text-[10px] text-emerald-700 leading-tight">{card.tagline}</p>}
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="flex justify-center items-center mb-4 flex-grow">
                    <div className="relative w-full max-w-[220px] h-[120px]">
                      <Image
                        src={card.cardImage}
                        alt={`${card.cardName} Image`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/cards/placeholder_card.png';
                        }}
                      />
                    </div>
                  </div>

                  {/* Rewards/Cashback Highlights */}
                  {(card.cashbackRate || card.rewardPoints || card.welcomeBonus) && (
                    <div className="grid grid-cols-3 gap-1.5 mb-3 text-center">
                      {card.cashbackRate && (
                        <div className="bg-emerald-50 rounded p-1.5">
                          <p className="text-[8px] text-emerald-800 font-medium leading-tight">Cashback</p>
                          <p className="text-[9px] font-bold text-emerald-600 leading-tight">{card.cashbackRate}</p>
                        </div>
                      )}
                      {card.rewardPoints && (
                        <div className="bg-teal-50 rounded p-1.5">
                          <p className="text-[8px] text-teal-800 font-medium leading-tight">Rewards</p>
                          <p className="text-[9px] font-bold text-teal-600 truncate leading-tight">{card.rewardPoints}</p>
                        </div>
                      )}
                      {card.welcomeBonus && (
                        <div className="bg-green-50 rounded p-1.5">
                          <p className="text-[8px] text-green-800 font-medium leading-tight">Bonus</p>
                          <p className="text-[9px] font-bold text-green-600 truncate leading-tight">{card.welcomeBonus}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="mb-4 flex-grow">
                    <h4 className="font-semibold text-[10px] text-gray-800 mb-1.5 flex items-center gap-1">
                      <FaStar className="text-emerald-500 text-[8px]" /> Key Features
                    </h4>
                    <ul className="space-y-1">
                      {card.features.slice(0, 3).map((feature, i) => ( // Show top 3 features
                        <li key={i} className="text-[9px] text-gray-700 flex items-start gap-1">
                          <span className="text-emerald-400 mt-1 text-[6px]">•</span>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      onClick={() => openModal(card)}
                      className="flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-medium transition-colors border border-emerald-200"
                    >
                      <FaInfoCircle className="text-emerald-600 text-[10px]" />
                      <span>Details</span>
                    </button>

                    <div className="flex gap-2">
                      <Link
                        href={card.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-2 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-md text-[10px] font-medium transition-colors border border-teal-200 flex-shrink-0 w-1/3"
                      >
                        <FaFilePdf className="w-2.5 h-2.5 text-teal-600" />
                        <span>PDF</span>
                      </Link>

                      <Link
                        href={card.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-2 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-md text-[10px] font-medium text-center transition-all shadow-sm"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Why Choose Our Platform? - Fiscal Forum Value */}
      <section className="py-12 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Why Apply Through Fiscal Forum?
            </h2>
            <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto">
              We simplify your search and add value to your application.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-2">
                <FaStar className="text-white w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold mb-1">Smart Matching</h3>
              <p className="text-emerald-100 text-xs">
                Enter your details once, and we show you the cards you&apos;re most likely to get approved for.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-green-500 flex items-center justify-center mx-auto mb-2">
                <FaFilePdf className="text-white w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold mb-1">Instant Access</h3>
              <p className="text-emerald-100 text-xs">
                Get instant access to detailed PDF guides for each card to make informed decisions.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-2">
                <FaInfoCircle className="text-white w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold mb-1">Exclusive Insights</h3>
              <p className="text-emerald-100 text-xs">
                Benefit from our expert-curated insights and tips for maximizing card benefits.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">No Extra Cost</h3>
              <p className="text-emerald-100 text-xs">
                Apply directly through us without any hidden fees or commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Detailed Card Info */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-y-auto">
          <DialogPanel
            transition
            className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl transform rounded-2xl bg-white shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in p-5 max-h-[90vh]"
          >
            {selectedCard && (
              <>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-emerald-900 mb-1">
                  {selectedCard.cardName}
                </DialogTitle>
                <p className="text-emerald-700 text-sm mb-3">{selectedCard.bank}</p>

                {/* Card Image in Modal */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-full max-w-[280px] h-[160px]">
                    <Image
                      src={selectedCard.cardImage}
                      alt={`${selectedCard.cardName} Image`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/cards/placeholder_card.png';
                      }}
                    />
                  </div>
                </div>

                {/* Rewards Highlights in Modal */}
                {(selectedCard.cashbackRate || selectedCard.rewardPoints || selectedCard.welcomeBonus) && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {selectedCard.cashbackRate && (
                      <div className="bg-emerald-50 rounded-lg p-2 text-center border border-emerald-100">
                        <p className="text-xs text-emerald-800 font-medium">Cashback Rate</p>
                        <p className="text-sm font-bold text-emerald-600">{selectedCard.cashbackRate}</p>
                      </div>
                    )}
                    {selectedCard.rewardPoints && (
                      <div className="bg-teal-50 rounded-lg p-2 text-center border border-teal-100">
                        <p className="text-xs text-teal-800 font-medium">Reward Points</p>
                        <p className="text-sm font-bold text-teal-600">{selectedCard.rewardPoints}</p>
                      </div>
                    )}
                    {selectedCard.welcomeBonus && (
                      <div className="bg-green-50 rounded-lg p-2 text-center border border-green-100">
                        <p className="text-xs text-green-800 font-medium">Welcome Bonus</p>
                        <p className="text-sm font-bold text-green-600">{selectedCard.welcomeBonus}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Benefits */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">Benefits</h3>
                  <ul className="space-y-1.5">
                    {selectedCard.detailedBenefits.map((benefit, i) => (
                      <li key={i} className="text-xs sm:text-sm text-gray-700 flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-1 text-xs">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Apply (in Modal) */}
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">How to Apply</h3>
                  <ol className="space-y-1.5 list-decimal list-inside text-xs sm:text-sm text-gray-700 pl-1">
                    {selectedCard.howToApply.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Eligibility Note (in Modal) */}
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">Eligibility</h3>
                  <p className="text-xs sm:text-sm text-gray-700 italic">{selectedCard.eligibilityNote}</p>
                </div>

                {/* Modal Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 border-t border-gray-200">
                  <Link
                    href={selectedCard.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-md text-sm font-medium transition-colors border border-teal-200 flex items-center justify-center gap-1.5"
                  >
                    <FaFilePdf className="w-3.5 h-3.5 text-teal-600" />
                    <span>Download PDF</span>
                  </Link>
                  <Link
                    href={selectedCard.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-md text-sm font-medium text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    Apply for this Card
                  </Link>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}