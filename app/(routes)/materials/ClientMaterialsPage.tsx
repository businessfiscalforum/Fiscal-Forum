// app/(routes)/materials/ClientMaterialsPage.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import {
  FaBook,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export interface Materials {
  id: string;
  title: string;
  link?: string;
}

// --- Main Component ---
interface ClientMaterialsPageProps {
  initialMaterials: Materials[]; // Accept initial materials data
}

const ClientMaterialsPage = ({
  initialMaterials,
}: ClientMaterialsPageProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [materialsLoading, setMaterialsLoading] = useState(true);

  // --- API Fetching Effect for Materials ---
  useEffect(() => {
    const fetchMaterials = async () => {
      setMaterialsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/materials`
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Materials API Error (${response.status}):`, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMaterials(data.materials || []);
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      } finally {
        setMaterialsLoading(false);
      }
    };

    fetchMaterials();
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

  const handleMaterialClick = (id: string) => {
    router.push(`/materials/${id}`);
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
              <FaBook className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-700 mb-4">
            Our Materials
          </h1>
          <p className="text-lg text-emerald-700">
            Access valuable resources, guides, and content.
          </p>
        </div>

        {/* Materials Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
          {materialsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : materials && materials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {materials.map((item) => (
                <motion.div
                  key={item?.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100 cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => handleMaterialClick(item?.id)}
                >
                  {/* Image Section */}
                  <div className="relative h-40 w-full">
                    {item?.link ? (
                      <iframe
                        src={item.link}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <FaBook className="text-white/30 w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col">
                    <h3 className="font-bold text-emerald-900 text-lg line-clamp-2">
                      {item?.title || "Untitled"}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-200 to-teal-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-3xl text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                No Materials Found
              </h3>
              <p className="text-emerald-600">
                Check back later for new resources.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientMaterialsPage;
