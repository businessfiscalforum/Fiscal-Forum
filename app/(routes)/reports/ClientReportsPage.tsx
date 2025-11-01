"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaFilePdf,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaUser,
  FaTimes,
  FaPaperPlane,
  FaCheck,
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

const tabs = [
  { id: "all", label: "All" },
  { id: "pre-market-research-report", label: "Pre-Market Research Report" },
  { id: "thematic-report", label: "Thematic Report" },
  { id: "equity-research-report", label: "Equity Research Report" },
];

const faqData = [
  {
    question: "How will I receive the daily PDF?",
    answer: "The PDF will be sent to your WhatsApp number every Monday to Friday around 8:00 AM morning. You'll receive it directly in your chat, ready to read and analyze before the market opens."
  },
  {
    question: "Can we request a refund if we change our minds?",
    answer: "Yes, you have 3 days after purchase to request a refund. You will receive a 100% refund, no questions asked. Our goal is to ensure you're completely satisfied with your investment in our service."
  },
  {
    question: "Will my subscription auto-renew after the plan ends?",
    answer: "No, we do not auto-renew subscriptions. We will remind you 3 days before your plan ends, and you can choose to purchase again. There will be no automatic deductions - you're always in control of your subscription."
  },
  {
    question: "Can I get a FREE 2-3 days Demo?",
    answer: "Buy any plan and try it for 3 days. If it is not useful for you after the 3rd day, ask for a refund. You will get 100% of your money back with no questions asked. This risk-free trial lets you experience our service firsthand."
  },
  {
    question: "Is this worth the money?",
    answer: "Absolutely! You get daily market updates on WhatsApp for less than the cost of a 🍕 pizza for a YEAR, plus a 100% refund policy and extra FREE Bonuses with every purchase worth more than your payment. It's an incredible value for serious traders who want to stay ahead of the market."
  },
  {
    question: "What happens if I miss a report?",
    answer: "All reports are archived and available for download from your account dashboard. You can access any previous report at any time, so you never miss out on valuable insights."
  },
  {
    question: "How accurate are your predictions?",
    answer: "Our analysts use advanced technical analysis and fundamental research to provide accurate market insights. While no prediction is guaranteed, our track record shows consistent accuracy in identifying key market movements."
  },
  {
    question: "Can I share the reports with others?",
    answer: "Reports are intended for personal use only. Sharing with others violates our terms of service. However, we offer team plans for organizations that need multiple access points."
  }
];

