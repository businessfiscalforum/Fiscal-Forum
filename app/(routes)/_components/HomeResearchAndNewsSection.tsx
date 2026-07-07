"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GiNewspaper } from "react-icons/gi";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  views: string;
  featured: boolean;
}

function formatViews(views: string | number) {
  const num = typeof views === "string" ? parseInt(views) : views;
  if (isNaN(num)) return "0";
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomeNewsAndResearchSection() {
  const [activeTab, setActiveTab] = useState<"NewsBuzz" | "CorpPulse" | "IPOScoop">("NewsBuzz");
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endpointMap = {
    NewsBuzz: "/api/news/news-buzz",
    CorpPulse: "/api/news/corp-pulse",
    IPOScoop: "/api/news/ipo-scoop",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(endpointMap[activeTab]);
        if (!response.ok) throw new Error(`Failed to fetch ${activeTab} news`);
        const data: NewsItem[] = await response.json();
        setFilteredItems(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "NewsBuzz": return "news-buzz";
      case "CorpPulse": return "corp-pulse";
      case "IPOScoop": return "ipo-scoop";
      default: return "news-buzz";
    }
  };

  const getNewsCount = () => {
    if (typeof window === "undefined") return 6;
    return window.innerWidth < 768 ? 2 : 6;
  };

  return (
    <section
      className="py-12 bg-[#F4FBF7] border-b-4 border-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-[#1FA463]/10 border-2 border-black rounded-2xl flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
              <GiNewspaper className="text-black text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
              Financial News Hub
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-2 max-w-md mx-auto">
              Curated insights and breaking news from global markets
            </p>
          </motion.div>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-8 border-b-2 border-black pb-4">
          {[
            { id: "NewsBuzz", label: "News Buzz" },
            { id: "CorpPulse", label: "Corp Pulse" },
            { id: "IPOScoop", label: "IPO Scoop" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "NewsBuzz" | "CorpPulse" | "IPOScoop")}
              className={`px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-black rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-yellow-100 text-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black hover:bg-emerald-50 shadow-[1px_1px_0px_#000]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#1FA463] border-t-transparent"></div>
            <p className="mt-2 text-xs font-bold text-[#1FA463]">Loading news...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-sm font-bold text-red-600 border-2 border-black bg-red-50 p-4 rounded-xl inline-block shadow-[2px_2px_0px_#000]">{error}</p>
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-black rounded-2xl bg-white">
            <h3 className="text-base font-bold text-gray-500">
              No news available at this time
            </h3>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.slice(0, getNewsCount()).map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all flex flex-col h-full cursor-pointer"
                  >
                    <NewsCard item={item} categoryPath={getCategoryPath(item.category)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-6">
              <Link
                href="/news"
                className="px-8 py-3.5 bg-[#1FA463] text-white border-2 border-black font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#000] transition-all"
              >
                View All News
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NewsItem; categoryPath: string }) {
  return (
    <article className="h-full flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-medium uppercase text-emerald-800 bg-emerald-100 border border-[#1FA463] px-2.5 py-0.5 rounded-full">
            {item.category === "NewsBuzz" ? "News Buzz" : item.category === "CorpPulse" ? "Corp Pulse" : "IPO Scoop"}
          </span>
          {item.featured && (
            <span className="bg-yellow-100 text-black border border-black px-2 py-0.5 text-[9px] font-medium uppercase rounded-md shadow-[1px_1px_0px_#000]">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-normal text-black leading-snug line-clamp-3">
          {item.title}
        </h3>
      </div>

      <div className="mt-6 pt-3 border-t-2 border-black flex items-center justify-between text-[11px] font-medium text-gray-500">
        <span>{formatDate(item.publishDate)}</span>
        <Link
          href={`/news/${item.id}`}
          className="px-3.5 py-1.5 bg-[#1FA463] text-white border border-black rounded-lg text-xs font-medium hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_#000] active:translate-y-0 active:shadow-0 transition-all flex items-center gap-1"
        >
          Read
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}