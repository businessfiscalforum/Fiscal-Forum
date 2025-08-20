"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaStoreAlt } from "react-icons/fa";

export default function HomeShopInsurancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
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
            Home & Shop Insurance
          </h1>
          <div className="w-16"></div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaStoreAlt className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Protect What Matters Most</h2>
              <p className="text-emerald-600">
                Comprehensive coverage for your home and business
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Your home and shop are more than just physical spaces—they are the
              foundation of your family’s comfort and your livelihood. From the
              warmth of your living room where memories are made to the shop
              where your hard work sustains your business, each holds
              immeasurable value. Protecting them from unforeseen risks is not
              just about financial security, but also about preserving your way
              of life and the dreams you’ve built.
            </p>

            <p>
              Home and shop insurance is designed to shield you against the
              unexpected. Fire, theft, natural disasters, or accidental damage
              can strike at any time, leaving devastating consequences. With the
              right coverage in place, you can rest easy knowing that the things
              you’ve worked so hard for are protected, and that you’ll have the
              resources to rebuild and recover quickly should the need arise.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Safeguarding Your Home
            </h3>
            <p>
              A home is more than bricks and mortar—it’s your sanctuary, where
              every corner holds memories of love, laughter, and family. But
              accidents, break-ins, or natural calamities can disrupt this safe
              space in an instant. Home insurance provides protection for both
              the structure and the belongings inside it, covering repair or
              replacement costs when disaster strikes. It even supports you with
              temporary accommodation, ensuring your family’s comfort and
              stability no matter what happens.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Protection for Your Shop
            </h3>
            <p>
              Your shop is more than a business—it’s your passion, your income,
              and your contribution to the community. But every business faces
              risks beyond its control: from fire and theft to equipment failure
              and property damage. Shop insurance provides a financial safety
              net that covers not only the physical structure but also your
              stock, machinery, and equipment. In case of disruption, it can
              help compensate for lost income, ensuring that your business
              remains resilient and ready to recover without jeopardizing your
              future.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Security That Lets You Focus on Growth
            </h3>
            <p>
              Choosing home and shop insurance is about more than risk
              management—it’s about peace of mind. When you know your property
              and business are secure, you are free to focus on growth,
              innovation, and the things that matter most. With comprehensive
              protection in place, you can live and work confidently, knowing
              that your future is safe no matter what challenges arise.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              “Protect your home, safeguard your shop, and secure the future
              you’ve worked so hard to build.”
            </blockquote>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                router.push("/services/insurance/home-shop-insurance")
              }
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
