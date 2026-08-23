"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TbReportSearch } from "react-icons/tb";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

type Report = {
  id: string;
  title: string;
  summary: string | null;
  publishDate: string | null;
  reportType: string | null;
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
        "/api/subscribe",
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
        const res = await fetch("/api/reports?limit=3");
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
      className="border border-black p-5 bg-white rounded-2xl shadow-md  hover:-translate-y-0.5 hover:shadow-lg transition-all flex flex-col h-full cursor-pointer"
      onClick={() => router.push(`/reports/${report.id}`)}
    >
      <div className="flex-grow space-y-3">
        <span className="text-[9px] font-bold uppercase text-emerald-800 bg-emerald-100 border border-[#1FA463] px-2.5 py-0.5 rounded-full inline-block">
          {report.reportType || "Research"}
        </span>
        <h3 className="text-base font-bold text-black leading-snug">
          {report.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 font-semibold line-clamp-3">
          {report.summary || "No description available."}
        </p>
      </div>
      
      <div className="mt-6 pt-3 border-t border-black flex items-center justify-between text-[11px] font-bold text-gray-500">
        <div>
          {report.publishDate ? `Published: ${formatDate(report.publishDate)}` : ""}
        </div>
        <Link
          href={`/reports/${report.id}`}
          onClick={(e) => e.stopPropagation()}
          className="px-3.5 py-1.5 bg-[#1FA463] text-white border border-black rounded-lg text-xs font-bold hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0  transition-all flex items-center gap-1"
        >
          Read
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="currentColor"
            viewBox="0 0 16 16"
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
    <section className="py-12 bg-[#F4FBF7] border-b border-black">
      <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-[#1FA463]/10 border border-black rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <TbReportSearch className="text-black text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
            Exclusive Research Reports
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-2 max-w-md mx-auto">
            Get market-moving insights, analysis, and deep dives from our experts.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="bg-white border border-black p-6 md:p-8 rounded-3xl shadow-lg space-y-8">
          
          <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-tight text-left">
            Latest Publications
          </h3>

          {isLoadingReports ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#1FA463] border-t-transparent"></div>
              <p className="mt-2 text-xs font-bold text-[#1FA463]">Loading latest reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-10 text-gray-500 border-2 border-dashed border-black rounded-2xl">
              No recent reports available at this time.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.slice(0, 3).map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}

          <div className="text-center pt-6 border-t border-black flex justify-center">
            <Link
              href="/reports"
              className="inline-block px-8 py-3.5 bg-[#1FA463] text-white border border-black font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl shadow-md  hover:-translate-y-0.5 hover:shadow-md  active:translate-y-0 active:shadow-sm transition-all"
            >
              View All Reports
            </Link>
          </div>

          {/* Subscription Form */}
          <div className="mt-12 p-6 sm:p-8 bg-yellow-50 border border-black rounded-2xl shadow-md text-left space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-black uppercase tracking-tight">
              Get Free Insights Directly to Your Inbox
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">
              Subscribe to our newsletter for exclusive updates and financial insights.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 px-4 py-3 border border-black rounded-xl bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#1FA463] placeholder-gray-400"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#1FA463] text-white border border-black rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest shadow-sm hover:-translate-y-0.5 hover:shadow-sm transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin inline mr-2 text-xs" />
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
                className={`mt-4 text-xs font-bold px-4 py-2 border border-black rounded-xl ${
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
      </div>
    </section>
  );
};

export default ResearchReportsSection;