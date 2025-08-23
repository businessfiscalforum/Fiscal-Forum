/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCheck,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaPassport,
  FaPlaneDeparture,
  FaSuitcaseRolling,
  FaGlobeAsia,
  FaShieldAlt,
  FaClipboardList,
  FaFileUpload,
  FaInfoCircle,
  FaCopy,
  FaCheckCircle,
} from "react-icons/fa";

export default function TravelInsurancePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    // Personal
    name: "",
    phone: "",
    email: "",
    dob: "",
    passportNumber: "",
    // Trip
    travelType: "",
    destinations: "",
    startDate: "",
    endDate: "",
    numTravellers: "",
    travellerAges: "",
    // Coverage
    coverageOptions: [] as string[],
    // Existing policy
    hasExistingPolicy: false,
    existingInsurer: "",
    prevPolicyLink: "",
    // Insurer preference
    insurerPrefs: [] as string[],
    otherInsurer: "",
  });

  const isDriveLink = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "hasExistingPolicy") {
        setFormData((p) => ({ ...p, hasExistingPolicy: checked }));
        return;
      }
      if (["coverageOptions", "insurerPrefs"].includes(name)) {
        setFormData((prev) => {
          const set = new Set(prev[name as keyof typeof prev] as string[]);
          if (checked) set.add(value); else set.delete(value);
          return { ...prev, [name]: Array.from(set) };
        });
        if (errors[name]) setErrors((e) => { const c = { ...e }; delete c[name]; return c; });
        return;
      }
    }
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((e) => { const c = { ...e }; delete c[name]; return c; });
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone)) e.phone = "Enter 10-digit mobile";
    if (formData.email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (formData.dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob)) e.dob = "Use dd/mm/yyyy";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!formData.travelType) e.travelType = "Select travel type";
    if (formData.startDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.startDate)) e.startDate = "Use dd/mm/yyyy";
    if (formData.endDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.endDate)) e.endDate = "Use dd/mm/yyyy";
    if (formData.numTravellers && (isNaN(Number(formData.numTravellers)) || Number(formData.numTravellers) <= 0)) e.numTravellers = "Enter valid number";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (formData.prevPolicyLink && !isDriveLink(formData.prevPolicyLink)) e.prevPolicyLink = "Use public Google Drive link";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  const copyInstructions = () => {
    navigator.clipboard.writeText("Upload to Drive → Get link → Anyone with the link can view → Paste here");
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setIsSubmitting(true); setMessage(null);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
        else fd.append(k, v);
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/travel-insurance`, { method: "POST", body: fd});
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to submit");
      setMessage({ text: "Request submitted successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message || "Something went wrong", type: "error" });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-30 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-green-200" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={() => router.back()} className="flex items-center text-green-700 hover:text-green-900 font-medium"><FaArrowLeft className="mr-2"/>Back</button>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">Travel Insurance</h1>
          <div className="w-16" />
        </motion.div>

        <motion.div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-green-200" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 100 }}>
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaPlaneDeparture className="text-2xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Travel Insurance Form</h2>
            <p className="text-gray-600 mt-2">Enter trip and coverage details.</p>
          </div>

          {/* Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {["Personal Details","Trip Details","Existing Policy","Insurer Preference"].map((label, idx) => (
              <div key={label} className="flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step===idx+1?"bg-green-600 text-white":"bg-gray-200 text-gray-600"}`}>{idx+1}</div>
                <span className={`ml-2 ${step===idx+1?"text-green-600 font-medium":"text-gray-500"}`}>{label}</span>
                {/* {idx<3 && <div className="w-10 h-1 bg-gray-200 mx-2"/>} */}
              </div>
            ))}
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-center ${message.type==='success'?"bg-green-100 text-green-800 border border-green-200":"bg-red-100 text-red-800 border border-red-200"}`}>
              {message.type==='success' && <FaCheck className="inline mr-2"/>}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <h3 className="text-lg font-bold text-green-900 mb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaUser className="mr-2 text-green-600"/>Name<span className="text-red-500 ml-1">*</span></label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={`w-full px-4 py-3 rounded-xl border ${errors.name?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaPhone className="mr-2 text-green-600"/>Mobile Number<span className="text-red-500 ml-1">*</span></label>
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" className={`w-full px-4 py-3 rounded-xl border ${errors.phone?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaEnvelope className="mr-2 text-green-600"/>Email ID</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={`w-full px-4 py-3 rounded-xl border ${errors.email?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-green-600"/>Date of Birth</label>
                    <input name="dob" value={formData.dob} onChange={handleChange} placeholder="dd/mm/yyyy" className={`w-full px-4 py-3 rounded-xl border ${errors.dob?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.dob && <p className="text-sm text-red-600 mt-1">{errors.dob}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaPassport className="mr-2 text-green-600"/>Passport Number (Optional)</label>
                    <input name="passportNumber" value={formData.passportNumber} onChange={handleChange} placeholder="Passport number" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="button" onClick={handleNext} className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800">Next: Trip Details</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-bold text-green-900 mb-2">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">Travel Type<span className="text-red-500 ml-1">*</span></label>
                    <div className="flex items-center space-x-4">
                      {["Single Trip","Multi-Trip (Annual)"].map((o) => (
                        <label key={o} className="flex items-center space-x-2">
                          <input type="radio" name="travelType" value={o} checked={formData.travelType===o} onChange={handleChange} />
                          <span className="text-gray-700">{o}</span>
                        </label>
                      ))}
                    </div>
                    {errors.travelType && <p className="text-sm text-red-600 mt-1">{errors.travelType}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaGlobeAsia className="mr-2 text-green-600"/>Travel Destination(s)</label>
                    <input name="destinations" value={formData.destinations} onChange={handleChange} placeholder="Countries/Cities" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-green-600"/>Travel Start Date</label>
                    <input name="startDate" value={formData.startDate} onChange={handleChange} placeholder="dd/mm/yyyy" className={`w-full px-4 py-3 rounded-xl border ${errors.startDate?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-green-600"/>Travel End Date</label>
                    <input name="endDate" value={formData.endDate} onChange={handleChange} placeholder="dd/mm/yyyy" className={`w-full px-4 py-3 rounded-xl border ${errors.endDate?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaSuitcaseRolling className="mr-2 text-green-600"/>No. of Travellers</label>
                    <input name="numTravellers" value={formData.numTravellers} onChange={handleChange} placeholder="e.g., 2" className={`w-full px-4 py-3 rounded-xl border ${errors.numTravellers?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                    {errors.numTravellers && <p className="text-sm text-red-600 mt-1">{errors.numTravellers}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">Age of Each Traveller</label>
                    <input name="travellerAges" value={formData.travellerAges} onChange={handleChange} placeholder="e.g., 34, 31" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center"><FaShieldAlt className="mr-2 text-green-600"/>Coverage Options (select one or more)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Medical Expenses Abroad","Personal Accident","Trip Cancellation / Delay","Loss of Passport / Baggage","Emergency Evacuation & Repatriation"].map((opt) => (
                      <label key={opt} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" name="coverageOptions" value={opt} checked={formData.coverageOptions.includes(opt)} onChange={handleChange} className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={handleBack} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Back</button>
                  <button type="button" onClick={handleNext} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800">Next: Existing Policy</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-bold text-green-900 mb-2">Existing Travel Insurance (if any)</h3>
                <div className="space-y-6">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" name="hasExistingPolicy" checked={formData.hasExistingPolicy} onChange={handleChange} className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                    <span className="text-gray-700">I already have an existing travel insurance policy</span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">Name of Existing Insurer</label>
                      <input name="existingInsurer" value={formData.existingInsurer} onChange={handleChange} placeholder="Insurer name" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaFileUpload className="mr-2 text-green-600"/>Upload Previous Policy Copy (Optional)</label>
                      <input name="prevPolicyLink" value={formData.prevPolicyLink} onChange={handleChange} placeholder="https://drive.google.com/file/d/..." className={`w-full px-4 py-3 rounded-xl border ${errors.prevPolicyLink?"border-red-500":"border-gray-300"} focus:ring-2 focus:ring-green-500`} />
                      {errors.prevPolicyLink && <p className="text-sm text-red-600 mt-1">{errors.prevPolicyLink}</p>}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-5">
                    <div className="flex items-start">
                      <FaInfoCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium mb-2">How to get a public Google Drive link:</p>
                        <ol className="list-decimal pl-5 space-y-1 text-green-700">
                          <li>Upload document to Google Drive</li>
                          <li>Right-click → Get link</li>
                          <li>Set permission: Anyone with the link can view</li>
                          <li>Copy and paste the link here</li>
                        </ol>
                      </div>
                    </div>
                    <button type="button" onClick={copyInstructions} className="mt-4 flex items-center text-green-600 hover:text-green-800 text-sm">
                      <FaCopy className="mr-1" /> {copied ? "Copied!" : "Copy instructions"}
                      {copied && <FaCheckCircle className="ml-1 text-green-500" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={handleBack} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Back</button>
                  <button type="button" onClick={() => setStep(4)} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800">Next: Insurer Preference</button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className="text-lg font-bold text-green-900 mb-2">Insurer Preference (optional)</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["ICICI Lombard","HDFC Ergo","Bajaj Allianz","Tata AIG","Reliance General","Care Health"].map((i) => (
                      <label key={i} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" name="insurerPrefs" value={i} checked={formData.insurerPrefs.includes(i)} onChange={handleChange} className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                        <span className="text-gray-700">{i}</span>
                      </label>
                    ))}
                    <div className="sm:col-span-2 flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <input type="checkbox" name="insurerPrefs" value="Other" checked={formData.insurerPrefs.includes("Other")} onChange={handleChange} className="h-4 w-4 text-green-600 border-gray-300 rounded" />
                      <span className="text-gray-700">Other:</span>
                      <input name="otherInsurer" value={formData.otherInsurer} onChange={handleChange} placeholder="Enter other insurer" className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" disabled={!formData.insurerPrefs.includes("Other")} />
                  </div>
                  </div>

                  <div className="flex space-x-4 pt-2">
                    <button type="button" onClick={handleBack} className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Back</button>
                    <button type="submit" disabled={isSubmitting} className={`flex-1 py-3 px-4 rounded-xl font-bold text-white ${isSubmitting?"bg-gray-400 cursor-not-allowed":"bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"}`}>
                      {isSubmitting ? "Submitting..." : "Submit Request"}
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
