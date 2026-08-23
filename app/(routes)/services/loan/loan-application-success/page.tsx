"use client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const LoanApplicationSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your loan application has been successfully submitted.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Our team will review your details and get back to you within 24 hours.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LoanApplicationSuccessPage;
