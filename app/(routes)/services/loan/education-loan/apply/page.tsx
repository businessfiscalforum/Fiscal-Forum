"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useEffect } from "react";

// Schema for Education Loan Application
const educationLoanSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid format"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried", "Others"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),

  // Current Address
  currentHomeAddress1: z.string().min(1, "Address is required"),
  currentHomeAddress2: z.string().optional(),
  currentResidenceType: z.enum(["Owned", "Rented"]),
  currentPincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  currentState: z.string().min(1, "State is required"),
  currentCity: z.string().min(1, "City is required"),
  permanentAddressSame: z.boolean().default(false),
  permanentHomeAddress1: z.string().min(1, "Address is required"),
  permanentHomeAddress2: z.string().optional(),
  permanentResidenceType: z.enum(["Owned", "Rented"]),
  permanentPincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  permanentState: z.string().min(1, "State is required"),
  permanentCity: z.string().min(1, "City is required"),

  // Employment Details
  employmentType: z.enum(["Company", "Self-Employed"]),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  netMonthlySalary: z
    .preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().optional()
    )
    .optional(),

  // Course Details
  courseType: z.enum(["Undergraduate", "Postgraduate", "PhD", "Diploma", "Certificate", "Other"]).optional(),
  courseName: z.string().min(1, "Course name is required"),
  universityName: z.string().min(1, "University/Institute name is required"),
  countryName: z.string().min(1, "Country name is required"),

  // Loan Amount
  loanAmountRequired: z.number().min(1, "Loan amount is required"),

  // Existing Obligations
  noOfCurrentLoans: z.number().min(0).max(10),
  existingLoanType: z
    .enum(["None", "Personal", "Car", "Education", "Other"])
    .optional(),

  // References
  reference1: z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    address: z.string().min(1, "Address is required"),
  }),
  reference2: z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    address: z.string().min(1, "Address is required"),
  }),
});

export default function EducationLoanApplication() {
  const [successMessage, setSuccessMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolver = zodResolver(educationLoanSchema) as any;
  
  type EducationLoanForm= z.infer<typeof educationLoanSchema>;

  const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
    } = useForm<EducationLoanForm>({
      resolver,
      defaultValues: {
        permanentAddressSame: false,
        employmentType: "Company",
        maritalStatus: "Unmarried",
        gender: "Male",
        currentResidenceType: "Rented",
        permanentResidenceType: "Rented",
        noOfCurrentLoans: 0,
        existingLoanType: "None",
        reference1: { name: "", mobile: "", address: "" },
        reference2: { name: "", mobile: "", address: "" },
      },
    });

  const onSubmit = async (data: EducationLoanForm) => {
    try {
      const res = await fetch("/api/education-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Submission failed: ${error.error}`);
        return;
      }

      const result = await res.json();
      console.log("Application Submitted:", result);
      setSuccessMessage("Application submitted successfully!");
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const numericRegister = (name: keyof EducationLoanForm) => ({
    ...register(name, {
      setValueAs: (v: string) => (v === "" ? undefined : Number(v)),
    }),
  });

    const permanentAddressSame = watch("permanentAddressSame");

  const currentAddressFields = watch([
    "currentHomeAddress1",
    "currentHomeAddress2",
    "currentResidenceType",
    "currentPincode",
    "currentState",
    "currentCity",
  ]);

  useEffect(() => {
    if (permanentAddressSame) {
      setValue("permanentHomeAddress1", currentAddressFields[0]);
      setValue("permanentHomeAddress2", currentAddressFields[1]);
      setValue("permanentResidenceType", currentAddressFields[2]);
      setValue("permanentPincode", currentAddressFields[3]);
      setValue("permanentState", currentAddressFields[4]);
      setValue("permanentCity", currentAddressFields[5]);
    }
  }, [permanentAddressSame, ...currentAddressFields]);


return (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-30 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800">Education Loan Application</h1>
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
              <label className="block text-gray-700 text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Middle Name
              </label>
              <input
                {...register("middleName")}
                placeholder="Middle Name"
                className={`w-full border ${errors.middleName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Last Name *
              </label>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Father&apos;s Name *
              </label>
              <input
                {...register("fatherName")}
                placeholder="Father&apos;s Name"
                className={`w-full border ${errors.fatherName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fatherName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email ID *
              </label>
              <input
                {...register("emailId")}
                placeholder="Email ID"
                className={`w-full border ${errors.emailId ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.emailId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className={`w-full border ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Marital Status *
              </label>
              <select
                {...register("maritalStatus")}
                className={`w-full border ${errors.maritalStatus ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              >
                <option value="">Select</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Others">Others</option>
              </select>
              {errors.maritalStatus && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maritalStatus.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Gender *
              </label>
              <select
                {...register("gender")}
                className={`w-full border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Mobile Number *
              </label>
              <input
                {...register("mobileNo")}
                placeholder="Mobile Number"
                className={`w-full border ${errors.mobileNo ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNo.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
             <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                PAN Number *
              </label>
              <input
                {...register("panNumber")}
                placeholder="PAN Number"
                className={`w-full border ${errors.panNumber ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.panNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.panNumber.message}
                </p>
              )}
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("currentHomeAddress1")}
                  placeholder="Address Line 1"
                  rows={2}
                  className={`w-full border ${errors.currentHomeAddress1 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.currentHomeAddress1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentHomeAddress1.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address Line 2
                </label>
                <textarea
                  {...register("currentHomeAddress2")}
                  placeholder="Address Line 2"
                  rows={2}
                  className={`w-full border ${errors.currentHomeAddress2 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Residence Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("currentResidenceType")}
                  className={`w-full border ${errors.currentResidenceType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
                {errors.currentResidenceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentResidenceType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("currentPincode")}
                  placeholder="Pincode"
                  className={`w-full border ${errors.currentPincode ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.currentPincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPincode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("currentState")}
                  placeholder="State"
                  className={`w-full border ${errors.currentState ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.currentState && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentState.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("currentCity")}
                  placeholder="City"
                  className={`w-full border ${errors.currentCity ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.currentCity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentCity.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("permanentAddressSame")}
                  className="rounded text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-900">
                  Permanent Address same as current address
                </span>
              </label>
            </div>
          </section>

          {/* Permanent Address */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              PERMANENT ADDRESS DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("permanentHomeAddress1")}
                  placeholder="Address Line 1"
                  rows={2}
                  readOnly={permanentAddressSame}
                  className={`w-full border ${errors.permanentHomeAddress1 ? "border-red-500" : "border-gray-300"} ${permanentAddressSame?"bg-gray-100 cursor-not-allowed":""} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.permanentHomeAddress1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.permanentHomeAddress1.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address Line 2
                </label>
                <textarea
                  {...register("permanentHomeAddress2")}
                  placeholder="Address Line 2"
                  rows={2}
                  readOnly={permanentAddressSame}
                  className={`w-full border ${errors.permanentHomeAddress2 ? "border-red-500" : "border-gray-300"} ${permanentAddressSame?"bg-gray-100 cursor-not-allowed":""} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Residence Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("permanentResidenceType")}
                  disabled={permanentAddressSame}
                  className={`w-full border ${errors.permanentResidenceType ? "border-red-500" : "border-gray-300"} ${permanentAddressSame?"bg-gray-100 cursor-not-allowed":""} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
                {errors.permanentResidenceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.permanentResidenceType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("permanentPincode")}
                  placeholder="Pincode"
                  readOnly={permanentAddressSame}
                  className={`w-full border ${errors.permanentPincode ? "border-red-500" : "border-gray-300"} ${permanentAddressSame?"bg-gray-100 cursor-not-allowed":""} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.permanentPincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.permanentPincode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("permanentState")}
                  placeholder="State"
                  readOnly={permanentAddressSame}
                  className={`w-full border ${errors.permanentState ? "border-red-500" : "border-gray-300"} ${permanentAddressSame?"bg-gray-100 cursor-not-allowed":""} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.permanentState && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.permanentState.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("permanentCity")}
                  placeholder="City"
                  readOnly={permanentAddressSame}
                  className={`w-full border ${errors.permanentCity ? "border-red-500" : "border-gray-300"} ${permanentAddressSame?"bg-gray-100 cursor-not-allowed":""} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.permanentCity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.permanentCity.message}
                  </p>
                )}
              </div>
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
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Employment Type *
              </label>
              <select
                {...register("employmentType")}
                className={`w-full border ${errors.employmentType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              >
                <option value="">Select</option>
                <option value="Company">Company</option>
                <option value="Self-Employed">Self-Employed</option>
              </select>
              {errors.employmentType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.employmentType.message}
                </p>
              )}
            </div>
            {watch("employmentType") === "Company" && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Company Name *
                  </label>
                  <input
                    {...register("companyName")}
                    placeholder="Company Name"
                    className={`w-full border ${errors.companyName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Designation *
                  </label>
                  <input
                    {...register("designation")}
                    placeholder="Designation"
                    className={`w-full border ${errors.designation ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                  />
                  {errors.designation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.designation.message}
                    </p>
                  )}
                </div>
              </>
            )}
            {watch("employmentType") === "Self-Employed" && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Net Monthly Salary *
                </label>
                <input
                  {...numericRegister("netMonthlySalary")}
                  type="number"
                  placeholder="Net Monthly Salary"
                  className={`w-full border ${errors.netMonthlySalary ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.netMonthlySalary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.netMonthlySalary.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Course Details */}
        <section className="border-b border-emerald-100 pb-6">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
            <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
            COURSE DETAILS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Course Type *
              </label>
              <select
                {...register("courseType")}
                className={`w-full border ${errors.courseType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              >
                <option value="">SELECT COURSE TYPE</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
                <option value="Other">Other</option>
              </select>
              {errors.courseType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseType.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Course Name *
              </label>
              <input
                {...register("courseName")}
                placeholder="Course Name"
                className={`w-full border ${errors.courseName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.courseName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.courseName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                University/Institute Name *
              </label>
              <input
                {...register("universityName")}
                placeholder="University/Institute Name"
                className={`w-full border ${errors.universityName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.universityName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.universityName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Country Name *
              </label>
              <input
                {...register("countryName")}
                placeholder="Country Name"
                className={`w-full border ${errors.countryName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.countryName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.countryName.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Loan Amount Required */}
        <section className="border-b border-emerald-100 pb-6">
          <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
            <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
            LOAN AMOUNT REQUIRED
          </h2>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Loan Amount Required *
            </label>
            <input
              {...numericRegister("loanAmountRequired")}
              type="number"
              placeholder="Loan Amount Required"
              className={`w-full border ${errors.loanAmountRequired ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
            />
            {errors.loanAmountRequired && (
              <p className="text-red-500 text-sm mt-1">
                {errors.loanAmountRequired.message}
              </p>
            )}
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
              <label className="block text-gray-700 text-sm font-medium mb-1">
                No. of Current Loans *
              </label>
              <input
                {...numericRegister("noOfCurrentLoans")}
                type="number"
                placeholder="No. of Current Loans"
                className={`w-full border ${errors.noOfCurrentLoans ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.noOfCurrentLoans && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.noOfCurrentLoans.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Existing Loan Type *
              </label>
              <select
                {...register("existingLoanType")}
                className={`w-full border ${errors.existingLoanType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              >
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Personal">Personal</option>
                <option value="Car">Car</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              {errors.existingLoanType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.existingLoanType.message}
                </p>
              )}
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
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name *
              </label>
              <input
                {...register("reference1.name")}
                placeholder="Name"
                className={`w-full border ${errors.reference1?.name ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.reference1?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reference1.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Mobile No. *
              </label>
              <input
                {...register("reference1.mobile")}
                placeholder="Mobile No."
                className={`w-full border ${errors.reference1?.mobile ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.reference1?.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reference1.mobile.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Address *
              </label>
              <input
                {...register("reference1.address")}
                placeholder="Address"
                className={`w-full border ${errors.reference1?.address ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.reference1?.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reference1.address.message}
                </p>
              )}
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
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Name *
              </label>
              <input
                {...register("reference2.name")}
                placeholder="Name"
                className={`w-full border ${errors.reference2?.name ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.reference2?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reference2.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Mobile No. *
              </label>
              <input
                {...register("reference2.mobile")}
                placeholder="Mobile No."
                className={`w-full border ${errors.reference2?.mobile ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.reference2?.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reference2.mobile.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Address *
              </label>
              <input
                {...register("reference2.address")}
                placeholder="Address"
                className={`w-full border ${errors.reference2?.address ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              />
              {errors.reference2?.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reference2.address.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center pt-6">
          {successMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}
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