export default function ClientReportsPage({
  initialReports,
}: ClientReportsPageProps) {
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    topic: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const [reportsByTab, setReportsByTab] = useState<
    Record<string, ResearchReport[]>
  >({
    "pre-market-research-report": [],
    "thematic-report": [],
    "equity-research-report": [],
  });

  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await fetch("/api/yahoo-stock-data?type=sectors");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      setFormData({ name: "", mobile: "", topic: "" });
    } catch (err) {
      console.error("Failed to submit form:", err);
      setFormMessage("❌ Failed to submit. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const allReports = Object.values(reportsByTab).flat();
  const sectors = ["all", ...new Set(allReports.map((r) => r.sector ?? "N/A"))];
  const authors = ["all", ...new Set(allReports.map((r) => r.author ?? "N/A"))];
  const reportTypes = [
    "all",
    ...new Set(allReports.map((r) => r.reportType ?? "N/A")),
  ];

  const fetchReportsForTab = async (tabId: string) => {
    if (reportsByTab[tabId] && reportsByTab[tabId].length > 0) {
      return;
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

  useEffect(() => {
    fetchReportsForTab(activeTab);
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedSector("all");
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredAndSortedReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      {/* Sticky Custom Report Button - Mobile Only */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all"
          aria-label="Request Custom Report"
        >
          <FaPaperPlane className="w-6 h-6" />
        </button>
      </div>

      {/* Sticky Custom Report Form - Mobile Only */}
      {isFormOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Custom Report</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close form"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Your WhatsApp number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                  placeholder="What do you need?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              {formMessage && (
                <div
                  className={`p-2 rounded text-sm ${formMessage.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {formMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {formLoading ? "Sending..." : "Request Report"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-full pb-30">
        <section className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Get Pre-Market, Thematic & Equity Reports
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

        {/* TAB NAVIGATION */}
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

        {/* REPORTS TABLE */}
        <section id="table" className="py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-emerald-900">
                              Report Details
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-emerald-900">
                              Stock / Company
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-emerald-900">
                              Author
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-emerald-900">
                              Date
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-emerald-900">
                              Rating & Target
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-emerald-900">
                              Performance
                            </th>
                            <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-emerald-900">
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
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
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
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
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
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
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
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <FaCalendarAlt className="text-emerald-400 text-xs" />
                                  {formatDate(report?.publishDate)}
                                </div>
                              </td>

                              {/* Rating & Target */}
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
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
                              <td className="px-4 py-3 sm:px-6 sm:py-4">
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
                              <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
                                <Link
                                  href={`/reports/${report.id}`}
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors font-medium text-sm"
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

        {/* What's Inside Our Report Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                What&apos;s Inside Our Report?
              </h2>
              <p className="text-gray-600 mt-4">
                Everything you need to stay ahead before the market opens.
              </p>
            </div> */}

            {/* Three Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Pre-Market Reports Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg border border-emerald-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Pre-Market Reports
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get ahead with early market insights and analysis delivered
                    daily before trading begins.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                      Global Markets
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                      Sector Analysis
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                      Fear & Greed Index
                    </span>
                  </div>
                </div>
                <div className="bg-emerald-500/10 px-6 py-3">
                  <p className="text-emerald-700 text-sm font-medium">
                    Delivered daily at 8:00 AM
                  </p>
                </div>
              </div>

              {/* Thematic Reports Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Thematic Reports
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Deep-dive analysis on emerging trends and thematic
                    investment opportunities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Trend Analysis
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Sector Deep Dive
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Opportunity Spotting
                    </span>
                  </div>
                </div>
                <div className="bg-blue-500/10 px-6 py-3">
                  <p className="text-blue-700 text-sm font-medium">
                    Weekly specialized insights
                  </p>
                </div>
              </div>

              {/* Equity Reports Card */}
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Equity Reports
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Detailed stock analysis with target prices, recommendations,
                    and performance metrics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Stock Analysis
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      Target Prices
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      BUY/HOLD/SELL
                    </span>
                  </div>
                </div>
                <div className="bg-purple-500/10 px-6 py-3">
                  <p className="text-purple-700 text-sm font-medium">
                    In-depth company analysis
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                What&apos;s Inside Our Report?
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
            </div>
          </div>
        </section>

        {/* Why is Our Morning PDF a Must for You? */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background and padding applied to this inner div */}
            <div className="bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 text-white rounded-2xl p-6 sm:p-8 md:p-12">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Why is Our Morning PDF a
                </h2>
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">
                  Must for You?
                </h2>
                <p className="text-emerald-200 max-w-2xl mx-auto text-sm sm:text-base">
                  Get ahead of the market with expert insights delivered
                  directly to your WhatsApp every morning.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Stay Updated */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Stay Updated
                      </span>
                      <span className="ml-1 text-yellow-400">⚡</span>
                    </div>
                  </div>
                </div>

                {/* Save Time */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Save Time
                      </span>
                      <span className="ml-1 text-gray-300">⏳</span>
                    </div>
                  </div>
                </div>

                {/* Understand Better */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Understand Better
                      </span>
                      <span className="ml-1 text-orange-400">🧠</span>
                    </div>
                  </div>
                </div>

                {/* Be Ready */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Be Ready
                      </span>
                      <span className="ml-1 text-blue-400">🚀</span>
                    </div>
                  </div>
                </div>

                {/* Easy Access */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Easy Access
                      </span>
                      <span className="ml-1 text-purple-400">📱</span>
                    </div>
                  </div>
                </div>

                {/* Boost Confidence */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Boost Confidence
                      </span>
                      <span className="ml-1 text-green-400">😎</span>
                    </div>
                  </div>
                </div>

                {/* Smarter Decisions */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Smarter Decisions
                      </span>
                      <span className="ml-1 text-pink-400">💬</span>
                    </div>
                  </div>
                </div>

                {/* Value for Money */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        Value for Money
                      </span>
                      <span className="ml-1 text-yellow-400">💰</span>
                    </div>
                  </div>
                </div>

                {/* New Updates, FREE */}
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm sm:text-base">
                        New Updates, FREE
                      </span>
                      <span className="ml-1 text-red-400">❤️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-600 text-lg">
                We&apos;ve got you covered with answers to the most common
                inquiries.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-medium text-gray-900">
                      {item.question}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      {openIndex === index ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {openIndex === index && (
                    <div className="mt-4 text-gray-700">{item.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop Custom Report Section - Visible only on large screens */}
        <section className="hidden lg:block py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Need Specific Insights?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Request a custom report tailored to your interests
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="WhatsApp"
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>

                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="What do you want analyzed?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all disabled:opacity-50"
                    >
                      {formLoading ? "Processing..." : "Request Custom Report"}
                    </button>

                    {formMessage && (
                      <div
                        className={`p-2 rounded text-sm ${formMessage.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {formMessage}
                      </div>
                    )}
                  </form>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-4">
                    Why Custom Reports?
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full p-1 mt-1 mr-3">
                        <FaCheck className="w-3 h-3" />
                      </div>
                      <span>Personalized stock analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full p-1 mt-1 mr-3">
                        <FaCheck className="w-3 h-3" />
                      </div>
                      <span>Direct WhatsApp delivery</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/20 rounded-full p-1 mt-1 mr-3">
                        <FaCheck className="w-3 h-3" />
                      </div>
                      <span>Expert insights in 24 hours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}