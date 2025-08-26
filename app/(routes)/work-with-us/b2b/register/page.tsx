"use client";

import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    accountNumber: "",
    ifsc: "",
    pan: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Enter a valid name (letters only)";
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }
    if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Enter valid account number (9-18 digits)";
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc)) {
      newErrors.ifsc = "Enter valid IFSC code";
    }
    if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "Enter valid PAN number (e.g., ABCDE1234F)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/b2b-partner`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        // console.log("Form submitted successfully:", data);
        alert("Form submitted successfully!");
      } catch (err) {
        console.error("Form submission failed:", err);
        alert("Failed to submit form. Please try again.");
      }
    }
  };


  return (
    <div className="pt-40">
      <div className="flex items-center">
        {/* Left Section */}
        <div className="w-[65%] flex justify-center items-center">
          <p className="text-5xl font-bold text-teal-500 w-[50%]">Register as B2B Partner</p>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl p-6 w-[30%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
            <p className="text-lg font-semibold mb-2">
              Become a B2B Partner
            </p>

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm">{errors.accountNumber}</p>
              )}
            </div>

            {/* IFSC Code */}
            <div>
              <input
                type="text"
                name="ifsc"
                placeholder="IFSC Code"
                value={formData.ifsc}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
              {errors.ifsc && (
                <p className="text-red-500 text-sm">{errors.ifsc}</p>
              )}
            </div>

            {/* PAN Number */}
            <div>
              <input
                type="text"
                name="pan"
                placeholder="PAN Number"
                value={formData.pan}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 uppercase"
              />
              {errors.pan && (
                <p className="text-red-500 text-sm">{errors.pan}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;