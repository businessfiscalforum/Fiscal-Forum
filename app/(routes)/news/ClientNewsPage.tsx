/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaGlobe,
  FaNewspaper,
  FaChartLine,
  FaRupeeSign,
  FaStar,
  FaBolt,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- Interface Definitions (Updated to Final Schema) ---
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
  link: string;
  featured?: boolean | null;
  tags?: string | null;
  ipoName?: string | null;
  companyName?: string | null;
  priceRange?: string | null;
  issueSize?: string | null;
  currentPrice?: string | null;
  listingGain?: string | null; // Kept as requested
  subscriptionRate?: string | null;
  applyLink?: string | null;
  offerPrice?: string | null;
  openDate?: string | null;
  closeDate?: string | null;
  allotmentDate?: string | null;
  refundDate?: string | null;
  listingDate?: string | null;
}

export interface Newsletter {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  author?: string;
  publishDate: string;
}

interface ApiIndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  percentageChange: number;
  error?: string;
}

// --- GLOBAL HELPER FUNCTIONS ---

// 1. Date Formatter (handles null/undefined)
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return 'N/A';
  try {
      // Use IN locale for Indian date format
      return new Date(dateString).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
      });
  } catch (e) {
      return dateString;
  }
};

// 2. IPO Status Logic (DSA: Range Checking)
const getIpoStatus = (openDateStr: string | null | undefined, closeDateStr: string | null | undefined) => {
    const today = Date.now();
    
    if (!openDateStr || !closeDateStr) {
        return { status: 'N/A', dotClass: 'bg-gray-400', textClass: 'text-gray-600' };
    }
    
    const openTimestamp = Date.parse(openDateStr);
    const closeTimestamp = Date.parse(closeDateStr);

    if (isNaN(openTimestamp)|| isNaN(closeTimestamp)) {
        return { status: 'Invalid', dotClass: 'bg-gray-400', textClass: 'text-gray-600' };
    }
    
    // Core Range Check: Current Time is within [Open, Close]
    const isLive = today >= openTimestamp && today <= closeTimestamp;

    if (isLive) {
        return { status: 'Live', dotClass: 'bg-green-500', textClass: 'text-green-600' };
    } else if (today < openTimestamp) {
        return { status: 'Upcoming', dotClass: 'bg-yellow-500', textClass: 'text-yellow-600' };
    } else {
        return { status: 'Closed', dotClass: 'bg-red-500', textClass: 'text-red-600' };
    }
};

// --- Main Component ---
interface ClientNewsPageProps {
  initialNews: NewsItem[];
}

