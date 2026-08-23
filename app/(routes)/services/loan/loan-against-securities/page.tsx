"use client";
import React, { useState } from 'react';
import { 
  ShieldCheck, Calculator, Clock, FileText, Percent, Users, 
  ArrowRight, Phone, TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoanAgainstSecuritiesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(7500000);
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(7.8);
  const router = useRouter();

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    const emi = principal * rate * (Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ShieldCheck },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'process', label: 'Process', icon: Clock }
  ];

  const eligibilityCriteria = [
    "Age: 21-70 years (Indian resident)",
    "Demat Account: Must be active with a SEBI-registered broker",
    "Securities: Eligible stocks, mutual funds, or bonds in Demat",
    "Minimum Portfolio Value: ₹10 Lakhs for eligibility",
    "Credit Score: 700+ preferred for best rates",
    "No margin trading defaults or active disputes"
  ];

  const requiredDocuments = [
    "Identity Proof: Aadhaar, PAN, Passport",
    "Address Proof: Utility bills, rental agreement, Aadhaar",
    "Demat Account Statement: Latest 1 month",
    "Portfolio Valuation Report (from broker)",
    "Bank Account Details: Cancelled cheque or passbook",
    "PAN Card & Form 60 (if applicable)",
    "Photographs: 2 passport-sized photos"
  ];

  const interestRates = [
    { category: "Equity Mutual Funds", rate: "7.80% - 9.50%" },
    { category: "Debt Mutual Funds", rate: "7.50% - 9.00%" },
    { category: "Blue-Chip Stocks (Nifty 50)", rate: "8.00% - 9.75%" },
    { category: "Balanced Funds", rate: "7.75% - 9.25%" },
    { category: "Senior Citizens", rate: "7.50% - 8.75%" },
    { category: "Pre-approved Customers", rate: "7.75% - 8.99%" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Submit basic details and estimated portfolio value" },
    { step: 2, title: "Demat Linking", description: "Securely link your Demat account for verification" },
    { step: 3, title: "Portfolio Evaluation", description: "We assess market value and eligibility" },
    { step: 4, title: "Credit Approval", description: "Get instant decision within 24 hours" },
    { step: 5, title: "Sanction Letter", description: "Receive loan terms and approval confirmation" },
    { step: 6, title: "Disbursement", description: "Funds credited to your bank account within 48 hours" }
  ];

  const benefits = [
    "Loan amount up to ₹1.5 Crores",
    "Flexible tenure from 1 to 7 years",
    "Loan up to 65% of portfolio value (equity), 75% (debt)",
    "No selling of securities – retain ownership and growth",
    "Interest rates starting from 7.8%",
    "Instant pre-approval based on portfolio",
    "Top-up facility available as portfolio grows",
    "Tax-efficient financing (no capital gains)"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-50 via-cyan-50 to-slate-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-cyan-800 mb-4">Loan Against Securities Overview</h3>
              <p className="text-cyan-700 text-lg leading-relaxed mb-6">
                Get instant liquidity against your investment portfolio without selling your stocks or mutual funds. 
                Whether you need funds for business, emergencies, or opportunities, leverage your securities 
                while continuing to benefit from market appreciation.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-600 mb-2">7.8%</div>
                  <div className="text-cyan-600">Starting Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-600 mb-2">₹1.5 Cr</div>
                  <div className="text-cyan-600">Maximum Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-600 mb-2">7 Years</div>
                  <div className="text-cyan-600">Maximum Tenure</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-cyan-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'eligibility':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-800">Eligibility Criteria</h3>
            <div className="grid gap-4">
              {eligibilityCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Users className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                  <span className="text-cyan-700">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-800">Required Documents</h3>
            <div className="grid gap-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <FileText className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                  <span className="text-cyan-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'calculator':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-800">EMI Calculator</h3>
            <div className="bg-gradient-to-r from-slate-50 via-cyan-50 to-slate-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-2">
                      Loan Amount: ₹{loanAmount.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="15000000"
                      step="50000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-2">
                      Tenure: {tenure} years
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-700 mb-2">
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
                  <h4 className="text-lg font-bold text-cyan-800 mb-4">Monthly EMI</h4>
                  <div className="text-4xl font-bold text-slate-600 mb-4">
                    ₹{calculateEMI().toLocaleString()}
                  </div>
                  <div className="space-y-2 text-sm text-cyan-600">
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
            <h3 className="text-2xl font-bold text-cyan-800">Interest Rates</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-slate-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Security Type</th>
                    <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRates.map((rate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-cyan-800">{rate.category}</td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">{rate.rate}</td>
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
            <h3 className="text-2xl font-bold text-cyan-800">Application Process</h3>
            <div className="space-y-4">
              {applicationProcess.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg">
                  <div className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-800 mb-2">{step.title}</h4>
                    <p className="text-cyan-600">{step.description}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 via-cyan-600 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 h-[40vh] flex items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Loan Against Securities</h1>
              <p className="text-xl opacity-90 mt-2">Get instant liquidity without selling your investments</p>
            </div>
          </div>
          <p className="text-lg opacity-95 max-w-3xl">
            Loan amount up to ₹1.5 Crores at competitive rates starting from 7.8%. Retain ownership of your stocks and mutual funds.
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
                      ? 'border-slate-600 text-slate-600'
                      : 'border-transparent text-cyan-600 hover:text-cyan-800'
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
        <div className="mt-12 bg-gradient-to-r from-slate-600 via-cyan-600 to-slate-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Instant Liquidity?</h3>
          <p className="text-lg mb-6 opacity-90">
            Apply now and get pre-approved within 24 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/services/loan/loan-against-securities/apply')}
              className="bg-white text-slate-600 px-8 py-3 rounded-full font-semibold hover:bg-cyan-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
            onClick={() => router.push('/services/loan/loan-against-securities/contact')}
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

export default LoanAgainstSecuritiesPage;