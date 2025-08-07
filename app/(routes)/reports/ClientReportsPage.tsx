// app/(routes)/reports/ClientReportsPage.tsx
"use client";

import { useState, useMemo } from "react";
import {
  FaFilePdf,
  FaEye,
  FaCalendarAlt,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaArrowUp,
  FaArrowDown,
  FaUser,
  FaRocket,
} from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface ResearchReport {
  id: string;
  title: string;
  stock: string;
  company: string;
  author: string;
  authorFirm: string;
  date: string;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedReportType, setSelectedReportType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extract unique values for filters
  const sectors = ["all", ...new Set(initialReports.map((r) => r.sector))];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authors = ["all", ...new Set(initialReports.map((r) => r.author))];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reportTypes = [
    "all",
    ...new Set(initialReports.map((r) => r.reportType)),
  ];

  // Filter and sort logic
  const filteredAndSortedReports = useMemo(() => {
    const filtered = initialReports.filter((report) => {
      return (
        (selectedSector === "all" || report.sector === selectedSector) &&
        (selectedAuthor === "all" || report.author === selectedAuthor) &&
        (selectedReportType === "all" ||
          report.reportType === selectedReportType) &&
        (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.stock.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
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
  }, [
    initialReports,
    selectedSector,
    selectedAuthor,
    selectedReportType,
    searchTerm,
    sortBy,
    sortOrder,
  ]);

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

  const slides = [
    {
      title: "Market Trends",
      subtitle: "Stay Ahead with",
      description:
        "Get the latest insights on stock markets, crypto, and global finance.",
      image: "/hero1.jpg",
      gradient: "from-blue-600 via-blue-500 to-purple-600",
      path: "/news",
    },
    {
      title: "Investing",
      subtitle: "Grow Your Wealth with Smart",
      description:
        "Learn how to build a diversified portfolio and achieve financial freedom.",
      image: "/hero2.jpg",
      gradient: "from-emerald-600 via-teal-500 to-cyan-600",
      path: "services/stock-investment",
    },
  ];

  return (
    <>
      {/* Hero Slider */}
      <section className="relative w-full h-screen overflow-hidden py-20">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="absolute inset-0 z-0">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}/80`}
                ></div>
              </div>
              <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white max-w-xl"
                >
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase tracking-widest text-sm text-yellow-200 font-semibold mb-2"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                  <Link href={slide.path}>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center gap-3"
                    >
                      Know More
                      <FaRocket />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Research Reports
              </h1>
              <p className="text-gray-600 mt-2">
                Expert analysis and investment insights
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-green-50 to-emerald-100 px-4 py-2 rounded-lg inline-block">
                <span className="text-green-700 font-semibold">
                  {initialReports.length} Reports Available
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap gap-4 items-center mb-8">
            <div className="relative min-w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports, stocks, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Sectors</option>
              {sectors
                .filter((s) => s !== "all")
                .map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
            </select>

            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Types</option>
              {[
                "Quarterly Results",
                "Sector Analysis",
                "Industry Report",
                "Thematic Report",
                "Company Analysis",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="views">Sort by Views</option>
              <option value="upside">Sort by Upside</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
            </button>
          </div>

          {/* Reports Table */}
          {currentReports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
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
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Report Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Stock / Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Rating & Target
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Performance
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        {/* Report Details */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                              {report.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                {report.reportType}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
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
                            <div className="font-bold text-blue-600 text-sm">
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
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            {formatDate(report.date)}
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
                              <FaArrowUp className="text-green-500" />
                            ) : (
                              <FaArrowDown className="text-red-500" />
                            )}
                            <span
                              className={`font-bold text-sm ${parseFloat(report.upside) > 0 ? "text-green-600" : "text-red-600"}`}
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
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
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
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
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
                      className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
