"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { TrendingUp } from "lucide-react";

type Broker = {
  name: string;
  logo: string;
  link: string;
};

const existingAccounts: Broker[] = [
  // {
  //   name: "Alice Blue",
  //   logo: "/alice-blue.png",
  //   link: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
  // },
  // {
  //   name: "Angel One",
  //   logo: "/angel-one.png",
  //   link: "https://a.aonelink.in/ANGOne/6pTAS0u",
  // },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/mutual-funds-investment?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
  },
  // {
  //   name: "Motilal Oswal",
  //   logo: "/motilal-oswal.png",
  //   link: "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
  // },
  // {
  //   name: "Upstox",
  //   logo: "/upstox.png",
  //   link: "https://upstox.com/open-account/?f=4ZAVSY",
  // },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814",
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    link: "https://www.njindiaonline.com/etada/partintiate.fin?cmdAction=showMenu&njBrcode=47283", // no link provided yet
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "https://fundzbazar.com/Link/jRkmixvcvvw", // no link provided yet
  },
];

export default function AlreadyHaveAccount() {
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
  
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage({ text: "Please enter a valid email address", type: "error" });
        return;
      }
  
      setIsSubmitting(true);
      setMessage(null);
  
      try {
        // Simulate API call
  
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <>
    <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="max-w-4xl mx-auto text-center mb-12">
              {/* Attractive Tagline */}
              <h4 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Get Smarter Market Insights Delivered Daily
              </h4>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay ahead of the curve with expert-curated market reports,
                pre-market updates, and IPO alerts — straight to your inbox.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-10 h-10 text-green-600 mr-3" />
                <span className="text-lg font-semibold text-gray-700">
                  Daily Market Reports
                </span>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700"
                    disabled={isSubmitting}
                  />
                </div>

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
          </section>
    <section className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 py-25 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4">
          Already Have an Account?
        </h2>
        <p className="text-lg text-blue-100 text-center mb-12 max-w-2xl mx-auto">
          Login to your existing broker account and start trading instantly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {existingAccounts.map((broker) => (
            <Link key={broker.name} href={broker.link} target="_blank">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-2 cursor-pointer">
                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={broker.logo}
                    alt={`${broker.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {broker.name}
                </h3>
                <span className="mt-2 text-sm text-green-600 font-medium">
                  Login →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
