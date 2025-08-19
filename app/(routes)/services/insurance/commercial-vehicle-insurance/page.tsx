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
  FaTruck,
  FaCalendarAlt,
  FaFileUpload,
  FaInfoCircle,
  FaCopy,
  FaCheckCircle,
  FaShieldAlt,
  FaRoute,
  FaIndustry,
} from "react-icons/fa";

export default function CommercialVehicleInsuranceFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    businessName: "",
    businessType: "",
    gstNumber: "",
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleCapacity: "",
    vehicleValue: "",
    previousInsurer: "",
    policyExpiry: "",
    currentPolicyNumber: "",
    primaryUse: "",
    operatingArea: "",
    annualMileage: "",
    coverageType: [] as string[],
    additionalCovers: [] as string[],
    rcLink: "",
    prevInsuranceLink: "",
    businessLicenseLink: "",
    gstCertificateLink: "",
    insurerPrefs: [] as string[],
    otherInsurer: "",
    specialRequirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      const val = value;
      if (name === "coverageType" || name === "additionalCovers" || name === "insurerPrefs") {
        setFormData((prev) => {
          const selected = new Set(prev[name as keyof typeof prev] as string[]);
          if (checkbox.checked) selected.add(val);
          else selected.delete(val);
          return { ...prev, [name]: Array.from(selected) };
        });
      }
      // Clear error when user interacts
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
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
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
      newErrors.gstNumber = "Invalid GST number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.vehicleYear && (!/^\d{4}$/.test(formData.vehicleYear) || parseInt(formData.vehicleYear) < 1900 || parseInt(formData.vehicleYear) > new Date().getFullYear() + 1)) {
      newErrors.vehicleYear = "Invalid vehicle year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.policyExpiry && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.policyExpiry)) {
      newErrors.policyExpiry = "Use dd/mm/yyyy format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.rcLink && !isDriveLink(formData.rcLink)) {
      newErrors.rcLink = "Enter a valid Google Drive link";
    }
    if (formData.prevInsuranceLink && !isDriveLink(formData.prevInsuranceLink)) {
      newErrors.prevInsuranceLink = "Enter a valid Google Drive link";
    }
    if (formData.businessLicenseLink && !isDriveLink(formData.businessLicenseLink)) {
      newErrors.businessLicenseLink = "Enter a valid Google Drive link";
    }
    if (formData.gstCertificateLink && !isDriveLink(formData.gstCertificateLink)) {
      newErrors.gstCertificateLink = "Enter a valid Google Drive link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = () => {
    const newErrors: Record<string, string> = {};

    if (formData.coverageType.length === 0) {
      newErrors.coverageType = "Select at least one coverage type";
    }
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
    else if (step === 4 && validateStep4()) setStep(5);
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const copyInstructions = () => {
    navigator.clipboard.writeText(
      "1. Upload your documents to Google Drive\n2. Right-click file → Get link\n3. Change permissions to 'Anyone with the link'\n4. Copy the link and paste here"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep5()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch("/api/commercial-vehicle-insurance", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      setMessage({
        text: "Your commercial vehicle insurance request has been submitted successfully!",
        type: "success",
      });

      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          businessName: "",
          businessType: "",
          gstNumber: "",
          vehicleType: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleYear: "",
          vehicleCapacity: "",
          vehicleValue: "",
          previousInsurer: "",
          policyExpiry: "",
          currentPolicyNumber: "",
          primaryUse: "",
          operatingArea: "",
          annualMileage: "",
          coverageType: [],
          additionalCovers: [],
          rcLink: "",
          prevInsuranceLink: "",
          businessLicenseLink: "",
          gstCertificateLink: "",
          insurerPrefs: [],
          otherInsurer: "",
          specialRequirements: "",
        });
        setStep(1);
        setErrors({});
      }, 3000);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-30 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-green-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900 text-center flex-grow px-4">
            Commercial Vehicle Insurance
          </h1>
          <div className="w-16"></div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-green-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaTruck className="text-3xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Commercial Vehicle Insurance Form
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Comprehensive insurance for your commercial vehicles with business-specific coverage options.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[
              { label: "Business Details", idx: 1 },
              { label: "Vehicle Info", idx: 2 },
              { label: "Insurance Details", idx: 3 },
              { label: "Documents", idx: 4 },
              { label: "Coverage & Submit", idx: 5 },
            ].map((s, i) => (
              <div key={s.idx} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s.idx ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s.idx}
                </div>
                <span className={`ml-2 ${step === s.idx ? "text-green-600 font-medium" : "text-gray-500"}`}>
                  {s.label}
                </span>
                {i < 4 && <div className="w-12 h-1 bg-gray-200 mx-2"></div>}
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
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Business & Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaUser className="mr-2 text-green-600" /> Full Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label htmlFor="businessName" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaBuilding className="mr-2 text-green-600" /> Business Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.businessName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="Enter business name"
                      />
                      {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaEnvelope className="mr-2 text-green-600" /> Email ID
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaPhone className="mr-2 text-green-600" /> Mobile Number <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    {/* Business Type */}
                    <div>
                      <label htmlFor="businessType" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaIndustry className="mr-2 text-green-600" /> Business Type
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                      >
                        <option value="">Select business type</option>
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Public Limited">Public Limited</option>
                        <option value="LLP">LLP</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* GST Number */}
                    <div>
                      <label htmlFor="gstNumber" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaBuilding className="mr-2 text-green-600" /> GST Number
                      </label>
                      <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.gstNumber ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="22AAAAA0000A1Z5"
                      />
                      {errors.gstNumber && <p className="mt-1 text-sm text-red-600">{errors.gstNumber}</p>}
                    </div>

                    {/* Vehicle Type */}
                    <div>
                      <label htmlFor="vehicleType" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaTruck className="mr-2 text-green-600" /> Vehicle Type <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.vehicleType ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                      >
                        <option value="">Select vehicle type</option>
                        <option value="Truck">Truck</option>
                        <option value="Bus">Bus</option>
                        <option value="Van">Van</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Tractor">Tractor</option>
                        <option value="Trailer">Trailer</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.vehicleType && <p className="mt-1 text-sm text-red-600">{errors.vehicleType}</p>}
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                  >
                    Next: Vehicle Information
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Vehicle Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Vehicle Make */}
                    <div>
                      <label htmlFor="vehicleMake" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaTruck className="mr-2 text-green-600" /> Vehicle Make
                      </label>
                      <input
                        type="text"
                        id="vehicleMake"
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="e.g., Tata, Ashok Leyland"
                      />
                    </div>

                    {/* Vehicle Model */}
                    <div>
                      <label htmlFor="vehicleModel" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaTruck className="mr-2 text-green-600" /> Vehicle Model
                      </label>
                      <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="e.g., 407, 1612"
                      />
                    </div>

                    {/* Vehicle Year */}
                    <div>
                      <label htmlFor="vehicleYear" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaCalendarAlt className="mr-2 text-green-600" /> Manufacturing Year
                      </label>
                      <input
                        type="text"
                        id="vehicleYear"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.vehicleYear ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="YYYY"
                      />
                      {errors.vehicleYear && <p className="mt-1 text-sm text-red-600">{errors.vehicleYear}</p>}
                    </div>

                    {/* Vehicle Capacity */}
                    <div>
                      <label htmlFor="vehicleCapacity" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaTruck className="mr-2 text-green-600" /> Vehicle Capacity
                      </label>
                      <input
                        type="text"
                        id="vehicleCapacity"
                        name="vehicleCapacity"
                        value={formData.vehicleCapacity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="e.g., 9 tons, 40 seats"
                      />
                    </div>

                    {/* Vehicle Value */}
                    <div>
                      <label htmlFor="vehicleValue" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaTruck className="mr-2 text-green-600" /> Vehicle Value (₹)
                      </label>
                      <input
                        type="number"
                        id="vehicleValue"
                        name="vehicleValue"
                        value={formData.vehicleValue}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="e.g., 500000"
                      />
                    </div>

                    {/* Primary Use */}
                    <div>
                      <label htmlFor="primaryUse" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaRoute className="mr-2 text-green-600" /> Primary Use
                      </label>
                      <select
                        id="primaryUse"
                        name="primaryUse"
                        value={formData.primaryUse}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                      >
                        <option value="">Select primary use</option>
                        <option value="Goods Transport">Goods Transport</option>
                        <option value="Passenger Transport">Passenger Transport</option>
                        <option value="Construction">Construction</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Other">Other</option>
                      </select>
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
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                  >
                    Next: Insurance Details
                  </button>
                </div>
              </>
            ) : step === 3 ? (
              <>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Insurance & Business Operations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Previous Insurer */}
                    <div>
                      <label htmlFor="previousInsurer" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaBuilding className="mr-2 text-green-600" /> Previous Insurer
                      </label>
                      <input
                        type="text"
                        id="previousInsurer"
                        name="previousInsurer"
                        value={formData.previousInsurer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="Enter insurer name"
                      />
                    </div>

                    {/* Policy Expiry */}
                    <div>
                      <label htmlFor="policyExpiry" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaCalendarAlt className="mr-2 text-green-600" /> Policy Expiry Date
                      </label>
                      <input
                        type="text"
                        id="policyExpiry"
                        name="policyExpiry"
                        value={formData.policyExpiry}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.policyExpiry ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="dd/mm/yyyy"
                      />
                      {errors.policyExpiry && <p className="mt-1 text-sm text-red-600">{errors.policyExpiry}</p>}
                    </div>

                    {/* Current Policy Number */}
                    <div>
                      <label htmlFor="currentPolicyNumber" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaShieldAlt className="mr-2 text-green-600" /> Current Policy Number
                      </label>
                      <input
                        type="text"
                        id="currentPolicyNumber"
                        name="currentPolicyNumber"
                        value={formData.currentPolicyNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="Enter policy number"
                      />
                    </div>

                    {/* Operating Area */}
                    <div>
                      <label htmlFor="operatingArea" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaRoute className="mr-2 text-green-600" /> Operating Area
                      </label>
                      <select
                        id="operatingArea"
                        name="operatingArea"
                        value={formData.operatingArea}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                      >
                        <option value="">Select operating area</option>
                        <option value="City">City</option>
                        <option value="State">State</option>
                        <option value="National">National</option>
                        <option value="International">International</option>
                      </select>
                    </div>

                    {/* Annual Mileage */}
                    <div>
                      <label htmlFor="annualMileage" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaRoute className="mr-2 text-green-600" /> Annual Mileage
                      </label>
                      <input
                        type="text"
                        id="annualMileage"
                        name="annualMileage"
                        value={formData.annualMileage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                        placeholder="e.g., 50,000 km"
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
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                  >
                    Next: Document Uploads
                  </button>
                </div>
              </>
            ) : step === 4 ? (
              <>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Document Uploads
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* RC Copy Upload */}
                    <div>
                      <label htmlFor="rcLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaFileUpload className="mr-2 text-green-600" /> RC Copy (Registration Certificate)
                      </label>
                      <input
                        type="url"
                        id="rcLink"
                        name="rcLink"
                        value={formData.rcLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.rcLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      {errors.rcLink && <p className="mt-1 text-sm text-red-600">{errors.rcLink}</p>}
                    </div>

                    {/* Previous Insurance Upload */}
                    <div>
                      <label htmlFor="prevInsuranceLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaFileUpload className="mr-2 text-green-600" /> Previous Insurance Copy
                      </label>
                      <input
                        type="url"
                        id="prevInsuranceLink"
                        name="prevInsuranceLink"
                        value={formData.prevInsuranceLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.prevInsuranceLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      {errors.prevInsuranceLink && <p className="mt-1 text-sm text-red-600">{errors.prevInsuranceLink}</p>}
                    </div>

                    {/* Business License Upload */}
                    <div>
                      <label htmlFor="businessLicenseLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaFileUpload className="mr-2 text-green-600" /> Business License
                      </label>
                      <input
                        type="url"
                        id="businessLicenseLink"
                        name="businessLicenseLink"
                        value={formData.businessLicenseLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.businessLicenseLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      {errors.businessLicenseLink && <p className="mt-1 text-sm text-red-600">{errors.businessLicenseLink}</p>}
                    </div>

                    {/* GST Certificate Upload */}
                    <div>
                      <label htmlFor="gstCertificateLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaFileUpload className="mr-2 text-green-600" /> GST Certificate
                      </label>
                      <input
                        type="url"
                        id="gstCertificateLink"
                        name="gstCertificateLink"
                        value={formData.gstCertificateLink}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.gstCertificateLink ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm`}
                        placeholder="https://drive.google.com/file/d/..."
                      />
                      {errors.gstCertificateLink && <p className="mt-1 text-sm text-red-600">{errors.gstCertificateLink}</p>}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-5">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium mb-2">
                          How to get a public Google Drive link:
                        </p>
                        <ol className="list-decimal pl-5 space-y-1 text-green-700">
                          <li>Upload your documents to Google Drive</li>
                          <li>Right-click the file and select "Get link"</li>
                          <li>Change permissions to "Anyone with the link can view"</li>
                          <li>Copy the link and paste it above</li>
                        </ol>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyInstructions}
                      className="mt-4 flex items-center text-green-600 hover:text-green-800 text-sm"
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
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                  >
                    Next: Coverage & Submit
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Step 5: Coverage & Submit */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">
                    Coverage Requirements & Insurer Preferences
                  </h3>

                  {/* Coverage Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FaShieldAlt className="mr-2 text-green-600" /> Coverage Type <span className="text-red-500 ml-1">*</span>
                    </label>
                    {errors.coverageType && <p className="mt-1 text-sm text-red-600">{errors.coverageType}</p>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Third Party", "Comprehensive", "Third Party Fire & Theft", "Personal Accident"].map((coverage) => (
                        <label key={coverage} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="coverageType"
                            value={coverage}
                            checked={formData.coverageType.includes(coverage)}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{coverage}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Covers */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FaShieldAlt className="mr-2 text-green-600" /> Additional Covers
                    </label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Roadside Assistance", "Engine Protect", "Zero Depreciation", "Return to Invoice", "Consumables"].map((cover) => (
                        <label key={cover} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="additionalCovers"
                            value={cover}
                            checked={formData.additionalCovers.includes(cover)}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{cover}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Insurer Preferences */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <FaBuilding className="mr-2 text-green-600" /> Insurer Preferences
                    </label>
                    {errors.insurerPrefs && <p className="mt-1 text-sm text-red-600">{errors.insurerPrefs}</p>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["ICICI Lombard", "HDFC Ergo", "Bajaj Allianz", "Tata AIG", "Reliance General", "New India Assurance"].map((ins) => (
                        <label key={ins} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="insurerPrefs"
                            value={ins}
                            checked={formData.insurerPrefs.includes(ins)}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{ins}</span>
                        </label>
                      ))}

                      {/* Other */}
                      <div className="sm:col-span-2 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          name="insurerPrefs"
                          value="Other"
                          checked={formData.insurerPrefs.includes("Other")}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                        <span className="text-gray-700">Other:</span>
                        <input
                          type="text"
                          name="otherInsurer"
                          value={formData.otherInsurer}
                          onChange={handleChange}
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
                          placeholder="Enter other insurer"
                          disabled={!formData.insurerPrefs.includes("Other")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <label htmlFor="specialRequirements" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaInfoCircle className="mr-2 text-green-600" /> Special Requirements
                    </label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-700 shadow-sm"
                      placeholder="Any special requirements or additional information..."
                    />
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
                          : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
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
      </div>
    </div>
  );
}
