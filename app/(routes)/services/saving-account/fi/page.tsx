"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaCheck, FaArrowLeft } from "react-icons/fa";

export default function FiBankPage() {
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
            FI Bank Savings Account
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
              <h2 className="text-2xl font-bold text-gray-800">FI Bank</h2>
              <p className="text-emerald-600">Zero Balance Freedom</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-6 text-lg">
              FI Bank offers a revolutionary zero balance savings account with no minimum balance requirements, giving you complete financial freedom. Our innovative banking solution is designed for the modern customer who values flexibility and convenience above all else.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">The Freedom of Zero Balance Banking</h3>
            
            <p className="italic mb-4">
              Enjoy hassle-free banking with our zero balance account — no minimum balance, total freedom. This means you never have to worry about maintaining a specific account balance to avoid penalty charges. Whether you&apos;re a student, a freelancer, or someone who prefers to keep minimal funds in your savings account, our zero balance offering ensures your money works for you without unnecessary restrictions.
            </p>
            
            <p className="italic mb-4">
              Zero balance savings account: keep your money flexible, with no balance requirements ever. Unlike traditional banks that impose monthly average balance requirements, FI Bank eliminates this constraint entirely. You have the liberty to maintain any balance that suits your financial situation, from zero rupees to any amount you choose, without incurring additional fees or charges.
            </p>
            
            <p className="italic mb-6">
              Open your zero balance account — simple, convenient, and no minimum balance to maintain. The account opening process is streamlined and digital-first, allowing you to complete your application in minutes from the comfort of your home. Once activated, you enjoy all the benefits of a full-featured savings account without the burden of meeting balance requirements.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Advanced Banking Features</h3>
            
            <p className="italic mb-4">
              Instant account opening with Aadhaar-based KYC ensures you can start banking immediately. Our paperless onboarding process uses your Aadhaar details for quick verification, getting you started within minutes of completing your application. This seamless experience reflects our commitment to making banking accessible and efficient for everyone.
            </p>
            
            <p className="italic mb-6">
              24/7 mobile banking with advanced security features gives you complete control over your finances anytime, anywhere. Our intuitive mobile application provides access to all account services, from fund transfers to bill payments, protected by industry-leading security protocols including biometric authentication and end-to-end encryption.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-8 mb-4">Global Banking Convenience</h3>
            
            <p className="italic mb-6">
              Free debit card with zero forex markup on international transactions means you can travel and shop globally without worrying about additional fees. Whether you&apos;re making purchases abroad or withdrawing cash from international ATMs, you retain the full value of your money without hidden currency conversion charges.
            </p>
            
            <div className="bg-emerald-50 p-6 rounded-2xl mt-8">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Special Offer</h4>
              <p className="text-emerald-700">
                New customers can enjoy exclusive benefits including cashback up to ₹250 when you open your account today! This limited-time offer is our way of welcoming you to experience the future of banking with complete financial freedom.
              </p>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <h4 className="font-bold text-emerald-800 text-lg mb-3">Why Choose FI Bank?</h4>
              <p className="text-gray-700 mb-3">
                With our zero balance savings account, you gain access to a full suite of banking services without the traditional constraints. Our digital-first approach means faster processing, real-time notifications, and a customer experience designed around your needs.
              </p>
              <p className="text-gray-700">
                Join thousands of satisfied customers who have made the switch to experience hassle-free banking. Our commitment to transparency, innovation, and customer satisfaction has made us a preferred choice for modern banking needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}