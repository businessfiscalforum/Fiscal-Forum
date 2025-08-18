"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  FaCheck, 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaMobileAlt, 
  FaFileInvoice, 
  FaMapPin 
} from "react-icons/fa";
import { State, City } from 'country-state-city';

export default function AxisBankPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    panNo: "",
    pincode: "",
    state: "",
    district: "",
  });
  const [districtsList, setDistrictsList] = useState<{ name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get all Indian states
  const states = State.getStatesOfCountry('IN');

  // Update districts when state changes
  useEffect(() => {
    if (formData.state) {
      const stateObj = states.find(s => s.isoCode === formData.state);
      if (stateObj) {
        const cities = City.getCitiesOfState('IN', stateObj.isoCode);
        setDistrictsList(cities);
      }
    } else {
      setDistrictsList([]);
    }
    if (formData.district) setFormData(prev=>({...prev, district:""}))
  }, [formData.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for state change to reset district
    if (name === "state") {
      setFormData(prev => ({ 
        ...prev, 
        state: value,
        district: ""
      }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.state;
        delete newErrors.district;
        return newErrors;
      });
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Must be 10 digits";
    }
    if (!formData.panNo.trim()) {
      newErrors.panNo = "PAN Number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.toUpperCase())) {
      newErrors.panNo = "Invalid PAN format";
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Must be 6 digits";
    }
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";

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
      formDataToSend.append("accountType", "axis");

      const response = await fetch("/api/savings-account-form", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit");
      }

      setMessage({
        text: "Application submitted successfully!",
        type: "success",
      });

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          panNo: "",
          pincode: "",
          state: "",
          district: "",
        });
        setErrors({});
        setShowForm(false);
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
            Axis Bank Savings Account
          </h1>
          <div className="w-16"></div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaCheck className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Axis Bank</h2>
              <p className="text-emerald-600">Flexible Savings Solutions</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Axis Bank offers a range of savings accounts tailored to meet the diverse needs of customers across different locations.
            </p>
            
            <h3 className="text-xl font-semibold text-emerald-800 mt-6 mb-3">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Minimum average balance varies by branch location</li>
              <li>Range: ₹2,500 to ₹10,000 for regular savings accounts</li>
              <li>Metro and urban branches usually require ₹5,000 average balance</li>
              <li>Semi-urban and rural branches often have lower balance requirements</li>
              <li>Complete application support for a smooth, hassle-free banking experience</li>
              <li>No hidden charges — complete transparency for your peace of mind</li>
            </ul>
            
            <div className="bg-emerald-50 p-4 rounded-xl mt-6">
              <h4 className="font-bold text-emerald-800 mb-2">Special Offer</h4>
              <p className="text-emerald-700">Get cashback up to ₹250 when you open your account today!</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
              >
                Fill Application Form
              </button>
            ) : (
              <button
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition"
              >
                Hide Form
              </button>
            )}
          </div>
        </motion.div>

        {showForm && (
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
              Account Application Form
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
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaUser className="mr-2 text-emerald-600" /> Full Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaEnvelope className="mr-2 text-emerald-600" /> Email Address <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMobileAlt className="mr-2 text-emerald-600" /> Mobile Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.mobileNo ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobileNo && <p className="mt-1 text-sm text-red-600">{errors.mobileNo}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaFileInvoice className="mr-2 text-emerald-600" /> PAN Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border uppercase ${
                      errors.panNo ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                    placeholder="ABCDE1234F"
                  />
                  {errors.panNo && <p className="mt-1 text-sm text-red-600">{errors.panNo}</p>}
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMapPin className="mr-2 text-emerald-600" /> Pincode <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.pincode ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                    placeholder="6-digit pincode"
                  />
                  {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMapPin className="mr-2 text-emerald-600" /> State <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition`}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaMapPin className="mr-2 text-emerald-600" /> District <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.state}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${
                      !formData.state ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">{formData.state ? "Select District" : "Select State First"}</option>
                    {districtsList.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:shadow-xl"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}