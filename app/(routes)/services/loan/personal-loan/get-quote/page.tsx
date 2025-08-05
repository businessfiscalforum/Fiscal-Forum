"use client";

import React, { useState } from "react";
import {
  Calculator,
  Building,
  Mail,
  User,
  Phone,
  Clock,
  ArrowLeft,
  CheckCircle,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LapLoanGetQuotePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanAmount: 7500000,
    tenure: 20,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        loanAmount: Number(formData.loanAmount),
        tenure: Number(formData.tenure),
        loanType: "personal-loan"
      };

      console.log("Sending payload:", payload); // 🟡 Log what you're sending

      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status); // 🟡 Log status
      const result = await response.json();
      console.log("Response data:", result); // 🟡 Log full response
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
    });
  };

  const calculateEMI = () => {
    const principal = formData.loanAmount;
    const rate = 8.5 / 12 / 100; // Assume 8.5% interest
    const time = formData.tenure * 12;
    return Math.round(
      (principal * rate * Math.pow(1 + rate, time)) /
        (Math.pow(1 + rate, time) - 1)
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
            <h1 className="text-3xl md:text-4xl font-bold">
              Get Your Loan Quote
            </h1>
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

              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹):{" "}
                  {parseInt(formData.loanAmount.toString()).toLocaleString()}
                </label>
                <div className="relative mt-2">
                  <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    name="loanAmount"
                    min="100000"
                    max="50000000"
                    step="200000"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer pl-10"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                    <span>₹5 L</span>
                    <span>₹5 Cr</span>
                  </div>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure: {formData.tenure} years
                </label>
                <div className="relative mt-2">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    name="tenure"
                    min="5"
                    max="30"
                    step="1"
                    value={formData.tenure}
                    onChange={handleChange}
                    className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer pl-10"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                    <span>5Y</span>
                    <span>30Y</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Estimated EMI
                </h3>
                <div className="text-2xl font-bold text-blue-600">
                  ₹{monthlyEMI.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  At 8.5% interest rate for {formData.tenure} years
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
                <strong>Loan Amount:</strong> ₹
                {formData.loanAmount.toLocaleString()}
              </p>
              <p>
                <strong>EMI:</strong> ₹{monthlyEMI.toLocaleString()}
              </p>
              <p>
                <strong>Tenure:</strong> {formData.tenure} years
              </p>
              <p>
                <strong>Interest Rate:</strong> 8.5% p.a.
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

export default LapLoanGetQuotePage;
