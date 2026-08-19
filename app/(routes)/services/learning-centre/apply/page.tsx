"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaCheck, FaArrowLeft, FaFileInvoice, FaMobileAlt, FaUser } from "react-icons/fa";

export default function UnlistedSharesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    clientCode: "",
    panNo: "",
    mobileNo: "",
    consistency: "",
    traderType: "",
    existingBroker: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.clientCode.trim()) newErrors.clientCode = "Client Code is required";
    if (!formData.panNo.trim()) {
      newErrors.panNo = "PAN Number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase())) {
      newErrors.panNo = "Invalid PAN format";
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Must be 10 digits";
    }
    if (!formData.consistency.trim()) newErrors.consistency = "Required";
    if (!formData.traderType.trim()) newErrors.traderType = "Required";
    if (!formData.existingBroker.trim()) newErrors.existingBroker = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investment-form`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit");
      }

      setMessage({
        text: "Form submitted successfully!",
        type: "success",
      });

      setTimeout(() => {
        setFormData({
          name: "",
          clientCode: "",
          panNo: "",
          mobileNo: "",
          consistency: "",
          traderType: "",
          existingBroker: "",
        });
        setErrors({});
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage({
        text: error.message || "Submission failed",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Unlisted Shares
          </h1>
          <div className="w-16"></div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
            Investment Profile Form
          </h2>

          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message.type === "success" ? <FaCheck className="inline mr-2" /> : null}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaUser className="mr-2 text-green-600" /> Full Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Code <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="clientCode"
                  value={formData.clientCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.clientCode ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="Your client code"
                />
                {errors.clientCode && <p className="mt-1 text-sm text-red-600">{errors.clientCode}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaFileInvoice className="mr-2 text-green-600" /> PAN Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border uppercase ${
                    errors.panNo ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="ABCDE1234F"
                />
                {errors.panNo && <p className="mt-1 text-sm text-red-600">{errors.panNo}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaMobileAlt className="mr-2 text-green-600" /> Mobile Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.mobileNo ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="10-digit mobile number"
                />
                {errors.mobileNo && <p className="mt-1 text-sm text-red-600">{errors.mobileNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Consistency <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="consistency"
                  value={formData.consistency}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.consistency ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                >
                  <option value="">Select consistency level</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                {errors.consistency && <p className="mt-1 text-sm text-red-600">{errors.consistency}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trader Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="traderType"
                  value={formData.traderType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.traderType ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                >
                  <option value="">Select trader type</option>
                  <option value="Intraday">Intraday Trader</option>
                  <option value="Swing">Swing Trader</option>
                  <option value="Positional">Positional Trader</option>
                  <option value="Long-term">Long-term Investor</option>
                </select>
                {errors.traderType && <p className="mt-1 text-sm text-red-600">{errors.traderType}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Existing Broker <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="existingBroker"
                  value={formData.existingBroker}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.existingBroker ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="Current broker name"
                />
                {errors.existingBroker && <p className="mt-1 text-sm text-red-600">{errors.existingBroker}</p>}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Investment Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}