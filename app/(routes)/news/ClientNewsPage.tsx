// app/(routes)/news/ClientNewsPage.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaClock,
  FaUser,
  FaSearch,
  FaFilter,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaGlobe,
  FaNewspaper,
  FaChartLine,
  FaRupeeSign,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// --- Interface Definitions ---
export interface NewsItem {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  image?: string | null;
  category: string;
  author: string;
  publishDate: string;
  readTime?: string | null;
  views: string | null;
  link: string;
  featured?: boolean | null;
  tags?: string | null;
  // IPO specific fields
  ipoName?: string | null;
  companyName?: string | null;
  priceRange?: string | null;
  issueSize?: string | null;
  listingDate?: string | null;
  currentPrice?: string | null;
  listingGain?: string | null;
  subscriptionRate?: string | null;
}

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  link: string;
}

interface StockIndex {
  name: string;
  value: number;
  change: number;
  percentageChange: number;
}

// --- Main Component ---
interface ClientNewsPageProps {
  initialNews: NewsItem[]; // Accept initial news data
}

const ClientNewsPage = ({ initialNews }: ClientNewsPageProps) => {
  // --- UI States ---
  const tabs = [
    { id: "news-buzz", label: "News Buzz" },
    { id: "corp-pulse", label: "Corp Pulse" },
    { id: "ipo-scoop", label: "IPO Scoop" },
  ];
  const [activeTab, setActiveTab] = useState("news-buzz");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const itemsPerPage = 9; // Adjust if needed for the new layout

  // --- API & Data States ---
  const [newsByTab, setNewsByTab] = useState<Record<string, NewsItem[]>>({
    "news-buzz": initialNews,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
  const [newsletterLoading, setNewsletterLoading] = useState(true);

  // --- Dummy Data for Stock Indices (as in KB) ---
  const stockIndices: StockIndex[] = [
    {
      name: "NIFTY 50",
      value: 18500.5,
      change: 150.25,
      percentageChange: 0.82,
    },
    {
      name: "SENSEX",
      value: 62000.75,
      change: -200.5,
      percentageChange: -0.32,
    },
    { name: "NASDAQ", value: 14500.75, change: 75.5, percentageChange: 0.52 },
    {
      name: "Dow Jones",
      value: 35000.25,
      change: 100.75,
      percentageChange: 0.29,
    },
  ];

  // --- API Fetching Effect for News ---
  useEffect(() => {
    // If data for the newly active tab is already loaded, don't fetch
    if (newsByTab[activeTab]) {
      setCurrentPage(1); // Reset page when switching tabs
      return;
    }

    const fetchNewsForTab = async (tabId: string) => {
      setLoading(true);
      setError(null);
      try {
        // Map tab ID to your API endpoint
        let apiUrl = "";
        switch (tabId) {
          case "news-buzz":
            // If somehow news-buzz data needs refetching, or you have a specific endpoint
            apiUrl = "/api/news/news-buzz";
            break;
          case "corp-pulse":
            apiUrl = "/api/news/corp-pulse"; // Adjust to your actual API endpoint
            break;
          case "ipo-scoop":
            apiUrl = "/api/news/ipo-scoop"; // Adjust to your actual API endpoint
            break;
          default:
            apiUrl = "/api/news"; // Fallback endpoint
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`API Error (${response.status}):`, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsItem[] = await response.json();

        // Update state with fetched data for the specific tab
        setNewsByTab((prev) => ({ ...prev, [tabId]: data }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(`Failed to fetch ${activeTab} news:`, err);
        setError(`Failed to load ${tabId} news. Please try again later.`);
      } finally {
        setLoading(false);
        setCurrentPage(1); // Reset to first page after loading new data
      }
    };

    // Only fetch if it's NOT the initial tab (news-buzz) or if you explicitly want to fetch it
    // For now, we assume initialNews covers news-buzz
    if (activeTab !== "news-buzz") {
      fetchNewsForTab(activeTab);
    } else {
      // Even if news-buzz, reset page
      setCurrentPage(1);
    }
  }, [activeTab, newsByTab]); // Depend on activeTab

  // --- API Fetching Effect for Newsletter ---
  useEffect(() => {
    const fetchNewsletter = async () => {
      setNewsletterLoading(true);
      setError(null); // Clear previous errors for newsletter
      try {
        const response = await fetch("/api/newsletter");
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Newsletter API Error (${response.status}):`,
            errorText
          );
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Newsletter[] = await response.json();
        setNewsletter(data);
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
        // setError is for news, use a separate state or log for newsletter errors if needed
        // For now, just log and let the UI show "No newsletters"
      } finally {
        setNewsletterLoading(false);
      }
    };

    fetchNewsletter();
  }, []); // Fetch newsletter once on component mount

  // --- Data Processing ---
  // Get the news data specifically for the active tab
  const currentNewsData = newsByTab[activeTab] || [];

  // Extract unique categories from the *current tab's* data
  const categories = [
    "all",
    ...new Set(currentNewsData.map((news) => news.category || "Uncategorized")),
  ];

  // Filter and sort the current tab's news based on UI controls
  const filteredNews = currentNewsData
    .filter(
      (news) =>
        (selectedCategory === "all" ||
          (news.category || "Uncategorized") === selectedCategory) &&
        (news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          "")
    )
    .sort((a, b) => {
      if (sortBy === "latest") {
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      } else if (sortBy === "popular") {
        const viewsA = parseInt(a.views ?? "0", 10);
        const viewsB = parseInt(b.views ?? "0", 10);
        return viewsB - viewsA;
      }
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // --- Handler Functions ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // Short month like "Jan"
      day: "numeric",
    });
  };

  const handleNewsClick = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      window.open(`https://${link}`, "_blank", "noopener,noreferrer");
    }
  };

  // --- Render Logic ---
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header Section - Updated Theme */}
      <section className="bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <FaNewspaper />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Financial News
              </h1>
            </div>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest financial news, market trends, and
              expert insights from around the world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation - Updated Theme */}
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

      {/* Search & Filter - Updated Theme */}
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 bg-white text-black"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
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

      {/* Main Content Grid (3:1) */}
      <section className="py-16">
        <div className="max-w-8xl mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Side: Main News (3/4) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Show loading/error/sorting info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex items-center justify-between"
              >
                {loading ? (
                  <p className="text-gray-600">Loading {activeTab} news...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <>
                    <p className="text-gray-600">
                      Showing {startIndex + 1}-
                      {Math.min(startIndex + itemsPerPage, filteredNews.length)}{" "}
                      of {filteredNews.length} articles
                    </p>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaArrowUp className="text-green-500" />
                      <span className="text-sm">Updated in real-time</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Show loading spinner, error message, or news grid */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaNewspaper className="text-3xl text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Oops! Something went wrong.
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={() => window.location.reload()} // Simple retry
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Retry
                  </button>
                </motion.div>
              ) : currentNews.length > 0 ? (
                activeTab === "news-buzz" ? (
                  // News Buzz - Newspaper Style Layout (as in KB)
                  <div className="space-y-8">
                    {/* Stock Indices Section - Updated Theme */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-emerald-100">
                      <h2 className="text-2xl font-bold mb-4 text-emerald-800">
                        Market Snapshot
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stockIndices.map((index, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 flex items-center gap-4 border border-emerald-100 shadow-sm"
                          >
                            <div className="bg-emerald-500 text-white rounded-full p-3">
                              <FaChartLine />
                            </div>
                            <div>
                              <p className="text-lg font-semibold text-emerald-800">
                                {index.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {index.value.toLocaleString()}{" "}
                                <span
                                  className={`font-bold ${
                                    index.change > 0
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {index.change > 0 ? "+" : ""}
                                  {index.change.toFixed(2)} (
                                  {index.percentageChange.toFixed(2)}%)
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured News */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Featured Article */}
                      {currentNews.length > 0 && (
                        <div
                          className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group border border-emerald-100 hover:border-emerald-300 transition-all duration-300"
                          onClick={() => handleNewsClick(currentNews[0].link)}
                        >
                          <div className="relative h-100">
                            {currentNews[0].image ? (
                              // Use img tag or next/image correctly
                              <Image
                                src={currentNews[0].image}
                                width={400}
                                height={250}
                                alt={currentNews[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-full h-full flex items-center justify-center">
                                <FaGlobe className="text-6xl text-emerald-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute top-4 left-4">
                              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                FEATURED
                              </span>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                                {currentNews[0].category || "General"}
                              </span>
                              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">
                                {currentNews[0].title}
                              </h2>
                              <div className="flex items-center text-white/80 text-sm">
                                <span>{currentNews[0].author}</span>
                                <span className="mx-2">•</span>
                                <span>
                                  {formatDate(currentNews[0].publishDate)}
                                </span>
                                <span className="mx-2">•</span>
                                <span>
                                  <FaEye className="inline mr-1" />
                                  {currentNews[0].views || "0"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Top Stories Sidebar */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-emerald-800 border-b-2 border-emerald-500 pb-2">
                          Top Stories
                        </h3>
                        {currentNews.slice(1, 4).map((news, index) => (
                          <div
                            key={news.id}
                            className="flex gap-4 cursor-pointer group p-4 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 border border-transparent hover:border-emerald-200"
                            onClick={() => handleNewsClick(news.link)}
                          >
                            <div className="flex-shrink-0 w-24 h-24 bg-emerald-100 rounded overflow-hidden">
                              {news.image ? (
                                <Image
                                  src={news.image}
                                  alt={news.title}
                                  width={400}
                                  height={250}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-full h-full flex items-center justify-center">
                                  <FaGlobe className="text-emerald-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors line-clamp-3">
                                {news.title}
                              </h4>
                              <div className="flex items-center text-emerald-700 text-xs mt-2">
                                <span>{formatDate(news.publishDate)}</span>
                                <span className="mx-2">•</span>
                                <span>
                                  <FaEye className="inline mr-1" />
                                  {news.views || "0"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Removed "Latest News" Grid Section */}
                  </div>
                ) : (
                  // Corp Pulse & IPO Scoop - Text List Layout (Economic Times Style) (as in KB)
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                    <div className="space-y-6">
                      {currentNews.map((news, index) => (
                        <motion.div
                          key={news.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-emerald-100 pb-6 last:border-0 last:pb-0 group cursor-pointer hover:bg-emerald-50/30 p-2 rounded transition-colors duration-200"
                          onClick={() => handleNewsClick(news.link)}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            {/* Image (only for IPO Scoop) */}
                            {activeTab === "ipo-scoop" && news.image && (
                              <div className="md:w-1/4">
                                <div className="relative h-32 md:h-full rounded-lg overflow-hidden">
                                  <Image
                                    src={news.image}
                                    alt={news.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              </div>
                            )}

                            <div
                              className={`${activeTab === "ipo-scoop" && news.image ? "md:w-3/4" : "w-full"}`}
                            >
                              <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                {news.title}
                              </h3>

                              {/* IPO Specific Information */}
                              {activeTab === "ipo-scoop" && news.ipoName && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                  <div className="bg-emerald-50 p-2 rounded border border-emerald-100">
                                    <div className="text-xs text-emerald-700">
                                      IPO Name
                                    </div>
                                    <div className="font-medium text-emerald-900 text-sm">
                                      {news.ipoName}
                                    </div>
                                  </div>
                                  <div className="bg-green-50 p-2 rounded border border-green-100">
                                    <div className="text-xs text-green-700">
                                      Price Range
                                    </div>
                                    <div className="font-medium text-green-900 text-sm">
                                      {news.priceRange}
                                    </div>
                                  </div>
                                  <div className="bg-teal-50 p-2 rounded border border-teal-100">
                                    <div className="text-xs text-teal-700">
                                      Issue Size
                                    </div>
                                    <div className="font-medium text-teal-900 text-sm">
                                      {news.issueSize}
                                    </div>
                                  </div>
                                  <div className="bg-orange-50 p-2 rounded border border-orange-100">
                                    <div className="text-xs text-orange-700">
                                      Subscription
                                    </div>
                                    <div className="font-medium text-orange-900 text-sm">
                                      {news.subscriptionRate}
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-700">
                                <div className="flex items-center gap-1">
                                  <FaUser className="text-xs" />
                                  {news.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <FaClock className="text-xs" />
                                  {formatDate(news.publishDate)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <FaEye className="text-xs" />
                                  {news.views || "0"} views
                                </div>
                                {activeTab === "ipo-scoop" &&
                                  news.listingGain && (
                                    <div
                                      className={`flex items-center gap-1 ${parseFloat(news.listingGain) >= 0 ? "text-green-600" : "text-red-600"}`}
                                    >
                                      <FaChartLine className="text-xs" />
                                      {news.listingGain}
                                    </div>
                                  )}
                              </div>

                              {/* IPO Current Price */}
                              {activeTab === "ipo-scoop" &&
                                news.currentPrice &&
                                news.currentPrice !== "-" && (
                                  <div className="mt-2">
                                    <span className="text-sm text-emerald-700">
                                      Current Price:{" "}
                                    </span>
                                    <span className="font-semibold text-emerald-900">
                                      <FaRupeeSign className="inline text-xs" />{" "}
                                      {news.currentPrice}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                // No results found
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaNewspaper className="text-3xl text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                    No News Articles Found
                  </h3>
                  <p className="text-emerald-600 mb-6">
                    {searchTerm || selectedCategory !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : `No news has been published yet for ${activeTab}.`}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}

              {/* Pagination - Updated Theme */}
              {!loading && !error && totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center items-center gap-2 mt-16"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-800"
                  >
                    <FaChevronLeft />
                    Previous
                  </motion.button>
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      const isActive = page === currentPage;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <motion.button
                            key={page}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                                : "bg-white border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {page}
                          </motion.button>
                        );
                      } else if (
                        page === currentPage - 3 ||
                        page === currentPage + 3
                      ) {
                        return (
                          <span
                            key={page}
                            className="flex items-center px-2 text-emerald-400"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-800"
                  >
                    Next
                    <FaChevronRight />
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Right Side: Newsletter (1/4) - Updated Theme */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800">
                    Newsletter
                  </h3>
                </div>

                {newsletterLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
                  </div>
                ) : newsletter.length > 0 ? (
                  <div className="space-y-6">
                    {newsletter.slice(0, 5).map(
                      (
                        item // Adjust number shown if needed
                      ) => (
                        <div
                          key={item.id}
                          className="border-b border-emerald-100 pb-4 last:border-0 last:pb-0 cursor-pointer group hover:bg-emerald-50/30 p-2 rounded transition-colors duration-200"
                          onClick={() => handleNewsClick(item.link)} // Assuming newsletter items have links
                        >
                          <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600 text-sm md:text-base line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-emerald-700 text-xs md:text-sm line-clamp-2 mt-1">
                            {item.description}
                          </p>
                          <p className="text-emerald-600 text-xs mt-2">
                            {formatDate(item.publishDate)}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-emerald-600 text-sm">
                    No newsletters available.
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-emerald-200">
                  <Link
                    href="/newsletter" // Link to a dedicated newsletter page if you have one
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium text-sm md:text-base"
                  >
                    View All Newsletters <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientNewsPage;
