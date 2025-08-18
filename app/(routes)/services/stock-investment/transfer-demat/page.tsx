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
} from "react-icons/fa";

export default function TransferDematPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Form, 2: Drive Link
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentBroker: "Motilal Oswal",
    newClientId: "",
    driveLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateFormStep1 = () => {
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

    if (!formData.newClientId.trim()) {
      newErrors.newClientId = "New Client ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFormStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.driveLink.trim()) {
      newErrors.driveLink = "Google Drive link is required";
    } else if (
      !formData.driveLink.includes("drive.google.com") ||
      !formData.driveLink.includes("/file/d/")
    ) {
      newErrors.driveLink = "Please enter a valid Google Drive file link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFormStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    // Clear drive link error when going back
    if (errors.driveLink) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.driveLink;
        return newErrors;
      });
    }
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(
      "1. Upload your CMR/DIS to Google Drive\n2. Right-click file → Get link\n3. Change permissions to 'Anyone with the link'\n4. Copy the link and paste here"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormStep2()) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

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

      setMessage({
        text: "Your transfer request has been submitted successfully! We will contact you shortly.",
        type: "success",
      });

      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          currentBroker: "Motilal Oswal",
          newClientId: "",
          driveLink: "",
        });
        setStep(1);
        setErrors({});
      }, 3000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      setMessage({
        text: error.message || "Failed to submit the form. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Demat Account Transfer
          </h1>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaFileAlt className="text-3xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Transfer Request Form
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Initiate your demat account transfer by providing your details and
              sharing your CMR/DIS document from Google Drive.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 1
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <span
                className={`ml-2 ${
                  step === 1 ? "text-emerald-600 font-medium" : "text-gray-500"
                }`}
              >
                Personal Details
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 2
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={`ml-2 ${
                  step === 2 ? "text-emerald-600 font-medium" : "text-gray-500"
                }`}
              >
                Document Link
              </span>
            </div>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl text-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <FaCheck className="inline mr-2" />
              ) : null}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
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
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fullName}
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
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                        errors.newClientId
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Your new demat account client ID"
                    />
                    {errors.newClientId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.newClientId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Current Broker (Read-only) */}
                <div>
                  <label
                    htmlFor="currentBroker"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                  >
                    <FaBuilding className="mr-2 text-emerald-600" /> Current
                    Broker
                  </label>
                  <input
                    type="text"
                    id="currentBroker"
                    name="currentBroker"
                    value={formData.currentBroker}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
                  />
                </div>

                {/* Next Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                  >
                    Next: Upload Document
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Drive Link */}
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
                          <li>Right-click the file and select &quot;Get link&quot;</li>
                          <li>
                            Change permissions to &quot;Anyone with the link can view&quot;
                          </li>
                          <li>Copy the link and paste it below</li>
                        </ol>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={copyInstructions}
                      className="mt-4 flex items-center text-emerald-600 hover:text-emerald-800 text-sm"
                    >
                      <FaCopy className="mr-1" />{" "}
                      {copied ? "Copied!" : "Copy instructions"}
                      {copied && <FaCheckCircle className="ml-1 text-green-500" />}
                    </button>
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
                        errors.driveLink ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="https://drive.google.com/file/d/..."
                    />
                    {errors.driveLink && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.driveLink}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </motion.div>

        {/* Information Section */}
        <motion.div
          className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-emerald-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-emerald-900 mb-4">
            Transfer Process Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 1</div>
              <p className="text-gray-700">
                Fill in your personal details and new client ID
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 2</div>
              <p className="text-gray-700">
                Upload CMR/DIS to Google Drive and share the link
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 3</div>
              <p className="text-gray-700">Submit and wait for confirmation</p>
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