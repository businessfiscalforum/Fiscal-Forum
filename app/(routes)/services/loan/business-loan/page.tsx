"use client";
import React, { useState } from 'react';
import { 
  Briefcase, Calculator, Clock, FileText, Percent, Users, 
  ArrowRight, Phone, TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const BusinessLoanPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(11.0);
  const router = useRouter();

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    const emi = principal * rate * (Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'process', label: 'Process', icon: Clock }
  ];

  const eligibilityCriteria = [
    "Age: 25-70 years for self-employed, 28-65 for salaried business owners",
    "Minimum annual turnover: ₹15 Lakhs for MSMEs",
    "Business vintage: Minimum 3 years in operation",
    "Credit Score: 720+ preferred",
    "Debt-to-Income ratio below 50%",
    "GST registration mandatory for businesses"
  ];

  const requiredDocuments = [
    "Business Proof: GST Certificate, PAN, MSME Registration",
    "Identity & Address: Aadhaar, PAN, Voter ID",
    "Financials: ITR (2 years), Balance Sheet, P&L Statement",
    "Bank Statements: Business account (12 months)",
    "Business Address Proof: Utility bills, rent agreement",
    "Project Report (if applicable)"
  ];

  const interestRates = [
    { category: "MSMEs - Turnover < ₹5 Cr", rate: "11.0% - 13.5%" },
    { category: "Manufacturing Units", rate: "10.5% - 12.75%" },
    { category: "Women Entrepreneurs", rate: "10.25% - 12.50%" },
    { category: "Startups (Govt. Scheme)", rate: "9.50% - 11.00%" },
    { category: "Large Enterprises", rate: "10.0% - 12.0%" },
    { category: "Balance Transfer", rate: "9.75% - 11.50%" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Submit basic business and financial details" },
    { step: 2, title: "Document Submission", description: "Upload KYC and financial documents" },
    { step: 3, title: "Business Evaluation", description: "Our team assesses your business health" },
    { step: 4, title: "Credit Approval", description: "Quick approval decision within 48 hours" },
    { step: 5, title: "Sanction Letter", description: "Receive loan terms and sanction details" },
    { step: 6, title: "Disbursement", description: "Funds credited to your business account" }
  ];

  const benefits = [
    "Loan amount up to ₹50 Crores",
    "Flexible tenure from 1 to 10 years",
    "Fast approval in 72 hours",
    "Minimal documentation for existing customers",
    "Dedicated relationship manager",
    "Top-up facility available",
    "Customized repayment options",
    "Special rates for women entrepreneurs"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-8 rounded-2xl ">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Loan Overview</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Fuel your business growth with our tailored Business Loan solutions. Whether you&apos;re expanding operations, 
                upgrading equipment, or managing working capital, we offer fast approvals, competitive rates, 
                and flexible repayment to support your entrepreneurial journey.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">11%</div>
                  <div className="text-gray-600">Starting Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">₹50 Cr</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10 Years</div>
                  <div className="text-gray-600">Maximum Tenure</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'eligibility':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Eligibility Criteria</h3>
            <div className="grid gap-4">
              {eligibilityCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Required Documents</h3>
            <div className="grid gap-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'calculator':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">EMI Calculator</h3>
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount: ₹{loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="500000"
                      max="500000000"
                      step="100000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenure: {tenure} years
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate: {interestRate}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="18"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Monthly EMI</h4>
                  <div className="text-4xl font-bold text-orange-600 mb-4">
                    ₹{calculateEMI().toLocaleString()}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span>₹{loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span>₹{((calculateEMI() * tenure * 12) - loanAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>₹{(calculateEMI() * tenure * 12).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'rates':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Interest Rates</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Customer Category</th>
                    <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRates.map((rate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-gray-800">{rate.category}</td>
                      <td className="px-6 py-4 text-orange-600 font-semibold">{rate.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'process':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Application Process</h3>
            <div className="space-y-4">
              {applicationProcess.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-orange-50 rounded-lg">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white ">
        <div className="max-w-7xl mx-auto px-4 py-16 h-[40vh] flex items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Business Loan</h1>
              <p className="text-xl opacity-90 mt-2">Fuel your business growth with flexible financing</p>
            </div>
          </div>
          <p className="text-lg opacity-95 max-w-3xl">
            Get funds up to ₹50 Crores with competitive rates starting from 11%. Fast approval, minimal paperwork, and dedicated support for entrepreneurs.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderTabContent()}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Business?</h3>
          <p className="text-lg mb-6 opacity-90">
            Apply now and get pre-approved in under 24 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/services/loan/business-loan/apply')}
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
            onClick={() => router.push('/services/loan/business-loan/call')}
            className="border-2 border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Talk to Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoanPage;