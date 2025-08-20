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
  MessageCircle,
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

  const handleWhatsAppClick = () => {
    const message = "Hello, I'd like to schedule a consultation with Fiscal Forum.";
    const whatsappUrl = `https://wa.me/918696060387?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center py-30">
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-700" />
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
            className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-6 py-2 rounded-lg font-medium"
          >
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-emerald-900">
            Schedule a Free Consultation
          </h1>
          <p className="text-emerald-700 mt-1">
            Speak with our financial advisor
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-5 h-full">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">
                About Fiscal Forum
              </h2>
              
              <div className="space-y-4 text-gray-600 text-sm">
                <p>
                  Fiscal Forum is your trusted partner in financial growth, providing comprehensive financial solutions with transparency and innovation.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-emerald-800 mb-2">Our Services</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Stock Investment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Insurance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Mutual Funds</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Credit Cards</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Saving Accounts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Loans</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Govt Bonds & FDs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-emerald-100 pt-4">
                  <h3 className="font-semibold text-emerald-800 mb-3">Contact Options</h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 px-4 rounded-lg font-medium transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </button>
                    <div className="text-center text-sm text-gray-500">
                      <p>Or schedule a call using the form</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Visual Side */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 p-6 text-white hidden md:flex flex-col justify-center">
                  <Calendar className="w-12 h-12 mb-4 opacity-90" />
                  <h2 className="text-xl font-bold mb-3">Let’s Talk</h2>
                  <p className="text-emerald-100 leading-relaxed text-sm">
                    Get personalized financial advice and instant quotes in a quick 15-minute call.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-emerald-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-200" />
                      No cost consultation
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-200" />
                      Expert guidance
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-200" />
                      Flexible timing
                    </div>
                  </div>
                </div>

                {/* Form Side */}
                <div className="p-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <User className="w-4 h-4 mr-2 text-emerald-500" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Phone className="w-4 h-4 mr-2 text-emerald-500" />
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="w-24 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
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
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                          placeholder="98765 43210"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                          <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                          <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                          Time
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"
                        placeholder="Tell us about your financial needs..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition text-sm"
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
      </div>
    </div>
  );
};

export default ScheduleCallPage;