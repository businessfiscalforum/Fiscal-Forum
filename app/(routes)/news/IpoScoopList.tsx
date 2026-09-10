// components/news/IpoScoopList.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import {
  FaRupeeSign,
  FaChartLine,
  FaBolt,
  FaThumbsUp, // Icon for 'May Apply'
  FaArrowUp,  // Using FaArrowUp for GMP
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// NOTE: Interface and Helper functions (formatDate, getIpoStatus) are kept the same
// but are omitted here for brevity and assumed to be available as in your provided code.

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
  link: string; // Used for "View Allotment"
  featured?: boolean | null;
  tags?: string | null;
  ipoName?: string | null;
  companyName?: string | null;
  priceRange?: string | null;
  issueSize?: string | null;
  currentPrice?: string | null;
  listingGain?: string | null; // Used for GMP
  subscriptionRate?: string | null;
  applyLink?: string | null;
  offerPrice?: string | null;
  openDate?: string | null;
  closeDate?: string | null;
  allotmentDate?: string | null;
  refundDate?: string | null;
  listingDate?: string | null;
}

// --- HELPER FUNCTIONS (KEEP THESE IN THIS FILE) ---
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

const getIpoStatus = (
  openDateStr: string | null | undefined,
  closeDateStr: string | null | undefined
) => {
  const today = Date.now();

  if (!openDateStr || !closeDateStr) {
    return {
      status: "N/A",
      badgeClass: "bg-gray-100 text-gray-800 border-gray-400",
      dotClass: "bg-gray-400",
      textClass: "text-gray-600",
    };
  }

  const openTimestamp = Date.parse(openDateStr);
  const closeTimestamp = Date.parse(closeDateStr);

  if (isNaN(openTimestamp) || isNaN(closeTimestamp)) {
    return {
      status: "Invalid",
      badgeClass: "bg-gray-100 text-gray-800 border-gray-400",
      dotClass: "bg-gray-400",
      textClass: "text-gray-600",
    };
  }

  const isLive = today >= openTimestamp && today <= closeTimestamp;

  if (isLive) {
    return {
      status: "Live",
      badgeClass: "bg-emerald-400 text-black border-black font-extrabold",
      dotClass: "bg-emerald-900 animate-pulse",
      textClass: "text-emerald-800",
    };
  } else if (today < openTimestamp) {
    return {
      status: "Upcoming",
      badgeClass: "bg-amber-300 text-black border-black font-extrabold",
      dotClass: "bg-amber-900",
      textClass: "text-amber-800",
    };
  } else {
    return {
      status: "Closed",
      badgeClass: "bg-rose-200 text-black border-black font-extrabold",
      dotClass: "bg-rose-700",
      textClass: "text-rose-800",
    };
  }
};

// --- Component Interface ---
interface IpoScoopListProps {
  currentNews: NewsItem[];
  handleNewsClick: (id: string) => void;
  // Added ShareButton to interface
  ShareButton: React.ComponentType<{ id: string; title: string }>;
}

// Helper Component for Robust IPO Image Rendering
const IpoCardImage: React.FC<{ src?: string | null; title: string }> = ({ src, title }) => {
  const defaultImg = "/images/service-ipo.png";
  const validSrc = (src && src !== "null" && src !== "undefined" && src.trim() !== "") ? src : defaultImg;
  const [imgSrc, setImgSrc] = React.useState<string>(validSrc);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const nextSrc = (src && src !== "null" && src !== "undefined" && src.trim() !== "") ? src : defaultImg;
    setImgSrc(nextSrc);
    setHasError(false);
  }, [src]);

  return (
    <Image
      src={hasError || !imgSrc ? defaultImg : imgSrc}
      alt={title}
      fill
      className="w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  );
};

