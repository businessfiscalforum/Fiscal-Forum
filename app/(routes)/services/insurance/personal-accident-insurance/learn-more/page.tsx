"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHeartbeat } from "react-icons/fa";

export default function PersonalAccidentInsurancePage() {
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
            Personal Accident Insurance
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
              <FaHeartbeat className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Protection When You Need It Most</h2>
              <p className="text-emerald-600">
                Financial security and medical support in case of accidents
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Accidents are unpredictable and can happen at any time—whether during a routine commute, 
              at work, while engaging in daily activities, or even during recreational pursuits. 
              In an instant, a sudden fall, collision, or injury can disrupt lives, alter futures, 
              and place immense strain on families. The emotional toll of such events is often matched 
              by financial hardship, especially when unexpected medical bills, loss of income, or 
              long-term care needs arise. Personal accident insurance steps in during these critical 
              moments, offering essential support to help you and your loved ones navigate life’s 
              most challenging circumstances.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Comprehensive Accident Coverage
            </h3>
            <p>
              Personal accident insurance is designed to respond swiftly and effectively when unforeseen 
              injuries occur. Whether it's a minor incident resulting in temporary disability or a more 
              serious event leading to permanent impairment or, in the worst-case scenario, fatality, 
              this policy offers tailored support to meet a wide range of needs. In the event of an 
              accident, the insurance provides financial assistance to cover emergency medical treatments, 
              hospital stays, surgeries, and ongoing rehabilitation.
            </p>

            <p>
              The coverage also extends beyond medical expenses to include benefits for accidental 
              disabilities—both partial and total—ensuring that you receive compensation if your 
              ability to work is compromised. In the unfortunate event of an accidental death, the 
              policy provides a lump-sum benefit to your beneficiaries, helping them manage essential 
              expenses and maintain their standard of living during a deeply difficult time.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Peace of Mind for You and Your Family
            </h3>
            <p>
              While medical treatment is crucial after an accident, the impact extends far beyond the 
              hospital room. The inability to work due to injury can lead to mounting bills, missed 
              payments, and stress over financial survival. Personal accident insurance addresses this 
              concern by providing income replacement support during periods of incapacity. This ensures 
              your household can continue meeting essential needs without interruption, even if you are 
              unable to earn a regular income.
            </p>

            <p>
              Choosing personal accident insurance is more than a financial decision—it’s a commitment 
              to your family’s well-being. It reflects foresight, responsibility, and care, ensuring 
              that those who matter most are never left to face hardship alone.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              A Lifeline in Times of Crisis
            </h3>
            <p>
              In moments of crisis, every detail counts—from medical decisions to financial planning. 
              Personal accident insurance ensures that you are equipped to handle whatever comes your way, 
              without being overwhelmed by external pressures. It empowers you to prioritize health and 
              recovery, knowing that your family’s financial foundation remains intact.
            </p>

            <p>
              Don’t wait for an accident to reveal your vulnerabilities. Secure your future today and 
              give yourself and your loved ones the gift of stability, security, and peace of mind.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                router.push("/services/insurance/personal-accident-insurance")
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
