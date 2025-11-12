// components/news/NewsBuzzList.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaStar, FaBolt, FaCalendarAlt, FaTags, FaUser, FaClock } from "react-icons/fa";
import Image from "next/image";
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

// --- HELPER FUNCTION IMPORTED FROM MAIN PAGE ---
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

// --- Component Interface ---
interface NewsBuzzListProps {
  currentNews: NewsItem[];
  handleNewsClick: (id: string) => void;
}

// --- Component ---
const NewsBuzzList: React.FC<NewsBuzzListProps> = ({
  currentNews,
  handleNewsClick,
}) => {
  const featuredArticle = currentNews.length > 0 ? currentNews[0] : null;
  const topStories = currentNews.slice(1, 5);
  const latestNews = currentNews.slice(5);

  return (
    <div className="space-y-8">
      {/* Featured News Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        {featuredArticle && (
          <div
            className="lg:col-span-2 bg-white rounded-lg shadow-md cursor-pointer group border border-emerald-100 hover:border-emerald-300 transition-all duration-300"
            onClick={() => handleNewsClick(featuredArticle.id)}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
              {featuredArticle.image ? (
                <Image
                  src={featuredArticle.image}
                  width={400}
                  height={400}
                  alt={featuredArticle.title}
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
                  {featuredArticle.category || "News"}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-emerald-200 transition-colors line-clamp-2">
                  {featuredArticle.title}
                </h2>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-white/80 text-[10px] sm:text-sm">
                  <span className="truncate max-w-[100px] sm:max-w-none">
                    {featuredArticle.author}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {formatDate(featuredArticle.publishDate)}
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
          {topStories.map((news) => (
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
          {topStories.length === 0 && <p className="text-gray-500">No top stories currently.</p>}
        </div>
      </div>

      {/* Latest News Grid */}
      <div className="space-y-6 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="text-emerald-600" />
          <h3 className="text-xl font-bold text-emerald-800">
            Latest News
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestNews.length > 0 ? (
            latestNews.map((news) => (
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
  );
};

export default NewsBuzzList;