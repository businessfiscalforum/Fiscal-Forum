"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function AllMutualFundsPage() {
  const router = useRouter();

  // Example Google Drive PDF preview link
  const pdfUrl = "https://drive.google.com/file/d/1LCXHivaO6PjFgWT8molff5I1v2uQJYtY/preview";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">
            All Mutual Funds
          </h1>
          <div className="w-16"></div>
        </motion.div>

        {/* PDF Viewer (Google Drive) */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-emerald-200 overflow-hidden h-[calc(100vh-220px)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            allow="autoplay"
          />
        </motion.div>
      </div>
    </div>
  );
}
