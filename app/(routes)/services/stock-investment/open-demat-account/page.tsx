// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChartBar, FaCoins, FaFastForward, FaSpinner } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";

// --- TYPES ---
type Broker = {
  name: string;
  logo: string;
  link: string;
  brokerage: string[];
};

// --- DATA ---
const brokers: Broker[] = [
    {
    name: "Alice Blue",
    logo: "/alice-blue.png",
    link: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
    brokerage: [
      "• Equity Delivery: ₹0 (Zero)",
      "• Equity Intraday: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Equity Futures: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Equity Options: ₹20 per executed order",
      "• Currency Futures: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Currency Options: ₹20 per executed order or 2.5% (whichever is lower)",
      "• MCX Commodity: ₹20 per executed order or 0.05% (whichever is lower)",
    ],
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    link: " https://a.aonelink.in/ANGOne/6pTAS0u ",
    brokerage: [
      "• Equity Delivery: ₹0 (Zero)",
      "• Equity Intraday: ₹20 or 0.03% (whichever is lower) per executed order",
      "• Equity Futures: ₹20 per executed order",
      "• Equity Options: ₹20 per executed order (lot)",
      "• Currency Derivatives: ₹20 per executed order",
      "• Commodity: ₹20 per executed order",
    ],
  },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/open-free-demat-account?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
    brokerage: [
      "• Equity Delivery: 0.20% of transaction value",
      "• Equity Intraday: 0.02% of transaction value",
      "• Equity Futures: 0.02% of transaction value",
      "• Equity Options: ₹10 per lot",
      "• Currency Futures: 0.02% of transaction value",
      "• Currency Options: ₹10 per lot",
      "• Commodity: ₹10 per executed order",
    ],
  },
  {
    name: "Motilal Oswal",
    logo: "/motilal-oswal.png",
    link: " https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
    brokerage: [
      "• Equity Delivery: 0.20% of transaction value",
      "• Equity Intraday: 0.02% of transaction value",
      "• Equity Futures: 0.02% of transaction value",
      "• Equity Options: ₹20 per executed order (lot)",
      "• Currency: 0.02% of transaction value",
      "• Commodity: ₹100 per executed order or 0.01% (whichever is lower)",
    ],
  },
  {
    name: "Upstox",
    logo: "/upstox.png",
    link: " https://upstox.com/open-account/?f=4ZAVSY",
    brokerage: [
      "• Upstox offers two plans:",
      "  1. ₹20 per order (default):",
      "    • Equity, F&O, Currency: ₹20 per executed order",
      "    • Commodity: ₹20 per executed order",
      "  2. Zero Brokerage Plan (₹500/month + 18% GST):",
      "    • Equity Delivery: ₹0 (Zero)",
      "    • Equity Intraday, F&O, Currency: ₹0 (Zero)",
      "    • Commodity: ₹0 (Zero)",
    ],
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: " https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814v",
    brokerage: [
      "• Equity Delivery: ₹0 (Zero)",
      "• Equity Intraday: ₹15 per executed order or 0.025% (whichever is lower)",
      "• Equity Futures: ₹15 per executed order or 0.025% (whichever is lower)",
      "• Equity Options: ₹15 per executed order or 0.05% (whichever is lower)",
      "• Currency & Commodity: ₹15 per executed order or 0.025% (whichever is lower)",
    ],
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: " https://fundzbazar.com/Link/jRkmixvcvvw ",
    brokerage: [
      "• Equity Delivery: 0.30% of transaction value",
      "• Equity Intraday: 0.03% of transaction value",
      "• Equity Futures: 0.03% of transaction value",
      "• Equity Options: ₹15 per lot",
      "• Currency: 0.03% of transaction value",
      "• Commodity: ₹15 per executed order",
    ],
  },
];

// --- SUB-COMPONENTS ---
const BrokerCard = ({ broker }: { broker: Broker }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-green-200 overflow-hidden">
      {/* Top Section */}
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-4 flex items-center justify-center bg-green-50 rounded-full">
          <Image
            src={broker.logo}
            alt={`${broker.name} logo`}
            width={80}
            height={80}
            className="max-h-full max-w-full object-contain p-2"
          />
        </div>
        <h2 className="text-xl font-semibold text-green-800">{broker.name}</h2>
      </div>

      {/* Brokerage Details (Collapsible) */}
      {isExpanded && (
        <div className="px-6 pb-4 text-left bg-white">
          <h3 className="font-bold text-green-800 mb-2">Brokerage:</h3>
          <ul className="space-y-1">
            {broker.brokerage.map((detail, index) => (
              <li key={index} className="text-xs text-green-900 leading-relaxed">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer & Actions */}
      <div className="mt-auto p-4 bg-gray-50 border-t border-green-100 flex flex-col space-y-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-sm text-green-700 font-semibold flex items-center justify-center hover:text-green-900 transition-colors"
        >
          {isExpanded ? "Hide" : "View Brokerage"}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          )}
        </button>
        <Link
          href={broker.link}
          target="_blank"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center"
        >
          Open Account
        </Link>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);

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
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
      } else {
        setMessage({ text: data.error || "Subscription failed", type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "Subscription failed. Please sign-in to subscribe.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-25 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
            Open Your Demat Account & Unlock Exclusive Rewards
          </h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Join thousands of smart investors getting{" "}
            <span className="font-semibold text-green-900">
              free research reports, trading tips, and portfolio insights
            </span>{" "}
            when they open their account through us.
          </p>
        </div>

        {/* Rewards Banner */}
        <div className="bg-green-600 text-white rounded-xl p-6 mb-12 text-center shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">🎁 Limited Time Offer</h3>
          <p className="text-lg">
            Get <span className="font-bold">3 months of premium market research</span> &{" "}
            <span className="font-bold">₹500 worth of investment strategies</span> FREE
          </p>
        </div>

        {/* Benefits */}
        <section className="bg-white border border-green-200 rounded-xl shadow-md p-8 mb-16">
          <h3 className="text-2xl font-bold text-green-800 text-center mb-8">
            Why Open With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaChartBar />
              </div>
              <h4 className="font-semibold text-green-800 mb-2">
                Expert Research Reports
              </h4>
              <p className="text-green-700 text-sm">
                Stay ahead with daily market updates & in-depth analysis.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaCoins />
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Higher Returns</h4>
              <p className="text-green-700 text-sm">
                Access exclusive investment strategies tailored for growth.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaFastForward />
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Fast Onboarding</h4>
              <p className="text-green-700 text-sm">
                Open and start trading within just 15 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Brokers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {brokers.map((broker) => (
            <BrokerCard key={broker.name} broker={broker} />
          ))}
        </div>

        {/* <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center">
              <h4 className="text-3xl font-bold text-green-800 mb-4">
                Interested in Opening an Account?
              </h4>
              <p className="text-lg text-green-700 mb-8">
                Fill out the quick form to get started with your Demat account opening process.
              </p>
              <button
                onClick={() => router.push("/services/stock-investment/application")}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold rounded-lg transition"
              >
                Fill the Form →
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <h4 className="text-3xl font-bold text-green-800 mb-4">
                  Not Interested?
                </h4>
                <p className="text-lg text-green-800">
                  Stay ahead with expert-curated market reports, pre-market updates, and IPO alerts — straight to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:opacity-70 text-white font-bold rounded-lg transition flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </form>

              {message && (
                <div
                  className={`mt-4 text-sm px-4 py-3 rounded-lg text-center ${
                    message.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Unsubscribe anytime. Your data is secure with us.
              </p>
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
}