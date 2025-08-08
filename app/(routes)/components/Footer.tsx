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
  FaMapMarkerAlt,
  FaClock,
  FaArrowUp,
  FaShieldAlt,
  FaLock,
  FaAward,
  FaCertificate,
  FaGlobe,
  // FaRocket,
  FaHeart,
  FaUniversity,
  FaCreditCard,
  FaPiggyBank,
  FaChartLine,
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

  const certifications = [
    { name: "ISO 27001", icon: FaShieldAlt, desc: "Information Security" },
    { name: "PCI DSS", icon: FaLock, desc: "Payment Security" },
    { name: "SEBI Registered", icon: FaAward, desc: "Investment Advisory" },
    { name: "RBI Licensed", icon: FaCertificate, desc: "Banking Operations" },
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
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Fiscal Forum
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Your trusted partner in financial growth. We provide
                    comprehensive financial solutions with transparency,
                    innovation, and customer-first approach.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPhone className="text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Call Us</p>
                      <p className="font-semibold">+91 1800-123-4567</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email Us</p>
                      <p className="font-semibold">support@fiscalforum.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaMapMarkerAlt className="text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Visit Us</p>
                      <p className="font-semibold">Delhi, India</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaClock className="text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Business Hours</p>
                      <p className="font-semibold">24/7 Online Support</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">
                    Follow Us
                  </h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${social.color} border border-white/20 hover:border-white/40`}
                      >
                        <social.icon className="text-lg" />
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
                <h3 className="text-xl font-bold mb-6 text-white">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
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
                <h3 className="text-xl font-bold mb-6 text-white">
                  Financial Services
                </h3>
                <ul className="space-y-4">
                  {financialServices.map((service, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <a
                        href={service.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                          <service.icon className="text-sm" />
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
                <h3 className="text-xl font-bold mb-6 text-white">
                  Customer Support
                </h3>
                <ul className="space-y-3">
                  {supportLinks.map((link, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
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

        {/* Mobile App Section */}
        {/* <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    📱 Download Our Mobile App
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Experience seamless banking on the go with our award-winning
                    mobile application. Available for both iOS and Android
                    devices.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all duration-300 shadow-lg"
                    >
                      <FaApple className="text-2xl" />
                      <div className="text-left">
                        <p className="text-xs text-gray-300">Download on the</p>
                        <p className="font-semibold">App Store</p>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                    >
                      <FaGooglePlay className="text-2xl" />
                      <div className="text-left">
                        <p className="text-xs text-gray-200">Get it on</p>
                        <p className="font-semibold">Google Play</p>
                      </div>
                    </motion.button>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <FaQrcode className="text-6xl text-gray-800" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div> */}

        {/* Certifications & Security */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                🔒 Security & Certifications
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Your security is our priority. We maintain the highest standards
                of data protection and regulatory compliance.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center group hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <cert.icon className="text-xl text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-300">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {legalLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
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
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaGlobe className="text-blue-400" />
                <span>Available in 15+ countries</span>
              </div>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 group"
              >
                <FaArrowUp className="text-white group-hover:translate-y-[-2px] transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
