// app/(routes)/work-with-us/bdp/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCheckCircle,
  FaDollarSign,
  FaLightbulb,
  FaHeadset,
  FaTrophy,
} from "react-icons/fa";
import Link from "next/link";

const BDPPartnerDetails = () => {
  // Specific details for Business Development Partner
  const partnerInfo = {
    id: 1,
    title: "Business Development Partner",
    icon: FaBuilding,
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-100",
    description:
      "Partner with us as a Business Development ally and help expand our reach to new heights. Build trusted relationships, connect with potential clients, and earn attractive rewards while growing your own network and success alongside a brand that values collaboration.",
    features: [
      "Expand reach to new markets",
      "Build trusted client relationships",
      "Attractive reward structure",
      "Network growth opportunities",
      "Brand collaboration benefits",
    ],
    benefits: [
      "High commission rates",
      "Marketing support provided",
      "Dedicated account manager",
      "Training and resources",
      "Performance bonuses",
    ],
  };

  return (
    <section className="py-30 bg-gradient-to-br from-blue-50 via-emerald-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          {/* Left Side - Text & Button */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Become a Business Development Partner
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Build a great portfolio by joining as business development partner with Fiscal Forum.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Register Now
            </motion.button>
          </div>

        </div>

        {/* Services Section */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            {
              name: "Stocks",
              icon: (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
            },
            {
              name: "Mutual Funds",
              icon: (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
            {
              name: "Insurance",
              icon: (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h2m2 4h6m-6 4h6m-6 4h6m-6-8a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2H9z"
                  />
                </svg>
              ),
            },
            {
              name: "Loans",
              icon: (
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h6m-6 4h6m-6-8a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2H9z"
                  />
                </svg>
              ),
            },
          ].map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="text-emerald-600 mb-4 group-hover:text-teal-600 transition-colors duration-300">
                {service.icon}
              </div>
              <span className="font-medium text-gray-900">{service.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BDPPartnerDetails;
