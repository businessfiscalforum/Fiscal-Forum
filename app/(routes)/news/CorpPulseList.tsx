// components/news/CorpPulseList.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaClock } from "react-icons/fa";
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
interface CorpPulseListProps {
  currentNews: NewsItem[];
  handleNewsClick: (id: string) => void;
}

// --- Component ---
const CorpPulseList: React.FC<CorpPulseListProps> = ({
  currentNews,
  handleNewsClick,
}) => {
  return (
    <div className=" p-6 ">
      <div className="space-y-6">
        {currentNews.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-emerald-100 pb-6 last:border-0 last:pb-0 group cursor-pointer hover:bg-emerald-50/30 p-2 rounded-xl transition-colors duration-200 bg-white"
            onClick={() => handleNewsClick(news.id)}
          >
            <div className="w-full">
              <h3
                className="text-lg md:text-xl font-bold text-emerald-900 mb-2 group-hover:text-emerald-600 transition-colors"
              >
                {news.title}
              </h3>

              {/* Default Description */}
              <p className="text-gray-600 line-clamp-2 mb-2">
                {news.description}
              </p>

              {/* Default Metadata Row */}
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CorpPulseList;