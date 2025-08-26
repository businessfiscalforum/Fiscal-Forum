// app/(routes)/work-with-us/bdp/page.tsx
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
import Image from "next/image";
import { useState } from "react";

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
      title: "Exclusive Cashback & Rewards",
      description:
        "Enjoy cashback benefits when you avail services through our platform, whether it's investing, opening accounts, or getting a credit card.",
      icon: FaStar,
    },
    {
      id: 3,
      title: "Personalized Support",
      description:
        "Get tailored financial guidance with expert recommendations, ensuring you make the best decisions for your portfolio.",
      icon: FaThumbsUp,
    },
    {
      id: 4,
      title: "Exciting Giveaways & High Cashback Offers",
      description:
        "We value our customers! Stay tuned for special giveaways and extra cashback deals to maximize your savings.",
      icon: FaUsers,
    },
    {
      id: 5,
      title: "Trusted & Secure",
      description:
        "Your financial security is our priority. We use industry-leading practices to keep your data and transactions safe.",
      icon: FaShieldAlt,
    },
    {
      id: 6,
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
        "Start your journey by registering as a Business Deveelopment Partner.",
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
      <section className="py-20 md:py-30 bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Become a Business Development Partner
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl"
              >
                Build a great portfolio by joining as a business development
                partner with Fiscal Forum.
              </motion.p>

              <Link href="/work-with-us/bdp/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Register Now
                </motion.button>
              </Link>
            </div>

            
          </div>
          {/* Services Section */}
            <div className="mt-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { name: "Stock Investment", icon: FaChartLine },
                  { name: "Mutual Funds", icon: FaChartLine },
                  { name: "Insurance", icon: FaShieldAlt },
                  { name: "Credit Card", icon: FaCreditCard },
                  { name: "Saving Account", icon: FaPiggyBank },
                  { name: "Loan", icon: FaHandshake },
                  { name: "Govt Bonds & FD", icon: FaUniversity },
                ].map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="text-emerald-600 mb-3">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <span className="font-medium text-gray-800 text-center text-sm">
                      {service.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-emerald-50">
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits of Partnering With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build a successful partnership
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/info1.png"
                alt="Business Partnership Meeting"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src="/info2.png"
                alt="Success Partnership"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-b from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden border border-emerald-200">
            {/* Optional Subtle Background Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6 leading-tight"
              >
                Check Your Revenue Sharing
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white"
                >
                  Get Started
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
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
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
                        <div className="w-16 h-16 rounded-full bg-emerald-500 opacity-20 blur-md animate-pulse"></div>
                      </div>
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-white z-10">
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
                    <div className="w-14 h-14 rounded-full bg-emerald-500 opacity-20 blur-sm"></div>
                  </div>
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold shadow z-10">
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
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-5"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            {/* Add button or CTA here if needed */}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BDPPartnerDetails;
