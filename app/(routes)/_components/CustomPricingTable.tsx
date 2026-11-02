"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Calendar, Zap } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type PlanDuration = 1 | 3 | 6;

interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    description?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (res: RazorpayFailureResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const PLAN_DATA = [
  {
    id: "pre_market",
    title: "Pre-Market Reports",
    tagline: "Your morning edge before market open",
    scopeBadge: "Pre-Market Only",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    features: [
      "Daily pre-market intelligence",
      "Macro & global cues analysis",
      "Sectoral focus & key levels",
      "Actionable opening watchlist",
      "Exclusive subscriber PDF access",
    ],
    prices: {
      1: { price: 21, perMonth: 21 },
      3: { price: 41, perMonth: 41 },
      6: { price: 51, perMonth: 51 },
    },
    popular: false,
  },
  {
    id: "combination",
    title: "Pre-Market + Weekly",
    tagline: "Complete market intelligence package",
    scopeBadge: "Best Value • Both Reports",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    features: [
      "All daily Pre-Market Reports",
      "All in-depth Weekly Market Reports",
      "Full macro, sectoral & equity coverage",
      "Weekend deep-dive institutional analysis",
      "Priority PDF download bandwidth",
    ],
    prices: {
      1: { price: 21, perMonth: 21 },
      3: { price: 41, perMonth: 41 },
      6: { price: 51, perMonth: 51 },
    },
    popular: true,
  },
  {
    id: "weekly",
    title: "Weekly Market Reports",
    tagline: "Comprehensive Friday closing review",
    scopeBadge: "Weekly Only",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    features: [
      "Full week market post-mortem",
      "Institutional flows (FII/DII) breakdown",
      "Major corporate actions & earnings",
      "Next week preview & key catalysts",
      "Exclusive subscriber PDF access",
    ],
    prices: {
      1: { price: 21, perMonth: 21 },
      3: { price: 41, perMonth: 41 },
      6: { price: 51, perMonth: 51 },
    },
    popular: false,
  },
];

export default function CustomPricingTable() {
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>(3);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (planId: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent("/reports/join")}`);
      return;
    }

    setLoadingPlan(planId);

    try {
      // 1. Create subscription order on server
      const orderRes = await fetch("/api/subscriptions/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          durationMonths: selectedDuration,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to initiate subscription order.");
      }

      // 2. Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load payment gateway. Please check your internet connection.");
      }

      // 3. Launch Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: "INR",
        name: "Fiscal Forum",
        description: `${orderData.planTitle} (${orderData.durationMonths} Months)`,
        image: "/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: orderData.userName || user?.fullName || "",
          email: orderData.userEmail || user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#14432A", // Fiscal Forum forest green
        },
        modal: {
          ondismiss: () => {
            setLoadingPlan(null);
          },
        },
        handler: async function (response: RazorpayCheckoutResponse) {
          try {
            const verifyRes = await fetch("/api/subscriptions/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }

            setSuccessMessage("Your subscription is active! You now have instant access to research reports.");
            setLoadingPlan(null);

            const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
            const fromParam = searchParams?.get("from")?.toLowerCase();

            const resolvedPlanId = (verifyData?.subscription?.planId || planId || "").toLowerCase();
            const resolvedScope = (verifyData?.subscription?.accessScope || "").toUpperCase();

            const targetRedirect =
              resolvedPlanId === "weekly" || resolvedScope === "WEEKLY" || fromParam === "weekly"
                ? "/reports/weekly"
                : "/reports/pre-market";

            setTimeout(() => {
              router.push(targetRedirect);
            }, 1800);
          } catch (verifyErr: unknown) {
            const msg = verifyErr instanceof Error ? verifyErr.message : "Payment verification failed.";
            setErrorMessage(msg);
            setLoadingPlan(null);
          }
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK initialization failed.");
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: RazorpayFailureResponse) => {
        setErrorMessage(response.error.description || "Transaction cancelled.");
        setLoadingPlan(null);
      });

      rzp.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setLoadingPlan(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
          Subscription Plans
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-emerald-950 tracking-tight mb-3 sm:mb-4 px-2">
          Institutional-Grade Research Plans
        </h1>
        <p className="text-xs sm:text-base md:text-lg text-emerald-800 max-w-2xl mx-auto px-4 leading-relaxed">
          Choose your report access scope and subscription period. Subscriptions are manual renewals with zero hidden auto-debits.
        </p>

        {/* Duration Selector Tabs */}
        <div className="flex justify-center mt-6 sm:mt-8 px-2">
          <div className="inline-flex p-1 sm:p-1.5 bg-emerald-100/80 rounded-2xl border border-emerald-200 shadow-inner max-w-full overflow-x-auto">
            {([1, 3, 6] as PlanDuration[]).map((dur) => (
              <button
                key={dur}
                onClick={() => setSelectedDuration(dur)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
                  selectedDuration === dur
                    ? "bg-[#14432A] text-white shadow-md shadow-emerald-950/20"
                    : "text-emerald-900 hover:text-emerald-950 hover:bg-emerald-200/50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{dur} {dur === 1 ? "Month" : "Months"}</span>
                {dur === 3 && (
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-1 sm:px-1.5 py-0.5 rounded bg-emerald-400 text-emerald-950 font-black ml-0.5 sm:ml-1">
                    Popular
                  </span>
                )}
                {dur === 6 && (
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-1 sm:px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-black ml-0.5 sm:ml-1">
                    Save
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Status Messages */}
      {errorMessage && (
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs sm:text-sm font-medium text-center">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {PLAN_DATA.map((plan, idx) => {
          const pricing = plan.prices[selectedDuration];
          const isSelectedLoading = loadingPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`relative rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-white to-emerald-50/50 border-2 border-emerald-500 shadow-xl shadow-emerald-900/10 scale-100 md:-translate-y-2"
                  : "bg-white border border-emerald-100 shadow-lg shadow-gray-200/50 hover:border-emerald-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider py-1 px-3.5 sm:px-4 rounded-full shadow-md flex items-center gap-1.5 z-10 whitespace-nowrap">
                  <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Most Popular
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-3 sm:mb-4">
                  <span className={`inline-block text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg border mb-2.5 sm:mb-3 ${plan.badgeColor}`}>
                    {plan.scopeBadge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight">
                    {plan.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 mt-1 font-medium leading-snug">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="my-4 sm:my-6 pb-4 sm:pb-6 border-b border-emerald-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-950 tracking-tight">
                      ₹{pricing.price}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700">
                      / {selectedDuration} {selectedDuration === 1 ? "month" : "months"}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-1 sm:mt-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>₹{pricing.perMonth} / month effective • Manual renewal</span>
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Included Benefits:
                  </p>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isSelectedLoading || loadingPlan !== null}
                  className={`w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md ${
                    plan.popular
                      ? "bg-[#14432A] hover:bg-[#0e2f1d] text-white shadow-emerald-950/20 active:scale-[0.99] hover:scale-[1.02]"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.99] hover:scale-[1.02]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSelectedLoading ? "Preparing Secure Checkout..." : `Subscribe for ₹${pricing.price}`}
                </button>
                <p className="text-[10px] sm:text-[11px] text-center text-emerald-600 font-medium mt-2">
                  One-time payment • No auto-debit
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Security & Guarantee Footer */}
      <motion.div
        className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-emerald-800 text-[11px] sm:text-xs font-medium text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>256-bit encrypted payments via Razorpay</span>
        </div>
        <div className="hidden sm:block text-emerald-300">•</div>
        <div>Zero recurring surprise debits</div>
        <div className="hidden sm:block text-emerald-300">•</div>
        <div>Protected direct PDF streaming</div>
      </motion.div>
    </div>
  );
}
