// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaGift,
  FaHeadset,
  FaLightbulb,
  FaRupeeSign,
  FaShieldAlt,
  FaUserTie,
  FaWallet,
  FaSpinner, 
  FaCheck
} from "react-icons/fa";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

// --- TYPES ---
type Broker = {
  name: string;
  logo: string;
  link: string;
  brokerage: string[];
};

// --- DATA ---
const brokers: Broker[] = [
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/mutual-funds-investment?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
    brokerage:["• Smart mutual fund investing with expert recommendations",
    "• Research-driven suggestions to grow your portfolio",
    "• Smooth, flexible tracking of investments",
    "• User-friendly platform for all experience levels",
    "• Hassle-free wealth creation made simple",
    "• 0 AMC charges — more money stays invested"]
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "  https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814",
    brokerage:["• 30+ years of wealth management expertise",
    "• ₹4.6+ trillion client assets under management",
    "• Personalized wealth and investment solutions",
    "• Alternative strategies for steady returns",
    "• Private markets, EDGE funds, Infinity portfolios",]
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    link: "  https://www.njindiaonline.com/etada/partintiate.fin?cmdAction=showMenu&njBrcode=47283", 
    brokerage:["• India’s largest mutual fund distributor",
    "• Advanced advisory tools for smarter investing",
    "• Vast partner network for wider access",
    "• Seamless, paperless transactions",
    "• Empowers investors to grow wealth smartly",
    "• 0 AMC charges — invest more, pay less"]
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "  https://fundzbazar.com/Link/jRkmixvcvvw  ",
    brokerage:["• Trusted investment platform with 25+ years of expertise",
    "• Powerful research support for informed decisions",
    "• Personalized investment guidance for all investors",
    "• Simplifies mutual fund investments",
    "• Backed by a strong track record of trust",
    "• 0 AMC charges — maximum savings for clients"]
  },
];

type PreferencesFormData = {
  name: string;
  clientId: string;
  fundType: string[]; // Changed to array for checkboxes
  company: string;
};

