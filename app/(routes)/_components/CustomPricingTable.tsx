// components/RedesignedClerkPricingTable.tsx
'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, ShieldCheck } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const plans = [
  {
    id: '3m',
    name: '3 Months',
    description: 'For 3 Months',
    price: 5,
    period: 'month',
    features: ['Get Reports of your Choice'],
    status: 'active',
    active: true
  },
  {
    id: '6m',
    name: '6 Months',
    description: 'For 6 Months',
    price: 7,
    period: 'month',
    features: ['Get Reports of your Choice'],
    status: 'inactive',
    active: false
  },
  {
    id: '1y',
    name: '1 Year',
    description: 'For 1 Year',
    price: 12,
    period: 'month',
    features: ['Get Reports of your Choice'],
    status: 'inactive',
    active: false
  }
]

export default function RedesignedClerkPricingTable() {
  const { user, isLoaded } = useUser()
  
  const handlePlanSelect = async (planId: string) => {
    try {
      // Show loading state
      const button = event?.target as HTMLButtonElement
      if (button) {
        button.disabled = true
        button.textContent = 'Processing...'
      }

      // Call your API route to create the checkout session
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })

      if (response.ok) {
        const { url } = await response.json()
        // Redirect to Clerk's checkout session
        window.location.href = url
      } else {
        const errorData = await response.json()
        alert(`Failed to process subscription: ${errorData.error}`)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(`An error occurred: ${error.message}`)
    } finally {
      // Reset button state
      const button = event?.target as HTMLButtonElement
      if (button) {
        button.disabled = false
        button.textContent = 'Switch to this plan'
      }
    }
  }
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }
  
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
            Choose the plan that fits you best. Save more with longer subscriptions!
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-xl shadow-lg overflow-hidden ${
                plan.active ? 'ring-2 ring-emerald-500' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              {/* Status Badge */}
              {plan.status === 'active' && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Active
                </div>
              )}

              {/* Plan Content */}
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-900">{plan.name}</h3>
                  <span className="text-sm text-emerald-600">{plan.description}</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-emerald-900">
                      ${plan.price}
                    </span>
                    <span className="text-emerald-600 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-emerald-700 mt-1">
                    Only billed monthly
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
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.active
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.active ? 'Resubscribe' : 'Switch to this plan'}
                </button>
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
          <span className="text-sm">Secure payment processing powered by Clerk</span>
        </motion.div>
      </div>
    </div>
  )
}