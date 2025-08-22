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
  FaInfoCircle,
  FaCopy,
  FaCheckCircle,
  FaUsers,
  FaCalendarAlt,
  FaFileUpload,
} from "react-icons/fa";

export default function HealthInsuranceFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Personal, 2: Insurance Requirements, 3: Previous Policy, 4: Insurer Preference
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    policyType: "",
    membersCount: "",
    memberAges: "",
    preExistingDiseases: "",
    previousInsurer: "",
    policyExpiry: "",
    prevPolicyLink: "",
    insurerPrefs: [] as string[],
    otherInsurer: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const val = value;
      setFormData((prev) => {
        const selected = new Set(prev.insurerPrefs);
        if (checked) selected.add(val);
        else selected.delete(val);
        return { ...prev, insurerPrefs: Array.from(selected) };
      });
      // Clear error for insurerPrefs when user interacts
      if (errors.insurerPrefs) {
        setErrors((prev) => {
          const n = { ...prev };
          delete n.insurerPrefs;
          return n;
        });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const isDriveLink = (link: string) =>
    /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be a 10-digit number";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.policyType.trim()) newErrors.policyType = "Policy type is required";

    if (formData.membersCount && (!/^\d+$/.test(formData.membersCount) || Number(formData.membersCount) < 1)) {
      newErrors.membersCount = "Members count must be a positive number";
    }

    if (formData.memberAges && !/^\d+(,\s*\d+)*$/.test(formData.memberAges)) {
      newErrors.memberAges = "Use comma-separated ages (e.g., 25, 30, 45)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.policyExpiry && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.policyExpiry)) {
      newErrors.policyExpiry = "Use dd/mm/yyyy format";
    }

    if (formData.prevPolicyLink && !isDriveLink(formData.prevPolicyLink)) {
      newErrors.prevPolicyLink = "Enter a valid Google Drive link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.insurerPrefs.length === 0 && !formData.otherInsurer.trim()) {
      newErrors.insurerPrefs = "Select at least one insurer or specify 'Other'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const copyInstructions = () => {
    navigator.clipboard.writeText(
      "1. Upload your previous policy to Google Drive\n2. Right-click file → Get link\n3. Change permissions to 'Anyone with the link'\n4. Copy the link and paste here"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep4()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("policyType", formData.policyType);
      formDataToSend.append("membersCount", formData.membersCount);
      formDataToSend.append("memberAges", formData.memberAges);
      formDataToSend.append("preExistingDiseases", formData.preExistingDiseases);
      formDataToSend.append("previousInsurer", formData.previousInsurer);
      formDataToSend.append("policyExpiry", formData.policyExpiry);
      formDataToSend.append("prevPolicyLink", formData.prevPolicyLink);
      formDataToSend.append("insurerPrefs", JSON.stringify(formData.insurerPrefs));
      formDataToSend.append("otherInsurer", formData.otherInsurer);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health-insurance`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      setMessage({
        text: "Your health insurance request has been submitted successfully!",
        type: "success",
      });

      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          policyType: "",
          membersCount: "",
          memberAges: "",
          preExistingDiseases: "",
          previousInsurer: "",
          policyExpiry: "",
          prevPolicyLink: "",
          insurerPrefs: [],
          otherInsurer: "",
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
            Health Insurance Requirements
          </h1>
          <div className="w-16"></div>
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
              Health Insurance Form
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Provide your details, insurance requirements, previous policy information, and select your preferred insurers.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Personal Details", idx: 1 },
              { label: "Insurance Requirements", idx: 2 },
              { label: "Previous Policy Info", idx: 3 },
              { label: "Insurer Preference", idx: 4 },
            ].map((s, i) => (
              <div key={s.idx} className="flex flex-col md:flex-row items-center relative">
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s.idx ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s.idx}
                </div>

                {/* Step Label */}
                <span
                  className={`mt-2 md:mt-0 md:ml-2 text-center md:text-left ${
                    step === s.idx ? "text-emerald-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>

                {/* Connector line (only on larger screens) */}
                {/* {i < 3 && (
                  <div className="hidden md:block absolute top-4 left-full w-full h-1 bg-gray-200"></div>
                )} */}
              </div>
            ))}
          </div>


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
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaUser className="mr-2 text-emerald-600" /> Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaEnvelope className="mr-2 text-emerald-600" /> Email ID
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaPhone className="mr-2 text-emerald-600" /> Mobile Number <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Next Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                  >
                    Next: Insurance Requirements
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className="space-y-6">
                  {/* Policy Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Type of Policy <span className="text-red-500">*</span> (select one)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Individual", "Family Floater", "Senior Citizen", "Critical Illness", "Top-up Policy"].map((type) => (
                        <label key={type} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="policyType"
                            value={type}
                            checked={formData.policyType === type}
                            onChange={handleChange}
                            className="h-4 w-4 text-emerald-600 border-gray-300"
                          />
                          <span className="text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.policyType && <p className="mt-1 text-sm text-red-600">{errors.policyType}</p>}
                  </div>

                  {/* Members Count */}
                  <div>
                    <label htmlFor="membersCount" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaUsers className="mr-2 text-emerald-600" /> Total No. of Members to be Insured
                    </label>
                    <input
                      type="number"
                      id="membersCount"
                      name="membersCount"
                      value={formData.membersCount}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.membersCount ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Enter number of members"
                      min="1"
                    />
                    {errors.membersCount && <p className="mt-1 text-sm text-red-600">{errors.membersCount}</p>}
                  </div>

                  {/* Member Ages */}
                  <div>
                    <label htmlFor="memberAges" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaCalendarAlt className="mr-2 text-emerald-600" /> Age of Each Member (Comma-separated)
                    </label>
                    <input
                      type="text"
                      id="memberAges"
                      name="memberAges"
                      value={formData.memberAges}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.memberAges ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="e.g., 25, 30, 45"
                    />
                    {errors.memberAges && <p className="mt-1 text-sm text-red-600">{errors.memberAges}</p>}
                  </div>

                  {/* Pre-existing Diseases */}
                  <div>
                    <label htmlFor="preExistingDiseases" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaInfoCircle className="mr-2 text-emerald-600" /> Pre-Existing Diseases (if any)
                    </label>
                    <input
                      type="text"
                      id="preExistingDiseases"
                      name="preExistingDiseases"
                      value={formData.preExistingDiseases}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm"
                      placeholder="Describe any pre-existing conditions"
                    />
                  </div>
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
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                  >
                    Next: Previous Policy Info
                  </button>
                </div>
              </>
            ) : step === 3 ? (
              <>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">
                    Previous Policy Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Previous Insurer */}
                    <div>
                      <label htmlFor="previousInsurer" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaBuilding className="mr-2 text-emerald-600" /> Previous Insurer Name
                      </label>
                      <input
                        type="text"
                        id="previousInsurer"
                        name="previousInsurer"
                        value={formData.previousInsurer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm"
                        placeholder="Enter insurer name"
                      />
                    </div>

                    {/* Policy Expiry */}
                    <div>
                      <label htmlFor="policyExpiry" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaCalendarAlt className="mr-2 text-emerald-600" /> Policy Expiry Date
                      </label>
                      <input
                        type="text"
                        id="policyExpiry"
                        name="policyExpiry"
                        value={formData.policyExpiry}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.policyExpiry ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                        placeholder="dd/mm/yyyy"
                      />
                      {errors.policyExpiry && <p className="mt-1 text-sm text-red-600">{errors.policyExpiry}</p>}
                    </div>
                  </div>

                  {/* Previous Policy Upload */}
                  <div>
                    <label htmlFor="prevPolicyLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaFileUpload className="mr-2 text-emerald-600" /> Upload Previous Policy Copy (optional)
                    </label>
                    <input
                      type="url"
                      id="prevPolicyLink"
                      name="prevPolicyLink"
                      value={formData.prevPolicyLink}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.prevPolicyLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="https://drive.google.com/file/d/..."
                    />
                    {errors.prevPolicyLink && <p className="mt-1 text-sm text-red-600">{errors.prevPolicyLink}</p>}
                    <p className="mt-2 text-sm text-gray-600">
                      If uploaded, we&apos;ll provide you with the best available renewal price.
                    </p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-5">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-emerald-800 font-medium mb-2">
                          How to get a public Google Drive link:
                        </p>
                        <ol className="list-decimal pl-5 space-y-1 text-emerald-700">
                          <li>Upload your previous policy to Google Drive</li>
                          <li>Right-click the file and select &quot;Get link&quot;</li>
                          <li>Change permissions to &quot;Anyone with the link can view&quot;</li>
                          <li>Copy the link and paste it above</li>
                        </ol>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyInstructions}
                      className="mt-4 flex items-center text-emerald-600 hover:text-emerald-800 text-sm"
                    >
                      <FaCopy className="mr-1" /> {copied ? "Copied!" : "Copy instructions"}
                      {copied && <FaCheckCircle className="ml-1 text-green-500" />}
                    </button>
                  </div>
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
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                  >
                    Next: Insurer Preference
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Step 4: Insurer Preference */}
                <div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">
                    Insurer Preference
                  </h3>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Select one or more</p>
                    {errors.insurerPrefs && <p className="mt-1 text-sm text-red-600">{errors.insurerPrefs}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Niva Bupa", "Star Health", "HDFC Ergo", "Aditya Birla", "Care Health", "Manipal Cigna"].map((ins) => (
                        <label key={ins} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            value={ins}
                            checked={formData.insurerPrefs.includes(ins)}
                            onChange={handleChange}
                            className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{ins}</span>
                        </label>
                      ))}

                      {/* Other */}
                      <div className="sm:col-span-2 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          value="Other"
                          checked={formData.insurerPrefs.includes("Other")}
                          onChange={handleChange}
                          className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                        />
                        <span className="text-gray-700">Other:</span>
                        <input
                          type="text"
                          name="otherInsurer"
                          value={formData.otherInsurer}
                          onChange={handleChange}
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700"
                          placeholder="Enter other insurer"
                          disabled={!formData.insurerPrefs.includes("Other")}
                        />
                      </div>
                    </div>
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
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          <h3 className="text-xl font-bold text-emerald-900 mb-4">Process Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 1</div>
              <p className="text-gray-700">Fill in your personal details</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 2</div>
              <p className="text-gray-700">Select policy type and member details</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 3</div>
              <p className="text-gray-700">Provide previous policy information</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 4</div>
              <p className="text-gray-700">Choose your preferred insurers</p>
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
            <Link href="/contact" className="text-emerald-600 hover:underline font-medium">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
