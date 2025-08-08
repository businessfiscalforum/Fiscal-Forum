"use client";
import React, { useState } from "react";
import {
  Calculator,
  Mail,
  User,
  Phone,
  ArrowLeft,
  CheckCircle,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";

const GetQuote = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanAmount: 7500000,
    tenure: 20,
    interestRate: 8.5, // 👈 New: Dynamic interest rate
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'interestRate' || name === 'loanAmount' || name === 'tenure' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        loanAmount: formData.loanAmount,
        tenure: formData.tenure,
        interestRate: formData.interestRate, // Include in payload
        loanType: "home-loan",
      };

      console.log("Sending payload:", payload);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send-quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      setIsSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      loanAmount: 7500000,
      tenure: 20,
      interestRate: 8.5,
    });
  };

  // EMI Calculation: (P * R * (1+R)^N) / ((1+R)^N - 1)
  const calculateEMI = () => {
    const principal = formData.loanAmount;
    const monthlyRate = formData.interestRate / 12 / 100; // Convert annual to monthly
    const totalMonths = formData.tenure * 12;

    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) return 0;

    return Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  };

  const monthlyEMI = calculateEMI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-30 text-center">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Get Your Loan Quote</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Fill in your details below and we&apos;ll email you a personalized loan quote with EMI, interest, and eligibility.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {!isSubmitted ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-blue-600" />
              Request For Quote
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>


              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Email Me This Quote"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success State */
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quote Sent Successfully! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              A detailed home loan quote has been sent to{" "}
              <strong>{formData.email}</strong>. It includes your EMI breakdown,
              interest details, eligibility, and next steps.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-700 mb-6">
              <p>
                <strong>Loan Amount:</strong> ₹{formData.loanAmount.toLocaleString()}
              </p>
              <p>
                <strong>EMI:</strong> ₹{monthlyEMI.toLocaleString()}
              </p>
              <p>
                <strong>Tenure:</strong> {formData.tenure} years
              </p>
              <p>
                <strong>Interest Rate:</strong> {formData.interestRate}% p.a.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToForm}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Request Another Quote
              </button>
              <button
                onClick={() => router.push("/")}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuote;