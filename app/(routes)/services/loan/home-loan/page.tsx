"use client";
import React, { useState } from 'react';
import { 
  Home, Calculator, Clock, FileText, Percent, Users, 
  ArrowRight, Phone, TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeLoanPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(7500000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const router = useRouter();

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    const emi = principal * rate * (Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'process', label: 'Process', icon: Clock }
  ];

  const eligibilityCriteria = [
    "Age: 21-65 years for salaried, 25-70 years for self-employed",
    "Minimum income: ₹30,000 per month for salaried individuals",
    "Employment: Minimum 2 years experience in current job",
    "Credit Score: 750+ preferred for best rates",
    "Debt-to-Income ratio below 50%",
    "Property must have clear title and approved building plan"
  ];

  const requiredDocuments = [
    "Identity Proof: Aadhaar Card, PAN Card, Passport",
    "Address Proof: Utility bills, Aadhaar, rental agreement",
    "Income Proof: Salary slips (3 months), Form 16, ITR (2 years)",
    "Bank Statements: Last 6 months",
    "Property Documents: Sale agreement, NOC from builder, approved layout",
    "Employment Proof: Employment certificate, offer letter"
  ];

  const interestRates = [
    { category: "Salaried - Premium customers", rate: "8.50% - 9.25%" },
    { category: "Salaried - Regular customers", rate: "8.75% - 9.50%" },
    { category: "Self-employed - Premium", rate: "9.00% - 9.75%" },
    { category: "Self-employed - Regular", rate: "9.25% - 10.00%" },
    { category: "Women borrowers", rate: "8.45% - 9.20%" },
    { category: "Balance Transfer", rate: "8.40% - 9.15%" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Fill the application form with basic details" },
    { step: 2, title: "Document Upload", description: "Upload KYC and income documents" },
    { step: 3, title: "Property Evaluation", description: "Our team inspects the property valuation" },
    { step: 4, title: "Credit Approval", description: "Get loan eligibility and approval within 48 hours" },
    { step: 5, title: "Sanction Letter", description: "Receive loan terms and sanction details" },
    { step: 6, title: "Disbursement", description: "Funds disbursed directly to builder or seller" }
  ];

  const benefits = [
    "Competitive interest rates starting from 8.5%",
    "Loan amount up to ₹5 Crores",
    "Flexible tenure up to 30 years",
    "Minimal processing fees (0.5% - 1%)",
    "Quick approval in 72 hours",
    "Tax benefits under Section 80C and 24(b)",
    "Balance transfer with lower interest rates",
    "Top-up loan for renovation or upgrades"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Home Loan Overview</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Turn your dream of homeownership into reality with our comprehensive Home Loan solutions. 
                We offer competitive interest rates, flexible repayment options, and quick processing to 
                help you secure your perfect home. Whether you&apos;re a first-time buyer or upgrading, 
                we’re here to support your journey.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8.5%</div>
                  <div className="text-gray-600">Starting Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">₹5 Cr</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30 Years</div>
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
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
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
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
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
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount: ₹{loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="500000"
                      max="50000000"
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
                      max="30"
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
                      min="8"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Monthly EMI</h4>
                  <div className="text-4xl font-bold text-blue-600 mb-4">
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
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Customer Category</th>
                    <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRates.map((rate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-gray-800">{rate.category}</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">{rate.rate}</td>
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
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 h-[40vh] flex items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Home className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Home Loan</h1>
              <p className="text-xl opacity-90 mt-2">Turn your dream home into reality</p>
            </div>
          </div>
          <p className="text-lg opacity-95 max-w-3xl">
            Get competitive interest rates starting from 8.5% with flexible tenure up to 30 years. 
            Quick approval process and minimal documentation required.
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
                      ? 'border-blue-600 text-blue-600'
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
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Buy Your Dream Home?</h3>
          <p className="text-lg mb-6 opacity-90">
            Apply now and get pre-approved within 24 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push(`/services/loan/home-loan/apply`)}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
            onClick={() => router.push(`/services/loan/home-loan/contact`)}className="border-2 border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Talk to Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanPage;