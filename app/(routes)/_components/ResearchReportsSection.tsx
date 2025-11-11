"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TbReportSearch } from "react-icons/tb";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa"; // Added spinner for submission state

type Report = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
};
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const ResearchReportsSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true); // New state for loading
  const router = useRouter();

  // Handle email subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: "Please enter your email address", type: "error" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage({
          text: data.message || "Successfully subscribed!",
          type: "success",
        });
        setEmail("");
      } else {
        setMessage({
          text: data.error || "Subscription failed",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Subscription failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoadingReports(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reports?limit=3`
        );
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        // Optionally set an error message if fetching fails entirely
      } finally {
        setIsLoadingReports(false);
      }
    };

    fetchReports();
  }, []);

  // Subcomponent for individual report card for clarity
  const ReportCard = ({ report }: { report: Report }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={report.id}
      className="border border-emerald-200 p-5 bg-emerald-50 rounded-xl shadow-md flex flex-col h-full cursor-pointer transition-shadow hover:shadow-lg"
      onClick={() => router.push(`/reports/${report.id}`)}
    >
      <div className="flex-grow">
          {/* <div className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 inline-block mb-2 rounded-full">
            {report.category}
          </div> */}
          <h3 className="text-lg font-semibold text-emerald-900 mb-2 leading-snug">
            {report.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {report.description}
          </p>
      </div>
      
      <div className="mt-auto pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-700">
          <div className="font-medium">
            Published: {formatDate(report.date)}
          </div>
          <Link
            href={`/reports/${report.id}`}
            onClick={(e) => e.stopPropagation()} // Prevent card click from firing link twice
            className="text-emerald-600 hover:text-teal-600 font-semibold transition-colors flex items-center gap-1 group"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </Link>
      </div>
    </motion.div>
  );

  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-4 sm:p-5 md:p-6 rounded-3xl mb-4 shadow-2xl">
            <TbReportSearch className="text-white text-3xl sm:text-4xl md:text-5xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Exclusive Research Reports
          </h2>
          <p className="mt-4 text-lg text-emerald-800">
            Get market-moving insights, analysis, and deep dives from our experts.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h3 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-8 text-left">
          Latest Publications
        </h3>

        {/* --- Report Cards Section (The main fix is here) --- */}
        {isLoadingReports ? (
            // Loading State
            <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                 <p className="mt-2 text-emerald-600">Loading latest reports...</p>
            </div>
        ) : reports.length === 0 ? (
             // No Reports State
             <div className="text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                No recent reports available at this time.
            </div>
        ) : (
            // Reports Grid (Responsive Grid Structure)
            <div className="grid grid-cols-1 gap-6 
                          md:grid-cols-2 
                          lg:grid-cols-3 mb-10">
              {/* Use slice(0, 3) here to ensure only the first 3 reports are mapped */}
              {reports.slice(0, 3).map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
        )}
        
        <div className="text-center pt-4 border-t border-gray-100">
          <Link
            href="/reports"
            className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base uppercase tracking-wide rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Reports
          </Link>
        </div>

        {/* --- Subscription Form --- */}
        <div className="mt-16 p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-inner border border-emerald-100">
          <h3 className="text-2xl font-bold text-emerald-900 mb-3">
            Get Free Insights Directly to Your Inbox
          </h3>
          <p className="text-lg text-emerald-800 leading-relaxed mb-6">
            Subscribe to our newsletter for exclusive updates and financial insights.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 border border-emerald-300 rounded-full bg-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm transition-colors"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-wide rounded-full transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {message && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm font-medium px-4 py-2 rounded-lg ${
                message.type === "success"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchReportsSection;