 
import React from "react";
import { FaGlobe, FaStar, FaBolt, FaCalendarAlt, FaTags, FaUserCircle } from "react-icons/fa";
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

interface NewsBuzzListProps {
  currentNews: NewsItem[];
  handleNewsClick: (id: string) => void;
  ShareButton: React.ComponentType<{ id: string; title: string }>;
}

const NewsBuzzList: React.FC<NewsBuzzListProps> = ({
  currentNews,
  handleNewsClick,
  ShareButton,
}) => {
  const filteredNews = currentNews.filter(
    (item) => item.category?.toLowerCase() === "news buzz"
  );
  const featuredArticle = filteredNews.length > 0 ? filteredNews[0] : null;
  const topStories = filteredNews.slice(1, 5);
  const latestNews = filteredNews.slice(5);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* --- Section 1: Hero & Trending --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Featured Card (Spans 8 columns) */}
        {featuredArticle && (
          <div
            className="lg:col-span-8 group relative bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => handleNewsClick(featuredArticle.id)}
          >
            <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full w-full overflow-hidden">
              {featuredArticle.image ? (
                <Image
                  src={featuredArticle.image}
                  fill
                  alt={featuredArticle.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
              ) : (
                <div className="bg-emerald-950 w-full h-full flex items-center justify-center">
                  <FaGlobe className="text-8xl text-emerald-900" />
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black tracking-widest shadow-lg uppercase">
                    Featured
                  </span>
                  <div className="flex items-center text-emerald-400 text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <FaCalendarAlt className="mr-2" /> {formatDate(featuredArticle.publishDate)}
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {featuredArticle.title}
                </h2>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-slate-300 font-medium">
                    <FaUserCircle className="text-xl text-emerald-500" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-full p-1 border border-white/20 hover:bg-emerald-500 transition-colors">
                    <ShareButton id={featuredArticle.id} title={featuredArticle.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Stories List (Spans 4 columns) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <FaStar className="text-amber-500" /> Top Stories
            </h3>
          </div>
          <div className="space-y-4">
            {topStories.map((news) => (
              <div
                key={news.id}
                className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex gap-4"
                onClick={() => handleNewsClick(news.id)}
              >
                <div className="flex-1">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mb-1 block">Trending</span>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 text-sm leading-snug">
                    {news.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{formatDate(news.publishDate)}</span>
                    <ShareButton id={news.id} title={news.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Section 2: Latest News Grid --- */}
      <div className="space-y-6 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <FaTags className="text-emerald-600" /> Latest Feed
          </h3>
          <div className="h-[2px] flex-1 bg-slate-100 ml-6 hidden md:block" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.length > 0 ? (
            latestNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                onClick={() => handleNewsClick(news.id)}
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <FaBolt className="text-emerald-600 text-xs" />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{news.author}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-3 mb-6 leading-tight">
                    {news.title}
                  </h4>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-300 uppercase">Released</span>
                    <span className="text-xs font-black text-emerald-800 tracking-tighter">{formatDate(news.publishDate)}</span>
                  </div>
                  <div className="bg-slate-50 rounded-full p-1 group-hover:bg-emerald-50 transition-colors">
                    <ShareButton id={news.id} title={news.title} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <FaGlobe className="mx-auto text-4xl text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest">Awaiting New Stories...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsBuzzList;