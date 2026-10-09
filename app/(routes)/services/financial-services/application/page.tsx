"use client"
import { useState } from "react";

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pan: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dematApply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Application submitted successfully!", type: "success" });
        setFormData({ fullName: "", email: "", phone: "", pan: "", city: "" });
      } else {
        setMessage({ text: data.error || "Submission failed", type: "error" });
      }
    } catch {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-30 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-green-800 text-center">Demat Account Application</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="text"
        name="pan"
        placeholder="PAN Number"
        value={formData.pan}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg uppercase"
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>

      {message && (
        <p
          className={`text-center font-medium ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
