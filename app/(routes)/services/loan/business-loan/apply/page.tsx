"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import {
  Building2,
  Users,
  ArrowRight,
  ArrowLeft,
  Wallet,
  TrendingUp,
} from "lucide-react";

const BusinessLoanApplyPage = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    employmentType: "business-owner",
    company: "",
    annualIncome: "",
    address: "",
    city: "",
    pincode: "",

    // Business Info
    businessName: "",
    gstNumber: "",
    businessVintage: "", // years
    businessTurnover: "",
    natureOfBusiness: "",
    businessAddress: "",
    businessCity: "",
    businessPincode: "",
    existingLoan: "no",
    existingLoanAmount: "",

    // Loan Request
    loanPurpose: "",
    loanAmount: "",
    useOfFunds: {
      equipment: "",
      workingCapital: "",
      expansion: "",
      marketing: "",
      other: "",
    },
    repaymentSource: "",
    preferredTenure: "",

    // Co-Applicant
    hasCoApplicant: false,
    coApplicant: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      relationship: "",
      income: "",
      panNumber: "",
    },
  });

  const [activeSection, setActiveSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith("coApplicant.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        coApplicant: { ...prev.coApplicant, [field]: value },
      }));
    } else if (name === "hasCoApplicant") {
      setFormData((prev) => ({ ...prev, hasCoApplicant: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUseOfFundsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      useOfFunds: { ...prev.useOfFunds, [name]: value },
    }));
  };

  const nextSection = () => {
    if (activeSection < 4) setActiveSection((prev) => prev + 1);
  };

  const prevSection = () => {
    if (activeSection > 1) setActiveSection((prev) => prev - 1);
  };

  const totalUseOfFunds = () => {
    return Object.values(formData.useOfFunds).reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          loanType: "business",
          businessTurnover: formData.businessTurnover,
          applicationStatus: "SUBMITTED",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // router.push('/services/loan/business/thank-you');
      } else {
        alert(`Error: ${result.error}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span
              className={activeSection >= 1 ? "font-medium text-blue-700" : ""}
            >
              Personal & Business Info
            </span>
            <span
              className={activeSection >= 2 ? "font-medium text-blue-700" : ""}
            >
              Loan Details
            </span>
            <span
              className={activeSection >= 3 ? "font-medium text-blue-700" : ""}
            >
              Co-Applicant
            </span>
            <span
              className={activeSection >= 4 ? "font-medium text-blue-700" : ""}
            >
              Review
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(activeSection / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Section 1: Personal & Business Info */}
          {activeSection === 1 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Building2 className="w-6 h-6 mr-3 text-blue-600" />
                Personal & Business Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                    Personal Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Number *
                      </label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        required
                        placeholder="ABCDE1234F"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income *
                    </label>
                    <select
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select Income</option>
                      <option value="5-10">₹5–10 Lakhs</option>
                      <option value="10-15">₹10–15 Lakhs</option>
                      <option value="15-25">₹15–25 Lakhs</option>
                      <option value="25+">₹25+ Lakhs</option>
                    </select>
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                    Business Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Number *
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      required
                      placeholder="22AAAAA0000A1Z5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nature of Business *
                    </label>
                    <select
                      name="natureOfBusiness"
                      value={formData.natureOfBusiness}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select Type</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="trading">Trading</option>
                      <option value="services">Services</option>
                      <option value="retail">Retail</option>
                      <option value="it">IT/Software</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Vintage *
                      </label>
                      <select
                        name="businessVintage"
                        value={formData.businessVintage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Years in Operation</option>
                        <option value="1-2">1-2 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="6-10">6-10 Years</option>
                        <option value="10+">10+ Years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Turnover *
                      </label>
                      <select
                        name="businessTurnover"
                        value={formData.businessTurnover}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select Turnover</option>
                        <option value="1500000">₹15 Lakhs</option>
                        <option value="2500000">₹25 Lakhs</option>
                        <option value="5000000">₹50 Lakhs</option>
                        <option value="10000000">₹1 Crore</option>
                        <option value="25000000">₹2.5 Crores</option>
                        <option value="50000000">₹5 Crores</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <textarea
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="businessCity"
                        value={formData.businessCity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="businessPincode"
                        value={formData.businessPincode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Loan Details */}
          {activeSection === 2 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Wallet className="w-6 h-6 mr-3 text-blue-600" />
                Loan Request & Business Plan
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Purpose *
                  </label>
                  <select
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Purpose</option>
                    <option value="working-capital">Working Capital</option>
                    <option value="business-expansion">
                      Business Expansion
                    </option>
                    <option value="equipment-purchase">
                      Equipment Purchase
                    </option>
                    <option value="debt-consolidation">
                      Debt Consolidation
                    </option>
                    <option value="new-branch">New Branch Setup</option>
                    <option value="marketing-campaign">
                      Marketing Campaign
                    </option>
                    <option value="inventory">Inventory Purchase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount Requested (₹) *
                  </label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 5000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Tenure *
                  </label>
                  <select
                    name="preferredTenure"
                    value={formData.preferredTenure}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Tenure</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="7">7 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use of Funds Breakdown (₹)
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Total should match loan amount
                  </p>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600">
                          Equipment
                        </label>
                        <input
                          type="number"
                          name="equipment"
                          value={formData.useOfFunds.equipment}
                          onChange={handleUseOfFundsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">
                          Working Capital
                        </label>
                        <input
                          type="number"
                          name="workingCapital"
                          value={formData.useOfFunds.workingCapital}
                          onChange={handleUseOfFundsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600">
                          Expansion
                        </label>
                        <input
                          type="number"
                          name="expansion"
                          value={formData.useOfFunds.expansion}
                          onChange={handleUseOfFundsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600">
                          Marketing
                        </label>
                        <input
                          type="number"
                          name="marketing"
                          value={formData.useOfFunds.marketing}
                          onChange={handleUseOfFundsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600">
                        Other
                      </label>
                      <input
                        type="number"
                        name="other"
                        value={formData.useOfFunds.other}
                        onChange={handleUseOfFundsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    Total: ₹{totalUseOfFunds().toLocaleString()} / ₹
                    {formData.loanAmount || 0}
                    {formData.loanAmount &&
                      totalUseOfFunds() !== parseFloat(formData.loanAmount) && (
                        <span className="text-red-500 ml-2">
                          • Amounts don&apos;t match
                        </span>
                      )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Repayment Source *
                  </label>
                  <select
                    name="repaymentSource"
                    value={formData.repaymentSource}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select Source</option>
                    <option value="business-revenue">Business Revenue</option>
                    <option value="personal-income">Personal Income</option>
                    <option value="investment-income">Investment Income</option>
                    <option value="asset-sale">Asset Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have existing business loans? *
                  </label>
                  <div className="flex gap-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="existingLoan"
                        value="yes"
                        checked={formData.existingLoan === "yes"}
                        onChange={handleChange}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="existingLoan"
                        value="no"
                        checked={formData.existingLoan === "no"}
                        onChange={handleChange}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                  </div>
                  {formData.existingLoan === "yes" && (
                    <div className="mt-3 ml-6">
                      <label className="block text-sm text-gray-600">
                        Outstanding Amount (₹)
                      </label>
                      <input
                        type="number"
                        name="existingLoanAmount"
                        value={formData.existingLoanAmount}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Co-Applicant */}
          {activeSection === 3 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                Co-Applicant Information
              </h2>

              <div className="mb-6">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    name="hasCoApplicant"
                    checked={formData.hasCoApplicant}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="ml-2 font-medium">
                    Add a co-applicant (optional)
                  </span>
                </label>
              </div>

              {formData.hasCoApplicant && (
                <div className="bg-gray-50 p-6 rounded-lg space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="coApplicant.firstName"
                        value={formData.coApplicant.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="coApplicant.lastName"
                        value={formData.coApplicant.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="coApplicant.email"
                        value={formData.coApplicant.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="coApplicant.phone"
                        value={formData.coApplicant.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        name="coApplicant.panNumber"
                        value={formData.coApplicant.panNumber}
                        onChange={handleChange}
                        required
                        placeholder="ABCDE1234F"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship to Applicant
                      </label>
                      <select
                        name="coApplicant.relationship"
                        value={formData.coApplicant.relationship}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Select Relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="parent">Parent</option>
                        <option value="child">Child</option>
                        <option value="partner">Business Partner</option>
                        <option value="sibling">Sibling</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Co-Applicant Annual Income (₹)
                    </label>
                    <select
                      name="coApplicant.income"
                      value={formData.coApplicant.income}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select Income</option>
                      <option value="3-5">₹3–5 Lakhs</option>
                      <option value="5-10">₹5–10 Lakhs</option>
                      <option value="10-15">₹10–15 Lakhs</option>
                      <option value="15-25">₹15–25 Lakhs</option>
                      <option value="25+">₹25+ Lakhs</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Review */}
          {activeSection === 4 && (
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Review & Submit
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applicant:</span>
                  <span className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Business:</span>
                  <span className="font-medium">{formData.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-medium">
                    ₹{formData.loanAmount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-medium">{formData.loanPurpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenure:</span>
                  <span className="font-medium">
                    {formData.preferredTenure} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Co-Applicant:</span>
                  <span className="font-medium">
                    {formData.hasCoApplicant ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> By submitting, you confirm that all
                  information provided is accurate and you authorize us to
                  verify your details.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between p-8 border-t border-gray-200">
            {activeSection > 1 ? (
              <button
                type="button"
                onClick={prevSection}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {activeSection < 4 ? (
              <button
                type="button"
                onClick={nextSection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessLoanApplyPage;
