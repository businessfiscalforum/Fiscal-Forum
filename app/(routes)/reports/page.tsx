"use client";
import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaFilePdf,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaSortAmountDown,
  FaSortAmountUp,
  FaEye,
  FaShare,
  FaArrowUp,
  FaArrowDown,
  FaRocket,
} from "react-icons/fa";
import Link from "next/link";

const slides = [
  {
    title: "Loan Services",
    subtitle: "Get Instant Access to",
    description:
      "Choose from personal, home, or education loans with low interest rates and flexible repayment options.",
    image: "/asset-loan.jpg",
    gradient: "from-blue-600 via-blue-500 to-purple-600",
    path: "services/loan",
  },
  {
    title: "Insurance Plans",
    subtitle: "Protect Your Future with",
    description:
      "Health, car, and life insurance plans tailored to your needs — secure your family and assets today.",
    image: "/asset-insurance.jpg",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    path: "services/insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Grow Your Wealth with a",
    description:
      "High-interest savings accounts with zero balance requirements and easy online access.",
    image: "/asset-saving.jpg",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    path: "services/saving-account",
  },
  {
    title: "Stock Investment",
    subtitle: "Invest Smartly in the",
    description:
      "Build a diversified portfolio and start investing in the stock market with expert guidance.",
    image: "/asset-stock.jpg",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    path: "services/stock-investment",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore High-Return",
    description:
      "Access professionally managed mutual funds to meet your financial goals across risk profiles.",
    image: "/asset-mutual.jpg",
    gradient: "from-cyan-600 via-blue-500 to-indigo-600",
    path: "services/mutual-funds",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with a",
    description:
      "Choose the right credit card for rewards, cashback, and low-interest EMIs.",
    image: "/asset-credit.jpg",
    gradient: "from-orange-600 via-red-500 to-pink-600",
    path: "services/credit-card",
  },
  {
    title: "Govt Bonds & FDs",
    subtitle: "Secure Investments with",
    description:
      "Low-risk government bonds and fixed deposits to preserve capital and earn steady returns.",
    image: "/asset-bondfd.jpg",
    gradient: "from-yellow-600 via-amber-500 to-orange-600",
    path: "services/govts-bond-&-fd",
  },
];


interface ResearchReport {
  id: number;
  title: string;
  stock: string;
  company: string;
  author: string;
  authorFirm: string;
  date: string;
  sector: string;
  reportType: string;
  rating: string;
  targetPrice: string;
  currentPrice: string;
  upside: string;
  pages: number;
  views: number;
  recommendation: string;
  tags: string[];
  summary: string;
  pdfUrl: string;
}

