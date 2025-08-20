"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Send,
} from "lucide-react";

const ScheduleCallPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: "",
    preferredContactMethod: "call",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Call Scheduled!
          </h2>
          <p className="text-gray-600 mb-6">
            We’ve received your request. Our advisor will call you on{" "}
            <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
            .
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium"
          >
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Schedule a Free Consultation
          </h1>
          <p className="text-gray-600 mt-2">
            Speak with our financial advisor
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Visual */}
            <div className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 p-6 md:p-8 text-white hidden md:flex flex-col justify-center">
              <Calendar className="w-14 h-14 mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-3">Let’s Talk</h2>
              <p className="text-gray-100 leading-relaxed text-sm">
                Get personalized loan advice, eligibility checks, and instant
                quotes in a quick 15-minute call.
              </p>
              <div className="mt-6 space-y-3 text-sm text-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  No cost consultation
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  Expert financial guidance
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  Flexible timing
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-28 px-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 bg-white"
                    >
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+49">+49 (Germany)</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="flex-1 px-2 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 bg-white"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                    placeholder="Tell us about your loan needs..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Scheduling..." : "Schedule My Call"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCallPage;
