"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { UserDetailContext } from "../../../../context/UserDetailContext";
import { Check, Copy } from "lucide-react";
import Link from "next/link";

// Types
interface Insurance {
  id: string;
  title: string;
  description: string;
  applyLink?: string;
}

interface Loan {
  id: string;
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
  applyLink?: string;
}

interface StockInvestment {
  id: string;
  name: string;
  logo: string;
  applyLink?: string;
  brokerage: string[];
}

interface MutualFund {
  id: string;
  name: string;
  logo: string;
  brokerage: string[];
  applyLink?: string;
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
  applyLink?: string;
}

export default function ReferralLinksPage() {
  const { userDetail } = useContext(UserDetailContext);
  const userId = userDetail?.id;
  const [activeTab, setActiveTab] = useState("stockInvestment");

  // Insurance Data
  const insurance: Insurance[] = [
    {
      id: "health insurance",
      title: "Health Insurance",
      description:
        "Safeguard your priceless health with complete coverage. Hospitalization, treatments, emergencies — we handle bills, so you and loved ones receive stress-free care.",
      applyLink: `https://www.fiscalforum.in/services/insurance/health-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "car insurance",
      title: "Car Insurance",
      description:
        "Protect your car and drive stress-free. From minor dents to major mishaps, enjoy quick claims and peace of mind.",
      applyLink: `https://www.fiscalforum.in/services/insurance/car-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "two-wheeler insurance",
      title: "Two-Wheeler Insurance",
      description:
        "Ride worry-free with total two-wheeler protection. Stay covered for accidents, damages, or theft.",
      applyLink: `https://www.fiscalforum.in/services/insurance/two-wheeler-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "life insurance",
      title: "Life Insurance",
      description:
        "Secure your family's tomorrow. Financial stability and peace of mind, ensuring loved ones remain protected.",
      applyLink: `https://www.fiscalforum.in/services/insurance/life-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "home & shop insurance",
      title: "Home & Shop Insurance",
      description:
        "Protect your home and business from fire, theft, or natural disasters. Secure your property and contents.",
      applyLink: `https://www.fiscalforum.in/services/insurance/home-shop-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "travel insurance",
      title: "Travel Insurance",
      description:
        "Travel fully protected. Lost bags, delays, or emergencies abroad — we’ve got your back.",
      applyLink: `https://www.fiscalforum.in/services/insurance/travel-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "personal accident insurance",
      title: "Personal Accident Insurance",
      description:
        "Accidents strike unexpectedly — stay prepared. Cover treatments, recovery, and protect income.",
      applyLink: `https://www.fiscalforum.in/services/insurance/personal-accident-insurance/learn-more?partner=${userId}`,
    },
    {
      id: "commercial vehicle insurance",
      title: "Commercial Vehicle Insurance",
      description:
        "Keep your business moving with comprehensive protection for your fleet and liability coverage.",
      applyLink: `https://www.fiscalforum.in/services/insurance/commercial-vehicle/learn-more?partner=${userId}`,
    },
  ];

  // Loans Data
  const loans: Loan[] = [
    {
      id: "home loan",
      title: "Home Loan",
      interest: "8.5% onwards",
      amount: "Up to ₹5 Cr",
      features: [
        "Up to ₹5 Crores",
        "Tenure up to 30 years",
        "Minimal documentation",
      ],
      applyLink: `https://www.fiscalforum.in/services/loan/home-loan?partner=${userId}`,
    },
    {
      id: "loan against property",
      title: "Loan Against Property",
      interest: "9.0% onwards",
      amount: "Up to ₹10 Cr",
      features: [
        "Up to ₹10 Crores",
        "Flexible repayment",
        "Retain property ownership",
      ],
      applyLink: `https://www.fiscalforum.in/services/loan/loan-against-property?partner=${userId}`,
    },
    {
      id: "persona loan",
      title: "Personal Loan",
      interest: "10.5% onwards",
      amount: "Up to ₹40 L",
      features: [
        "Up to ₹40 Lakhs",
        "No collateral required",
        "Instant approval",
      ],
      applyLink: `https://www.fiscalforum.in/services/loan/personal-loan?partner=${userId}`,
    },
    {
      id: "business loan",
      title: "Business Loan",
      interest: "11.0% onwards",
      amount: "Up to ₹50 Cr",
      features: ["Up to ₹50 Crores", "Working capital", "Equipment financing"],
      applyLink: `https://www.fiscalforum.in/services/loan/buiness-loan?partner=${userId}`,
    },
    {
      id: "gold loan",
      title: "Gold Loan",
      interest: "7.5% onwards",
      amount: "Up to ₹1 Cr",
      features: ["Up to ₹1 Crore", "Instant approval", "Retain gold ownership"],
      applyLink: `https://www.fiscalforum.in/services/loan/gold-loan?partner=${userId}`,
    },
    {
      id: "car loan",
      title: "Car Loan",
      interest: "8.0% onwards",
      amount: "Up to ₹2 Cr",
      features: ["Up to ₹2 Crores", "New & used cars", "Up to 90% financing"],
      applyLink: `https://www.fiscalforum.in/services/loan/car-loan?partner=${userId}`,
    },
    {
      id: "education loan",
      title: "Education Loan",
      interest: "9.5% onwards",
      amount: "Up to ₹1.5 Cr",
      features: [
        "Up to ₹1.5 Crores",
        "Abroad & domestic",
        "Flexible repayment",
      ],
      applyLink: `https://www.fiscalforum.in/services/loan/educational-loan?partner=${userId}`,
    },
    {
      id: "loan against securities",
      title: "Loan Against Securities",
      interest: "9.5% onwards",
      amount: "Up to ₹1.5 Cr",
      features: ["Up to ₹1.5 Crores", "Retain ownership of securities"],
      applyLink: `https://www.fiscalforum.in/services/loan/loan-against-securities?partner=${userId}`,
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
    //   applyLink: `https://www.fiscalforum.in/services/saving-account/indusInd?partner=${userId}`,
    // },
    {
      id: "Axis",
      name: "Axis Bank",
      platform: "Savings Account",
      features: ["Open Saving Accounts In Axis Bank"],
      applyLink: `https://www.fiscalforum.in/services/saving-account/axis?partner=${userId}`,
    },
    {
      id: "Fi",
      name: "Fi",
      platform: "Savings Account",
      features: ["Open Saving Accounts In Fi Bank"],
      applyLink: `https://www.fiscalforum.in/services/saving-account/fi?partner=${userId}`,
    },
  ];

  // Stock Investment
  const stockInvestment: StockInvestment[] = [
    {
      id: "alice-blue",
      name: "Alice Blue",
      logo: "/alice-blue.png",
      applyLink: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
      brokerage: [
        "• Equity Futures: ₹20 per executed order or 0.05% (whichever is lower)",
        "• Equity Options: ₹20 per executed order",
      ],
    },
    {
      id: "angel-one",
      name: "Angel One",
      logo: "/angel-one.png",
      applyLink: "https://angel-one.onelink.me/Wjgr/34yk9lib",
      brokerage: [
        "• Equity Intraday: ₹20 or 0.03% (whichever is lower) per executed order",
        "• Equity Delivery: ₹20 or 0.1% whichever is lower",
      ],
    },
    {
      id: "choice",
      name: "Choice",
      logo: "/choice.png",
      applyLink:
        "https://choiceindia.com/register?refercode=QzAwODcwMTU=&source=Q0hPSUNFX0NPTk5FQ1Q=",
      brokerage: ["• Equity Delivery: 0.20%", "• Equity Intraday: 0.02%"],
    },
    {
      id: "motilal-oswal",
      name: "Motilal Oswal",
      logo: "/motilal-oswal.png",
      applyLink:
        "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
      brokerage: ["• Equity Delivery: 0.20%", "• Equity Options: ₹20 per lot"],
    },
    {
      id: "upstox",
      name: "Upstox",
      logo: "/upstox.png",
      applyLink: "https://upstox.com/open-account/?f=4ZAVSY",
      brokerage: ["• ₹0 AMC for first year", "• ₹20 max brokerage per order"],
    },
    {
      id: "nuvama",
      name: "Nuvama",
      logo: "/nuvama.png",
      applyLink:
        "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814v",
      brokerage: ["• Equity Delivery: ₹0", "• Intraday/F&O: ₹15 or lower %"],
    },
    {
      id: "prudent",
      name: "Prudent",
      logo: "/prudent.png",
      applyLink: "https://fundzbazar.com/Link/jRkmixvcvvw",
      brokerage: ["• Equity Delivery: 0.30%", "• Options: ₹15 per lot"],
    },
    {
      id: "unlisted-shares",
      name: "Unlisted Shares",
      logo: "/unlisted-shares.png",
      applyLink: "/services/stock-investment/unlisted-shares/apply",
      brokerage: [""],
    },
  ];

  // Mutual Funds
  const mutualFund: MutualFund[] = [
    {
      id: "choice",
      name: "Choice",
      logo: "/choice.png",
      applyLink:
        "https://choiceindia.com/register?refercode=QzAwODcwMTU=&source=Q0hPSUNFX0NPTk5FQ1Q=",
      brokerage: [
        "• Smart mutual fund investing with expert recommendations",
        "• Research-driven suggestions to grow your portfolio",
        "• Smooth, flexible tracking of investments",
        "• User-friendly platform for all experience levels",
        "• Hassle-free wealth creation made simple",
        "• 0 AMC charges — more money stays invested",
      ],
    },
    {
      id: "nuvama",
      name: "Nuvama",
      logo: "/nuvama.png",
      applyLink:
        "  https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814",
      brokerage: [
        "• 30+ years of wealth management expertise",
        "• ₹4.6+ trillion client assets under management",
        "• Personalized wealth and investment solutions",
        "• Alternative strategies for steady returns",
        "• Private markets, EDGE funds, Infinity portfolios",
      ],
    },
    {
      id: "nj-wealth",
      name: "NJ Wealth",
      logo: "/Nj-wealth.png",
      applyLink: "  http://p.njw.bz/47283",
      brokerage: [
        "• India’s largest mutual fund distributor",
        "• Advanced advisory tools for smarter investing",
        "• Vast partner network for wider access",
        "• Seamless, paperless transactions",
        "• Empowers investors to grow wealth smartly",
        "• 0 AMC charges — invest more, pay less",
      ],
    },
    {
      id: "prudent",
      name: "Prudent",
      logo: "/prudent.png",
      applyLink: "  https://fundzbazar.com/Link/jRkmixvcvvw  ",
      brokerage: [
        "• Trusted investment platform with 25+ years of expertise",
        "• Powerful research support for informed decisions",
        "• Personalized investment guidance for all investors",
        "• Simplifies mutual fund investments",
        "• Backed by a strong track record of trust",
        "• 0 AMC charges — maximum savings for clients",
      ],
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
        "https://credue.in/next/credit-card/QzAwODcwMTU=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19iYW5r&bank_source=cmtwbA==&agent_code=QzAwODcwMTU=",
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
        "https://credue.in/next/credit-card/QzAwODcwMTU=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aW5kdXNpbmRfYmFuaw==&bank_source=aW5kdXNfYmFuaw==&agent_code=QzAwODcwMTU=",
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
              className="bg-white rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="flex gap-3 mt-auto">
                {item.applyLink && (
                  <Link
                    href={item.applyLink}
                    target="_blank"
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
                  >
                    Link
                  </Link>
                )}
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
              className="bg-white rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
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
              <div className="flex gap-3 mt-auto">
                {item.applyLink && (
                  <Link
                    href={item.applyLink}
                    target="_blank"
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
                  >
                    Link
                  </Link>
                )}
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
              className="bg-white rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.platform}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {item.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="flex gap-3 mt-auto">
                {item.applyLink && (
                  <Link
                    href={item.applyLink}
                    target="_blank"
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
                  >
                    Link
                  </Link>
                )}
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
              className="bg-white rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* Broker Logo */}
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={80}
                  height={80}
                  className="mb-4 object-contain"
                />
              )}

              {/* Broker Name & Platform */}
              <h2 className="text-lg font-semibold text-green-800">
                {item.name}
              </h2>
              {item.name && (
                <p className="text-sm text-gray-600 mb-3">{item.name}</p>
              )}

              {/* Actions: Open + Copy */}
              <div className="flex gap-3 mt-auto">
                {item.applyLink && (
                  <Link
                    href={item.applyLink}
                    target="_blank"
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
                  >
                    Open Account
                  </Link>
                )}

                {item.applyLink && (
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
                )}
              </div>
            </div>
          ))}

        {activeCategory?.type === "mutual" &&
          (activeCategory.data as MutualFund[]).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* Broker Logo */}
              {item.logo && (
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={80}
                  height={80}
                  className="mb-4 object-contain"
                />
              )}

              {/* Broker Name & Platform */}
              <h2 className="text-lg font-semibold text-green-800">
                {item.name}
              </h2>
              {item.name && (
                <p className="text-sm text-gray-600 mb-3">{item.name}</p>
              )}

              {/* Actions: Open + Copy */}
              <div className="flex gap-3 mt-auto">
                {item.applyLink && (
                  <Link
                    href={item.applyLink}
                    target="_blank"
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
                  >
                    Open Account
                  </Link>
                )}

                {item.applyLink && (
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
                )}
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

      {/* Consultancy Contact Card */}
      <div className="w-full flex justify-center mt-8">
        <div className="bg-green-600 text-white text-center rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
          <p className="text-lg sm:text-xl font-semibold">
            For Consultancy Contact:{" "}
            <a
              href="tel:8696060387"
              className="text-yellow-200 hover:underline"
            >
              +91 8696060387
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
