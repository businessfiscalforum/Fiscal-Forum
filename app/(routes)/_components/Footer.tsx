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
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-1"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    Fiscal Forum
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Your trusted partner in financial growth. We provide
                    comprehensive financial solutions with transparency,
                    innovation, and customer-first approach.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPhone className="text-white" />
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
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Email Us
                      </p>
                      <p className="font-semibold text-white text-sm">
                        business.fiscalforum@gmail.com
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaClock className="text-white" />
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
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-white">
                    Follow Us
                  </h4>
                  <div className="flex gap-2">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} border border-white/20 hover:border-white/40`}
                      >
                        <social.icon className="text-sm" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold mb-4 text-white">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 group-hover:bg-white transition-all duration-300"></div>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Financial Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold mb-4 text-white">
                  Financial Services
                </h3>
                <ul className="space-y-3">
                  {financialServices.map((service, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <a
                        href={service.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                          <service.icon className="text-xs text-blue-300" />
                        </div>
                        {service.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-4 text-white">
                  Customer Support
                </h3>
                <ul className="space-y-2">
                  {supportLinks.map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-emerald-400 rounded-full group-hover:w-2 group-hover:bg-white transition-all duration-300"></div>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {legalLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <p className="text-gray-400 text-sm">
                © 2025 Fiscal Forum. All rights reserved. | Made with{" "}
                <FaHeart className="inline text-red-500 mx-1" /> in India
              </p>
              <p className="text-gray-500 text-xs mt-1">
                SEBI Registration No: INZ000123456 | CIN: U74999DL2020PTC123456
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <FaGlobe className="text-blue-400 text-sm" />
                <span>Available in 15+ countries</span>
              </div>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
              >
                <FaArrowUp className="text-white text-sm" />
              </motion.button>
            </motion.div>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;