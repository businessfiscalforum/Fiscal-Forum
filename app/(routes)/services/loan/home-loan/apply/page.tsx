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
  FileText,
  Phone,
  Mail,
  Calendar,
  CreditCard,
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

  // Step 3 - Loan Specific
  // Home Loan / Loan Against Property
  propertyType: string;
  propertyLocation: string;
  propertyCity: string;
  propertyState: string;
  propertyPincode: string;
  propertyValue: string;
  constructionStatus: string;
  propertyFor: string;
  plotSize: string;
  builtUpArea: string;

  // Business Loan
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

  // Car Loan
  carMake: string;
  carModel: string;
  carVariant: string;
  carYear: string;
  carPrice: string;
  onRoadPrice: string;
  exShowroomPrice: string;

  // Education Loan
  universityName: string;
  courseName: string;
  courseDuration: string;
  courseFees: string;
  scholarshipAmount: string;
  guardianName: string;
  guardianRelation: string;
  guardianIncome: string;

  // Gold Loan
  goldItems: string;
  totalWeight: string;
  purity: string;
  estimatedValue: string;

  // Loan Against Securities
  securitiesType: string;
  securitiesValue: string;
  dematAccountNumber: string;
  brokerName: string;

  // Step 4 - Bank Details
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;

  // Step 5 - Terms
  termsAccepted: boolean;
}

type FilesState = {
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
};

