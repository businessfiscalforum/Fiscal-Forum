"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, ShieldCheck } from "lucide-react";

const plans = [
  {
    id: "3m",
    name: "3 Months",
    description: "For 3 Months",
    price: 299,
    period: "one-time",
    features: ["Get Reports of your Choice"],
    link: "https://www.upi.me/pay?pa=fiscalforum.36465083@hdfcbank&am=299&tn=Pre Market Report 3 Month Plan",
  },
  {
    id: "6m",
    name: "6 Months",
    description: "For 6 Months",
    price: 499,
    period: "one-time",
    features: ["Get Reports of your Choice"],
    link: "https://www.upi.me/pay?pa=fiscalforum.36465083@hdfcbank&am=499&tn=Pre Market Report 6 Month Plan",
  },
  {
    id: "1y",
    name: "1 Year",
    description: "For 1 Year",
    price: 799,
    period: "one-time",
    features: ["Get Reports of your Choice"],
    link: "https://www.upi.me/pay?pa=fiscalforum.36465083@hdfcbank&am=799&tn=Pre Market Report Annual Plan",
  },
];

export default function RedesignedClerkPricingTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-full">
              <Clock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
            How long do you need our report?
          </h1>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Choose the plan that fits you best. Save more with longer
            subscriptions!
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="relative rounded-xl shadow-lg overflow-hidden flex flex-col justify-between items-stretch h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white p-6 h-full flex flex-col justify-between items-stretch">
                <div className="flex items-stretch justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-900">
                    {plan.name}
                  </h3>
                  <span className="text-sm text-emerald-600">
                    {plan.description}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-stretch">
                    <span className="text-3xl font-bold text-emerald-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-emerald-600 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700 mt-1">
                    One-time payment
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-emerald-800">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-3 px-4 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Buy this plan
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Badge */}
        <motion.div
          className="mt-12 flex items-center justify-center text-emerald-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ShieldCheck className="w-5 h-5 mr-2" />
          <span className="text-sm">
            Secure UPI payment powered by your bank
          </span>
        </motion.div>
        <motion.div
          className="mt-12 justify-center text-emerald-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2">
            Refund/Cancellation Policy
          </h2>
          <p className="text-gray-700 mb-4">
            Fiscal Forum offers refunds for paid reports under the following
            terms:
          </p>

          <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
            1. Refund Eligibility
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Refunds available within 3 days if unsatisfied</li>
          </ul>

          <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
            2. Refund Process
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Contact support@fiscalforum.in with transaction details</li>
            <li>Refunds processed via original payment method</li>
          </ul>

          <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
            3. Non-Refundable Cases
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>Not available after 3 days</li>
            <li>No refunds for reports already accessed or downloaded</li>
          </ul>

          <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">
            4. Termination of Access
          </h3>
          <p className="text-gray-700 mb-4">
            Refund approval revokes access to report or subscription immediately
          </p>
        </motion.div>
      </div>
    </div>
  );
}