// --- Component ---
const IpoScoopList: React.FC<IpoScoopListProps> = ({
  currentNews,
  handleNewsClick,
  ShareButton,
}) => {
  // Helper Component for Claymorphic Stat Boxes
  const IpoDataBox: React.FC<{
    icon: React.ElementType;
    title: string;
    value: string;
    valueClass?: string;
    bgClass: string;
  }> = ({ icon: Icon, title, value, valueClass = "", bgClass }) => (
    <div
      className={`p-3 rounded-2xl border border-black/80 ${bgClass} text-center flex flex-col justify-center items-center h-full shadow-sm transition-all`}
    >
      <div className="flex items-center gap-1 mb-1">
        <Icon className="text-xs text-black/70" />
        <span className="text-[10px] font-black text-black uppercase tracking-wider">{title}</span>
      </div>
      <p className={`text-sm sm:text-base font-black text-black ${valueClass} line-clamp-1`}>
        {value}
      </p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      <div className="space-y-6">
        {currentNews.map((news, index) => {
          const ipoStatus = getIpoStatus(news.openDate, news.closeDate);

          // Determine GMP color class
          const gmpValue = news.listingGain || "";
          let gmpColorClass = "text-gray-900";
          if (gmpValue.includes("+") || (parseFloat(gmpValue.replace(/[^\d.-]/g, '')) > 0)) {
            gmpColorClass = "text-emerald-700";
          } else if (gmpValue.includes("-") || (parseFloat(gmpValue.replace(/[^\d.-]/g, '')) < 0)) {
            gmpColorClass = "text-rose-700";
          } else if (gmpValue === "N/A" || gmpValue.toLowerCase().includes("na")) {
             gmpColorClass = "text-gray-600";
          }

          return (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white border-2 border-black rounded-3xl p-5 md:p-6 shadow-sm hover:border-[#1FA463] hover:shadow-md transition-all duration-200"
            >
              {/* IPO Title & Rating Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-black/10">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-yellow-200 text-black border border-black px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      IPO SCOOP
                    </span>
                    {news.companyName && (
                      <span className="text-xs font-bold text-gray-500 truncate">
                        {news.companyName}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-lg md:text-xl font-black text-black leading-snug cursor-pointer hover:text-emerald-700 transition-colors"
                    onClick={() => handleNewsClick(news.id)}
                  >
                    {news.ipoName || news.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="bg-emerald-400 text-black border border-black px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5">
                    <FaThumbsUp className="text-black text-xs" />
                    MAY APPLY
                  </div>
                  <ShareButton id={news.id} title={news.ipoName || news.title} />
                </div>
              </div>

              {/* Main Content Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Left: Image Container */}
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="relative w-full aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden border-2 border-black bg-emerald-50 shadow-sm">
                    <IpoCardImage src={news.image} title={news.title} />
                    {/* Status Badge */}
                    <div className={`absolute top-2.5 right-2.5 border border-black px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${ipoStatus.badgeClass}`}>
                      <span className={`w-2 h-2 rounded-full ${ipoStatus.dotClass}`} />
                      {ipoStatus.status}
                    </div>
                  </div>
                </div>

                {/* Right: Details & Actions */}
                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <IpoDataBox
                      icon={FaRupeeSign}
                      title="Offer Price"
                      value={news.offerPrice || "N/A"}
                      bgClass="bg-emerald-50/80"
                      valueClass="text-emerald-950"
                    />
                    <IpoDataBox
                      icon={FaArrowUp}
                      title="GMP"
                      value={news.listingGain || "N/A"}
                      bgClass="bg-blue-50/80"
                      valueClass={gmpColorClass}
                    />
                    <IpoDataBox
                      icon={FaBolt}
                      title="Subscription"
                      value={news.subscriptionRate || "0x"}
                      bgClass="bg-amber-50/80"
                      valueClass="text-amber-950"
                    />
                  </div>

                  {/* Dates Timeline Strip */}
                  <div className="p-3 bg-[#F4FBF7] border border-black rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-black">
                    <div className="flex items-center gap-1.5">
                      <span>Open-Close:</span>
                      <span className="text-emerald-800 font-black">
                        {formatDate(news.openDate)} - {formatDate(news.closeDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-black/10 pt-1 sm:pt-0 sm:pl-3">
                      <span>Allotment:</span>
                      <span className="text-blue-900 font-black">{formatDate(news.allotmentDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-black/10 pt-1 sm:pt-0 sm:pl-3">
                      <span>Listing:</span>
                      <span className="text-purple-900 font-black">{formatDate(news.listingDate)}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-relaxed">
                    {news.description ||
                      "No detailed description available. Click 'More Info' to view full prospectus and financial updates."}
                  </p>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <Link
                      href={news.applyLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (ipoStatus.status !== "LIVE") e.preventDefault();
                        e.stopPropagation();
                      }}
                      className={`text-center py-2.5 px-3 rounded-xl border border-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all ${
                        ipoStatus.status === "LIVE"
                          ? "bg-[#1FA463] text-white hover:bg-emerald-600 cursor-pointer shadow-sm"
                          : "bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {ipoStatus.status === "LIVE" ? "Apply Now" : ipoStatus.status === "UPCOMING" ? "Upcoming" : "Closed"}
                    </Link>

                    <a
                      href={news.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-center py-2.5 px-3 rounded-xl border border-black bg-yellow-100 hover:bg-yellow-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm"
                    >
                      Allotment
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNewsClick(news.id);
                      }}
                      className="text-center py-2.5 px-3 rounded-xl border border-black bg-black text-white hover:bg-gray-800 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default IpoScoopList;