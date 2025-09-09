// components/CustomPricingTable.tsx
'use client'

import { motion } from 'framer-motion'
import { Clock, Calendar, Gift, ExternalLink, CheckCircle } from 'lucide-react'

const plans = [
  {
    id: '3m',
    name: '3 Months',
    description: 'Get research reports for 3 months',
    price: 299,
    originalPrice: 350,
    discount: '10% OFF',
    features: ['Get research reports for 3 months'],
    href: 'https://rzp.io/l/3months-plan', // Replace with your actual Razorpay link
    icon: <Clock className="w-6 h-6" />,
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: '6m',
    name: '6 Months',
    description: 'Get research reports for 6 months',
    price: 499,
    originalPrice: 594, // 299 * 2
    discount: '16% OFF',
    features: ['Get research reports for 6 months'],
    href: 'https://rzp.io/l/6months-plan', // Replace with your actual Razorpay link
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    popular: true
  },
  {
    id: '1y',
    name: '1 Year',
    description: 'Get research reports for 1 year',
    price: 699,
    originalPrice: 1196, // 299 * 4
    discount: '42% OFF',
    features: ['Get research reports for 1 year'],
    href: 'https://rzp.io/l/1year-plan', // Replace with your actual Razorpay link
    icon: <Gift className="w-6 h-6" />,
    color: 'from-emerald-600 to-teal-700',
  },
]

export default function CustomPricingTable() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
            Get access to our premium research reports with flexible subscription options
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white text-center`}>
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-emerald-100">{plan.description}</p>
              </div>

              {/* Plan Body */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-emerald-900">₹{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="ml-2 text-lg text-emerald-600 line-through">₹{plan.originalPrice}</span>
                    )}
                  </div>
                  {plan.discount && (
                    <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                      {plan.discount}
                    </span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                      <span className="ml-3 text-emerald-800">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    Get Started
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonus Offer Section */}
        <motion.div 
          className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-emerald-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-900 mb-3">
                Get FREE research report (₹500 value) delivered to your email after payment!
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-emerald-800">100% refund policy valid for 3 days after purchase</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-emerald-800">Secure payment gateway</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-emerald-800">Trusted by over 10,000 traders</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-emerald-100">
            <p className="text-sm text-emerald-600 text-center">
              Note: There is no automatic deduction; this is just a one-time payment.
            </p>
          </div>
        </motion.div>

        {/* Security Note */}
        <motion.div 
          className="mt-8 text-center text-emerald-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <div className="inline-flex items-center bg-emerald-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-sm">Secure payment processing powered by Razorpay</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}