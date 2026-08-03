"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaNewspaper } from "react-icons/fa";

export interface Newsletter {
  id: string;
  title: string;
  description?: string;
  image?: string;
  publishDate: string;
}

// Helper to assign category based on title/description keywords & hash fallback
const getCategory = (item: Newsletter) => {
  const combined = `${item.title} ${item.description || ""}`.toLowerCase();
  
  if (combined.includes("ipo") || combined.includes("listing") || combined.includes("issue") || combined.includes("subscription")) {
    return "IPO SCOOP";
  }
  if (combined.includes("corp") || combined.includes("dividend") || combined.includes("buyback") || combined.includes("acquisition") || combined.includes("merger") || combined.includes("corporate") || combined.includes("jefferies") || combined.includes("concor")) {
    return "CORP PULSE";
  }
  if (combined.includes("buzz") || combined.includes("news") || combined.includes("goldman") || combined.includes("tvs") || combined.includes("eicher") || combined.includes("maruti")) {
    return "NEWS BUZZ";
  }

  // Fallback hash function to distribute items evenly across the 3 categories
  const categories = ["NEWS BUZZ", "CORP PULSE", "IPO SCOOP"];
  let hash = 0;
  const str = item.id || item.title || "";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % categories.length;
  return categories[index];
};

const ClientNewsletterPage = ({ initialNews }: { initialNews: Newsletter[] }) => {
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Newsletter[]>(initialNews || []);
  const [loading, setLoading] = useState(!initialNews || initialNews.length === 0);
  const [activeTab, setActiveTab] = useState("NEWS BUZZ");

  useEffect(() => {
    const fetchNewsletter = async () => {
      if (!initialNews || initialNews.length === 0) {
        setLoading(true);
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`);
        if (response.ok) {
          const data = await response.json();
          if (data.newsletter) {
            setNewsletters(data.newsletter);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletter();
  }, [initialNews]);

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

  // Filter newsletters based on the active tab
  const filteredNewsletters = newsletters.filter((item) => {
    return getCategory(item) === activeTab;
  });

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
          {["NEWS BUZZ", "CORP PULSE", "IPO SCOOP"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full border border-black text-xs md:text-sm font-extrabold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#e6f4ea] text-black shadow-sm"
                  : "bg-white text-black hover:bg-[#f0f4f1]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-t border-slate-300 mb-10" />

        {/* Newsletter Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-600"></div>
          </div>
        ) : filteredNewsletters.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
            <FaNewspaper className="mx-auto text-4xl text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest">
              Awaiting New Stories...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNewsletters.map((item) => {
              const itemCategory = getCategory(item);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  onClick={() => router.push(`/newsletter/${item.id}`)}
                  className="bg-white/95 backdrop-blur-sm border border-slate-300 rounded-[1.5rem] p-6 flex flex-col justify-between h-full min-h-[220px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#e6f4ea] text-[#137333] border border-[#ceead6] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {itemCategory}
                    </span>
                    <span className="bg-[#f1f3f4] text-[#3c4043] border border-[#dadce0] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      FEATURED
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-700 leading-snug line-clamp-3 hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Divider and Footer */}
                  <div className="mt-auto">
                    <div className="border-t border-slate-300 w-full mb-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-slate-500 font-medium">
                        {formatDate(item.publishDate)}
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
        )}
      </div>
    </div>
  );
};

export default ClientNewsletterPage;