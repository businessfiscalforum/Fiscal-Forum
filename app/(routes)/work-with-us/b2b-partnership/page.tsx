"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaHandshake,
  FaArrowRight,
  FaUserTie,
  FaRupeeSign,
  FaStar,
  FaThumbsUp,
  FaShieldAlt,
  FaNetworkWired,
  FaCreditCard,
  FaPiggyBank,
  FaUniversity,
} from "react-icons/fa";
import Link from "next/link";
import { FileText, Users } from "lucide-react";

const BDPPartnerDetails = () => {
  const benefits = [
    {
      id: 1,
      title: "All Financial Services in One Place",
      description:
        "From stock broking, mutual funds, and insurance to savings accounts and credit cards, we offer a one-stop solution for all your financial needs.",
      icon: FaChartLine,
    },
    {
      id: 2,
      title: "Personalized Support",
      description:
        "Get tailored financial guidance with expert recommendations, ensuring you make the best decisions for your portfolio.",
      icon: FaThumbsUp,
    },
    {
      id: 3,
      title: "Trusted & Secure",
      description:
        "Your financial security is our priority. We use industry-leading practices to keep your data and transactions safe.",
      icon: FaShieldAlt,
    },
    {
      id: 4,
      title: "Extensive Network",
      description:
        "Benefit from our wide network of financial institutions and service providers for the best options and deals.",
      icon: FaNetworkWired,
    },
  ];

  const steps = [
    {
      title: "Register",
      description:
        "Start your journey by registering as a Business Development Partner.",
      icon: FaUserTie,
    },
    {
      title: "Quick Approval",
      description:
        "Our streamlined process ensures fast and hassle-free approval.",
      icon: FaCheckCircle,
    },
    {
      title: "Get Clients",
      description:
        "Leverage our platform to connect with potential clients and build your network.",
      icon: FaUsers,
    },
    {
      title: "Track Status",
      description:
        "Monitor your leads and client progress in real-time with our dashboard.",
      icon: FaChartLine,
    },
    {
      title: "Receive Earnings",
      description:
        "Earn commissions on successful referrals and transactions and completion of targets",
      icon: FaRupeeSign,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
              >
                Become a B2B Partner
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-2xl"
              >
                Join fiscal Forum as a B2B partnership and unlock the potential to earn across multiple financial products.
              </motion.p>

              <Link href="/work-with-us/b2b-partnership/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 text-lg flex items-center gap-2 mx-auto lg:mx-0"
                >
                  Register Now
                  <FaArrowRight />
                </motion.button>
              </Link>
            </div>

            {/* Services Offered Grid */}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Services We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empower your clients with a full suite of financial solutions —
              all under one trusted platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 mt-8"
          >
            {[
              {
                name: "Stock Investment",
                icon: FaChartLine,
                bg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
                text: "text-white",
              },
              {
                name: "Mutual Funds",
                icon: FaChartLine,
                bg: "bg-gradient-to-br from-teal-400 to-teal-600",
                text: "text-white",
              },
              {
                name: "Insurance",
                icon: FaShieldAlt,
                bg: "bg-gradient-to-br from-blue-400 to-blue-600",
                text: "text-white",
              },
              {
                name: "Credit Card",
                icon: FaCreditCard,
                bg: "bg-gradient-to-br from-purple-400 to-purple-600",
                text: "text-white",
              },
              {
                name: "Saving Account",
                icon: FaPiggyBank,
                bg: "bg-gradient-to-br from-amber-400 to-orange-500",
                text: "text-white",
              },
              {
                name: "Loan",
                icon: FaHandshake,
                bg: "bg-gradient-to-br from-red-400 to-pink-500",
                text: "text-white",
              },
              {
                name: "Govt Bonds & FD",
                icon: FaUniversity,
                bg: "bg-gradient-to-br from-green-400 to-cyan-500",
                text: "text-white",
              },
            ].map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                className="group p-5 rounded-2xl border border-gray-100 bg-white shadow-md hover:shadow-2xl transition-all duration-300 cursor-default text-center relative overflow-hidden"
              >
                <div
                  className={`w-14 h-14 ${service.bg} text-white rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <service.icon className="w-6 h-6 drop-shadow-sm" />
                </div>

                {/* Service Name */}
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                  Tailored {service.name.toLowerCase()} solutions
                </p>

                {/* Subtle Glow on Hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-10
          from-white/40 to-transparent rounded-2xl pointer-events-none transition-opacity duration-300"
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who is Eligible Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900"
          >
            Who Can Become a B2B Partner?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12"
          >
            Join our network and start earning through referrals. We welcome a
            diverse range of professionals.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Small Business Owners",
                desc: "Whether you run a shop, consultancy, or startup, leverage your network to earn extra income.",
                icon: Users,
                bgColor: "bg-emerald-100",
                iconColor: "bg-emerald-500",
              },
              {
                title: "E-Mitra Services",
                desc: "Integrate our financial services into your existing offerings and expand your revenue streams.",
                icon: FileText,
                bgColor: "bg-teal-100",
                iconColor: "bg-teal-500",
              },
              {
                title: "Financial Advisors",
                desc: "Help your clients and earn referral benefits simultaneously.",
                icon: FaChartLine,
                bgColor: "bg-cyan-100",
                iconColor: "bg-cyan-500",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${item.bgColor} p-6 rounded-2xl shadow-md border border-emerald-200 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg`}
              >
                <div
                  className={`${item.iconColor} p-3 rounded-full mb-4 text-white`}
                >
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Redesigned */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4 text-gray-900"
          >
            Benefits of Partnering with Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-center text-gray-600 mb-12"
          >
            Discover the unique advantages that make our partnership program
            stand out.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "1",
                title: "Deals in Multiple Products",
                desc: "Earn across stocks, loans, credit cards, savings accounts, and more.",
                color: "bg-red-500",
              },
              {
                num: "2",
                title: "No Registration or Investment",
                desc: "Start earning instantly — no upfront cost or registration hassle.",
                color: "bg-indigo-500",
              },
              {
                num: "3",
                title: "One Platform, Multiple Services",
                desc: "Manage all referrals from a single, integrated dashboard.",
                color: "bg-amber-500",
              },
              {
                num: "4",
                title: "Work Anytime, Anywhere",
                desc: "Flexible income generation — access from mobile or desktop, anytime.",
                color: "bg-emerald-500",
              },
              {
                num: "5",
                title: "High Earning Potential",
                desc: "Earn up to ₹900 per credit card and 0.75% on high-value loans.",
                color: "bg-pink-500",
              },
              {
                num: "6",
                title: "Dashboard",
                desc: "Get your personalised dashboard.",
                color: "bg-purple-500",
              },
              {
                num: "7",
                title: "Very Low Targets",
                desc: "No pressure — earn consistently even with small referrals.",
                color: "bg-yellow-500",
              },
              {
                num: "8",
                title: "Monthly Giveaway",
                desc: "Surprise rewards every month for top performers.",
                color: "bg-teal-500",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col"
              >
                <div
                  className={`${benefit.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 flex-shrink-0`}
                >
                  {benefit.num}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 flex-grow">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden border border-emerald-200">
            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-6 leading-tight"
              >
                Check Your Revenue Sharing
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href="/work-with-us/b2b-partnership/get-started"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white text-lg"
                >
                  Get Started Now
                  <FaArrowRight className="text-sm" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
            >
              How it Works?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              A simple, transparent process to help you succeed.
            </motion.p>
          </div>

          {/* Desktop Horizontal Layout */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 -translate-y-1/2 z-0"></div>
              <div className="flex justify-between relative z-10 items-stretch">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex flex-col items-center w-1/5 px-2"
                  >
                    {/* Step Circle */}
                    <div className="relative mb-6 flex flex-col items-center">
                      <div className="absolute -inset-2">
                        <div
                          className={`w-16 h-16 rounded-full ${index % 2 === 0 ? "bg-emerald-500" : "bg-teal-500"} opacity-20 blur-md animate-pulse`}
                        ></div>
                      </div>
                      <div
                        className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${index % 2 === 0 ? "from-emerald-500 to-green-600" : "from-teal-500 to-cyan-600"} flex items-center justify-center text-white font-bold shadow-lg border-2 border-white z-10`}
                      >
                        {index + 1}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-emerald-300 flex items-center justify-center shadow-sm z-20">
                        <step.icon className="text-emerald-600 text-sm" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100 text-center w-full h-full flex flex-col justify-between">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Layout */}
          <div className="md:hidden space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start"
              >
                {/* Step Number & Icon */}
                <div className="relative mr-4 flex-shrink-0">
                  <div className="absolute -inset-1.5">
                    <div
                      className={`w-14 h-14 rounded-full ${index % 2 === 0 ? "bg-emerald-500" : "bg-teal-500"} opacity-20 blur-sm`}
                    ></div>
                  </div>
                  <div
                    className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${index % 2 === 0 ? "from-emerald-500 to-green-600" : "from-teal-500 to-cyan-600"} flex items-center justify-center text-white font-bold shadow z-10`}
                  >
                    {index + 1}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-3 border-emerald-300 flex items-center justify-center shadow-sm z-20">
                    <step.icon className="text-emerald-600 text-xs" />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100 flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5"
            >
              Why Choose Fiscal Forum?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Experience the difference with our comprehensive financial
              ecosystem designed for your success.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div
                  className="h-full rounded-2xl p-6 transition-all duration-300 ease-in-out cursor-pointer border 
                       bg-white shadow-sm border-emerald-100 
                       group-hover:bg-gradient-to-br group-hover:from-emerald-600 group-hover:to-green-700 
                       group-hover:text-white group-hover:shadow-lg group-hover:border-emerald-500"
                >
                  <div className="flex flex-col h-full">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mb-4 
                           bg-emerald-100 text-emerald-700 
                           group-hover:bg-emerald-700/30 group-hover:text-white"
                    >
                      <benefit.icon className="text-lg" />
                    </div>

                    <h3
                      className="text-xl font-bold mb-3 transition-colors duration-300 
                           text-gray-900 group-hover:text-white"
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className="text-base md:text-lg flex-grow transition-colors duration-300 
                           text-gray-600 group-hover:text-emerald-100"
                    >
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BDPPartnerDetails;
