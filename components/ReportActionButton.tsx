"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface ReportActionButtonProps {
  reportId: string;
  reportTitle?: string | null;
  reportType?: string | null;
  className?: string;
  style?: React.CSSProperties;
  buttonText?: string;
  initiallyPurchased?: boolean;
}

export default function ReportActionButton({
  reportId,
  reportTitle: _reportTitle,
  reportType: _reportType,
  className = "clay-btn",
  style,
  buttonText = "View Report",
  initiallyPurchased = false,
}: ReportActionButtonProps) {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(initiallyPurchased);

  const handleAction = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // 1. If not logged in, redirect to Clerk sign-in
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent("/reports/join")}`);
      return;
    }

    // 2. If already entitled, open protected PDF directly
    if (hasAccess) {
      window.open(`/api/reports/${reportId}/pdf`, "_blank");
      return;
    }

    // 3. Check access from server
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/access`);
      if (res.ok) {
        const data = await res.json();
        if (data.hasAccess) {
          setHasAccess(true);
          setLoading(false);
          window.open(`/api/reports/${reportId}/pdf`, "_blank");
          return;
        }
      }

      // 4. Non-subscriber: route to subscription plans
      setLoading(false);
      const isWeekly =
        (_reportType || "").toLowerCase().includes("weekly") ||
        (typeof window !== "undefined" && window.location.pathname.includes("weekly"));
      router.push(isWeekly ? "/reports/join?from=weekly" : "/reports/join");
    } catch (err) {
      console.error("Access verification error:", err);
      setLoading(false);
      const isWeekly =
        (_reportType || "").toLowerCase().includes("weekly") ||
        (typeof window !== "undefined" && window.location.pathname.includes("weekly"));
      router.push(isWeekly ? "/reports/join?from=weekly" : "/reports/join");
    }
  };

  return (
    <button
      onClick={handleAction}
      className={className}
      style={style}
      disabled={loading}
    >
      {loading
        ? "Opening..."
        : hasAccess
        ? buttonText
        : "Subscribe to Access"}
    </button>
  );
}
