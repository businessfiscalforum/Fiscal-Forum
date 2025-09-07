"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";

interface ResearchReport {
  id: string;
  title: string | null;
  stock: string | null;
  company: string | null;
  author: string | null;
  authorFirm: string | null;
  publishDate: string | null;
  sector: string | null;
  reportType: string | null;
  rating: "BUY" | "HOLD" | "SELL" | null;
  targetPrice: string | null;
  currentPrice: string | null;
  upside: string | null;
  pages: number | null;
  recommendation: string | null;
  summary: string | null;
  pdfUrl: string | null;
  tags: string[];
}

interface ClientReportsPageProps {
  initialReports: ResearchReport[];
}

export default function ClientReportsPage({
  initialReports,
}: ClientReportsPageProps) {
  const tabs = [
    { id: "all", label: "All" },
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

  // ---------------- NEW STATE FOR FORM ----------------
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    topic: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  // ---------------- HANDLER FOR FORM INPUTS ----------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- HANDLE FORM SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/custom-reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setFormMessage("✅ Request submitted successfully!");
      setFormData({ name: "", mobile: "", topic: "" }); // clear form
    } catch (err) {
      console.error("Failed to submit form:", err);
      setFormMessage("❌ Failed to submit. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Extract unique values for filters
  const allReports = Object.values(reportsByTab).flat();
  const sectors = ["all", ...new Set(allReports.map((r) => r.sector ?? "N/A"))];
  const authors = ["all", ...new Set(allReports.map((r) => r.author ?? "N/A"))];
  const reportTypes = [
    "all",
    ...new Set(allReports.map((r) => r.reportType ?? "N/A")),
  ];

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
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
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
        (report.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (report.company ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (report.stock ?? "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector =
        selectedSector === "all" || report.sector === selectedSector;

      return matchesSearch && matchesSector;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison =
            new Date(b.publishDate ?? "").getTime() -
            new Date(a.publishDate ?? "").getTime();
          break;
        case "title":
          comparison = (a.title ?? "").localeCompare(b.title ?? "");
          break;
        case "author":
          comparison = (a.author ?? "").localeCompare(b.author ?? "");
          break;
        case "upside":
          comparison =
            parseFloat(b.upside ?? "0") - parseFloat(a.upside ?? "0");
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
  const getRatingColor = (rating: string | null) => {
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

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      <div className="max-w-full">
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
            <div className="flex justify-center mt-6">
              <Link href="/reports/join">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition">
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ---------------- TAB NAVIGATION ---------------- */}
        <div className="flex justify-center mb-6 h-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 mx-2 relative text-xl font-medium transition-colors duration-300 ${
                activeTab === tab.id
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-emerald-500"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-emerald-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* ---------------- REPORTS TABLE ---------------- */}
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
                                    {report.title ?? "Untitled"}
                                  </h3>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
                                      {report.reportType ?? "N/A"}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-teal-100 text-teal-800">
                                      {report.sector ?? "N/A"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <FaFilePdf className="text-red-500" />
                                      {report.pages ?? 0} pages
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Stock/Company */}
                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  <div className="font-bold text-emerald-700 text-sm">
                                    {report.stock ?? "N/A"}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {report.company ?? "N/A"}
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
                                      {report.author ?? "Unknown"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {report.authorFirm ?? ""}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Date */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <FaCalendarAlt className="text-emerald-400 text-xs" />
                                  {formatDate(report?.publishDate)}
                                </div>
                              </td>

                              {/* Rating & Target */}
                              <td className="px-6 py-4">
                                <div className="space-y-2">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getRatingColor(
                                      report.rating
                                    )}`}
                                  >
                                    {report.rating ?? "N/A"}
                                  </span>
                                  <div className="text-sm">
                                    <div className="font-semibold text-gray-900">
                                      Target: {report.targetPrice ?? "-"}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      Current: {report.currentPrice ?? "-"}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Performance */}
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {parseFloat(report.upside ?? "0") > 0 ? (
                                    <FaArrowUp className="text-emerald-500" />
                                  ) : (
                                    <FaArrowDown className="text-red-500" />
                                  )}
                                  <span
                                    className={`font-bold text-sm ${
                                      parseFloat(report.upside ?? "0") > 0
                                        ? "text-emerald-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {report.upside ?? "0"}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {report.recommendation ?? ""}
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
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ---------------- CUSTOM REPORTS FORM ---------------- */}
        <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="max-w-3xl mx-auto px-6 bg-white rounded-2xl shadow-lg border border-emerald-200 p-10">
            <h2 className="text-2xl font-bold text-emerald-800 text-center mb-6">
              Get Your Custom Reports
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="Enter report topic"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              {formMessage && (
                <p
                  className={`text-sm text-center ${
                    formMessage.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formMessage}
                </p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition disabled:opacity-50"
                >
                  {formLoading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
