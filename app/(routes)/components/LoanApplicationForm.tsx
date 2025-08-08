/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LoanApplicationForm.tsx
'use client';

import { useState } from 'react';

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    panNumber: '',
    maritalStatus: '',
    gender: '',

    // Address
    current_address_line1: '',
    current_address_line2: '',
    currentPincode: '',
    currentCity: '',
    currentState: '',
    residenceType: '',
    isPermanentAddressSameAsCurrent: true,
    permanentAddressLine1: '',
    permanentAddressLine2: '',
    permanentPincode: '',
    permanentCity: '',
    permanentState: '',

    // Employment
    employmentType: '',
    companyName: '',
    businessName: '',
    designation: '',
    natureOfBusiness: '',
    annualIncome: '',
    monthlyIncome: '',
    workExperience: '',

    // Co-Applicant
    hasCoApplicant: false,
    coApplicantFirstName: '',
    coApplicantLastName: '',
    coApplicantEmail: '',
    coApplicantPhone: '',
    coApplicantPan: '',
    coApplicantDateOfBirth: '',
    coApplicantGender: '',
    coApplicantRelationship: '',
    coApplicantEmploymentType: '',
    coApplicantCompany: '',
    coApplicantBusiness: '',
    coApplicantAnnualIncome: '',
    coApplicantMonthlyIncome: '',

    // Loan & Type
    loanType: '',
    loanAmount: '',
    loanTenure: '',
    loanPurpose: '',
    creditScore: '',
    existingEMIs: '',
    salaryAccount: '',
    bankName: '',
    accountNumber: '',

    // Property (Home Loan, LAP)
    propertyType: '',
    propertyUsage: '',
    propertyAge: '',
    propertyValue: '',
    propertyAddress: '',
    propertyCity: '',
    propertyPincode: '',
    propertyState: '',
    transactionType: '',
    agreementValue: '',
    downPayment: '',

    // Car Loan
    carType: '',
    carMake: '',
    carModel: '',
    carVariant: '',
    manufacturingYear: '',
    carPrice: '',
    dealerName: '',
    dealerLocation: '',

    // Education Loan
    educationLevel: '',
    courseType: '',
    courseName: '',
    courseDuration: '',
    institutionName: '',
    institutionLocation: '',
    institutionCountry: '',
    totalCourseFee: '',
    previousEducation: '',
    previousMarks: '',

    // Gold Loan
    goldWeight: '',
    goldPurity: '',
    goldType: '',
    estimatedValue: '',
    goldItemsDescription: '',
    preferredBranch: '',
    appointmentDate: '',

    // Securities Loan
    securitiesType: '',
    securitiesValue: '',
    portfolioDetails: '',
    dematAccountNumber: '',
    brokerName: '',
    pledgeableSecurities: '',
    averageHoldingPeriod: '',

    // Business Loan
    gstNumber: '',
    businessVintage: '',
    businessAddress: '',
    businessCity: '',
    businessPincode: '',
    businessState: '',
    repaymentSource: '',
    useOfFundsEquipment: '',
    useOfFundsWorkingCapital: '',
    useOfFundsExpansion: '',
    useOfFundsMarketing: '',
    useOfFundsOther: '',

    // References
    reference1Name: '',
    reference1Phone: '',
    reference1Relation: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Relation: '',

    paymentMethod: '',
    applicationStatus: "SUBMITTED"
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Application submitted successfully!');
        setFormData({
          ...formData,
          applicationStatus: 'SUBMITTED',
        });
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit. Check console.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Loan Application</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} />
            <Input label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            <Select label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={['', 'Married', 'Unmarried']} />
            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['', 'Male', 'Female', 'Other']} />
          </div>
        </section>

        {/* Current Address */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Current Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Address Line 1" name="currentAddressLine1" value={formData.current_address_line1} onChange={handleChange} />
            <Input label="Address Line 2" name="currentAddressLine2" value={formData.current_address_line2} onChange={handleChange} />
            <Input label="Pincode" name="currentPincode" value={formData.currentPincode} onChange={handleChange} />
            <Input label="City" name="currentCity" value={formData.currentCity} onChange={handleChange} />
            <Input label="State" name="currentState" value={formData.currentState} onChange={handleChange} />
            <Select label="Residence Type" name="residenceType" value={formData.residenceType} onChange={handleChange} options={['', 'Rented', 'Owned', 'Leased']} />
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isPermanentAddressSameAsCurrent"
                checked={formData.isPermanentAddressSameAsCurrent}
                onChange={handleChange}
              />
              <span>Permanent address same as current</span>
            </label>
          </div>

          {!formData.isPermanentAddressSameAsCurrent && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-3">Permanent Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Address Line 1" name="permanentAddressLine1" value={formData.permanentAddressLine1} onChange={handleChange} />
                <Input label="Address Line 2" name="permanentAddressLine2" value={formData.permanentAddressLine2} onChange={handleChange} />
                <Input label="Pincode" name="permanentPincode" value={formData.permanentPincode} onChange={handleChange} />
                <Input label="City" name="permanentCity" value={formData.permanentCity} onChange={handleChange} />
                <Input label="State" name="permanentState" value={formData.permanentState} onChange={handleChange} />
              </div>
            </div>
          )}
        </section>

        {/* Employment */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Employment Details</h2>
          <Select
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            options={['', 'salaried', 'self-employed', 'business', 'professional']}
          />
          {formData.employmentType === 'salaried' && (
            <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
          )}
          {formData.employmentType === 'self-employed' || formData.employmentType === 'business' || formData.employmentType === 'professional' ? (
            <div>
              <Input label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} />
              <Input label="Nature of Business" name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} />
            </div>
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <Select label="Annual Income" name="annualIncome" value={formData.annualIncome} onChange={handleChange} options={['', '3-5', '5-10', '10-15', '15-25', '25+']} />
            <Input label="Monthly Income" type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />
            <Input label="Work Experience (years)" type="number" name="workExperience" value={formData.workExperience} onChange={handleChange} />
          </div>
        </section>

        {/* Co-Applicant */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Co-Applicant</h2>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasCoApplicant"
                checked={formData.hasCoApplicant}
                onChange={handleChange}
              />
              <span>Include Co-Applicant</span>
            </label>
          </div>

          {formData.hasCoApplicant && (
            <div className="p-4 bg-gray-50 rounded space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" name="coApplicantFirstName" value={formData.coApplicantFirstName} onChange={handleChange} />
                <Input label="Last Name" name="coApplicantLastName" value={formData.coApplicantLastName} onChange={handleChange} />
                <Input label="Email" type="email" name="coApplicantEmail" value={formData.coApplicantEmail} onChange={handleChange} />
                <Input label="Phone" name="coApplicantPhone" value={formData.coApplicantPhone} onChange={handleChange} />
                <Input label="PAN" name="coApplicantPan" value={formData.coApplicantPan} onChange={handleChange} />
                <Input label="Date of Birth" type="date" name="coApplicantDateOfBirth" value={formData.coApplicantDateOfBirth} onChange={handleChange} />
                <Select label="Gender" name="coApplicantGender" value={formData.coApplicantGender} onChange={handleChange} options={['', 'Male', 'Female', 'Other']} />
                <Input label="Relationship" name="coApplicantRelationship" value={formData.coApplicantRelationship} onChange={handleChange} />
              </div>
              <Select
                label="Employment Type"
                name="coApplicantEmploymentType"
                value={formData.coApplicantEmploymentType}
                onChange={handleChange}
                options={['', 'salaried', 'self-employed', 'business', 'professional']}
              />
              {formData.coApplicantEmploymentType === 'salaried' && (
                <Input label="Company" name="coApplicantCompany" value={formData.coApplicantCompany} onChange={handleChange} />
              )}
              {formData.coApplicantEmploymentType !== 'salaried' && (
                <Input label="Business" name="coApplicantBusiness" value={formData.coApplicantBusiness} onChange={handleChange} />
              )}
              <Select
                label="Annual Income"
                name="coApplicantAnnualIncome"
                value={formData.coApplicantAnnualIncome}
                onChange={handleChange}
                options={['', '3-5', '5-10', '10-15', '15-25', '25+']}
              />
              <Input
                label="Monthly Income"
                type="number"
                name="coApplicantMonthlyIncome"
                value={formData.coApplicantMonthlyIncome}
                onChange={handleChange}
              />
            </div>
          )}
        </section>

        {/* Loan Type */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Loan Details</h2>
          <Select
            label="Loan Type"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            options={[
              '',
              'home-loan',
              'lap',
              'personal',
              'business',
              'gold',
              'car',
              'education',
              'securities',
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input label="Loan Amount" type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
            <Input label="Loan Tenure" type="number" name="loanTenure" value={formData.loanTenure} onChange={handleChange} />
            <Input label="Loan Purpose" name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} />
          </div>
        </section>

        {/* Conditional Sections */}
        {(formData.loanType === 'home-loan' || formData.loanType === 'lap') && (
          <PropertySection formData={formData} handleChange={handleChange} />
        )}
        {formData.loanType === 'car' && <CarSection formData={formData} handleChange={handleChange} />}
        {formData.loanType === 'education' && <EducationSection formData={formData} handleChange={handleChange} />}
        {formData.loanType === 'gold' && <GoldSection formData={formData} handleChange={handleChange} />}
        {formData.loanType === 'securities' && <SecuritiesSection formData={formData} handleChange={handleChange} />}
        {formData.loanType === 'business' && <BusinessSection formData={formData} handleChange={handleChange} />}

        {/* Financial */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Financial & Banking</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Credit Score" type="number" name="creditScore" value={formData.creditScore} onChange={handleChange} />
            <Input label="Existing EMIs" type="number" name="existingEMIs" value={formData.existingEMIs} onChange={handleChange} />
            <Select
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              options={['', 'UPI', 'CARD', 'NETBANKING', 'WALLET', 'EMI']}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input label="Salary Account Bank" name="salaryAccount" value={formData.salaryAccount} onChange={handleChange} />
            <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
            <Input label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
          </div>
        </section>

        {/* References */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Name" name="reference1Name" value={formData.reference1Name} onChange={handleChange} />
            <Input label="Phone" name="reference1Phone" value={formData.reference1Phone} onChange={handleChange} />
            <Input label="Relation" name="reference1Relation" value={formData.reference1Relation} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input label="Name" name="reference2Name" value={formData.reference2Name} onChange={handleChange} />
            <Input label="Phone" name="reference2Phone" value={formData.reference2Phone} onChange={handleChange} />
            <Input label="Relation" name="reference2Relation" value={formData.reference2Relation} onChange={handleChange} />
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

// Reusable Components
const Input = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      {...props}
    />
  </div>
);

const Select = ({ label, options, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      {...props}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
        </option>
      ))}
    </select>
  </div>
);

// Conditional Sections
const PropertySection = ({ formData, handleChange }: any) => (
  <section>
    <h3 className="text-lg font-medium mb-3">Property Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="Property Type"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        options={['', 'apartment', 'villa', 'plot', 'commercial', 'industrial']}
      />
      <Select
        label="Property Usage"
        name="propertyUsage"
        value={formData.propertyUsage}
        onChange={handleChange}
        options={['', 'self-occupied', 'rented', 'under-construction', 'ready-to-move']}
      />
      {formData.loanType === 'lap' && <Input label="Property Age (years)" type="number" name="propertyAge" value={formData.propertyAge} onChange={handleChange} />}
      <Input label="Property Value" type="number" name="propertyValue" value={formData.propertyValue} onChange={handleChange} />
      <Input label="Address" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} />
      <Input label="City" name="propertyCity" value={formData.propertyCity} onChange={handleChange} />
      <Input label="Pincode" name="propertyPincode" value={formData.propertyPincode} onChange={handleChange} />
      <Input label="State" name="propertyState" value={formData.propertyState} onChange={handleChange} />
      {formData.loanType === 'home-loan' && (
        <>
          <Select
            label="Transaction Type"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            options={['', 'New', 'Resale']}
          />
          <Input label="Agreement Value" type="number" name="agreementValue" value={formData.agreementValue} onChange={handleChange} />
          <Input label="Down Payment" type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} />
        </>
      )}
    </div>
  </section>
);

const CarSection = ({ formData, handleChange }: any) => (
  <section>
    <h3 className="text-lg font-medium mb-3">Car Loan Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="Car Type"
        name="carType"
        value={formData.carType}
        onChange={handleChange}
        options={['', 'new', 'used']}
      />
      <Input label="Make" name="carMake" value={formData.carMake} onChange={handleChange} />
      <Input label="Model" name="carModel" value={formData.carModel} onChange={handleChange} />
      <Input label="Variant" name="carVariant" value={formData.carVariant} onChange={handleChange} />
      <Input label="Year" type="number" name="manufacturingYear" value={formData.manufacturingYear} onChange={handleChange} />
      <Input label="Price" type="number" name="carPrice" value={formData.carPrice} onChange={handleChange} />
      <Input label="Dealer Name" name="dealerName" value={formData.dealerName} onChange={handleChange} />
      <Input label="Dealer Location" name="dealerLocation" value={formData.dealerLocation} onChange={handleChange} />
    </div>
  </section>
);

const EducationSection = ({ formData, handleChange }: any) => (
  <section>
    <h3 className="text-lg font-medium mb-3">Education Loan Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="Education Level"
        name="educationLevel"
        value={formData.educationLevel}
        onChange={handleChange}
        options={['', 'undergraduate', 'postgraduate', 'professional', 'diploma']}
      />
      <Select
        label="Course Type"
        name="courseType"
        value={formData.courseType}
        onChange={handleChange}
        options={['', 'engineering', 'medical', 'management', 'law', 'other']}
      />
      <Input label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} />
      <Input label="Duration (years)" type="number" name="courseDuration" value={formData.courseDuration} onChange={handleChange} />
      <Input label="Institution Name" name="institutionName" value={formData.institutionName} onChange={handleChange} />
      <Input label="Location" name="institutionLocation" value={formData.institutionLocation} onChange={handleChange} />
      <Input label="Country" name="institutionCountry" value={formData.institutionCountry} onChange={handleChange} />
      <Input label="Total Course Fee" type="number" name="totalCourseFee" value={formData.totalCourseFee} onChange={handleChange} />
      <Input label="Previous Education" name="previousEducation" value={formData.previousEducation} onChange={handleChange} />
      <Input label="Marks (%)" type="number" step="0.01" name="previousMarks" value={formData.previousMarks} onChange={handleChange} />
    </div>
  </section>
);

