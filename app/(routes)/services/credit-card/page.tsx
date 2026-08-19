// app/credit-cards/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaFilePdf,
  FaInfoCircle,
  FaStar,
  FaCheck,
  FaFilter,
} from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CreditCard, Gem, Percent, ShieldCheck } from "lucide-react";

// Define the enhanced card data type
interface CreditCard {
  id: string;
  bank: string;
  logo: string;
  cardName: string;
  cardImage: string;
  tagline?: string;
  cashbackRate?: string;
  rewardPoints?: string;
  welcomeBonus?: string;
  features: string[]; // Concise list for grid view
  detailedBenefits: string[]; // Detailed list for modal
  benefits: string[]; // Original benefits list (if still needed)
  eligibilityNote: string;
  howToApply: string[];
  pdfLink: string;
  applyLink: string; // Make sure this is a valid URL
}

// Enhanced Data for credit cards with new fields
const creditCards: CreditCard[] = [
  {
    id: "hdfc",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC Credit Cards",
    cardImage: "/Hdfc Bank.svg",
    tagline: "Versatile Rewards & Benefits",
    cashbackRate: "Up to 10%",
    rewardPoints: "Reward Points/Cashback",
    welcomeBonus: "Varies by Card",
    features: [
      "Reward points/cashback",
      "Airport lounge access",
      "Buy 1 get 1 offer-Bookmyshow",
    ],
    detailedBenefits: [
      "Earn reward points or cashback on all purchases (varies by specific card).",
      "Complimentary access to airport lounges (e.g., 6 visits/year on some cards).",
      "Zero liability protection against unauthorized transactions.",
      "Convert high-value purchases into easy EMIs.",
      "Avail cashback offers up to 10% on select categories (e.g., online spends, Amazon, Flipkart, Swiggy).",
      "Get 1% fuel surcharge waiver on transactions between ₹500 and ₹4000.",
      "Buy 1 Get 1 offer on movie tickets via BookMyShow (on select cards).",
    ],
    benefits: [
      "Reward points on every purchase",
      "Airport lounge access",
      "Zero liability protection",
      "EMI conversion facility",
      "Cashback offers up to 10%",
      "Fuel surcharge waiver",
      "Buy 1 get 1 offer-Bookmyshow",
    ],
    eligibilityNote:
      "Fill in your details to check eligibility. HDFC will suggest the most suitable card based on your income and credit score.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwODcwMTU=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aGRmY19iYW5r&bank_source=cmtwbA==&agent_code=QzAwODcwMTU=",
  },
  {
    id: "indusind",
    bank: "IndusInd Bank",
    logo: "/indusind.png",
    cardName: "IndusInd Credit Cards",
    cardImage: "/Indusind Bank.svg",
    tagline: "Premium Lifestyle Rewards",
    cashbackRate: "Up to 10%",
    rewardPoints: "Edge Points / Rewards",
    welcomeBonus: "Varies by Card",
    features: [
      "Free vouchers from MakeMyTrip, Nykaa",
      "Platinum Aura & Edge benefits",
      "Unlimited rewards on shopping",
      "Fuel surcharge waiver",
    ],
    detailedBenefits: [
      "Free vouchers from Makemytrip, Nykaa on joining (on select cards).",
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
    eligibilityNote:
      "Submit your details to know eligibility. IndusInd will recommend the best card option based on your profile and financials.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1lIFkItdpCuZLvvz5Tp62DrkrV8uhxXIw/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwODcwMTU=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aW5kdXNpbmRfYmFuaw==&bank_source=aW5kdXNfYmFuaw==&agent_code=QzAwODcwMTU=",
  },
  // {
  //   id: "hsbc",
  //   bank: "HSBC Bank",
  //   logo: "/hsbc.png",
  //   cardName: "HSBC Credit Cards",
  //   cardImage: "/Hsbc Bank.svg",
  //   tagline: "Flat Cashback on All Spends",
  //   cashbackRate: "5%",
  //   rewardPoints: "HSBC Rewards",
  //   welcomeBonus: "Varies by Card",
  //   features: [
  //     "Flat 5% cashback on all spends",
  //     "No joining or annual fees*",
  //     "Global acceptance",
  //   ],
  //   detailedBenefits: [
  //     "Flat 5% cashback on all domestic and international spends.",
  //     "No joining fee and no annual fee (subject to HSBC terms and conditions).",
  //     "Earn HSBC Rewards points per ₹100 spent.",
  //     "Complimentary membership to HSBC Global Concierge Services.",
  //     "Exclusive dining and entertainment discounts.",
  //     "Travel insurance and purchase protection.",
  //     "Contactless payment technology for faster checkout.",
  //   ],
  //   benefits: [
  //     "Flat 5% cashback on all spends",
  //     "No joining or annual fees",
  //     "Global acceptance",
  //     "Contactless payments",
  //     "24x7 concierge service",
  //     "Travel & dining privileges",
  //   ],
  //   eligibilityNote:
  //     "Provide your information to verify eligibility. HSBC automatically selects the best card as per your credit history and income.",
  //   howToApply: [
  //     "Click 'Apply'",
  //     "Fill your details",
  //     "Get your credit card within 5-7 days",
  //   ],
  //   pdfLink:
  //     "https://drive.google.com/file/d/1fUnUq44G-5sfNCWIbgzJ8cHG9_IvKdBK/view?usp=sharing",
  //   applyLink:
  //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19iYW5r&bank_source=aHNiY19iYW5r&agent_code=",
  // },
  {
    id: "hdfc-swiggy",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC Swiggy Credit Card",
    cardImage: "/Hdfc Swiggy.svg",
    tagline: "Extra Cashback on Food & More",
    cashbackRate: "Up to 10%",
    rewardPoints: "Cashback / Reward Points",
    welcomeBonus: "Complimentary 3 months Swiggy One membership",
    features: [
      "10% cashback on Swiggy",
      "5% cashback on other online spends",
      "Dining discounts",
    ],
    detailedBenefits: [
      "10% cashback on Swiggy orders (food ordering, Instamart, Dineout, Genie).",
      "5% cashback on other online spends (Amazon, Flipkart, etc.).",
      "Complimentary 3 months Swiggy One membership on card activation.",
      "Dining discounts at select partner restaurants.",
      "Get 1% cashback on all other category spends, including offline transactions.",
      "Earn reward points on all other purchases.",
    ],
    benefits: [
      "Extra cashback on Swiggy orders",
      "Dining discounts",
      "Reward points on online spends",
      "Cashback on all other spends",
    ],
    eligibilityNote:
      "Check eligibility by filling your details. HDFC evaluates your credit score and income to provide the most relevant card.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=aGRmY19zd2lnZ3k=&bank_source=aGRmY19iYW5r&agent_code=",
  },
  {
    id: "axis-lic",
    bank: "Axis Bank",
    logo: "/axis.png",
    cardName: "Axis LIC Credit Card",
    cardImage: "/Axis Lic.svg",
    tagline: "Reward points on Insurance Policy and International spends",
    cashbackRate: "Up to 4%",
    rewardPoints: "Axis Reward Points",
    welcomeBonus: "Varies by Card",
    features: [
      "Reward points on Insurance Policy and International spends",
      "Reward Points for every ₹100 spends online",
      "Complimentary Card Lost Liablity Insurance",
    ],
    detailedBenefits: [
      "Earn 2 Reward Points for every ₹100 spends on Insurance Policy and International spends.",
      "Complimentary Card Lost Liablity Insurance Cover upto the card limit.",
      "Earn 2 Reward Points for every ₹100 spends online",
      "1% Fuel Surcharge waiver",
      "Earn standard Axis Reward Points on all other spends.",
      "Zero liability for unauthorized transactions.",
    ],
    benefits: [
      "Reward points on Insurance Policy and International spends",
      "Airport lounge access",
      "Dining and shopping offers",
    ],
    eligibilityNote:
      "Fill in your details to proceed. Axis Bank matches your profile with the best LIC credit card variant available.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1qCTgChpQVEQtvaBWymCHwC1LLdRT4T-y/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=YXhpc19saWM=&bank_source=YXhpc19saWM=&agent_code=",
  },
  {
    id: "yes-popclub",
    bank: "Yes Bank",
    logo: "/yesbank.png",
    cardName: "Yes Bank Pop Club Credit Card",
    cardImage: "/Yes Popclub.svg",
    tagline: "Flat Cashback on Everything",
    cashbackRate: "5%",
    rewardPoints: "Pop Coins",
    welcomeBonus: "₹500 Cashback",
    features: [
      "Flat 5% cashback on all categories",
      "No annual fee",
      "Instant digital card",
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
    eligibilityNote:
      "Enter your details to check eligibility. Yes Bank will filter the right Pop Club card based on your income and credit record.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/10VnJxQ08ptUlsF7_ljYMY_xUssrPiHXK/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=eWVzX3BvcGNsdWI=&bank_source=eWVzX3BvcGNsdWI=&agent_code=",
  },
  // {
  //   id: "hsbc-liveplus",
  //   bank: "HSBC Bank",
  //   logo: "/hsbc.png",
  //   cardName: "HSBC Live Plus Card",
  //   cardImage: "/Hsbc Live Plus.svg",
  //   tagline: "Cashback on Daily Expenses",
  //   cashbackRate: "Up to 10%",
  //   rewardPoints: "HSBC Rewards",
  //   welcomeBonus: "Varies by Card",
  //   features: [
  //     "Cashback on daily expenses",
  //     "Dining & travel discounts",
  //     "Global acceptance",
  //   ],
  //   detailedBenefits: [
  //     "Earn cashback on everyday spending categories (specific rates vary).",
  //     "Exclusive dining discounts locally and across Asia.",
  //     "Travel discounts and offers.",
  //     "Global acceptance for international transactions.",
  //     "Earn HSBC Rewards points on all purchases.",
  //     "Access to HSBC Global Concierge Services.",
  //   ],
  //   benefits: [
  //     "Cashback on daily expenses",
  //     "Dining & travel discounts",
  //     "Global acceptance",
  //   ],
  //   eligibilityNote:
  //     "Provide your details to check eligibility. HSBC recommends Live Plus card based on your spending profile and financial history.",
  //   howToApply: [
  //     "Click 'Apply'",
  //     "Fill your details",
  //     "Get your credit card within 5-7 days",
  //   ],
  //   pdfLink:
  //     "https://drive.google.com/file/d/1fUnUq44G-5sfNCWIbgzJ8cHG9_IvKdBK/view?usp=sharing",
  //   applyLink:
  //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY19saXZlX3BsdXM=&bank_source=aHNiY19iYW5r&agent_code=",
  // },
  // {
  //   id: "hsbc-travelone",
  //   bank: "HSBC Bank",
  //   logo: "/hsbc.png",
  //   cardName: "HSBC TravelOne Card",
  //   cardImage: "/HsbcTraveloneCard.svg",
  //   tagline: "Earn Air Miles & Travel Perks",
  //   cashbackRate: "Miles/Points per ₹100",
  //   rewardPoints: "HSBC Rewards / Air Miles",
  //   welcomeBonus: "Varies by Card",
  //   features: [
  //     "Air miles on every spend",
  //     "Airport lounge access",
  //     "Travel insurance",
  //   ],
  //   detailedBenefits: [
  //     "Earn air miles or HSBC Rewards points on every rupee spent.",
  //     "Complimentary access to domestic and international airport lounges.",
  //     "Comprehensive travel insurance covering accidents, delays, and lost baggage.",
  //     "Earn accelerated points/miles on travel-related spends.",
  //     "Priority check-in and boarding privileges (on select airlines).",
  //     "Travel discounts and exclusive offers.",
  //   ],
  //   benefits: [
  //     "Air miles on every spend",
  //     "Airport lounge access",
  //     "Travel insurance",
  //   ],
  //   eligibilityNote:
  //     "Fill in your details to see if you qualify. HSBC automatically finds the best travel card depending on your income and credit.",
  //   howToApply: [
  //     "Click 'Apply'",
  //     "Fill your details",
  //     "Get your credit card within 5-7 days",
  //   ],
  //   pdfLink:
  //     "https://drive.google.com/file/d/1fUnUq44G-5sfNCWIbgzJ8cHG9_IvKdBK/view?usp=sharing",
  //   applyLink:
  //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=aHNiY190cmF2ZWxvbmVfY2FyZA==&bank_source=aHNiY19iYW5r&agent_code=",
  // },
  // {
  //   id: "axis-fd",
  //   bank: "Axis Bank",
  //   logo: "/axis.png",
  //   cardName: "Axis Bank FD Credit Card",
  //   cardImage: "/AxisBankFdCard.svg",
  //   tagline: "Credit Card Against Fixed Deposit",
  //   cashbackRate: "N/A",
  //   rewardPoints: "Axis Reward Points",
  //   welcomeBonus: "N/A",
  //   features: [
  //     "Get a credit card against FD",
  //     "High approval chances",
  //     "Low annual fee",
  //   ],
  //   detailedBenefits: [
  //     "Designed for customers holding a Fixed Deposit with Axis Bank.",
  //     "High approval chances as the credit limit is backed by the FD.",
  //     "Earn Axis Reward Points on spends.",
  //     "Lower annual fees compared to regular credit cards.",
  //     "Standard credit card features like EMI conversion, insurance (subject to terms).",
  //   ],
  //   benefits: [
  //     "Get a credit card against FD",
  //     "High approval chances",
  //     "Low annual fee",
  //   ],
  //   eligibilityNote:
  //     "Enter your details to verify eligibility. Axis offers FD-backed cards based on your deposit and income profile.",
  //   howToApply: [
  //     "Click 'Apply'",
  //     "Fill your details",
  //     "Get your credit card within 5-7 days",
  //   ],
  //   pdfLink:
  //     "https://drive.google.com/file/d/1qCTgChpQVEQtvaBWymCHwC1LLdRT4T-y/view?usp=sharing",
  //   applyLink:
  //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=YXhpc19iYW5rX2ZkX2NyZWRpdF9jYXJk&bank_source=YXhpc19iYW5r&agent_code=",
  // },
  // {
  //   id: "tataneu",
  //   bank: "TataNeu",
  //   logo: "/tataneu.png",
  //   cardName: "TataNeu Credit Card",
  //   cardImage: "/Tataneu Card.svg",
  //   tagline: "Rewards on Tata Brand Spends",
  //   cashbackRate: "Up to 5%",
  //   rewardPoints: "NeuCoins",
  //   welcomeBonus: "Varies by Card",
  //   features: [
  //     "Rewards on Tata brand spends",
  //     "Shopping discounts",
  //     "Fuel surcharge waiver",
  //   ],
  //   detailedBenefits: [
  //     "Earn accelerated NeuCoins when shopping at Tata brands (Tata CLiQ, Croma, Tanishq, etc.).",
  //     "Earn NeuCoins on all other spends.",
  //     "Exclusive shopping discounts and offers within the Tata ecosystem.",
  //     "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹4000.",
  //     "Redeem NeuCoins for products, vouchers, or experiences on the Tata Neu platform.",
  //     "Standard HDFC Bank credit card benefits like insurance, EMI options.",
  //   ],
  //   benefits: [
  //     "Rewards on Tata brand spends",
  //     "Shopping discounts",
  //     "Fuel surcharge waiver",
  //   ],
  //   eligibilityNote:
  //     "Provide your details to check eligibility. TataNeu will suggest the right card based on your spending capacity and profile.",
  //   howToApply: [
  //     "Click 'Apply'",
  //     "Fill your details",
  //     "Get your credit card within 5-7 days",
  //   ],
  //   pdfLink:
  //     "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?path=/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/TATA%20Neu%20Infinity%20HDFC%20Bank%20Credit%20Card/TATA_Neu_Infinity_Card_FAQ.pdf",
  //   applyLink:
  //     "https://credue.in/credit-card/QzAwMTExMzI=?lead_source=Y29ubmVjdF9yZWZlcnJhbF9saW5r&bank_name=dGF0YW5ldV9jYXJk&bank_source=dGF0YW5ldQ==&agent_code=",
  // },
  {
    id: "hdfc-giga",
    bank: "HDFC Bank",
    logo: "/hdfc.png",
    cardName: "HDFC GIGA Credit Card",
    cardImage: "/Hdfc Giga.svg",
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
    eligibilityNote:
      "Fill your details to know eligibility. HDFC will shortlist GIGA or other suitable cards as per your credit score and income.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=aGRmY19naWdh&bank_source=Z0lnYV9idXNpbmVzc19jcmVkaXRfY2FyZA==&agent_code=",
  },
  {
    id: "scapia-credit-card",
    bank: "Federal Bank",
    logo: "/Federal_Bank.png",
    cardName: "Federal Bank Scapia Credit Card",
    cardImage: "/scapia2.png",
    tagline: "Special Rewards on Online and Offline Spends",
    cashbackRate: "Up to 10%",
    rewardPoints: "Scapia Coins",
    welcomeBonus: "Varies by Card",
    features: [
      "Unlimited domestic airport lounge access",
      "Zero forex mark-up on international spends",
      "Up to 20% Scapia coins on card spend",
      "10% Scapia Coins on online and offline transactions made across all merchants in India",
    ],
    detailedBenefits: [
      "Earn 10% rewards on your VISA card on all eligible online and offline spends.",
      "Earn 20% rewards on all bookings and purchases on the Scapia app.",
      "Exclusive travel discounts.",
      "Spend ₹10k monthly on VISA or ₹15k on RuPay Card to get unlimited domestic airport lounge access.",
      "Earn 5% rewards on your RuPay card on all eligible online and offline spends.",
      "Redeem Scapia coins for exciting rewards and vouchers on the Scapia app.",
    ],
    benefits: [
      "Special rewards on online and offline spends",
      "Travel & bookings discounts",
      "Zero forex mark-up",
    ],
    eligibilityNote:
      "Fill your details to know eligibility. Federal Bank will shortlist Scapia or other suitable cards as per your credit score and income.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=c2NhcGlhX2NyZWRpdF9jYXJk&bank_source=c2NhcGlh&agent_code=",
  },
  {
    id: "Bank-of-Baroda",
    bank: "Bank of Baroda",
    logo: "/bob_logo.svg",
    cardName: "Bank of Baroda Credit Card",
    cardImage: "/Bank of Baroda Credit Card.png",
    tagline:
      "Special Rewards on Travel, Dining, Online & International Spends.",
    cashbackRate: "Up to 10%",
    rewardPoints: "15 Reward Points per ₹100 spent",
    welcomeBonus: "Varies by Card",
    features: [
      "15 Reward Points on every ₹100 Spent on Travel, Dining, Online & International Spends",
      "Complementary Domestic Airport Lounge Access",
      "12 Months Amazon prime Membership",
      "Complementary women centric health packages and Accidental Insurance Cover",
    ],
    detailedBenefits: [
      "15 Reward Points on every ₹100 Spent on Travel, Dining, Online & International Spends.",
      "Complementary Domestic Airport Lounge Access.",
      "12 Months Amazon prime Membership.",
      "Complementary women centric health packages and Accidental Insurance Cover.",
    ],
    benefits: [
      "Reward Points on every Spent on Travel, Dining, Online & International Spends",
      "Complementary Domestic Airport Lounge Access",
      "Complementary women centric health packages and Accidental Insurance Cover",
    ],
    eligibilityNote:
      "Fill your details to know eligibility. Bank of Baroda will shortlist Premier or other suitable cards as per your credit score and income.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=YmFua19vZl9iYXJvZGE=&bank_source=cmtwbA==&agent_code=",
  },
  {
    id: "au-bank",
    bank: "AU Bank",
    logo: "/au_bank.svg",
    cardName: "AU Bank Credit Card",
    cardImage: "/AU Bank Credit Card.png",
    tagline: "Special Rewards on Grocery, Retail spends.",
    cashbackRate: "Up to 10%",
    rewardPoints: "Amazon Prime, ZEE5 and Cult Fit",
    welcomeBonus: "Varies by Card",
    features: [
      "Customisable card according to your preference",
      "5% cashback on grocery, retail",
      "Complimentary Amazon Prime, ZEE5 and Cult Fit",
      "Low forex markup fee of 0.99%",
    ],
    detailedBenefits: [
      "Customisable card according to your preference",
      "5% cashback on grocery, retail",
      "Complimentary Amazon Prime, ZEE5 and Cult Fit",
      "Low forex markup fee of 0.99%",
    ],
    benefits: [
      "Customisable card according to your preference",
      "5% cashback on grocery, retail",
      "Complimentary Amazon Prime, ZEE5 and Cult Fit",
      "Low forex markup fee of 0.99%",
    ],
    eligibilityNote:
      "Fill your details to know eligibility. AU Bank will shortlist Vetta or other suitable cards as per your credit score and income.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=YXVfYmFuaw==&bank_source=YXVfYmFuaw==&agent_code=",
  },
  {
    id: "idfc-bank",
    bank: "IDFC Bank",
    logo: "/idfc_bank.svg",
    cardName: "IDFC Bank Credit Card",
    cardImage: "/IDFC First Bank Credit Card.png",
    tagline: "Special Rewards on Travel, Dining and Entertainmnet",
    cashbackRate: "Up to 5%",
    rewardPoints: "1% Unlimited Cashback",
    welcomeBonus: "Varies by Card",
    features: [
      "Complimentary lounge access worldwide",
      "1% Unlimited Cashback",
      "5% cashback on dining, entertainment and travel",
      "25% savings on Swiggy Dineout",
    ],
    detailedBenefits: [
      "Complimentary lounge access worldwide",
      "1% Unlimited Cashback",
      "5% cashback on dining, entertainment and travel",
      "25% savings on Swiggy Dineout",
    ],
    benefits: [
      "You will get complimentary lounge access worldwide",
      "1% Unlimited Cashback on the spends",
      "5% cashback on dining, entertainment and travel spends",
      "25% savings on Swiggy Dineout",
    ],
    eligibilityNote:
      "Fill your details to know eligibility. IDFC Bank will shortlist First Select or other suitable cards as per your credit score and income.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=aWRmY19iYW5r&bank_source=aWRmY19iYW5r&agent_code=",
  },
  {
    id: "idfc-first-power-bank",
    bank: "IDFC Bank",
    logo: "/idfc_bank.svg",
    cardName: "IDFC Bank RUPAY Credit Card",
    cardImage: "/IDFC-First-Bank-HPCL.png",
    tagline: "Special Rewards on Fuel Spends",
    cashbackRate: "N/A",
    rewardPoints: "N/A",
    welcomeBonus:
      "₹500 gift voucher on 1st HPCL fuel transaction of ₹500 or above",
    features: [
      "6.5% savings on fuel spends as reward points",
      "Up to 8.83% savings on travel via IDFC FIRST app",
      "25% off on movie tickets up to ₹100, once every month",
      "₹500 gift voucher on 1st HPCL fuel transaction of ₹500 or above",
    ],
    detailedBenefits: [
      "When you purchase fuel, you receive 6.5% of the total amount back in the form of reward points.",
      "You can achieve savings of up to 8.83% on expenses related to travel (such as booking flights, hotels, or bus tickets) when these transactions are processed specifically through the bank's IDFC FIRST mobile application or portal.",
      "This benefit provides a 25% discount on the cost of movie tickets. The maximum discount you can claim per transaction is ₹100, and you can avail of this offer one time during each calendar month.",
      "As a welcome benefit or promotion, after successfully completing your very first fuel transaction at any HPCL (Hindustan Petroleum Corporation Ltd.) outlet that is valued at ₹500 or more, you will be rewarded with a ₹500 gift voucher.",
    ],
    benefits: [
      "6.5% savings on fuel spends as reward points",
      "Up to 8.83% savings on travel via IDFC FIRST app",
      "25% off on movie tickets up to ₹100, once every month",
      "₹500 gift voucher on 1st HPCL fuel transaction of ₹500 or above",
    ],
    eligibilityNote:
      "Fill your details to know eligibility. IDFC Bank will shortlist First Power or other suitable cards as per your credit score and income.",
    howToApply: [
      "Click 'Apply'",
      "Fill your details",
      "Get your credit card within 5-7 days",
    ],
    pdfLink:
      "https://drive.google.com/file/d/1uUhlPCku0aDoWH88xQ2T0pzGBAL8fgfO/view?usp=sharing",
    applyLink:
      "https://credue.in/next/credit-card/QzAwMTExMzI=?lead_source=YXBwX2FuZHJvaWQ=&bank_name=aWRmY19wb3dlcl9ydXBheV9jYXJk&bank_source=aWRmY19iYW5r&agent_code=",
  },
];

export default function CreditCardsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Filter States ---
  const [selectedBank, setSelectedBank] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRewardType, setSelectedRewardType] = useState<string>("All");
  const [showWelcomeBonusOnly, setShowWelcomeBonusOnly] =
    useState<boolean>(false);

  useEffect(() => {
    // Simulate a slight delay or data loading if needed in the future
    setIsLoading(false);
  }, []);

  const openModal = (card: CreditCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  // --- Extract unique filter options using useMemo for performance ---
  const { banks, categories, rewardTypes } = useMemo(() => {
    const bankSet = new Set<string>();
    const categorySet = new Set<string>();
    const rewardTypeSet = new Set<string>();

    creditCards.forEach((card) => {
      bankSet.add(card.bank);
      if (card.tagline) categorySet.add(card.tagline);
      // Prioritize rewardPoints for the filter, fallback to cashbackRate
      if (card.rewardPoints) rewardTypeSet.add(card.rewardPoints);
      else if (card.cashbackRate)
        rewardTypeSet.add(`Cashback: ${card.cashbackRate}`);
    });

    return {
      banks: ["All", ...Array.from(bankSet)],
      categories: ["All", ...Array.from(categorySet)],
      rewardTypes: ["All", ...Array.from(rewardTypeSet)],
    };
  }, [creditCards]);

  // --- Filtered cards logic ---
  const filteredCards = useMemo(() => {
    return creditCards.filter((card) => {
      // Bank Filter
      if (selectedBank !== "All" && card.bank !== selectedBank) {
        return false;
      }

      // Category Filter (based on tagline)
      if (selectedCategory !== "All" && card.tagline !== selectedCategory) {
        return false;
      }

      // Reward Type Filter (based on rewardPoints or cashbackRate)
      const cardRewardType = card.rewardPoints
        ? card.rewardPoints
        : card.cashbackRate
          ? `Cashback: ${card.cashbackRate}`
          : "";
      if (
        selectedRewardType !== "All" &&
        cardRewardType !== selectedRewardType
      ) {
        return false;
      }

      // Welcome Bonus Filter
      if (showWelcomeBonusOnly && !card.welcomeBonus) {
        return false;
      }

      // If all conditions pass, include the card
      return true;
    });
  }, [
    creditCards,
    selectedBank,
    selectedCategory,
    selectedRewardType,
    showWelcomeBonusOnly,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F8F4]">
        <div className="text-2xl text-[#111315]">Loading Cards...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F2F8F4] text-[#111315] pt-32 pb-16 font-sans relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(17,19,21,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(17,19,21,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title / Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111315] mb-4">
            CREDIT CARDS
          </h1>
          <p className="text-lg md:text-xl text-[#5B6B7C] max-w-3xl mx-auto font-medium">
            Maximize rewards, minimize fees. Find the card that fits your spending.
          </p>
        </div>

        {/* Filters Section (Neo-Brutalist) */}
        <div className="bg-white border border-[#111315] rounded-[28px] p-6 shadow-sm mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[rgba(17,19,21,0.08)] pb-4">
            <h2 className="text-lg font-bold text-[#111315] flex items-center gap-2">
              <FaFilter className="text-[#5C9A78] text-sm" /> FIND YOUR PERFECT CARD
            </h2>
            <span className="text-xs font-bold text-[#8B98A6] uppercase tracking-wider">
              {filteredCards.length}{" "}
              {filteredCards.length === 1 ? "Card" : "Cards"} Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            {/* Bank Filter */}
            <div>
              <label
                htmlFor="bank-filter"
                className="block text-[10px] font-bold text-[#8B98A6] uppercase tracking-wider mb-2"
              >
                Bank
              </label>
              <select
                id="bank-filter"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#111315] rounded-xl text-xs font-bold text-[#111315] focus:outline-none focus:ring-1 focus:ring-[#5C9A78]"
              >
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category-filter"
                className="block text-[10px] font-bold text-[#8B98A6] uppercase tracking-wider mb-2"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#111315] rounded-xl text-xs font-bold text-[#111315] focus:outline-none focus:ring-1 focus:ring-[#5C9A78]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "Any Category" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Reward Type Filter */}
            <div>
              <label
                htmlFor="reward-filter"
                className="block text-[10px] font-bold text-[#8B98A6] uppercase tracking-wider mb-2"
              >
                Reward Type
              </label>
              <select
                id="reward-filter"
                value={selectedRewardType}
                onChange={(e) => setSelectedRewardType(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#111315] rounded-xl text-xs font-bold text-[#111315] focus:outline-none focus:ring-1 focus:ring-[#5C9A78]"
              >
                {rewardTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "All" ? "Any Reward" : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Welcome Bonus Filter */}
            <div className="flex h-11 items-center">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  id="welcome-bonus-filter"
                  name="welcome-bonus-filter"
                  type="checkbox"
                  checked={showWelcomeBonusOnly}
                  onChange={(e) => setShowWelcomeBonusOnly(e.target.checked)}
                  className="h-4 w-4 accent-[#5C9A78] border-[#111315] rounded mr-2"
                />
                <span className="text-xs font-bold text-[#111315]">
                  HAS WELCOME BONUS
                </span>
              </label>
            </div>

            {/* Reset Filters Button */}
            <div>
              <button
                onClick={() => {
                  setSelectedBank("All");
                  setSelectedCategory("All");
                  setSelectedRewardType("All");
                  setShowWelcomeBonusOnly(false);
                }}
                className="w-full p-2.5 bg-white border border-[#111315] rounded-xl text-xs font-bold text-[#111315] hover:bg-[#F2F8F4] transition-colors cursor-pointer"
              >
                RESET FILTERS
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#111315] rounded-[24px] overflow-hidden shadow-sm flex flex-col justify-between h-full p-6 hover:-translate-y-1 transition-transform"
              >
                <div>
                  {/* Top Row Badges */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#D9F0E1] text-[#2F5541] border border-[rgba(17,19,21,0.15)] px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wider uppercase">
                      {card.bank}
                    </span>
                    <span className="bg-white text-[#111315] border border-[#111315] px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase">
                      CARD
                    </span>
                  </div>

                  {/* Logo & Card Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white border border-[rgba(17,19,21,0.12)] rounded-lg p-1.5 w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={card.logo}
                        alt={`${card.bank} Logo`}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#111315] leading-tight">
                        {card.cardName}
                      </h3>
                      {card.tagline && (
                        <p className="text-[10px] font-bold text-[#5B6B7C] uppercase tracking-wider mt-0.5">
                          {card.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Visual representation */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-full max-w-[200px] h-[120px]">
                      <Image
                        src={card.cardImage}
                        alt={`${card.cardName} Image`}
                        fill
                        sizes="200px"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Spec Highlights Grid */}
                  {(card.cashbackRate ||
                    card.rewardPoints ||
                    card.welcomeBonus) && (
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      {card.cashbackRate && (
                        <div className="border border-[#111315] bg-[#F2F8F4]/40 rounded-xl p-2 flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-[#8B98A6] uppercase">
                            Cashback
                          </span>
                          <span className="text-xs font-extrabold text-[#111315] truncate">
                            {card.cashbackRate}
                          </span>
                        </div>
                      )}
                      {card.rewardPoints && (
                        <div className="border border-[#111315] bg-[#F2F8F4]/40 rounded-xl p-2 flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-[#8B98A6] uppercase">
                            Rewards
                          </span>
                          <span className="text-xs font-extrabold text-[#111315] truncate">
                            {card.rewardPoints}
                          </span>
                        </div>
                      )}
                      {card.welcomeBonus && (
                        <div className="border border-[#111315] bg-[#F2F8F4]/40 rounded-xl p-2 flex flex-col justify-center">
                          <span className="text-[8px] font-bold text-[#8B98A6] uppercase">
                            Bonus
                          </span>
                          <span className="text-xs font-extrabold text-[#111315] truncate">
                            {card.welcomeBonus}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-b border-[rgba(17,19,21,0.12)] my-4"></div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-xs text-[#111315] mb-2 flex items-center gap-1.5">
                      <FaStar className="text-[#5C9A78] text-[9px]" /> KEY FEATURES
                    </h4>
                    <ul className="space-y-1.5">
                      {card.features.slice(0, 3).map((feature, i) => (
                        <li
                          key={i}
                          className="text-xs text-[#5B6B7C] font-medium flex items-start gap-2"
                        >
                          <span className="text-[#5C9A78] mt-1 flex-shrink-0">
                            •
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-[rgba(17,19,21,0.08)]">
                  <button
                    onClick={() => openModal(card)}
                    className="w-full py-2 bg-white border border-[#111315] text-[#111315] rounded-full text-xs font-bold hover:bg-[#F2F8F4] transition-colors cursor-pointer"
                  >
                    View Card Details
                  </button>
                  <div className="flex gap-2">
                    <Link
                      href={card.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/3 py-2 bg-white border border-[#111315] text-[#111315] rounded-full text-xs font-bold text-center hover:bg-[#F2F8F4] transition-colors"
                    >
                      PDF
                    </Link>
                    <Link
                      href={card.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-[#5C9A78] hover:bg-[#2F5541] text-white rounded-full text-xs font-bold text-center transition-colors"
                    >
                      Apply Now →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#111315] rounded-[28px] p-8 max-w-md mx-auto mb-20 shadow-sm">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-[#111315] mb-1">
              NO CARDS FOUND
            </h3>
            <p className="text-xs text-[#5B6B7C] mb-4">
              Try adjusting your filter parameters.
            </p>
            <button
              onClick={() => {
                setSelectedBank("All");
                setSelectedCategory("All");
                setSelectedRewardType("All");
                setShowWelcomeBonusOnly(false);
              }}
              className="px-5 py-2.5 bg-[#5C9A78] hover:bg-[#2F5541] text-white rounded-full text-xs font-bold cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Why Choose Us */}
        <div className="bg-white border border-[#111315] rounded-[28px] p-8 max-w-5xl mx-auto shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase font-display">
              WHY FIND YOUR CARD WITH US
            </h2>
            <p className="text-sm text-[#5B6B7C] font-medium">
              We streamline credit card search with total transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 border-r last:border-0 border-[rgba(17,19,21,0.08)] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#D9F0E1] text-[#2F5541] flex items-center justify-center mb-3">
                <FaCheck />
              </div>
              <h3 className="text-sm font-bold text-[#111315] mb-2">
                Curated Selection
              </h3>
              <p className="text-xs text-[#5B6B7C] leading-relaxed">
                Handpicked credit cards from top banks matching your exact spend
                habits.
              </p>
            </div>

            <div className="p-4 border-r last:border-0 border-[rgba(17,19,21,0.08)] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#D9F0E1] text-[#2F5541] flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#111315] mb-2">
                Secure & Trusted
              </h3>
              <p className="text-xs text-[#5B6B7C] leading-relaxed">
                We safeguard your application data with industry-grade SSL
                encryption.
              </p>
            </div>

            <div className="p-4 border-r last:border-0 border-[rgba(17,19,21,0.08)] flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#D9F0E1] text-[#2F5541] flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#111315] mb-2">
                Expert Guidance
              </h3>
              <p className="text-xs text-[#5B6B7C] leading-relaxed">
                One-on-one coordinator support to help you compare rewards and fees.
              </p>
            </div>

            <div className="p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#D9F0E1] text-[#2F5541] flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#111315] mb-2">
                Exclusive Perks
              </h3>
              <p className="text-xs text-[#5B6B7C] leading-relaxed">
                Avail special welcome voucher partnerships and cashback overrides.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
        />

        <div className="fixed inset-0 flex items-center justify-center p-8 sm:p-10 md:p-10 lg:p-12 z-50 overflow-y-auto">
          <DialogPanel
            transition
            className="w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-200 transform transition-all data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            {selectedCard && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8">
                {/* Left Side */}
                <div className="flex flex-col items-center justify-start space-y-6">
                  <div className="text-center">
                    <DialogTitle className="text-3xl md:text-4xl font-bold text-emerald-900">
                      {selectedCard.cardName}
                    </DialogTitle>
                    <p className="text-emerald-700 text-base md:text-lg mt-1">
                      {selectedCard.bank}
                    </p>
                  </div>

                  <div className="relative w-full max-w-[260px] h-[160px] md:h-[200px]">
                    <Image
                      src={selectedCard.cardImage}
                      alt={`${selectedCard.cardName} Image`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {(selectedCard.cashbackRate ||
                    selectedCard.rewardPoints ||
                    selectedCard.welcomeBonus) && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                      {selectedCard.cashbackRate && (
                        <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                          <p className="text-sm text-emerald-800 font-semibold">
                            Cashback
                          </p>
                          <p className="text-lg font-bold text-emerald-600">
                            {selectedCard.cashbackRate}
                          </p>
                        </div>
                      )}
                      {selectedCard.rewardPoints && (
                        <div className="bg-teal-50 rounded-xl p-4 text-center border border-teal-100">
                          <p className="text-sm text-teal-800 font-semibold">
                            Rewards
                          </p>
                          <p className="text-lg font-bold text-teal-600">
                            {selectedCard.rewardPoints}
                          </p>
                        </div>
                      )}
                      {selectedCard.welcomeBonus && (
                        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                          <p className="text-sm text-green-800 font-semibold">
                            Welcome Bonus
                          </p>
                          <p className="text-lg font-bold text-green-600">
                            {selectedCard.welcomeBonus}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-between space-y-6">
                  <div className="space-y-5 overflow-y-auto max-h-[60vh] pr-2">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {selectedCard.detailedBenefits.map((benefit, i) => (
                          <li
                            key={i}
                            className="text-lg text-gray-700 flex items-start gap-2"
                          >
                            <span className="text-emerald-500 mt-1">
                              <FaCheck />
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                        How to Apply
                      </h3>
                      <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
                        {selectedCard.howToApply.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                        Eligibility
                      </h3>
                      <p className="text-lg text-gray-700 italic">
                        {selectedCard.eligibilityNote}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                    <Link
                      href={selectedCard.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-teal-100 hover:bg-teal-200 text-teal-800 rounded-xl text-lg font-semibold border border-teal-200 flex items-center justify-center gap-2"
                    >
                      <FaFilePdf className="w-5 h-5" /> PDF
                    </Link>
                    <Link
                      href={selectedCard.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg"
                    >
                      Apply Now
                    </Link>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-lg font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>

      {/* <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="lg:w-1/2 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Not Sure Which Card to Pick?</h3>
        <p className="text-gray-600">Find the perfect card for your client</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
          href="https://credue.in/next/credit-card-eligibility?cba_code=QzAwMTExMzI="
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
            Add Lead
          </Link>
          <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors duration-300">
            Copy Link 
          </button>
        </div>
      </div>

      <div className="lg:w-1/2 flex justify-center">
        <div className="flex space-x-6">
          <div className="relative w-40 h-24 bg-black rounded-lg overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
            <div className="absolute top-2 left-2 text-white text-xs">VISA</div>
            <div className="absolute bottom-2 left-2 text-white text-xs font-mono">4321 0123 4567 8901</div>
          </div>
          <div className="relative w-40 h-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg overflow-hidden shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="absolute top-2 left-2 text-white text-xs">SWIGGY</div>
            <div className="absolute top-2 right-2 text-white text-xs">HDFC BANK</div>
            <div className="absolute bottom-2 left-2 text-white text-xs font-mono">4321 0123 4567 8901</div>
            <div className="absolute bottom-2 right-2 text-white text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 1a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                <path d="M4.5 1A1.5 1.5 0 003 2.5v9A1.5 1.5 0 004.5 13h11a1.5 1.5 0 001.5-1.5V2.5A1.5 1.5 0 0015.5 1h-11z"/>
              </svg>
            </div>
          </div>

          <div className="relative w-40 h-24 bg-gradient-to-r from-green-600 to-teal-500 rounded-lg overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="absolute top-2 left-2 text-white text-xs">ESB CARD</div>
            <div className="absolute bottom-2 left-2 text-white text-xs font-mono">4321 0123 4567 8901</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}
    </div>
  );
}
