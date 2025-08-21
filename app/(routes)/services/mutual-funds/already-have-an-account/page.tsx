"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaBell,
  FaChartLine,
  FaCheck,
  FaFileAlt,
  FaFileInvoice,
  FaGift,
  FaHeadset,
  FaMobileAlt,
  FaRupeeSign,
  FaSpinner,
  FaUser,
  FaDownload,
  FaEnvelope,
} from "react-icons/fa";
import { CheckCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { TbReportSearch } from "react-icons/tb";

type Broker = {
  name: string;
  logo: string;
  link: string;
};

const existingAccounts: Broker[] = [
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/mutual-funds-investment?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "  https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814",
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    link: "  https://www.njindiaonline.com/etada/partintiate.fin?cmdAction=showMenu&njBrcode=47283",
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "  https://fundzbazar.com/Link/jRkmixvcvvw  ",
  },
];

export default function AlreadyHaveAccount() {
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
    traderType: [] as string[],
    existingBroker: "",
  });

  const [documentForm, setDocumentForm] = useState({
    name: "",
    email: "",
    mobile: "",
    documentSent: false,
  });
  const [documentErrors, setDocumentErrors] = useState<Record<string, string>>({});
  const [isDocumentSubmitting, setIsDocumentSubmitting] = useState(false);
  const [documentMessage, setDocumentMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

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
    setFormData(prev => {
      const newTraderTypes = checked 
        ? [...prev.traderType, value]
        : prev.traderType.filter(type => type !== value);
      
      return { ...prev, traderType: newTraderTypes };
    });

    // Clear error when user selects an option
    if (transferErrors.traderType && checked) {
      setTransferErrors(prev => {
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

    if (formData.traderType.length === 0) {
      newErrors.traderType = "Select at least one investment type";
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mfTransfer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to submit form");
    }

    setTransferMessage({
      text: "Thank you, your application is submitted. Our representative will contact you shortly.",
      type: "success",
    });

    setTimeout(() => {
      setFormData({
        fullName: "",
        clientCode: "",
        panNo: "",
        mobileNo: "",
        traderType: [],
        existingBroker: "",
      });
      setTransferErrors({});
    }, 3000);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setTransferMessage({
      text: error.message || "Failed to submit the form. Please try again.",
      type: "error",
    });
  } finally {
    setIsTransferSubmitting(false);
  }
};


  // Document form handlers
  const handleDocumentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setDocumentForm({ ...documentForm, [name]: checked });
    } else {
      setDocumentForm({ ...documentForm, [name]: value });
    }

    // Clear error when user types
    if (documentErrors[name]) {
      setDocumentErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateDocumentForm = () => {
    const newErrors: Record<string, string> = {};

    if (!documentForm.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!documentForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(documentForm.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!documentForm.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(documentForm.mobile)) {
      newErrors.mobile = "Must be 10 digits";
    }

    if (!documentForm.documentSent) {
      newErrors.documentSent = "Please confirm you've sent the document";
    }

    setDocumentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateDocumentForm()) {
    return;
  }

  setIsDocumentSubmitting(true);
  setDocumentMessage(null);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/document-submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(documentForm),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to submit the form");
    }

    setDocumentMessage({
      text: "Thank you for submitting the form. Our representative will contact you shortly.",
      type: "success",
    });

    setTimeout(() => {
      setDocumentForm({
        name: "",
        email: "",
        mobile: "",
        documentSent: false,
      });
      setDocumentErrors({});
    }, 3000);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    setDocumentMessage({
      text: error.message || "Failed to submit the form. Please try again.",
      type: "error",
    });
  } finally {
    setIsDocumentSubmitting(false);
  }
};


  // Trader type options for checkboxes
  const traderTypeOptions = [
    { value: "SIP", label: "SIP" },
    { value: "Lumpsum", label: "Lumpsum Investment" },
  ];

  // Existing broker options
  const brokerOptions = [
    { value: "NJWEALTH", label: "NJWEALTH" },
    { value: "Prudent Corporate", label: "Prudent Corporate" },
  ];

  return (
    <>
      <section className="py-20 px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              If you want to transfer your Mutual Fund Portfolio with us, See how you can!
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Seamless and completed in just a few steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Steps and Document Form */}
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
                  Transfer Your Mutual Fund Holdings
                </h2>
                <p className="text-gray-600 mt-2 text-center">
                  Transfer your holdings to your existing stock broker. Note: You don&apos;t have to shift your broker. We&apos;ll resolve all your issues and provide high rewards & brokerage sharing.
                </p>
              </div>

              {/* Steps */}
              <div className="relative space-y-8 mb-12">
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                    1
                  </div>
                  <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Open a Mutual Fund Account with Us
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Log in to your current broker&apos;s portal and generate a Client Master Report (CMR) 
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                    2
                  </div>
                  <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Initiate Transfer Request
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Log in to your current broker’s portal and generate a Client Master Report (CMR) or submit a DIS slip.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                    3
                  </div>
                  <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Download & Sign Document
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Download the transfer form, sign it, and email it to support@fiscalforum.in 
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                    4
                  </div>
                  <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-green-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      We Handle the Rest
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Our team coordinates with your current broker to initiate the transfer. No action needed from you.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-md">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="ml-5 bg-white p-5 rounded-2xl shadow-md flex-1 border border-emerald-200">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      Transfer Complete
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Your holdings will be transferred in 3-7 working days. You&apos;ll receive a confirmation email.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Document Form */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 text-center">
                  Submit Your Document
                </h3>
                
                {documentMessage && (
                  <div
                    className={`mb-4 p-3 rounded-xl text-center ${
                      documentMessage.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {documentMessage.text}
                  </div>
                )}

                <form onSubmit={handleDocumentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={documentForm.name}
                      onChange={handleDocumentChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        documentErrors.name ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Enter your full name"
                    />
                    {documentErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {documentErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={documentForm.email}
                      onChange={handleDocumentChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        documentErrors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="you@example.com"
                    />
                    {documentErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {documentErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={documentForm.mobile}
                      onChange={handleDocumentChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        documentErrors.mobile ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="10-digit mobile number"
                    />
                    {documentErrors.mobile && (
                      <p className="mt-1 text-sm text-red-600">
                        {documentErrors.mobile}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="documentSent"
                        checked={documentForm.documentSent}
                        onChange={handleDocumentChange}
                        className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-gray-700">
                        I have downloaded, signed, and emailed the document to support@fiscalforum.in <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {documentErrors.documentSent && (
                      <p className="mt-1 text-sm text-red-600">
                        {documentErrors.documentSent}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href="/transfer-form.pdf"
                      download
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-lg shadow-md transition flex items-center justify-center"
                    >
                      <FaDownload className="mr-2" /> Download Form
                    </a>
                    
                    <button
                      type="submit"
                      disabled={isDocumentSubmitting}
                      className={`flex-1 py-3 px-6 rounded-lg font-bold text-white shadow-md transition flex items-center justify-center ${
                        isDocumentSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                      }`}
                    >
                      {isDocumentSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" /> Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Transfer Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaFileInvoice className="text-3xl" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                  Transfer Your Sub-Broker Holdings with Us
                </h2>
                <p className="text-gray-600 mt-2 text-center">
                  Transfer your holdings to your existing stock broker. Note: You don&apos;t have to shift your broker. Your current plan will not change. You will be added to a dedicated channel for support. We&apos;ll resolve all your issues and provide high rewards & brokerage sharing.
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
                        transferErrors.clientCode ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="Your client code"
                    />
                    {transferErrors.clientCode && (
                      <p className="mt-1 text-sm text-red-600">{transferErrors.clientCode}</p>
                    )}
                  </div>

                  {/* PAN Number */}
                  <div>
                    <label
                      htmlFor="panNo"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                    >
                      <FaFileInvoice className="mr-2 text-emerald-600" /> PAN Number{" "}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="panNo"
                      name="panNo"
                      value={formData.panNo}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border uppercase ${
                        transferErrors.panNo ? "border-red-500" : "border-gray-300"
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
                      <FaMobileAlt className="mr-2 text-emerald-600" /> Mobile Number{" "}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobileNo"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        transferErrors.mobileNo ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                      placeholder="10-digit mobile number"
                    />
                    {transferErrors.mobileNo && (
                      <p className="mt-1 text-sm text-red-600">{transferErrors.mobileNo}</p>
                    )}
                  </div>

                  {/* Type of Investment - Checkboxes */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="traderType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Type of Investment <span className="text-red-500 ml-1">*</span>
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
                        transferErrors.existingBroker ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-700 shadow-sm`}
                    >
                      <option value="">Select Your Broker</option>
                      {brokerOptions.map((broker) => (
                        <option key={broker.value} value={broker.value}>
                          {broker.label}
                        </option>
                      ))}
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
          </div>

          <motion.div
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
          </motion.div>
        </div>
      </section>
    </>
  );
}