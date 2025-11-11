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
import { CheckCircle, ChevronDown, ChevronUp, X } from "lucide-react"; 
import { motion } from "framer-motion";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

// --- TYPES ---
type Broker = {
  name: string;
  logo: string;
  link: string;
  brokerage: string[];
};

type PreferencesFormData = {
  name: string;
  clientId: string;
  fundType: string[]; // Changed to array for checkboxes
  company: string;
};

// --- DATA ---
const brokers: Broker[] = [
  {
    name: "Choice",
    logo: "/choice.png",
    link: "https://choiceindia.com/mutual-funds-investment?refercode=QzAwMTExMzI=&source=Q0hPSUNFX0NPTk5FQ1Q=",
    brokerage:[
      "• Smart mutual fund investing with expert recommendations",
      "• Research-driven suggestions to grow your portfolio",
      "• Smooth, flexible tracking of investments",
      "• User-friendly platform for all experience levels",
      "• Hassle-free wealth creation made simple",
      "• 0 AMC charges — more money stays invested"
    ]
  },
  {
    name: "Nuvama",
    logo: "/nuvama.png",
    link: "https://onboarding.nuvamawealth.com/Partner?utm_source=EMPLOYEE&utm_campaign=43065&utm_content=ELITE&utm_term=1572814",
    brokerage:[
      "• 30+ years of wealth management expertise",
      "• ₹4.6+ trillion client assets under management",
      "• Personalized wealth and investment solutions",
      "• Alternative strategies for steady returns",
      "• Private markets, EDGE funds, Infinity portfolios",
    ]
  },
  {
    name: "NJ Wealth",
    logo: "/Nj-wealth.png",
    link: "http://p.njw.bz/47283", 
    brokerage:[
      "• India’s largest mutual fund distributor",
      "• Advanced advisory tools for smarter investing",
      "• Vast partner network for wider access",
      "• Seamless, paperless transactions",
      "• Empowers investors to grow wealth smartly",
      "• 0 AMC charges — invest more, pay less"
    ]
  },
  {
    name: "Prudent",
    logo: "/prudent.png",
    link: "https://fundzbazar.com/Link/jRkmixvcvvw",
    brokerage:[
      "• Trusted investment platform with 25+ years of expertise",
      "• Powerful research support for informed decisions",
      "• Personalized investment guidance for all investors",
      "• Simplifies mutual fund investments",
      "• Backed by a strong track record of trust",
      "• 0 AMC charges — maximum savings for clients"
    ]
  },
];


// --- SUB-COMPONENT: BrokerCard ---
const BrokerCard = ({ broker, onOpenModal }: { broker: Broker, onOpenModal: (broker: Broker) => void }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-green-200 overflow-hidden h-full">
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

      {/* Brokerage Details (Fixed Height Section) */}
      <div className="px-6 pb-4 text-left bg-white flex-grow">
        <h3 className="font-bold text-green-800 mb-2">Key Benefits:</h3>
        <ul className="space-y-1">
          {broker.brokerage.slice(0, 3).map((detail, index) => ( 
            <li
              key={index}
              className="text-xs text-green-900 leading-relaxed truncate"
            >
              {detail}
            </li>
          ))}
          {broker.brokerage.length > 3 && (
             <li className="text-xs text-green-700 leading-relaxed font-semibold cursor-pointer pt-1" onClick={() => onOpenModal(broker)}>
                ... View All Details
            </li>
          )}
        </ul>
      </div>

      {/* Footer & Actions (Fixed height bottom) */}
      <div className="mt-auto p-4 bg-gray-50 border-t border-green-100 flex flex-col space-y-3">
        <button
          onClick={() => onOpenModal(broker)}
          className="w-full px-4 py-2  bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg text-base font-semibold transition text-center shadow-md"
        >
          Open Account
        </button>
      </div>
    </div>
  );
};


// --- NEW COMPONENT: DematAccountModal (for detailed comparison) ---
const DematAccountModal = ({ isOpen, closeModal, broker }: { isOpen: boolean, closeModal: () => void, broker: Broker | null }) => {
    if (!broker) return null;

    return (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 z-50 overflow-y-auto">
                <DialogPanel
                    transition
                    className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl border border-gray-200 transform transition-all data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-8">
                        {/* Left Side: Logo & Quick Details */}
                        <div className="flex flex-col items-center justify-start space-y-6 md:border-r md:pr-6 border-gray-100">
                            <div className="text-center w-full relative">
                                {/* Close Button for mobile/convenience */}
                                <button onClick={closeModal} className="absolute top-0 right-0 md:hidden text-gray-500 hover:text-gray-900">
                                     <X size={24} />
                                </button>
                                
                                <DialogTitle className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                                    {broker.name}
                                </DialogTitle>
                                <p className="text-green-600 text-base md:text-lg">
                                    Trusted Mutual Fund Partner
                                </p>
                            </div>

                            <div className="w-full flex items-center justify-center py-4 bg-green-50 rounded-xl border border-green-100">
                                <Image
                                    src={broker.logo}
                                    alt={`${broker.name} Logo`}
                                    width={150}
                                    height={150}
                                    className="object-contain max-h-[150px] max-w-[150px] p-2"
                                />
                            </div>

                            {/* Account Opening Link Card */}
                            <div className="w-full bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                                <p className="text-sm text-emerald-800 font-semibold">
                                    Direct Investment Link
                                </p>
                                <Link
                                    href={broker.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeModal}
                                    className="text-lg font-bold text-emerald-600 block truncate hover:text-emerald-700 transition"
                                >
                                    Click to View Plans
                                </Link>
                            </div>
                            
                             {/* Exclusive Reward Card */}
                             <div className="w-full bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                                <p className="text-sm text-yellow-800 font-semibold">
                                    Exclusive Fiscal Forum Bonus
                                </p>
                                <p className="text-lg font-bold text-yellow-600">
                                    Personalized Investment Strategy
                                </p>
                            </div>
                            
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-lg font-semibold mt-4 hidden md:block"
                            >
                                Close Comparison
                            </button>
                        </div>

                        {/* Right Side: Detailed Brokerage List (Benefits) */}
                        <div className="flex flex-col justify-start space-y-6">
                            <div className="space-y-5 overflow-y-auto max-h-[70vh] pr-2"> 
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                                        Key Investment Benefits
                                    </h3>
                                    <ul className="space-y-3">
                                        {broker.brokerage.map((detail, i) => (
                                            <li
                                                key={i}
                                                className="text-lg text-gray-700 flex items-start gap-2"
                                            >
                                                <span className="text-green-500 mt-1 flex-shrink-0">
                                                    <FaCheck className="w-5 h-5" />
                                                </span>
                                                <span className="font-medium text-gray-800">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Direct Apply Link (Repeated for convenience) */}
                            <div className="flex flex-col justify-end gap-3 pt-4 border-t border-gray-200">
                                <Link
                                    href={broker.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg transition"
                                >
                                    Open {broker.name} Account
                                </Link>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-lg font-semibold md:hidden" 
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function Page() {
  const router = useRouter();
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);

  const openModal = (broker: Broker) => {
    setSelectedBroker(broker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBroker(null);
  };
  // --- END MODAL STATE ---

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
            className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-700 mb-6 leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
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

          {/* <motion.section 
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
        </motion.section> */}

        {/* Brokers List (Container for equal heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {brokers.map((broker) => (
            <motion.div
              key={broker.name}
              // Applied h-full and flex to the motion.div to ensure BrokerCard uses full height
              className="h-full flex" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* CORRECTED: Passing openModal handler */}
              <BrokerCard 
                  broker={broker} 
                  onOpenModal={openModal} 
              />
            </motion.div>
          ))}
        </div>

        {/* The Modal Component */}
        <DematAccountModal 
            isOpen={isModalOpen} 
            closeModal={closeModal} 
            broker={selectedBroker} 
        />
  
      </div>
    </main>
  );
}