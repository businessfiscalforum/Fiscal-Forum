"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Building,
  User,
  Briefcase,
  Coins,
  Car,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  X,
  Upload,
  FileText,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MapPin,
  DollarSign,
  File,
  AlertCircle,
  Check,
} from "lucide-react";

// Define TypeScript interfaces
interface FormData {
  // Step 1 - Common Fields
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  panNumber: string;
  aadharNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  employmentType: string;
  annualIncome: string;
  
  // Business Loan Fields
  companyName: string;
  designation: string;
  businessName: string;
  businessType: string;
  businessRegistrationNumber: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessPincode: string;
  businessTurnover: string;
  businessYears: string;
  
  // Education Loan
  universityName: string;
  courseName: string;
  courseDuration: string;
  courseFees: string;
  scholarshipAmount: string;
  guardianName: string;
  guardianRelation: string;
  guardianIncome: string;
  
  // Car Loan
  carMake: string;
  carModel: string;
  carVariant: string;
  carYear: string;
  carPrice: string;
  onRoadPrice: string;
  exShowroomPrice: string;
  existingCarLoan: boolean;
  
  // Home Loan
  propertyType: string;
  propertyLocation: string;
  propertyCity: string;
  propertyState: string;
  propertyPincode: string;
  propertyValue: string;
  constructionStatus: string;
  propertyAge: string;
  plotSize: string;
  builtUpArea: string;
  
  // Gold Loan
  goldItems: string;
  totalWeight: string;
  purity: string;
  estimatedValue: string;
  
  // Loan Against Property
  propertyFor: string;
  propertyDocuments: string;
  
  // Loan Against Securities
  securitiesType: string;
  securitiesValue: string;
  dematAccountNumber: string;
  brokerName: string;
  
  // Bank Details
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  
  // Terms
  termsAccepted: boolean;
}

interface FilesState {
  aadharFront: File | null;
  aadharBack: File | null;
  panCard: File | null;
  salarySlips: File[];
  bankStatements: File[];
  itReturns: File[];
  businessProof: File[];
  propertyDocuments: File[];
  educationDocuments: File[];
  goldPhotos: File[];
  securitiesProof: File[];
}

interface LoanType {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
}


const LoanApplicationForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedLoanType, setSelectedLoanType] = useState<string>("");
  
  const [formData, setFormData] = useState<FormData>({
    // Step 1 - Common Fields
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    panNumber: "",
    aadharNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    employmentType: "",
    annualIncome: "",
    
    // Business Loan Fields
    companyName: "",
    designation: "",
    businessName: "",
    businessType: "",
    businessRegistrationNumber: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",
    businessTurnover: "",
    businessYears: "",
    
    // Education Loan
    universityName: "",
    courseName: "",
    courseDuration: "",
    courseFees: "",
    scholarshipAmount: "",
    guardianName: "",
    guardianRelation: "",
    guardianIncome: "",
    
    // Car Loan
    carMake: "",
    carModel: "",
    carVariant: "",
    carYear: "",
    carPrice: "",
    onRoadPrice: "",
    exShowroomPrice: "",
    existingCarLoan: false,
    
    // Home Loan
    propertyType: "",
    propertyLocation: "",
    propertyCity: "",
    propertyState: "",
    propertyPincode: "",
    propertyValue: "",
    constructionStatus: "",
    propertyAge: "",
    plotSize: "",
    builtUpArea: "",
    
    // Gold Loan
    goldItems: "",
    totalWeight: "",
    purity: "",
    estimatedValue: "",
    
    // Loan Against Property
    propertyFor: "",
    propertyDocuments: "",
    
    // Loan Against Securities
    securitiesType: "",
    securitiesValue: "",
    dematAccountNumber: "",
    brokerName: "",
    
    // Bank Details
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    
    // Terms
    termsAccepted: false,
  });

  const [files, setFiles] = useState<FilesState>({
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    salarySlips: [],
    bankStatements: [],
    itReturns: [],
    businessProof: [],
    propertyDocuments: [],
    educationDocuments: [],
    goldPhotos: [],
    securitiesProof: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Fix: Properly type the ref
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const loanTypes: LoanType[] = [
    { id: 'home-loan', title: 'Home Loan', icon: Home, gradient: 'from-blue-500 to-blue-600' },
    { id: 'loan-against-property', title: 'Loan Against Property', icon: Building, gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'personal-loan', title: 'Personal Loan', icon: User, gradient: 'from-purple-500 to-purple-600' },
    { id: 'business-loan', title: 'Business Loan', icon: Briefcase, gradient: 'from-orange-500 to-orange-600' },
    { id: 'gold-loan', title: 'Gold Loan', icon: Coins, gradient: 'from-yellow-500 to-yellow-600' },
    { id: 'car-loan', title: 'Car Loan', icon: Car, gradient: 'from-red-500 to-red-600' },
    { id: 'education-loan', title: 'Education Loan', icon: GraduationCap, gradient: 'from-indigo-500 to-indigo-600' },
    { id: 'loan-against-securities', title: 'Loan Against Securities', icon: ShieldCheck, gradient: 'from-slate-500 to-gray-600' }
  ];

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Fix: Add proper types to parameters
  const handleFileChange = (field: string, event: React.ChangeEvent<HTMLInputElement>)  => {
    const selectedFiles = Array.from(event.target.files || []);
    
    setFiles(prev => ({
      ...prev,
      [field]: field.includes('salarySlips') || field.includes('bankStatements') || 
               field.includes('itReturns') || field.includes('businessProof') || 
               field.includes('propertyDocuments') || field.includes('educationDocuments') ||
               field.includes('goldPhotos') || field.includes('securitiesProof') 
               ? [...(prev[field as keyof FilesState] as File[]), ...selectedFiles]
               : selectedFiles[0]
    }));
  };

  const removeFile = (field: string, index: number | null = null) => {
    if (index !== null && Array.isArray(files[field as keyof FilesState])) {
      const updatedFiles = (files[field as keyof FilesState] as File[]).filter((_, i) => i !== index);
      setFiles(prev => ({ ...prev, [field]: updatedFiles }));
    } else {
      setFiles(prev => ({ ...prev, [field]: null }));
    }
  };

  const triggerFileInput = (field: string) => {
    if (fileInputRefs.current[field]) {
      fileInputRefs.current[field]?.click();
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedLoanType) {
      newErrors.loanType = "Please select a loan type";
    }
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.panNumber.trim()) newErrors.panNumber = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) 
      newErrors.panNumber = "PAN number is invalid";
    
    if (!formData.aadharNumber.trim()) newErrors.aadharNumber = "Aadhar number is required";
    else if (!/^\d{12}$/.test(formData.aadharNumber)) newErrors.aadharNumber = "Aadhar number must be 12 digits";
    
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    
    if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
    if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Common document validations
    if (!files.aadharFront) newErrors.aadharFront = "Aadhar front is required";
    if (!files.aadharBack) newErrors.aadharBack = "Aadhar back is required";
    if (!files.panCard) newErrors.panCard = "PAN card is required";
    
    if (formData.employmentType === 'salaried') {
      if (files.salarySlips.length < 3) newErrors.salarySlips = "Please upload at least 3 months of salary slips";
      if (files.bankStatements.length < 6) newErrors.bankStatements = "Please upload at least 6 months of bank statements";
      if (files.itReturns.length < 2) newErrors.itReturns = "Please upload at least 2 years of ITR";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (selectedLoanType) {
      case 'home-loan':
        if (!formData.propertyType) newErrors.propertyType = "Property type is required";
        if (!formData.propertyLocation) newErrors.propertyLocation = "Property location is required";
        if (!formData.propertyCity) newErrors.propertyCity = "Property city is required";
        if (!formData.propertyState) newErrors.propertyState = "Property state is required";
        if (!formData.propertyPincode) newErrors.propertyPincode = "Property pincode is required";
        else if (!/^\d{6}$/.test(formData.propertyPincode)) newErrors.propertyPincode = "Pincode must be 6 digits";
        if (!formData.propertyValue) newErrors.propertyValue = "Property value is required";
        if (!formData.constructionStatus) newErrors.constructionStatus = "Construction status is required";
        break;
        
      case 'loan-against-property':
        if (!formData.propertyFor) newErrors.propertyFor = "Purpose of loan is required";
        if (files.propertyDocuments.length === 0) newErrors.propertyDocuments = "Property documents are required";
        break;
        
      case 'business-loan':
        if (!formData.companyName) newErrors.companyName = "Company name is required";
        if (!formData.designation) newErrors.designation = "Designation is required";
        if (!formData.businessName) newErrors.businessName = "Business name is required";
        if (!formData.businessType) newErrors.businessType = "Business type is required";
        if (!formData.businessRegistrationNumber) newErrors.businessRegistrationNumber = "Business registration number is required";
        if (!formData.businessAddress) newErrors.businessAddress = "Business address is required";
        if (!formData.businessCity) newErrors.businessCity = "Business city is required";
        if (!formData.businessState) newErrors.businessState = "Business state is required";
        if (!formData.businessPincode) newErrors.businessPincode = "Business pincode is required";
        else if (!/^\d{6}$/.test(formData.businessPincode)) newErrors.businessPincode = "Pincode must be 6 digits";
        if (!formData.businessTurnover) newErrors.businessTurnover = "Business turnover is required";
        if (!formData.businessYears) newErrors.businessYears = "Years in business is required";
        if (files.businessProof.length === 0) newErrors.businessProof = "Business proof documents are required";
        break;
        
      case 'car-loan':
        if (!formData.carMake) newErrors.carMake = "Car make is required";
        if (!formData.carModel) newErrors.carModel = "Car model is required";
        if (!formData.carVariant) newErrors.carVariant = "Car variant is required";
        if (!formData.carYear) newErrors.carYear = "Car year is required";
        if (!formData.carPrice) newErrors.carPrice = "Car price is required";
        if (!formData.onRoadPrice) newErrors.onRoadPrice = "On-road price is required";
        if (!formData.exShowroomPrice) newErrors.exShowroomPrice = "Ex-showroom price is required";
        break;
        
      case 'education-loan':
        if (!formData.universityName) newErrors.universityName = "University name is required";
        if (!formData.courseName) newErrors.courseName = "Course name is required";
        if (!formData.courseDuration) newErrors.courseDuration = "Course duration is required";
        if (!formData.courseFees) newErrors.courseFees = "Course fees is required";
        if (!formData.guardianName) newErrors.guardianName = "Guardian name is required";
        if (!formData.guardianRelation) newErrors.guardianRelation = "Guardian relation is required";
        if (!formData.guardianIncome) newErrors.guardianIncome = "Guardian income is required";
        if (files.educationDocuments.length === 0) newErrors.educationDocuments = "Education documents are required";
        break;
        
      case 'gold-loan':
        if (!formData.goldItems) newErrors.goldItems = "Gold items description is required";
        if (!formData.totalWeight) newErrors.totalWeight = "Total weight is required";
        if (!formData.purity) newErrors.purity = "Purity is required";
        if (!formData.estimatedValue) newErrors.estimatedValue = "Estimated value is required";
        if (files.goldPhotos.length === 0) newErrors.goldPhotos = "Gold photos are required";
        break;
        
      case 'loan-against-securities':
        if (!formData.securitiesType) newErrors.securitiesType = "Securities type is required";
        if (!formData.securitiesValue) newErrors.securitiesValue = "Securities value is required";
        if (!formData.dematAccountNumber) newErrors.dematAccountNumber = "Demat account number is required";
        if (!formData.brokerName) newErrors.brokerName = "Broker name is required";
        if (files.securitiesProof.length === 0) newErrors.securitiesProof = "Securities proof is required";
        break;
        
      case 'personal-loan':
        // No additional fields for personal loan
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    // Bank details validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!formData.confirmAccountNumber) newErrors.confirmAccountNumber = "Please confirm account number";
    else if (formData.accountNumber !== formData.confirmAccountNumber) newErrors.confirmAccountNumber = "Account numbers do not match";
    
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) newErrors.ifscCode = "IFSC code is invalid";
    
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.branchName) newErrors.branchName = "Branch name is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = (): boolean => {
    // Final confirmation and declaration
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: "You must accept the terms and conditions" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
    }
    
    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Submit form
        console.log("Form submitted:", { formData, files, selectedLoanType });
        // Here you would typically send the data to your backend
        alert("Loan application submitted successfully! Our representative will contact you shortly.");
        router.push("/loan-application-success");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const renderStepContent = () => {
    const LoanIcon = loanTypes.find(l => l.id === selectedLoanType)?.icon || Home;
    
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Loan Type</h2>
              <p className="text-gray-600">Choose the type of loan you want to apply for</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loanTypes.map((loan) => {
                const Icon = loan.icon;
                return (
                  <div
                    key={loan.id}
                    onClick={() => setSelectedLoanType(loan.id)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg
                      ${selectedLoanType === loan.id 
                        ? `border-blue-500 bg-blue-50 ${loan.gradient}/10` 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-lg ${loan.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{loan.title}</h3>
                  </div>
                );
              })}
            </div>
            
            {errors.loanType && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.loanType}
              </div>
            )}
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your first name"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your last name"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.panNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>
                  {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="1234 5678 9012"
                      maxLength={12}
                    />
                  </div>
                  {errors.aadharNumber && <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type *
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => handleInputChange('employmentType', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.employmentType ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select employment type</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self Employed</option>
                  </select>
                  {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income (₹) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                    <input
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.annualIncome ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your annual income"
                    />
                  </div>
                  {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your complete address"
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your city"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your state"
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your pincode"
                    maxLength={6}
                  />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
              <p className="text-gray-600">Upload the required documents for verification</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity & Address Proof</h3>
              
              {/* Aadhar Card */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Aadhar Card *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Front Side</span>
                      {!files.aadharFront && (
                        <button
                          type="button"
                          onClick={() => triggerFileInput('aadharFront')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Upload
                        </button>
                      )}
                    </div>
                    <div
                      onClick={() => triggerFileInput('aadharFront')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.aadharFront ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.aadharFront ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="w-8 h-8 text-green-500" />
                          <div className="text-left">
                            <div className="font-medium text-green-800">Aadhar_Front.pdf</div>
                            <div className="text-sm text-green-600">Uploaded successfully</div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile('aadharFront');
                            }}
                            className="text-red-500 hover:text-red-700 ml-auto"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Click to upload front side of Aadhar card</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={el => { fileInputRefs.current['aadharFront'] = el; }}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('aadharFront', e)}
                      className="hidden"
                    />
                    {errors.aadharFront && <p className="text-red-500 text-sm mt-1">{errors.aadharFront}</p>}
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Back Side</span>
                      {!files.aadharBack && (
                        <button
                          type="button"
                          onClick={() => triggerFileInput('aadharBack')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Upload
                        </button>
                      )}
                    </div>
                    <div
                      onClick={() => triggerFileInput('aadharBack')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.aadharBack ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.aadharBack ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="w-8 h-8 text-green-500" />
                          <div className="text-left">
                            <div className="font-medium text-green-800">Aadhar_Back.pdf</div>
                            <div className="text-sm text-green-600">Uploaded successfully</div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile('aadharBack');
                            }}
                            className="text-red-500 hover:text-red-700 ml-auto"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Click to upload back side of Aadhar card</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={el => { fileInputRefs.current['aadharBack'] = el; }}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('aadharBack', e)}
                      className="hidden"
                    />
                    {errors.aadharBack && <p className="text-red-500 text-sm mt-1">{errors.aadharBack}</p>}
                  </div>
                </div>
              </div>
              
              {/* PAN Card */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">PAN Card *</label>
                  {!files.panCard && (
                    <button
                      type="button"
                      onClick={() => triggerFileInput('panCard')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Upload
                    </button>
                  )}
                </div>
                <div
                  onClick={() => triggerFileInput('panCard')}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                    ${files.panCard ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                >
                  {files.panCard ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-green-500" />
                      <div className="text-left">
                        <div className="font-medium text-green-800">PAN_Card.pdf</div>
                        <div className="text-sm text-green-600">Uploaded successfully</div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile('panCard');
                        }}
                        className="text-red-500 hover:text-red-700 ml-auto"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Click to upload PAN card</p>
                    </div>
                  )}
                </div>
                <input
                  ref={el => { fileInputRefs.current['panCard'] = el; }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange('panCard', e)}
                  className="hidden"
                />
                {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>}
              </div>
              
              {/* Income Proof */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Income Proof</label>
                
                {formData.employmentType === 'salaried' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Salary Slips (Last 3 Months) *</span>
                        <button
                          type="button"
                          onClick={() => triggerFileInput('salarySlips')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Upload
                        </button>
                      </div>
                      <div
                        onClick={() => triggerFileInput('salarySlips')}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                          ${files.salarySlips.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                      >
                        {files.salarySlips.length > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-green-800">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">{files.salarySlips.length} files uploaded</span>
                            </div>
                            <div className="text-sm text-green-600">
                              {files.salarySlips.slice(0, 3).map((file, index) => (
                                <div key={index} className="truncate">{file.name}</div>
                              ))}
                              {files.salarySlips.length > 3 && (
                                <div className="text-xs">+{files.salarySlips.length - 3} more</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">Upload salary slips (PDF or images)</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={el => { fileInputRefs.current['salarySlips'] = el; }}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileChange('salarySlips', e)}
                        className="hidden"
                      />
                      {errors.salarySlips && <p className="text-red-500 text-sm mt-1">{errors.salarySlips}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Bank Statements (Last 6 Months)</span>
                        <button
                          type="button"
                          onClick={() => triggerFileInput('bankStatements')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Upload
                        </button>
                      </div>
                      <div
                        onClick={() => triggerFileInput('bankStatements')}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                          ${files.bankStatements.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                      >
                        {files.bankStatements.length > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-green-800">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">{files.bankStatements.length} files uploaded</span>
                            </div>
                            <div className="text-sm text-green-600">
                              {files.bankStatements.slice(0, 3).map((file, index) => (
                                <div key={index} className="truncate">{file.name}</div>
                              ))}
                              {files.bankStatements.length > 3 && (
                                <div className="text-xs">+{files.bankStatements.length - 3} more</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">Upload bank statements (PDF or images)</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={el => {fileInputRefs.current['bankStatements'] = el}}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileChange('bankStatements', e)}
                        className="hidden"
                      />
                      {errors.bankStatements && <p className="text-red-500 text-sm mt-1">{errors.bankStatements}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Income Tax Returns (Last 2 Years)</span>
                        <button
                          type="button"
                          onClick={() => triggerFileInput('itReturns')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Upload
                        </button>
                      </div>
                      <div
                        onClick={() => triggerFileInput('itReturns')}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                          ${files.itReturns.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                      >
                        {files.itReturns.length > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-green-800">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">{files.itReturns.length} files uploaded</span>
                            </div>
                            <div className="text-sm text-green-600">
                              {files.itReturns.slice(0, 3).map((file, index) => (
                                <div key={index} className="truncate">{file.name}</div>
                              ))}
                              {files.itReturns.length > 3 && (
                                <div className="text-xs">+{files.itReturns.length - 3} more</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">Upload ITR documents (PDF or images)</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={el => {fileInputRefs.current['itReturns'] = el}}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileChange('itReturns', e)}
                        className="hidden"
                      />
                      {errors.itReturns && <p className="text-red-500 text-sm mt-1">{errors.itReturns}</p>}
                    </div>
                  </div>
                )}
                
                {formData.employmentType === 'self-employed' && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Business Proof Documents</span>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('businessProof')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('businessProof')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.businessProof.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.businessProof.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.businessProof.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.businessProof.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">{file.name}</div>
                            ))}
                            {files.businessProof.length > 3 && (
                              <div className="text-xs">+{files.businessProof.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Upload business registration, GST, etc.</p>
                        </div>
                      )}
                    </div>
                    <input
                    ref={(el) => { fileInputRefs.current['aadharFront'] = el; }}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('businessProof', e)}
                      className="hidden"
                    />
                    {errors.businessProof && <p className="text-red-500 text-sm mt-1">{errors.businessProof}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <LoanIcon className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
                <p className="text-gray-600">Provide specific details for your {loanTypes.find(l => l.id === selectedLoanType)?.title}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              {selectedLoanType === 'home-loan' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Property Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyType ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select property type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="plot">Plot/Land</option>
                        <option value="industrial">Industrial</option>
                      </select>
                      {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Location *
                      </label>
                      <input
                        type="text"
                        value={formData.propertyLocation}
                        onChange={(e) => handleInputChange('propertyLocation', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyLocation ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter property location"
                      />
                      {errors.propertyLocation && <p className="text-red-500 text-sm mt-1">{errors.propertyLocation}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.propertyCity}
                        onChange={(e) => handleInputChange('propertyCity', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyCity ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter city"
                      />
                      {errors.propertyCity && <p className="text-red-500 text-sm mt-1">{errors.propertyCity}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.propertyState}
                        onChange={(e) => handleInputChange('propertyState', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyState ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter state"
                      />
                      {errors.propertyState && <p className="text-red-500 text-sm mt-1">{errors.propertyState}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        value={formData.propertyPincode}
                        onChange={(e) => handleInputChange('propertyPincode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyPincode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter pincode"
                        maxLength={6}
                      />
                      {errors.propertyPincode && <p className="text-red-500 text-sm mt-1">{errors.propertyPincode}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Value (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyValue ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter property value"
                      />
                      {errors.propertyValue && <p className="text-red-500 text-sm mt-1">{errors.propertyValue}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Construction Status *
                      </label>
                      <select
                        value={formData.constructionStatus}
                        onChange={(e) => handleInputChange('constructionStatus', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.constructionStatus ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select construction status</option>
                        <option value="under-construction">Under Construction</option>
                        <option value="ready-to-move">Ready to Move</option>
                      </select>
                      {errors.constructionStatus && <p className="text-red-500 text-sm mt-1">{errors.constructionStatus}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Age (Years)
                      </label>
                      <input
                        type="number"
                        value={formData.propertyAge}
                        onChange={(e) => handleInputChange('propertyAge', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter property age"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plot Size (Sq. Ft.)
                      </label>
                      <input
                        type="number"
                        value={formData.plotSize}
                        onChange={(e) => handleInputChange('plotSize', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter plot size"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Built-Up Area (Sq. Ft.)
                      </label>
                      <input
                        type="number"
                        value={formData.builtUpArea}
                        onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter built-up area"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Property Documents</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('propertyDocuments')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('propertyDocuments')}
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors border-gray-300"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">Upload property documents (sale deed, title deed, etc.)</p>
                    </div>
                    <input
                    ref={(el )=> {fileInputRefs.current['propertyDocuments'] = el}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('propertyDocuments', e)}
                      className="hidden"
                    />
                    {errors.propertyDocuments && <p className="text-red-500 text-sm mt-1">{errors.propertyDocuments}</p>}
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'loan-against-property' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Loan Against Property Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose of Loan *
                      </label>
                      <select
                        value={formData.propertyFor}
                        onChange={(e) => handleInputChange('propertyFor', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.propertyFor ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select purpose</option>
                        <option value="business">Business Expansion</option>
                        <option value="education">Education</option>
                        <option value="medical">Medical Emergency</option>
                        <option value="wedding">Wedding</option>
                        <option value="home-renovation">Home Renovation</option>
                        <option value="debt-consolidation">Debt Consolidation</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.propertyFor && <p className="text-red-500 text-sm mt-1">{errors.propertyFor}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Property Documents *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('propertyDocuments')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('propertyDocuments')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.propertyDocuments.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.propertyDocuments.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.propertyDocuments.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.propertyDocuments.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">{file.name}</div>
                            ))}
                            {files.propertyDocuments.length > 3 && (
                              <div className="text-xs">+{files.propertyDocuments.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Upload property documents (sale deed, title deed, etc.)</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={(el) => {fileInputRefs.current['propertyDocuments'] = el}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('propertyDocuments', e)}
                      className="hidden"
                    />
                    {errors.propertyDocuments && <p className="text-red-500 text-sm mt-1">{errors.propertyDocuments}</p>}
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'business-loan' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter company name"
                      />
                      {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation *
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter your designation"
                      />
                      {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter business name"
                      />
                      {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.businessType ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select business type</option>
                        <option value="proprietorship">Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="llp">LLP</option>
                        <option value="private-limited">Private Limited</option>
                        <option value="public-limited">Public Limited</option>
                        <option value="ngo">NGO/Trust</option>
                      </select>
                      {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Registration Number *
                      </label>
                      <input
                        type="text"
                        value={formData.businessRegistrationNumber}
                        onChange={(e) => handleInputChange('businessRegistrationNumber', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.businessRegistrationNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter registration number"
                      />
                      {errors.businessRegistrationNumber && <p className="text-red-500 text-sm mt-1">{errors.businessRegistrationNumber}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Turnover (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.businessTurnover}
                        onChange={(e) => handleInputChange('businessTurnover', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.businessTurnover ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter annual turnover"
                      />
                      {errors.businessTurnover && <p className="text-red-500 text-sm mt-1">{errors.businessTurnover}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years in Business *
                      </label>
                      <select
                        value={formData.businessYears}
                        onChange={(e) => handleInputChange('businessYears', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.businessYears ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select years</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      {errors.businessYears && <p className="text-red-500 text-sm mt-1">{errors.businessYears}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          value={formData.businessAddress}
                          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.businessAddress ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter business address"
                        />
                        {errors.businessAddress && <p className="text-red-500 text-sm mt-1">{errors.businessAddress}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          value={formData.businessCity}
                          onChange={(e) => handleInputChange('businessCity', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.businessCity ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter city"
                        />
                        {errors.businessCity && <p className="text-red-500 text-sm mt-1">{errors.businessCity}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          value={formData.businessState}
                          onChange={(e) => handleInputChange('businessState', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.businessState ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter state"
                        />
                        {errors.businessState && <p className="text-red-500 text-sm mt-1">{errors.businessState}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          value={formData.businessPincode}
                          onChange={(e) => handleInputChange('businessPincode', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.businessPincode ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter pincode"
                          maxLength={6}
                        />
                        {errors.businessPincode && <p className="text-red-500 text-sm mt-1">{errors.businessPincode}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Business Proof Documents *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('businessProof')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('businessProof')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.businessProof.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.businessProof.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.businessProof.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.businessProof.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">{file.name}</div>
                            ))}
                            {files.businessProof.length > 3 && (
                              <div className="text-xs">+{files.businessProof.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Upload business registration, GST, etc.</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={(el) => {fileInputRefs.current['businessProof'] = el}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('businessProof', e)}
                      className="hidden"
                    />
                    {errors.businessProof && <p className="text-red-500 text-sm mt-1">{errors.businessProof}</p>}
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'car-loan' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Car Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Make *
                      </label>
                      <input
                        type="text"
                        value={formData.carMake}
                        onChange={(e) => handleInputChange('carMake', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.carMake ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter car make (e.g., Maruti Suzuki)"
                      />
                      {errors.carMake && <p className="text-red-500 text-sm mt-1">{errors.carMake}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Model *
                      </label>
                      <input
                        type="text"
                        value={formData.carModel}
                        onChange={(e) => handleInputChange('carModel', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.carModel ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter car model (e.g., Swift)"
                      />
                      {errors.carModel && <p className="text-red-500 text-sm mt-1">{errors.carModel}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Variant *
                      </label>
                      <input
                        type="text"
                        value={formData.carVariant}
                        onChange={(e) => handleInputChange('carVariant', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.carVariant ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter car variant (e.g., VXI, ZXI)"
                      />
                      {errors.carVariant && <p className="text-red-500 text-sm mt-1">{errors.carVariant}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year of Manufacture *
                      </label>
                      <select
                        value={formData.carYear}
                        onChange={(e) => handleInputChange('carYear', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.carYear ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select year</option>
                        {Array.from({length: 20}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.carYear && <p className="text-red-500 text-sm mt-1">{errors.carYear}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Car Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.carPrice}
                        onChange={(e) => handleInputChange('carPrice', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.carPrice ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter car price"
                      />
                      {errors.carPrice && <p className="text-red-500 text-sm mt-1">{errors.carPrice}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        On-Road Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.onRoadPrice}
                        onChange={(e) => handleInputChange('onRoadPrice', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.onRoadPrice ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter on-road price"
                      />
                      {errors.onRoadPrice && <p className="text-red-500 text-sm mt-1">{errors.onRoadPrice}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ex-Showroom Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.exShowroomPrice}
                        onChange={(e) => handleInputChange('exShowroomPrice', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.exShowroomPrice ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter ex-showroom price"
                      />
                      {errors.exShowroomPrice && <p className="text-red-500 text-sm mt-1">{errors.exShowroomPrice}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Existing Car Loan</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.existingCarLoan === true}
                            onChange={() => handleInputChange('existingCarLoan', true)}
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={formData.existingCarLoan === false}
                            onChange={() => handleInputChange('existingCarLoan', false)}
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'education-loan' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Education Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        University/Institution Name *
                      </label>
                      <input
                        type="text"
                        value={formData.universityName}
                        onChange={(e) => handleInputChange('universityName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.universityName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter university name"
                      />
                      {errors.universityName && <p className="text-red-500 text-sm mt-1">{errors.universityName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        value={formData.courseName}
                        onChange={(e) => handleInputChange('courseName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.courseName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter course name"
                      />
                      {errors.courseName && <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Duration (Years) *
                      </label>
                      <input
                        type="text"
                        value={formData.courseDuration}
                        onChange={(e) => handleInputChange('courseDuration', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.courseDuration ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g., 2 years, 4 years"
                      />
                      {errors.courseDuration && <p className="text-red-500 text-sm mt-1">{errors.courseDuration}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Course Fees (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.courseFees}
                        onChange={(e) => handleInputChange('courseFees', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.courseFees ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter total course fees"
                      />
                      {errors.courseFees && <p className="text-red-500 text-sm mt-1">{errors.courseFees}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Scholarship Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.scholarshipAmount}
                        onChange={(e) => handleInputChange('scholarshipAmount', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter scholarship amount"
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guardian Name *
                        </label>
                        <input
                          type="text"
                          value={formData.guardianName}
                          onChange={(e) => handleInputChange('guardianName', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.guardianName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter guardian name"
                        />
                        {errors.guardianName && <p className="text-red-500 text-sm mt-1">{errors.guardianName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relation to Applicant *
                        </label>
                        <select
                          value={formData.guardianRelation}
                          onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.guardianRelation ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Select relation</option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="guardian">Guardian</option>
                        </select>
                        {errors.guardianRelation && <p className="text-red-500 text-sm mt-1">{errors.guardianRelation}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Guardian Annual Income (₹) *
                        </label>
                        <input
                          type="number"
                          value={formData.guardianIncome}
                          onChange={(e) => handleInputChange('guardianIncome', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            ${errors.guardianIncome ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Enter guardian income"
                        />
                        {errors.guardianIncome && <p className="text-red-500 text-sm mt-1">{errors.guardianIncome}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Education Documents *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('educationDocuments')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('educationDocuments')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.educationDocuments.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.educationDocuments.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.educationDocuments.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.educationDocuments.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">{file.name}</div>
                            ))}
                            {files.educationDocuments.length > 3 && (
                              <div className="text-xs">+{files.educationDocuments.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Upload admission letter, fee structure, etc.</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={(el) => {fileInputRefs.current['educationDocuments'] = el}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('educationDocuments', e)}
                      className="hidden"
                    />
                    {errors.educationDocuments && <p className="text-red-500 text-sm mt-1">{errors.educationDocuments}</p>}
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'gold-loan' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Gold Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description of Gold Items *
                      </label>
                      <textarea
                        value={formData.goldItems}
                        onChange={(e) => handleInputChange('goldItems', e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.goldItems ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Describe gold items (jewelry, coins, bars, etc.)"
                      />
                      {errors.goldItems && <p className="text-red-500 text-sm mt-1">{errors.goldItems}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Weight (Grams) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.totalWeight}
                        onChange={(e) => handleInputChange('totalWeight', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.totalWeight ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter total weight"
                      />
                      {errors.totalWeight && <p className="text-red-500 text-sm mt-1">{errors.totalWeight}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purity (Carat) *
                      </label>
                      <select
                        value={formData.purity}
                        onChange={(e) => handleInputChange('purity', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.purity ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select purity</option>
                        <option value="24">24 Carat</option>
                        <option value="22">22 Carat</option>
                        <option value="21">21 Carat</option>
                        <option value="18">18 Carat</option>
                        <option value="14">14 Carat</option>
                        <option value="10">10 Carat</option>
                      </select>
                      {errors.purity && <p className="text-red-500 text-sm mt-1">{errors.purity}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Value (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.estimatedValue}
                        onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.estimatedValue ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter estimated value"
                      />
                      {errors.estimatedValue && <p className="text-red-500 text-sm mt-1">{errors.estimatedValue}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Photos of Gold Items *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('goldPhotos')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('goldPhotos')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.goldPhotos.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.goldPhotos.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.goldPhotos.length} photos uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.goldPhotos.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">{file.name}</div>
                            ))}
                            {files.goldPhotos.length > 3 && (
                              <div className="text-xs">+{files.goldPhotos.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Upload clear photos of gold items from multiple angles</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={(el) => {fileInputRefs.current['goldPhotos'] = el}}
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('goldPhotos', e)}
                      className="hidden"
                    />
                    {errors.goldPhotos && <p className="text-red-500 text-sm mt-1">{errors.goldPhotos}</p>}
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'loan-against-securities' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Securities Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Securities *
                      </label>
                      <select
                        value={formData.securitiesType}
                        onChange={(e) => handleInputChange('securitiesType', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.securitiesType ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select securities type</option>
                        <option value="equity">Equity Shares</option>
                        <option value="mutual-funds">Mutual Funds</option>
                        <option value="bonds">Bonds</option>
                        <option value="fd">Fixed Deposits</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.securitiesType && <p className="text-red-500 text-sm mt-1">{errors.securitiesType}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Value of Securities (₹) *
                      </label>
                      <input
                        type="number"
                        value={formData.securitiesValue}
                        onChange={(e) => handleInputChange('securitiesValue', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.securitiesValue ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter total value"
                      />
                      {errors.securitiesValue && <p className="text-red-500 text-sm mt-1">{errors.securitiesValue}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Demat Account Number *
                      </label>
                      <input
                        type="text"
                        value={formData.dematAccountNumber}
                        onChange={(e) => handleInputChange('dematAccountNumber', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.dematAccountNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter demat account number"
                      />
                      {errors.dematAccountNumber && <p className="text-red-500 text-sm mt-1">{errors.dematAccountNumber}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Broker Name *
                      </label>
                      <input
                        type="text"
                        value={formData.brokerName}
                        onChange={(e) => handleInputChange('brokerName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          ${errors.brokerName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter broker name"
                      />
                      {errors.brokerName && <p className="text-red-500 text-sm mt-1">{errors.brokerName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Securities Proof *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput('securitiesProof')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput('securitiesProof')}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors
                        ${files.securitiesProof.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300'}`}
                    >
                      {files.securitiesProof.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.securitiesProof.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.securitiesProof.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">{file.name}</div>
                            ))}
                            {files.securitiesProof.length > 3 && (
                              <div className="text-xs">+{files.securitiesProof.length - 3} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 text-sm">Upload demat statement, portfolio summary, etc.</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={(el) => {fileInputRefs.current['securitiesProof'] = el}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange('securitiesProof', e)}
                      className="hidden"
                    />
                    {errors.securitiesProof && <p className="text-red-500 text-sm mt-1">{errors.securitiesProof}</p>}
                  </div>
                </div>
              )}
              
              {selectedLoanType === 'personal-loan' && (
                <div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Personal Loan Information</h4>
                        <p className="text-blue-800 text-sm">
                          For personal loans, we only require the basic information and document verification completed in previous steps.
                          No additional details are needed at this time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Account Details</h2>
              <p className="text-gray-600">Provide your bank account details for loan disbursement</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your bank account number"
                  />
                  {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.confirmAccountNumber}
                    onChange={(e) => handleInputChange('confirmAccountNumber', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.confirmAccountNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Re-enter your bank account number"
                  />
                  {errors.confirmAccountNumber && <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter IFSC code (e.g., SBIN0002499)"
                    maxLength={11}
                  />
                  {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter bank name"
                  />
                  {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Name *
                  </label>
                  <input
                    type="text"
                    value={formData.branchName}
                    onChange={(e) => handleInputChange('branchName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${errors.branchName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter branch name"
                  />
                  {errors.branchName && <p className="text-red-500 text-sm mt-1">{errors.branchName}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Important Information</h4>
                        <p className="text-blue-800 text-sm">
                          Please ensure that the bank account details provided are accurate and belong to you. 
                          The loan amount will be disbursed to this account. We recommend using your primary savings account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
              <p className="text-gray-600">Review your application details and submit</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</div>
                    <div><span className="text-gray-600">Email:</span> {formData.email}</div>
                    <div><span className="text-gray-600">Phone:</span> {formData.phone}</div>
                    <div><span className="text-gray-600">PAN:</span> {formData.panNumber}</div>
                    <div><span className="text-gray-600">Aadhar:</span> {formData.aadharNumber}</div>
                    <div><span className="text-gray-600">Income:</span> ₹{formData.annualIncome}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Loan Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Loan Type:</span> {loanTypes.find(l => l.id === selectedLoanType)?.title}</div>
                    {selectedLoanType === 'home-loan' && (
                      <>
                        <div><span className="text-gray-600">Property:</span> {formData.propertyLocation}, {formData.propertyCity}</div>
                        <div><span className="text-gray-600">Property Value:</span> ₹{formData.propertyValue}</div>
                      </>
                    )}
                    {selectedLoanType === 'car-loan' && (
                      <>
                        <div><span className="text-gray-600">Car:</span> {formData.carMake} {formData.carModel}</div>
                        <div><span className="text-gray-600">Car Price:</span> ₹{formData.carPrice}</div>
                      </>
                    )}
                    {selectedLoanType === 'education-loan' && (
                      <>
                        <div><span className="text-gray-600">University:</span> {formData.universityName}</div>
                        <div><span className="text-gray-600">Course:</span> {formData.courseName}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Bank Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Account Number:</span> {formData.accountNumber?.replace(/.(?=.{4})/g, '*')}</div>
                    <div><span className="text-gray-600">IFSC Code:</span> {formData.ifscCode}</div>
                    <div><span className="text-gray-600">Bank:</span> {formData.bankName}</div>
                    <div><span className="text-gray-600">Branch:</span> {formData.branchName}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Declaration</h4>
                    <p className="text-blue-800 text-sm mb-4">
                      I hereby declare that all the information provided in this application is true, correct, and complete to the best of my knowledge and belief. 
                      I understand that any false information may lead to rejection of my application or cancellation of the loan.
                    </p>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm text-blue-800">
                        I accept the terms and conditions and authorize the bank to verify my information
                      </label>
                    </div>
                    {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Application Progress</span>
            <span className="text-sm text-gray-500">{currentStep} of {totalSteps} steps</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${i + 1 < currentStep 
                    ? 'bg-green-500 text-white' 
                    : i + 1 === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {i + 1 < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {renderStepContent()}
          </div>
          
          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors
                ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Previous
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentStep === totalSteps ? 'Submit Application' : 'Next'}
            </button>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our customer support at <span className="text-blue-600">support@financemaster.com</span> or call <span className="text-blue-600">1800-123-4567</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;