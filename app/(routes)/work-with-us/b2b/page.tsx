// app/(routes)/work-with-us/b2b/page.tsx
"use client";

import { motion } from "framer-motion";
import { FaHandshake,FaRocket, FaCheckCircle, FaDollarSign, FaLightbulb, FaComments } from "react-icons/fa";
import Link from "next/link";

const B2BPartnerDetails = () => {
  // Specific details for B2B Partner
  const partnerInfo = {
    id: 3,
    title: "B2B Partner",
    icon: FaHandshake,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-100",
    description: "Collaborate with us as a B2B Partner and unlock growth for your business too. Bring your services, align with our trusted network, and deliver greater value to your clients while expanding your reach and creating new possibilities together.",
    features: [
      "Business growth acceleration",
      "Service integration",
      "Trusted network access",
      "Client value enhancement",
      "Mutual growth opportunities",
    ],
    benefits: [
      "Revenue sharing model",
      "Joint marketing campaigns",
      "Technical integration support",
      "Priority customer support",
      "Strategic partnership benefits",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FaHandshake /> Partnership Program
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-6">
            {partnerInfo.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {partnerInfo.description}
          </p>
        </motion.div>

        {/* Features & Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaLightbulb className="text-purple-500" /> Key Features
            </h2>
            <ul className="space-y-4">
              {partnerInfo.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaDollarSign className="text-purple-500" /> Benefits & Rewards
            </h2>
            <ul className="space-y-4">
              {partnerInfo.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <FaRocket className="text-blue-500 mt-1 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join our B2B Partner Program and unlock new avenues for mutual growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?subject=B2B Partnership Inquiry"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaComments /> Contact Us
              </Link>
              <Link
                href="/work-with-us" // Back to main partner page
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                Explore Other Options
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default B2BPartnerDetails;