const GoldSection = ({ formData, handleChange }: any) => (
  <section>
    <h3 className="text-lg font-medium mb-3">Gold Loan Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input label="Gold Weight (g)" type="number" step="0.001" name="goldWeight" value={formData.goldWeight} onChange={handleChange} />
      <Input label="Purity (K)" type="number" step="0.01" name="goldPurity" value={formData.goldPurity} onChange={handleChange} />
      <Input label="Type (e.g. jewelry)" name="goldType" value={formData.goldType} onChange={handleChange} />
      <Input label="Estimated Value" type="number" name="estimatedValue" value={formData.estimatedValue} onChange={handleChange} />
      <textarea
        className="col-span-full mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        placeholder="Describe gold items"
        name="goldItemsDescription"
        value={formData.goldItemsDescription}
        onChange={handleChange}
      />
      <Input label="Preferred Branch" name="preferredBranch" value={formData.preferredBranch} onChange={handleChange} />
      <Input label="Appointment Date" type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
    </div>
  </section>
);

const SecuritiesSection = ({ formData, handleChange }: any) => (
  <section>
    <h3 className="text-lg font-medium mb-3">Securities Loan Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="Securities Type"
        name="securitiesType"
        value={formData.securitiesType}
        onChange={handleChange}
        options={['', 'mutual-funds', 'shares', 'bonds', 'fixed-deposits']}
      />
      <Input label="Value" type="number" name="securitiesValue" value={formData.securitiesValue} onChange={handleChange} />
      <textarea
        className="col-span-full mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        placeholder="Portfolio details"
        name="portfolioDetails"
        value={formData.portfolioDetails}
        onChange={handleChange}
      />
      <Input label="Demat Account" name="dematAccountNumber" value={formData.dematAccountNumber} onChange={handleChange} />
      <Input label="Broker Name" name="brokerName" value={formData.brokerName} onChange={handleChange} />
      <Input label="Pledgeable Securities" name="pledgeableSecurities" value={formData.pledgeableSecurities} onChange={handleChange} />
      <Input label="Avg Holding Period (months)" type="number" name="averageHoldingPeriod" value={formData.averageHoldingPeriod} onChange={handleChange} />
    </div>
  </section>
);

