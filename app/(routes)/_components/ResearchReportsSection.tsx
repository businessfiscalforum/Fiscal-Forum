"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TbReportSearch } from "react-icons/tb";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

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
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const router = useRouter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: "Please enter your email address", type: "error" });
      return;
    }
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      setMessage({
        text: response.ok
          ? data.message || "Successfully subscribed!"
          : data.error || "Subscription failed",
        type: response.ok ? "success" : "error",
      });
      if (response.ok) setEmail("");
    } catch {
      setMessage({ text: "Subscription failed. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoadingReports(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports?limit=3`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setReports(data);
      } catch {
        // silent fallback
      } finally {
        setIsLoadingReports(false);
      }
    };
    fetchReports();
  }, []);

  const ReportCard = ({ report }: { report: Report }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      key={report.id}
      className="border border-emerald-200 p-4 sm:p-5 bg-emerald-50 rounded-xl shadow-md flex flex-col h-full cursor-pointer transition-shadow hover:shadow-lg"
      onClick={() => router.push(`/reports/${report.id}`)}
    >
      <div className="flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-emerald-900 mb-2 leading-snug">
          {report.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">
          {report.description}
        </p>
      </div>
      
      <div className="mt-auto pt-2 sm:pt-3 border-t border-emerald-100 flex items-center justify-between text-[10px] sm:text-xs text-emerald-700">
        <div className="font-medium">
          Published: {formatDate(report.date)}
        </div>
        <Link
          href={`/reports/${report.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-emerald-600 hover:text-teal-600 font-semibold flex items-center gap-1 group"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
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
    <section className="pt-8 pb-8 md:pt-8 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 md:mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-3 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl mb-3 md:mb-4 shadow-xl">
            <TbReportSearch className="text-white text-2xl sm:text-3xl md:text-4xl" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-3 md:mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Exclusive Research Reports
          </h2>
          <p className="mt-2 md:mt-4 text-sm md:text-base text-emerald-800">
            Get market-moving insights, analysis, and deep dives from our experts.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl border border-gray-100">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-900 mb-4 md:mb-8 text-left">
          Latest Publications
        </h3>

        {isLoadingReports ? (
          <div className="text-center py-6 md:py-10">
            <div className="inline-block h-6 w-6 md:h-8 md:w-8 animate-spin rounded-full border-3 md:border-4 border-emerald-500 border-t-transparent"></div>
            <p className="mt-2 text-xs md:text-sm text-emerald-600">Loading latest reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-6 md:py-10 text-gray-500 border border-dashed border-gray-300 rounded-lg">
            No recent reports available at this time.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {reports.slice(0, 4).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}

        <div className="text-center pt-3 md:pt-4 border-t border-gray-100">
          <Link
            href="/reports"
            className="inline-block px-5 py-2 md:px-8 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide rounded-full transition-all shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Reports
          </Link>
        </div>

        {/* Subscription Form — Compact on mobile */}
        <div className="mt-8 md:mt-16 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl md:rounded-2xl shadow-inner border border-emerald-100">
          <h3 className="text-xl md:text-2xl font-bold text-emerald-900 mb-2 md:mb-3">
            Get Free Insights Directly to Your Inbox
          </h3>
          <p className="text-sm md:text-base text-emerald-800 mb-4 md:mb-6">
            Subscribe to our newsletter for exclusive updates and financial insights.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-4 py-2.5 md:px-5 md:py-3 border border-emerald-300 rounded-full bg-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 md:px-8 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide rounded-full transition-all shadow-md disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin inline mr-1 md:mr-2 text-xs" />
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
              className={`mt-3 md:mt-4 text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-lg ${
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