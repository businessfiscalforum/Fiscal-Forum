"use client";

import { useState } from "react";
import Link from "next/link";

// Types
interface Insurance {
  title: string;
  description: string;
}

interface Loan {
  title: string;
  interest: string;
  amount: string;
  features: string[];
}

interface BankAccount {
  title: string;
  cashback: string;
  features: string[];
}

interface StockMarket {
  id: string;
  name: string;
  platform: string;
  features: string[];
  applyLink: string;
}

interface MutualFund {
  id: string;
  name: string;
  platform: string;
  features: string[];
  applyLink: string;
}

interface CreditCard {
  id: string;
  bank: string;
  cardName: string;
  cardImage: string;
  tagline: string;
  cashbackRate: string;
  rewardPoints: string;
  features: string[];
  applyLink: string;
}

export default function ReferralLinksPage() {
  const [activeTab, setActiveTab] = useState("insurance");

  // Insurance Data
  const insurance: Insurance[] = [
    {
      title: "Health Insurance",
      description:
        "Safeguard your priceless health with complete coverage. Hospitalization, treatments, emergencies — we handle bills, so you and loved ones receive stress-free care.",
    },
    {
      title: "Car Insurance",
      description:
        "Protect your car and drive stress-free. From minor dents to major mishaps, enjoy quick claims and peace of mind.",
    },
    {
      title: "Two-Wheeler Insurance",
      description:
        "Ride worry-free with total two-wheeler protection. Stay covered for accidents, damages, or theft.",
    },
    {
      title: "Life Insurance",
      description:
        "Secure your family's tomorrow. Financial stability and peace of mind, ensuring loved ones remain protected.",
    },
    {
      title: "Home & Shop Insurance",
      description:
        "Protect your home and business from fire, theft, or natural disasters. Secure your property and contents.",
    },
    {
      title: "Travel Insurance",
      description:
        "Travel fully protected. Lost bags, delays, or emergencies abroad — we’ve got your back.",
    },
    {
      title: "Personal Accident Insurance",
      description:
        "Accidents strike unexpectedly — stay prepared. Cover treatments, recovery, and protect income.",
    },
    {
      title: "Commercial Vehicle Insurance",
      description:
        "Keep your business moving with comprehensive protection for your fleet and liability coverage.",
    },
  ];

  // Loans Data
  const loans: Loan[] = [
    {
      title: "Home Loan",
      interest: "8.5% onwards",
      amount: "Up to ₹5 Cr",
      features: ["Up to ₹5 Crores", "Tenure up to 30 years", "Minimal documentation"],
    },
    {
      title: "Loan Against Property",
      interest: "9.0% onwards",
      amount: "Up to ₹10 Cr",
      features: ["Up to ₹10 Crores", "Flexible repayment", "Retain property ownership"],
    },
    {
      title: "Personal Loan",
      interest: "10.5% onwards",
      amount: "Up to ₹40 L",
      features: ["Up to ₹40 Lakhs", "No collateral required", "Instant approval"],
    },
    {
      title: "Business Loan",
      interest: "11.0% onwards",
      amount: "Up to ₹50 Cr",
      features: ["Up to ₹50 Crores", "Working capital", "Equipment financing"],
    },
    {
      title: "Gold Loan",
      interest: "7.5% onwards",
      amount: "Up to ₹1 Cr",
      features: ["Up to ₹1 Crore", "Instant approval", "Retain gold ownership"],
    },
    {
      title: "Car Loan",
      interest: "8.0% onwards",
      amount: "Up to ₹2 Cr",
      features: ["Up to ₹2 Crores", "New & used cars", "Up to 90% financing"],
    },
    {
      title: "Education Loan",
      interest: "9.5% onwards",
      amount: "Up to ₹1.5 Cr",
      features: ["Up to ₹1.5 Crores", "Abroad & domestic", "Flexible repayment"],
    },
    {
      title: "Loan Against Securities",
      interest: "9.5% onwards",
      amount: "Up to ₹1.5 Cr",
      features: ["Up to ₹1.5 Crores", "Retain ownership of securities"],
    },
  ];

  // Savings Accounts
  const banks: BankAccount[] = [
    {
      title: "IndusInd Bank",
      cashback: "Cashback Upto ₹250",
      features: [
        "Choose your phone number as your account number",
        "Zero AMC charges on your digital card",
        "Smooth and fast application support",
      ],
    },
    {
      title: "AXIS Bank",
      cashback: "Cashback Upto ₹250",
      features: [
        "Min. avg balance varies by location",
        "₹2,500 to ₹10,000 for savings accounts",
        "Metro branches need ₹5,000 balance",
      ],
    },
    {
      title: "FI Bank",
      cashback: "Cashback Upto ₹250",
      features: [
        "Zero balance account",
        "No minimum balance ever",
        "Open your account quickly online",
      ],
    },
  ];

  // Stock Market (1 card)
  const stockMarket: StockMarket[] = [
    {
      id: "zerodha",
      name: "Zerodha",
      platform: "Stock Market Trading Platform",
      features: [
        "Low brokerage charges",
        "Easy-to-use Kite platform",
        "Direct mutual funds investment",
      ],
      applyLink: "https://zerodha.com/open-account",
    },
  ];

  // Mutual Funds (1 card)
  const mutualFund: MutualFund[] = [
    {
      id: "groww",
      name: "Groww Mutual Funds",
      platform: "Direct Mutual Fund Investment",
      features: [
        "Zero commission direct mutual funds",
        "Track & manage investments easily",
        "Instant redemption on select funds",
      ],
      applyLink: "https://groww.in/mutual-funds",
    },
  ];

  // Credit Cards (full list from you)
  const creditCards: CreditCard[] = [
    {
      id: "hdfc",
      bank: "HDFC Bank",
      cardName: "HDFC Credit Cards",
      cardImage: "/Hdfc Bank.svg",
      tagline: "Versatile Rewards & Benefits",
      cashbackRate: "Up to 10%",
      rewardPoints: "Reward Points/Cashback",
      features: [
        "Reward points/cashback",
        "Airport lounge access",
        "Zero liability protection",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19iYW5r&bank_source=aGRmY19iYW5r&agent_code=",
    },
    {
      id: "indusind",
      bank: "IndusInd Bank",
      cardName: "IndusInd Credit Cards",
      cardImage: "/Indusind Bank.svg",
      tagline: "Premium Lifestyle Rewards",
      cashbackRate: "Up to 10%",
      rewardPoints: "Edge Points / Rewards",
      features: [
        "Platinum Aura & Edge benefits",
        "Unlimited rewards on shopping",
        "Fuel surcharge waiver",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aW5kdXNpbmRfYmFuaw==&bank_source=aW5kdXNfYmFuaw==&agent_code=",
    },
    {
      id: "hsbc",
      bank: "HSBC Bank",
      cardName: "HSBC Credit Cards",
      cardImage: "/Hsbc Bank.svg",
      tagline: "Flat Cashback on All Spends",
      cashbackRate: "5%",
      rewardPoints: "HSBC Rewards",
      features: [
        "Flat 5% cashback on all spends",
        "No joining or annual fees*",
        "Global acceptance",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19iYW5r&bank_source=aHNiY19iYW5r&agent_code=",
    },
    {
      id: "hdfc-swiggy",
      bank: "HDFC Bank",
      cardName: "HDFC Swiggy Credit Card",
      cardImage: "/Hdfc Swiggy.svg",
      tagline: "Extra Cashback on Food & More",
      cashbackRate: "Up to 10%",
      rewardPoints: "Cashback / Reward Points",
      features: [
        "10% cashback on Swiggy",
        "5% cashback on other online spends",
        "Dining discounts",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19zd2lnZ3k=&bank_source=aGRmY19iYW5r&agent_code=",
    },
    {
      id: "axis-lic",
      bank: "Axis Bank",
      cardName: "Axis LIC Credit Card",
      cardImage: "/Axis Lic.svg",
      tagline: "Rewards on LIC Premiums",
      cashbackRate: "Up to 4%",
      rewardPoints: "Axis Reward Points",
      features: [
        "Reward points on LIC premiums",
        "Airport lounge access",
        "Dining and shopping offers",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=YXhpc19saWM=&bank_source=YXhpc19saWM=&agent_code=",
    },
    {
      id: "yes-popclub",
      bank: "Yes Bank",
      cardName: "Yes Bank Pop Club Credit Card",
      cardImage: "/Yes Popclub.svg",
      tagline: "Flat Cashback on Everything",
      cashbackRate: "5%",
      rewardPoints: "Pop Coins",
      features: [
        "Flat 5% cashback on all categories",
        "No annual fee",
        "Instant digital card",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=eWVzX3BvcGNsdWI=&bank_source=eWVzX3BvcGNsdWI=&agent_code=",
    },
    {
      id: "hsbc-liveplus",
      bank: "HSBC Bank",
      cardName: "HSBC Live Plus Card",
      cardImage: "/Hsbc Live Plus.svg",
      tagline: "Cashback on Daily Expenses",
      cashbackRate: "Up to 10%",
      rewardPoints: "HSBC Rewards",
      features: [
        "Cashback on daily expenses",
        "Dining & travel discounts",
        "Global acceptance",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19saXZlX3BsdXM=&bank_source=aHNiY19iYW5r&agent_code=",
    },
    {
      id: "hsbc-travelone",
      bank: "HSBC Bank",
      cardName: "HSBC TravelOne Card",
      cardImage: "/HsbcTraveloneCard.svg",
      tagline: "Earn Air Miles & Travel Perks",
      cashbackRate: "Miles/Points per ₹100",
      rewardPoints: "HSBC Rewards / Air Miles",
      features: [
        "Air miles on every spend",
        "Airport lounge access",
        "Travel insurance",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY190cmF2ZWxvbmVfY2FyZA==&bank_source=aHNiY19iYW5r&agent_code=",
    },
    {
      id: "axis-fd",
      bank: "Axis Bank",
      cardName: "Axis Bank FD Credit Card",
      cardImage: "/AxisBankFdCard.svg",
      tagline: "Credit Card Against Fixed Deposit",
      cashbackRate: "N/A",
      rewardPoints: "Axis Reward Points",
      features: [
        "Get a credit card against FD",
        "High approval chances",
        "Low annual fee",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=YXhpc19iYW5rX2ZkX2NyZWRpdF9jYXJk&bank_source=YXhpc19iYW5r&agent_code=",
    },
    {
      id: "tataneu",
      bank: "TataNeu",
      cardName: "TataNeu Credit Card",
      cardImage: "/Tataneu Card.svg",
      tagline: "Rewards on Tata Brand Spends",
      cashbackRate: "Up to 5%",
      rewardPoints: "NeuCoins",
      features: [
        "Rewards on Tata brand spends",
        "Shopping discounts",
        "Fuel surcharge waiver",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=dGF0YW5ldV9jYXJk&bank_source=dGF0YW5ldQ==&agent_code=",
    },
    {
      id: "hdfc-giga",
      bank: "HDFC Bank",
      cardName: "HDFC GIGA Credit Card",
      cardImage: "/Hdfc Giga.svg",
      tagline: "Special Rewards on Online Spends",
      cashbackRate: "Up to 10%",
      rewardPoints: "Giga Points / Cashback",
      features: [
        "Special rewards on online spends",
        "Travel & dining discounts",
        "Fuel surcharge waiver",
      ],
      applyLink:
        "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19naWdh&bank_source=Z0lnYV9idXNpbmVzc19jcmVkaXRfY2FyZA==&agent_code=",
    },
  ];

  // Categories
  const categories = [
    { key: "stockMarket", label: "Stock Market", type: "stock", data: stockMarket },
    { key: "mutualFund", label: "Mutual Fund", type: "mutual", data: mutualFund },
    { key: "insurance", label: "Insurance", type: "insurance", data: insurance },
    { key: "loan", label: "Loan", type: "loan", data: loans },
    { key: "govtBonds", label: "Government Bonds & FDs", type: "simple", data: [] },
    { key: "savingAccount", label: "Saving Account", type: "bank", data: banks },
    { key: "creditCard", label: "Credit Card", type: "credit", data: creditCards },
  ];

  const activeCategory = categories.find((c) => c.key === activeTab);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Referral Links</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 border-b">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`pb-2 text-sm ${
              activeTab === cat.key
                ? "border-b-2 border-green-600 text-green-700 font-medium"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {activeCategory?.type === "insurance" &&
          (activeCategory.data as Insurance[]).map((item) => (
            <div key={item.title} className="bg-white rounded-xl border shadow-sm p-5">
              <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText("https://example.com/insurance")}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "loan" &&
          (activeCategory.data as Loan[]).map((item) => (
            <div key={item.title} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <div className="text-sm text-green-700 font-semibold">
                  {item.interest} <span className="text-gray-500 font-normal ml-1">{item.amount}</span>
                </div>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText("https://example.com/loan")}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "bank" &&
          (activeCategory.data as BankAccount[]).map((item) => (
            <div key={item.title} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">{item.cashback}</span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText("https://example.com/savings")}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "stock" &&
          (activeCategory.data as StockMarket[]).map((item) => (
            <div key={item.id} className="bg-white rounded-xl border shadow-sm p-5">
              <h2 className="font-semibold text-lg">Stock Market</h2>
              <p className="text-sm text-gray-600">{item.platform}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText(item.applyLink)}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "mutual" &&
          (activeCategory.data as MutualFund[]).map((item) => (
            <div key={item.id} className="bg-white rounded-xl border shadow-sm p-5">
              <h2 className="font-semibold text-lg">Mutual Funds</h2>
              <p className="text-sm text-gray-600">{item.platform}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText(item.applyLink)}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}

         {/* Credit Card Rendering */}
         {activeCategory?.type === "credit" &&
          (activeCategory.data as CreditCard[]).map((item) => (
            <div key={item.id} className="bg-white rounded-xl border shadow-sm p-5 flex flex-col h-full">
              <div className="flex items-center mb-3">
                <img src={item.cardImage} alt={item.cardName} className="h-12 w-auto mr-3" />
                <div>
                  <h2 className="font-semibold text-lg">{item.cardName}</h2>
                  <p className="text-xs text-gray-500">{item.bank}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.tagline}</p>
              <div className="text-sm mb-3">
                <span className="font-medium">Cashback:</span> {item.cashbackRate} | <span className="font-medium">Rewards:</span> {item.rewardPoints}
              </div>
              <ul className="mt-1 space-y-1 text-sm text-gray-600 flex-grow">
                {item.features.slice(0, 3).map((f, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => navigator.clipboard.writeText(item.applyLink)}
                  className="w-full bg-green-600 text-white py-2 rounded-md text-sm"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}