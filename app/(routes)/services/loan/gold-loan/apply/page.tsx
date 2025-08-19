"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Schema for Gold Loan Application
const goldLoanSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father’s name is required"),
  panNumber: z
    .string()
    .min(10, "PAN number must be 10 characters")
    .max(10)
    .optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),

  // Current Address
  homeAddress1: z.string().min(1, "Address is required"),
  homeAddress2: z.string().optional(),
  residenceType: z.enum(["Owned", "Rented"]),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  permanentAddressSame: z.boolean().default(false),

  // Gold Loan Details
  goldWeight: z
    .preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().min(1, "Gold weight must be greater than 0").optional()
    )
    .optional(),
  goldPurity: z.enum(["22K", "24K", "18K", "14K", "Other"]).optional(),

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

// Type assertion
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolver = zodResolver(goldLoanSchema) as any;

type GoldLoanForm = z.infer<typeof goldLoanSchema>;

export default function GoldLoanApplication() {
  const router = useRouter();
  const [isSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GoldLoanForm>({
    resolver,
    defaultValues: {
      permanentAddressSame: false,
      maritalStatus: "Unmarried",
      gender: "Male",
      residenceType: "Rented",
      noOfCurrentLoans: 0,
      existingLoanType: "None",
      reference1: { name: "", mobile: "", address: "" },
      reference2: { name: "", mobile: "", address: "" },
    },
  });

  const onSubmit = async (data: GoldLoanForm) => {
    try {
      const res = await fetch("/api/gold-loan", {
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
      console.log("✅ Application Submitted:", result);
      alert("✅ Application submitted successfully!");
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const numericRegister = (name: keyof GoldLoanForm) => ({
    ...register(name, {
      setValueAs: (v: string) => (v === "" ? undefined : Number(v)),
    }),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-30 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">
            Gold Loan Application
          </h1>
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
                <input
                  {...register("middleName")}
                  placeholder="Middle Name"
                  className={`w-full border ${errors.middleName ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
              <div>
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
                <input
                  {...register("fatherName")}
                  placeholder="Father's Name"
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
              <div>
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
                <select
                  {...register("maritalStatus")}
                  className={`w-full border ${errors.maritalStatus ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                <select
                  {...register("gender")}
                  className={`w-full border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                  {...register("homeAddress1")}
                  placeholder="Address Line 1"
                  rows={2}
                  className={`w-full border ${errors.homeAddress1 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.homeAddress1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.homeAddress1.message}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  {...register("homeAddress2")}
                  placeholder="Address Line 2"
                  rows={2}
                  className={`w-full border ${errors.homeAddress2 ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div>
                <select
                  {...register("residenceType")}
                  className={`w-full border ${errors.residenceType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                <input
                  {...register("pincode")}
                  placeholder="Pincode"
                  className={`w-full border ${errors.pincode ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("state")}
                  placeholder="State"
                  className={`w-full border ${errors.state ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("city")}
                  placeholder="City"
                  className={`w-full border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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
                  className="rounded text-emerald-500 focus:ring-emerald-500 h-5 w-5"
                />
                <span className="ml-2 text-gray-700">
                  Permanent Address same as current address
                </span>
              </label>
            </div>
          </section>

          {/* Gold Loan Details */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              GOLD LOAN DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  {...numericRegister("goldWeight")}
                  type="number"
                  placeholder="Weight in grams"
                  className={`w-full border ${errors.goldWeight ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                />
                {errors.goldWeight && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.goldWeight.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  {...register("goldPurity")}
                  className={`w-full border ${errors.goldPurity ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
                >
                  <option value="">SELECT</option>
                  <option value="22K">22K</option>
                  <option value="24K">24K</option>
                  <option value="18K">18K</option>
                  <option value="14K">14K</option>
                  <option value="Other">Other</option>
                </select>
                {errors.goldPurity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.goldPurity.message}
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
              <input
                {...numericRegister("loanAmountRequired")}
                type="number"
                placeholder="Loan Amount"
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
                <select
                  {...register("existingLoanType")}
                  className={`w-full border ${errors.existingLoanType ? "border-red-500" : "border-gray-300"} rounded-md px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
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

          {/* References */}
          <section className="border-b border-emerald-100 pb-6">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
              REFERENCE 1
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
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
