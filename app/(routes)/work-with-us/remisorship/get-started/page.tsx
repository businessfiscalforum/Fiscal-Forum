"use client";
import React, { useState } from 'react';
import {
  Home, Users, FileText, Calculator, CreditCard,
  Shield,
  TrendingUp,
  Zap,
  Award,
  Target,
  Rocket,
  Sparkles,
  Flame,
  Trophy,
  Lightbulb,
  Gift,
  ArrowRight,
} from 'lucide-react';

type TabId = 'Stock Broking'| 'Mutual Funds' | 'Insurance' | "Brochure";

const GetStartedPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>('Stock Broking');

  // Define the main tabs (unchanged)
  const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'Stock Broking', label: 'Stock Broking', icon: Home },
    { id: 'Mutual Funds', label: 'Mutual Funds', icon: Calculator },
    { id: "Insurance", label: "Insurance", icon: Shield },
    { id: "Brochure", label: "Brochure", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-32 px-4 shadow-lg">
        <div className="w-full mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
            Revenue Sharing Overview
          </h1>
          <p className="mt-4 text-lg text-center text-teal-100 max-w-3xl drop-shadow">
            Discover the lucrative referral incentives across our range of financial products.
          </p>
        </div>
      </header>

      {/* Navigation Tabs (UNTOUCHED) */}
      <div className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-emerald-100"> 
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

      {/* Content Area - FULL WIDTH WITH MORE PADDING */}
      <main className="w-full px-6 py-12">
        {/* Stock Broking Tab - ONLY SUMMARY CONTENT */}
        {activeTab === "Stock Broking" && (
          <div className="w-full max-w-none">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-10 mb-16 shadow-2xl transform transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-10"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                  Unlock Your Earning Potential
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                </h2>
                <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
                  Maximize your income with our flexible revenue sharing model
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-700 mb-2">Max Incentive</h3>
                    <p className="text-4xl font-extrabold text-gray-800 mt-1">₹500</p>
                    <p className="text-lg text-gray-600 mt-2">Per account</p>
                  </div>
                  <Award className="w-16 h-16 text-emerald-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-teal-700 mb-2">First 4 Months</h3>
                    <p className="text-4xl font-extrabold text-gray-800 mt-1">45%</p>
                    <p className="text-lg text-gray-600 mt-2">Brokerage Share</p>
                  </div>
                  <Target className="w-16 h-16 text-teal-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-gray-200 shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">After 5 Months</h3>
                    <p className="text-4xl font-extrabold text-emerald-700 mt-1">20%</p>
                    <p className="text-lg text-gray-600 mt-2">Variable Brokerage</p>
                  </div>
                  <Rocket className="w-16 h-16 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-yellow-200 shadow-xl p-8 mb-16">
              <h3 className="text-3xl font-bold text-center text-yellow-800 mb-8">
                Why Choose Our Program?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Sparkles, title: "High Rewards", desc: "Up to ₹500 per account" },
                  { icon: Trophy, title: "Lifetime Earnings", desc: "Extended sharing for top performers" },
                  { icon: Flame, title: "Quick Start", desc: "45% sharing in first 4 months" },
                  { icon: Lightbulb, title: "Flexible", desc: "Works with multiple brokers" },
                  { icon: Gift, title: "No Limits", desc: "Unlimited earning potential" },
                  { icon: Zap, title: "Easy Setup", desc: "Simple registration process" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={i} 
                      className="bg-white rounded-xl p-6 shadow-md border border-yellow-100 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Icon className="w-10 h-10 text-yellow-600 mb-3" />
                        <h4 className="font-bold text-lg text-yellow-800 mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-10 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Earning?</h3>
              <p className="text-xl mb-6 opacity-90">
                Join our partner program today and start maximizing your revenue
              </p>
              <button className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-4 px-8 rounded-full text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Get Started Now
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Other Tabs (Unchanged) */}
        

        {activeTab === "Mutual Funds" && (
          <div className="text-center space-y-8">
            <div className="bg-emerald-50 border border-emerald-200 p-10 rounded-3xl">
              <TrendingUp className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Mutual Funds Commission</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                The referral structure varies depending on the specific mutual fund. Please refer to the detailed document below.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Detailed Commission Structure</h3>
              <iframe
                src="https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/preview"
                width="100%"
                height="600"
                className="border border-gray-300 rounded-xl"
                title="Mutual Funds PDF"
              >
                <p className="text-gray-600 text-center p-4">
                  Unable to load PDF.{" "}
                  <a
                    href="https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Download here
                  </a>
                </p>
              </iframe>
            </div>
          </div>
        )}

        {activeTab === "Insurance" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-800">Insurance Commission Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { type: "Health Insurance", commission: "Upto 20%" },
                { type: "Motor Insurance", commission: "Upto 15%" },
                { type: "Life Insurance", commission: "Upto 30%" },
                { type: "General Insurance", commission: "Upto 20%" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-2xl text-white shadow-xl text-center group hover:scale-105 transition-transform"
                >
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h3 className="font-bold text-2xl mb-3">{item.type}</h3>
                  <div className="text-3xl font-extrabold drop-shadow-lg">
                    {item.commission}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-500 text-center mt-6">
              *Commissions vary based on policy term and product type.
            </p>
          </div>
        )}

        {activeTab === "Brochure" && (
          <div className="text-center space-y-8">

            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Fiscal Forum Brochure</h3>
              <iframe
                src="https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/preview"
                width="100%"
                height="600"
                className="border border-gray-300 rounded-xl"
                title="Mutual Funds PDF"
              >
                <p className="text-gray-600 text-center p-4">
                  Unable to load PDF.{" "}
                  <a
                    href="https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    Download here
                  </a>
                </p>
              </iframe>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GetStartedPage;