const researchData: ResearchReport[] = [
  {
    id: 1,
    title: "Q3 FY24 Results Analysis: IT Sector Outlook",
    stock: "TCS",
    company: "Tata Consultancy Services",
    author: "Rahul Sharma",
    authorFirm: "Kotak Securities",
    date: "2024-01-28",
    sector: "Information Technology",
    reportType: "Quarterly Results",
    rating: "BUY",
    targetPrice: "₹4,200",
    currentPrice: "₹3,850",
    upside: "+9.1%",
    pages: 24,
    views: 1250,
    recommendation: "Strong Buy",
    tags: ["Q3 Results", "IT Services", "Large Cap"],
    summary: "Strong Q3 performance with robust deal wins and margin expansion",
    pdfUrl:
      "https://www.infomerics.com/admin/uploads/IT-industry-outlook-aug23.pdf",
  },
  {
    id: 2,
    title: "Banking Sector Deep Dive: NPA Trends & Credit Growth",
    stock: "HDFCBANK",
    company: "HDFC Bank Limited",
    author: "Priya Patel",
    authorFirm: "ICICI Securities",
    date: "2024-01-25",
    sector: "Banking & Financial Services",
    reportType: "Sector Analysis",
    rating: "BUY",
    targetPrice: "₹1,750",
    currentPrice: "₹1,612",
    upside: "+8.6%",
    pages: 36,
    views: 2100,
    recommendation: "Buy",
    tags: ["Banking", "NPA Analysis", "Credit Growth"],
    summary: "Improving asset quality and strong credit growth trajectory",
    pdfUrl: "/reports/hdfc-banking-analysis.pdf",
  },
  {
    id: 3,
    title: "Pharma Outlook 2024: Generic vs Specialty Focus",
    stock: "SUNPHARMA",
    company: "Sun Pharmaceutical Industries",
    author: "Dr. Amit Kumar",
    authorFirm: "Motilal Oswal",
    date: "2024-01-22",
    sector: "Pharmaceuticals",
    reportType: "Industry Report",
    rating: "HOLD",
    targetPrice: "₹1,100",
    currentPrice: "₹1,085",
    upside: "+1.4%",
    pages: 42,
    views: 890,
    recommendation: "Hold",
    tags: ["Pharma", "Generic Drugs", "US Market"],
    summary: "Mixed outlook with regulatory challenges offset by new launches",
    pdfUrl: "/reports/sunpharma-outlook-2024.pdf",
  },
  {
    id: 4,
    title: "Auto Sector Recovery: EV Transition Impact",
    stock: "MARUTI",
    company: "Maruti Suzuki India Limited",
    author: "Vikash Singh",
    authorFirm: "Axis Securities",
    date: "2024-01-20",
    sector: "Automobile",
    reportType: "Thematic Report",
    rating: "BUY",
    targetPrice: "₹11,500",
    currentPrice: "₹10,245",
    upside: "+12.3%",
    pages: 28,
    views: 1580,
    recommendation: "Strong Buy",
    tags: ["Auto", "EV Transition", "Market Leader"],
    summary:
      "Strong recovery in demand with successful EV strategy implementation",
    pdfUrl: "/reports/maruti-ev-transition.pdf",
  },
  {
    id: 5,
    title: "FMCG Inflation Impact: Margin Pressure Analysis",
    stock: "HINDUNILVR",
    company: "Hindustan Unilever Limited",
    author: "Sneha Agarwal",
    authorFirm: "HDFC Securities",
    date: "2024-01-18",
    sector: "FMCG",
    reportType: "Company Analysis",
    rating: "HOLD",
    targetPrice: "₹2,650",
    currentPrice: "₹2,720",
    upside: "-2.6%",
    pages: 32,
    views: 950,
    recommendation: "Hold",
    tags: ["FMCG", "Inflation", "Consumer Goods"],
    summary:
      "Managing inflation pressures through strategic pricing and cost optimization",
    pdfUrl: "/reports/hul-inflation-analysis.pdf",
  },
  {
    id: 6,
    title: "Metal Sector Cyclical Upturn: Commodity Supercycle",
    stock: "TATASTEEL",
    company: "Tata Steel Limited",
    author: "Rajesh Gupta",
    authorFirm: "Edelweiss Securities",
    date: "2024-01-15",
    sector: "Metals & Mining",
    reportType: "Sector Analysis",
    rating: "BUY",
    targetPrice: "₹145",
    currentPrice: "₹128",
    upside: "+13.3%",
    pages: 38,
    views: 1340,
    recommendation: "Buy",
    tags: ["Metals", "Commodity Cycle", "Steel"],
    summary:
      "Benefiting from infrastructure push and global steel demand recovery",
    pdfUrl: "/reports/tata-steel-commodity.pdf",
  },
  {
    id: 7,
    title: "Renewable Energy Theme: Solar Power Growth",
    stock: "ADANIGREEN",
    company: "Adani Green Energy Limited",
    author: "Manish Jain",
    authorFirm: "JM Financial",
    date: "2024-01-12",
    sector: "Power & Energy",
    reportType: "Thematic Report",
    rating: "BUY",
    targetPrice: "₹1,950",
    currentPrice: "₹1,785",
    upside: "+9.2%",
    pages: 45,
    views: 2250,
    recommendation: "Strong Buy",
    tags: ["Renewable Energy", "Solar", "Green Power"],
    summary:
      "Leading renewable energy portfolio with strong execution track record",
    pdfUrl: "/reports/adani-green-solar.pdf",
  },
  {
    id: 8,
    title: "Telecom Sector 5G Monetization Strategy",
    stock: "BHARTIARTL",
    company: "Bharti Airtel Limited",
    author: "Deepak Sharma",
    authorFirm: "Nomura Securities",
    date: "2024-01-10",
    sector: "Telecommunications",
    reportType: "Industry Report",
    rating: "BUY",
    targetPrice: "₹950",
    currentPrice: "₹865",
    upside: "+9.8%",
    pages: 35,
    views: 1120,
    recommendation: "Buy",
    tags: ["Telecom", "5G", "ARPU Growth"],
    summary: "5G rollout accelerating with strong ARPU improvement potential",
    pdfUrl: "/reports/bharti-5g-strategy.pdf",
  },
];

const ResearchReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedReportType, setSelectedReportType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(15);

  // Get unique values for filters
  const sectors = [...new Set(researchData.map((report) => report.sector))];
  const authors = [...new Set(researchData.map((report) => report.author))];
  const reportTypes = [
    ...new Set(researchData.map((report) => report.reportType)),
  ];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = researchData.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.stock.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector =
        selectedSector === "all" || report.sector === selectedSector;
      const matchesAuthor =
        selectedAuthor === "all" || report.author === selectedAuthor;
      const matchesType =
        selectedReportType === "all" ||
        report.reportType === selectedReportType;

      let matchesDate = true;
      if (dateRange !== "all") {
        const reportDate = new Date(report.date);
        const today = new Date();
        const daysAgo = parseInt(dateRange);
        const cutoffDate = new Date(
          today.getTime() - daysAgo * 24 * 60 * 60 * 1000
        );
        matchesDate = reportDate >= cutoffDate;
      }

      return (
        matchesSearch &&
        matchesSector &&
        matchesAuthor &&
        matchesType &&
        matchesDate
      );
    });

    // Sort data
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "stock":
          comparison = a.stock.localeCompare(b.stock);
          break;
        case "author":
          comparison = a.author.localeCompare(b.author);
          break;
        case "views":
          comparison = a.views - b.views;
          break;
        case "upside":
          comparison = parseFloat(a.upside) - parseFloat(b.upside);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [
    searchTerm,
    selectedSector,
    selectedAuthor,
    selectedReportType,
    dateRange,
    sortBy,
    sortOrder,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRatingColor = (rating: string): string => {
    switch (rating) {
      case "BUY":
        return "text-green-600 bg-green-50";
      case "HOLD":
        return "text-yellow-600 bg-yellow-50";
      case "SELL":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getUpsideColor = (upside: string): string => {
    const value = parseFloat(upside);
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Share Button Component
  interface ShareButtonProps {
    title: string;
    pdfUrl: string;
  }

  const ShareButton: React.FC<ShareButtonProps> = ({ title, pdfUrl }) => {
    const [isSharing, setIsSharing] = useState<boolean>(false);

    const handleShare = async (): Promise<void> => {
      if (isSharing) return;

      setIsSharing(true);

      try {
        // Create the full URL for sharing only when button is clicked
        const fullUrl = pdfUrl.startsWith("http")
          ? pdfUrl
          : `${window.location.origin}${pdfUrl}`;

        // Check if Web Share API is available
        if (navigator.share) {
          await navigator.share({
            title: title,
            text: `Check out this research report: ${title}`,
            url: fullUrl,
          });
        } else {
          // Fallback: Copy to clipboard
          await navigator.clipboard.writeText(fullUrl);
          alert("PDF link copied to clipboard!");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Share failed:", error);

        // Final fallback: show the URL in an alert
        const fullUrl = pdfUrl.startsWith("http")
          ? pdfUrl
          : `${window.location.origin}${pdfUrl}`;

        // Use a more user-friendly message
        const fallbackMessage = `Unable to share automatically. Here's the link you can copy:\n\n${fullUrl}`;
        alert(fallbackMessage);
      } finally {
        setIsSharing(false);
      }
    };

    return (
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isSharing
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-400 hover:text-green-600 hover:bg-green-50"
        }`}
        title="Share PDF"
      >
        <FaShare className="text-xs" />
      </button>
    );
  };

  // Download Button Component
  //   interface DownloadButtonProps {
  //     title: string;
  //     pdfUrl: string;
  //     stock: string;
  //   }

  //   const DownloadButton: React.FC<DownloadButtonProps> = ({ title, pdfUrl, stock }) => {
  //     const [isDownloading, setIsDownloading] = useState<boolean>(false);

  //     const handleDownload = async (): Promise<void> => {
  //       if (isDownloading) return;

  //       setIsDownloading(true);

  //       try {
  //         // Generate a clean filename
  //         const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
  //         const filename = `${stock}_${cleanTitle}.pdf`;

  //         if (pdfUrl.startsWith('http')) {
  //           // For external URLs, create a download link
  //           const link = document.createElement('a');
  //           link.href = pdfUrl;
  //           link.download = filename;
  //           link.target = '_blank';
  //           link.rel = 'noopener noreferrer';
  //           document.body.appendChild(link);
  //           link.click();
  //           document.body.removeChild(link);
  //         } else {
  //           // For local URLs, try to fetch and download
  //           const response = await fetch(pdfUrl);
  //           if (!response.ok) throw new Error('Download failed');

  //           const blob = await response.blob();
  //           const url = window.URL.createObjectURL(blob);
  //           const link = document.createElement('a');
  //           link.href = url;
  //           link.download = filename;
  //           document.body.appendChild(link);
  //           link.click();
  //           document.body.removeChild(link);
  //           window.URL.revokeObjectURL(url);
  //         }
  //       } catch (error) {
  //         console.error('Download failed:', error);
  //         // Fallback: open in new tab
  //         window.open(pdfUrl, '_blank');
  //       } finally {
  //         setIsDownloading(false);
  //       }
  //     };

  //     return (
  //       <button
  //         onClick={handleDownload}
  //         disabled={isDownloading}
  //         className={`p-2 rounded-lg transition-all duration-200 ${
  //           isDownloading
  //             ? 'text-gray-300 cursor-not-allowed'
  //             : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
  //         }`}
  //         title="Download PDF"
  //       >
  //         <FaDownload className="text-xs" />
  //       </button>
  //     );
  //   };

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
        <section className="relative w-full h-screen overflow-hidden">
          {/* Swiper will control background image and content */}
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  {/* <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                /> */}
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}/80`}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white max-w-xl"
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="uppercase tracking-widest text-sm text-yellow-200 font-semibold mb-2"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    <Link href={slide.path}>
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center gap-3"
                      >
                        Know More
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Pagination is now styled */}
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background Elements */}
        {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div> */}

        <div className="relative z-10">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm ">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Research Reports
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Comprehensive financial analysis and investment research
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-100 px-4 py-2 rounded-lg">
                    <span className="text-green-700 font-semibold">
                      {filteredAndSortedData.length} Reports Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Search */}
                <div className="relative min-w-64 text-black">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports, stocks, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>

                {/* Sector Filter */}
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-black"
                >
                  <option value="all">All Sectors</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>

                {/* Author Filter */}
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-black"
                >
                  <option value="all">All Authors</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>

                {/* Report Type Filter */}
                <select
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-black"
                >
                  <option value="all">All Types</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {/* Date Range Filter */}
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-black"
                >
                  <option value="all">All Time</option>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 3 Months</option>
                  <option value="365">Last Year</option>
                </select>

                {/* Sort Options */}
                <div className="flex items-center gap-2 text-black">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="stock">Sort by Stock</option>
                    <option value="author">Sort by Author</option>
                    <option value="views">Sort by Views</option>
                    <option value="upside">Sort by Upside</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {sortOrder === "asc" ? (
                      <FaSortAmountUp />
                    ) : (
                      <FaSortAmountDown />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Report Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Stock/Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Rating & Target
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Performance
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentData.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        {/* Report Details */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                              {report.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                {report.reportType}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
                                {report.sector}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <FaFilePdf className="text-red-500" />
                                {report.pages} pages
                              </span>
                              <span className="flex items-center gap-1">
                                <FaEye />
                                {report.views.toLocaleString()} views
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Stock/Company */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-bold text-blue-600 text-sm">
                              {report.stock}
                            </div>
                            <div className="text-xs text-gray-600 leading-tight">
                              {report.company}
                            </div>
                            <div className="text-xs text-gray-500">
                              {report.sector}
                            </div>
                          </div>
                        </td>

                        {/* Author */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <FaUser className="text-white text-xs" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">
                                {report.author}
                              </div>
                              <div className="text-xs text-gray-500">
                                {report.authorFirm}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCalendarAlt className="text-gray-400 text-xs" />
                            {formatDate(report.date)}
                          </div>
                        </td>

                        {/* Rating & Target */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${getRatingColor(
                                report.rating
                              )}`}
                            >
                              {report.rating}
                            </span>
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">
                                Target: {report.targetPrice}
                              </div>
                              <div className="text-xs text-gray-600">
                                Current: {report.currentPrice}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Performance */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {parseFloat(report.upside) > 0 ? (
                              <FaArrowUp className="text-green-500" />
                            ) : (
                              <FaArrowDown className="text-red-500" />
                            )}
                            <span
                              className={`font-bold text-sm ${getUpsideColor(
                                report.upside
                              )}`}
                            >
                              {report.upside}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {report.recommendation}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {/* View PDF */}
                            <a
                              href={report.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium transition-all duration-200 group/btn"
                            >
                              <FaFilePdf className="group-hover/btn:scale-110 transition-transform" />
                              View PDF
                            </a>

                            {/* Download PDF */}
                            {/* <DownloadButton 
                            title={report.title} 
                            pdfUrl={report.pdfUrl} 
                            stock={report.stock}
                          /> */}

                            {/* Share PDF */}
                            <ShareButton
                              title={report.title}
                              pdfUrl={report.pdfUrl}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredAndSortedData.length
                      )}{" "}
                      of {filteredAndSortedData.length} reports
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Previous
                      </button>
                      <div className="flex gap-1">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                                page === currentPage
                                  ? "bg-blue-600 text-white"
                                  : "hover:bg-gray-100 text-gray-600"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Empty State */}
            {currentData.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaFilePdf className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Reports Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSector("all");
                    setSelectedAuthor("all");
                    setSelectedReportType("all");
                    setDateRange("all");
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchReportsPage;
