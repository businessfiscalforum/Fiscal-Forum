"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Schema defined below
const applicationSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  fatherName: z.string().optional(),
  dob: z.string().optional(),
  panNumber: z.string().optional(),
  email: z.string().email('Invalid email address'),
  mobileNo: z.string().min(10, 'Mobile number must be at least 10 digits').max(15),
  gender: z.enum(['Male', 'Female', 'Others']),
  maritalStatus: z.enum(['Married', 'Unmarried']),
  currentAddress1: z.string().min(1, 'Address is required'),
  currentAddress2: z.string().optional(),
  residenceType: z.enum(['Rented', 'Owned']),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(1, 'Pincode is required'),
  permanentSameAsCurrent: z.boolean().default(false),
  
  // Employment Details
  employmentType: z.enum(['Salaried', 'Self Employed']),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  companyAddress1: z.string().optional(),
  companyAddress2: z.string().optional(),
  companyCity: z.string().optional(),
  companyState: z.string().optional(),
  monthlySalary: z.number().min(0, 'Monthly salary is required').optional(),
  experienceInMonths: z.number().min(0, 'Experience is required').optional(),
  currentJobStability: z.enum(['Less than 6 months', '6-12 months', '1-2 years', 'More than 2 years']).optional(),
  
  // Property Details
  propertyType: z.enum(['Residential', 'Commercial']),
  agreementValue: z.number().min(1, 'Agreement value is required'),
  loanAmountRequired: z.number().min(1, 'Loan amount is required'),
  propertyAddress1: z.string().min(1, 'Property address is required'),
  propertyAddress2: z.string().optional(),
  propertyCity: z.string().min(1, 'Property city is required'),
  propertyState: z.string().min(1, 'Property state is required'),
  
  // Existing Obligations
  existingLoansCount: z.number().min(0, 'Existing loans count is required').default(0),
  existingLoanType: z.enum(['None', 'Personal', 'Car', 'Education', 'Other']).optional(),
  
  // References
  reference1: z.object({
    name: z.string().min(1, 'Name is required'),
    mobile: z.string().min(10, 'Mobile number is required'),
    address: z.string().min(1, 'Address is required'),
  }),
  reference2: z.object({
    name: z.string().min(1, 'Name is required'),
    mobile: z.string().min(10, 'Mobile number is required'),
    address: z.string().min(1, 'Address is required'),
  }),
});

// Type assertion to avoid resolver type conflicts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolver = zodResolver(applicationSchema) as any;

type ApplicationForm = z.infer<typeof applicationSchema>;

