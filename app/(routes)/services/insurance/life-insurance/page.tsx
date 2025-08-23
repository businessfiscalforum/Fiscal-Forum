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
  FaCalendarAlt,
} from "react-icons/fa";

export default function LifeInsuranceFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Personal, 2: Policy Requirements, 3: Existing Policy, 4: Preference
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    occupation: "",
    policyTypes: [] as string[],
    sumAssured: "",
    policyTermYears: "",
    premiumFrequency: "",
    hasExistingPolicy: false,
    existingInsurer: "",
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

    if (name === "hasExistingPolicy" && type === "checkbox") {
      setFormData((prev) => ({ ...prev, hasExistingPolicy: checked }));
      return;
    }

    // Multi-select groups
    if (type === "checkbox" && name === "policyTypes") {
      const val = (e.target as HTMLInputElement).value;
      setFormData((prev) => {
        const selected = new Set(prev.policyTypes);
        if ((e.target as HTMLInputElement).checked) selected.add(val);
        else selected.delete(val);
        return { ...prev, policyTypes: Array.from(selected) };
      });
      if (errors.policyTypes) {
        setErrors((prev) => {
          const n = { ...prev };
          delete n.policyTypes;
          return n;
        });
      }
      return;
    }

    if (type === "checkbox" && name === "insurerPrefs") {
      const val = (e.target as HTMLInputElement).value;
      setFormData((prev) => {
        const selected = new Set(prev.insurerPrefs);
        if ((e.target as HTMLInputElement).checked) selected.add(val);
        else selected.delete(val);
        return { ...prev, insurerPrefs: Array.from(selected) };
      });
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  };

  const isDriveLink = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);

  const validateStep1 = () => {
    const n: Record<string, string> = {};
    if (!formData.name.trim()) n.name = "Name is required";
    if (!formData.phone.trim()) n.phone = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.phone)) n.phone = "Phone must be 10 digits";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) n.email = "Invalid email";
    if (formData.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob)) n.dob = "Use dd/mm/yyyy";
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const validateStep2 = () => {
    const n: Record<string, string> = {};
    if (formData.policyTypes.length === 0) n.policyTypes = "Select at least one policy type";
    if (formData.sumAssured && (!/^\d+(\.\d+)?$/.test(formData.sumAssured) || Number(formData.sumAssured) <= 0)) n.sumAssured = "Enter a valid amount";
    if (formData.policyTermYears && (!/^\d+$/.test(formData.policyTermYears) || Number(formData.policyTermYears) <= 0)) n.policyTermYears = "Enter a valid term";
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const validateStep3 = () => {
    const n: Record<string, string> = {};
    if (formData.prevPolicyLink && !isDriveLink(formData.prevPolicyLink)) n.prevPolicyLink = "Enter a valid Google Drive link";
    if (formData.hasExistingPolicy && !formData.existingInsurer.trim()) n.existingInsurer = "Enter existing insurer";
    setErrors(n);
    return Object.keys(n).length === 0;
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
    // Final step has already been validated by navigation
    setIsSubmitting(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("dob", formData.dob);
      fd.append("gender", formData.gender);
      fd.append("occupation", formData.occupation);
      fd.append("policyTypes", JSON.stringify(formData.policyTypes));
      fd.append("sumAssured", formData.sumAssured);
      fd.append("policyTermYears", formData.policyTermYears);
      fd.append("premiumFrequency", formData.premiumFrequency);
      fd.append("hasExistingPolicy", String(formData.hasExistingPolicy));
      fd.append("existingInsurer", formData.existingInsurer);
      fd.append("prevPolicyLink", formData.prevPolicyLink);
      fd.append("insurerPrefs", JSON.stringify(formData.insurerPrefs));
      fd.append("otherInsurer", formData.otherInsurer);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/life-insurance`, { method: "POST", body: fd });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to submit form");

      setMessage({ text: "Your life insurance request has been submitted successfully!", type: "success" });
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          dob: "",
          gender: "",
          occupation: "",
          policyTypes: [],
          sumAssured: "",
          policyTermYears: "",
          premiumFrequency: "",
          hasExistingPolicy: false,
          existingInsurer: "",
          prevPolicyLink: "",
          insurerPrefs: [],
          otherInsurer: "",
        });
        setErrors({});
        setStep(1);
      }, 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Submission error:", error);
      setMessage({ text: error.message || "Failed to submit the form. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={() => router.back()} className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">Life Insurance Details</h1>
          <div className="w-16"></div>
        </motion.div>

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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Life Insurance Form</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Provide your details, policy requirements, any existing policy info, and select preferred insurers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Personal Details", idx: 1 },
              { label: "Policy Requirements", idx: 2 },
              { label: "Existing Policy", idx: 3 },
              { label: "Insurer Preference", idx: 4 },
            ].map((s, i) => (
              <div key={s.idx} className="flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === s.idx ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"}`}>{s.idx}</div>
                <span className={`ml-2 ${step === s.idx ? "text-emerald-600 font-medium" : "text-gray-500"}`}>{s.label}</span>
                {/* {i < 3 && <div className="w-16 h-1 bg-gray-200 mx-2"></div>} */}
              </div>
            ))}
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-2xl text-center ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
              {message.type === "success" ? <FaCheck className="inline mr-2" /> : null}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
                    <label htmlFor="dob" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaCalendarAlt className="mr-2 text-emerald-600" /> Date of Birth (dd/mm/yyyy)
                    </label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.dob ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="dd/mm/yyyy"
                    />
                    {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Gender:</label>
                    <div className="flex items-center gap-6">
                      {["Male", "Female", "Other"].map((g) => (
                        <label key={g} className="flex items-center gap-2">
                          <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="h-4 w-4 text-emerald-600" />
                          <span className="text-gray-700">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="occupation" className="text-sm font-medium text-gray-700 mb-1 flex items-center">Occupation:</label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm"
                      placeholder="Your occupation"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="button" onClick={handleNext} className="w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl">
                    Next: Policy Requirements
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Type of Policy Interested In (Select one or more)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Term Plan", "Endowment Plan", "ULIP (Unit Linked Insurance Plan)", "Retirement / Pension Plan", "Child Plan", "Whole Life Insurance"].map((t) => (
                        <label key={t} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="checkbox" name="policyTypes" value={t} checked={formData.policyTypes.includes(t)} onChange={handleChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded" />
                          <span className="text-gray-700">{t}</span>
                        </label>
                      ))}
                    </div>
                    {errors.policyTypes && <p className="mt-1 text-sm text-red-600">{errors.policyTypes}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="sumAssured" className="text-sm font-medium text-gray-700 mb-1">Sum Assured Required (₹)</label>
                      <input
                        type="number"
                        id="sumAssured"
                        name="sumAssured"
                        value={formData.sumAssured}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.sumAssured ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                        placeholder="e.g., 1000000"
                        min="0"
                      />
                      {errors.sumAssured && <p className="mt-1 text-sm text-red-600">{errors.sumAssured}</p>}
                    </div>

                    <div>
                      <label htmlFor="policyTermYears" className="text-sm font-medium text-gray-700 mb-1">Policy Term (in years)</label>
                      <input
                        type="number"
                        id="policyTermYears"
                        name="policyTermYears"
                        value={formData.policyTermYears}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.policyTermYears ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                        placeholder="e.g., 20"
                        min="1"
                      />
                      {errors.policyTermYears && <p className="mt-1 text-sm text-red-600">{errors.policyTermYears}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Premium Payment Frequency</label>
                    <div className="flex items-center gap-6">
                      {["Monthly", "Quarterly", "Half-Yearly", "Yearly"].map((f) => (
                        <label key={f} className="flex items-center gap-2">
                          <input type="radio" name="premiumFrequency" value={f} checked={formData.premiumFrequency === f} onChange={handleChange} className="h-4 w-4 text-emerald-600" />
                          <span className="text-gray-700">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button type="button" onClick={handleBack} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Back</button>
                  <button type="button" onClick={handleNext} className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl">Next: Existing Policy</button>
                </div>
              </>
            ) : step === 3 ? (
              <>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="hasExistingPolicy" name="hasExistingPolicy" checked={formData.hasExistingPolicy} onChange={handleChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded" />
                    <label htmlFor="hasExistingPolicy" className="text-gray-700">I already have an existing life insurance policy</label>
                  </div>

                  <div>
                    <label htmlFor="existingInsurer" className="text-sm font-medium text-gray-700 mb-1">Name of Existing Insurer</label>
                    <input
                      type="text"
                      id="existingInsurer"
                      name="existingInsurer"
                      value={formData.existingInsurer}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.existingInsurer ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Insurer name"
                      disabled={!formData.hasExistingPolicy}
                    />
                    {errors.existingInsurer && <p className="mt-1 text-sm text-red-600">{errors.existingInsurer}</p>}
                  </div>

                  <div>
                    <label htmlFor="prevPolicyLink" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaLink className="mr-2 text-emerald-600" /> Upload Previous Policy Copy (Optional)
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
                    <p className="mt-2 text-sm text-gray-600">We compare and offer the best recommendations if uploaded.</p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-5">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-emerald-800 font-medium mb-2">How to get a public Google Drive link:</p>
                        <ol className="list-decimal pl-5 space-y-1 text-emerald-700">
                          <li>Upload your previous policy to Google Drive</li>
                          <li>Right-click the file and select &quot;Get link&quot;</li>
                          <li>Change permissions to &quot;Anyone with the link can view&quot;</li>
                          <li>Copy the link and paste it above</li>
                        </ol>
                      </div>
                    </div>

                    <button type="button" onClick={copyInstructions} className="mt-4 flex items-center text-emerald-600 hover:text-emerald-800 text-sm">
                      <FaCopy className="mr-1" /> {copied ? "Copied!" : "Copy instructions"}
                      {copied && <FaCheckCircle className="ml-1 text-green-500" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button type="button" onClick={handleBack} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Back</button>
                  <button type="button" onClick={handleNext} className="flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl">Next: Insurer Preference</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-4">Insurer Preference (Optional – select if any)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["LIC", "HDFC Life", "ICICI Prudential", "SBI Life", "Max Life", "Bajaj Allianz Life"].map((ins) => (
                      <label key={ins} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" name="insurerPrefs" value={ins} checked={formData.insurerPrefs.includes(ins)} onChange={handleChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded" />
                        <span className="text-gray-700">{ins}</span>
                      </label>
                    ))}

                    <div className="sm:col-span-2 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <input type="checkbox" name="insurerPrefs" value="Other" checked={formData.insurerPrefs.includes("Other")} onChange={handleChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded" />
                      <span className="text-gray-700">Other:</span>
                      <input type="text" name="otherInsurer" value={formData.otherInsurer} onChange={handleChange} className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700" placeholder="Enter other insurer" disabled={!formData.insurerPrefs.includes("Other")} />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button type="button" onClick={handleBack} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Back</button>
                    <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"}`}>
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <p className="text-gray-700">Select policy types and terms</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 3</div>
              <p className="text-gray-700">Provide existing policy info</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-700 font-bold mb-2">Step 4</div>
              <p className="text-gray-700">Choose your preferred insurers</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 text-center text-gray-600 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <p>
            Need help? <Link href="/contact" className="text-emerald-600 hover:underline font-medium">Contact Support</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}


