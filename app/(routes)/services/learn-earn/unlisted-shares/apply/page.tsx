"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCheck,
  FaUser,
  FaFileInvoice,
  FaMobileAlt,
  FaSpinner,
} from "react-icons/fa";

export default function IPOPage() {
  const router = useRouter();
  const [isTransferSubmitting, setIsTransferSubmitting] = useState(false);
  const [transferMessage, setTransferMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [transferErrors, setTransferErrors] = useState<Record<string, string>>(
    {}
  );
  const [formData, setFormData] = useState({
    fullName: "",
    clientCode: "",
    panNo: "",
    mobileNo: "",
    consistency: "",
    traderType: [] as string[],
    existingBroker: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (transferErrors[name]) {
      setTransferErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox changes for traderType
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newTraderTypes = checked
        ? [...prev.traderType, value]
        : prev.traderType.filter((type) => type !== value);

      return { ...prev, traderType: newTraderTypes };
    });

    // Clear error when user selects an option
    if (transferErrors.traderType && checked) {
      setTransferErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.traderType;
        return newErrors;
      });
    }
  };

  const validateTransferForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.clientCode.trim()) {
      newErrors.clientCode = "Client Code is required";
    }

    if (!formData.panNo.trim()) {
      newErrors.panNo = "PAN Number is required";
    } else if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase())
    ) {
      newErrors.panNo = "Invalid PAN format";
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Must be 10 digits";
    }

    if (!formData.consistency.trim()) {
      newErrors.consistency = "Investment Consistency is required";
    }

    if (formData.traderType.length === 0) {
      newErrors.traderType = "Select at least one trader type";
    }

    if (!formData.existingBroker.trim()) {
      newErrors.existingBroker = "Existing Broker is required";
    }

    setTransferErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTransferForm()) {
      return;
    }

    setIsTransferSubmitting(true);
    setTransferMessage(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "traderType") {
          // Handle array values
          (value as string[]).forEach((val) => formDataToSend.append(key, val));
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investment-form`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      setTransferMessage({
        text: "Thank you, your application is submitted. Our representative will contact you shortly.",
        type: "success",
      });

      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          clientCode: "",
          panNo: "",
          mobileNo: "",
          consistency: "",
          traderType: [],
          existingBroker: "",
        });
        setTransferErrors({});
      }, 3000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      setTransferMessage({
        text: error.message || "Failed to submit the form. Please try again.",
        type: "error",
      });
    } finally {
      setIsTransferSubmitting(false);
    }
  };

  // Trader type options for checkboxes
  const traderTypeOptions = [
    { value: "Intraday", label: "Intraday Trader" },
    { value: "Swing", label: "Swing Trader" },
    { value: "Positional", label: "Positional Trader" },
    { value: "Long-term", label: "Long-term Investor" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-30 px-4 sm:px-6">
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
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">
            Unlisted Shares
          </h1>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </motion.div>

        {/* IPO Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaFileInvoice className="text-3xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
              Investment Profile Form
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              Submit your investment profile for Unlisted Shares applications.
            </p>
          </div>

          {transferMessage && (
            <div
              className={`mb-6 p-4 rounded-2xl text-center ${
                transferMessage.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {transferMessage.type === "success" ? (
                <FaCheck className="inline mr-2" />
              ) : null}
              {transferMessage.text}
            </div>
          )}

          <form onSubmit={handleTransferSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <FaUser className="mr-2 text-emerald-600" /> Full Name{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    transferErrors.fullName
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                  placeholder="Enter your full name"
                />
                {transferErrors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.fullName}
                  </p>
                )}
              </div>

              {/* Client Code */}
              <div>
                <label
                  htmlFor="clientCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Client Code <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="clientCode"
                  name="clientCode"
                  value={formData.clientCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    transferErrors.clientCode
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                  placeholder="Your client code"
                />
                {transferErrors.clientCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.clientCode}
                  </p>
                )}
              </div>

              {/* PAN Number */}
              <div>
                <label
                  htmlFor="panNo"
                  className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <FaFileInvoice className="mr-2 text-emerald-600" /> PAN
                  Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="panNo"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border uppercase ${
                    transferErrors.panNo
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                  placeholder="ABCDE1234F"
                />
                {transferErrors.panNo && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.panNo}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="mobileNo"
                  className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <FaMobileAlt className="mr-2 text-emerald-600" /> Mobile
                  Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    transferErrors.mobileNo
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                  placeholder="10-digit mobile number"
                />
                {transferErrors.mobileNo && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.mobileNo}
                  </p>
                )}
              </div>

              {/* Investment Consistency */}
              <div>
                <label
                  htmlFor="consistency"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Investment Consistency{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="consistency"
                  name="consistency"
                  value={formData.consistency}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    transferErrors.consistency
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                >
                  <option value="">Select consistency level</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                {transferErrors.consistency && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.consistency}
                  </p>
                )}
              </div>

              {/* Trader Type - Checkboxes */}
              <div>
                <label
                  htmlFor="traderType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Trader Type <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {traderTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`traderType-${option.value}`}
                        value={option.value}
                        checked={formData.traderType.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <label
                        htmlFor={`traderType-${option.value}`}
                        className="ml-2 text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {transferErrors.traderType && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.traderType}
                  </p>
                )}
              </div>

              {/* Existing Broker */}
              <div>
                <label
                  htmlFor="existingBroker"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Existing Broker <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="existingBroker"
                  name="existingBroker"
                  value={formData.existingBroker}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    transferErrors.existingBroker
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                >
                  <option value="">Select Your Broker</option>
                  <option value="Motilal Oswal">Motilal Oswal</option>
                </select>
                {transferErrors.existingBroker && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.existingBroker}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isTransferSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center ${
                  isTransferSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                }`}
              >
                {isTransferSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Submitting...
                  </>
                ) : (
                  "Submit Investment Profile"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}