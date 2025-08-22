"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaFilePdf,
  FaEye,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaArrowUp,
  FaArrowDown,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

interface ResearchReport {
  id: string;
  title: string;
  stock: string;
  company: string;
  author: string;
  authorFirm: string;
  publishDate: string;
  sector: string;
  reportType: string;
  rating: "BUY" | "HOLD" | "SELL";
  targetPrice: string;
  currentPrice: string;
  upside: string;
  pages: number;
  views: number;
  recommendation: string;
  summary: string;
  pdfUrl: string;
  tags: string[];
}

interface ClientReportsPageProps {
  initialReports: ResearchReport[];
}

export default function ClientReportsPage({
  initialReports,
}: ClientReportsPageProps) {
  const tabs = [
    {id: "all", label: "All"},
    { id: "pre-market-research-report", label: "Pre-Market Research Report" },
    { id: "thematic-report", label: "Thematic Report" },
    { id: "equity-research-report", label: "Equity Research Report" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportsByTab, setReportsByTab] = useState<
    Record<string, ResearchReport[]>
  >({
    "pre-market-research-report": [],
    "thematic-report": [],
    "equity-research-report": [],
  });
  const itemsPerPage = 10;

  // Extract unique values for filters
  const allReports = Object.values(reportsByTab).flat();
  const sectors = ["all", ...new Set(allReports.map((r) => r.sector))];
  const authors = ["all", ...new Set(allReports.map((r) => r.author))];
  const reportTypes = ["all", ...new Set(allReports.map((r) => r.reportType))];

  // Fetch reports for tab
  const fetchReportsForTab = async (tabId: string) => {
    if (reportsByTab[tabId] && reportsByTab[tabId].length > 0) {
      return; // Already loaded
    }

    setLoading(true);
    setError(null);

    try {
      let apiUrl = "";
      switch (tabId) {
        case "all":
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports`;
          break;
        case "pre-market-research-report":
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports/pre-market-report`;
          break;
        case "thematic-report":
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports/thematic-report`;
          break;
        case "equity-research-report":
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports/equity-report`;
          break;
        default:
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ResearchReport[] = await response.json();
      setReportsByTab((prev) => ({ ...prev, [tabId]: data }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`Failed to fetch ${tabId} reports:`, err);
      setError(`Failed to load ${tabId} reports. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  // Load reports when tab changes
  useEffect(() => {
    fetchReportsForTab(activeTab);
  }, [activeTab]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedSector("all");
  };

  // Filter and sort logic
  const filteredAndSortedReports = useMemo(() => {
    const currentReports = reportsByTab[activeTab] || [];

    const filtered = currentReports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.stock.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector =
        selectedSector === "all" || report.sector === selectedSector;

      return matchesSearch && matchesSector;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "author":
          comparison = a.author.localeCompare(b.author);
          break;
        case "views":
          comparison = (b.views || 0) - (a.views || 0);
          break;
        case "upside":
          comparison = parseFloat(b.upside) - parseFloat(a.upside);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "desc" ? comparison : -comparison;
    });
  }, [reportsByTab, activeTab, selectedSector, searchTerm, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredAndSortedReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Helper functions
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "BUY":
        return "bg-green-100 text-green-800";
      case "HOLD":
        return "bg-yellow-100 text-yellow-800";
      case "SELL":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100" style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}>
      <div className="max-w-full">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-green-900 text-white py-30">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                <FaFilePdf className="text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Research Reports
              </h1>
            </div>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto leading-relaxed text-center">
              Stay updated with the latest financial news, market trends, and
              expert insights from around the world
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 h-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 mx-2 relative text-xl font-medium transition-colors duration-300 
        ${activeTab === tab.id ? "text-emerald-600" : "text-gray-600 hover:text-emerald-500"}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-emerald-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

        {/* Search & Filters */}
        <section className="py-12 bg-white border-b border-emerald-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            >
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-white shadow-sm text-black"
                />
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-emerald-600" />
                   <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 bg-white text-black"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="views">Views</option>
                <option value="upside">Upside</option>
              </select>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "latest" | "popular")
                  }
                  className="px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 bg-white text-black"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-2xl text-center mb-8">
            {error}
          </div>
        )}

        {/* Reports Table */}
        <section className="py-16">
        <div className="max-w-8xl mx-auto px-7">
        {!loading && !error && (
          <>
            {currentReports.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-emerald-200">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaFilePdf className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Reports Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                          Report Details
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                          Stock / Company
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                          Author
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                          Rating & Target
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                          Performance
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100">
                      {currentReports.map((report) => (
                        <tr
                          key={report.id}
                          className="hover:bg-emerald-50/50 transition-colors"
                        >
                          {/* Report Details */}
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-emerald-900 text-sm leading-tight">
                                {report.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
                                  {report.reportType}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-teal-100 text-teal-800">
                                  {report.sector}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <FaFilePdf className="text-red-500" />
                                  {report.pages} pages
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaEye />
                                  {report.views.toLocaleString()} views
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Stock/Company */}
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="font-bold text-emerald-700 text-sm">
                                {report.stock}
                              </div>
                              <div className="text-xs text-gray-600">
                                {report.company}
                              </div>
                            </div>
                          </td>

                          {/* Author */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                <FaUser className="text-white text-xs" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 text-sm">
                                  {report.author}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {report.authorFirm}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaCalendarAlt className="text-emerald-400 text-xs" />
                              {formatDate(report.publishDate)}
                            </div>
                          </td>

                          {/* Rating & Target */}
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getRatingColor(report.rating)}`}
                              >
                                {report.rating}
                              </span>
                              <div className="text-sm">
                                <div className="font-semibold text-gray-900">
                                  Target: {report.targetPrice}
                                </div>
                                <div className="text-xs text-gray-600">
                                  Current: {report.currentPrice}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Performance */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {parseFloat(report.upside) > 0 ? (
                                <FaArrowUp className="text-emerald-500" />
                              ) : (
                                <FaArrowDown className="text-red-500" />
                              )}
                              <span
                                className={`font-bold text-sm ${parseFloat(report.upside) > 0 ? "text-emerald-600" : "text-red-600"}`}
                              >
                                {report.upside}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {report.recommendation}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-center">
                            <Link
                              href={`/reports/${report.id}`}
                              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-emerald-800">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredAndSortedReports.length
                      )}{" "}
                      of {filteredAndSortedReports.length} reports
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-emerald-200 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-700"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 text-emerald-800">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-emerald-200 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-700"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        </div>
        </section>
      </div>
    </div>
  );
}
