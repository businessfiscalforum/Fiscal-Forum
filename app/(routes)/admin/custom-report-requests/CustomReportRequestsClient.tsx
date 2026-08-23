"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaTimes, FaSearch } from "react-icons/fa";

interface CustomReport {
  id: string;
  name: string;
  email: string;
  mobile: string;
  age: string | null;
  category: string;
  capitalInvestBorrow: string | null;
  returnExpected: string | null;
  investmentGoal: string | null;
  riskTolerance: string | null;
  investmentStyle: string | null;
  monthlySavings: string | null;
  addDetails: string | null;
  occupation: string | null;
  investmentPreference: string | null;
  annualIncome: string | null;
  dependents: string | null;
  maritalStatus: string | null;
  existingInsurance: string | null;
  insuranceCovers: string | null;
  loansLiabilities: string | null;
  monthlySpending: string | null;
  spendingCategories: string | null;
  flyFrequency: string | null;
  travelType: string | null;
  loungeImportance: string | null;
  feeComfort: string | null;
  loanPurpose: string | null;
  loanEmployment: string | null;
  loanMonthlyIncome: string | null;
  loanIncomeStability: string | null;
  loanAmount: string | null;
  loanHasCollateral: string | null;
  loanCollateralType: string | null;
  submittedAt: Date | string;
}

interface CustomReportRequestsClientProps {
  initialData: CustomReport[];
}

const categories = ["All", "Stocks", "Mutual Fund", "Insurance", "Credit Card", "Loan"];

