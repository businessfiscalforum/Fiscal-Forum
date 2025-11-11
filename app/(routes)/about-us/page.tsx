"use client";
import { motion } from "framer-motion";
import Link from "next/link";



export default function AboutUs() {
  const services = [
    {
      title: "Stock Investment",
      desc: "Comprehensive Demat and portfolio solutions with real-time tracking, insights, and guidance for investors at every level.",
    },
    {
      title: "Mutual Funds",
      desc: "Personalized mutual fund plans with SIP tracking, expert fund selection, and regular performance updates for consistent growth.",
    },
    {
      title: "Insurance",
      desc: "All types of insurance — motor, health, and life — compared across providers to ensure you get the best coverage at the best rate.",
    },
    {
      title: "Credit Cards",
      desc: "Choose from a wide range of lifestyle-matched credit cards with cashback offers, reward points, and expert recommendations.",
    },
    {
      title: "Saving Accounts",
      desc: "Open instant online savings accounts with top banks like Axis, IndusInd, and Airtel Payments Bank, and enjoy exclusive benefits.",
    },
    {
      title: "Loans",
      desc: "Get guidance and assistance in securing the best loan offers tailored to your financial profile with trusted lending partners.",
    },
    {
      title: "Govt Bonds & Funds",
      desc: "Explore secure, high-trust government-backed investment options such as SGBs, Bonds, and National Pension Schemes.",
    },
  ];

  const reportTypes = [
    {
      name: "Pre-Market Research Report",
      desc: "Start your trading day informed with expert analysis and daily pre-market insights.",
    },
    {
      name: "Thematic Report",
      desc: "Deep dives into trending sectors and investment themes to help you plan long-term strategies.",
    },
    {
      name: "Equity Report",
      desc: "Comprehensive analysis on stocks and sectors, helping you make data-driven investment decisions.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 relative overflow-hidden text-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/white-diamond.png')] opacity-40" />

      {/* Hero Section */}
      <section className="relative z-10 py-30 px-6 md:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4"
        >
          About Fiscal Forum
        </motion.h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          At{" "}
          <span className="font-semibold text-emerald-600">Fiscal Forum</span>,
          we’re redefining financial guidance. From investments to insurance,
          our mission is to make{" "}
          <span className="text-emerald-700 font-medium">
            smart financial decisions accessible
          </span>{" "}
          — completely free.
        </p>
      </section>

      {/* Services Section */}
      <section className="relative py-16 px-4 md:px-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl mx-4 md:mx-10 shadow-xl z-10">
    <div className="max-w-5xl mx-auto"> 
        <h2 className="text-3xl font-semibold text-emerald-800 text-center mb-10">
          Services We Offer
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 rounded-2xl p-6 border border-emerald-200 shadow-md hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
    </div>
</section>

      {/* Research Reports Section */}
      {/* <section className="py-20 px-6 md:px-20 text-center relative z-10">
        <h2 className="text-3xl font-semibold text-emerald-800 mb-8">
          Research Reports
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-12">
          Stay ahead in the market with our well-researched reports curated by
          experts. We deliver actionable insights and market trends so you can
          invest confidently.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reportTypes.map((report, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 rounded-2xl p-6 border border-emerald-200 shadow-md hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                {report.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {report.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/reports"
            className="inline-block bg-emerald-600 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md"
          >
            Explore All Reports
          </Link>
        </div>
      </section> */}

      {/* Why Choose Us */}
      {/* <section className="py-20 px-6 md:px-16 text-center relative z-10">
        <h2 className="text-3xl font-semibold text-emerald-800 mb-8">Why Choose Fiscal Forum?</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {[
            "Free and transparent financial services",
            "Personalized investment guidance",
            "Exclusive rewards for referrals",
            "Strong partnerships with top institutions",
            "Customer-first approach and trust",
          ].map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/80 border border-emerald-100 rounded-full px-4 py-2 text-emerald-700 text-sm shadow-sm"
            >
              <span className="text-teal-600 text-lg">✓</span> {point}
            </div>
          ))}
        </div>
      </section> */}

      {/* Comprehensive Commission Section */}
      {/* <section className="py-20 px-6 md:px-20 bg-emerald-50 rounded-3xl mx-4 md:mx-16 shadow-md relative z-10">
        <h2 className="text-3xl font-semibold text-emerald-800 text-center mb-8">
          Commissions & Rewards
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Fiscal Forum offers one of the most transparent and rewarding earning
          structures in the industry. Here’s a complete overview of how you earn
          across our products, partnerships, and referrals.
        </p>

        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
              1. Referral & Brokerage Sharing
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm leading-relaxed list-disc list-inside">
              <li>
                Refer a trading lead who joins Fiscal Forum’s partner brokers
                (Motilal Oswal, Choice Broking, Angel One, Paytm Money).
              </li>
              <li>
                You and your lead share{" "}
                <span className="font-semibold text-emerald-700">
                  18% brokerage equally
                </span>{" "}
                (9% each) on transferred accounts.
              </li>
              <li>
                Additional model:{" "}
                <span className="font-semibold text-emerald-700">
                  10% brokerage sharing per month
                </span>{" "}
                for 2 years + cash bonus up to ₹2,000 (based on brokerage
                volume).
              </li>
              <li>
                Minimum monthly brokerage target: ₹5,000 to stay eligible for
                rewards.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
              2. Partner-Specific Bonuses
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm">
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Angel One
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  • Login within 15 days to earn ₹200 bonus.
                  <br />• 10% brokerage sharing for 1 year — extendable to 3
                  years if consistent activity is maintained.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm">
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Choice & Motilal Oswal
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  • Contest-based incentives.
                  <br />• Up to{" "}
                  <span className="font-semibold text-emerald-700">
                    20% brokerage sharing
                  </span>{" "}
                  depending on contest results.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
              3. Investment Product Commissions
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm">
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Mutual Funds
                </h4>
                <p className="text-sm text-gray-700">
                  Commission depends on the selected fund. Average sharing:{" "}
                  <span className="font-semibold text-emerald-700">~10%</span>{" "}
                  for 1 year, extendable to 3 years based on consistent
                  performance.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm">
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Insurance
                </h4>
                <p className="text-sm text-gray-700">
                  Health: <b>11%</b>, Life: <b>18%</b>, Motor: <b>3%</b>.<br />
                  Commission varies with premium amount and insurer; can exceed
                  these figures for high-value policies.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm">
                <h4 className="font-semibold text-emerald-700 mb-2">
                  Credit Cards
                </h4>
                <p className="text-sm text-gray-700">
                  Earn ₹400–₹1000 per approved card issuance depending on card
                  type and bank, plus cashback incentives.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
              4. Savings Account Onboarding
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm text-sm">
                <b>Axis Bank</b> — ₹550 per account
                <br />
                Minimum ₹5,000 balance.
              </div>
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm text-sm">
                <b>IndusInd Bank</b> — ₹250 per account
                <br />
                Instant video KYC activation.
              </div>
              <div className="bg-white rounded-xl p-5 border border-emerald-200 shadow-sm text-sm">
                <b>FI Money</b> — ₹90 per account
                <br />0 balance account option.
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="py-20 text-center relative z-10">
        <h2 className="text-3xl font-semibold text-emerald-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-700 mb-6">
          Have questions or want to partner with us? Reach out anytime.
        </p>
        <a
          href="mailto:support@fiscalforum.in"
          className="bg-emerald-600 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md"
        >
          support@fiscalforum.in
        </a>
      </section>

      {/* Decorative Wave Footer */}
      <div className="relative w-full overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#10B981"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,122.7C672,139,768,213,864,213.3C960,213,1056,139,1152,128C1248,117,1344,171,1392,197.3L1440,224L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
