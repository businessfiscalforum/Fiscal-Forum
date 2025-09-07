// app/(routes)/reports/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Gift,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { PricingTable } from "@clerk/nextjs";

const plans = [
  {
    id: "3m",
    label: "For 3 Months",
    price: "₹395",
    original: null,
    discount: null,
    href: "/reports/join?plan=3m",
    icon: <Clock className="w-5 h-5" />,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "6m",
    label: "For 6 Months",
    price: "₹595",
    original: "₹790",
    discount: null,
    href: "/reports/join?plan=6m",
    icon: <Calendar className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "1y",
    label: "For 1 Year",
    price: "₹795",
    original: "₹1,590",
    discount: "50% OFF",
    href: "/reports/join?plan=1y",
    icon: <Gift className="w-5 h-5" />,
    color: "from-emerald-600 to-teal-700",
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 px-6 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <Sparkles className="w-10 h-10 text-emerald-600 mx-auto" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-900 leading-tight">
            How long do you need our report?
          </h1>
          <p className="text-base sm:text-lg text-emerald-700 max-w-md mx-auto">
            Choose the plan that fits you best. Save more with longer subscriptions!
          </p>
        </motion.div>

        <div className="flex justify-center">
          <PricingTable />
        </div>

      </div>
    </div>
  );
}