"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaCheck, FaArrowLeft } from "react-icons/fa";

export default function IndusIndBankPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-30 pb-20 px-4 sm:px-6">
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
            IndusInd Bank Savings Account
          </h1>
          <div className="w-16"></div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaCheck className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">IndusInd Bank</h2>
              <p className="text-emerald-600">Zero Fee Banking Experience</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              IndusInd Bank offers a premium savings account experience with innovative features designed for modern banking needs. Our customer-centric approach combines cutting-edge technology with personalized service to deliver an exceptional banking experience.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Innovative Account Features</h3>
            
            <p className="italic mb-4">
              Choose your phone number as your easy-to-remember account number. This unique feature simplifies banking by allowing you to use your mobile number as your account identifier, making transactions more convenient and reducing the chances of errors during fund transfers or cheque processing.
            </p>
            
            <p className="italic mb-4">
              Zero AMC charges on your digital card — save more every year. Unlike traditional banks that impose annual maintenance fees on debit cards, IndusInd Bank waives these charges completely, allowing you to enjoy all card benefits without any recurring costs.
            </p>
            
            <p className="italic mb-6">
              Complete application support for a smooth, hassle-free banking experience. Our dedicated team guides you through every step of the account opening process, ensuring all documentation is properly handled and your application is processed efficiently with minimal effort on your part.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Flexible Banking Options</h3>
            
            <p className="italic mb-4">
              Minimum initial deposit: ₹5,000 during account opening on the same day. This reasonable starting requirement makes our premium banking services accessible to a wider range of customers while ensuring account activation within the same banking day for immediate access to services.
            </p>
            
            <p className="italic mb-4">
              Withdrawals allowed 15 minutes after initial funding is completed. Our fast-processing system ensures that once your account is funded, you can access your money almost immediately, reflecting our commitment to providing quick and efficient banking services.
            </p>
            
            <p className="italic mb-6">
              No hidden charges — complete transparency for your peace of mind. We believe in clear communication about all fees and charges, so you always know what to expect from your banking relationship with us, with no surprise deductions or concealed costs.
            </p>
            
            <div className="bg-emerald-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Special Offer</h4>
              <p className="text-emerald-700">
                New customers can enjoy exclusive benefits including cashback up to ₹250 when you open your account today! This limited-time offer is our way of welcoming you to experience premium banking services with added value.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Why Choose IndusInd Bank?</h4>
              <p className="text-gray-700 mb-3">
                With a strong reputation for innovation and customer service, IndusInd Bank provides a comprehensive range of banking solutions tailored to meet the evolving needs of modern customers. Our digital banking platform offers 24/7 access to your accounts, while our branch network ensures personal assistance when needed.
              </p>
              <p className="text-gray-700">
                Our savings accounts come with additional benefits like accidental insurance cover, access to exclusive investment products, and rewards through our loyalty programs. Experience banking that adapts to your lifestyle with IndusInd Bank.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}