// pages/dashboard.tsx or app/dashboard/page.tsx
"use client";

import React from "react";
import { FaUserFriends, FaRupeeSign, FaChartBar, FaGift, FaCopy, FaShareAlt } from "react-icons/fa";

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FaRupeeSign className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-800">₹{stats.totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <FaRupeeSign className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Earnings</p>
              <p className="text-2xl font-bold text-gray-800">₹{stats.pendingEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FaUserFriends className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalReferrals}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <FaChartBar className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Referrals</p>
              <p className="text-2xl font-bold text-gray-800">{stats.activeReferrals}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Referral Info & Recent */}
          <div className="flex-1 space-y-8">
            {/* Referral Code Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaGift className="mr-2 text-emerald-600" /> Your Referral Code
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <span className="text-lg font-mono font-bold text-gray-900 mb-2 sm:mb-0">{user.referralCode}</span>
                <button
                  onClick={copyReferralCode}
                  className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <FaCopy className="mr-2" /> Copy Code
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Share your referral code with friends and family. When they join Fiscal Forum using your code, you both earn rewards!
              </p>
              <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
                <FaShareAlt className="mr-2" /> Share Link
                {/* Implement sharing logic (e.g., navigator.share API) */}
              </button>
            </div>

            {/* Recent Referrals */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Referrals</h2>
              {recentReferrals.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentReferrals.map((referral) => (
                        <tr key={referral.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{referral.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{referral.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              referral.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {referral.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">You haven&apos;t referred anyone yet.</p>
              )}
            </div>
          </div>

          {/* Right Column - Earnings History */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Earnings History</h2>
              {earningsHistory.length > 0 ? (
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}> {/* Adjust maxHeight as needed */}
                  <ul className="divide-y divide-gray-200">
                    {earningsHistory.map((earning) => (
                      <li key={earning.id} className="py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{earning.source}</p>
                            <p className="text-sm text-gray-500">{earning.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">+ ₹{earning.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            {/* <p className="text-xs text-gray-500">Credited</p> */}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500">No earnings history yet.</p>
              )}
              {/* Placeholder for Withdrawal CTA or Link */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  Request Withdrawal (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;