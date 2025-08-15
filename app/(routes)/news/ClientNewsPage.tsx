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
} from "react-icons/fa";
import Image from "next/image";

// --- Interface Definitions ---
export interface NewsItem {
  id: string; // Assuming ID is string for consistency, adapt if needed
  title: string;
  description?: string | null; // Allow null from DB
  content?: string | null; // Allow null if not always present
  image?: string | null; // Allow null from DB
  category: string;
  author: string;
  publishDate: string; // Keep as string for simplicity, convert as needed
  readTime?: string | null; // Allow null from DB
  views: string | null; // Can be null from DB
  link: string;
  featured?: boolean | null; // Allow null from DB
  tags?: string | null; // Stored as JSON string in DB, allow null
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
  const itemsPerPage = 9;

  // --- API & Data States ---
  const [newsByTab, setNewsByTab] = useState<Record<string, NewsItem[]>>({
    "news-buzz": initialNews, // Use initialNews for news-buzz
  }); // Cache data per tab
  const [loading, setLoading] = useState(false); // Initially not loading as we have initialNews
  const [error, setError] = useState<string | null>(null);

  // --- Dummy Data for Stock Indices (as in KB) ---
  const stockIndices: StockIndex[] = [
    { name: "NIFTY 50", value: 18500.50, change: 150.25, percentageChange: 0.82 },
    { name: "SENSEX", value: 62000.75, change: -200.50, percentageChange: -0.32 },
    { name: "NASDAQ", value: 14500.75, change: 75.50, percentageChange: 0.52 },
    { name: "Dow Jones", value: 35000.25, change: 100.75, percentageChange: 0.29 },
  ];

  // --- API Fetching Effect ---
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
        setNewsByTab(prev => ({ ...prev, [tabId]: data }));
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
        (selectedCategory === "all" || (news.category || "Uncategorized") === selectedCategory) &&
        (news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (news.description?.toLowerCase().includes(searchTerm.toLowerCase()) || ""))
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FaNewspaper />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Financial News
                </h1>
              </div>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest financial news, market trends, and
                expert insights from around the world
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 h-20 ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 mx-2 relative text-xl font-medium transition-colors duration-300 
        ${activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            >
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white shadow-sm text-black"
                />
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white text-black"
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
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white text-black"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </motion.div>
          </div>
        </section>

        {/* News Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center justify-between"
            >
              {/* Show loading/error/sorting info */}
              {loading ? (
                 <p className="text-gray-600">Loading {activeTab} news...</p>
              ) : error ? (
                 <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <p className="text-gray-600">
                    Showing {startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, filteredNews.length)} of{" "}
                    {filteredNews.length} articles
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                <p className="text-gray-600 mb-6">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()} // Simple retry
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Retry
                </button>
              </motion.div>
            ) : currentNews.length > 0 ? (
              activeTab === "news-buzz" ? (
                // News Buzz - Newspaper Style Layout (as in KB)
                <div className="space-y-8">
                  {/* Stock Indices Section */}
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Market Snapshot</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {stockIndices.map((index, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 flex items-center gap-4 border border-blue-100"
                        >
                          <div className="bg-blue-500 text-white rounded-full p-3">
                            <FaChartLine />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-800">{index.name}</p>
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
                        className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
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
                            <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                              <FaGlobe className="text-6xl text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              FEATURED
                            </span>
                          </div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                              {currentNews[0].category || "General"}
                            </span>
                            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                              {currentNews[0].title}
                            </h2>
                            <div className="flex items-center text-white/80 text-sm">
                              <span>{currentNews[0].author}</span>
                              <span className="mx-2">•</span>
                              <span>{formatDate(currentNews[0].publishDate)}</span>
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
                      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">Top Stories</h3>
                      {currentNews.slice(1, 4).map((news, index) => (
                        <div
                          key={news.id}
                          className="flex gap-4 cursor-pointer group"
                          onClick={() => handleNewsClick(news.link)}
                        >
                          <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded overflow-hidden">
                            {news.image ? (
                               <Image
                                src={news.image}
                                alt={news.title}
                                width={400}
                                height={250}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                                <FaGlobe className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-3">
                              {news.title}
                            </h4>
                            <div className="flex items-center text-gray-500 text-xs mt-2">
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

                  {/* News Grid */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2 inline-block">
                      Latest News
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentNews.slice(4).map((news, index) => (
                        <motion.div
                          key={news.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                          onClick={() => handleNewsClick(news.link)}
                        >
                          <div className="relative h-48">
                            {news.image ? (
                               <Image
                                src={news.image}
                                alt={news.title}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                                <FaGlobe className="text-4xl text-gray-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute top-3 left-3">
                              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                {news.category || "General"}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {news.title}
                            </h3>
                            {news.description && (
                              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {news.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between text-gray-500 text-xs">
                              <div className="flex items-center">
                                <FaUser className="mr-1" />
                                <span>{news.author}</span>
                              </div>
                              <div className="flex items-center">
                                <FaClock className="mr-1" />
                                <span>{formatDate(news.publishDate)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Corp Pulse & IPO Scoop - Text List Layout (Economic Times Style) (as in KB)
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="space-y-6">
                    {currentNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 pb-6 last:border-0 last:pb-0 group cursor-pointer"
                        onClick={() => handleNewsClick(news.link)}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Image (only for IPO Scoop) */}
                          {(activeTab === "ipo-scoop" && news.image) && (
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

                          <div className={`${activeTab === "ipo-scoop" && news.image ? "md:w-3/4" : "w-full"}`}>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {news.title}
                            </h3>

                            {/* IPO Specific Information */}
                            {activeTab === "ipo-scoop" && news.ipoName && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                <div className="bg-blue-50 p-2 rounded">
                                  <div className="text-xs text-gray-500">IPO Name</div>
                                  <div className="font-medium text-gray-800 text-sm">{news.ipoName}</div>
                                </div>
                                <div className="bg-green-50 p-2 rounded">
                                  <div className="text-xs text-gray-500">Price Range</div>
                                  <div className="font-medium text-gray-800 text-sm">{news.priceRange}</div>
                                </div>
                                <div className="bg-purple-50 p-2 rounded">
                                  <div className="text-xs text-gray-500">Issue Size</div>
                                  <div className="font-medium text-gray-800 text-sm">{news.issueSize}</div>
                                </div>
                                <div className="bg-orange-50 p-2 rounded">
                                  <div className="text-xs text-gray-500">Subscription</div>
                                  <div className="font-medium text-gray-800 text-sm">{news.subscriptionRate}</div>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
                              {activeTab === "ipo-scoop" && news.listingGain && (
                                <div className={`flex items-center gap-1 ${parseFloat(news.listingGain) >= 0 ? "text-green-600" : "text-red-600"}`}>
                                  <FaChartLine className="text-xs" />
                                  {news.listingGain}
                                </div>
                              )}
                            </div>

                            {/* IPO Current Price */}
                            {activeTab === "ipo-scoop" && news.currentPrice && news.currentPrice !== "-" && (
                              <div className="mt-2">
                                <span className="text-sm text-gray-600">Current Price: </span>
                                <span className="font-semibold text-gray-800">
                                  <FaRupeeSign className="inline text-xs" /> {news.currentPrice}
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No News Articles Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : `No news has been published yet for ${activeTab}.`}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                              : "bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700"
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
                          className="flex items-center px-2 text-gray-400"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FaChevronRight />
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ClientNewsPage;