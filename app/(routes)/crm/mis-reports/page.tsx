// components/DocumentLinkForm.tsx
"use client";

import { useState } from "react";
import { FaFileAlt, FaLink, FaUser, FaEnvelope, FaInfoCircle } from "react-icons/fa";

export default function DocumentLinkForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    documentLink: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.documentLink) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.documentLink);
    } catch {
      setMessage({ text: "Please enter a valid document URL", type: "error" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/mis-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "MIS Report submitted successfully!", type: "success" });
        setFormData({ name: "", email: "", documentLink: "" }); // Clear the form
      } else {
        throw new Error(data.error || "Failed to submit report");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      setMessage({ 
        text: error.message || "Failed to submit MIS report", 
        type: "error" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
            <FaFileAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Submit Your MIS Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your Management Information System report with our team for analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full border border-emerald-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                  <FaInfoCircle className="text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">What is an MIS Report?</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  A Management Information System (MIS) report is a crucial business tool that provides 
                  managers with the information they need to make informed decisions.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-emerald-800 mb-2">Key Benefits:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>Tracks business performance and KPIs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>Identifies trends and patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>Supports strategic planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>Improves operational efficiency</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">Common MIS Reports Include:</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Sales Performance Reports</li>
                    <li>• Financial Statements</li>
                    <li>• Inventory Reports</li>
                    <li>• Customer Analytics</li>
                    <li>• Employee Productivity Reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                  <FaLink className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Submit Report Link</h2>
                  <p className="text-gray-600">Please provide your details and the public link to your MIS report</p>
                </div>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="documentLink" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Document Drive Public Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLink className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="documentLink"
                      name="documentLink"
                      value={formData.documentLink}
                      onChange={handleInputChange}
                      placeholder="https://drive.google.com/file/d/..."
                      required
                      className="pl-10 w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Make sure the link is publicly accessible. Supported formats: PDF, DOC, XLSX
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-1 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    How to get a public link?
                  </h3>
                  <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                    <li>Upload your file to Google Drive</li>
                    <li>Right-click the file and select &quot;Get link&quot;</li>
                    <li>Change sharing settings to &quot;Anyone with the link&quot;</li>
                    <li>Copy the link and paste it above</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
                    isSubmitting
                      ? "bg-emerald-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg"
                  } transition-all duration-300`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit MIS Report"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}