const ClientNewsPage = ({ initialNews }: ClientNewsPageProps) => {
  const router = useRouter();
  
  // --- UI States & Data States (Remains the same) ---
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

  const [newsByTab, setNewsByTab] = useState<Record<string, NewsItem[]>>({
    "news-buzz": initialNews,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
  const [newsletterLoading, setNewsletterLoading] = useState(true);

  const [stockIndices, setStockIndices] = useState<ApiIndexData[]>([]);
  const [stockLoading, setStockLoading] = useState(true);
  const [stockError, setStockError] = useState<string | null>(null);
  
  // --- API Fetching Effects (Remain the same) ---

  useEffect(() => {
    // ... (Your fetchNewsForTab logic) ...
    const fetchNewsForTab = async (tabId: string) => {
        setLoading(true);
        setError(null);
        try {
          let apiUrl = "";
          switch (tabId) {
            case "news-buzz":
              apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/news/news-buzz`;
              break;
            case "corp-pulse":
              apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/news/corp-pulse`;
              break;
            case "ipo-scoop":
              apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/news/ipo-scoop`;
              break;
            default:
              apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/news`;
          }

          const response = await fetch(apiUrl);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
          }
          const data: NewsItem[] = await response.json();
          setNewsByTab((prev) => ({ ...prev, [tabId]: data }));
        } catch (err: any) {
          console.error(`Failed to fetch ${activeTab} news:`, err);
          setError(`Failed to load ${tabId} news. Please try again later.`);
        } finally {
          setLoading(false);
          setCurrentPage(1);
        }
      };

      if (activeTab !== "news-buzz" && !newsByTab[activeTab]) {
        fetchNewsForTab(activeTab);
      } else {
        setCurrentPage(1);
      }
  }, [activeTab, newsByTab]);

  useEffect(() => {
    // ... (Your newsletter fetching logic remains the same) ...
    const fetchNewsletter = async () => {
        setNewsletterLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
          }
          const data = await response.json();
          setNewsletter(data.newsletter || []);
        } catch (err) {
          console.error("Failed to fetch newsletter:", err);
        } finally {
          setNewsletterLoading(false);
        }
      };
      fetchNewsletter();
  }, []);

  useEffect(() => {
    // ... (Your stock data fetching logic remains the same) ...
    let isMounted = true;
    const fetchStockData = async () => {
      setStockLoading(true);
      setStockError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/yahoo-stock-data`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (isMounted) {
          setStockIndices(data.indices); 
        }
      } catch (err: any) {
        console.error("Failed to fetch stock data (Yahoo):", err);
        if (isMounted) {
          setStockError(err.message || "Failed to load market data.");
        }
      } finally {
        if (isMounted) {
          setStockLoading(false);
        }
      }
    };
    fetchStockData();
    const intervalId = setInterval(fetchStockData, 60000); 
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []); 

  // --- Data Processing (Remains the same) ---
  const currentNewsData = newsByTab[activeTab] || [];
  const categories = [
    "all",
    ...new Set(currentNewsData.map((news) => news.category || "Uncategorized")),
  ];

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
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // --- Handler Functions (Remains the same) ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };
  const handleNewsletterClick = (id: string) => {
    router.push(`/newsletter/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* --- Stock Indices Section --- */}
      <section className="pt-24 bg-white border-b border-emerald-300">
        <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="border-b border-emerald-200 bg-white py-2">
            <div className="flex justify-between items-center mb-2">
              {stockLoading && (
                <span className="text-xs text-gray-500">
                  Loading market data...
                </span>
              )}
              {stockError && (
                <span className="text-xs text-red-500">({stockError})</span>
              )}
            </div>

            {stockLoading ? (
              <div className="flex justify-center py-3">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : stockError ? (
              <p className="text-center text-gray-500 py-3">
                Error loading market data: {stockError}
              </p>
            ) : stockIndices.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {stockIndices.map((index) => (
                  <div
                    key={index.symbol}
                    className={`px-3 py-2 border-r last:border-r-0 flex items-center gap-2 ${
                      index.error ? "opacity-70" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-6 h-6 ${
                        index.error
                          ? "bg-gray-300 text-gray-600"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {index.error ? "?" : <FaChartLine size={12} />}
                    </div>
                    <div className="leading-tight">
                      <p
                        className={`text-xs font-semibold ${
                          index.error ? "text-gray-500" : "text-emerald-800"
                        }`}
                      >
                        {index.name}
                      </p>
                      {index.error ? (
                        <p className="text-[10px] text-gray-500">
                          {index.error}
                        </p>
                      ) : (
                        <p className="text-[11px] text-gray-600">
                          {index.value.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}{" "}
                          <span
                            className={`font-bold ${
                              index.change > 0
                                ? "text-green-600"
                                : index.change < 0
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            {index.change >= 0 ? "+" : ""}
                            {index.change.toFixed(2)} (
                            {index.percentageChange.toFixed(2)}%)
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-3">
                No market data available.
              </p>
            )}
          </div>
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
          {/* Main News Content Area */}
          <div className="space-y-8 mb-16">
            {" "}
            {/* Added mb-16 for spacing below main content */}
            {/* Show loading/error/sorting info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between"
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
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Retry
                </button>
              </motion.div>
            ) : currentNews.length > 0 ? (
              activeTab === "news-buzz" ? (
                // News Buzz Layout (Remains the same)
                <div className="space-y-8">
                  {/* Featured News */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Featured Article */}
                    {currentNews.length > 0 && (
                      <div
                        className="lg:col-span-2 bg-white rounded-lg shadow-md cursor-pointer group border border-emerald-100 hover:border-emerald-300 transition-all duration-300"
                        onClick={() => handleNewsClick(currentNews[0].id)}
                      >
                        <div className="relative aspect-video w-full overflow-hidden">
                          {currentNews[0].image ? (
                            <Image
                              src={currentNews[0].image}
                              width={400}
                              height={400}
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
                          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                            <span className="bg-emerald-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-2 inline-block">
                              {currentNews[0].category || "News"}
                            </span>
                            <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-emerald-200 transition-colors line-clamp-2">
                              {currentNews[0].title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-white/80 text-[10px] sm:text-sm">
                              <span className="truncate max-w-[100px] sm:max-w-none">
                                {currentNews[0].author}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span>
                                {formatDate(currentNews[0].publishDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Top Stories Sidebar */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FaStar className="text-emerald-600" />
                        <h3 className="text-xl font-bold text-emerald-800">
                          Top Stories
                        </h3>
                      </div>
                      {currentNews.slice(1, 5).map((news) => (
                        <div
                          key={news.id}
                          className="cursor-pointer group p-4 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 border border-transparent hover:border-emerald-200 flex items-start gap-3"
                          onClick={() => handleNewsClick(news.id)}
                        >
                          <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                            <FaBolt className="text-emerald-600 text-sm" />
                          </div>
                          <div>
                            <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {news.title}
                            </h4>
                            <div className="flex items-center text-emerald-700 text-xs mt-1">
                              <span>{formatDate(news.publishDate)}</span>
                              <span className="mx-2">•</span>
                              <span className="truncate max-w-[60px] sm:max-w-none">
                                {news.author}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Latest News */}
                  <div className="space-y-6 mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <FaCalendarAlt className="text-emerald-600" />
                      <h3 className="text-xl font-bold text-emerald-800">
                        Latest News
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentNews.slice(5).length > 0 ? (
                        currentNews.slice(5).map((news) => (
                          <div
                            key={news.id}
                            className="cursor-pointer group p-4 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 border border-transparent hover:border-emerald-200 flex items-start gap-3"
                            onClick={() => handleNewsClick(news.id)}
                          >
                            <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                              <FaTags className="text-emerald-600 text-sm" />
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                {news.title}
                              </h4>
                              <div className="flex items-center text-emerald-700 text-xs mt-1">
                                <span>{formatDate(news.publishDate)}</span>
                                <span className="mx-2">•</span>
                                <span className="truncate max-w-[60px] sm:max-w-none">
                                  {news.author}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-emerald-600 text-center py-4 col-span-2">
                          No more news articles at the moment.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Corp Pulse & IPO Scoop - Grid/List Layout
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                  <div className="space-y-6">
                    {currentNews.map((news, index) => {
                      
                      // 🎯 IPO STATUS CALCULATION
                      const ipoStatus = getIpoStatus(news.openDate, news.closeDate);

                      return (
                        <motion.div
                          key={news.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-emerald-100 pb-6 last:border-0 last:pb-0 group cursor-pointer hover:bg-emerald-50/30 p-2 rounded transition-colors duration-200"
                          onClick={() => handleNewsClick(news.id)}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            
                            {/* Image (conditionally rendered for IPO Scoop, left side) */}
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
                              
                              {/* --- IPO DETAIL GRID LAYOUT (Only for ipo-scoop) --- */}
                              {activeTab === "ipo-scoop" && news.ipoName && (
                                <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg border border-gray-100">
                                  <div className="grid grid-cols-5 gap-4">
                                    
                                    {/* Div 1: IPO Name (Col Span 2) */}
                                    <div className="col-span-2 bg-emerald-50 p-3 rounded-lg border border-emerald-100 shadow-sm">
                                      <div className="text-sm font-semibold text-emerald-700">IPO Name</div>
                                      <div className="text-xl font-bold text-emerald-900">{news.ipoName || "N/A"}</div>
                                    </div>

                                    {/* Div 2: Price Range (Col Start 3) */}
                                    <div className="col-start-3 bg-green-50 p-3 rounded-lg border border-green-100 shadow-sm">
                                      <div className="text-sm font-semibold text-green-700">Price Range</div>
                                      <div className="text-xl font-bold text-green-900">{news.priceRange || "N/A"}</div>
                                    </div>

                                    {/* Div 3: Issue Size (Col Start 4) */}
                                    <div className="col-start-4 bg-teal-50 p-3 rounded-lg border border-teal-100 shadow-sm">
                                      <div className="text-sm font-semibold text-teal-700">Issue Size</div>
                                      <div className="text-xl font-bold text-teal-900">{news.issueSize || "N/A"}</div>
                                    </div>

                                    {/* Div 4: Subscription Rate (Col Start 5) */}
                                    <div className="col-start-5 bg-orange-50 p-3 rounded-lg border border-orange-100 shadow-sm">
                                      <div className="text-sm font-semibold text-orange-700">Subscription</div>
                                      <div className="text-xl font-bold text-orange-900">{news.subscriptionRate || "0x"}</div>
                                    </div>

                                    {/* Div 5: Open/Close Dates & Dynamic Status Dot (Col Span 3, Row Start 2) */}
                                    <div className="col-span-3 row-start-2 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 shadow-sm flex justify-between items-center">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-indigo-700 mb-1">Status/Dates</span>
                                        <div className="flex space-x-6 text-base font-bold">
                                          <span className="text-green-600">Open: {formatDate(news.openDate)}</span>
                                          <span className="text-red-600">Close: {formatDate(news.closeDate)}</span>
                                        </div>
                                      </div>
                                      
                                      {/* Dynamic Status Dot (Uses ipoStatus) */}
                                      <div className="flex items-center space-x-2">
                                        <span className={`w-3 h-3 rounded-full ${ipoStatus.dotClass}`}></span>
                                        <span className={`text-sm font-semibold ${ipoStatus.textClass}`}>
                                          {ipoStatus.status}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Div 6: Allotment Date (Col Start 4, Row Start 2) */}
                                    <div className="col-start-4 row-start-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100 shadow-sm">
                                      <div className="text-sm font-semibold text-blue-700">Allotment Date</div>
                                      <div className="text-base font-bold text-blue-900">{formatDate(news.allotmentDate)}</div>
                                    </div>

                                    {/* Div 7: Refund Date (Col Start 5, Row Start 2) */}
                                    <div className="col-start-5 row-start-2 p-3 bg-purple-50/50 rounded-lg border border-purple-100 shadow-sm">
                                      <div className="text-sm font-semibold text-purple-700">Refund Date</div>
                                      <div className="text-base font-bold text-purple-900">{formatDate(news.refundDate)}</div>
                                    </div>

                                    {/* Div 8: Description (Col Span 3, Row Span 2, Row Start 3) */}
                                    <div className="col-span-3 row-span-2 row-start-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
                                      <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                        {news.description || "No detailed description available."}
                                      </p>
                                      <a
                                        href={news.link || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 text-sm underline"
                                      >
                                        Read Full Prospectus
                                      </a>
                                    </div>

                                    {/* Div 9: Offer Price & Apply Action (Col Span 2, Row Span 2, Col Start 4, Row Start 3) */}
                                    <div className="col-span-2 row-span-2 col-start-4 row-start-3 flex flex-col justify-between items-center p-4 space-y-4">
                                      {/* Offer Price (Attractive Red Box) */}
                                      <div className="w-full p-4 bg-red-50 border-4 border-red-300 rounded-xl text-center shadow-lg">
                                        <p className="text-sm font-medium text-red-600 mb-1">Offer Price</p>
                                        <p className="text-4xl font-extrabold text-red-700">{news.offerPrice || "₹ N/A"}</p>
                                      </div>

                                      {/* Apply Now Button (Uses ipoStatus.status for logic and text) */}
                                      <Link
                                        href={news.applyLink || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                          if (ipoStatus.status !== 'Live') {
                                            e.preventDefault();
                                          }
                                          e.stopPropagation();
                                        }}
                                        className={`w-full text-center px-4 py-3 text-lg font-bold rounded-lg shadow-xl transition-colors duration-300 
                                          ${ipoStatus.status === 'Live'
                                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                              : "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
                                          }`}
                                      >
                                        {ipoStatus.status === 'Live' ? 'Apply Now' : ipoStatus.status}
                                      </Link>
                                    </div>

                                    {/* Div 10: Listing Date (Col Span 2, Row Start 5) */}
                                    <div className="col-span-2 row-start-5 p-3 bg-yellow-50/50 rounded-lg border border-yellow-100 shadow-sm">
                                      <div className="text-sm font-semibold text-yellow-700">Listing Date</div>
                                      <div className="text-base font-bold text-yellow-900">{formatDate(news.listingDate)}</div>
                                    </div>

                                    {/* Div 11: Listing Gain (Col Span 2, Col Start 4, Row Start 5) */}
                                    <div className="col-span-2 col-start-4 row-start-5 p-3 bg-red-50/50 rounded-lg border border-red-100 shadow-sm">
                                      <div className="text-sm font-semibold text-red-700">Listing Gain</div>
                                      <div className="text-base font-bold text-red-900">{news.listingGain || "N/A"}</div>
                                    </div>
                                    
                                    {/* Footer Metadata/Gains - Placed below all 5 rows */}
                                    <div className="col-span-5 grid grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-200">
                                      {/* Author & Publish Date (Col Span 2) */}
                                      <div className="col-span-2 flex flex-wrap items-center gap-4 text-sm text-emerald-700">
                                        <div className="flex items-center gap-1">
                                          <FaUser className="text-xs text-gray-600" />
                                          <span className="font-medium text-emerald-900">{news.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <FaClock className="text-xs text-gray-600" />
                                          <span className="font-medium text-emerald-900">{formatDate(news.publishDate)}</span>
                                        </div>
                                      </div>

                                      {/* Listing Gain / Current Price (Col Span 3, starting at Col 3) */}
                                      <div className="col-span-3 col-start-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        {news.listingGain && (
                                          <div
                                            className={`flex items-center gap-2 p-2 rounded-lg ${parseFloat(news.listingGain) >= 0 ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                                          >
                                            <FaChartLine className="text-xs" />
                                            <span className="font-semibold text-sm">
                                              Listing Gain: {news.listingGain}
                                            </span>
                                          </div>
                                        )}

                                        {news.currentPrice && news.currentPrice !== "-" && (
                                          <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50/50 border border-indigo-200">
                                            <span className="text-sm text-indigo-700 font-medium">
                                              Current Price:
                                            </span>
                                            <span className="font-semibold text-indigo-900 text-base">
                                              <FaRupeeSign className="inline text-xs mr-0.5" />
                                              {news.currentPrice}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Default Description for Corp Pulse / News Buzz */}
                              {activeTab !== "ipo-scoop" && (
                                <p className="text-gray-600 line-clamp-2 mb-2">{news.description}</p>
                              )}
                              
                              {/* Default Metadata Row for Corp Pulse / News Buzz */}
                              {activeTab !== "ipo-scoop" && (
                                <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-700">
                                  <div className="flex items-center gap-1">
                                    <FaUser className="text-xs" />
                                    {news.author}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FaClock className="text-xs" />
                                    {formatDate(news.publishDate)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
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
                className="flex justify-center items-center gap-2"
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
          </div>{" "}
        </div>
      </section>
    </div>
  );
};

export default ClientNewsPage;