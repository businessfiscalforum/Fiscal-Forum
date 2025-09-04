// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaGift,
  FaHeadset,
  FaLightbulb,
  FaRupeeSign,
  FaWallet,
} from "react-icons/fa";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

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
      "• Equity Futures: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Equity Options: ₹20 per executed order",
      "• Currency Futures: ₹20 per executed order or 0.05% (whichever is lower)",
      "• Currency Options: ₹20 per executed order or 2.5% (whichever is lower)",
    ],
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    link: "https://a.aonelink.in/ANGOne/6pTAS0u",
    brokerage: [
      "• Equity Intraday: ₹20 or 0.03% (whichever is lower) per executed order",
      "• Equity Delivery: : ₹20 or 0.1% whichever is lower per executed order (minimum brokerage of INR 2 will be levied)",
      "• Futures, Options, Commodity, Currency: ₹20 per executed order",
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
    ],
  },
  {
    name: "Motilal Oswal",
    logo: "/motilal-oswal.png",
    link: "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
    brokerage: [
      "• Equity Delivery: 0.20% of transaction value",
      "• Equity Futures: 0.02% of transaction value",
      "• Equity Options: ₹20 per executed order (lot)",
    ],
  },
  {
    name: "Upstox",
    logo: "/upstox.png",
    link: "https://upstox.com/open-account/?f=4ZAVSY",
    brokerage: [
      "• ₹0 AMC*: Account Maintenance Charges (No account maintenance charges for the first year)",
      "• ₹20 Brokerage*: Maximum brokerage per order",
    ],
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814v",
    brokerage: [
      "• Equity Delivery: ₹0 (Zero)",
      "• Equity Intraday: ₹15 per executed order or 0.025% (whichever is lower)",
      "• Equity Futures: ₹15 per executed order or 0.025% (whichever is lower)",
      "• Equity Options: ₹15 per executed order or 0.05% (whichever is lower)",
    ],
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "https://fundzbazar.com/Link/jRkmixvcvvw",
    brokerage: [
      "• Equity Delivery: 0.30% of transaction value",
      "• Equity Intraday: 0.03% of transaction value",
      "• Equity Futures: 0.03% of transaction value",
      "• Equity Options: ₹15 per lot",
    ],
  },
  {
    name: "Unlisted Shares",
    logo: "/unlisted-shares.png",
    link: "/services/stock-investment/unlisted-shares/apply",
    brokerage: [
      "",
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
              <li
                key={index}
                className="text-xs text-green-900 leading-relaxed"
              >
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
          className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
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
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    null
  );

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
      } else {
        setMessage({
          text: data.error || "Subscription failed",
          type: "error",
        });
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
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-30 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
           <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 mb-6 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Open Your Demat Account & 
              <span className="block mt-2">Unlock Exclusive Rewards</span>
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-green-700 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join thousands of smart investors getting{" "}
              <span className="font-bold text-green-900 bg-green-100/50 px-2 py-1 rounded-lg">
                free research reports, trading tips, and portfolio insights
              </span>{" "}
              when they open their account through us.
            </motion.p>
        </div>

        {/* Rewards Banner */}
        <motion.div
            className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white rounded-3xl p-8 mb-16 text-center shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
            </div>
            
            <div className="relative z-10">
              <motion.div 
                className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-3"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="text-4xl">🎁</span>
                Limited Time Offer
                <span className="text-4xl">🎁</span>
              </motion.div>
              <p className="text-lg sm:text-xl font-medium">
                Get{" "}
                <span className="font-black text-yellow-300 bg-green-800/30 px-3 py-1 rounded-xl">
                  3 months of premium market research
                </span>{" "}
                &{" "}
                <span className="font-black text-yellow-300 bg-green-800/30 px-3 py-1 rounded-xl">
                  ₹500 worth of investment strategies
                </span>{" "}
                FREE
              </p>
            </div>
          </motion.div>

        {/* Benefits */}
        <section className="bg-white border border-green-200 rounded-2xl shadow-md p-6 md:p-8 mb-16">
          <motion.h3
            className="text-2xl font-bold text-green-800 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Why Choose Us?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaWallet />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Earn Brokerage Cashback
              </h4>
              <p className="text-green-700 text-sm">
                Get 10% cashback on every trade — more savings, more profit.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaLightbulb />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Exclusive Market Insights
              </h4>
              <p className="text-green-700 text-sm">
                Join our private channel for daily market updates and smart
                investing tips.
              </p>
            </motion.div>

            {/* <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaHeadset />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Dedicated Support Always
              </h4>
              <p className="text-green-700 text-sm">
                Enjoy quick query resolution and hassle-free Demat account
                support.
              </p>
            </motion.div> */}

            {/* <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaShieldAlt />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Trusted Broking Partners
              </h4>
              <p className="text-green-700 text-sm">
                We&apos;re partnered with top broking firms for credibility and
                security.
              </p>
            </motion.div> */}

            {/* <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaUserTie />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Personalised Investment Guidance
              </h4>
              <p className="text-green-700 text-sm">
                Kickstart your investing journey with tailored, confident
                advice.
              </p>
            </motion.div> */}

            <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaGift />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Loyalty Rewards & Giveaways
              </h4>
              <p className="text-green-700 text-sm">
                Get rewarded with monthly and quarterly giveaways for smart
                trading.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brokers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {brokers.map((broker) => (
            <motion.div
              key={broker.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <BrokerCard broker={broker} />
            </motion.div>
          ))}
        </div>

        {/* How to Transfer Section */}
        <section className="py-12 px-4 sm:px-6 mb-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                If you want to transfer your holdings with us, See how you can!
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Seamless, paperless, and completed in just a few steps.
              </p>
            </motion.div>

            <div className="relative space-y-8">
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                  1
                </div>
                <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Open a Demat Account with Us
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Log in to your current broker’s portal and generate a Client
                    Master Report (CMR) or submit a DIS slip.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                  2
                </div>
                <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Initiate Transfer Request
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Log in to your current broker’s portal and generate a Client
                    Master Report (CMR) or submit a DIS slip.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                  3
                </div>
                <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Share Details with Us
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Email CMR or DIS to support@fiscalforum.in with your
                    name and client ID.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                  4
                </div>
                <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    We Handle the Rest
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Our team coordinates with your current broker to initiate
                    the transfer. No action needed from you.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-emerald-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Transfer Complete
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Your holdings will be transferred in 3-7 working days.
                    You&apos;ll receive a confirmation email.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
            className="mt-12 text-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}>
                <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
                Click here to share your DIS/CMR
              </h3>
                <button
                  onClick={() => {
                    try {
                      // Try to open Gmail compose window
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&to=business.fiscalforum@gmail.com&su=DIS%20Form%20Submission&body=Please%20find%20attached%20my%20DIS%20form.",
                        "_blank"
                      );
                    } catch (error) {
                      // Fallback to default email client
                      window.location.href =
                        "mailto:business.fiscalforum@gmail.com?subject=DIS%20Form%20Submission&body=Please%20find%20attached%20my%20DIS%20form.";
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  Share with - support@fiscalforum.in
                </button>
              </motion.div>

            <motion.div
              className="mt-12 text-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
                Perks of Transferring with Us
              </h3>
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-green-800">
                <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                  <FaGift className="text-emerald-700 text-xl" />
                  <span>Free Research Reports</span>
                </div>
                <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                  <FaRupeeSign className="text-emerald-700 text-xl" />
                  <span>50% Brokerage Cashback for 6 months</span>
                </div>
                <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                  <FaHeadset className="text-emerald-700 text-xl" />
                  <span>Dedicated Support</span>
                </div>
              </div>
              
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}