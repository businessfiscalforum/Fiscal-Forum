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
      dotClass: "bg-gray-400",
      textClass: "text-gray-600",
    };
  }

  const openTimestamp = Date.parse(openDateStr);
  const closeTimestamp = Date.parse(closeDateStr);

  if (isNaN(openTimestamp) || isNaN(closeTimestamp)) {
    return {
      status: "Invalid",
      dotClass: "bg-gray-400",
      textClass: "text-gray-600",
    };
  }

  const isLive = today >= openTimestamp && today <= closeTimestamp;

  if (isLive) {
    return {
      status: "Live",
      dotClass: "bg-green-500",
      textClass: "text-green-600",
    };
  } else if (today < openTimestamp) {
    return {
      status: "Upcoming",
      dotClass: "bg-yellow-500",
      textClass: "text-yellow-600",
    };
  } else {
    return {
      status: "Closed",
      dotClass: "bg-red-500",
      textClass: "text-red-600",
    };
  }
};

// --- Component Interface ---
interface IpoScoopListProps {
  currentNews: NewsItem[];
  handleNewsClick: (id: string) => void;
}

// --- Component ---
const IpoScoopList: React.FC<IpoScoopListProps> = ({
  currentNews,
  handleNewsClick,
}) => {
  // Helper Component for Data Boxes
  const IpoDataBox: React.FC<{
    icon: React.ElementType;
    title: string;
    value: string;
    valueClass?: string;
    bgClass: string;
  }> = ({ icon: Icon, title, value, valueClass = "", bgClass }) => (
    <div
      className={`p-2 rounded-lg border ${bgClass} text-center flex flex-col justify-center items-center h-full`}
    >
      <Icon className="text-base text-emerald-700" />
      <p className="text-[10px] font-medium text-gray-600 truncate">{title}</p>
      <p className={`text-sm font-bold text-gray-900 ${valueClass} line-clamp-1`}>
        {value}
      </p>
    </div>
  );

  return (
    // Max width added here for better appearance on large screens
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="space-y-6 gap-10">
        {currentNews.map((news, index) => {
          const ipoStatus = getIpoStatus(news.openDate, news.closeDate);

          // Determine GMP color class
          const gmpValue = news.listingGain || "";
          let gmpColorClass = "text-gray-700";
          if (gmpValue.includes("+") || (parseFloat(gmpValue.replace(/[^\d.-]/g, '')) > 0)) {
            gmpColorClass = "text-green-600";
          } else if (gmpValue.includes("-") || (parseFloat(gmpValue.replace(/[^\d.-]/g, '')) < 0)) {
            gmpColorClass = "text-red-500";
          } else if (gmpValue === "N/A" || gmpValue.toLowerCase().includes("na")) {
             gmpColorClass = "text-gray-500";
          }


          return (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-emerald-200 pb-4  group hover:bg-emerald-50/50 p-3 rounded-xl transition-colors duration-200 bg-white"
            >
              
              {/* IPO Title and Consideration (Prominent at the top) */}
              <div className="flex items-center justify-between mb-3 border-b border-emerald-100 pb-2">
                <h3
                  className="text-base sm:text-lg font-bold text-emerald-900 line-clamp-2 cursor-pointer group-hover:text-emerald-700 transition-colors flex-1 min-w-0 pr-3"
                  onClick={() => handleNewsClick(news.id)}
                >
                  {news.ipoName || news.title}
                  <span className="block text-xs font-normal text-gray-500 mt-0.5">
                      {news.companyName || news.category}
                  </span>
                </h3>
                {/* Consideration/Rating Box */}
                <div 
                  className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center shadow-md flex-shrink-0"
                  onClick={(e) => e.stopPropagation()} // Prevent list item click
                >
                  <FaThumbsUp className="mr-1 text-yellow-300" />
                  MAY APPLY
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Left Side: Image and Status */}
                <div className="w-full sm:w-1/3 lg:w-1/4 flex-shrink-0 order-1 sm:order-1">
                  <div className="relative h-28 w-full rounded-lg overflow-hidden shadow-md">
                    {news.image ? (
                      <Image
                        src={news.image}
                        alt={news.title}
                        width={300}
                        height={120} // Adjusted height
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-full h-full flex items-center justify-center">
                        <FaChartLine className="text-4xl text-emerald-500" />
                      </div>
                    )}
                    {/* IPO Status Dot/Text on Image */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold shadow">
                      <span
                        className={`w-2 h-2 rounded-full ${ipoStatus.dotClass}`}
                      ></span>
                      <span className={ipoStatus.textClass}>
                        {ipoStatus.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Compact Details and Actions */}
                <div className="w-full sm:w-2/3 lg:w-3/4 space-y-3 order-2 sm:order-2">
                  
                  {/* Row 1: Key Financial Details (Offer Price + GMP + Subscription) */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* 1. Offer Price */}
                    <IpoDataBox
                      icon={FaRupeeSign}
                      title="Offer Price"
                      value={news.offerPrice || "N/A"}
                      bgClass="bg-red-50 border-red-100"
                      valueClass="text-red-700"
                    />
                    
                    {/* 2. GMP (Now inline with Offer Price) */}
                    <div className="col-span-1">
                       <div className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-center items-center h-full">
                         <FaArrowUp className={`text-base ${gmpColorClass}`} />
                         <p className="text-[10px] font-medium text-gray-600">GMP</p>
                         <p className={`text-sm font-bold ${gmpColorClass} line-clamp-1`}>
                            {news.listingGain || "N/A"}
                         </p>
                       </div>
                    </div>
                    
                    {/* 3. Subscription */}
                    <IpoDataBox
                      icon={FaBolt}
                      title="Subscription"
                      value={news.subscriptionRate || "0x"}
                      bgClass="bg-orange-50 border-orange-100"
                      valueClass="text-orange-700"
                    />
                  </div>

                  {/* Row 2: Dates (Horizontal Flex - Wrapped and Compact) */}
                  <div className="flex flex-wrap gap-2 p-2 bg-indigo-50/50 rounded-lg border border-indigo-100 justify-between items-center text-xs">
                    <div className="font-medium text-indigo-700 flex-1 min-w-[45%] sm:min-w-0">
                      Open: <span className="font-bold text-green-600">{formatDate(news.openDate)}</span>
                      <span className="mx-1 text-black">-</span>
                      Close: <span className="font-bold text-red-600">{formatDate(news.closeDate)}</span>
                    </div>
                    <div className="font-medium text-blue-700 flex-1 min-w-[45%] sm:min-w-0">
                      Allotment: <span className="font-bold text-blue-900">{formatDate(news.allotmentDate)}</span>
                    </div>
                    <div className="font-medium text-yellow-700 flex-1 min-w-[45%] sm:min-w-0">
                      Listing: <span className="font-bold text-yellow-900">{formatDate(news.listingDate)}</span>
                    </div>
                  </div>

                  {/* Row 3: Description and Actions */}
                  <div className="w-full flex flex-col">
                    <p className="text-gray-800 text-sm font-semibold mb-1">Description:</p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {news.description ||
                        "No detailed description available. Click 'More Info' to view the full news article."}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {/* Apply Now Button */}
                      <Link
                        href={news.applyLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (ipoStatus.status !== "Live") e.preventDefault();
                          e.stopPropagation();
                        }}
                        className={`col-span-1 text-center px-3 py-2 text-sm font-bold rounded-lg transition-colors duration-300 ${
                          ipoStatus.status === "Live"
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-70"
                        }`}
                      >
                        {ipoStatus.status === "Live"
                          ? "Apply Now"
                          : ipoStatus.status === "Upcoming"
                          ? "Upcoming"
                          : "Closed"}
                      </Link>
                      
                      {/* View Allotment Button - uses news.link */}
                      <a
                        href={news.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="col-span-1 text-center px-3 py-2 text-sm font-bold rounded-lg transition-colors duration-300 bg-emerald-500 text-white hover:bg-emerald-600 shadow-md"
                      >
                        Allotment
                      </a>
                      
                      {/* More Info Button */}
                      <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNewsClick(news.id);
                        }}
                        className="col-span-1 text-center px-3 py-2 text-sm font-bold rounded-lg transition-colors duration-300 bg-gray-700 text-white hover:bg-gray-800 shadow-md"
                      >
                        More Info
                      </button>
                    </div>
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