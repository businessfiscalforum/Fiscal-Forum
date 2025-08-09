"use client";
import React, { useState } from 'react';
import { 
  GraduationCap, Calculator, Clock, FileText, Percent, Users, 
  ArrowRight, Phone, TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const EducationLoanPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(10);
  const [interestRate, setInterestRate] = useState(9.5);
  const router = useRouter();

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = tenure * 12;
    const emi = principal * rate * (Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    return Math.round(emi);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: GraduationCap },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'calculator', label: 'EMI Calculator', icon: Calculator },
    { id: 'rates', label: 'Interest Rates', icon: Percent },
    { id: 'process', label: 'Process', icon: Clock }
  ];

  const eligibilityCriteria = [
    "Age: 18-35 years (student), 25-65 years (co-applicant/guardian)",
    "Admission: Confirmed admission in recognized institute (India or abroad)",
    "Course: Full-time graduate, postgraduate, or professional courses",
    "Co-applicant: Mandatory (parent, spouse, or guardian with income)",
    "Credit Score: 650+ preferred for co-applicant",
    "No active defaults in existing loans"
  ];

  const requiredDocuments = [
    "Identity Proof: Aadhaar, PAN, Passport (student & co-applicant)",
    "Address Proof: Utility bills, Aadhaar, rental agreement",
    "Admission Letter: From the educational institution",
    "Academic Records: 10th, 12th, graduation mark sheets",
    "Income Proof: Salary slips, ITR, bank statements (co-applicant)",
    "Bank Account: Cancelled cheque or passbook",
    "Photographs: 2 passport-sized photos each"
  ];

  const interestRates = [
    { category: "Studies in India", rate: "9.50% - 11.50%" },
    { category: "Studies Abroad", rate: "9.25% - 11.00%" },
    { category: "STEM Courses (Abroad)", rate: "9.00% - 10.50%" },
    { category: "Women Students", rate: "9.25% - 10.75%" },
    { category: "Top Institutes (IIT, IIM, AIIMS)", rate: "9.00% - 10.25%" },
    { category: "Govt. Subsidy Schemes", rate: "8.50% - 9.75%" }
  ];

  const applicationProcess = [
    { step: 1, title: "Apply Online", description: "Submit student and course details" },
    { step: 2, title: "Document Upload", description: "Upload admission letter and KYC documents" },
    { step: 3, title: "Co-applicant Verification", description: "Income and credit check for co-applicant" },
    { step: 4, title: "Approval", description: "Get eligibility confirmation within 48 hours" },
    { step: 5, title: "Sanction Letter", description: "Receive loan terms and approval details" },
    { step: 6, title: "Disbursement", description: "Funds sent directly to college/university" }
  ];

  const benefits = [
    "Loan amount up to ₹1.5 Crores",
    "Flexible tenure up to 15 years",
    "Moratorium period up to 12 months after course completion",
    "100% financing for tuition and living expenses",
    "No collateral required for loans up to ₹4 Lakhs",
    "Tax benefits under Section 80E",
    "Special rates for top-tier institutions",
    "Repayment starts after moratorium period"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 via-violet-50 to-fuchsia-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Education Loan Overview</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Invest in your future with our comprehensive Education Loan. Whether you&apos;re pursuing 
                engineering, medicine, MBA, or studying abroad, we offer high-value financing with 
                flexible repayment, moratorium periods, and competitive rates to support your academic journey.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">9.5%</div>
                  <div className="text-gray-600">Starting Interest Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">₹1.5 Cr</div>
                  <div className="text-gray-600">Maximum Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15 Years</div>
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
                <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
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
                <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
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
            <div className="bg-gradient-to-r from-purple-50 via-violet-50 to-fuchsia-50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenure: {tenure} years
                    </label>
                    <input
                      type="range"
                      min="5"
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
                  <div className="text-4xl font-bold text-purple-600 mb-4">
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
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Study Category</th>
                    <th className="px-6 py-4 text-left">Interest Rate (p.a.)</th>
                  </tr>
                </thead>
                <tbody>
                  {interestRates.map((rate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-gray-800">{rate.category}</td>
                      <td className="px-6 py-4 text-purple-600 font-semibold">{rate.rate}</td>
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
                <div key={index} className="flex items-start gap-4 p-6 bg-purple-50 rounded-lg">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 h-[40vh] flex items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Education Loan</h1>
              <p className="text-xl opacity-90 mt-2">Fund your academic dreams with flexible financing</p>
            </div>
          </div>
          <p className="text-lg opacity-95 max-w-3xl">
            Get funds up to ₹1.5 Crores at competitive rates starting from 9.5%. Moratorium period, no collateral for small loans, and direct disbursement to institute.
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
                      ? 'border-purple-600 text-purple-600'
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
        <div className="mt-12 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Invest in Your Future?</h3>
          <p className="text-lg mb-6 opacity-90">
            Apply now and get pre-approved within 48 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/services/loan/education-loan/apply')}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
            onClick={() => router.push('/services/loan/education-loan/call')}
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

export default EducationLoanPage;