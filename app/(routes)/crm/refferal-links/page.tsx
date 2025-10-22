"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { Check, Copy } from "lucide-react";

// Types
interface Insurance {
  id:string;
  title: string;
  description: string;
  applyLink?: string;
}

interface Loan {
  id:string;
  title: string;
  interest: string;
  amount: string;
  features: string[];
  applyLink?: string;
}

interface BankAccount {
  id: string;
  name: string;
  platform: string;
  features: string[];
  applyLink: string;
}

interface StockInvestment {
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
  const { userDetail } = useContext(UserDetailContext);
  const userId = userDetail?.id;
  const [activeTab, setActiveTab] = useState("stockInvestment");

  // Insurance Data
  const insurance: Insurance[] = [
    {
      id:"health insurance",
      title: "Health Insurance",
      description:
        "Safeguard your priceless health with complete coverage. Hospitalization, treatments, emergencies — we handle bills, so you and loved ones receive stress-free care.",
      applyLink: `https://fiscalforum.in/services/insurance/health-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"car insurance",
      title: "Car Insurance",
      description:
        "Protect your car and drive stress-free. From minor dents to major mishaps, enjoy quick claims and peace of mind.",
      applyLink: `https://fiscalforum.in/services/insurance/car-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"two-wheeler insurance",
      title: "Two-Wheeler Insurance",
      description:
        "Ride worry-free with total two-wheeler protection. Stay covered for accidents, damages, or theft.",
      applyLink: `https://fiscalforum.in/services/insurance/two-wheeler-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"life insurance",
      title: "Life Insurance",
      description:
        "Secure your family's tomorrow. Financial stability and peace of mind, ensuring loved ones remain protected.",
      applyLink: `https://fiscalforum.in/services/insurance/life-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"home & shop insurance",
      title: "Home & Shop Insurance",
      description:
        "Protect your home and business from fire, theft, or natural disasters. Secure your property and contents.",
      applyLink: `https://fiscalforum.in/services/insurance/home-shop-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"travel insurance",
      title: "Travel Insurance",
      description:
        "Travel fully protected. Lost bags, delays, or emergencies abroad — we’ve got your back.",
      applyLink: `https://fiscalforum.in/services/insurance/travel-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"personal accident insurance",
      title: "Personal Accident Insurance",
      description:
        "Accidents strike unexpectedly — stay prepared. Cover treatments, recovery, and protect income.",
      applyLink: `https://fiscalforum.in/services/insurance/personal-accident-insurance/learn-more?partner=${userId}`,
    },
    {
      id:"commercial vehicle insurance",
      title: "Commercial Vehicle Insurance",
      description:
        "Keep your business moving with comprehensive protection for your fleet and liability coverage.",
      applyLink: `https://fiscalforum.in/services/insurance/commercial-vehicle/learn-more?partner=${userId}`,
    },
  ];

  // Loans Data
  const loans: Loan[] = [
    {
      id:"home loan",
      title: "Home Loan",
      interest: "8.5% onwards",
      amount: "Up to ₹5 Cr",
      features: [
        "Up to ₹5 Crores",
        "Tenure up to 30 years",
        "Minimal documentation",
      ],
      applyLink: `https://fiscalforum.in/services/loan/home-loan?partner=${userId}`,
    },
    {
      id:"loan against property",
      title: "Loan Against Property",
      interest: "9.0% onwards",
      amount: "Up to ₹10 Cr",
      features: [
        "Up to ₹10 Crores",
        "Flexible repayment",
        "Retain property ownership",
      ],
      applyLink: `https://fiscalforum.in/services/loan/loan-against-property?partner=${userId}`,
    },
    {
      id:"persona loan",
      title: "Personal Loan",
      interest: "10.5% onwards",
      amount: "Up to ₹40 L",
      features: [
        "Up to ₹40 Lakhs",
        "No collateral required",
        "Instant approval",
      ],
      applyLink: `https://fiscalforum.in/services/loan/personal-loan?partner=${userId}`,
    },
    {
      id:"business loan",
      title: "Business Loan",
      interest: "11.0% onwards",
      amount: "Up to ₹50 Cr",
      features: ["Up to ₹50 Crores", "Working capital", "Equipment financing"],
      applyLink: `https://fiscalforum.in/services/loan/buiness-loan?partner=${userId}`,
    },
    {
      id:"gold loan",
      title: "Gold Loan",
      interest: "7.5% onwards",
      amount: "Up to ₹1 Cr",
      features: ["Up to ₹1 Crore", "Instant approval", "Retain gold ownership"],
      applyLink: `https://fiscalforum.in/services/loan/gold-loan?partner=${userId}`,
    },
    {
      id:"car loan",
      title: "Car Loan",
      interest: "8.0% onwards",
      amount: "Up to ₹2 Cr",
      features: ["Up to ₹2 Crores", "New & used cars", "Up to 90% financing"],
      applyLink: `https://fiscalforum.in/services/loan/car-loan?partner=${userId}`,
    },
    {
      id:"education loan",
      title: "Education Loan",
      interest: "9.5% onwards",
      amount: "Up to ₹1.5 Cr",
      features: [
        "Up to ₹1.5 Crores",
        "Abroad & domestic",
        "Flexible repayment",
      ],
      applyLink: `https://fiscalforum.in/services/loan/educational-loan?partner=${userId}`,
    },
    {
      id:"loan against securities",
      title: "Loan Against Securities",
      interest: "9.5% onwards",
      amount: "Up to ₹1.5 Cr",
      features: ["Up to ₹1.5 Crores", "Retain ownership of securities"],
      applyLink: `https://fiscalforum.in/services/loan/loan-against-securities?partner=${userId}`,
    },
  ];

