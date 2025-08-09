"use client";
import React, { useState } from 'react';
import { 
  Building2, Calculator, Clock, FileText, Percent, Users, 
  ArrowRight, Phone, TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoanAgainstPropertyPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(10);
  const [interestRate, setInterestRate] = useState(9.0);
  const router = useRouter();

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    const emi = principal * rate * (Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'process', label: 'Process', icon: Clock }
  ];

  const eligibilityCriteria = [
    "Age: 25-70 years for self-employed, 28-65 for salaried applicants",
    "Minimum property value: ₹15 Lakhs for residential, ₹25 Lakhs for commercial",
    "Ownership: Clear title, no legal disputes, registered in your name",
    "Credit Score: 700+ preferred for best rates",
    "Income: Stable source of income (salary or business)",
    "Property age: Not more than 25 years for approval"
  ];

  const requiredDocuments = [
    "Identity Proof: Aadhaar, PAN, Passport",
    "Address Proof: Utility bills, Aadhaar, rental agreement",
    "Income Proof: Salary slips (6 months), ITR (2 years), bank statements",
    "Property Documents: Title deed, Encumbrance Certificate, Property tax receipt",
    "Approved Layout Plan & Building Plan",
    "NOC from Society/Builder (if applicable)"
  ];

  const interestRates = [
    { category: "Residential Property", rate: "8.75% - 10.25%" },
    { category: "Commercial Property", rate: "9.25% - 11.00%" },
    { category: "Senior Citizens", rate: "8.50% - 9.75%" },
    { category: "Women Applicants", rate: "8.45% - 9.65%" },
    { category: "Balance Transfer", rate: "8.40% - 9.50%" },
    { category: "High-Value Loans (> ₹5 Cr)", rate: "8.25% - 9.25%" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Submit basic details and property information" },
    { step: 2, title: "Document Submission", description: "Upload KYC and property documents" },
    { step: 3, title: "Property Valuation", description: "Our team inspects and evaluates the property" },
    { step: 4, title: "Credit Approval", description: "Get eligibility confirmation within 48 hours" },
    { step: 5, title: "Sanction Letter", description: "Receive loan terms and approval details" },
    { step: 6, title: "Disbursement", description: "Funds credited to your account within 7 days" }
  ];

  const benefits = [
    "Loan amount up to ₹10 Crores",
    "Flexible tenure up to 15 years",
    "Loan up to 75% of property market value",
    "No end-use restrictions (personal or business)",
    "Quick processing in 7-10 days",
    "Retain ownership and residence rights",
    "Balance transfer with lower interest rates",
    "Top-up facility available after 12 EMIs"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Loan Against Property Overview</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Unlock the value of your property with our Loan Against Property (LAP) solution. 
                Whether you need funds for business expansion, debt consolidation, or personal needs, 
                leverage your real estate asset to get high-value financing at competitive rates.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">8.75%</div>
                  <div className="text-gray-600">Starting Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">₹10 Cr</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">15 Years</div>
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
                <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
                  <Users className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
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
                <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
                  <FileText className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
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
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount: ₹{loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="500000"
                      max="100000000"
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
                      max="15"
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
                  <div className="text-4xl font-bold text-emerald-600 mb-4">
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
                <thead className="bg-emerald-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Property Type / Category</th>
                    <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRates.map((rate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-emerald-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-gray-800">{rate.category}</td>
                      <td className="px-6 py-4 text-emerald-600 font-semibold">{rate.rate}</td>
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
                <div key={index} className="flex items-start gap-4 p-6 bg-emerald-50 rounded-lg">
                  <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 h-[40vh] flex items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Loan Against Property</h1>
              <p className="text-xl opacity-90 mt-2">Unlock value from your property with flexible funding</p>
            </div>
          </div>
          <p className="text-lg opacity-95 max-w-3xl">
            Get funds up to ₹10 Crores at competitive rates starting from 8.75%. Use for any purpose while retaining ownership of your property.
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
                      ? 'border-emerald-500 text-emerald-600'
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
        <div className="mt-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Unlock Your Property&apos;s Value?</h3>
          <p className="text-lg mb-6 opacity-90">
            Apply now and get pre-approved within 48 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/services/loan/loan-against-property/apply')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => router.push('/services/loan/loan-against-property/call')}
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

export default LoanAgainstPropertyPage;