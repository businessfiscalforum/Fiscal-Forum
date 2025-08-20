"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Schema defined below
const applicationSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father’s name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried", "Others"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),
  panNumber: z
    .string()
    .min(10, "PAN number must be 10 characters")
    .max(10)
    .optional(),
  homeAddress1: z.string().min(1, "Address is required"),
  homeAddress2: z.string().optional(),
  residenceType: z.enum(["Owned", "Rented"]),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  permanentAddressSame: z.boolean().default(false),
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
  // Property Details
  propertyType: z.enum(["Residential", "Commercial"]),
  agreementValue: z.number().min(1, "Agreement value is required"),
  loanAmountRequired: z.number().min(1, "Loan amount is required"),
  propertyAddressLine1: z
    .string()
    .min(1, "Property address line 1 is required"),
  propertyAddressLine2: z.string().optional(),
  propertyCity: z.string().min(1, "City is required"),
  // Existing Obligations
  noOfCurrentLoans: z.number().min(0).max(10),
  existingLoanType: z
    .enum(["None", "Personal", "Car", "Education", "Other"])
    .optional(),
  // Additional Details
  builderName: z.string().min(1, "Builder name is required"),
  residenceSince: z.string().min(1, "Residence since is required"),
  specialName: z.string().optional(),
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

// Type assertion to avoid resolver type conflicts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolver = zodResolver(applicationSchema) as any;

type ApplicationForm = z.infer<typeof applicationSchema>;