  // Savings Accounts
  const banks: BankAccount[] = [
    // {
    //   id: "IndusInd",
    //   name: "IndusInd Bank",
    //   platform: "Savings Account",
    //   features: [
    //     "Open Saving Accounts In IndusInd Bank",
    //   ],
    //   applyLink: `https://fiscalforum.in/services/saving-account/indusInd?partner=${userId}`,
    // },
    {
      id: "Axis",
      name: "Axis Bank",
      platform: "Savings Account",
      features: [
        "Open Saving Accounts In Axis Bank",
      ],
      applyLink: `https://fiscalforum.in/services/saving-account/axis?partner=${userId}`,
    },
    {
      id: "Fi",
      name: "Fi",
      platform: "Savings Account",
      features: [
        "Open Saving Accounts In Fi Bank",
      ],
      applyLink: `https://fiscalforum.in/services/saving-account/fi?partner=${userId}`,
    },
  ];

  // Stock Investment
  const stockInvestment: StockInvestment[] = [
    {
      id: "stock-investment",
      name: "Stock Investment",
      platform: "Stock Investment Trading Platform",
      features: [
        "Low brokerage charges",
        "Easy-to-use Kite platform",
        "Direct mutual funds investment",
      ],
      applyLink: `https://fiscalforum.in/services/stock-investment?partner=${userId}`,
    },
    {
      id: "stock-investment-start-your-wealth-journey",
      name: "Stock Investment start your wealth journey",
      platform: "Stock Investment Trading Platform",
      features: [
        "Low brokerage charges",
        "Easy-to-use Kite platform",
        "Direct mutual funds investment",
      ],
      applyLink: `https://fiscalforum.in/services/stock-investment/open-demat-account?partner=${userId}`,
    },
    {
      id: "stock-investment-level-up-your-portfolio",
      name: "Stock Investment level up your portfolio",
      platform: "Stock Investment Trading Platform",
      features: [
        "Low brokerage charges",
        "Easy-to-use Kite platform",
        "Direct mutual funds investment",
      ],
      applyLink: `https://fiscalforum.in/services/stock-investment/allready-have-an-account?partner=${userId}`,
    },
  ];