export default function CustomReportRequestsClient({
  initialData,
}: CustomReportRequestsClientProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<CustomReport | null>(null);

  // Filter logic
  const filteredData = initialData.filter((item) => {
    const tabMatch = activeTab === "All" || item.category.toLowerCase() === activeTab.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    const searchMatch =
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.mobile.includes(searchLower);
    return tabMatch && searchMatch;
  });

  const formatDate = (dateVal: Date | string) => {
    const d = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "stocks":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "mutual fund":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200";
      case "insurance":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "credit card":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "loan":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const parseJsonArray = (jsonStr: string | null) => {
    if (!jsonStr) return [];
    try {
      return JSON.parse(jsonStr) as string[];
    } catch {
      return [jsonStr];
    }
  };

  const parseJsonObject = (jsonStr: string | null) => {
    if (!jsonStr) return {};
    try {
      return JSON.parse(jsonStr) as Record<string, string>;
    } catch {
      return {};
    }
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:truncate">
            Custom Report Requests
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            View and manage user requests for customized financial analysis reports.
          </p>
        </div>
      </div>

      {/* Tabs and Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Requests Count */}
      <div className="text-slate-500 text-sm mb-4">
        Showing {filteredData.length} of {initialData.length} request(s)
      </div>

      {/* Requests Grid */}
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 py-16 text-center shadow-sm">
          <span className="text-slate-400 text-4xl block mb-4">🔍</span>
          <h3 className="text-slate-700 font-bold text-lg mb-1">No requests found</h3>
          <p className="text-slate-500 text-sm">
            Try adjusting your search query or tab filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 hover:text-slate-900 transition-colors">
                    {item.name}
                  </h3>
                  <span className={`inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider ${getCategoryBadgeClass(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-xs flex items-center justify-end gap-1">
                    <FaCalendarAlt />
                    {formatDate(item.submittedAt).split(",")[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 space-y-4">
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-slate-400 shrink-0" />
                    <span className="truncate">{item.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-slate-400 shrink-0" />
                    <span>{item.mobile}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium uppercase tracking-wider mb-1">Age</span>
                    <span className="text-slate-700 font-bold text-sm">{item.age || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium uppercase tracking-wider mb-1">Capital / Amt</span>
                    <span className="text-slate-700 font-bold text-sm">
                      {item.capitalInvestBorrow ? `₹${item.capitalInvestBorrow}` : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Submitted: {new Date(item.submittedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </span>
                <button
                  onClick={() => setSelectedReport(item)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer / Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-left overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider ${getCategoryBadgeClass(selectedReport.category)}`}>
                  {selectedReport.category} Request
                </span>
                <h2 className="text-2xl font-bold text-slate-800 mt-2">{selectedReport.name}</h2>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-150 rounded-full transition-colors cursor-pointer"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex-1 space-y-8">
              {/* Contact Info block */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Contact Information
                </h4>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-slate-400" />
                    <div>
                      <span className="text-slate-400 text-xs block">Name</span>
                      <span className="font-semibold">{selectedReport.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-slate-400" />
                    <div>
                      <span className="text-slate-400 text-xs block">Email</span>
                      <span className="font-semibold truncate block max-w-[150px]">{selectedReport.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-slate-400" />
                    <div>
                      <span className="text-slate-400 text-xs block">Phone</span>
                      <span className="font-semibold">{selectedReport.mobile}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category specifics */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Category Parameters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Common details */}
                  <div className="border border-slate-100 rounded-xl p-4">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                      Age
                    </span>
                    <span className="text-slate-700 font-bold text-sm">
                      {selectedReport.age || "N/A"}
                    </span>
                  </div>

                  <div className="border border-slate-100 rounded-xl p-4">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                      Capital Requirement / Limit
                    </span>
                    <span className="text-slate-700 font-bold text-sm">
                      {selectedReport.capitalInvestBorrow ? `₹${selectedReport.capitalInvestBorrow}` : "N/A"}
                    </span>
                  </div>

                  {/* Stocks Specifics */}
                  {selectedReport.category.toLowerCase() === "stocks" && (
                    <>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Returns Expectation
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.returnExpected || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Investment Goal
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.investmentGoal || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Risk Tolerance
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.riskTolerance || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Investment Style
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.investmentStyle || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Monthly Savings
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.monthlySavings ? `₹${selectedReport.monthlySavings}` : "N/A"}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Mutual Fund Specifics */}
                  {selectedReport.category.toLowerCase() === "mutual fund" && (
                    <>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Occupation
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.occupation || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Goal
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.investmentGoal || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Risk Tolerance
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.riskTolerance || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Investment Preference
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.investmentPreference || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Monthly Savings
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.monthlySavings ? `₹${selectedReport.monthlySavings}` : "N/A"}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Insurance Specifics */}
                  {selectedReport.category.toLowerCase() === "insurance" && (
                    <>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Annual Income
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.annualIncome ? `₹${selectedReport.annualIncome}` : "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Monthly Savings
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.monthlySavings ? `₹${selectedReport.monthlySavings}` : "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Dependents
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.dependents || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Marital Status
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.maritalStatus || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4 sm:col-span-2">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-2">
                          Existing Insurance
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {parseJsonArray(selectedReport.existingInsurance).length > 0 ? (
                            parseJsonArray(selectedReport.existingInsurance).map((ins) => (
                              <span
                                key={ins}
                                className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg"
                              >
                                {ins}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-sm font-medium">None declared</span>
                          )}
                        </div>
                      </div>

                      {/* Active cover details */}
                      {Object.keys(parseJsonObject(selectedReport.insuranceCovers)).length > 0 && (
                        <div className="border border-slate-100 rounded-xl p-4 sm:col-span-2">
                          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-2">
                            Existing Covers Details
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                            {Object.entries(parseJsonObject(selectedReport.insuranceCovers)).map(([coverName, coverAmt]) => (
                              <div key={coverName} className="flex justify-between border-b border-slate-50 py-1">
                                <span className="text-slate-500 font-medium">{coverName}</span>
                                <span className="font-bold">₹{Number(coverAmt).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border border-slate-100 rounded-xl p-4 sm:col-span-2">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Loans & Liabilities
                        </span>
                        <p className="text-slate-700 text-sm font-semibold whitespace-pre-wrap">
                          {selectedReport.loansLiabilities || "None declared"}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Credit Card Specifics */}
                  {selectedReport.category.toLowerCase() === "credit card" && (
                    <>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Occupation
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.occupation || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Monthly Spending
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.monthlySpending ? `₹${selectedReport.monthlySpending}` : "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4 sm:col-span-2">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-2">
                          Major Spending Categories
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {parseJsonArray(selectedReport.spendingCategories).length > 0 ? (
                            parseJsonArray(selectedReport.spendingCategories).map((cat) => (
                              <span
                                key={cat}
                                className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-sm font-medium">None declared</span>
                          )}
                        </div>
                      </div>

                      {/* Travel details (only show if Travel frequency or travelType filled) */}
                      {(selectedReport.flyFrequency || selectedReport.travelType) && (
                        <div className="border border-slate-100 rounded-xl p-4 sm:col-span-2 space-y-3 bg-slate-50/50">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Travel Parameters
                          </h5>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-slate-400 block mb-1">Fly Frequency</span>
                              <span className="text-slate-700 font-bold text-sm">{selectedReport.flyFrequency || "N/A"}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block mb-1">Travel Type</span>
                              <span className="text-slate-700 font-bold text-sm">{selectedReport.travelType || "N/A"}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block mb-1">Lounge Importance (1-5)</span>
                              <span className="text-slate-700 font-bold text-sm">{selectedReport.loungeImportance || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border border-slate-100 rounded-xl p-4 sm:col-span-2">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Comfortable Annual Fee
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.feeComfort || "N/A"}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Loan Specifics */}
                  {selectedReport.category.toLowerCase() === "loan" && (
                    <>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Loan Purpose
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.loanPurpose || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Employment Type
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.loanEmployment || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Monthly Takehome
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.loanMonthlyIncome ? `₹${selectedReport.loanMonthlyIncome}` : "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Income Stability
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.loanIncomeStability || "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Borrow Amount Required
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.loanAmount ? `₹${Number(selectedReport.loanAmount).toLocaleString()}` : "N/A"}
                        </span>
                      </div>
                      <div className="border border-slate-100 rounded-xl p-4">
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block mb-1">
                          Collateral Offered
                        </span>
                        <span className="text-slate-700 font-bold text-sm">
                          {selectedReport.loanHasCollateral === "Yes" ? `Yes (${selectedReport.loanCollateralType})` : "No"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Requirements & Full Details */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  User Requirements Details
                </h4>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedReport.addDetails || "No additional specific details provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Request ID: {selectedReport.id}
              </span>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
