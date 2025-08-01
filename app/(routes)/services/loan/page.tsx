"use client";

import React from 'react';
import { Home, Building, User, Briefcase, Coins, Car, GraduationCap, ShieldCheck, CheckCircle, BanknoteArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoanLandingPage = () => {
  const router = useRouter();

  type LoanType = {
    id: string;
    title: string;
    icon: React.ElementType;
    description: string;
    features: string[];
    rate: string;
    maxAmount: string;
    gradient: string;
  };

  const loanTypes: LoanType[] = [
    {
      id: 'home-loan',
      title: 'Home Loan',
      icon: Home,
      description: 'Buy your dream home with competitive interest rates starting from 8.5% per annum',
      features: ['Up to ₹5 Crores', 'Tenure up to 30 years', 'Minimal documentation', 'Quick approval'],
      rate: '8.5% onwards',
      maxAmount: '₹5 Cr',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'loan-against-property',
      title: 'Loan Against Property',
      icon: Building,
      description: 'Unlock the value of your property for any financial need with attractive rates',
      features: ['Up to ₹10 Crores', 'Flexible repayment', 'Retain property ownership', 'Multiple end-use'],
      rate: '9.0% onwards',
      maxAmount: '₹10 Cr',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'personal-loan',
      title: 'Personal Loan',
      icon: User,
      description: 'Meet your personal financial goals with instant approval and no collateral',
      features: ['Up to ₹40 Lakhs', 'No collateral required', 'Instant approval', 'Flexible tenure'],
      rate: '10.5% onwards',
      maxAmount: '₹40 L',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'business-loan',
      title: 'Business Loan',
      icon: Briefcase,
      description: 'Grow your business with customized financing solutions and expert guidance',
      features: ['Up to ₹50 Crores', 'Working capital', 'Equipment financing', 'Overdraft facility'],
      rate: '11.0% onwards',
      maxAmount: '₹50 Cr',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'gold-loan',
      title: 'Gold Loan',
      icon: Coins,
      description: 'Get instant cash against your gold ornaments with minimal paperwork',
      features: ['Up to ₹1 Crore', 'Instant approval', 'Retain gold ownership', 'Flexible repayment'],
      rate: '7.5% onwards',
      maxAmount: '₹1 Cr',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'car-loan',
      title: 'Car Loan',
      icon: Car,
      description: 'Drive home your dream car with easy EMIs and quick processing',
      features: ['Up to ₹2 Crores', 'New & used cars', 'Up to 90% financing', 'Quick disbursal'],
      rate: '8.0% onwards',
      maxAmount: '₹2 Cr',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'education-loan',
      title: 'Education Loan',
      icon: GraduationCap,
      description: 'Invest in your future with comprehensive education financing solutions',
      features: ['Up to ₹1.5 Crores', 'Abroad & domestic', 'Moratorium period', 'Tax benefits'],
      rate: '9.5% onwards',
      maxAmount: '₹1.5 Cr',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'loan-against-securities',
      title: 'Loan Against Securities',
      icon: ShieldCheck,
      description: 'Get instant liquidity against securities while they grow',
      features: ['Up to ₹1.5 Crores', 'Retain ownership of securities', 'Quick processing & disbursal', 'Tax-efficient financing'],
      rate: '9.5% onwards',
      maxAmount: '₹1.5 Cr',
      gradient: 'from-slate-500 to-gray-600'
    }
  ];

  const eligibilityCriteria = [
    { label: 'Age', value: '21-65 years' },
    { label: 'Income', value: '₹3,00,000+ annually' },
    { label: 'Employment', value: 'Salaried/Self-employed' },
    { label: 'Credit Score', value: '700+ preferred' }
  ];

  const applicationSteps = [
    { step: 1, title: 'Choose Loan Type', description: 'Select the loan that suits your lifestyle', icon: BanknoteArrowUp },
    { step: 2, title: 'Fill Application', description: 'Complete the online application form', icon: User },
    { step: 3, title: 'Document Upload', description: 'Upload required documents for verification', icon: ShieldCheck },
    { step: 4, title: 'Get Approved', description: 'Receive instant approval', icon: CheckCircle }
  ];

  return (
    <>
      {/* Header */}
      <div className="text-center text-white pt-16 pb-12 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent animate-pulse">
          Complete Loan Solutions
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90 font-light">
          Your Trusted Financial Partner
        </p>
        <p className="text-lg opacity-75 max-w-2xl mx-auto">
          From home loans to business financing - we have got all your loan needs covered with competitive rates and quick approvals
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Loan</h2>
            <p className="text-xl mb-12 opacity-95 max-w-3xl mx-auto">
              Compare rates, check eligibility, and get instant approvals across all loan categories. 
              Your financial dreams are just one click away.
            </p>
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-2">50L+</div>
                <div className="opacity-90">Happy Customers</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-2">₹10K Cr+</div>
                <div className="opacity-90">Loans Disbursed</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="opacity-90">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Types Section */}
        <div className="p-12 md:p-20 bg-gray-50">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Loan Type</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of loan products designed to meet every financial need
            </p>
          </div>

          {/* Loan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanTypes.map((loan) => {
              const IconComponent = loan.icon;
              return (
                <div 
                  key={loan.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group flex flex-col"
                >
                  {/* Icon and Header */}
                  <div className="flex items-center mb-6">
                    <div className={`bg-gradient-to-r ${loan.gradient} p-3 rounded-xl`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-gray-800">{loan.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-semibold text-green-600">{loan.rate}</span>
                        <span>Up to {loan.maxAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {loan.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-3">
                      {loan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button
                      onClick={() => router.push(`/services/loan/${loan.id}`)}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-50"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => router.push(`/services/loan/${loan.id}/get-quote`)}
                      className={`flex-1 bg-gradient-to-r ${loan.gradient} hover:scale-105 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Application Process */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Application Process</h2>
                <p className="text-gray-600">Get your loan in just 4 easy steps</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Eligibility Criteria */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
                <p className="text-gray-600">Check if you meet our simple eligibility requirements</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {eligibilityCriteria.map((criteria, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">{criteria.label}</h3>
                    <p className="text-blue-600 font-medium">{criteria.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LoanLandingPage;