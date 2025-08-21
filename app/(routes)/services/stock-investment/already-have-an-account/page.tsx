"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheck,
  FaUser,
  FaFileInvoice,
  FaMobileAlt,
  FaInfoCircle,
  FaSpinner,
  FaGift,
  FaRupeeSign,
  FaHeadset,
  FaWhatsapp,
  FaChartLine,
  FaBell,
  FaPhone,
  FaFileAlt,
} from "react-icons/fa";
import { TrendingUp } from "lucide-react";
import { TbReportSearch } from "react-icons/tb";

export default function TransferDematPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isTransferSubmitting, setIsTransferSubmitting] = useState(false);
  const [isSubscribeSubmitting, setIsSubscribeSubmitting] = useState(false);
  const [transferMessage, setTransferMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [subscribeMessage, setSubscribeMessage] = useState<{
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transfer-demat`, {
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

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setSubscribeMessage({
        text: "Please enter your email address",
        type: "error",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeMessage({
        text: "Please enter a valid email address",
        type: "error",
      });
      return;
    }

    setIsSubscribeSubmitting(true);
    setSubscribeMessage(null);

    try {
      // Simulate API call
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubscribeMessage({
          text: data.message || "Thank you for subscribing!",
          type: "success",
        });
        setEmail("");
      } else {
        setSubscribeMessage({
          text: data.error || "Subscription failed",
          type: "error",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubscribeMessage({
        text: "Subscription failed. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubscribeSubmitting(false);
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
      <div className="max-w-7xl mx-auto">
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
            Holdings Transfer & Research Reports
          </h1>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - IPO Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaFileInvoice className="text-3xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                Transfer Your Sub-Broker Holdings with Us
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Transfer your holdings to your existing stock broker. Note: You
                don&apos;t have to shift your broker. Your current plan will not
                change. You will be added to a dedicated channel for support.
                We&apos;ll resolve all your issues and provide high rewards &
                brokerage sharing.
              </p>
              {/* <p className="text-yellow-600 mt-2 text-center">
                Currently with Motilal Oswal
              </p> */}
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
                <div className="md:col-span-2">
                  <label
                    htmlFor="traderType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Trader Type <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                {/* Existing Broker */}
                <div className="md:col-span-2">
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
                    "Submit"
                  )}
                </button>
              </div>
            </form>

            {/* How It Works */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 text-center">
                How to Transfer Your Sub-broker Holdings with Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    1
                  </div>
                  <p className="text-gray-700">
                    Fill in your details and client ID
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    2
                  </div>
                  <p className="text-gray-700">
                    We handle the rest and coordinate with your broker
                  </p>
                </div>
                {/* <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    3
                  </div>
                  <p className="text-gray-700">
                    Submit your application through your broker
                  </p>
                </div> */}
              </div>
            </div>
            <div className="mt-8 bg-white rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 text-center">
                Benefits of Transferring
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <FaGift className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-800">
                    Free Reports
                  </h4>
                  <p className="text-sm text-gray-600">
                    Exclusive research reports
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <FaRupeeSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-800">
                    50% Brokerage Cashback for 6 months
                  </h4>
                  <p className="text-sm text-gray-600">
                    15% brokerage sharing for 5 yrs
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <FaHeadset className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-800">Support</h4>
                  <p className="text-sm text-gray-600">Dedicated assistance</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Research Reports */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-2 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-full mb-8 shadow-2xl">
                  <TbReportSearch className="text-white text-4xl" />
                </div>
              </motion.div>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get Smarter Market Insights Delivered Daily
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay ahead of the curve with expert-curated market reports,
                pre-market updates, and IPO alerts — straight to your inbox.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-10 h-10 text-green-600 mr-3" />
                <span className="text-lg font-semibold text-gray-700">
                  Daily Market Reports
                </span>
              </div>

              {/* Wrapped subscription form */}
              <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700"
                    disabled={isSubscribeSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubscribeSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:opacity-70 text-white font-bold rounded-lg transition flex items-center justify-center"
                >
                  {isSubscribeSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Processing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </form>

              {subscribeMessage && (
                <div
                  className={`mt-4 text-sm px-4 py-3 rounded-lg text-center ${
                    subscribeMessage.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {subscribeMessage.text}
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Unsubscribe anytime. Your data is secure with us.
              </p>
            </div>

            {/* Research Reports Features */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-6 text-center">
                What You&apos;ll Receive
              </h3>
              <div className="space-y-6">
                {/* Pre-Market Report */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-emerald-800">
                      Pre-Market Report
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Get early insights on market trends, key developments, and
                      trading strategies before the market opens. Stay prepared
                      with actionable intelligence.
                    </p>
                  </div>
                </div>

                {/* Thematic Report */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <FaFileAlt className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-emerald-800">
                      Thematic Report
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Deep-dive analysis on emerging themes and sectoral
                      opportunities. Understand long-term trends shaping the
                      investment landscape.
                    </p>
                  </div>
                </div>

                {/* Equity Research Report */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <FaChartLine className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-emerald-800">
                      Equity Research Report
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Comprehensive stock analysis with target prices, financial
                      insights, and buy/sell recommendations from our expert
                      research team.
                    </p>
                  </div>
                </div>

                {/* IPO Alert */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <FaBell className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-emerald-800">
                      IPO Alerts
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Timely notifications and analysis of upcoming IPOs with
                      subscription details, valuation insights, and investment
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks Section */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 text-center">
                Benefits of Subscribing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <FaGift className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-800">
                    Free Reports
                  </h4>
                  <p className="text-sm text-gray-600">
                    Exclusive research reports
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <FaRupeeSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-800">Zero Fees</h4>
                  <p className="text-sm text-gray-600">No hidden charges</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl text-center">
                  <FaHeadset className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-emerald-800">Support</h4>
                  <p className="text-sm text-gray-600">Dedicated assistance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* <motion.div
          className="mt-12 text-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
            Perks of Transferring with Us
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-green-800">
            <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
              <FaGift className="text-emerald-700 text-xl" />
              <span>Free Research Reports</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
              <FaRupeeSign className="text-emerald-700 text-xl" />
              <span>50% Brokerage Cashback for 6 months</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
              <FaHeadset className="text-emerald-700 text-xl" />
              <span>Dedicated Support</span>
            </div>
          </div>
        </motion.div> */}

        {/* Discussion Call Section */}
        <motion.div
          className="mt-12 relative bg-gradient-to-r from-emerald-100 via-white to-emerald-50 rounded-3xl shadow-xl p-10 border border-emerald-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-20" />

          <h3 className="text-3xl font-extrabold text-emerald-900 mb-4 text-center">
            Talk to Expert
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mb-8"></div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Call Button */}
            <a
              href="tel:8696060387"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <FaPhone className="text-lg" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/918696060387"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              <FaWhatsapp className="text-lg" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-8 text-center text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Need help?{" "}
            <Link
              href="/contact"
              className="text-emerald-600 hover:underline font-medium"
            >
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