export default function LoanAgainstProperty() {
  const router = useRouter();
  const [isSubmitted] = useState(false); // Keep for future use

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver,
    defaultValues: {
      permanentSameAsCurrent: false,
      employmentType: 'Salaried',
      maritalStatus: 'Unmarried',
      gender: 'Male',
      residenceType: 'Rented',
      propertyType: 'Residential',
      existingLoansCount: 0,
      
      currentJobStability: 'Less than 6 months',
      reference1: { name: '', mobile: '', address: '' },
      reference2: { name: '', mobile: '', address: '' },
    },
  });

  // Explicit typing for onSubmit to avoid type conflicts
  const onSubmit = async (data: ApplicationForm) => {
  try {
    const res = await fetch('/api/lap-loan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Submission failed: ${error.error}`);
      return;
    }

    const result = await res.json();
    console.log('✅ Application Submitted:', result);
    alert('✅ Application submitted successfully!');
  } catch (err) {
    console.error('Submission Error:', err);
    alert('Something went wrong. Please try again.');
  }
};

  // Helper function to handle numeric inputs
  const numericRegister = (name: keyof ApplicationForm) => ({
    ...register(name, { setValueAs: (v: string) => (v === '' ? undefined : Number(v)) })
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-30 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">Loan Against Property Application</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-emerald-200"
        >
          {/* Applicant Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              APPLICANT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <input
                  {...register('firstName')}
                  placeholder="First Name"
                  className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <input
                  {...register('middleName')}
                  placeholder="Middle Name"
                  className={`w-full border ${errors.middleName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
              <div>
                <input
                  {...register('lastName')}
                  placeholder="Last Name"
                  className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <input
                  {...register('fatherName')}
                  placeholder="Father's Name"
                  className={`w-full border ${errors.fatherName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
              <div>
                <input
                  type="date"
                  {...register('dob')}
                  className={`w-full border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
              </div>
              <div>
                <select
                  {...register('maritalStatus')}
                  className={`w-full border ${errors.maritalStatus ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                </select>
                {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus.message}</p>}
              </div>
              <div>
                <select
                  {...register('gender')}
                  className={`w-full border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
              </div>
              <div>
                <input
                  {...register('mobileNo')}
                  placeholder="Mobile Number"
                  className={`w-full border ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
              </div>
              <div>
                <input
                  {...register('email')}
                  placeholder="Email ID"
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <input
                  {...register('panNumber')}
                  placeholder="PAN Number"
                  className={`w-full border ${errors.panNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.panNumber && <p className="text-red-500 text-sm mt-1">{errors.panNumber.message}</p>}
              </div>
            </div>
          </section>

          {/* Current Address */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              CURRENT ADDRESS DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <textarea
                  {...register('currentAddress1')}
                  placeholder="Address Line 1"
                  rows={2}
                  className={`w-full border ${errors.currentAddress1 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.currentAddress1 && <p className="text-red-500 text-sm mt-1">{errors.currentAddress1.message}</p>}
              </div>
              <div>
                <textarea
                  {...register('currentAddress2')}
                  placeholder="Address Line 2"
                  rows={2}
                  className={`w-full border ${errors.currentAddress2 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <select
                  {...register('residenceType')}
                  className={`w-full border ${errors.residenceType ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Rented">Rented</option>
                  <option value="Owned">Owned</option>
                </select>
                {errors.residenceType && <p className="text-red-500 text-sm mt-1">{errors.residenceType.message}</p>}
              </div>
              <div>
                <input
                  {...register('pincode')}
                  placeholder="Pincode"
                  className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
              </div>
              <div>
                <input
                  {...register('state')}
                  placeholder="State"
                  className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <input
                  {...register('city')}
                  placeholder="City"
                  className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('permanentSameAsCurrent')}
                  className="rounded text-emerald-500 focus:ring-emerald-500 h-5 w-5"
                />
                <span className="ml-2 text-gray-700">Permanent Address same as current address</span>
              </label>
            </div>
          </section>

          {/* Employment Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              EMPLOYMENT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <select
                  {...register('employmentType')}
                  className={`w-full border ${errors.employmentType ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Salaried">Salaried</option>
                  <option value="Self Employed">Self Employed</option>
                </select>
                {errors.employmentType && <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>}
              </div>
              {watch('employmentType') === 'Salaried' && (
                <>
                  <div>
                    <input
                      {...register('companyName')}
                      placeholder="Company Name"
                      className={`w-full border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register('designation')}
                      placeholder="Designation"
                      className={`w-full border ${errors.designation ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                    />
                    {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>}
                  </div>
                </>
              )}
            </div>
            
            {watch('employmentType') === 'Salaried' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <textarea
                    {...register('companyAddress1')}
                    placeholder="Company Address Line 1"
                    rows={2}
                    className={`w-full border ${errors.companyAddress1 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.companyAddress1 && <p className="text-red-500 text-sm mt-1">{errors.companyAddress1.message}</p>}
                </div>
                <div>
                  <textarea
                    {...register('companyAddress2')}
                    placeholder="Company Address Line 2"
                    rows={2}
                    className={`w-full border ${errors.companyAddress2 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                </div>
              </div>
            )}
            
            {watch('employmentType') === 'Salaried' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <input
                    {...register('companyCity')}
                    placeholder="Company City"
                    className={`w-full border ${errors.companyCity ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.companyCity && <p className="text-red-500 text-sm mt-1">{errors.companyCity.message}</p>}
                </div>
                <div>
                  <input
                    {...register('companyState')}
                    placeholder="Company State"
                    className={`w-full border ${errors.companyState ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.companyState && <p className="text-red-500 text-sm mt-1">{errors.companyState.message}</p>}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <input
                  {...numericRegister('monthlySalary')}
                  type="number"
                  placeholder="Monthly Salary"
                  className={`w-full border ${errors.monthlySalary ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.monthlySalary && <p className="text-red-500 text-sm mt-1">{errors.monthlySalary.message}</p>}
              </div>
              <div>
                <input
                  {...numericRegister('experienceInMonths')}
                  type="number"
                  placeholder="Experience (Months)"
                  className={`w-full border ${errors.experienceInMonths ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.experienceInMonths && <p className="text-red-500 text-sm mt-1">{errors.experienceInMonths.message}</p>}
              </div>
              <div>
                <select
                  {...register('currentJobStability')}
                  className={`w-full border ${errors.currentJobStability ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Less than 6 months">Less than 6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="More than 2 years">More than 2 years</option>
                </select>
                {errors.currentJobStability && <p className="text-red-500 text-sm mt-1">{errors.currentJobStability.message}</p>}
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              PROPERTY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <select
                  {...register('propertyType')}
                  className={`w-full border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType.message}</p>}
              </div>
              <div>
                <input
                  {...numericRegister('agreementValue')}
                  type="number"
                  placeholder="Agreement Value"
                  className={`w-full border ${errors.agreementValue ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.agreementValue && <p className="text-red-500 text-sm mt-1">{errors.agreementValue.message}</p>}
              </div>
              <div>
                <input
                  {...numericRegister('loanAmountRequired')}
                  type="number"
                  placeholder="Loan Amount Required"
                  className={`w-full border ${errors.loanAmountRequired ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.loanAmountRequired && <p className="text-red-500 text-sm mt-1">{errors.loanAmountRequired.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <div>
                <textarea
                  {...register('propertyAddress1')}
                  placeholder="Property Address Line 1"
                  rows={2}
                  className={`w-full border ${errors.propertyAddress1 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.propertyAddress1 && <p className="text-red-500 text-sm mt-1">{errors.propertyAddress1.message}</p>}
              </div>
              <div className="mt-4">
                <textarea
                  {...register('propertyAddress2')}
                  placeholder="Property Address Line 2"
                  rows={2}
                  className={`w-full border ${errors.propertyAddress2 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <input
                    {...register('propertyCity')}
                    placeholder="Property City"
                    className={`w-full border ${errors.propertyCity ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.propertyCity && <p className="text-red-500 text-sm mt-1">{errors.propertyCity.message}</p>}
                </div>
                <div>
                  <input
                    {...register('propertyState')}
                    placeholder="Property State"
                    className={`w-full border ${errors.propertyState ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.propertyState && <p className="text-red-500 text-sm mt-1">{errors.propertyState.message}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Existing Obligations */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              EXISTING OBLIGATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  {...numericRegister('existingLoansCount')}
                  type="number"
                  placeholder="No. of Current Loans"
                  className={`w-full border ${errors.existingLoansCount ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.existingLoansCount && <p className="text-red-500 text-sm mt-1">{errors.existingLoansCount.message}</p>}
              </div>
              <div>
                <select
                  {...register('existingLoanType')}
                  className={`w-full border ${errors.existingLoanType ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="None">None</option>
                  <option value="Personal">Personal</option>
                  <option value="Car">Car</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
                {errors.existingLoanType && <p className="text-red-500 text-sm mt-1">{errors.existingLoanType.message}</p>}
              </div>
            </div>
          </section>

          {/* References */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              REFERENCE 1
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  {...register('reference1.name')}
                  placeholder="Name"
                  className={`w-full border ${errors.reference1?.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference1?.name && <p className="text-red-500 text-sm mt-1">{errors.reference1.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('reference1.mobile')}
                  placeholder="Mobile No."
                  className={`w-full border ${errors.reference1?.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference1?.mobile && <p className="text-red-500 text-sm mt-1">{errors.reference1.mobile.message}</p>}
              </div>
              <div>
                <input
                  {...register('reference1.address')}
                  placeholder="Address"
                  className={`w-full border ${errors.reference1?.address ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference1?.address && <p className="text-red-500 text-sm mt-1">{errors.reference1.address.message}</p>}
              </div>
            </div>
          </section>

          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              REFERENCE 2
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  {...register('reference2.name')}
                  placeholder="Name"
                  className={`w-full border ${errors.reference2?.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference2?.name && <p className="text-red-500 text-sm mt-1">{errors.reference2.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('reference2.mobile')}
                  placeholder="Mobile No."
                  className={`w-full border ${errors.reference2?.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference2?.mobile && <p className="text-red-500 text-sm mt-1">{errors.reference2.mobile.message}</p>}
              </div>
              <div>
                <input
                  {...register('reference2.address')}
                  placeholder="Address"
                  className={`w-full border ${errors.reference2?.address ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference2?.address && <p className="text-red-500 text-sm mt-1">{errors.reference2.address.message}</p>}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}