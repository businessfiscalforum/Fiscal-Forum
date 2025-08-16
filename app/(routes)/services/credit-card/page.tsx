// app/credit-cards/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaAward,
  FaChartLine,
  FaFilePdf,
  FaHeadset,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

// Define card data type
interface CreditCard {
  id: string;
  bank: string;
  logo: string;
  cardName: string;
  benefits: string[];
  howToApply: string[];
  pdfLink: string;
  applyLink: string;
  eligibilityNote: string;
}

// Data for credit cards (extracted from PDFs)
const creditCards: CreditCard[] = [
  {
    id: "hdfc",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC Credit Cards",
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
    bank: "TataNeu",
    logo: "/tataneu.png",
    cardName: "TataNeu Credit Card",
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
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 text-gray-800 pt-20"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header className="py-16 px-6 md:px-10 text-center">
        <h1 className="text-5xl font-bold text-emerald-900 mb-4 tracking-tight">
          Credit Cards
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Choose the perfect credit card for your lifestyle. Check your
          eligibility and get instant recommendations based on your credit score
          and income.
        </p>
      </header>

      {/* Main Grid */}
      <main className="pb-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creditCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl bg-white"
        >
          {/* Gradient Top Border */}
          <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>

          <div className="p-6 space-y-5 h-full flex flex-col">
            {/* Bank Logo */}
            <div className="flex items-center gap-3 mb-4 ">
              <div className="border-2 border-emerald-200">
                <Image
                src={card.logo}
                width={100}
                height={100}
                alt={`${card.bank} Logo`}
                className="h-8 w-auto object-contain"
              />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{card.cardName}</h3>
            </div>

            {/* Key Benefits */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Key Benefits</h4>
              <ul className="space-y-1">
                {card.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Apply */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">How to Apply</h4>
              <ol className="space-y-1 list-decimal list-inside">
                {card.howToApply.map((step, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Eligibility Note */}
            <p className="text-xs text-gray-600 italic leading-relaxed mt-auto">
              {card.eligibilityNote}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Link
                href={card.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-100 hover:bg-green-200 text-green-800 rounded-full text-sm font-medium transition-colors border border-green-200"
              >
                <FaFilePdf className="w-4 h-4 text-green-600" />
                <span>PDF</span>
              </Link>

              <Link
                href={card.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full text-sm font-medium text-center transition-all shadow-sm"
              >
                Apply
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</main>

      {/* Why Choose Our Platform? - Fiscal Forum Value */}
      <section className="py-16 bg-gradient-to-r from-rose-900 to-fuchsia-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Apply Through Fiscal Forum?
            </h2>
            <p className="text-xl text-rose-200 max-w-3xl mx-auto">
              We don’t just connect you to banks — we add value at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1: Cost Savings */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center mb-4">
                <FaChartLine className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Value-driven</h3>
              <p className="text-rose-200">
                No hidden charges or agent fees. Apply directly and save on processing costs.
              </p>
            </div>

            {/* Benefit 2: Exclusive Rewards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-500 flex items-center justify-center mb-4">
                <FaAward className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Rewards</h3>
              <p className="text-rose-200">
                Get bonus reward points or cashback when you apply via our platform — only for our users.
              </p>
            </div>

            {/* Benefit 3: Smart Filtering */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-500 flex items-center justify-center mb-4">
                <FaShieldAlt className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Filtering</h3>
              <p className="text-rose-200">
                We analyze your credit score & income to show only the cards you’re likely to get.
              </p>
            </div>

            {/* Benefit 4: Higher Approval */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mb-4">
                <FaRocket className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Higher Approval Rate</h3>
              <p className="text-rose-200">
                Our pre-screening reduces rejections. You apply only where you qualify.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Pink-Fuchsia "Why Choose Our Credit Cards?" Section */}
      {/* <section className="py-16 bg-gradient-to-r from-fuchsia-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Credit Cards?
            </h2>
            <p className="text-xl text-pink-200 max-w-3xl mx-auto">
              Premium benefits, instant approvals, and rewards tailored to your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-500 flex items-center justify-center mb-4">
                <FaRocket className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Approval</h3>
              <p className="text-pink-200">
                Get AIP approval in minutes and a digital card instantly. Physical card delivered in 7 days.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center mb-4">
                <FaShieldAlt className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Liability</h3>
              <p className="text-pink-200">
                Full protection against unauthorized transactions — your money stays safe.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-500 flex items-center justify-center mb-4">
                <FaHeadset className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Concierge</h3>
              <p className="text-pink-200">
                Dedicated support for travel, dining, and lifestyle benefits — anytime.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mb-4">
                <FaAward className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unlimited Rewards</h3>
              <p className="text-pink-200">
                Earn points on every purchase — dining, shopping, travel, and more.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}