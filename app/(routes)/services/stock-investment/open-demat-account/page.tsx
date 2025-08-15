// app/page.tsx
"use client"
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FaChartBar, FaCoins, FaFastForward, FaLine, FaSpinner } from "react-icons/fa";

type Broker = {
  name: string;
  logo: string;
  link: string;
};

const brokers: Broker[] = [
  {
    name: "Alice Blue",
    logo: "/alice-blue.png",
    link: "https://ekyc.aliceblueonline.com/?source=WRAJ1101",
  },
  {
    name: "Angel One",
    logo: "/angel-one.png",
    link: "https://a.aonelink.in/ANGOne/6pTAS0u",
  },
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/open-free-demat-account?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
  },
  {
    name: "Motilal Oswal",
    logo: "/motilal-oswal.png",
    link: "https://ekyc.motilaloswal.com/Partner/?diyid=8eb2b8cb-c9f3-47f5-b206-70c847d9f8b7",
  },
  {
    name: "Upstox",
    logo: "/upstox.png",
    link: "https://upstox.com/open-account/?f=4ZAVSY",
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814v",
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "https://fundzbazar.com/Link/jRkmixvcvvw",
  },
];

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
                <FaChartBar/>
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
                <FaCoins/>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Higher Returns</h4>
              <p className="text-green-700 text-sm">
                Access exclusive investment strategies tailored for growth.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaFastForward/>
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
            <Link key={broker.name} href={broker.link} target="_blank">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center text-center border border-green-200">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-green-50 rounded-full">
                  <Image
                    src={broker.logo}
                    alt={`${broker.name} logo`}
                    width={80}
                    height={80}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold text-green-800">
                  {broker.name}
                </h2>
                <span className="mt-2 text-sm text-green-600 font-medium">
                  Open Now & Claim Rewards →
                </span>
              </div>
            </Link>
          ))}
        </div>

<section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
    
    {/* Interested Column */}
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

    {/* Not Interested Column */}
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
</section>


        {/* CTA */}
        {/* <div className="text-center mt-12">
          <Link
            href="#"
            className="px-10 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Start Opening Your Account →
          </Link>
          <p className="text-green-700 mt-3 text-sm">
            100% Free • Secure Process • Partnered with SEBI-registered brokers
          </p>
        </div> */}
      </div>
    </main>
  );
}
