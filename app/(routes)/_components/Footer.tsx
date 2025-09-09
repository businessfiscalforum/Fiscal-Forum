// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaUniversity,
  FaCreditCard,
  FaChartLine,
  FaPiggyBank,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Investment Plans", href: "/investments" },
    { name: "Insurance Products", href: "/insurance" },
    { name: "Loan Services", href: "/loans" },
    { name: "Career Opportunities", href: "/careers" },
  ];

  const financialServices = [
    { name: "Personal Banking", href: "/personal-banking", icon: FaPiggyBank },
    { name: "Business Banking", href: "/business-banking", icon: FaUniversity },
    { name: "Credit Cards", href: "/credit-cards", icon: FaCreditCard },
    {
      name: "Investment Advisory",
      href: "/investment-advisory",
      icon: FaChartLine,
    },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/support" },
    { name: "Live Chat", href: "/chat" },
    { name: "Document Upload", href: "/upload" },
    { name: "Branch Locator", href: "/branches" },
    { name: "ATM Locator", href: "/atm" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Compliance", href: "/compliance" },
    { name: "Regulatory Disclosures", href: "/disclosures" },
    { name: "Grievance Redressal", href: "/grievance" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "#",
      color: "hover:bg-blue-600",
    },
    { name: "Twitter", icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "#",
      color: "hover:bg-blue-700",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
      color: "hover:bg-pink-600",
    },
    { name: "YouTube", icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Fiscal Forum
                  </h2>
                  <p className="text-gray-300 text-base leading-relaxed max-w-2xl mx-auto mb-6">
                    Your trusted partner in financial growth. We provide
                    comprehensive financial solutions with transparency,
                    innovation, and customer-first approach.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center text-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Call Us
                      </p>
                      <p className="font-semibold text-white">
                        +91 8696060387
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center text-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Email Us
                      </p>
                      <p className="font-semibold text-white text-sm">
                        support@fiscalforum.in
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center text-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaClock className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Business Hours
                      </p>
                      <p className="font-semibold text-white">
                        24/7 Online Support
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4 text-white">
                    Follow Us
                  </h4>
                  <div className="flex justify-center gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} border border-white/20 hover:border-white/40`}
                      >
                        <social.icon className="text-lg" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Fiscal Forum. All rights reserved.
              </p>
              <div className="flex gap-6">
                <button 
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;