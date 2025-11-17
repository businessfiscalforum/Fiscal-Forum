"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

type Fund = {
  name: string;
  type: string;
  rank: number;
  minSIP: number;
  threeYReturns: string;
  rating: number; // Randomized >3
};

const tabs = [
  "Small Cap Funds",
  "Mid Cap Funds",
  "Large Cap Funds",
  "Flexi Cap Funds",
  "Index Funds",
  "Multi Cap Funds",
  "Value Funds",
  "Others",
];

// Real fund data extracted from your images
const sampleFunds: Record<string, Fund[]> = {
  "Small Cap Funds": [
    { name: "Quant Small Cap Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 1000, threeYReturns: "23.24% p.a", rating: 5 },
    { name: "Invesco India Small Cap Fund", type: "REGULAR • GROWTH", rank: 2, minSIP: 500, threeYReturns: "25.03% p.a", rating: 5 },
    { name: "Canara Robeco Small Cap Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 1000, threeYReturns: "16.33% p.a", rating: 4 },
    { name: "Nippon India Small Cap Fund Plan", type: "REGULAR • GROWTH", rank: 4, minSIP: 100, threeYReturns: "22.37% p.a", rating: 5 },
    { name: "Franklin India Small Cap Fund", type: "REGULAR • GROWTH", rank: 5, minSIP: 500, threeYReturns: "21.51% p.a", rating: 4 },
    { name: "Kotak Small Cap Fund", type: "REGULAR • GROWTH", rank: 6, minSIP: 100, threeYReturns: "15.74% p.a", rating: 4 },
    { name: "HDFC Small Cap Fund", type: "REGULAR • GROWTH", rank: 7, minSIP: 100, threeYReturns: "22.13% p.a", rating: 5 },
  ],
  "Mid Cap Funds": [
    { name: "Quant Mid Cap Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 1000, threeYReturns: "16.19% p.a", rating: 4 },
    { name: "Motilal Oswal Midcap Fund", type: "REGULAR • GROWTH", rank: 2, minSIP: 500, threeYReturns: "26.15% p.a", rating: 5 },
    { name: "HDFC Mid Cap Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 100, threeYReturns: "25.77% p.a", rating: 5 },
    { name: "Nippon India Growth Fund Plan Growth", type: "REGULAR • GROWTH", rank: 4, minSIP: 100, threeYReturns: "25.21% p.a", rating: 5 },
    { name: "SBI Midcap Fund Regular Plan Growth", type: "REGULAR • GROWTH", rank: 5, minSIP: 500, threeYReturns: "16.31% p.a", rating: 4 },
    { name: "Franklin India Mid Cap Fund", type: "REGULAR • GROWTH", rank: 6, minSIP: 500, threeYReturns: "22.06% p.a", rating: 4 },
    { name: "Mahindra Manulife Mid Cap Fund", type: "REGULAR • GROWTH", rank: 7, minSIP: 500, threeYReturns: "23.79% p.a", rating: 5 },
  ],
  "Large Cap Funds": [
    { name: "Nippon India Large Cap Fund Plan Growth", type: "REGULAR • GROWTH", rank: 1, minSIP: 100, threeYReturns: "18.45% p.a", rating: 4 },
    { name: "ICICI Prudential Large Cap Fund (erstwhile Bluechip Fund) Growth", type: "REGULAR • GROWTH", rank: 2, minSIP: 100, threeYReturns: "17.62% p.a", rating: 4 },
    { name: "Bandhan Large Cap Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 100, threeYReturns: "16.27% p.a", rating: 4 },
    { name: "Canara Robeco Large Cap Fund Regulargrowth", type: "REGULAR • GROWTH", rank: 4, minSIP: 100, threeYReturns: "14.81% p.a", rating: 3 },
    { name: "Aditya Birla Sun Life Large Cap Fund Growth", type: "REGULAR • GROWTH", rank: 5, minSIP: 100, threeYReturns: "15.04% p.a", rating: 4 },
    { name: "DSP Large Cap Fund", type: "REGULAR • GROWTH", rank: 6, minSIP: 100, threeYReturns: "17.40% p.a", rating: 4 },
    { name: "HSBC Large Cap Fund", type: "REGULAR • GROWTH", rank: 7, minSIP: 500, threeYReturns: "13.91% p.a", rating: 3 },
  ],
  "Flexi Cap Funds": [
    { name: "Parag Parikh Flexi Cap Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 1000, threeYReturns: "20.79% p.a", rating: 5 },
    { name: "Franklin India Flexi Cap Fund", type: "REGULAR • GROWTH", rank: 2, minSIP: 500, threeYReturns: "17.73% p.a", rating: 4 },
    { name: "JM Flexicap Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 100, threeYReturns: "20.68% p.a", rating: 5 },
    { name: "Canara Robeco Flexi Cap Fund", type: "REGULAR • GROWTH", rank: 4, minSIP: 100, threeYReturns: "15.24% p.a", rating: 4 },
    { name: "HSBC Flexi Cap Fund", type: "REGULAR • GROWTH", rank: 5, minSIP: 500, threeYReturns: "19.41% p.a", rating: 4 },
    { name: "HDFC Flexi Cap Fund Growth Plan", type: "REGULAR • GROWTH", rank: 6, minSIP: 100, threeYReturns: "21.33% p.a", rating: 5 },
    { name: "TATA Flexi Cap Fund", type: "REGULAR • GROWTH", rank: 7, minSIP: 100, threeYReturns: "15.64% p.a", rating: 4 },
  ],
  "Index Funds": [
    { name: "ICICI Prudential Nifty Next 50 Index Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 100, threeYReturns: "17.19% p.a", rating: 4 },
    { name: "UTI Nifty 50 Index Fund", type: "REGULAR • GROWTH", rank: 2, minSIP: 500, threeYReturns: "12.76% p.a", rating: 4 },
    { name: "HDFC BSE Sensex Index Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 100, threeYReturns: "11.63% p.a", rating: 3 },
    { name: "Motilal Oswal Nifty Midcap 150 Index Fund", type: "REGULAR • GROWTH", rank: 4, minSIP: 500, threeYReturns: "22.71% p.a", rating: 5 },
    { name: "DSP Nifty 50 Equal Weight Index Fund Reg", type: "REGULAR • GROWTH", rank: 5, minSIP: 100, threeYReturns: "16.34% p.a", rating: 4 },
    { name: "ICICI Prudential BSE Sensex Index Fund", type: "REGULAR • GROWTH", rank: 6, minSIP: 100, threeYReturns: "11.71% p.a", rating: 3 },
    { name: "HDFC Nifty 50 Index Fund", type: "REGULAR • GROWTH", rank: 7, minSIP: 100, threeYReturns: "12.69% p.a", rating: 4 },
  ],
  "Multi Cap Funds": [
    { name: "ICICI Prudential Multicap Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 100, threeYReturns: "19.58% p.a", rating: 5 },
    { name: "Nippon India Multi Cap Fund Plan Growth", type: "REGULAR • GROWTH", rank: 2, minSIP: 100, threeYReturns: "21.62% p.a", rating: 5 },
    { name: "Quant Multi Cap Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 1000, threeYReturns: "10.93% p.a", rating: 3 },
    { name: "Mahindra Manulife Multi Cap Fund", type: "REGULAR • GROWTH", rank: 4, minSIP: 500, threeYReturns: "19.18% p.a", rating: 4 },
    { name: "Baroda BNP Paribas Multi Cap Fund", type: "REGULAR • GROWTH", rank: 5, minSIP: 250, threeYReturns: "18.55% p.a", rating: 4 },
    { name: "Invesco India Multicap Fund", type: "REGULAR • GROWTH", rank: 6, minSIP: 500, threeYReturns: "17.70% p.a", rating: 4 },
    { name: "ITI Multi Cap Fund", type: "REGULAR • GROWTH", rank: 7, minSIP: 500, threeYReturns: "18.86% p.a", rating: 4 },
  ],
  "Value Funds": [
    { name: "Nippon India Value Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 100, threeYReturns: "21.72% p.a", rating: 5 },
    { name: "ICICI Prudential Value Fund (erstwhile Value Discovery Fund) Growth", type: "REGULAR • GROWTH", rank: 2, minSIP: 100, threeYReturns: "21.17% p.a", rating: 5 },
    { name: "Templeton India Value Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 500, threeYReturns: "17.16% p.a", rating: 4 },
    { name: "TATA Value Fund Regular Plan Growth", type: "REGULAR • GROWTH", rank: 4, minSIP: 100, threeYReturns: "19.35% p.a", rating: 4 },
    { name: "Bandhan Value Fund", type: "REGULAR • GROWTH", rank: 5, minSIP: 100, threeYReturns: "17.29% p.a", rating: 4 },
    { name: "Aditya Birla Sun Life Value Fund", type: "REGULAR • GROWTH", rank: 6, minSIP: 100, threeYReturns: "19.82% p.a", rating: 5 },
  ],
  "Others": [
    { name: "Mirae Asset Hybrid Equity Fund", type: "REGULAR • GROWTH", rank: 1, minSIP: 100, threeYReturns: "18.22% p.a", rating: 4 },
    { name: "UTI Balanced Advantage Fund", type: "REGULAR • GROWTH", rank: 2, minSIP: 500, threeYReturns: "17.05% p.a", rating: 4 },
    { name: "ICICI Prudential Balanced Advantage Fund", type: "REGULAR • GROWTH", rank: 3, minSIP: 100, threeYReturns: "16.55% p.a", rating: 4 },
    { name: "Axis Balanced Advantage Fund", type: "REGULAR • GROWTH", rank: 4, minSIP: 100, threeYReturns: "15.92% p.a", rating: 3 },
    { name: "DSP Dynamic Asset Allocation Fund", type: "REGULAR • GROWTH", rank: 5, minSIP: 500, threeYReturns: "14.77% p.a", rating: 3 },
  ],
};

// Medal Icon Component
const MedalIcon = ({ rank }: { rank: number }) => {
  const getMedalClass = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-500 border-yellow-300";
      case 2: return "text-gray-400 border-gray-300";
      case 3: return "text-orange-600 border-orange-400";
      default: return "text-blue-500 border-blue-300";
    }
  };

  const getRankSuffix = (rank: number) => {
    if (rank === 1) return "st";
    if (rank === 2) return "nd";
    if (rank === 3) return "rd";
    return "th";
  };

  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${getMedalClass(rank)} bg-white shadow-sm text-xs font-bold`}>
      {rank}{getRankSuffix(rank)}
    </div>
  );
};

export default function AllMutualFundsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Small Cap Funds");

  // Example Google Drive PDF preview link
  const pdfUrl = "https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/preview";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">
            All Mutual Funds
          </h1>
          <div className="w-16"></div>
        </motion.div>

        {/* Cards */}
        <div className="items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200">
          <h2 className="text-2xl font-bold text-center mb-6">Top Mutual Funds For You</h2>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Responsive Grid Table Layout */}
          <div className="space-y-3">
            {/* Column Headers */}
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-3 bg-gray-50 rounded-t-lg border-b border-gray-200 text-sm font-medium text-gray-700">
              <div>Fund</div>
              <div className="text-center">Rank</div>
              <div className="text-right">Min SIP</div>
              <div className="text-right">3Y Returns</div>
              <div className="text-center">Rating</div>
            </div>

            {/* Fund Rows */}
            {sampleFunds[activeTab].map((fund, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center p-4 border bg-white hover:shadow-md transition rounded-lg"
              >
                {/* Fund Name + Type */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {fund.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{fund.type}</div>
                    <h3 className="font-semibold text-base">{fund.name}</h3>
                  </div>
                </div>

                {/* Rank */}
                <div className="flex justify-center">
                  <MedalIcon rank={fund.rank} />
                </div>

                {/* Min SIP */}
                <div className="text-right">
                  <span className="text-sm font-medium">₹{fund.minSIP}</span>
                </div>

                {/* 3Y Returns */}
                <div className="text-right">
                  <span className="text-sm text-green-600 font-medium">{fund.threeYReturns}</span>
                </div>

                {/* Rating */}
                <div className="flex justify-center">
                  <div className="flex items-center text-yellow-500 text-sm font-medium">
                    {"⭐".repeat(fund.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: PDF Viewer (Google Drive) - Commented out for now */}
        {/* <motion.div
          className="bg-white rounded-2xl shadow-xl border border-emerald-200 overflow-hidden h-[calc(100vh-220px)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            allow="autoplay"
          />
        </motion.div> */}
      </div>
    </div>
  );
}