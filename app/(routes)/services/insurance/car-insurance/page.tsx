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

export default function CarInsuranceFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Personal, 2: Vehicle & Insurance, 3: Docs & Preference
  const [copied, setCopied] = useState(false);

  const insuranceTypes = [ "OD", "Comprehensive", "Third Party" ];
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    previousInsurer: "",
    policyExpiry: "",
    rcLink: "",
    prevInsuranceLink: "",
    insurerPrefs: [] as string[],
    otherInsurer: "",
    registrationNumber: "",
    insuranceType: "",
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

    // Both fields optional, but validate if present
    if (formData.policyExpiry && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.policyExpiry)) {
      newErrors.policyExpiry = "Use dd/mm/yyyy format";
    }

    if(!formData.registrationNumber || !/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{1,4}$/.test(formData.registrationNumber)){
      newErrors.registrationNumber = "Enter a valid registration number";
    }
    
    if(!formData.insuranceType || formData.insuranceType === ""){
      newErrors.insuranceType = "Choose a insurance type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.rcLink.trim()) newErrors.rcLink = "RC Copy link is required";
    else if (!isDriveLink(formData.rcLink)) newErrors.rcLink = "Enter a valid Google Drive link";

    if (!formData.prevInsuranceLink.trim()) newErrors.prevInsuranceLink = "Previous Insurance link is required";
    else if (!isDriveLink(formData.prevInsuranceLink)) newErrors.prevInsuranceLink = "Enter a valid Google Drive link";

    if (formData.insurerPrefs.length === 0 && !formData.otherInsurer.trim()) {
      newErrors.insurerPrefs = "Select at least one insurer or specify 'Other'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const copyInstructions = () => {
    navigator.clipboard.writeText(
      "1. Upload your RC & Previous Insurance to Google Drive\n2. Right-click file → Get link\n3. Change permissions to 'Anyone with the link'\n4. Copy the link and paste here"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep3()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("previousInsurer", formData.previousInsurer);
      formDataToSend.append("policyExpiry", formData.policyExpiry);
      formDataToSend.append("rcLink", formData.rcLink);
      formDataToSend.append("prevInsuranceLink", formData.prevInsuranceLink);
      formDataToSend.append("insurerPrefs", JSON.stringify(formData.insurerPrefs));
      formDataToSend.append("otherInsurer", formData.otherInsurer);
      formDataToSend.append("registrationNumber", formData.registrationNumber);
      formDataToSend.append("insuranceType", formData.insuranceType);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car-insurance`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      setMessage({
        text: "Your car insurance request has been submitted successfully!",
        type: "success",
      });

      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          previousInsurer: "",
          policyExpiry: "",
          rcLink: "",
          prevInsuranceLink: "",
          insurerPrefs: [],
          otherInsurer: "",
          registrationNumber: "",
          insuranceType: "",
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
            Car Insurance Details
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
              Car Insurance Form
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Provide your details, vehicle/insurance information and share Google Drive links to your RC and previous insurance copy.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Personal Details", idx: 1 },
              { label: "Vehicle & Insurance", idx: 2 },
              { label: "Docs & Preference", idx: 3 },
            ].map((s, i) => (
              <div key={s.idx} className="flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s.idx ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s.idx}
                </div>
                <span className={`ml-2 ${step === s.idx ? "text-emerald-600 font-medium" : "text-gray-500"}`}>
                  {s.label}
                </span>
                {/* {i < 2 && <div className="w-16 h-1 bg-gray-200 mx-2"></div>} */}
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
                      <FaEnvelope className="mr-2 text-emerald-600" /> Email
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
                    Next: Vehicle & Insurance
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <>
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
                      className={`w-full px-4 py-3 rounded-xl border ${errors.previousInsurer ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Enter insurer name"
                    />
                    {errors.previousInsurer && <p className="mt-1 text-sm text-red-600">{errors.previousInsurer}</p>}
                  </div>

                  {/* Policy Expiry */}
                  <div>
                    <label htmlFor="policyExpiry" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Policy Expiry Date
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

                  {/* Registration Number */}
                  <div>
                    <label htmlFor="registrationNumber" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Vehicle Registration Number <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="registrationNumber"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.registrationNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Enter registration number"
                    />
                    {errors.registrationNumber && <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>}
                  </div>

                  {/* Insurance Type */}
                  <div>
                    <label
                      htmlFor="insuranceType"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      Choose insurance type <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      id="insuranceType"
                      name="insuranceType"
                      value={formData.insuranceType}
                      onChange={(e) => { setFormData({ ...formData, insuranceType: e.target.value }) }}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.insuranceType ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    >
                      <option value="">-- Select Insurance Type --</option>
                      {insuranceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.insuranceType && (
                      <p className="mt-1 text-sm text-red-600">{errors.insuranceType}</p>
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
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                  >
                    Next: Documents & Preference
                  </button>
                </div>
                </div>
              </>
            ) : (
              <>
                {/* Step 3: Drive Links + Insurer Preference */}
                <div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">
                    Share Your Documents via Google Drive
                  </h3>

                  <div className="bg-emerald-50 rounded-xl p-5 mb-6">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-emerald-800 font-medium mb-2">
                          How to get a public Google Drive link:
                        </p>
                        <ol className="list-decimal pl-5 space-y-1 text-emerald-700">
                          <li>Upload your RC and Previous Insurance to Google Drive</li>
                          <li>Right-click the file and select &quot;Get link&quot;</li>
                          <li>Change permissions to &quot;Anyone with the link can view&quot;</li>
                          <li>Copy the link and paste it below</li>
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

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="rcLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaLink className="mr-2 text-emerald-600" /> RC Copy Link <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="url"
                        id="rcLink"
                        name="rcLink"
                        value={formData.rcLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.rcLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      {errors.rcLink && <p className="mt-1 text-sm text-red-600">{errors.rcLink}</p>}
                    </div>

                    <div>
                      <label htmlFor="prevInsuranceLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaLink className="mr-2 text-emerald-600" /> Previous Insurance Copy Link <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="url"
                        id="prevInsuranceLink"
                        name="prevInsuranceLink"
                        value={formData.prevInsuranceLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.prevInsuranceLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      {errors.prevInsuranceLink && <p className="mt-1 text-sm text-red-600">{errors.prevInsuranceLink}</p>}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Insurer Preference (Select one or more)</p>
                      {errors.insurerPrefs && <p className="mt-1 text-sm text-red-600">{errors.insurerPrefs}</p>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {["ICICI Lombard", "HDFC Ergo", "Bajaj Allianz", "Tata AIG", "Reliance General"].map((ins) => (
                          <label key={ins} className="flex items-center space-x-2">
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
                        <div className="sm:col-span-2 flex items-center space-x-2 mt-2">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 1</div>
              <p className="text-gray-700">Fill in your personal details</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 2</div>
              <p className="text-gray-700">Enter previous insurer and policy expiry</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 3</div>
              <p className="text-gray-700">Share Google Drive links and select preferences</p>
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
