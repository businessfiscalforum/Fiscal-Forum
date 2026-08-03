/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaNewspaper
} from "react-icons/fa";
import { useRouter } from "next/navigation";

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
}

interface ClientNewsPageProps {
  initialNews: NewsItem[];
}

const ClientNewsPage = ({ initialNews }: ClientNewsPageProps) => {
  const router = useRouter();

  // --- UI States & Data States ---
  const tabs = [
    { id: "news-buzz", label: "NEWS BUZZ" },
    { id: "corp-pulse", label: "CORP PULSE" },
    { id: "ipo-scoop", label: "IPO SCOOP" },
  ];
  const [activeTab, setActiveTab] = useState("news-buzz");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Display 6 items per page to match the 2x3 grid in the image

  const [newsByTab, setNewsByTab] = useState<Record<string, NewsItem[]>>({
    "news-buzz": initialNews,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- API Fetching Effects ---
  useEffect(() => {
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
        console.error(`Failed to fetch ${tabId} news:`, err);
        setError(`Failed to load ${tabId} news. Please try again later.`);
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    if (!newsByTab[activeTab]) {
      fetchNewsForTab(activeTab);
    } else {
      setCurrentPage(1);
    }
  }, [activeTab]);

  const currentNewsData = newsByTab[activeTab] || [];

  const sortedNews = [...currentNewsData].sort((a, b) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });

  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = sortedNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f5f8f5] pt-32 pb-20 relative font-sans"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(20, 110, 80, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 110, 80, 0.04) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight uppercase mb-3">
            FINANCIAL NEWS HUB
          </h1>
          <p className="text-slate-600 font-medium text-sm md:text-base max-w-2xl mx-auto">
            Curated insights and breaking news from global markets
          </p>
        </header>

        {/* Tab Filters */}
        <div className="flex justify-center gap-3 md:gap-4 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full border border-black text-xs md:text-sm font-extrabold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#e6f4ea] text-black shadow-sm"
                  : "bg-white text-black hover:bg-[#f0f4f1]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-t border-slate-300 mb-10" />

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold text-red-800 mb-4">Error Loading News</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : currentNews.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
            <FaNewspaper className="mx-auto text-4xl text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest">
              Awaiting New Stories...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentNews.map((news) => {
                const displayCategory = news.category || (activeTab === "news-buzz" ? "News Buzz" : activeTab === "corp-pulse" ? "Corp Pulse" : "IPO Scoop");
                return (
                  <motion.div
                    key={news.id}
                    whileHover={{ y: -6 }}
                    onClick={() => handleNewsClick(news.id)}
                    className="bg-white/95 backdrop-blur-sm border border-slate-300 rounded-[1.5rem] p-6 flex flex-col justify-between h-full min-h-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer"
                  >
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-[#e6f4ea] text-[#137333] border border-[#ceead6] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {displayCategory}
                      </span>
                      <span className="bg-[#f1f3f4] text-[#3c4043] border border-[#dadce0] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        FEATURED
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="text-lg md:text-xl font-semibold text-slate-700 leading-snug line-clamp-3 hover:text-emerald-700 transition-colors">
                        {news.title}
                      </h3>
                    </div>

                    {/* Divider and Footer */}
                    <div className="mt-auto">
                      <div className="border-t border-slate-300 w-full mb-4" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-slate-500 font-medium">
                          {formatDate(news.publishDate)}
                        </span>
                        <button className="bg-[#0f9d58] hover:bg-[#0b8043] text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1">
                          Read <span className="font-sans">→</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-300 bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;

                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 rounded-lg text-sm font-semibold border ${
                            isActive
                              ? "bg-[#e6f4ea] text-black border-black"
                              : "border-slate-300 text-black bg-white hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }

                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="text-slate-400 px-1">
                          …
                        </span>
                      );
                    }

                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center h-9 w-9 rounded-lg border border-slate-300 bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <FaChevronRight />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientNewsPage;
