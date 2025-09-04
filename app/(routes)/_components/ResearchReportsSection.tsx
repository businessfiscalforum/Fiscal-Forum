"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TbReportSearch } from "react-icons/tb";

type Report = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
};


const ResearchReportsSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
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
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports?limit=3`);
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <section className="py-16 px-6 md:px-10 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl mb-8 shadow-2xl">
            <TbReportSearch className="text-white text-4xl" />
          </div>
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Research Reports
          </h2>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Desktop: show reports */}
        <div className="hidden md:block mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4">Latest Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reports.map((report) => (
              <div key={report.id} className="border border-emerald-200 p-5 bg-emerald-50 rounded-xl shadow-sm" onClick={() => router.push(`/reports/${report.id}`)}>
                {/* <div className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 inline-block mb-2 rounded-full">
                  {report.category}
                </div> */}
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                <div className="text-emerald-700 text-xs font-medium">{report.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <button
            onClick={() => router.push("/reports")}
            className="px-5 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 font-semibold text-sm md:text-base uppercase tracking-wide rounded-full"
          >
            View All Reports
          </button>
        </div>

        <div className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-md border border-emerald-100">
          <h3 className="text-2xl font-bold text-emerald-900 mb-3">Stay Connected With Us</h3>
          <p className="text-lg text-emerald-800 leading-relaxed mb-6">
            Subscribe to our newsletter for exclusive updates and insights.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 border border-emerald-300 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm transition-colors"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-wide rounded-full transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 text-sm font-medium px-4 py-2 rounded-lg ${
                message.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchReportsSection;
