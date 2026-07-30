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
    answer:
      "The PDF will be sent to your WhatsApp number every Monday to Friday around 8:00 AM morning. You'll receive it directly in your chat, ready to read and analyze before the market opens.",
  },
  {
    question: "Can we request a refund if we change our minds?",
    answer:
      "Yes, you have 3 days after purchase to request a refund. You will receive a 100% refund, no questions asked. Our goal is to ensure you're completely satisfied with your investment in our service.",
  },
  {
    question: "Will my subscription auto-renew after the plan ends?",
    answer:
      "No, we do not auto-renew subscriptions. We will remind you 3 days before your plan ends, and you can choose to purchase again. There will be no automatic deductions - you're always in control of your subscription.",
  },
  {
    question: "Can I get a FREE 2-3 days Demo?",
    answer:
      "Buy any plan and try it for 3 days. If it is not useful for you after the 3rd day, ask for a refund. You will get 100% of your money back with no questions asked. This risk-free trial lets you experience our service firsthand.",
  },
  {
    question: "Is this worth the money?",
    answer:
      "Absolutely! You get daily market updates on WhatsApp for less than the cost of a 🍕 pizza for a YEAR, plus a 100% refund policy and extra FREE Bonuses with every purchase worth more than your payment. It's an incredible value for serious traders who want to stay ahead of the market.",
  },
  {
    question: "What happens if I miss a report?",
    answer:
      "All reports are archived and available for download from your account dashboard. You can access any previous report at any time, so you never miss out on valuable insights.",
  },
  {
    question: "How accurate are your predictions?",
    answer:
      "Our analysts use advanced technical analysis and fundamental research to provide accurate market insights. While no prediction is guaranteed, our track record shows consistent accuracy in identifying key market movements.",
  },
  {
    question: "Can I share the reports with others?",
    answer:
      "Reports are intended for personal use only. Sharing with others violates our terms of service. However, we offer team plans for organizations that need multiple access points.",
  },
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
        const res = await fetch("/api/yahoo-stock-data");
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
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports?type=Pre-Market Research Report`;
          break;
        case "thematic-report":
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports?type=Thematic Research Report`;
          break;
        case "equity-research-report":
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reports?type=Equity Research Report`;
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
    <div className="min-h-screen bg-[#F4FBF7] pt-24 pb-20">
      {/* Sticky Custom Report Button - Mobile Only */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-[#1FA463] text-black border border-black p-4 rounded-full shadow-sm hover:-translate-y-0.5 transition-all  active:shadow-sm"
          aria-label="Request Custom Report"
        >
          <FaPaperPlane className="w-6 h-6" />
        </button>
      </div>

      {/* Sticky Custom Report Form - Mobile Only */}
      {isFormOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end">
          <div className="bg-white border-t border-black rounded-t-3xl p-6 w-full max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b border-black pb-3">
              <h3 className="text-xl font-bold uppercase text-black">Custom Report</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-black"
                aria-label="Close form"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-black mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-black rounded-xl text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-black mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Your WhatsApp number"
                  className="w-full px-3 py-2 border border-black rounded-xl text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-black mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="What do you need?"
                  className="w-full px-3 py-2 border border-black rounded-xl text-black"
                  required
                />
              </div>

              {formMessage && (
                <div
                  className={`p-3 rounded-xl border border-black text-sm ${
                    formMessage.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {formMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-[#1FA463] text-white border border-black py-3 rounded-xl font-bold hover:bg-[#15824D] shadow-sm "
              >
                {formLoading ? "Sending..." : "Request Report"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Banner Section */}
        <section className="relative border border-black bg-white rounded-3xl p-8 md:p-12 shadow-md overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1FA463]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 border border-black rounded-lg text-black font-bold text-xs uppercase tracking-wider">
              <FaCalendarAlt className="w-3.5 h-3.5" />
              Daily Market Briefs
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-none">
              Before You Invest, <span className="text-[#1FA463]">Read What Matters</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-semibold max-w-2xl mx-auto">
              Turn every report into an opportunity. Join Fiscal Forum today and stay a step ahead of the opening bell.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link href="#table" scroll={true} className="w-full sm:w-auto">
                <button className="w-full bg-white text-black border border-black px-6 py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-sm hover:bg-yellow-50 hover:shadow-sm transition-all">
                  <FaFilePdf className="text-black" />
                  <span>View Sample Reports</span>
                </button>
              </Link>
              <Link href="/reports/join" className="w-full sm:w-auto">
                <button className="w-full bg-[#1FA463] text-white border border-black px-6 py-3.5 rounded-xl font-bold shadow-sm hover:bg-[#15824D] hover:shadow-sm  transition-all uppercase text-sm">
                  Join Now!
                </button>
              </Link>
            </div>

            <p className="text-sm text-red-500 font-bold">
              Don&apos;t Miss Out: Send &quot;Hi&quot; to get more samples on{" "}
              <Link
                href="https://wa.me/+918696060387"
                className="text-[#1FA463] underline font-bold hover:text-emerald-800"
              >
                WhatsApp
              </Link>
              .
            </p>
          </div>
        </section>

        {/* TAB NAVIGATION */}
        <div className="flex justify-center h-auto overflow-x-auto sm:overflow-visible pb-2 border-b border-black">
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-3 sm:gap-4 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 border border-black rounded-xl text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#1FA463] text-white shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-sm hover:-translate-y-0.5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* REPORTS TABLE */}
        <section id="table" className="space-y-6">
          {/* EMPTY STATE */}
          {!loading && !error && currentReports.length === 0 && (
            <div className="bg-white rounded-2xl border border-black p-10 text-center shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full border border-black flex items-center justify-center mx-auto mb-4">
                <FaFilePdf className="text-black text-2xl" />
              </div>
              <h3 className="text-lg font-bold uppercase text-black">
                No Reports Found
              </h3>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Try adjusting your filters or search.
              </p>
            </div>
          )}

          {/* MOBILE CARD VIEW */}
          {!loading && !error && currentReports.length > 0 && (
            <div className="md:hidden grid gap-4">
              {currentReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white border border-black rounded-2xl p-5 shadow-sm"
                >
                  <h3 className="font-bold text-black text-base leading-snug">
                    {report.title ?? "Untitled"}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 border border-black rounded text-[10px] font-bold bg-emerald-50 text-black">
                      {report.reportType ?? "N/A"}
                    </span>
                    <span className="px-2 py-1 border border-black rounded text-[10px] font-bold bg-teal-50 text-black">
                      {report.sector ?? "N/A"}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-gray-700 font-semibold">
                    <strong className="text-[#1FA463]">
                      {report.stock ?? "N/A"}
                    </strong>{" "}
                    · {report.company ?? "N/A"}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-black">
                    <span
                      className={`px-2.5 py-0.5 rounded border border-black text-xs font-bold ${getRatingColor(
                        report.rating
                      )}`}
                    >
                      {report.rating ?? "N/A"}
                    </span>

                    <Link
                      href={report.pdfUrl || "#"}
                      className="inline-flex items-center gap-1 bg-[#1FA463] text-white border border-black px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm hover:bg-[#15824D] "
                    >
                      <span>View PDF</span>
                      <FaFilePdf className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DESKTOP TABLE VIEW */}
          {!loading && !error && currentReports.length > 0 && (
            <div className="hidden md:block bg-white rounded-2xl border border-black shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-emerald-50 border-b border-black">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-black tracking-wider">
                        Report Info
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-black tracking-wider">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-black tracking-wider">
                        Author
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-black tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase text-black tracking-wider">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase text-black tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-black/10">
                    {currentReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-emerald-50/20 transition-colors"
                      >
                        {/* Report */}
                        <td className="px-4 py-4 align-middle">
                          <div className="space-y-2">
                            <div className="font-bold text-black text-base">
                              {report.title ?? "Untitled"}
                            </div>
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 border border-black rounded">
                                {report.reportType ?? "N/A"}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 border border-black rounded">
                                {report.sector ?? "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Stock */}
                        <td className="px-4 py-4 align-middle">
                          <div className="font-bold text-black text-base">
                            {report.stock ?? "N/A"}
                          </div>
                          <div className="text-xs text-gray-600 font-semibold">
                            {report.company ?? "N/A"}
                          </div>
                        </td>

                        {/* Author */}
                        <td className="px-4 py-4 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-100 border border-black rounded-lg flex items-center justify-center">
                              <FaUser className="text-black text-xs" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-black">
                                {report.author ?? "Fiscal Forum"}
                              </div>
                              <div className="text-[11px] text-gray-500 font-semibold">
                                {report.authorFirm ?? "Fiscal Forum"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 align-middle text-xs text-gray-700 font-bold whitespace-nowrap">
                          <FaCalendarAlt className="inline mr-1.5 text-black/60" />
                          {formatDate(report.publishDate)}
                        </td>

                        {/* Rating */}
                        <td className="px-4 py-4 align-middle">
                          <span
                            className={`px-2.5 py-0.5 rounded border border-black text-xs font-bold ${getRatingColor(
                              report.rating
                            )}`}
                          >
                            {report.rating ?? "N/A"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 align-middle text-center">
                          <Link
                            href={report.pdfUrl || "#"}
                            className="inline-flex bg-[#1FA463] text-white border border-black px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-[#15824D] "
                          >
                            View Report
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* What's Inside Our Report Section */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-black leading-none">
              What&apos;s Inside Our Report?
            </h2>
            <p className="text-base text-gray-600 font-medium">
              Everything you need to stay ahead before the market opens, organized logically.
            </p>
          </div>

          {/* Three Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pre-Market Reports Card */}
            <div className="bg-white border border-black rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:-translate-y-0.5 transition-all">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 border border-black rounded-xl flex items-center justify-center shadow-sm">
                  <svg
                    className="w-6 h-6 text-black"
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
                <h3 className="text-xl font-bold uppercase text-black">
                  Pre-Market Reports
                </h3>
                <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                  Get ahead with early market insights and technical analysis delivered daily before trading begins.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Global Markets", "Sector Analysis", "Fear & Greed Index"].map((tag, i) => (
                    <span key={i} className="px-2 py-1 border border-black bg-gray-50 text-black text-xs font-bold rounded-lg shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50 border-t border-black px-6 py-3">
                <p className="text-emerald-950 text-xs font-bold uppercase">
                  Delivered daily at 8:00 AM
                </p>
              </div>
            </div>

            {/* Thematic Reports Card */}
            <div className="bg-white border border-black rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:-translate-y-0.5 transition-all">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-blue-100 border border-black rounded-xl flex items-center justify-center shadow-sm">
                  <svg
                    className="w-6 h-6 text-black"
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
                <h3 className="text-xl font-bold uppercase text-black">
                  Thematic Reports
                </h3>
                <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                  Deep-dive thematic research on emerging sectoral trends and mid/long term investment opportunities.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Trend Analysis", "Sector Deep Dive", "Opportunity Spotting"].map((tag, i) => (
                    <span key={i} className="px-2 py-1 border border-black bg-gray-50 text-black text-xs font-bold rounded-lg shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 border-t border-black px-6 py-3">
                <p className="text-blue-950 text-xs font-bold uppercase">
                  Weekly specialized insights
                </p>
              </div>
            </div>

            {/* Equity Reports Card */}
            <div className="bg-white border border-black rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:-translate-y-0.5 transition-all">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 bg-purple-100 border border-black rounded-xl flex items-center justify-center shadow-sm">
                  <svg
                    className="w-6 h-6 text-black"
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
                <h3 className="text-xl font-bold uppercase text-black">
                  Equity Reports
                </h3>
                <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                  Detailed stock analysis reports featuring target prices, technical ratings, and corporate metrics.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Stock Analysis", "Fundamental Research", "BUY / HOLD / SELL"].map((tag, i) => (
                    <span key={i} className="px-2 py-1 border border-black bg-gray-50 text-black text-xs font-bold rounded-lg shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 border-t border-black px-6 py-3">
                <p className="text-purple-950 text-xs font-bold uppercase">
                  In-depth company analysis
                </p>
              </div>
            </div>
          </div>

          {/* Global Markets and Snapshot Blocks */}
          <div className="bg-gray-100/60 border border-black rounded-3xl p-6 md:p-8 space-y-8 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Global Market Overview */}
              <div className="bg-white border border-black p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold uppercase text-black mb-6 pb-2 border-b border-black">
                  Global Market Coverage
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 flex items-center">
                      <span className="w-2.5 h-2.5 bg-orange-400 border border-black rounded-full mr-2"></span>
                      Asian Index
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Hang Seng", "Nikkei 225", "KOSPI", "ASX 200"].map((market, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 border border-black rounded-xl text-xs font-bold text-black bg-[#F4FBF7] shadow-sm"
                        >
                          {market}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 flex items-center">
                      <span className="w-2.5 h-2.5 bg-blue-400 border border-black rounded-full mr-2"></span>
                      European Index
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["DAX", "FTSE 100", "CAC 40"].map((market, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 border border-black rounded-xl text-xs font-bold text-black bg-blue-50/50 shadow-sm"
                        >
                          {market}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 flex items-center">
                      <span className="w-2.5 h-2.5 bg-emerald-400 border border-black rounded-full mr-2"></span>
                      US Index
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Dow Jones", "Nasdaq", "S&P 500"].map((market, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 border border-black rounded-xl text-xs font-bold text-black bg-emerald-50/50 shadow-sm"
                        >
                          {market}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Snapshot */}
              <div className="bg-white border border-black p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-bold uppercase text-black mb-6 pb-2 border-b border-black">
                  Market Snapshot metrics
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Volume Shockers", color: "bg-blue-400" },
                    { title: "52 Week High", color: "bg-purple-400" },
                    { title: "Top Gainers", color: "bg-emerald-400" },
                    { title: "Top Losers", color: "bg-red-400" },
                    { title: "Long & Short Buildup", color: "bg-yellow-400" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center px-4 py-3 bg-gray-50 border border-black rounded-xl hover:border-black hover:bg-white hover:shadow-sm transition-all"
                    >
                      <div className={`w-3.5 h-3.5 ${item.color} border border-black rounded-full mr-3`} />
                      <span className="text-sm font-bold text-black uppercase tracking-tight">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sectoral Indices Chart */}
              <div className="bg-white border border-black p-6 rounded-2xl shadow-sm lg:col-span-2">
                <h3 className="text-lg font-bold uppercase text-black mb-4">
                  Sectoral Indices Live Chart
                </h3>
                <div className="bg-gray-50 border border-black rounded-2xl p-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                    1-Day Percentage Change
                  </div>

                  {sectorsLoading ? (
                    <p className="text-sm text-gray-500 font-bold">
                      Loading sector index data...
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sectorsData.map((sector, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-white border border-black hover:border-black p-3.5 rounded-xl shadow-none hover:shadow-sm transition-all"
                        >
                          <span className="text-sm font-bold text-black">
                            {sector.name}
                          </span>
                          <span
                            className={`text-sm font-bold px-2 py-0.5 rounded border border-black ${
                              sector.change >= 0
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {sector.percentageChange >= 0 ? "+" : ""}
                            {sector.percentageChange.toFixed(2)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Report Features List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase text-black text-center">
                What You&apos;ll Get in Every Report
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
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
                    className="bg-white border border-black px-4 py-2.5 rounded-xl shadow-sm font-bold text-black text-xs uppercase tracking-wider"
                  >
                    🚀 {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why is Our Morning PDF a Must Section */}
        <section className="relative border border-black bg-[#1FA463] rounded-3xl p-8 md:p-12 shadow-md">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-black leading-none">
              Why is Our Morning PDF a Must for You?
            </h2>
            <p className="text-black font-semibold text-base max-w-2xl mx-auto">
              Get ahead of the market with expert analysis delivered directly to your WhatsApp every single morning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Stay Updated", emoji: "⚡" },
              { title: "Save Time", emoji: "⏳" },
              { title: "Understand Better", emoji: "🧠" },
              { title: "Be Ready", emoji: "🚀" },
              { title: "Easy Access", emoji: "📱" },
              { title: "Boost Confidence", emoji: "😎" },
              { title: "Smarter Decisions", emoji: "💬" },
              { title: "Value for Money", emoji: "💰" },
              { title: "New Updates, FREE", emoji: "❤️" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-black p-5 rounded-2xl shadow-sm hover:-translate-y-0.5 transition-all flex items-center justify-between"
              >
                <span className="text-sm font-bold uppercase text-black tracking-tight">
                  {item.title}
                </span>
                <span className="text-xl">{item.emoji}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold uppercase text-black leading-none">
              Still Have Questions?
            </h2>
            <p className="text-base text-gray-600 font-semibold">
              We&apos;ve got you covered with direct answers to the most common queries.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-black rounded-2xl p-6 shadow-sm"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-bold text-black uppercase tracking-tight text-sm md:text-base">
                    {item.question}
                  </h3>
                  <button className="text-black focus:outline-none">
                    {openIndex === index ? (
                      <svg className="w-5 h-5 border border-black rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 border border-black rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </button>
                </div>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-black text-gray-700 font-semibold text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Desktop Custom Report Section */}
        <section className="hidden lg:block border border-black bg-white rounded-3xl p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold uppercase text-black">
                  Need Specific Insights?
                </h3>
                <p className="text-gray-600 font-semibold mt-1">
                  Request a custom research report tailored to your interested sectors or equities.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="px-4 py-3 border border-black rounded-xl text-black"
                    required
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="WhatsApp Mobile"
                    className="px-4 py-3 border border-black rounded-xl text-black"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="What stock/sector do you want analyzed?"
                  className="w-full px-4 py-3 border border-black rounded-xl text-black"
                  required
                />

                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-[#1FA463] text-white border border-black px-6 py-3 rounded-xl font-bold hover:bg-[#15824D] shadow-sm "
                >
                  {formLoading ? "Processing..." : "Request Custom Report"}
                </button>

                {formMessage && (
                  <div
                    className={`p-3 rounded-xl border border-black text-sm font-semibold ${
                      formMessage.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}
              </form>
            </div>

            <div className="bg-[#1FA463] text-black border border-black rounded-2xl p-8 shadow-md space-y-4">
              <h4 className="text-xl font-bold uppercase">
                Why Custom Reports?
              </h4>
              <ul className="space-y-3 font-semibold">
                <li className="flex items-start">
                  <div className="bg-white border border-black rounded-full p-1 mt-1.5 mr-3">
                    <FaCheck className="w-3 h-3 text-black" />
                  </div>
                  <span>Personalized equity/sector analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white border border-black rounded-full p-1 mt-1.5 mr-3">
                    <FaCheck className="w-3 h-3 text-black" />
                  </div>
                  <span>Direct delivery straight to your WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white border border-black rounded-full p-1 mt-1.5 mr-3">
                    <FaCheck className="w-3 h-3 text-black" />
                  </div>
                  <span>Actionable insights in 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