const BusinessSection = ({ formData, handleChange }: any) => (
  <section>
    <h3 className="text-lg font-medium mb-3">Business Loan Details</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input label="GST Number" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
      <Input label="Business Vintage" name="businessVintage" value={formData.businessVintage} onChange={handleChange} />
      <Input label="Nature of Business" name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} />
      <Input label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={handleChange} />
      <Input label="City" name="businessCity" value={formData.businessCity} onChange={handleChange} />
      <Input label="Pincode" name="businessPincode" value={formData.businessPincode} onChange={handleChange} />
      <Input label="State" name="businessState" value={formData.businessState} onChange={handleChange} />
      <Input label="Repayment Source" name="repaymentSource" value={formData.repaymentSource} onChange={handleChange} />
    </div>
    <h4 className="mt-4 font-medium">Use of Funds (INR)</h4>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
      <Input label="Equipment" type="number" name="useOfFundsEquipment" value={formData.useOfFundsEquipment} onChange={handleChange} />
      <Input label="Working Capital" type="number" name="useOfFundsWorkingCapital" value={formData.useOfFundsWorkingCapital} onChange={handleChange} />
      <Input label="Expansion" type="number" name="useOfFundsExpansion" value={formData.useOfFundsExpansion} onChange={handleChange} />
      <Input label="Marketing" type="number" name="useOfFundsMarketing" value={formData.useOfFundsMarketing} onChange={handleChange} />
      <Input label="Other" type="number" name="useOfFundsOther" value={formData.useOfFundsOther} onChange={handleChange} />
    </div>
  </section>
);

export default LoanApplicationForm;