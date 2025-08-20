"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaMotorcycle } from "react-icons/fa";

export default function TwoWheelerInsurancePage() {
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
            Two-Wheeler Insurance
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
              <FaMotorcycle className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Ride Worry-Free</h2>
              <p className="text-emerald-600">
                Total protection for your bike or scooter, always
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Your two-wheeler isn’t just a mode of transport—it’s a symbol of independence, convenience, and the joy of the open road. Whether you’re commuting to work, zipping through city traffic, or enjoying a weekend ride, your bike or scooter offers unmatched freedom and flexibility. But with every journey comes risk. Accidents, mechanical failures, theft, or even natural disasters can strike at any moment, turning a simple ride into a financial burden. Unplanned repairs, medical expenses, or legal liabilities can quickly disrupt your routine and strain your budget.
            </p>

            <p>
              Two-wheeler insurance is designed to protect both your vehicle and your peace of mind. It ensures that no matter what happens on the road, you’re covered—so you can keep riding with confidence, knowing your investment and your finances are safeguarded every step of the way.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Reliable Protection on the Road
            </h3>
            <p>
              Every ride carries potential risks, from minor scrapes and dents to major collisions and breakdowns. Comprehensive two-wheeler insurance shields you against a wide range of unforeseen events. Whether it’s an accident caused by another driver, a sudden mechanical failure, or damage from fire, storm, or vandalism, your policy helps cover repair costs, replacement expenses, and more.
            </p>

            <p>
              It also includes third-party liability coverage, which protects you if your vehicle causes injury or property damage to others. This is not only a legal requirement but a responsible choice that ensures you’re prepared for any situation. Even if it’s just a small scratch or a fender bender, having insurance means you won’t have to bear the full cost alone—allowing you to get back on the road quickly and without stress.
            </p>

            <p>
              With reliable protection in place, you can focus on the journey—not the fear of what might go wrong. You ride not because you have to, but because you want to—and with coverage, you do so with confidence.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Hassle-Free and Affordable
            </h3>
            <p>
              We understand that life moves fast, and so should your insurance. That’s why two-wheeler insurance is built for simplicity, speed, and affordability. Premiums are designed to fit your budget, making protection accessible to everyone. Claims are processed efficiently, with clear procedures that minimize delays and paperwork. Renewals are quick and convenient, so you never have to worry about lapsed coverage.
            </p>

            <p>
              You don’t need complex terms or long wait times to get the support you deserve. When something happens, help is just a call away. From filing a claim to receiving assistance, the entire process is streamlined to ensure you’re back on track as soon as possible.
            </p>

            <p>
              This ease of use means you can enjoy every ride without second-guessing your safety or financial security. Your two-wheeler is more than just a vehicle—it’s part of your lifestyle. And with dependable, affordable protection, you can embrace that lifestyle fully, without compromise.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Ride with Confidence, Live Without Fear
            </h3>
            <p>
              Every journey on your two-wheeler should be about freedom, not fear. It should be about the wind in your hair, the thrill of movement, and the satisfaction of reaching your destination on your own terms. With comprehensive insurance by your side, you gain the assurance that your bike or scooter is protected, and your finances are secure—no matter where the road takes you.
            </p>

            <p>
              You’re not just riding—you’re living. And with the right coverage, you can do so with peace of mind, knowing that when the unexpected happens, you’re ready.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              Don’t let uncertainty slow you down. Protect your ride today and enjoy the freedom you’ve earned—without the worry.
            </blockquote>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/insurance/two-wheeler-insurance")}
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
