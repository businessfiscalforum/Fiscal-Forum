// components/HomeNewsAndResearchSection.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  views: string;
  featured: boolean;
  link: string;
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
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

export default function HomeNewsAndResearchSection() {
  const [activeTab, setActiveTab] = useState<"NewsBuzz" | "CorpPulse" | "IPOScoop">("NewsBuzz");
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 2025 News Data
  const newsData: NewsItem[] = [
    // News Buzz - Market News
    {
      id: "1",
      title: "Sensex breaches 80,000 mark as Indian markets hit all-time high",
      category: "NewsBuzz",
      publishDate: "2025-03-15",
      views: "18420",
      featured: true,
      link: "https://economictimes.indiatimes.com/markets/stocks/news/sensex-breaches-80000-mark-as-indian-markets-hit-all-time-high/articleshow/118789456.cms"
    },
    {
      id: "2",
      title: "RBI holds repo rate steady at 6.50% in April policy review",
      category: "NewsBuzz",
      publishDate: "2025-04-07",
      views: "15200",
      featured: false,
      link: "https://economictimes.indiatimes.com/news/economy/policy/rbi-holds-repo-rate-steady-at-6-50-in-april-policy-review/articleshow/118954321.cms"
    },
    {
      id: "3",
      title: "Gold hits record ₹7,500 per 10 grams on global uncertainty",
      category: "NewsBuzz",
      publishDate: "2025-02-28",
      views: "12650",
      featured: true,
      link: "https://economictimes.indiatimes.com/markets/commodities/gold-hits-record-7500-per-10-grams-on-global-uncertainty/articleshow/118523456.cms"
    },
    {
      id: "4",
      title: "Rupee strengthens to 78.20 against USD amid robust FPI inflows",
      category: "NewsBuzz",
      publishDate: "2025-03-22",
      views: "9720",
      featured: false,
      link: "https://economictimes.indiatimes.com/markets/forex/rupee-strengthens-to-78-20-against-usd-amid-robust-fpi-inflows/articleshow/119098765.cms"
    },
    {
      id: "5",
      title: "Crude oil prices surge above $120 on Middle East tensions",
      category: "NewsBuzz",
      publishDate: "2025-01-18",
      views: "14300",
      featured: false,
      link: "https://economictimes.indiatimes.com/markets/commodities/crude-oil-prices-surge-above-120-on-middle-east-tensions/articleshow/118154321.cms"
    },
    {
      id: "6",
      title: "Bitcoin crosses $100,000 as crypto adoption accelerates globally",
      category: "NewsBuzz",
      publishDate: "2025-05-03",
      views: "21870",
      featured: true,
      link: "https://economictimes.indiatimes.com/markets/cryptocurrency/bitcoin-crosses-100000-as-crypto-adoption-accelerates-globally/articleshow/119312345.cms"
    },
    
    // Corp Pulse - Corporate
    {
      id: "7",
      title: "Reliance Industries Q4 profit surges 18% on Jio and retail growth",
      category: "CorpPulse",
      publishDate: "2025-05-20",
      views: "16200",
      featured: true,
      link: "https://economictimes.indiatimes.com/news/company/earnings/reliance-industries-q4-profit-surges-18-on-jio-and-retail-growth/articleshow/119578945.cms"
    },
    {
      id: "8",
      title: "Tata Motors unveils $25,000 electric SUV for global markets",
      category: "CorpPulse",
      publishDate: "2025-04-15",
      views: "13800",
      featured: false,
      link: "https://economictimes.indiatimes.com/industry/auto/auto-news/tata-motors-unveils-25000-electric-suv-for-global-markets/articleshow/119143210.cms"
    },
    {
      id: "9",
      title: "Infosys acquires UK-based AI firm for $1.2 billion",
      category: "CorpPulse",
      publishDate: "2025-03-10",
      views: "11600",
      featured: false,
      link: "https://economictimes.indiatimes.com/tech/information-tech/infosys-acquires-uk-based-ai-firm-for-1-2-billion/articleshow/118812345.cms"
    },
    {
      id: "10",
      title: "HDFC Bank launches AI-powered wealth management platform",
      category: "CorpPulse",
      publishDate: "2025-02-25",
      views: "12900",
      featured: true,
      link: "https://economictimes.indiatimes.com/industry/banking/finance/banking/hdfc-bank-launches-ai-powered-wealth-management-platform/articleshow/118687654.cms"
    },
    {
      id: "11",
      title: "Adani Group to invest $5 billion in green hydrogen projects",
      category: "CorpPulse",
      publishDate: "2025-01-30",
      views: "17200",
      featured: false,
      link: "https://economictimes.indiatimes.com/news/company/mergers-acquisitions/adani-group-to-invest-5-billion-in-green-hydrogen-projects/articleshow/118343210.cms"
    },
    {
      id: "12",
      title: "Wipro announces $500 million share buyback program",
      category: "CorpPulse",
      publishDate: "2025-05-12",
      views: "14600",
      featured: true,
      link: "https://economictimes.indiatimes.com/tech/information-tech/wipro-announces-500-million-share-buyback-program/articleshow/119401234.cms"
    },
    
    // IPO Scoop - Capital Markets
    {
      id: "13",
      title: "Ola Electric lists at 25% premium, valuing company at $8.5 billion",
      category: "IPOScoop",
      publishDate: "2025-04-28",
      views: "19200",
      featured: true,
      link: "https://economictimes.indiatimes.com/markets/ipo/ola-electric-lists-at-25-premium-valuing-company-at-8-5-billion/articleshow/119265432.cms"
    },
    {
      id: "14",
      title: "Nykaa plans secondary offering to raise ₹3,500 crore",
      category: "IPOScoop",
      publishDate: "2025-03-18",
      views: "13800",
      featured: false,
      link: "https://economictimes.indiatimes.com/markets/ipo/nykaa-plans-secondary-offering-to-raise-3500-crore/articleshow/118921098.cms"
    },
    {
      id: "15",
      title: "Paytm to raise $1 billion through convertible bonds",
      category: "IPOScoop",
      publishDate: "2025-02-14",
      views: "15500",
      featured: false,
      link: "https://economictimes.indiatimes.com/markets/ipo/paytm-to-raise-1-billion-through-convertible-bonds/articleshow/118467890.cms"
    },
    {
      id: "16",
      title: "Zomato files for $500 million follow-on offering",
      category: "IPOScoop",
      publishDate: "2025-05-08",
      views: "12800",
      featured: true,
      link: "https://economictimes.indiatimes.com/markets/ipo/zomato-files-for-500-million-follow-on-offering/articleshow/119334567.cms"
    },
    {
      id: "17",
      title: "Unicorn startup Polygon files for $1.5 billion IPO",
      category: "IPOScoop",
      publishDate: "2025-01-22",
      views: "16900",
      featured: false,
      link: "https://economictimes.indiatimes.com/markets/ipo/unicorn-startup-polygon-files-for-1-5-billion-ipo/articleshow/118290123.cms"
    },
    {
      id: "18",
      title: "Policybazaar IPO valued at $4.2 billion on final day of bidding",
      category: "IPOScoop",
      publishDate: "2025-04-12",
      views: "18200",
      featured: true,
      link: "https://economictimes.indiatimes.com/markets/ipo/policybazaar-ipo-valued-at-4-2-billion-on-final-day-of-bidding/articleshow/119056789.cms"
    }
  ];

  // Filter items
  useEffect(() => {
    const items = newsData.filter(item => item.category === activeTab);
    setFilteredItems(items);
    setCurrentPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section
      className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative"
      style={{ fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2
            className="text-4xl font-bold text-emerald-800 mb-4"
          >
            Financial News Hub
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Curated insights and breaking news from global markets
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-emerald-200 pb-3">
          {[
            { id: "NewsBuzz", label: "News Buzz" },
            { id: "CorpPulse", label: "Corp Pulse" },
            { id: "IPOScoop", label: "IPO Scoop" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "NewsBuzz" | "CorpPulse" | "IPOScoop")}
              className={`px-6 py-3 text-sm md:text-base font-semibold transition-all duration-300 rounded-full ${
                activeTab === tab.id
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm"
                  : "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
              }`}
              style={{ minWidth: '120px' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {currentItems.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-emerald-600">
              No news available at this time
            </h3>
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <AnimatePresence mode="popLayout">
                {currentItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-emerald-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 h-full rounded-xl"
                  >
                    <NewsCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-3 bg-emerald-100 hover:bg-emerald-200 disabled:bg-emerald-50 text-emerald-800 disabled:text-emerald-400 font-semibold text-sm rounded-full transition-all disabled:cursor-not-allowed min-w-28"
                >
                  ← Prev
                </button>

                <span className="px-5 py-3 text-sm text-emerald-700 font-medium bg-white border border-emerald-200 rounded-full min-w-36 text-center">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-3 bg-emerald-100 hover:bg-emerald-200 disabled:bg-emerald-50 text-emerald-800 disabled:text-emerald-400 font-semibold text-sm rounded-full transition-all disabled:cursor-not-allowed min-w-28"
                >
                  Next →
                </button>
              </div>
            )}

            <div className="flex justify-center mt-10">
              <Link
                href="/news"
                className="px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm uppercase tracking-wide rounded-full transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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

// News Card
function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="h-full flex flex-col p-6 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        {item.featured && (
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full shadow-sm">
            Featured
          </span>
        )}
        <span className="text-xs text-emerald-600 font-medium">
          {formatViews(item.views)} views
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-black mb-4 leading-tight flex-1">
        {item.title}
      </h3>
      
      <div className="flex items-center justify-between text-sm text-emerald-700 mt-auto">
        <span>{formatDate(item.publishDate)}</span>
        <Link 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-teal-600 font-semibold transition-colors flex items-center gap-1 group"
        >
          Read more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16" 
            className="transition-transform group-hover:translate-x-1"
          >
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}