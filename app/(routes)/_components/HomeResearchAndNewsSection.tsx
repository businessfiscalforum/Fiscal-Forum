// components/HomeNewsAndResearchSection.tsx
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
  // Removed 'link' as we'll construct it based on the ID
}

// Helper functions
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

  // Map tab names to API endpoints
  const endpointMap = {
    NewsBuzz: "/api/news/news-buzz",
    CorpPulse: "/api/news/corp-pulse",
    IPOScoop: "/api/news/ipo-scoop",
  };

  // Fetch items
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(endpointMap[activeTab]);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${activeTab} news`);
        }
        
        const data: NewsItem[] = await response.json();
        // Limit to 6 items for desktop, will be handled by grid for mobile
        setFilteredItems(data.slice(0, 6));
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

  // Determine category path for link construction
  const getCategoryPath = (category: string) => {
    switch (category) {
      case "NewsBuzz": return "news-buzz";
      case "CorpPulse": return "corp-pulse";
      case "IPOScoop": return "ipo-scoop";
      default: return "news-buzz";
    }
  };

  return (
    <section
      className="pt-16 pb-12 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl mb-8 shadow-2xl">
              <GiNewspaper className="text-white text-4xl sm:text-3xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Financial News Hub
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-md sm:max-w-lg mx-auto">
              Curated insights and breaking news from global markets
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 border-b border-emerald-200 pb-2">
          {[
            { id: "NewsBuzz", label: "News Buzz" },
            { id: "CorpPulse", label: "Corp Pulse" },
            { id: "IPOScoop", label: "IPO Scoop" },
          ].map((tab) => (
            <button
              key={tab.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-full ${
                activeTab === tab.id
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm"
                  : "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading & Error States */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-2 text-emerald-600">Loading news...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-emerald-600">
              No news available at this time
            </h3>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border shadow-2xl border-emerald-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300 rounded-lg sm:rounded-xl overflow-hidden"
                  >
                    <NewsCard 
                      item={item} 
                      categoryPath={getCategoryPath(item.category)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href={`/news`}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm uppercase tracking-wide rounded-full transition-all shadow-sm hover:shadow-md transform hover:scale-105"
              >
                View All News
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// News Card Component
function NewsCard({ item, categoryPath }: { item: NewsItem; categoryPath: string }) {
  return (
    <article className="h-full flex flex-col p-4 sm:p-5">
      <div className="flex items-center justify-between mb-2.5">
        {item.featured && (
          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-full shadow-sm">
            Featured
          </span>
        )}
        <span className="text-[10px] sm:text-xs text-emerald-600 font-medium">
          {formatViews(item.views)} views
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 leading-tight line-clamp-3 flex-1">
        {item.title}
      </h3>

      <div className="flex items-center justify-between text-[10px] sm:text-xs text-emerald-700 mt-auto pt-2 border-t border-emerald-100">
        <span>{formatDate(item.publishDate)}</span>
        <Link
          href={`/news/${item.id}`}
          className="text-emerald-600 hover:text-teal-600 font-semibold transition-colors flex items-center gap-1 group"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="transition-transform group-hover:translate-x-0.5"
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