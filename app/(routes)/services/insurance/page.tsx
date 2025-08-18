"use client";
import React from "react";
import {
  Heart,
  Car,
  Bike,
  Shield,
  Home,
  Briefcase,
  Plane,
  Plus,
  ArrowRight,
  Phone,
  Mail,
  Zap,
  Lock,
  Users,
  Award,
  FileText,
  CheckCircle,
  UserCheck,
  ShieldAlert,
  Truck,
  FolderOpen,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

// Slides for the hero section carousel, themed for insurance
const slides = [
  {
    title: "Complete Health Protection",
    subtitle: "Secure Your Well-being with",
    description:
      "Our health insurance plans cover everything from hospitalization to critical illness, ensuring you and your family are always protected.",
    image: "/asset-insurance.jpg",
    gradient: "from-emerald-600 via-teal-500 to-green-600",
    path: "/services/health-insurance",
  },
  {
    title: "Secure Your Family's Future",
    subtitle: "Peace of Mind with",
    description:
      "Our life insurance policies provide a financial safety net for your loved ones, ensuring their dreams are fulfilled, no matter what.",
    image: "/asset-life-insurance.jpg", // Placeholder image
    gradient: "from-green-600 via-emerald-500 to-cyan-600",
    path: "/services/life-insurance",
  },
  {
    title: "Protect Your Prized Ride",
    subtitle: "Comprehensive Coverage for",
    description:
      "From minor dents to major accidents, our vehicle insurance offers complete protection and hassle-free claims for your car or bike.",
    image: "/asset-car-insurance.jpg", // Placeholder image
    gradient: "from-teal-600 via-emerald-500 to-green-600",
    path: "/services/vehicle-insurance",
  },
];

// Data for the insurance options grid
const cards = [
  {
    id: "health",
    title: "Health Insurance",
    description:
      "Safeguard your priceless health with complete coverage. Hospitalization, treatments, emergencies — we handle bills, so you and loved ones receive the best care stress-free.",
    icon: Heart,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-500",
    link: "/services/insurance/health",
  },
  {
    id: "car",
    title: "Car Insurance",
    description:
      "Protect your car and drive stress-free. From minor dents to major mishaps, enjoy quick claims, no hidden costs, and total peace of mind every journey.",
    icon: Car,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    link: "/services/insurance/car",
  },
  {
    id: "two-wheeler",
    title: "Two-Wheeler Insurance",
    description:
      "Ride worry-free with total two-wheeler protection. Stay covered for accidents, damages, or theft. Affordable premiums, fast claims, and smooth renewals keep you confidently on-road always.",
    icon: Bike,
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-500",
    link: "/services/insurance/two-wheeler",
  },
  {
    id: "life",
    title: "Life Insurance",
    description:
      "Secure your family’s tomorrow today. Life insurance provides financial stability and peace of mind, ensuring loved ones remain protected no matter what happens ahead.",
    icon: Shield,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-500",
    link: "/services/insurance/life",
  },
  {
    id: "home",
    title: "Home & Shop Insurance",
    description:
      "Protect your home and business from unforeseen events like fire, theft, or natural disasters. Secure your property and its contents with a comprehensive plan.",
    icon: Home,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-500",
    link: "/services/insurance/home-shop",
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description:
      "Travel anywhere fully protected. Lost bags, delays, or medical emergencies abroad — we cover surprises. Stay adventurous confidently knowing we’ve got your back always.",
    icon: Plane,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    link: "/services/insurance/travel",
  },
  {
    id: "personal-accident",
    title: "Personal Accident Insurance",
    description:
      "Accidents strike unexpectedly – stay prepared. Cover treatments, recovery, and protect income. A simple plan ensures you and your family stand strong when life surprises you.",
    icon: ShieldAlert,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-500",
    link: "/services/insurance/personal-accident",
  },
  {
    id: "commercial-vehicle",
    title: "Commercial Vehicle Insurance",
    description:
      "Keep your business moving with comprehensive protection for your fleet. Cover for damages, theft, and liability ensures your operations run smoothly without interruption.",
    icon: Truck,
    iconBgColor: "bg-cyan-100",
    iconColor: "text-cyan-500",
    link: "/services/insurance/commercial-vehicle",
  },
];

const InsurancePage = () => {
  const router = useRouter();
  const applicationSteps = [
    {
      step: 1,
      title: "Select a Plan",
      description: "Choose the insurance policy that best fits your needs.",
      icon: FileText,
    },
    {
      step: 2,
      title: "Provide Details",
      description: "Fill in your personal and nominee information.",
      icon: UserCheck,
    },
    {
      step: 3,
      title: "Get a Quote",
      description: "Receive an instant premium quote based on your details.",
      icon: Shield,
    },
    {
      step: 4,
      title: "Complete Payment",
      description: "Pay the premium online to activate your policy instantly.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="absolute inset-0 z-0">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`}
                ></div>
              </div>
              <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white max-w-xl"
                >
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase tracking-widest text-sm text-green-200 font-semibold mb-2"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>
                  <Link href={slide.path}>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center gap-3"
                    >
                      Explore Plans
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
      </section>

      {/* Insurance Options Grid Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
              Comprehensive Insurance Solutions
            </h2>
            <p className="text-lg text-teal-700 max-w-3xl mx-auto">
              Find the perfect insurance plan to protect what matters most to
              you.
            </p>
          </div>

          {/* This is the grid with your specified styling */}
          <div className="max-w-7xl mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl bg-white"
                  >
                    <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    <Link href={option.link} passHref>
                      <div className="p-6 space-y-4 h-full flex flex-col cursor-pointer">
                        <div
                          className={`p-3 rounded-xl ${option.iconBgColor} flex-shrink-0 w-12 h-12 flex items-center justify-center`}
                        >
                          {IconComponent && (
                            <IconComponent
                              className={`w-6 h-6 ${option.iconColor}`}
                            />
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {option.title}
                        </h2>
                        <p className="text-sm leading-relaxed flex-grow text-gray-600">
                          {option.description}
                        </p>
                        <div className="pt-4">
                          <div className="inline-flex items-center gap-2 font-medium text-green-600 hover:text-green-700">
                            Learn More
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-4 h-4"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 mx-auto max-w-4xl text-center bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-2xl px-6">
        <Phone className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          Need Help? Talk to an Expert
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Get personalized guidance on opening your Demat account or
          transferring holdings.
        </p>
        <button
          onClick={() => router.push("/services/insurance/call")}
          className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition flex items-center gap-3 mx-auto"
        >
          <Phone className="w-5 h-5" />
          Schedule a Free Call
        </button>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Insured in 4 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our digital process makes securing your future quick and easy.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-emerald-200"></div>
                {/* Icon + Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl shadow-md bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-9 w-9 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white shadow-md border-2 border-emerald-500 text-emerald-600 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                {/* Title + Description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Get a personalized quote today and take the first step towards
            complete peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
              <FileText className="w-5 h-5" />
              Get a Free Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              Talk to an Expert
            </button>
          </div>
        </div>
      </section> */}
      <section className="py-16 bg-gradient-to-r from-teal-900 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Insurance Plans from Fiscal Forum
            </h2>
            <p className="text-xl text-teal-200 max-w-3xl mx-auto">
              We provide reliable coverage with exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center mb-4">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quick Claim Process</h3>
              <p className="text-teal-200">
                Experience a fast, simple, and transparent claim settlement
                process.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-4">
                <Lock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Security</h3>
              <p className="text-teal-200">
                Your personal information is protected with the highest
                standards of security.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mb-4">
                <Users className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-teal-200">
                Our dedicated support team is always available to assist with
                your queries.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 flex items-center justify-center mb-4">
                <Award className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted by Millions</h3>
              <p className="text-teal-200">
                Join millions of satisfied customers who trust us with their
                protection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePage;
