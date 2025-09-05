// pages/dashboard.tsx or app/dashboard/page.tsx
"use client";

import React from "react";
import ReferralSection from '../_components/ReferralSection';

const Dashboard = () => {
  // --- Static Data ---
  const user = {
    name: "Amit Sharma",
    referralCode: "FF123XYZ",
  };

  const stats = {
    totalEarnings: 12500.75,
    pendingEarnings: 3200.00,
    totalReferrals: 42,
    activeReferrals: 38, // Example: Referrals who completed an action
  };

  const recentReferrals = [
    { id: 1, name: "Priya Kumar", date: "2023-10-26", status: "Active" },
    { id: 2, name: "Rajesh Patel", date: "2023-10-20", status: "Pending" },
    { id: 3, name: "Sneha Gupta", date: "2023-10-15", status: "Active" },
    { id: 4, name: "Vikram Singh", date: "2023-10-10", status: "Active" },
  ];

  const earningsHistory = [
    { id: 1, source: "Loan Referral (Rajesh Patel)", amount: 1500.00, date: "2023-10-22" },
    { id: 2, source: "Credit Card Referral (Priya Kumar)", amount: 600.00, date: "2023-10-18" },
    { id: 3, source: "Stock Broking (Sneha Gupta)", amount: 300.00, date: "2023-10-05" },
    { id: 4, source: "Savings A/C (Vikram Singh)", amount: 200.00, date: "2023-09-28" },
  ];

  // --- Functions ---
  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    alert(`Referral code ${user.referralCode} copied to clipboard!`);
    // In a real app, you'd use a toast notification instead of alert
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Track your referrals and earnings.</p>
        </header>

        {/* Referral Section */}
        <ReferralSection />
      </div>
    </div>
  );
};

export default Dashboard;