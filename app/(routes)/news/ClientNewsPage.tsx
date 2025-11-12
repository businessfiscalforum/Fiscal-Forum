// components/ClientNewsPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaNewspaper,
  FaChartLine,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import NewsBuzzList from "./NewsBuzzList";
import IpoScoopList from "./IpoScoopList";
import CorpPulseList from "./CorpPulseList";



// --- Interface Definitions (Moved to this file as they are essential for the overall structure) ---
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
  listingGain?: string | null;
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

// --- GLOBAL HELPER FUNCTIONS (Kept here for state/data logic) ---

// 1. Date Formatter (handles null/undefined)
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "N/A";
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

// 2. IPO Status Logic (Can be removed if moved to IpoScoopList, keeping a placeholder/minimal version here)
const getIpoStatus = (
  openDateStr: string | null | undefined,
  closeDateStr: string | null | undefined
) => {
  const today = Date.now();
  if (!openDateStr || !closeDateStr) return { status: "N/A", dotClass: "bg-gray-400", textClass: "text-gray-600" };
  const openTimestamp = Date.parse(openDateStr);
  const closeTimestamp = Date.parse(closeDateStr);

  const isLive = today >= openTimestamp && today <= closeTimestamp;
  if (isLive) return { status: "Live", dotClass: "bg-green-500", textClass: "text-green-600" };
  else if (today < openTimestamp) return { status: "Upcoming", dotClass: "bg-yellow-500", textClass: "text-yellow-600" };
  else return { status: "Closed", dotClass: "bg-red-500", textClass: "text-red-600" };
};


// --- Main Component ---
interface ClientNewsPageProps {
  initialNews: NewsItem[];
}

const ClientNewsPage = ({ initialNews }: ClientNewsPageProps) => {
  const router = useRouter();

  // --- UI States & Data States ---
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

  // --- API Fetching Effects (Keep unchanged) ---

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
          throw new Error(
            `HTTP error! status: ${response.status}: ${errorText}`
          );
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
          throw new Error(
            `HTTP error! status: ${response.status}: ${errorText}`
          );
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

  // --- Data Processing (Keep unchanged) ---
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

  // --- Handler Functions (Keep unchanged) ---
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

  // --- RENDER LOGIC (UPDATED) ---

  const renderNewsContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      );
    }
    if (error) {
      return (
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
      );
    }
    if (currentNews.length === 0) {
      return (
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
      );
    }

    switch (activeTab) {
      case "news-buzz":
        return (
          <NewsBuzzList
            currentNews={currentNews}
            handleNewsClick={handleNewsClick}
          />
        );
      case "corp-pulse":
        return (
          <CorpPulseList
            currentNews={currentNews}
            handleNewsClick={handleNewsClick}
          />
        );
      case "ipo-scoop":
        return (
          <IpoScoopList
            currentNews={currentNews}
            handleNewsClick={handleNewsClick}
          />
        );
      default:
        return null;
    }
  };


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* --- Stock Indices Section --- (Unchanged) */}
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

      {/* Tab Navigation (Unchanged) */}
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

      {/* Search & Filter (Unchanged) */}
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
            {/* DELEGATE RENDERING */}
            {renderNewsContent()}

            {/* Pagination - Updated Theme (Unchanged) */}
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