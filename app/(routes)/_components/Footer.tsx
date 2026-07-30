// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaUniversity,
  FaCreditCard,
  FaChartLine,
  FaPiggyBank,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about-us" },
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
      name: "X",
      icon: FaXTwitter,
      href: "https://x.com/FiscalForum?t=wozZYda22CGrRjCN5ciBfA&s=08",
      color: "hover:bg-black",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/fiscal-forum/posts/?feedView=all",
      color: "hover:bg-blue-700",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://www.instagram.com/fiscal.forum?igsh=eXAzb3JvOXd5MGox#",
      color: "hover:bg-pink-600",
    },
  ];


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white relative overflow-hidden" style={{ backgroundColor: "#1a3f2b" }}>
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 pt-12">
            <div className="flex flex-col items-center text-center">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="">
                  <h2 className="text-3xl font-bold text-white mb-4">
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
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                    <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                <div className="">
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
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</Link>
              <Link href="/refund" className="text-gray-400 hover:text-white text-sm transition-colors">Refund Policy</Link>
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