interface LoanType {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const LoanApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedLoanType, setSelectedLoanType] = useState<string>("home-loan");
  const [formData, setFormData] = useState<FormData>({
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

    // Loan Specific
    propertyType: "",
    propertyLocation: "",
    propertyCity: "",
    propertyState: "",
    propertyPincode: "",
    propertyValue: "",
    constructionStatus: "",
    propertyFor: "",
    plotSize: "",
    builtUpArea: "",

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

    carMake: "",
    carModel: "",
    carVariant: "",
    carYear: "",
    carPrice: "",
    onRoadPrice: "",
    exShowroomPrice: "",

    universityName: "",
    courseName: "",
    courseDuration: "",
    courseFees: "",
    scholarshipAmount: "",
    guardianName: "",
    guardianRelation: "",
    guardianIncome: "",

    goldItems: "",
    totalWeight: "",
    purity: "",
    estimatedValue: "",

    securitiesType: "",
    securitiesValue: "",
    dematAccountNumber: "",
    brokerName: "",

    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",

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
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const router = useRouter();

  const loanTypes: LoanType[] = [
    { id: "home-loan", title: "Home Loan", icon: Home, gradient: "from-blue-500 to-blue-600" },
    { id: "loan-against-property", title: "Loan Against Property", icon: Building, gradient: "from-emerald-500 to-emerald-600" },
    { id: "personal-loan", title: "Personal Loan", icon: User, gradient: "from-purple-500 to-purple-600" },
    { id: "business-loan", title: "Business Loan", icon: Briefcase, gradient: "from-orange-500 to-orange-600" },
    { id: "gold-loan", title: "Gold Loan", icon: Coins, gradient: "from-yellow-500 to-yellow-600" },
    { id: "car-loan", title: "Car Loan", icon: Car, gradient: "from-red-500 to-red-600" },
    { id: "education-loan", title: "Education Loan", icon: GraduationCap, gradient: "from-indigo-500 to-indigo-600" },
    { id: "loan-against-securities", title: "Loan Against Securities", icon: ShieldCheck, gradient: "from-slate-500 to-gray-600" },
  ];

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const newFiles = Array.from(fileList);
    setFiles((prev) => {
      const current = prev[field as keyof FilesState];
      if (Array.isArray(current)) {
        return { ...prev, [field]: [...current, ...newFiles] };
      } else {
        return { ...prev, [field]: newFiles[0] };
      }
    });
  };

  const removeFile = (field: string, index?: number) => {
    setFiles((prev) => {
      const current = prev[field as keyof FilesState];
      if (current !== null && Array.isArray(current) && index !== undefined) {
        const updatedFiles = current.filter((_, i) => i !== index);
        return { ...prev, [field]: updatedFiles };
      } else {
        return { ...prev, [field]: null };
      }
    });
  };

  const triggerFileInput = (field: string) => {
    fileInputRefs.current[field]?.click();
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
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.panNumber)) newErrors.panNumber = "PAN number is invalid";
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

    if (!files.panCard) newErrors.panCard = "PAN card is required";
    if (formData.employmentType === "salaried") {
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
      case "home-loan":
      case "loan-against-property":
        if (!formData.propertyType) newErrors.propertyType = "Property type is required";
        if (!formData.propertyLocation) newErrors.propertyLocation = "Property location is required";
        if (!formData.propertyCity) newErrors.propertyCity = "Property city is required";
        if (!formData.propertyState) newErrors.propertyState = "Property state is required";
        if (!formData.propertyPincode) newErrors.propertyPincode = "Property pincode is required";
        else if (!/^\d{6}$/.test(formData.propertyPincode)) newErrors.propertyPincode = "Pincode must be 6 digits";
        if (!formData.propertyValue) newErrors.propertyValue = "Property value is required";
        if (!formData.constructionStatus) newErrors.constructionStatus = "Construction status is required";
        if (selectedLoanType === "loan-against-property" && files.propertyDocuments.length === 0)
          newErrors.propertyDocuments = "Property documents are required";
        break;

      case "business-loan":
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

      case "car-loan":
        if (!formData.carMake) newErrors.carMake = "Car make is required";
        if (!formData.carModel) newErrors.carModel = "Car model is required";
        if (!formData.carVariant) newErrors.carVariant = "Car variant is required";
        if (!formData.carYear) newErrors.carYear = "Car year is required";
        if (!formData.carPrice) newErrors.carPrice = "Car price is required";
        if (!formData.onRoadPrice) newErrors.onRoadPrice = "On-road price is required";
        if (!formData.exShowroomPrice) newErrors.exShowroomPrice = "Ex-showroom price is required";
        break;

      case "education-loan":
        if (!formData.universityName) newErrors.universityName = "University name is required";
        if (!formData.courseName) newErrors.courseName = "Course name is required";
        if (!formData.courseDuration) newErrors.courseDuration = "Course duration is required";
        if (!formData.courseFees) newErrors.courseFees = "Course fees is required";
        if (!formData.guardianName) newErrors.guardianName = "Guardian name is required";
        if (!formData.guardianRelation) newErrors.guardianRelation = "Guardian relation is required";
        if (!formData.guardianIncome) newErrors.guardianIncome = "Guardian income is required";
        if (files.educationDocuments.length === 0) newErrors.educationDocuments = "Education documents are required";
        break;

      case "gold-loan":
        if (!formData.goldItems) newErrors.goldItems = "Gold items description is required";
        if (!formData.totalWeight) newErrors.totalWeight = "Total weight is required";
        if (!formData.purity) newErrors.purity = "Purity is required";
        if (!formData.estimatedValue) newErrors.estimatedValue = "Estimated value is required";
        if (files.goldPhotos.length === 0) newErrors.goldPhotos = "Gold photos are required";
        break;

      case "loan-against-securities":
        if (!formData.securitiesType) newErrors.securitiesType = "Securities type is required";
        if (!formData.securitiesValue) newErrors.securitiesValue = "Securities value is required";
        if (!formData.dematAccountNumber) newErrors.dematAccountNumber = "Demat account number is required";
        if (!formData.brokerName) newErrors.brokerName = "Broker name is required";
        if (files.securitiesProof.length === 0) newErrors.securitiesProof = "Securities proof is required";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!formData.confirmAccountNumber) newErrors.confirmAccountNumber = "Please confirm account number";
    else if (formData.accountNumber !== formData.confirmAccountNumber)
      newErrors.confirmAccountNumber = "Account numbers do not match";
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(formData.ifscCode)) newErrors.ifscCode = "IFSC code is invalid";
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.branchName) newErrors.branchName = "Branch name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = (): boolean => {
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: "You must accept the terms and conditions" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = async () => {
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
      default:
        break;
    }

    if (isValid) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              loanType: selectedLoanType,
              formData,
              files: Object.fromEntries(
                Object.entries(files).map(([key, value]) => [
                  key,
                  value ? (Array.isArray(value) ? value.map((f) => f.name) : value.name) : null,
                ])
              ),
            }),
          });

          if (response.ok) {
            alert("Application submitted successfully!");
            router.push("/loan-application-success");
          } else {
            const result = await response.json();
            alert(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error("Network error:", error);
          alert("Failed to submit application. Please try again.");
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Select Loan Type</h2>
            <p className="text-gray-600">Choose the type of loan you want to apply for</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loanTypes.map((loan) => {
                const Icon = loan.icon;
                return (
                  <div
                    key={loan.id}
                    onClick={() => setSelectedLoanType(loan.id)}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all text-center ${
                      selectedLoanType === loan.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${loan.gradient} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{loan.title}</h3>
                  </div>
                );
              })}
            </div>

            {selectedLoanType && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your first name"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your last name"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number *</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.panNumber}
                        onChange={(e) => handleInputChange("panNumber", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.panNumber ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="ABCDE1234F"
                      />
                    </div>
                    {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number *</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.aadharNumber}
                        onChange={(e) => handleInputChange("aadharNumber", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.aadharNumber ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="1234 5678 9012"
                        maxLength={12}
                      />
                    </div>
                    {errors.aadharNumber && <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                      rows={2}
                      placeholder="Enter your complete address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter state"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => handleInputChange("employmentType", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.employmentType ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select employment type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self Employed</option>
                    </select>
                    {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (₹) *</label>
                    <input
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.annualIncome ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter annual income"
                    />
                    {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
            <p className="text-gray-600">Upload required documents to verify your identity and income</p>

            {/* Aadhar Card */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Aadhar Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Front Side *</label>
                    {!files.aadharFront && (
                      <button
                        type="button"
                        onClick={() => triggerFileInput("aadharFront")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                  <div
                    onClick={() => triggerFileInput("aadharFront")}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
                      files.aadharFront ? "border-green-400 bg-green-50" : "border-gray-300"
                    }`}
                  >
                    {files.aadharFront ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 text-green-500" />
                        <div className="text-left">
                          <div className="font-medium text-green-800">{files.aadharFront.name}</div>
                          <div className="text-sm text-green-600">Uploaded successfully</div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile("aadharFront");
                          }}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-600">Click to upload front side of Aadhar card</p>
                    )}
                  </div>
                  <input
                    ref={(el) => {(fileInputRefs.current["aadharFront"] = el)}}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("aadharFront", e)}
                    className="hidden"
                  />
                  {errors.aadharFront && <p className="text-red-500 text-sm mt-1">{errors.aadharFront}</p>}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Back Side *</label>
                    {!files.aadharBack && (
                      <button
                        type="button"
                        onClick={() => triggerFileInput("aadharBack")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                  <div
                    onClick={() => triggerFileInput("aadharBack")}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
                      files.aadharBack ? "border-green-400 bg-green-50" : "border-gray-300"
                    }`}
                  >
                    {files.aadharBack ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-8 h-8 text-green-500" />
                        <div className="text-left">
                          <div className="font-medium text-green-800">{files.aadharBack.name}</div>
                          <div className="text-sm text-green-600">Uploaded successfully</div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile("aadharBack");
                          }}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-600">Click to upload back side of Aadhar card</p>
                    )}
                  </div>
                  <input
                    ref={(el) =>{ (fileInputRefs.current["aadharBack"] = el)}}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange("aadharBack", e)}
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
                    onClick={() => triggerFileInput("panCard")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Upload
                  </button>
                )}
              </div>
              <div
                onClick={() => triggerFileInput("panCard")}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
                  files.panCard ? "border-green-400 bg-green-50" : "border-gray-300"
                }`}
              >
                {files.panCard ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-8 h-8 text-green-500" />
                    <div className="text-left">
                      <div className="font-medium text-green-800">{files.panCard.name}</div>
                      <div className="text-sm text-green-600">Uploaded successfully</div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile("panCard");
                      }}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600">Click to upload PAN card</p>
                )}
              </div>
              <input
                ref={(el) => {(fileInputRefs.current["panCard"] = el)}}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("panCard", e)}
                className="hidden"
              />
              {errors.panCard && <p className="text-red-500 text-sm mt-1">{errors.panCard}</p>}
            </div>

            {/* Income Documents */}
            {formData.employmentType === "salaried" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Income Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Salary Slips *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput("salarySlips")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput("salarySlips")}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
                        files.salarySlips.length > 0 ? "border-green-400 bg-green-50" : "border-gray-300"
                      }`}
                    >
                      {files.salarySlips.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.salarySlips.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.salarySlips.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">Upload last 3 months salary slips</p>
                      )}
                    </div>
                    <input
                      ref={(el) => {(fileInputRefs.current["salarySlips"] = el)}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange("salarySlips", e)}
                      className="hidden"
                    />
                    {errors.salarySlips && <p className="text-red-500 text-sm mt-1">{errors.salarySlips}</p>}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Bank Statements *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput("bankStatements")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput("bankStatements")}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
                        files.bankStatements.length > 0 ? "border-green-400 bg-green-50" : "border-gray-300"
                      }`}
                    >
                      {files.bankStatements.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.bankStatements.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.bankStatements.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">Upload last 6 months bank statements</p>
                      )}
                    </div>
                    <input
                      ref={(el) => {(fileInputRefs.current["bankStatements"] = el)}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange("bankStatements", e)}
                      className="hidden"
                    />
                    {errors.bankStatements && <p className="text-red-500 text-sm mt-1">{errors.bankStatements}</p>}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">ITR *</label>
                      <button
                        type="button"
                        onClick={() => triggerFileInput("itReturns")}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Upload
                      </button>
                    </div>
                    <div
                      onClick={() => triggerFileInput("itReturns")}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors ${
                        files.itReturns.length > 0 ? "border-green-400 bg-green-50" : "border-gray-300"
                      }`}
                    >
                      {files.itReturns.length > 0 ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-green-800">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{files.itReturns.length} files uploaded</span>
                          </div>
                          <div className="text-sm text-green-600">
                            {files.itReturns.slice(0, 3).map((file, index) => (
                              <div key={index} className="truncate">
                                {file.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">Upload last 2 years ITR</p>
                      )}
                    </div>
                    <input
                      ref={(el) => {(fileInputRefs.current["itReturns"] = el)}}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleFileChange("itReturns", e)}
                      className="hidden"
                    />
                    {errors.itReturns && <p className="text-red-500 text-sm mt-1">{errors.itReturns}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
            <p className="text-gray-600">Please provide details specific to your loan type</p>

            {selectedLoanType === "home-loan" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Home Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.propertyType ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="independent-house">Independent House</option>
                      <option value="villa">Villa</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Location *</label>
                    <input
                      type="text"
                      value={formData.propertyLocation}
                      onChange={(e) => handleInputChange("propertyLocation", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.propertyLocation ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter property location"
                    />
                    {errors.propertyLocation && <p className="text-red-500 text-sm mt-1">{errors.propertyLocation}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.propertyCity}
                      onChange={(e) => handleInputChange("propertyCity", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.propertyCity ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.propertyCity && <p className="text-red-500 text-sm mt-1">{errors.propertyCity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      value={formData.propertyState}
                      onChange={(e) => handleInputChange("propertyState", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.propertyState ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter state"
                    />
                    {errors.propertyState && <p className="text-red-500 text-sm mt-1">{errors.propertyState}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      value={formData.propertyPincode}
                      onChange={(e) => handleInputChange("propertyPincode", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.propertyPincode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                    {errors.propertyPincode && <p className="text-red-500 text-sm mt-1">{errors.propertyPincode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Value (₹) *</label>
                    <input
                      type="number"
                      value={formData.propertyValue}
                      onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.propertyValue ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter property value"
                    />
                    {errors.propertyValue && <p className="text-red-500 text-sm mt-1">{errors.propertyValue}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Construction Status *</label>
                    <select
                      value={formData.constructionStatus}
                      onChange={(e) => handleInputChange("constructionStatus", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.constructionStatus ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select construction status</option>
                      <option value="under-construction">Under Construction</option>
                      <option value="ready-to-move">Ready to Move</option>
                    </select>
                    {errors.constructionStatus && <p className="text-red-500 text-sm mt-1">{errors.constructionStatus}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plot Size (Sq. Ft.)</label>
                    <input
                      type="number"
                      value={formData.plotSize}
                      onChange={(e) => handleInputChange("plotSize", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter plot size"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Built-Up Area (Sq. Ft.)</label>
                    <input
                      type="number"
                      value={formData.builtUpArea}
                      onChange={(e) => handleInputChange("builtUpArea", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter built-up area"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Add other loan types similarly... */}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
            <p className="text-gray-600">Enter your bank account details for disbursement</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number *</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.accountNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter account number"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Account Number *</label>
                <input
                  type="text"
                  value={formData.confirmAccountNumber}
                  onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.confirmAccountNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm account number"
                />
                {errors.confirmAccountNumber && <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code *</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.ifscCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter IFSC code"
                />
                {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.bankName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter bank name"
                />
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name *</label>
                <input
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange("branchName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.branchName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter branch name"
                />
                {errors.branchName && <p className="text-red-500 text-sm mt-1">{errors.branchName}</p>}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
            <p className="text-gray-600">Please review and accept the terms to proceed</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">Loan Agreement</h3>
              <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                <li>I authorize the bank to verify my personal and financial information</li>
                <li>I confirm that all information provided is accurate and complete</li>
                <li>I understand that false information may lead to rejection of my application</li>
                <li>I agree to the processing of my personal data as per privacy policy</li>
              </ul>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                className="mt-1 mr-2"
              />
              <label className="text-sm text-gray-700">
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>{" "}
                and authorize the bank to verify my information
              </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
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
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i + 1 < currentStep
                    ? "bg-green-500 text-white"
                    : i + 1 === currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {i + 1 < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentStep === totalSteps ? "Submit Application" : "Next"}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our customer support at{" "}
            <span className="text-blue-600">support@financemaster.com</span> or call us at{" "}
            <span className="text-blue-600">+91 98765 43210</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;