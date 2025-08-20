"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCarSide } from "react-icons/fa";

export default function CarInsurancePage() {
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
            Car Insurance
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
              <FaCarSide className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Drive with Confidence</h2>
              <p className="text-emerald-600">
                Comprehensive protection every time you’re on the road
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Your car is more than just a vehicle—it’s your daily companion, your family’s trusted travel partner, and often, your second home. Whether it’s ferrying kids to school, carrying you to work, or taking you on weekend adventures, your car plays a central role in your life. It’s where conversations begin, memories are made, and journeys unfold. But with every drive comes risk. A sudden collision, a minor scrape in a parking lot, or even a breakdown on the highway can quickly turn a routine trip into a stressful and costly situation.
            </p>

            <p>
              Car insurance is designed to protect not only your vehicle but also your peace of mind. It acts as a reliable shield against the unexpected, ensuring that when life throws challenges your way, you’re never left facing financial strain alone. From small dents to major accidents, the right coverage gives you the confidence to keep moving forward—without fear, hesitation, or worry.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Why It Matters</h3>
            <p>
              Every journey carries risks—some small, some serious. A fender bender, a flat tire, or an emergency medical situation involving a passenger can all lead to unexpected expenses. Without proper insurance, these events can quickly spiral into overwhelming financial burdens. Repair costs, medical bills, legal liabilities, and even lost income due to downtime can add up fast, especially if you're unprepared.
            </p>

            <p>
              Reliable car insurance does more than cover damages—it safeguards your financial stability and ensures compliance with legal requirements. In most places, having at least third-party liability coverage is mandatory, but comprehensive policies go further by protecting your vehicle from theft, natural disasters, fire, and other unforeseen events. This means you’re not just meeting the law—you’re making a responsible choice for your safety, your family, and your future.
            </p>

            <p>
              Having dependable coverage allows you to drive responsibly, knowing that you’re protected no matter what happens. It transforms your car from a source of anxiety into a symbol of freedom and security—a true extension of your lifestyle.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Support You Can Trust</h3>
            <p>
              We believe that car insurance should be simple, transparent, and built around you. That’s why our policies are crafted with clarity, speed, and reliability at their core. From the moment you file a claim to the day your policy renews, every step is designed to be quick, stress-free, and easy to understand. No hidden clauses, no complicated paperwork—just straightforward support when you need it most.
            </p>

            <p>
              With responsive customer service and 24/7 assistance, help is always within reach. Whether you’re stuck on the side of the road, dealing with a sudden accident, or planning a long-distance trip, we’re there to guide you through every situation. Our goal is to make sure you feel supported—not overwhelmed—no matter where your journey takes you.
            </p>

            <p>
              Whether you’re commuting to work, running errands, or embarking on a cross-country adventure, our car insurance ensures that every drive is covered. You can focus on the road ahead, knowing that your vehicle, your loved ones, and your finances are protected.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Drive With Confidence, Live With Peace of Mind</h3>
            <p>
              Your car is more than metal and machinery—it’s part of your daily rhythm, your family’s routine, and your connection to the world. And with the right insurance, it becomes a source of strength and security.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              Don’t let uncertainty hold you back. Choose protection that matches your lifestyle, supports your needs, and keeps you moving forward with confidence.
            </blockquote>

            <p>
              Let us be your trusted partner on the road—every mile, every journey, every day.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/insurance/car-insurance")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Get Insurance Quote
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
