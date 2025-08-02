"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { 
  FaClock, FaUser, FaArrowRight, FaSearch, 
  FaFilter, FaTags, FaEye, FaShare, FaBookmark, FaChevronLeft, 
  FaChevronRight, FaArrowUp, FaGlobe, FaNewspaper,
  FaRocket,
} from 'react-icons/fa';
import Image from 'next/image';
import { financialNewsData } from './newsData';
import Link from 'next/link';

// Define the NewsItem interface
interface NewsItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: string;
  link: string;
  featured?: boolean;
  tags?: string[];
}

const slides = [
  {
    title: "Car Insurance",
    subtitle: "Protect Your Drive with",
    description:
      "Get comprehensive car insurance that covers accidents, theft, and third-party liabilities — drive worry-free.",
    image: "/asset1.jpg",
    gradient: "from-blue-600 via-blue-500 to-purple-600",
    path: "/car-insurance",
  },
  {
    title: "Health",
    subtitle: "Safeguard Your Health",
    description:
      "Stay financially prepared for medical emergencies with customizable health insurance plans for individuals and families.",
    image: "/asset3.jpg",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    path: "/health-insurance",
  },
  {
    title: "Life Insurance",
    subtitle: "Explore",
    description:
      "Plan for tomorrow with life insurance solutions designed to support your loved ones even in your absence.",
    image: "/asset4.jpg",
    gradient: "from-indigo-600 via-purple-500 to-pink-600",
    path: "/life-insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Open a High-Interest",
    description:
      "Grow your money safely with easy access and competitive interest rates. Perfect for everyday banking needs.",
    image: "/asset5.jpg",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    path: "/savings-account",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with the Right",
    description:
      "Enjoy cashback, rewards, and easy EMIs with credit cards suited to your lifestyle and spending habits.",
    image: "/asset2.jpg",
    gradient: "from-orange-600 via-red-500 to-pink-600",
    path: "/credit-card",
  },
  {
    title: "Stock Market",
    subtitle: "Start Investing in the",
    description:
      "Tap into long-term growth by investing in equity markets. Build wealth through diversified stocks tailored to your financial goals.",
    image: "/asset6.jpg",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    path: "/stock-investment",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore",
    description:
      "Choose from a range of mutual fund schemes managed by experts to suit your investment horizon and risk appetite.",
    image: "/asset7.jpg",
    gradient: "from-cyan-600 via-blue-500 to-indigo-600",
    path: "/mutual-funds",
  },
];

const NewsPage = () => {
  const newsData: NewsItem[] = financialNewsData;
  const itemsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const allNews: NewsItem[] = newsData.length > 0 ? newsData : financialNewsData;
  const categories = ['all', ...new Set(allNews.map(news => news.category))];

  const filteredNews = allNews
    .filter(news =>
      (selectedCategory === 'all' || news.category === selectedCategory) &&
      (news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      } else if (sortBy === 'popular') {
        return parseInt(b.views.replace(/[^0-9]/g, '')) - parseInt(a.views.replace(/[^0-9]/g, ''));
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleNewsClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
        <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
      {/* Floating Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-32 pb-16 sm:pt-40 sm:pb-20 md:pt-52 md:pb-24 lg:pt-45 lg:pb-28 xl:pt-45 xl:pb-32 relative overflow-hidden">
        {/* <div className="absolute inset-0 opacity-10 z-0"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-teal-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div> */}

        <div className="max-w-[1700px] mx-auto px-6 relative z-10">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="rounded-3xl overflow-hidden shadow-2xl "
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col lg:flex-row h-[800px] items-center justify-between backdrop-blur-xl bg-gradient-to-r ${slide.gradient}/90 p-8 rounded-3xl shadow-2xl border border-white/20
`}
                >
                  <div className="w-full lg:w-1/2 space-y-8">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="uppercase tracking-widest text-sm text-yellow-200 font-semibold"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-5xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl text-white/90 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <Link href={slide.path}>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group"
                      >
                        Know More
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full lg:w-1/2 h-full relative"
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div> */}

      <div className="relative z-10">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FaNewspaper className="text-2xl" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Financial News
                </h1>
              </div>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest financial news, market trends, and expert insights from around the world
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            >
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-white shadow-sm text-black"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white text-black"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white text-black"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </motion.div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            {/* Results Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center justify-between"
            >
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredNews.length)} of {filteredNews.length} articles
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <FaArrowUp className="text-green-500" />
                <span className="text-sm">Updated every hour</span>
              </div>
            </motion.div>

            {/* News Cards Grid */}
            {currentNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() => handleNewsClick(news.link)}
                  >
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 relative">
                      {/* Featured Badge */}
                      {news.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <FaArrowUp className="text-xs" />
                            Featured
                          </div>
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          {news.image ? (
                            <Image
                              src={news.image} 
                              alt={news.title}
                              width={800}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                          ) : (
                            <div className="text-center">
                              <FaGlobe className="text-4xl text-gray-400 mb-2" />
                              <p className="text-gray-500 text-sm">News Article</p>
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category & Meta */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {news.category}
                          </span>
                          <div className="flex items-center gap-3 text-gray-500 text-xs">
                            <div className="flex items-center gap-1">
                              <FaEye className="text-xs" />
                              <span>{news.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaClock className="text-xs" />
                              <span>{news.readTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {news.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {news.description}
                        </p>

                        {/* Tags */}
                        {news.tags && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {news.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs flex items-center gap-1"
                              >
                                <FaTags className="text-xs" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <FaUser className="text-white text-xs" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{news.author}</p>
                              <p className="text-xs text-gray-500">{formatDate(news.publishDate)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-8 h-8 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add bookmark functionality
                              }}
                            >
                              <FaBookmark className="text-xs text-gray-600 hover:text-blue-600" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-8 h-8 bg-gray-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (navigator.share) {
                                  navigator.share({
                                    title: news.title,
                                    url: news.link
                                  });
                                }
                              }}
                            >
                              <FaShare className="text-xs text-gray-600 hover:text-green-600" />
                            </motion.button>
                            <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                              Read More
                              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaNewspaper className="text-3xl text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No News Articles Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== 'all' 
                    ? "Try adjusting your search or filter criteria" 
                    : "News articles will appear here when provided"}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center gap-2 mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="text-sm" />
                  Previous
                </motion.button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;
                    
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <motion.button
                          key={page}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700'
                          }`}
                        >
                          {page}
                        </motion.button>
                      );
                    } else if (
                      page === currentPage - 3 || 
                      page === currentPage + 3
                    ) {
                      return (
                        <span key={page} className="flex items-center px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FaChevronRight className="text-sm" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
    </>
    
    
  );
};

export default NewsPage;