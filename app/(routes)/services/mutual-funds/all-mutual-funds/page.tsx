"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

type Fund = {
  name: string;
  rating: number;
};

const tabs = ["Most Popular", "Highest Rated Funds", "Top Picks", "Equity Based"];

const sampleFunds: Record<string, Fund[]> = {
  "Most Popular": [
    { name: "Mirae Asset Corp Bond Fund-Reg(G)", rating: 5 },
    { name: "Navi Aggressive Hybrid Fund-Reg(G)", rating: 5 },
    { name: "Nippon India Floater Fund(IDCW)-Direct Plan", rating: 4 },
    { name: "Navi Liquid Fund(M-IDCW)-Direct Plan", rating: 5 },
    { name: "Quant Healthcare Fund(IDCW)-Direct Plan", rating: 3 },
    { name: "Union Flexi Cap Fund-Reg(IDCW-Reinv)", rating: 4 },
  ],
  "Highest Rated Funds": [
    { name: "HSBC Arbitrage Fund(G)-Direct Plan", rating: 5 },
    { name: "Kotak Medium Term Fund(G)", rating: 4 },
    { name: "ITI ELSS Tax Saver Fund-Reg(G)", rating: 5 },
    { name: "JM Short Duration Fund-Reg(G)", rating: 5 },
    { name: "LIC MF Healthcare Fund-Reg(IDCW)", rating: 4 },
    { name: "Mirae Asset Arbitrage Fund-Reg(G)", rating: 5 },
  ],
  "Top Picks": [
    { name: "Franklin India Multi Cap Fund-Reg(IDCW)", rating: 5 },
    { name: "Groww Short Duration Fund(FN-IDCW)-Direct Plan", rating: 4 },
    { name: "HDFC Banking and PSU Debt Fund-Reg(G)", rating: 5 },
    { name: "HSBC Consumption Fund(IDCW)-Direct Plan", rating: 4 },
    { name: "ICICI Pru BSE Sensex Index Fund(G)", rating: 3 },
    { name: "Invesco India Contra Fund(IDCW)-Direct Plan", rating: 4 },
  ],
  "Equity Based": [
    { name: "Aditya Birla SL Equity Savings Fund(G)-Direct Plan", rating: 4 },
    { name: "Axis India Manufacturing Fund-Reg(IDCW)", rating: 5 },
    { name: "Bajaj Finserv Balanced Advantage Fund(G)-Direct Plan", rating: 4 },
    { name: "Bandhan Arbitrage Fund-Reg(G)", rating: 5 },
    { name: "Bandhan Transportation and Logistics Fund-Reg(G)", rating: 4 },
    { name: "Franklin India Equity Savings Fund(IDCW Payout)", rating: 4 },
  ],
};

export default function AllMutualFundsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Top Picks");

  // Example Google Drive PDF preview link
  const pdfUrl = "https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/preview";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
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

          {/* Fund Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {sampleFunds[activeTab].map((fund, i) => (
              <div
                key={i}
                className="rounded-2xl flex flex-col justify-between shadow p-4 border bg-white hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{fund.name}</h3>
                  <div className="flex items-center text-yellow-500 text-sm font-medium">
                    {"⭐".repeat(fund.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Viewer (Google Drive) */}
        <motion.div
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
        </motion.div>
      </div>
    </div>
  );
}
