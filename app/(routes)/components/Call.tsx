// app/schedule-call/page.tsx
'use client';

import { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  Send 
} from 'lucide-react';

const ScheduleCallPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    email: '',
    date: '',
    time: '',
    message: '',
    preferredContactMethod: 'call',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/schedule-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Call Scheduled!</h2>
          <p className="text-gray-600 mb-6">
            We’ve received your request. Our advisor will call you on{' '}
            <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Schedule a Free Consultation</h1>
          <p className="text-gray-600 mt-2">Speak with our financial advisor in 5 minutes</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Visual */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white hidden md:flex flex-col justify-center">
              <Calendar className="w-16 h-16 mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Let’s Talk</h2>
              <p className="text-blue-100 leading-relaxed">
                Get personalized loan advice, eligibility checks, and instant quotes in a quick 15-minute call.
              </p>
              <div className="mt-8 space-y-4 text-sm text-blue-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  No cost consultation
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  Expert financial guidance
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  Flexible timing
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'call', label: 'Call', icon: Phone },
                      { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                      { value: 'email', label: 'Email', icon: Mail },
                    ].map(({ value, label, icon: Icon }) => (
                      <label key={value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContactMethod"
                          value={value}
                          checked={formData.preferredContactMethod === value}
                          onChange={handleChange}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                          <Icon className="w-3 h-3" /> {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">Additional Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about your loan needs..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Scheduling...' : 'Schedule My Call'}
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