export default function Home() {
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver,
    defaultValues: {
      permanentAddressSame: false,
      employmentType: "Company",
      maritalStatus: "Unmarried",
      gender: "Male",
      residenceType: "Rented",
      propertyType: "Residential",
      noOfCurrentLoans: 0,
      existingLoanType: "None",
      residenceSince: "",
      builderName: "",
      specialName: "",
      reference1: { name: "", mobile: "", address: "" },
      reference2: { name: "", mobile: "", address: "" },
    },
  });

  // Explicit typing for onSubmit to avoid type conflicts
  const onSubmit = async (data: ApplicationForm) => {
    try {
      const res = await fetch("/api/home-loan", {
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

  // Helper function to handle numeric inputs
  const numericRegister = (name: keyof ApplicationForm) => ({
    ...register(name, {
      setValueAs: (v: string) => (v === "" ? undefined : Number(v)),
    }),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">
            Home Loan Application
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-6 space-y-8 border border-emerald-200"
        >
          {/* Applicant Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              APPLICANT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Middle Name
                </label>
                <input
                  {...register("middleName")}
                  placeholder="Middle Name"
                  className={`w-full border ${errors.middleName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Father&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("fatherName")}
                  placeholder="Father's Name"
                  className={`w-full border ${errors.fatherName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className={`w-full border ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("maritalStatus")}
                  className={`w-full border ${errors.maritalStatus ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("gender")}
                  className={`w-full border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("mobileNo")}
                  placeholder="Mobile Number"
                  className={`w-full border ${errors.mobileNo ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.mobileNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobileNo.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("emailId")}
                  placeholder="Email ID"
                  className={`w-full border ${errors.emailId ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.emailId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailId.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    PAN Number <span className="text-red-500">*</span>
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
                  {...register("homeAddress1")}
                  placeholder="Address Line 1"
                  rows={2}
                  className={`w-full border ${errors.homeAddress1 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.homeAddress1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.homeAddress1.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address Line 2
                </label>
                <textarea
                  {...register("homeAddress2")}
                  placeholder="Address Line 2"
                  rows={2}
                  className={`w-full border ${errors.homeAddress2 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Residence Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("residenceType")}
                  className={`w-full border ${errors.residenceType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                </select>
                {errors.residenceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.residenceType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("pincode")}
                  placeholder="Pincode"
                  className={`w-full border ${errors.pincode ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("state")}
                  placeholder="State"
                  className={`w-full border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("city")}
                  placeholder="City"
                  className={`w-full border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
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

          {/* Employment Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              EMPLOYMENT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("employmentType")}
                  className={`w-full border ${errors.employmentType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
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
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Company Name
                    </label>
                    <input
                      {...register("companyName")}
                      placeholder="Company Name"
                      className={`w-full border ${errors.companyName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Designation
                    </label>
                    <input
                      {...register("designation")}
                      placeholder="Designation"
                      className={`w-full border ${errors.designation ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Net Monthly Salary
                  </label>
                  <input
                    {...numericRegister("netMonthlySalary")}
                    type="number"
                    placeholder="Net Monthly Salary"
                    className={`w-full border ${errors.netMonthlySalary ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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

          {/* Property Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              PROPERTY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("propertyType")}
                  className={`w-full border ${errors.propertyType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {errors.propertyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertyType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Agreement Value <span className="text-red-500">*</span>
                </label>
                <input
                  {...numericRegister("agreementValue")}
                  type="number"
                  placeholder="Agreement Value"
                  className={`w-full border ${errors.agreementValue ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.agreementValue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agreementValue.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Loan Amount Required <span className="text-red-500">*</span>
                </label>
                <input
                  {...numericRegister("loanAmountRequired")}
                  type="number"
                  placeholder="Loan Amount Required"
                  className={`w-full border ${errors.loanAmountRequired ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.loanAmountRequired && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.loanAmountRequired.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Property Address Line 1{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("propertyAddressLine1")}
                  placeholder="Property Address Line 1"
                  rows={2}
                  className={`w-full border ${errors.propertyAddressLine1 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.propertyAddressLine1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertyAddressLine1.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Property Address Line 2
                </label>
                <textarea
                  {...register("propertyAddressLine2")}
                  placeholder="Property Address Line 2"
                  rows={2}
                  className={`w-full border ${errors.propertyAddressLine2 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("propertyCity")}
                  placeholder="City"
                  className={`w-full border ${errors.propertyCity ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.propertyCity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertyCity.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Loan Amount */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              LOAN AMOUNT REQUIRED
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Loan Amount Required <span className="text-red-500">*</span>
              </label>
              <input
                {...numericRegister("loanAmountRequired")}
                type="number"
                placeholder="Loan Amount Required"
                className={`w-full border ${errors.loanAmountRequired ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              EXISTING OBLIGATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  No. of Current Loans
                </label>
                <input
                  {...numericRegister("noOfCurrentLoans")}
                  type="number"
                  placeholder="No. of Current Loans"
                  className={`w-full border ${errors.noOfCurrentLoans ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.noOfCurrentLoans && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.noOfCurrentLoans.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Existing Loan Type
                </label>
                <select
                  {...register("existingLoanType")}
                  className={`w-full border ${errors.existingLoanType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
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

          {/* Additional Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
              ADDITIONAL DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Builder&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("builderName")}
                  placeholder="Builder's Name"
                  className={`w-full border ${errors.builderName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.builderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.builderName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Residence Since <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("residenceSince")}
                  className={`w-full border ${errors.residenceSince ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="">Select Residence Since</option>
                  <option value="2010">2010</option>
                  <option value="2015">2015</option>
                  <option value="2020">2020</option>
                  <option value="2023">2023</option>
                </select>
                {errors.residenceSince && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.residenceSince.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Special Name
                </label>
                <input
                  {...register("specialName")}
                  placeholder="Special Name"
                  className={`w-full border ${errors.specialName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("reference1.name")}
                  placeholder="Name"
                  className={`w-full border ${errors.reference1?.name ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference1?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reference1.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("reference1.mobile")}
                  placeholder="Mobile No."
                  className={`w-full border ${errors.reference1?.mobile ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference1?.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reference1.mobile.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("reference1.address")}
                  placeholder="Address"
                  className={`w-full border ${errors.reference1?.address ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("reference2.name")}
                  placeholder="Name"
                  className={`w-full border ${errors.reference2?.name ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference2?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reference2.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("reference2.mobile")}
                  placeholder="Mobile No."
                  className={`w-full border ${errors.reference2?.mobile ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.reference2?.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reference2.mobile.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("reference2.address")}
                  placeholder="Address"
                  className={`w-full border ${errors.reference2?.address ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
