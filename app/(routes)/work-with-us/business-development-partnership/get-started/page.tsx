"use client";
import React, { useState } from 'react';
import {
  Home, Users, FileText, Calculator, Percent, CreditCard
} from 'lucide-react';

// Define types for the data
interface StockBroking {
  company: string;
  incentive: string;
  brokerageSharing: string;
  additionalInfo: string;
}

interface LoanDetail {
  amount: string;
  percentage: string;
}

interface SavingAccount {
  bank: string;
  incentive: string;
  remark: string;
}

interface CreditCardItem {
  cards: string;
  incentive: string;
}

type TabId = 'Stock Broking' | 'Loans' | 'Saving A/C' | 'Mutual Funds' | 'Credit Card';

const GetStartedPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>('Stock Broking');

  // Define the main tabs
  const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'Stock Broking', label: 'Stock Broking', icon: Home },
    { id: 'Loans', label: 'Loans', icon: Users },
    { id: 'Saving A/C', label: 'Savings Account', icon: FileText },
    { id: 'Mutual Funds', label: 'Mutual Funds', icon: Calculator },
    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard }, // Changed icon
  ];

  // Define the data for each tab
  const referralData = {
    'Stock Broking': [
      {
        company: 'Angel One',
        incentive: 'Up to ₹300',
        brokerageSharing: '15% for 2 years. If working regularly and earning high brokerage, extended to lifetime.',
        additionalInfo: 'Login within 15 days'
      },
      {
        company: 'Motilal Oswal',
        incentive: 'Depends on contest',
        brokerageSharing: '15% for 2 years. If working regularly and earning high brokerage, extended to lifetime.',
        additionalInfo: 'No'
      },
      {
        company: 'Choice Broking',
        incentive: 'Depends on contest',
        brokerageSharing: '25% sharing (same as Motilal Oswal)',
        additionalInfo: 'No'
      },
      {
        company: 'Upstox',
        incentive: 'Upto ₹100',
        brokerageSharing: '10% brokerage sharing (same as Angel One)',
        additionalInfo: 'No'
      },
      {
        company: 'Alice Blue',
        incentive: 'Depends on contest',
        brokerageSharing: '20% brokerage sharing',
        additionalInfo: 'No'
      },
      {
        company: 'Prudent', // Corrected from Fund Bazaar based on your data
        incentive: 'N/A',
        brokerageSharing: '20% brokerage sharing for 5 years',
        additionalInfo: 'No'
      }
    ],
    'Loans': {
      'Personal Loan & Business Loan': [
        { amount: 'Upto 5 Lacs', percentage: '0.35%' },
        { amount: '5.01 – 10 Lacs', percentage: '0.50%' },
        { amount: '10.01 – 25 Lacs', percentage: '0.60%' },
        { amount: 'Above 25 Lacs', percentage: '0.75%' }
      ],
      'Home Loan': [
        { amount: 'Upto 2 Cr', percentage: '0.30%' },
        { amount: 'Above 2 Cr', percentage: '0.35%' }
      ],
      'Loan Against Property': [
        { amount: 'Upto 2 Cr', percentage: '0.35%' },
        { amount: 'Above 2 Cr', percentage: '0.45%' }
      ]
    },
    'Saving A/C': [
      {
        bank: 'IndusInd Bank',
        incentive: '₹200',
        remark: 'One-time deposit of ₹5,000. Instant activation with Video KYC (nearest branch allocated)'
      },
      {
        bank: 'Axis Bank',
        incentive: '₹500',
        remark: 'Maintain ₹10,000 balance'
      },
      {
        bank: 'P. Money', // Corrected from Fi Money based on your data
        incentive: '₹90',
        remark: '0 balance account'
      }
    ],
    'Mutual Funds': [
      {
        type: 'Every fund has different structure',
        details: 'The referral structure varies depending on the specific mutual fund.'
      }
    ],
    'Credit Card': [
      { cards: '1 – 3', incentive: '₹500' },
      { cards: '3 – 10', incentive: '₹600' },
      { cards: '10 – 25', incentive: '₹700' },
      { cards: '25 – 50', incentive: '₹800' },
      { cards: 'Above 51', incentive: '₹900' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100"> {/* Updated background */}
      
      {/* Improved Header */}
      <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-32 px-4 shadow-lg"> {/* Updated header */}
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center">Check Your Revenue Sharing</h1> {/* Larger, bolder text */}
          <p className="mt-3 text-lg text-center text-teal-100 max-w-3xl"> {/* Subtitle */}
            Discover the lucrative referral incentives across our range of financial products.
          </p>
        </div>
      </header>

      {/* Improved Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-emerald-100"> {/* Updated tab bar background and shadow */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-1 py-3"> {/* Centered tabs with wrapping and gap */}
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 font-semibold rounded-lg transition-all duration-200 ease-in-out ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-md' // Active state: vibrant emerald background, white text, shadow
                      : 'text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900' // Inactive state: dark green text, light hover
                  }`}
                >
                  <IconComponent className="w-5 h-5" /> {/* Slightly larger icons */}
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6"> {/* Adjusted padding */}
        {/* Render content based on active tab */}
        {activeTab === 'Stock Broking' && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-200 pb-2">Stock Broking Referral Incentives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid */}
              {referralData['Stock Broking'].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-100 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-emerald-700">{item.company}</h3>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">{item.incentive}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Brokerage Sharing</p>
                      <p className="text-gray-700">{item.brokerageSharing}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Additional Info</p>
                      <p className="text-gray-700">{item.additionalInfo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Loans' && (
          <div className="space-y-8 mt-6">
            <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-200 pb-2">Loan Referral Incentives</h2>
            
            {/* Personal Loan & Business Loan */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border border-blue-200">
              <h3 className="font-bold text-xl text-blue-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Personal & Business Loan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {referralData['Loans']['Personal Loan & Business Loan'].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex flex-col items-center justify-center">
                    <span className="text-gray-600 text-center">{item.amount}</span>
                    <span className="text-blue-700 font-extrabold text-2xl mt-1">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Loan */}
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-2xl shadow-lg border border-purple-200">
              <h3 className="font-bold text-xl text-purple-800 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" /> Home Loan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {referralData['Loans']['Home Loan'].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex flex-col items-center justify-center">
                    <span className="text-gray-600 text-center">{item.amount}</span>
                    <span className="text-purple-700 font-extrabold text-2xl mt-1">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Against Property */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl shadow-lg border border-amber-200 mb-6">
              <h3 className="font-bold text-xl text-amber-800 mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5" /> Loan Against Property
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {referralData['Loans']['Loan Against Property'].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 flex flex-col items-center justify-center">
                    <span className="text-gray-600 text-center">{item.amount}</span>
                    <span className="text-amber-700 font-extrabold text-2xl mt-1">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Saving A/C' && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-200 pb-2">Savings Account Referral Incentives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {referralData['Saving A/C'].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-green-100 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-green-700">{item.bank}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">{item.incentive}</span>
                  </div>
                  <p className="text-gray-700">{item.remark}</p>
                </div>
              ))}
            </div>
          </div>
        )}

                {activeTab === "Mutual Funds" && (
                  <div className="mt-6 space-y-6">
                    {" "}
                    {/* Added space-y-6 for consistent spacing */}
                    <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-200 pb-2">
                      Mutual Funds Referral Incentives
                    </h2>
                    {/* Information Card */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl shadow-lg border border-yellow-200 max-w-3xl mx-auto text-center">
                      <Calculator className="w-10 h-10 text-yellow-600 mx-auto mb-3" />{" "}
                      {/* Slightly smaller icon */}
                      <p className="text-lg text-yellow-800 font-medium">
                        The referral structure varies depending on the specific mutual
                        fund. Please refer to the detailed document below.
                      </p>
                    </div>
                    {/* PDF Preview Container */}
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-yellow-200 max-w-6xl mx-auto overflow-hidden">
                      {" "}
                      {/* Added overflow-hidden */}
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3 text-center">
                        {" "}
                        {/* Added a sub-heading for the PDF */}
                        Detailed Referral Structure Document
                      </h3>
                      <div className="pt-2">
                        {" "}
                        {/* Reduced top padding */}
                        {/* PDF Iframe - Corrected src */}
                        <iframe
                          src="https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/preview"
                          width="100%"
                          height="600px"
                          title="Mutual Funds Referral Structure"
                          className="rounded-lg border border-gray-300"
                          // Removed sandbox for simplicity, add if needed for security
                        >
                          {/* More specific fallback message */}
                          <p className="text-center text-gray-700">
                            Your browser does not support embedded PDFs. You can view or
                            download the document
                            <a
                              href="https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/view?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline mx-1"
                            >
                              here
                            </a>
                            .
                          </p>
                        </iframe>
                      </div>
                    </div>
                  </div>
                )}

        {activeTab === 'Credit Card' && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-200 pb-2 mb-6">Credit Card Referral Incentives</h2>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl shadow-lg border border-rose-200">
              <h3 className="font-bold text-xl text-rose-800 mb-4 text-center">Number of Cards vs. Incentive per Card</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {referralData['Credit Card'].map((item, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-rose-100 flex flex-col items-center justify-center">
                    <span className="text-gray-600 text-center font-medium">{item.cards}</span>
                    <span className="text-rose-700 font-extrabold text-2xl mt-2">{item.incentive}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-rose-600 mt-6 text-center italic">T&C: Incentive will be given after issuing the card.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GetStartedPage;