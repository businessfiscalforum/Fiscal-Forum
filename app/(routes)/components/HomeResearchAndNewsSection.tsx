// components/HomeNewsAndResearchSection.tsx
"use client";
import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaFilePdf,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: string;
  link: string | null;
  featured: boolean;
  tags: string[];
  published: boolean;
}

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
  tags: string[];
  summary: string;
  pdfUrl: string;
  published: boolean;
}

// Categories from schema
const newsCategories = [
  "All",
  "Blockchain",
  "Fintech",
  "Market News",
  "Research",
  "Regulation",
  "Crypto",
  "Banking",
];
const sectors = [
  "All",
  "Technology",
  "Finance",
  "Healthcare",
  "Energy",
  "Consumer Goods",
  "Real Estate",
  "Automotive",
  "Telecom",
];

// Helper functions
function getRatingColor(rating: string) {
  switch (rating) {
    case "BUY":
      return "bg-green-600 text-white";
    case "HOLD":
      return "bg-yellow-600 text-white";
    case "SELL":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
}

function formatViews(views: string | number) {
  const num = typeof views === "string" ? parseInt(views) : views;
  if (isNaN(num)) return "0";
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatUpside(upside: string) {
  const num = parseFloat(upside);
  return (
    <span
      className={
        num > 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"
      }
    >
      {num > 0 ? (
        <FaArrowUp className="inline text-xs mr-1" />
      ) : (
        <FaArrowDown className="inline text-xs mr-1" />
      )}
      {upside}
    </span>
  );
}

export default function HomeNewsAndResearchSection() {
  const [activeTab, setActiveTab] = useState<"News" | "Research">("News");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [filteredItems, setFilteredItems] = useState<
    Array<NewsItem | ResearchReport>
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, reportsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`),
        ]);
        if (!newsRes.ok) throw new Error(`News API error: ${newsRes.status}`);
        if (!reportsRes.ok)
          throw new Error(`Reports API error: ${reportsRes.status}`);
        const newsData: NewsItem[] = await newsRes.json();
        const reportData: ResearchReport[] = await reportsRes.json();
        setNewsItems(newsData.filter((n) => n.id));
        setReports(reportData.filter((r) => r.id));
      } catch (error) {
        console.error("Failed to load data:", error);
        setNewsItems([]);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort
  useEffect(() => {
    let items: Array<NewsItem | ResearchReport> =
      activeTab === "News" ? [...newsItems] : [...reports];
    // Search
    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ("description" in item &&
            item.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          ("summary" in item &&
            item.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    // Category filter
    if (selectedCategory !== "All") {
      items = items.filter((item) =>
        activeTab === "News"
          ? (item as NewsItem).category === selectedCategory
          : (item as ResearchReport).sector === selectedCategory ||
            (item as ResearchReport).reportType === selectedCategory
      );
    }
    // Sort
    items.sort((a, b) => {
      const dateA = new Date(
        activeTab === "News"
          ? (a as NewsItem).publishDate
          : (a as ResearchReport).date
      ).getTime();
      const dateB = new Date(
        activeTab === "News"
          ? (b as NewsItem).publishDate
          : (b as ResearchReport).date
      ).getTime();
      const viewsA =
        (activeTab === "News"
          ? parseInt((a as NewsItem).views || "0")
          : (a as ResearchReport).views) || 0;
      const viewsB =
        (activeTab === "News"
          ? parseInt((b as NewsItem).views || "0")
          : (b as ResearchReport).views) || 0;
      return sortBy === "popular" ? viewsB - viewsA : dateB - dateA;
    });
    setFilteredItems(items);
    setCurrentPage(1);
  }, [activeTab, newsItems, reports, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent pb-5">
            Top Stories 
          </h2>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["News", "Research"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "News" | "Research")}
                  className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 bg-white text-sm"
            >
              <option value="All">
                All {activeTab === "News" ? "Categories" : "Sectors"}
              </option>
              {(activeTab === "News" ? newsCategories : sectors)
                .slice(1)
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "latest" | "popular")
              }
              className="px-3 py-2 border border-gray-300 bg-white text-sm"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Viewed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-500">
              Loading {activeTab.toLowerCase()}...
            </p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-20">
            <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {activeTab.toLowerCase()} found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              <AnimatePresence mode="popLayout">
                {currentItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    {activeTab === "News" ? (
                      <NewsCard item={item as NewsItem} />
                    ) : (
                      <ResearchCard item={item as ResearchReport} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 bg-white text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm border transition ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 bg-white text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Link
                href={activeTab === "News" ? "/news" : "/reports"}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
              >
                Read More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// News Card
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {item.featured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 text-xs font-semibold">
            FEATURED
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2 py-1 text-xs font-medium">
          {item.category}
        </div>
        {/* Placeholder for image */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <span className="text-blue-400 text-2xl">📰</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-3 mb-2 leading-tight">
          {item.title}
        </h3>

        <p className="text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Metadata */}
        <div className="text-xs text-gray-500 space-y-1 mb-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <FaUser className="text-xs" />
              {item.author}
            </span>
            <span className="flex items-center gap-1">
              <FaEye className="text-xs" />
              {formatViews(item.views)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            {/* <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs" />
              {format(new Date(item.publishDate), 'MMM dd, yyyy')}
            </span> */}
            <span className="flex items-center gap-1">
              <FaClock className="text-xs" />
              {item.readTime}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-600 px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <Link
          href={item.link || `/news/${item.id}`}
          className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline mt-auto"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

// Research Report Card
function ResearchCard({ item }: { item: ResearchReport }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-bold px-2 py-1 ${getRatingColor(item.rating)}`}
          >
            {item.rating}
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {item.stock}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
          {item.title}
        </h3>

        <p className="text-gray-600 text-xs line-clamp-2 mb-3">
          {item.summary}
        </p>
      </div>

      {/* Price Info */}
      <div className="p-4 bg-gray-50 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Target Price:</span>
          <span className="font-semibold">{item.targetPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Current Price:</span>
          <span>{item.currentPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Upside:</span>
          <span>{formatUpside(item.upside)}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs text-gray-500 space-y-1 mb-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <FaUser className="text-xs" />
              {item.author}
            </span>
            <span className="flex items-center gap-1">
              <FaEye className="text-xs" />
              {formatViews(item.views)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>{item.authorFirm}</span>
            {/* <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span> */}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs">
            {item.reportType}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-1 text-xs">
            {item.sector}
          </span>
        </div>

        {/* Read More Button */}
        <Link
          href={`/research/${item.id}`}
          className="text-red-600 hover:text-red-800 text-xs font-medium hover:underline mt-auto flex items-center gap-1"
        >
          <FaFilePdf className="text-xs" />
          View Report →
        </Link>
      </div>
    </div>
  );
}
