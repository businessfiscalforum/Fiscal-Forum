// pages/dashboard.tsx or app/dashboard/page.tsx
"use client";

import React from "react";
import ReferralSection from '../_components/ReferralSection';
import { Wallet, Clock, Users, CheckCircle2, ArrowRight } from "lucide-react";

const Dashboard = () => {

  const stats = {
    totalEarnings: 12500.75,
    pendingEarnings: 3200.00,
    totalReferrals: 42,
    activeReferrals: 38,
  };

  const recentReferrals = [
    { id: 1, name: "Priya Kumar", date: "2026-06-22", status: "Active" },
    { id: 2, name: "Rajesh Patel", date: "2026-06-20", status: "Pending" },
    { id: 3, name: "Sneha Gupta", date: "2026-06-15", status: "Active" },
    { id: 4, name: "Vikram Singh", date: "2026-06-10", status: "Active" },
  ];

  const earningsHistory = [
    { id: 1, source: "Loan Referral (Rajesh Patel)", amount: 1500.00, date: "2026-06-22" },
    { id: 2, source: "Credit Card Referral (Priya Kumar)", amount: 600.00, date: "2026-06-18" },
    { id: 3, source: "Stock Broking (Sneha Gupta)", amount: 300.00, date: "2026-06-05" },
    { id: 4, source: "Savings A/C (Vikram Singh)", amount: 200.00, date: "2026-05-28" },
  ];

  return (
    <div className="min-h-screen bg-[#F4FBF7] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="border-b border-black pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight uppercase">
                User Dashboard
              </h1>
              <p className="text-lg font-medium text-gray-700 mt-2">
                Track your financial referrals, metrics, and premium earnings in real-time.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-black text-black font-bold rounded-xl shadow-sm">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              Live Account Status
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Earnings",
              value: `₹${stats.totalEarnings.toLocaleString("en-IN")}`,
              icon: Wallet,
              bgColor: "bg-emerald-100",
              textColor: "text-emerald-800",
            },
            {
              label: "Pending Earnings",
              value: `₹${stats.pendingEarnings.toLocaleString("en-IN")}`,
              icon: Clock,
              bgColor: "bg-yellow-100",
              textColor: "text-yellow-800",
            },
            {
              label: "Total Referrals",
              value: stats.totalReferrals,
              icon: Users,
              bgColor: "bg-blue-100",
              textColor: "text-blue-800",
            },
            {
              label: "Active Referrals",
              value: stats.activeReferrals,
              icon: CheckCircle2,
              bgColor: "bg-purple-100",
              textColor: "text-purple-800",
            },
          ].map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-black p-6 rounded-2xl shadow-md  hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </span>
                  <div className={`p-3 rounded-xl border border-black ${stat.bgColor}`}>
                    <IconComp className="h-5 w-5 text-black" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-black">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Referral section (takes 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <ReferralSection />
          </div>

          {/* Right Column: Earnings History & Recent Referrals (takes 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Earnings History panel */}
            <div className="bg-white border border-black rounded-3xl p-6 shadow-md">
              <div className="flex items-center justify-between border-b border-black pb-4 mb-4">
                <h3 className="text-xl font-bold uppercase text-black">
                  Earnings History
                </h3>
                <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">
                  LATEST
                </span>
              </div>
              <div className="space-y-3">
                {earningsHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 border border-black hover:border-black rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div>
                      <p className="font-bold text-sm text-black">{item.source}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{item.date}</p>
                    </div>
                    <div className="text-base font-bold text-emerald-600">
                      +₹{item.amount.toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Referrals list */}
            <div className="bg-white border border-black rounded-3xl p-6 shadow-md">
              <div className="flex items-center justify-between border-b border-black pb-4 mb-4">
                <h3 className="text-xl font-bold uppercase text-black">
                  Recent Sign-ups
                </h3>
                <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">
                  PENDING ACTIONS
                </span>
              </div>
              <div className="space-y-3">
                {recentReferrals.map((ref) => (
                  <div
                    key={ref.id}
                    className="flex items-center justify-between p-3.5 border border-black hover:border-black rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-black flex items-center justify-center font-bold text-black text-xs">
                        {ref.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-black">{ref.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ref.date}</p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded border border-black ${
                          ref.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ref.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;