// --- SUB-COMPONENTS ---
const BrokerCard = ({ broker }: { broker: Broker }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-green-200 overflow-hidden">
      {/* Top Section */}
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-4 flex items-center justify-center bg-green-50 rounded-full">
          <Image
            src={broker.logo}
            alt={`${broker.name} logo`}
            width={80}
            height={80}
            className="max-h-full max-w-full object-contain p-2"
          />
        </div>
        <h2 className="text-xl font-semibold text-green-800">{broker.name}</h2>
      </div>

      {/* Brokerage Details (Collapsible) */}
      {isExpanded && (
        <div className="px-6 pb-4 text-left bg-white">
          <h3 className="font-bold text-green-800 mb-2">Description:</h3>
          <ul className="space-y-1">
            {broker.brokerage.map((detail, index) => (
              <li
                key={index}
                className="text-xs text-green-900 leading-relaxed"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer & Actions */}
      <div className="mt-auto p-4 bg-gray-50 border-t border-green-100 flex flex-col space-y-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-sm text-green-700 font-semibold flex items-center justify-center hover:text-green-900 transition-colors"
        >
          {isExpanded ? "Hide" : "View Description"}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          )}
        </button>
        <Link
          href={broker.link}
          target="_blank"
          className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-lg text-base font-semibold hover:bg-green-700 transition text-center shadow-md"
        >
          Open Account
        </Link>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(
    null
  );
    const [preferencesForm, setPreferencesForm] = useState<PreferencesFormData>({
    name: "",
    clientId: "",
    fundType: [], // Initialize as empty array
    company: "",
  });
  const [preferencesErrors, setPreferencesErrors] = useState<Record<string, string>>({});
  const [isPreferencesSubmitting, setIsPreferencesSubmitting] = useState(false);
  const [preferencesMessage, setPreferencesMessage] = useState<{ text: string; type: string } | null>(null);

  // Add handler for preferences form
  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle fundType checkboxes specially
    if (name === "fundType") {
      const checked = (e.target as HTMLInputElement).checked;
      setPreferencesForm(prev => {
        const newFundTypes = checked
          ? [...prev.fundType, value] // Add value if checked
          : prev.fundType.filter(type => type !== value); // Remove value if unchecked
        return { ...prev, fundType: newFundTypes };
      });
      
      // Clear error when user selects an option
      if (preferencesErrors.fundType) {
        setPreferencesErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.fundType;
          return newErrors;
        });
      }
    } else {
      // Handle other fields normally
      setPreferencesForm(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user types
      if (preferencesErrors[name]) {
        setPreferencesErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  // Add validation for preferences form
  const validatePreferencesForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!preferencesForm.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!preferencesForm.clientId.trim()) {
      newErrors.clientId = "Client ID is required";
    }
    
    if (preferencesForm.fundType.length === 0) {
      newErrors.fundType = "Select at least one fund type";
    }
    
    if (!preferencesForm.company.trim()) {
      newErrors.company = "Company is required";
    }
    
    setPreferencesErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add submit handler for preferences form
  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePreferencesForm()) {
      return;
    }
    
    setIsPreferencesSubmitting(true);
    setPreferencesMessage(null);
    
    try {
      const response = await fetch("/api/mfpreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...preferencesForm,
          fundType: preferencesForm.fundType.join(',') // Convert array to comma-separated string
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPreferencesMessage({
          text: "Thank you for submitting your preferences!",
          type: "success",
        });
        
        // Reset form
        setPreferencesForm({
          name: "",
          clientId: "",
          fundType: [],
          company: "",
        });
        
        // Clear errors
        setPreferencesErrors({});
      } else {
        throw new Error(data.error || "Failed to submit preferences");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setPreferencesMessage({
        text: error.message || "Failed to submit preferences. Please try again.",
        type: "error",
      });
    } finally {
      setIsPreferencesSubmitting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: "Please enter your email address", type: "error" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
      } else {
        setMessage({
          text: data.error || "Subscription failed",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Subscription failed. Please sign-in to subscribe.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-30 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Open Your Mutual Funds Account
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-green-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join thousands of smart investors getting{" "}
            <span className="font-semibold text-green-900">
              portfolio insights
            </span>{" "}
            when they open their account through us.
          </motion.p>
        </div>

        {/* Benefits */}
        <section className="bg-white border border-green-200 rounded-2xl shadow-md p-6 md:p-8 mb-16">
          <motion.h3
            className="text-2xl font-bold text-green-800 text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Why Choose Us?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaWallet />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Get Best-Fit Funds, Always
              </h4>
              <p className="text-green-700 text-sm">
                We guide you with the best fund options for the current market and provide complete fund details.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaLightbulb />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Full Support, Anytime
              </h4>
              <p className="text-green-700 text-sm">
                Dedicated calling support for any changes or help you need — hassle-free.
              </p>
            </motion.div>

            <motion.div
              className="bg-green-50 rounded-2xl p-6 flex flex-col items-start text-left border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl">
                <FaGift />
              </div>
              <h4 className="font-semibold text-green-800 mb-2 text-lg">
                Your Fiscal Forum Investment Kit
              </h4>
              <p className="text-green-700 text-sm">
                Stay consistent and confident in your investment journey with our exclusive kit.
              </p>
            </motion.div>
          </div>
        </section>

         <motion.section 
          className="bg-white border border-green-200 rounded-2xl shadow-md p-6 md:p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-green-800 text-center mb-8">
            Add Your Preferences
          </h3>
          
          {preferencesMessage && (
            <div
              className={`mb-6 p-4 rounded-2xl text-center ${
                preferencesMessage.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {preferencesMessage.type === "success" ? (
                <FaCheck className="inline mr-2" />
              ) : null}
              {preferencesMessage.text}
            </div>
          )}
          
          <form onSubmit={handlePreferencesSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={preferencesForm.name}
                  onChange={handlePreferencesChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    preferencesErrors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="Enter your full name"
                />
                {preferencesErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{preferencesErrors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="clientId"
                  value={preferencesForm.clientId}
                  onChange={handlePreferencesChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    preferencesErrors.clientId ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="Enter your client ID"
                />
                {preferencesErrors.clientId && (
                  <p className="mt-1 text-sm text-red-600">{preferencesErrors.clientId}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Fund Types <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-2">
                  {[
                    { value: "Equity", label: "Equity" },
                    { value: "Debt", label: "Debt" },
                    { value: "Hybrid", label: "Hybrid" },
                    { value: "Index", label: "Index" },
                    { value: "Sectoral", label: "Sectoral" },
                  ].map((fund) => (
                    <div key={fund.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`fundType-${fund.value}`}
                        name="fundType"
                        value={fund.value}
                        checked={preferencesForm.fundType.includes(fund.value)}
                        onChange={handlePreferencesChange}
                        className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                      />
                      <label 
                        htmlFor={`fundType-${fund.value}`} 
                        className="ml-2 text-gray-700 text-sm"
                      >
                        {fund.label}
                      </label>
                    </div>
                  ))}
                </div>
                {preferencesErrors.fundType && (
                  <p className="mt-1 text-sm text-red-600">{preferencesErrors.fundType}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={preferencesForm.company}
                  onChange={handlePreferencesChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    preferencesErrors.company ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition`}
                  placeholder="Enter preferred company"
                />
                {preferencesErrors.company && (
                  <p className="mt-1 text-sm text-red-600">{preferencesErrors.company}</p>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPreferencesSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center ${
                  isPreferencesSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                }`}
              >
                {isPreferencesSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Submitting...
                  </>
                ) : (
                  "Submit Preferences"
                )}
              </button>
            </div>
          </form>
        </motion.section>

        {/* Brokers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {brokers.map((broker) => (
            <motion.div
              key={broker.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <BrokerCard broker={broker} />
            </motion.div>
          ))}
        </div>

        {/* How to Transfer Section */}
        {/* <section className="py-12 px-4 sm:px-6 mb-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                If you want to transfer your holdings with us, See how you can!
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Seamless, paperless, and completed in just a few steps.
              </p>
            </motion.div>

            <div className="relative space-y-8">
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
                    Open a Demat Account with Us
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Log in to your current broker’s portal and generate a Client
                    Master Report (CMR) or submit a DIS slip.
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
                    Log in to your current broker’s portal and generate a Client
                    Master Report (CMR) or submit a DIS slip.
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
                    Share Details with Us
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Email CMR or DIS to support@fiscalforum.in with your
                    name and client ID.
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
                    Our team coordinates with your current broker to initiate
                    the transfer. No action needed from you.
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
                    Your holdings will be transferred in 3-7 working days.
                    You&apos;ll receive a confirmation email.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
            className="mt-12 text-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}>
                <h3 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
                Click here to share your DIS/CMR
              </h3>
                <button
                  onClick={() => {
                    try {
                      // Try to open Gmail compose window
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&to=business.fiscalforum@gmail.com&su=DIS%20Form%20Submission&body=Please%20find%20attached%20my%20DIS%20form.",
                        "_blank"
                      );
                    } catch (error) {
                      // Fallback to default email client
                      window.location.href =
                        "mailto:business.fiscalforum@gmail.com?subject=DIS%20Form%20Submission&body=Please%20find%20attached%20my%20DIS%20form.";
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  Share with - support@fiscalforum.in
                </button>
              </motion.div>

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
        </section> */}
      </div>
    </main>
  );
}