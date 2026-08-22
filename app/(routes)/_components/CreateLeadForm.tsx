"use client";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserDetailContext } from "../../../context/UserDetailContext";

// ✅ Schema with exact dropdown values
const applicationSchema = z.object({
  type: z.enum([
    "Stock Investment",
    "Mutual Funds",
    "Loan",
    "Insurance",
    "Credit Cards",
    "Saving Account",
    "Govt Bonds & Funds",
  ]),
  subType: z.string().min(1, "Sub Type is required"),
  name: z.string().min(1, "Name is required"),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),
});

export type PartnerRequest = {
  id: string;
  type: string | null;
  subType: string | null;
  name: string | null;
  mobile: string | null;
  email: string | null;
  status: string | null;
};

type ApplicationForm = z.infer<typeof applicationSchema>;

interface CreateLeadFormProps {
  type: string; // Optional: used only if you want route-based pre-fill (not used below)
}

export default function CreateLeadForm({
  type: _typeProp,
}: CreateLeadFormProps) {
  const [successMessage, setSuccessMessage] = useState("");
  const { userDetail } = useContext(UserDetailContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    // No defaultValues — dropdown starts empty (or pre-fill if needed)
  });

  // ✅ Fetch current user's partner requests
  const fetchPartnerRequests = async () => {
    if (!userDetail?.id) {
      setPartnerRequests([]);
      setLoadingRequests(false);
      return;
    }

    try {
      setLoadingRequests(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partner-requests?userId=${encodeURIComponent(userDetail.id)}`
      );

      if (!res.ok) throw new Error("Failed to fetch your requests");

      const data = (await res.json()) as PartnerRequest[];
      setPartnerRequests(data);
    } catch (err) {
      console.error("Error fetching partner requests:", err);
      alert("Failed to load your lead history.");
      setPartnerRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchPartnerRequests();
  }, [userDetail?.id]);

   
  const onSubmit = async (data: ApplicationForm) => {
    if (!userDetail?.id) {
      alert("User not found. Please log in.");
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);
    setSuccessMessage("");

    // ✅ Use data.type from form (dropdown selection)
    const submissionData = {
      type: data.type,
      subType: data.subType,
      name: data.name,
      mobileNo: data.mobileNo, // ✅ Match schema field name
      emailId: data.emailId, // ✅ Match schema field name
      userId: userDetail.id,
    };

    
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
        const error = await res.json().catch(() => ({}));
        const message = error.error || "Submission failed. Please try again.";
        alert(`Submission failed: ${message}`);
        return;
      }

      setSuccessMessage(
        "Application submitted successfully! Our representative will contact you shortly."
      );
      setIsSubmitted(true);
      reset(); // Reset entire form
      fetchPartnerRequests(); // Refresh table
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 pt-8 px-4 sm:px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800">Create Lead</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-emerald-200"
          >
            {/* Type - Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register("type")}
                className={`w-full border ${
                  errors.type ? "border-red-500" : "border-gray-300"
                } rounded-md px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition`}
              >
                <option value="">Select a type</option>
                <option value="Stock Investment">Stock Investment</option>
                <option value="Mutual Funds">Mutual Funds</option>
                <option value="Loan">Loan</option>
                <option value="Insurance">Insurance</option>
                <option value="Credit Cards">Credit Cards</option>
                <option value="Saving Account">Saving Account</option>
                <option value="Govt Bonds & Funds">Govt Bonds & Funds</option>
              </select>
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

            {/* Submit Button */}
            <div className="text-center pt-4">
              {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                  {successMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`font-bold py-3 px-8 rounded-lg shadow-md transition transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSubmitted
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 focus:ring-emerald-500"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : isSubmitted ? (
                  "Lead Created"
                ) : (
                  "Create Lead"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Partner Requests Table */}
        <div>
          <h2 className="text-xl font-semibold text-emerald-800 mb-4">
            Your Partner Requests
          </h2>
          <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
            {loadingRequests ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : partnerRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="bg-emerald-50 text-left text-gray-700">
                      <th className="p-3 text-sm font-semibold">Type</th>
                      <th className="p-3 text-sm font-semibold">Subtype</th>
                      <th className="p-3 text-sm font-semibold">Name</th>
                      <th className="p-3 text-sm font-semibold">Mobile</th>
                      <th className="p-3 text-sm font-semibold">Email</th>
                      <th className="p-3 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {partnerRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-emerald-50">
                        <td className="p-3 text-sm">{req.type || "—"}</td>
                        <td className="p-3 text-sm">{req.subType || "—"}</td>
                        <td className="p-3 text-sm">{req.name || "—"}</td>
                        <td className="p-3 text-sm">{req.mobile || "—"}</td>
                        <td className="p-3 text-sm">{req.email || "—"}</td>
                        <td className="p-3 text-sm">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              req.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : req.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {req.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                You haven’t submitted any partner requests yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
