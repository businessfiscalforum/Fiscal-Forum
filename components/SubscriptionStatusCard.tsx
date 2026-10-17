"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Calendar, ArrowRight, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface SubscriptionItem {
  id: string;
  planId: string;
  accessScope: "PRE_MARKET" | "WEEKLY" | "COMBINATION";
  durationMonths: number;
  startDate: string;
  expiryDate: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  amount: number;
}

interface SubscriptionStatusData {
  success: boolean;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  canAccessPreMarket?: boolean;
  canAccessWeekly?: boolean;
  activeSubscriptions?: SubscriptionItem[];
  history?: SubscriptionItem[];
}

export default function SubscriptionStatusCard() {
  const [data, setData] = useState<SubscriptionStatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscriptions/status")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error("Failed to load subscription status:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-black rounded-3xl p-6 shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    );
  }

  if (!data || !data.isAuthenticated) {
    return (
      <div className="bg-white border border-black rounded-3xl p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-black pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-black" />
            <h3 className="text-xl font-bold uppercase text-black">Research Subscriptions</h3>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-black px-2 py-1 rounded">
            SIGN IN REQUIRED
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 font-medium">
          Sign in to view your active Pre-Market and Weekly Market research subscriptions.
        </p>
        <Link
          href="/sign-in?redirect_url=/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors text-sm uppercase"
        >
          Sign In to Access
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const { isAdmin, canAccessPreMarket, canAccessWeekly, activeSubscriptions = [] } = data;

  return (
    <div className="bg-white border border-black rounded-3xl p-6 shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-black pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-black" />
          <h3 className="text-xl font-bold uppercase text-black">Research Subscriptions</h3>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded border border-black ${
            isAdmin || (canAccessPreMarket && canAccessWeekly)
              ? "bg-emerald-100 text-emerald-800"
              : canAccessPreMarket || canAccessWeekly
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {isAdmin
            ? "ADMIN ACCESS"
            : canAccessPreMarket && canAccessWeekly
            ? "FULL ACCESS"
            : canAccessPreMarket || canAccessWeekly
            ? "PARTIAL ACCESS"
            : "NO ACTIVE PLANS"}
        </span>
      </div>

      {isAdmin && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-700 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold text-emerald-900">Verified Administrator Privilege</p>
            <p className="text-xs text-emerald-700 mt-0.5">
              You have full, unrestricted streaming access to all Pre-Market and Weekly Market research reports.
            </p>
          </div>
        </div>
      )}

      {/* Scope Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pre-Market Card */}
        <div className="p-4 border border-black rounded-2xl bg-[#F4FBF7]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Pre-Market Reports
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border border-black ${
                canAccessPreMarket
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {canAccessPreMarket ? "SUBSCRIBED" : "INACTIVE"}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            {canAccessPreMarket
              ? "Access granted to all daily pre-market intelligence."
              : "Subscription required for daily pre-market intelligence."}
          </p>
        </div>

        {/* Weekly Market Card */}
        <div className="p-4 border border-black rounded-2xl bg-[#F4FBF7]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Weekly Reports
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border border-black ${
                canAccessWeekly
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {canAccessWeekly ? "SUBSCRIBED" : "INACTIVE"}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            {canAccessWeekly
              ? "Access granted to all weekend in-depth research reports."
              : "Subscription required for weekly market reviews."}
          </p>
        </div>
      </div>

      {/* Active Subscriptions List */}
      {activeSubscriptions.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Active Subscription Details
          </p>
          {activeSubscriptions.map((sub) => (
            <div
              key={sub.id}
              className="p-3.5 border border-black rounded-xl bg-gray-50 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-sm text-black">
                  {sub.accessScope === "COMBINATION"
                    ? "Pre-Market + Weekly Reports"
                    : sub.accessScope === "PRE_MARKET"
                    ? "Pre-Market Reports"
                    : "Weekly Market Reports"}{" "}
                  ({sub.durationMonths} Months)
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    Valid until: {format(new Date(sub.expiryDate), "dd MMM yyyy")}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  ACTIVE
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Renew / Subscribe CTA */}
      <div className="pt-2">
        <Link
          href="/reports/join"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#14432A] text-white font-bold rounded-xl hover:bg-[#0f3320] transition-colors text-sm uppercase shadow-sm"
        >
          {canAccessPreMarket && canAccessWeekly ? "Extend / Renew Subscription" : "Explore Subscription Plans"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
