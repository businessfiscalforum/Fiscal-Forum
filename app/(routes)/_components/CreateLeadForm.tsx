"use client";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserDetailContext } from "../../../context/UserDetailContext";

// ✅ Schema
const applicationSchema = z.object({
  type: z.string(),
  subType: z.string(),
  name: z.string().min(1, "Name is required"),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),
});

// ✅ Type for form
type ApplicationForm = z.infer<typeof applicationSchema>;

// ✅ Props
interface CreateLeadFormProps {
  type: string;
}

export default function CreateLeadForm({ type }: CreateLeadFormProps) {
  const [successMessage, setSuccessMessage] = useState("");
  const { userDetail } = useContext(UserDetailContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { type },
  });

  const onSubmit = async (data: ApplicationForm) => {
    if (!userDetail?.id) {
      alert("User not found. Please log in.");
      return;
    }

    // ✅ Add userId
    const submissionData = { ...data, type, userId: userDetail.id };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-lead`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(`Submission failed: ${error.error}`);
        return;
      }

      const result = await res.json();
      console.log("Application Submitted:", result);
      setSuccessMessage("Application submitted successfully! Our representative will contact you shortly.");
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-30 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">Create Lead</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-emerald-200"
        >
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              {...register("type")}
              placeholder={type}
              className={`w-full border ${
                errors.type ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition cursor-not-allowed`}
            />
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.type.message}
              </p>
            )}
          </div>

          {/* Subtype */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Sub Type <span className="text-red-500">*</span>
            </label>
            <input
              {...register("subType")}
              placeholder="Sub Type"
              className={`w-full border ${
                errors.subType ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
            />
            {errors.subType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subType.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name")}
              placeholder="Full Name"
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("mobileNo")}
              placeholder="Mobile Number"
              className={`w-full border ${
                errors.mobileNo ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNo.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email ID <span className="text-red-500">*</span>
            </label>
            <input
              {...register("emailId")}
              placeholder="Email Address"
              className={`w-full border ${
                errors.emailId ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
            />
            {errors.emailId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
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
