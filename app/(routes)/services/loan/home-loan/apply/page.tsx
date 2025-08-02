"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Home,
  FileText,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Phone,
  Mail,
  Building,
  CreditCard,
  Calendar,
  IndianRupee,
  Upload,
  Info
} from 'lucide-react';

const HomeLoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasCoApplicant, setHasCoApplicant] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    panCard: '',
    aadharCard: '',
    
    // Address Details
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
    residenceType: '',
    yearsAtCurrentAddress: '',
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    permanentPincode: '',
    sameAsCurrent: false,
    
    // Employment Details
    employmentType: '',
    companyName: '',
    designation: '',
    workExperience: '',
    monthlyIncome: '',
    additionalIncome: '',
    officeAddress: '',
    officeCity: '',
    officeState: '',
    officePincode: '',
    
    // Co-Applicant Details (if applicable)
    coApplicant: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      relationship: '',
      panCard: '',
      aadharCard: '',
      employmentType: '',
      companyName: '',
      monthlyIncome: '',
    },
    
    // Loan Details
    loanAmount: '',
    propertyValue: '',
    downPayment: '',
    tenure: '',
    propertyType: '',
    propertyLocation: '',
    propertyAddress: '',
    loanPurpose: '',
    
    // Documents
    salarySlips: null,
    bankStatements: null,
    formSixteen: null,
    itr: null,
    propertyDocuments: null,
    identityProof: null,
    addressProof: null,
    coApplicantDocuments: null,
  });

  const steps = [
    {
      id: 1,
      title: 'Personal Details',
      subtitle: 'Basic information about you',
      icon: User,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Employment & Income',
      subtitle: 'Your professional and financial details',
      icon: Building,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 3,
      title: 'Loan Requirements',
      subtitle: 'Property and loan details',
      icon: Home,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Documents & Review',
      subtitle: 'Upload documents and review application',
      icon: FileText,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleInputChange = (field: string, value: unknown, isCoApplicant = false) => {
    if (isCoApplicant) {
      setFormData(prev => ({
        ...prev,
        coApplicant: {
          ...prev.coApplicant,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    alert('Application submitted successfully!');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
            currentStep >= step.id 
              ? `bg-gradient-to-r ${step.color} text-white` 
              : 'bg-gray-200 text-gray-400'
          } transition-all duration-300`}>
            {currentStep > step.id ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <step.icon className="w-6 h-6" />
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
            } transition-all duration-300`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PAN Card Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.panCard}
              onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Aadhar Card Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.aadharCard}
            onChange={(e) => handleInputChange('aadharCard', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1234 5678 9012"
            maxLength={12}
          />
        </div>
      </div>

      {/* Address Details */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Complete Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.currentAddress}
              onChange={(e) => handleInputChange('currentAddress', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter your complete current address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.currentCity}
              onChange={(e) => handleInputChange('currentCity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.currentState}
              onChange={(e) => handleInputChange('currentState', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              {/* Add more states */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.currentPincode}
              onChange={(e) => handleInputChange('currentPincode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter pincode"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Residence Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.residenceType}
              onChange={(e) => handleInputChange('residenceType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Type</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
              <option value="parental">Parental</option>
              <option value="company">Company Provided</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years at Current Address <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.yearsAtCurrentAddress}
              onChange={(e) => handleInputChange('yearsAtCurrentAddress', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Duration</option>
              <option value="less_than_1">Less than 1 year</option>
              <option value="1_to_2">1-2 years</option>
              <option value="2_to_5">2-5 years</option>
              <option value="5_to_10">5-10 years</option>
              <option value="more_than_10">More than 10 years</option>
            </select>
          </div>
        </div>

        {/* Co-Applicant Option */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Co-Applicant Details</h3>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="hasCoApplicant"
              checked={hasCoApplicant}
              onChange={(e) => setHasCoApplicant(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hasCoApplicant" className="text-sm font-medium text-gray-700">
              Do you have a co-applicant? (Spouse, Parent, etc.)
            </label>
          </div>
          {hasCoApplicant && (
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                Adding a co-applicant can increase your loan eligibility and may help in getting better interest rates.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Co-Applicant First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.coApplicant.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Co-Applicant Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.coApplicant.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.coApplicant.relationship}
                    onChange={(e) => handleInputChange('relationship', e.target.value, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Co-Applicant Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.coApplicant.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Employment & Income Details</h2>
        <p className="text-gray-600">Tell us about your professional and financial status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employment Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.employmentType}
            onChange={(e) => handleInputChange('employmentType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Employment Type</option>
            <option value="salaried">Salaried</option>
            <option value="self_employed_business">Self Employed - Business</option>
            <option value="self_employed_professional">Self Employed - Professional</option>
            <option value="pensioner">Pensioner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company/Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company/business name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Designation/Position <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => handleInputChange('designation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your designation"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Total Work Experience <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.workExperience}
            onChange={(e) => handleInputChange('workExperience', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Experience</option>
            <option value="less_than_1">Less than 1 year</option>
            <option value="1_to_2">1-2 years</option>
            <option value="2_to_5">2-5 years</option>
            <option value="5_to_10">5-10 years</option>
            <option value="10_to_15">10-15 years</option>
            <option value="more_than_15">More than 15 years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Income <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter monthly income"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Income (Optional)
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.additionalIncome}
              onChange={(e) => handleInputChange('additionalIncome', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rental, business, etc."
            />
          </div>
        </div>
      </div>

      {/* Office Address */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Office Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Office Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.officeAddress}
              onChange={(e) => handleInputChange('officeAddress', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter your office address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Office City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.officeCity}
              onChange={(e) => handleInputChange('officeCity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter office city"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Office State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.officeState}
              onChange={(e) => handleInputChange('officeState', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Office Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.officePincode}
              onChange={(e) => handleInputChange('officePincode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter office pincode"
              maxLength={6}
            />
          </div>
        </div>
      </div>

      {/* Co-Applicant Employment Details */}
      {hasCoApplicant && (
        <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Co-Applicant Employment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Employment Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.coApplicant.employmentType}
                onChange={(e) => handleInputChange('employmentType', e.target.value, true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Employment Type</option>
                <option value="salaried">Salaried</option>
                <option value="self_employed_business">Self Employed - Business</option>
                <option value="self_employed_professional">Self Employed - Professional</option>
                <option value="housewife">Housewife</option>
                <option value="student">Student</option>
                <option value="pensioner">Pensioner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company/Business Name
              </label>
              <input
                type="text"
                value={formData.coApplicant.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value, true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company/business name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Income
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.coApplicant.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value, true)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter monthly income"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PAN Card Number
              </label>
              <input
                type="text"
                value={formData.coApplicant.panCard}
                onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase(), true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ABCDE1234F"
                maxLength={10}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loan & Property Details</h2>
        <p className="text-gray-600">Tell us about your loan requirements and property</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loan Amount Required <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.loanAmount}
              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter loan amount"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Value <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.propertyValue}
              onChange={(e) => handleInputChange('propertyValue', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter property value"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Down Payment <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={formData.downPayment}
              onChange={(e) => handleInputChange('downPayment', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter down payment"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loan Tenure <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.tenure}
            onChange={(e) => handleInputChange('tenure', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Tenure</option>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
            <option value="30">30 years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Property Type</option>
            <option value="apartment">Apartment/Flat</option>
            <option value="independent_house">Independent House</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot/Land</option>
            <option value="commercial">Commercial Property</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loan Purpose <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.loanPurpose}
            onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Purpose</option>
            <option value="purchase">Property Purchase</option>
            <option value="construction">Property Construction</option>
            <option value="renovation">Home Renovation</option>
            <option value="plot_purchase">Plot Purchase</option>
            <option value="extension">Home Extension</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.propertyLocation}
            onChange={(e) => handleInputChange('propertyLocation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter property city/location"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.propertyAddress}
            onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Enter complete property address"
          />
        </div>
      </div>

      {/* Loan Calculation Info */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Info className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Loan Calculation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Loan-to-Value Ratio:</span>
                <p className="text-blue-600 font-semibold">
                  {formData.loanAmount && formData.propertyValue 
                    ? `${((parseFloat(formData.loanAmount) / parseFloat(formData.propertyValue)) * 100).toFixed(1)}%`
                    : 'Enter amounts to calculate'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Estimated EMI:</span>
                <p className="text-blue-600 font-semibold">
                  {formData.loanAmount && formData.tenure 
                    ? `₹${Math.round((parseFloat(formData.loanAmount) * 0.00875 * Math.pow(1.00875, parseInt(formData.tenure) * 12)) / (Math.pow(1.00875, parseInt(formData.tenure) * 12) - 1)).toLocaleString()}`
                    : 'Enter details to calculate'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Processing Fee:</span>
                <p className="text-blue-600 font-semibold">
                  {formData.loanAmount 
                    ? `₹${Math.min(Math.max(parseFloat(formData.loanAmount) * 0.005, 5000), 50000).toLocaleString()}`
                    : 'Calculated based on loan amount'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Documents & Review</h2>
        <p className="text-gray-600">Upload required documents and review your application</p>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Required Documents</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700">Income Documents</h4>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last 3 Months Salary Slips <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last 6 Months Bank Statements <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Form 16 / ITR <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-700">Identity & Property Documents</h4>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Identity Proof (PAN, Aadhar) <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Proof <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Documents <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Sale deed, NOC, Approval plans</p>
                <p className="text-xs text-gray-500">PDF (Max 10MB)</p>
              </div>
            </div>
          </div>
        </div>

        {hasCoApplicant && (
          <div className="mt-6 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
            <h4 className="text-lg font-medium text-gray-700 mb-4">Co-Applicant Documents</h4>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Co-Applicant Documents (Income, ID, Address Proof)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Upload all co-applicant documents</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Summary */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Application Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Personal Details</h4>
            <p><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</p>
            <p><span className="text-gray-600">Email:</span> {formData.email}</p>
            <p><span className="text-gray-600">Phone:</span> {formData.phone}</p>
            <p><span className="text-gray-600">Employment:</span> {formData.employmentType}</p>
            <p><span className="text-gray-600">Monthly Income:</span> ₹{formData.monthlyIncome?.toLocaleString()}</p>
            {hasCoApplicant && (
              <p><span className="text-gray-600">Co-Applicant:</span> {formData.coApplicant.firstName} {formData.coApplicant.lastName}</p>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Loan Details</h4>
            <p><span className="text-gray-600">Loan Amount:</span> ₹{formData.loanAmount?.toLocaleString()}</p>
            <p><span className="text-gray-600">Property Value:</span> ₹{formData.propertyValue?.toLocaleString()}</p>
            <p><span className="text-gray-600">Tenure:</span> {formData.tenure} years</p>
            <p><span className="text-gray-600">Property Type:</span> {formData.propertyType}</p>
            <p><span className="text-gray-600">Purpose:</span> {formData.loanPurpose}</p>
            <p><span className="text-gray-600">Location:</span> {formData.propertyLocation}</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
            <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>. I authorize the lender to 
            verify the information provided and conduct necessary credit checks.
          </label>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Home Loan Application</h1>
          <p className="text-lg text-gray-600">Complete your application in 4 simple steps</p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Step {currentStep}: {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep - 1].subtitle}</p>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Application
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {currentStep} of 4 steps completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanApplication;