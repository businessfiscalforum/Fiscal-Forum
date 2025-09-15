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
interface SectorData {
  name: string;
  value: number;
  change: number;
  percentageChange: number;
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

  const [sectorsData, setSectorsData] = useState<SectorData[]>([]);
  const [sectorsLoading, setSectorsLoading] = useState(true);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/yahoo-stock-data?type=sectors`);
        const data = await res.json();
        setSectorsData(data.indices || []);
      } catch (err) {
        console.error("Error fetching sectors:", err);
      } finally {
        setSectorsLoading(false);
      }
    }
    fetchSectors();
  }, []);

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

      setFormMessage(
        "✅ Request submitted successfully! We will send your custom report on your whatsapp."
      );
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
      <div className="max-w-full pb-30">
        <section className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Save 30 mins daily. Get market news in one
                <span className="text-green-400"> WhatsApp PDF at 8 AM.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Get your Pre-market Research Report, Thematic Report, Equity
                Report daily on your whatsapp.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button className="bg-white text-teal-900 px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
                  <FaFilePdf />
                  <Link
                    href="#table"
                    scroll={true}
                    className="cursor-pointer text-blue-600 underline"
                  >
                    View Sample Reports
                  </Link>
                </button>
                <Link href={"/reports/join"}>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-900 transition-colors cursor-pointer">
                    Join Now!
                  </button>
                </Link>
              </div>

              <p className="text-sm text-red-300 mb-8">
                Don&apos;t Miss Out: Send &quot;Hi&quot; to get more samples{" "}
                <Link
                  href="https://wa.me/+918696060387"
                  className="text-green-400 underline"
                >
                  WhatsApp
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- TAB NAVIGATION ---------------- */}
        <div className="flex justify-center mb-6 h-auto overflow-x-auto sm:overflow-visible">
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-3 sm:gap-6 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3 sm:px-4 py-2 relative text-sm sm:text-lg md:text-xl font-medium transition-colors duration-300 whitespace-nowrap ${
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
        </div>

        {/* ---------------- REPORTS TABLE ---------------- */}
        <section id="table" className="py-16">
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

        {/*--Inside Reports Table--*/}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                What&apos;s Inside Our Pre-Market Report?
              </h2>
              <p className="text-gray-600 mt-4">
                Everything you need to stay ahead before the market opens.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Global Market Overview */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Global Market Overview
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Asian Market
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Hang Seng", "Nikkei 225", "KOSPI", "ASX 200"].map(
                          (market, idx) => (
                            <div
                              key={idx}
                              className="flex items-center px-3 py-1.5 bg-orange-50 rounded-full text-xs font-medium text-orange-700"
                            >
                              <span>{market}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Europe Market
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["DAX", "FTSE 100", "CAC 40"].map((market, idx) => (
                          <div
                            key={idx}
                            className="flex items-center px-3 py-1.5 bg-blue-50 rounded-full text-xs font-medium text-blue-700"
                          >
                            <span>{market}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        US Market
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Dow Jones", "Nasdaq", "S&P"].map((market, idx) => (
                          <div
                            key={idx}
                            className="flex items-center px-3 py-1.5 bg-green-50 rounded-full text-xs font-medium text-green-700"
                          >
                            <span>{market}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Snapshot */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Market Snapshot
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Volume Shockers",
                        color: "bg-blue-500",
                        textColor: "text-blue-700",
                      },
                      {
                        title: "52 Week High",
                        color: "bg-purple-500",
                        textColor: "text-purple-700",
                      },
                      {
                        title: "Top Gainers",
                        color: "bg-green-500",
                        textColor: "text-green-700",
                      },
                      {
                        title: "Top Losers",
                        color: "bg-red-500",
                        textColor: "text-red-700",
                      },
                      {
                        title: "Long & Short Buildup",
                        color: "bg-yellow-500",
                        textColor: "text-yellow-700",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div
                          className={`w-3 h-3 ${item.color} rounded-full mr-3`}
                        ></div>
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sectoral Indices Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sectoral Indices Chart
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-xs text-gray-600 mb-3">
                      1-day change
                    </div>

                    {sectorsLoading ? (
                      <p className="text-sm text-gray-500">
                        Loading sector data...
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sectorsData.map((sector, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-xs"
                          >
                            <span className="text-sm font-medium">
                              {sector.name}
                            </span>
                            <span
                              className={`text-sm font-semibold ${
                                sector.change >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {sector.percentageChange.toFixed(2)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Report Features */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  What You&apos;ll Get in Every Report
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    "Market Bulletin",
                    "Technical Analysis",
                    "Stocks in News",
                    "FI and DII Activity",
                    "Stock in ban list",
                    "Current IPOs",
                    "PCR & Pivot Levels",
                    "Word of the day",
                    "Quotes",
                    "Expert Insights",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-teal-50 to-emerald-50 p-3 rounded-lg text-center border border-teal-100"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                        <span className="font-medium text-teal-800 text-sm">
                          {feature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="text-center mt-8">
                <p className="text-sm text-gray-600 mb-4">
                  Want to see it in action?
                </p>
                <button className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-teal-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg mx-auto">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15 17H17V19H15V17Z" />
                    <path d="M10 17H12V19H10V17Z" />
                    <path d="M5 17H7V19H5V17Z" />
                    <path d="M20 11L15 6L10 11L5 6L1 11L5 16L10 11L15 16L20 11Z" />
                  </svg>
                  <span>View Sample PDF</span>
                </button>
              </div> */}
            </div>
          </div>
        </section>

        {/* ---------------- CUSTOM REPORTS FORM ---------------- */}
        <section className=" bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg border border-emerald-200 p-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-60"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Content */}
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Get Custom Reports
                  </h2>
                  <p className="text-green-600 mt-2">
                    Personalized insights tailored just for you
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-green-800 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all placeholder-emerald-300 text-green-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-800 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all placeholder-emerald-300 text-green-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-800 mb-1">
                        Report Topic
                      </label>
                      <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        placeholder="What topic would you like analyzed?"
                        className="w-full px-4 py-2.5 text-sm bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all placeholder-emerald-300 text-green-800"
                        required
                      />
                    </div>
                  </div>

                  {formMessage && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        formMessage.startsWith("✅")
                          ? "bg-green-100 text-green-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {formMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-50"
                    >
                      {formLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing Request...
                        </div>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Info Section */}
              <div className="flex flex-col justify-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-3">
                    Why Request Custom Reports?
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Get analysis on specific stocks or sectors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Receive personalized investment insights</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Tailored recommendations based on your interests
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>Direct delivery to your WhatsApp</span>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm text-emerald-700 flex items-start">
                      <svg
                        className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        After submission, our experts will prepare your report
                        and send it directly to your WhatsApp within 24 hours.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}
