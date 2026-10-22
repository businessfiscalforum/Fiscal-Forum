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
import CustomPricingTable from "../../_components/CustomPricingTable";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 px-3 sm:px-6 py-6 sm:py-16">
      <div className="w-full max-w-7xl mx-auto flex justify-center">
        <CustomPricingTable />
      </div>
    </div>
  );
}