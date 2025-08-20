"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCheck,
  FaUser,
  FaBuilding,
  FaFileAlt,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaInfoCircle,
  FaCopy,
  FaCheckCircle,
  FaSpinner,
  FaGift,
  FaRupeeSign,
  FaHeadset,
  FaWhatsapp,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import { TrendingUp } from "lucide-react";

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
  const [transferErrors, setTransferErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentBroker: "",
    newClientId: "",
    driveLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (transferErrors[name]) {
      setTransferErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateTransferForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be a 10-digit number";
    }

    if (!formData.currentBroker.trim()) {
      newErrors.currentBroker = "Current broker name is required";
    }

    if (!formData.newClientId.trim()) {
      newErrors.newClientId = "New Client ID is required";
    }

    if (!formData.driveLink.trim()) {
      newErrors.driveLink = "Google Drive link is required";
    } else if (
      !formData.driveLink.includes("drive.google.com") ||
      !formData.driveLink.includes("/file/d/")
    ) {
      newErrors.driveLink = "Please enter a valid Google Drive file link";
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
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("currentBroker", formData.currentBroker);
      formDataToSend.append("newClientId", formData.newClientId);
      formDataToSend.append("driveLink", formData.driveLink);

      const response = await fetch("/api/transfer-demat", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      setTransferMessage({
        text: "Thank you, your application is submitted. Our representation will contact you shortly.",
        type: "success",
      });

      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          currentBroker: "",
          newClientId: "",
          driveLink: "",
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
      setSubscribeMessage({ text: "Please enter your email address", type: "error" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubscribeSubmitting(true);
    setSubscribeMessage(null);

    try {
      // Simulate API call
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubscribeMessage({ text: data.message || "Thank you for subscribing!", type: "success" });
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
          {/* Left Column - Transfer Demat Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaFileAlt className="text-3xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                Transfer Your Demat Holdings
              </h2>
              <p className="text-gray-600 mt-2 text-center">
                Transfer your holdings to your existing stock broker. Note: You
                don&apos;t have to shift your broker. We&apos;ll resolve all
                your issues and provide high rewards & brokerage sharing.
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
                      transferErrors.fullName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    placeholder="Enter your full name"
                  />
                  {transferErrors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {transferErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FaEnvelope className="mr-2 text-emerald-600" /> Email
                    Address <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      transferErrors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    placeholder="you@example.com"
                  />
                  {transferErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{transferErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FaPhone className="mr-2 text-emerald-600" /> Phone Number{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      transferErrors.phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    placeholder="10-digit mobile number"
                  />
                  {transferErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{transferErrors.phone}</p>
                  )}
                </div>

                {/* New Client ID */}
                <div>
                  <label
                    htmlFor="newClientId"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FaUser className="mr-2 text-emerald-600" /> New Client ID{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="newClientId"
                    name="newClientId"
                    value={formData.newClientId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      transferErrors.newClientId ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    placeholder="Your new demat account client ID"
                  />
                  {transferErrors.newClientId && (
                    <p className="mt-1 text-sm text-red-600">
                      {transferErrors.newClientId}
                    </p>
                  )}
                </div>
              </div>

              {/* Current Broker */}
              <div>
                <label
                  htmlFor="currentBroker"
                  className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <FaBuilding className="mr-2 text-emerald-600" /> Current
                  Broker <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="currentBroker"
                  name="currentBroker"
                  value={formData.currentBroker}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    transferErrors.currentBroker ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                  placeholder="Enter your current broker name"
                />
                {transferErrors.currentBroker && (
                  <p className="mt-1 text-sm text-red-600">
                    {transferErrors.currentBroker}
                  </p>
                )}
              </div>

              {/* Drive Link */}
              <div>
                <h3 className="text-xl font-bold text-emerald-900 mb-4">
                  Share Your CMR/DIS Document
                </h3>

                <div className="bg-emerald-50 rounded-xl p-5 mb-6">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-emerald-800 font-medium mb-2">
                        How to get a public Google Drive link:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-emerald-700">
                        <li>Upload your CMR/DIS document to Google Drive</li>
                        <li>
                          Right-click the file and select &quot;Get link&quot;
                        </li>
                        <li>
                          Change permissions to &quot;Anyone with the link can
                          view&quot;
                        </li>
                        <li>Copy the link and paste it below</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="driveLink"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FaLink className="mr-2 text-emerald-600" /> Google Drive
                    Link <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="url"
                    id="driveLink"
                    name="driveLink"
                    value={formData.driveLink}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      transferErrors.driveLink ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    placeholder="https://drive.google.com/file/d/...    "
                  />
                  {transferErrors.driveLink && (
                    <p className="mt-1 text-sm text-red-600">
                      {transferErrors.driveLink}
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
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>

            {/* How It Works */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-900 mb-4 text-center">
                How to Transfer Your Holdings
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    1
                  </div>
                  <p className="text-gray-700">
                    Fill in your details and new client ID
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    2
                  </div>
                  <p className="text-gray-700">
                    Upload CMR/DIS to Google Drive and share the link
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    3
                  </div>
                  <p className="text-gray-700">
                    We handle the rest and coordinate with your broker
                  </p>
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

        {/* Discussion Call Section */}
        <motion.div
          className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-emerald-200 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">
            Discussion Call
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center">
              <FaPhone className="text-emerald-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600">Call us at</p>
                <a
                  href="tel:8696060387"
                  className="text-xl font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  8696060387
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <FaWhatsapp className="text-emerald-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600">WhatsApp us at</p>
                <a
                  href="https://wa.me/918696060387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  8696060387
                </a>
              </div>
            </div>
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