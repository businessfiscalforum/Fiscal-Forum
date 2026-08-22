 
import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaClock, FaBriefcase, FaChevronRight } from "react-icons/fa";
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
}

// --- HELPER FUNCTION ---
const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
};

// --- Component Interface ---
interface CorpPulseListProps {
  currentNews: NewsItem[];
  handleNewsClick: (id: string) => void;
  ShareButton: React.ComponentType<{ id: string; title: string }>; // Received from parent
}

// --- Component ---
const CorpPulseList: React.FC<CorpPulseListProps> = ({
  currentNews,
  handleNewsClick,
  ShareButton,
}) => {
  // Filter for Corporate Pulse specifically
  const filteredNews = currentNews.filter(
    (item) => item.category?.toLowerCase() === "corp pulse"
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-2">
      {filteredNews.length > 0 ? (
        filteredNews.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white rounded-3xl border border-emerald-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row gap-6 items-center"
            onClick={() => handleNewsClick(news.id)}
          >
            {/* Left Side: Image / Brand Icon */}
            <div className="relative w-full md:w-48 h-32 md:h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-emerald-50">
              {news.image ? (
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaBriefcase className="text-3xl text-emerald-200" />
                </div>
              )}
              {/* Floating Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  PULSE
                </span>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                  {news.title}
                </h3>
              </div>

              <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-medium italic">
                {news.description || "Comprehensive corporate coverage and market pulse analysis."}
              </p>

              {/* Bottom Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <FaUser className="text-emerald-500" />
                    <span>{news.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-emerald-500" />
                    <span>{formatDate(news.publishDate)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <ShareButton id={news.id} title={news.title} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <FaChevronRight className="text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest">No Corporate Updates Found</p>
        </div>
      )}
    </div>
  );
};

export default CorpPulseList;