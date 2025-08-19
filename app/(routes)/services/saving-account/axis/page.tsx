"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaCheck, FaArrowLeft } from "react-icons/fa";

export default function AxisBankPage() {
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
            Axis Bank Savings Account
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
              <h2 className="text-2xl font-bold text-gray-800">Axis Bank</h2>
              <p className="text-emerald-600">Flexible Savings Solutions</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              Axis Bank offers a range of savings accounts tailored to meet the diverse needs of customers across different locations. With competitive features and customer-centric services, Axis Bank has established itself as one of India&apos;s leading private sector banks.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Understanding Minimum Balance Requirements</h3>
            
            <p className="italic mb-4">
              Minimum average balance varies by branch location. This flexible approach ensures that customers in different regions can access banking services that suit their financial capabilities and local economic conditions.
            </p>
            
            <p className="italic mb-4">
              Range: ₹2,500 to ₹10,000 for regular savings accounts. This wide range accommodates various customer segments, from students and young professionals to established individuals and families.
            </p>
            
            <p className="italic mb-4">
              Metro and urban branches usually require ₹5,000 average balance. These locations typically serve customers with higher income potential and greater banking needs.
            </p>
            
            <p className="italic mb-6">
              Semi-urban and rural branches often have lower balance requirements. This makes banking more accessible to customers in smaller towns and villages, promoting financial inclusion.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Customer-Centric Services</h3>
            
            <p className="italic mb-4">
              Complete application support for a smooth, hassle-free banking experience. Our dedicated team assists you through every step of the account opening process, ensuring all documentation is properly handled and your application is processed efficiently.
            </p>
            
            <p className="italic mb-6">
              No hidden charges — complete transparency for your peace of mind. We believe in clear communication about all fees and charges, so you always know what to expect from your banking relationship with us.
            </p>
            
            <div className="bg-emerald-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Special Offer</h4>
              <p className="text-emerald-700">
                New customers can enjoy exclusive benefits including cashback up to ₹250 when you open your account today! This limited-time offer is our way of welcoming you to the Axis Bank family.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Why Choose Axis Bank?</h4>
              <p className="text-gray-700 mb-3">
                With a vast network of branches and ATMs across India, Axis Bank provides convenient access to banking services. Our digital banking platform offers 24/7 access to your accounts, while our customer service team is always ready to assist you with any queries.
              </p>
              <p className="text-gray-700">
                Our savings accounts come with additional benefits like accidental insurance cover, access to exclusive investment products, and rewards through our loyalty programs. Experience modern banking with a personal touch.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}