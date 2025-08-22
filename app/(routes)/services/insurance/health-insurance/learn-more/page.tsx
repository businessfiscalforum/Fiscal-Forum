"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHeartbeat } from "react-icons/fa";

export default function HealthInsurancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">
            Health Insurance
          </h1>
          <div className="w-16"></div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaHeartbeat className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Care Without Compromise</h2>
              <p className="text-emerald-600">
                Complete health coverage for you and your loved ones
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Good health is priceless. It’s the foundation of everything we do—our ability to work, love, grow, and enjoy life. Yet, even the most careful among us can face sudden illness, unexpected injuries, or chronic conditions that disrupt our lives and strain our finances. Medical care, while essential, often comes with steep costs—hospital stays, surgeries, medications, diagnostics, and follow-up treatments can quickly add up. Without proper protection, these expenses can lead to financial hardship, forcing difficult choices between treatment and survival.
            </p>

            <p>
              Health insurance changes that equation. It ensures that when life takes an unplanned turn, you and your family are not left vulnerable. From emergency hospitalization and critical surgeries to routine check-ups and preventive care, comprehensive health coverage gives you access to high-quality medical services without the burden of financial stress. It’s more than just a policy—it’s a promise that care is never out of reach, no matter what happens.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Protection That Matters</h3>
            <p className="italic">
              Health insurance is far more than a tool for paying bills. It’s a lifeline that allows you to focus on healing, recovery, and well-being—knowing that the financial aspects are handled with care and clarity. Whether it’s a sudden emergency requiring immediate surgery, a long-term illness needing ongoing treatment, or the management of a chronic condition like diabetes or hypertension, reliable coverage ensures that you receive the care you need, when you need it, without hesitation.
            </p>

            <p className="italic">
              It removes the fear of choosing between medical treatment and personal sacrifice. You don’t have to delay care due to cost, skip necessary tests because of expense, or worry about how you’ll pay for medications. With health insurance, you’re empowered to make decisions based on what’s best for your health—not your budget.
            </p>

            <p className="italic">
              This kind of protection also extends to your family. When your spouse, children, or parents are covered, you create a safety net that supports everyone you love. It means fewer sleepless nights worrying about someone’s health, and more moments spent together, healthy and whole.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Your Partner in Wellness</h3>
            <p className="italic">
              True health goes beyond treating illness—it’s about preventing disease, staying proactive, and living your best life. Health insurance plays a vital role in this journey by supporting a healthier lifestyle from the very beginning. It encourages regular health check-ups, early screenings, vaccinations, and preventive care—all of which help detect problems before they become serious.
            </p>

            <p className="italic">
              With cashless treatment options at leading hospitals, you can get immediate care without the hassle of upfront payments. Simplified claims processes ensure that paperwork doesn’t delay treatment, and smooth renewals mean continuous coverage without gaps. You’re not just protected during emergencies—you’re supported every step of the way, from wellness visits to major medical interventions.
            </p>

            <p className="italic">
              Health insurance is also an investment in peace of mind. By removing the fear of medical costs, it allows you to live with confidence, knowing that your family’s health is prioritized. You can focus on what truly matters: building relationships, pursuing dreams, and enjoying life with the people who matter most.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">A Commitment to Your Well-Being</h3>
            <p className="italic">
              Choosing health insurance is more than a financial decision—it’s a commitment to your future, your family, and your quality of life. It shows that you care enough to plan ahead, protect what’s most precious, and ensure that health never becomes a barrier to happiness.
            </p>

            <p className="italic">
              In a world where medical costs continue to rise, having complete health coverage is no longer a luxury—it’s a necessity. It’s the difference between facing a crisis alone and having support at your side. It’s the quiet assurance that no matter what life brings, you’ll always have access to the care you deserve.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              Let us be your trusted partner in wellness—because your health is too important to compromise.
            </blockquote>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/insurance/health-insurance")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Get Health Coverage
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