  // Mutual Funds
  const mutualFund: MutualFund[] = [
    {
      id: "mutual-funds",
      name: "Mutual Funds",
      platform: "Direct Mutual Fund Investment",
      features: [
        "Zero commission direct mutual funds",
        "Track & manage investments easily",
        "Instant redemption on select funds",
      ],
      applyLink: `https://fiscalforum.in/services/mutual-funds?partner=${userId}`,
    },
    {
      id: "mutual-funds-begin-your-mutual-fund-journey",
      name: "Mutual Funds begin your mutual fund journey",
      platform: "Direct Mutual Fund Investment",
      features: [
        "Zero commission direct mutual funds",
        "Track & manage investments easily",
        "Instant redemption on select funds",
      ],
      applyLink: `https://fiscalforum.in/services/mutual-funds/open-demat-accountpartner=${userId}`,
    },
    {
      id: "mutual-funds-optimize-your-mutual-fund-portfolio",
      name: "Mutual Funds optimize your mutual fund portfolio",
      platform: "Direct Mutual Fund Investment",
      features: [
        "Zero commission direct mutual funds",
        "Track & manage investments easily",
        "Instant redemption on select funds",
      ],
      applyLink: `https://fiscalforum.in/services/mutual-funds/already-have-an-account?partner=${userId}`,
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
    // {
    //   id: "hsbc",
    //   bank: "HSBC Bank",
    //   cardName: "HSBC Credit Cards",
    //   cardImage: "/Hsbc Bank.svg",
    //   tagline: "Flat Cashback on All Spends",
    //   cashbackRate: "5%",
    //   rewardPoints: "HSBC Rewards",
    //   features: [
    //     "Flat 5% cashback on all spends",
    //     "No joining or annual fees*",
    //     "Global acceptance",
    //   ],
    //   applyLink:
    //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19iYW5r&bank_source=aHNiY19iYW5r&agent_code=",
    // },
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
    // {
    //   id: "hsbc-liveplus",
    //   bank: "HSBC Bank",
    //   cardName: "HSBC Live Plus Card",
    //   cardImage: "/Hsbc Live Plus.svg",
    //   tagline: "Cashback on Daily Expenses",
    //   cashbackRate: "Up to 10%",
    //   rewardPoints: "HSBC Rewards",
    //   features: [
    //     "Cashback on daily expenses",
    //     "Dining & travel discounts",
    //     "Global acceptance",
    //   ],
    //   applyLink:
    //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19saXZlX3BsdXM=&bank_source=aHNiY19iYW5r&agent_code=",
    // },
    // {
    //   id: "hsbc-travelone",
    //   bank: "HSBC Bank",
    //   cardName: "HSBC TravelOne Card",
    //   cardImage: "/HsbcTraveloneCard.svg",
    //   tagline: "Earn Air Miles & Travel Perks",
    //   cashbackRate: "Miles/Points per ₹100",
    //   rewardPoints: "HSBC Rewards / Air Miles",
    //   features: [
    //     "Air miles on every spend",
    //     "Airport lounge access",
    //     "Travel insurance",
    //   ],
    //   applyLink:
    //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY190cmF2ZWxvbmVfY2FyZA==&bank_source=aHNiY19iYW5r&agent_code=",
    // },
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
    {
      key: "stockInvestment",
      label: "Stock Investment",
      type: "stock",
      data: stockInvestment,
    },
    {
      key: "mutualFund",
      label: "Mutual Fund",
      type: "mutual",
      data: mutualFund,
    },
    {
      key: "insurance",
      label: "Insurance",
      type: "insurance",
      data: insurance,
    },
    { key: "loan", label: "Loan", type: "loan", data: loans },
    {
      key: "govtBonds",
      label: "Government Bonds & FDs",
      type: "simple",
      data: [],
    },
    {
      key: "savingAccount",
      label: "Saving Account",
      type: "bank",
      data: banks,
    },
    {
      key: "creditCard",
      label: "Credit Card",
      type: "credit",
      data: creditCards,
    },
  ];
  

  const activeCategory = categories.find((c) => c.key === activeTab);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
            <div
              key={item.title}
              className="bg-white rounded-xl border shadow-sm p-5"
            >
              <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-4">
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.applyLink) {
                      navigator.clipboard.writeText(item.applyLink);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-green-600"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "loan" &&
          (activeCategory.data as Loan[]).map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border shadow-sm p-5"
            >
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <div className="text-sm text-green-700 font-semibold">
                  {item.interest}{" "}
                  <span className="text-gray-500 font-normal ml-1">
                    {item.amount}
                  </span>
                </div>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.applyLink) {
                      navigator.clipboard.writeText(item.applyLink);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-green-600"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "bank" &&
          (activeCategory.data as BankAccount[]).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border shadow-sm p-5"
            >
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.platform}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.applyLink) {
                      navigator.clipboard.writeText(item.applyLink);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-green-600"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "stock" &&
          (activeCategory.data as StockInvestment[]).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border shadow-sm p-5"
            >
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.platform}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.applyLink) {
                      navigator.clipboard.writeText(item.applyLink);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-green-600"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        {activeCategory?.type === "mutual" &&
          (activeCategory.data as MutualFund[]).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border shadow-sm p-5"
            >
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.platform}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.applyLink) {
                      navigator.clipboard.writeText(item.applyLink);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-green-600"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

        {/* Credit Card Rendering */}
        {activeCategory?.type === "credit" &&
          (activeCategory.data as CreditCard[]).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border shadow-sm p-5 flex flex-col h-full"
            >
              <div className="flex items-center mb-3">
                <Image
                  src={item.cardImage}
                  alt={item.cardName}
                  width={40}
                  height={40}
                  className="h-12 w-auto mr-3"
                />

                <div>
                  <h2 className="font-semibold text-lg">{item.cardName}</h2>
                  <p className="text-xs text-gray-500">{item.bank}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.tagline}</p>
              <div className="text-sm mb-3">
                <span className="font-medium">Cashback:</span>{" "}
                {item.cashbackRate} |{" "}
                <span className="font-medium">Rewards:</span>{" "}
                {item.rewardPoints}
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
                  key={item.id}
                  onClick={() => {
                    if (item.applyLink) {
                      navigator.clipboard.writeText(item.applyLink);
                      setCopiedId(item.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="flex items-center gap-2 text-green-600"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
