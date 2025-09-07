// app/(routes)/news/ClientNewsPage.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaClock,
  FaUser,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaGlobe,
  FaNewspaper,
  FaChartLine,
  FaRupeeSign,
  FaEnvelope,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
export interface Newsletter {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  author?: string;
  publishDate: string;
}

// --- Main Component ---
interface ClientNewsPageProps {
  initialNews: Newsletter[]; // Accept initial news data
}

const ClientNewsPage = ({ initialNews }: ClientNewsPageProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("news-buzz");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const itemsPerPage = 9;

  // --- API & Data States ---
  const [newsByTab, setNewsByTab] = useState<Record<string, Newsletter[]>>({
    "news-buzz": initialNews,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
  const [newsletterLoading, setNewsletterLoading] = useState(true);

  // --- API Fetching Effect for Newsletter ---
  useEffect(() => {
    const fetchNewsletter = async () => {
      setNewsletterLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Newsletter API Error (${response.status}):`,
            errorText
          );
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNewsletter(data.newsletter || []);
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
      } finally {
        setNewsletterLoading(false);
      }
    };

    fetchNewsletter();
  }, []);

  // --- Handler Functions ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const handleNewsletterClick = (id: string) => {
    router.push(`/newsletter/${id}`);
  };
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-28">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-lg">
              <FaEnvelope className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-700 mb-4">
            Our Newsletters
          </h1>
          <p className="text-lg text-emerald-700">
            Stay updated with the latest insights, market trends, and stories.
          </p>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
          {newsletterLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : newsletter && newsletter.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsletter.slice(0, 6).map((item) => (
                <motion.div
                  key={item?.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100 cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleNewsletterClick(item?.id)}
                >
                  {/* Image Section */}
                  <div className="relative h-40 w-full">
                    {item?.image ? (
                      <Image
                        src={item.image}
                        alt={item.title || "Newsletter"}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <FaNewspaper className="text-white/30 w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col">
                    <h3 className="font-bold text-emerald-900 text-lg line-clamp-2">
                      {item?.title || "Untitled"}
                    </h3>
                    {item?.description && (
                      <p className="text-emerald-700 text-sm mt-2 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-emerald-600 text-xs mt-3">
                      {item?.publishDate
                        ? formatDate(item.publishDate)
                        : "Unknown Date"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-200 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaNewspaper className="text-3xl text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                No Newsletters Found
              </h3>
              <p className="text-emerald-600">
                Check back later for fresh content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientNewsPage;
