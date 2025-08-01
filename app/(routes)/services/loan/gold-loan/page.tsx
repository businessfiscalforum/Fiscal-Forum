"use client";
import React, { useState } from 'react';
import { 
  Coins, Calculator, Clock, FileText, Percent, Users, 
  ArrowRight, Phone, TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoldLoanPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(3);
  const [interestRate, setInterestRate] = useState(7.5);
  const router = useRouter();

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    const emi = principal * rate * (Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Coins },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'process', label: 'Process', icon: Clock }
  ];

  const eligibilityCriteria = [
    "Age: 18-75 years (Indian resident)",
    "Minimum gold weight: 25 grams for jewelry, 50 grams for coins/bars",
    "Purity: 18 carat or above (75% gold content)",
    "Ownership: Must be self-owned, no third-party claims",
    "Credit Score: Not mandatory, but 650+ improves terms",
    "No active defaults in existing loans"
  ];

  const requiredDocuments = [
    "Identity Proof: Aadhaar, PAN, Passport",
    "Address Proof: Aadhaar, utility bills, rental agreement",
    "Gold Ownership Proof: Purchase invoice, hallmark certificate",
    "Photographs: 2 passport-sized photos",
    "Bank Account Details: Cancelled cheque or passbook",
    "Nominee Details: Name, relationship, ID proof"
  ];

  const interestRates = [
    { category: "Jewelry (18-22 Carat)", rate: "7.50% - 9.50%" },
    { category: "Gold Coins/Bars (24 Carat)", rate: "7.25% - 9.00%" },
    { category: "Senior Citizens", rate: "7.00% - 8.75%" },
    { category: "Women Applicants", rate: "7.25% - 8.75%" },
    { category: "Balance Transfer", rate: "7.00% - 8.50%" },
    { category: "Loan > ₹5 Lakh", rate: "7.25% - 8.25%" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Submit basic details and estimated gold value" },
    { step: 2, title: "Visit Branch", description: "Bring gold ornaments for physical verification" },
    { step: 3, title: "Gold Evaluation", description: "Weighing, purity check, and valuation by expert" },
    { step: 4, title: "Approval", description: "Instant loan eligibility and approval within 1 hour" },
    { step: 5, title: "Documentation", description: "Complete KYC and sign loan agreement" },
    { step: 6, title: "Disbursement", description: "Funds credited to your account within 2 hours" }
  ];

  const benefits = [
    "Loan amount up to ₹1 Crore",
    "Flexible tenure from 6 months to 3 years",
    "Loan up to 75% of gold market value",
    "No credit score required for approval",
    "Interest rates starting from 7.5%",
    "Safe storage in RBI-compliant vaults",
    "Partial withdrawals and top-up available",
    "Prepayment without penalty"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Gold Loan Overview</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Get instant cash against your gold ornaments with our secure and transparent Gold Loan. 
                Whether you need funds for emergencies, medical expenses, or business needs, 
                unlock liquidity while keeping your gold safe with us.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">7.5%</div>
                  <div className="text-gray-600">Starting Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">₹1 Cr</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">3 Years</div>
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
                <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <Users className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
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
                <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <FileText className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
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
            <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount: ₹{loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="50000"
                      max="10000000"
                      step="10000"
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
                      min="0.5"
                      max="3"
                      step="0.5"
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
                      min="7"
                      max="12"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Monthly EMI</h4>
                  <div className="text-4xl font-bold text-yellow-600 mb-4">
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
                <thead className="bg-yellow-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Loan Type / Category</th>
                    <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRates.map((rate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-yellow-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-gray-800">{rate.category}</td>
                      <td className="px-6 py-4 text-yellow-600 font-semibold">{rate.rate}</td>
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
                <div key={index} className="flex items-start gap-4 p-6 bg-yellow-50 rounded-lg">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Coins className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Gold Loan</h1>
              <p className="text-xl opacity-90 mt-2">Get instant cash against your gold with secure storage</p>
            </div>
          </div>
          <p className="text-lg opacity-95 max-w-3xl">
            Loan amount up to ₹1 Crore at competitive rates starting from 7.5%. Safe custody, quick approval, and flexible repayment options.
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
                      ? 'border-yellow-500 text-yellow-600'
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
        <div className="mt-12 bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Instant Cash Against Gold?</h3>
          <p className="text-lg mb-6 opacity-90">
            Apply now and get funds within 2 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/services/loan/gold/apply')}
              className="bg-white text-yellow-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Talk to Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldLoanPage;