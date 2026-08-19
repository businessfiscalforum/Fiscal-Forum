"use client";
import React, { useState, useMemo } from "react";
import {
  Heart,
  Car,
  Bike,
  Shield,
  Home,
  Plane,
  ArrowRight,
  Phone,
  Zap,
  Lock,
  Users,
  Award,
  FileText,
  CheckCircle,
  UserCheck,
  ShieldAlert,
  Truck,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import FeatureBannerCarousel from "../../_components/FeatureBannerCarousel";

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
    link: "/services/insurance/health-insurance/learn-more",
    formLink: "/services/insurance/health-insurance",
  },
  {
    id: "car",
    title: "Car Insurance",
    description:
      "Protect your car and drive stress-free. From minor dents to major mishaps, enjoy quick claims, no hidden costs, and total peace of mind every journey.",
    icon: Car,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    link: "/services/insurance/car-insurance/learn-more",
    formLink: "/services/insurance/car-insurance",
  },
  {
    id: "two-wheeler",
    title: "Two-Wheeler Insurance",
    description:
      "Ride worry-free with total two-wheeler protection. Stay covered for accidents, damages, or theft. Affordable premiums, fast claims, and smooth renewals keep you confidently on-road always.",
    icon: Bike,
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-500",
    link: "/services/insurance/two-wheeler-insurance/learn-more",
    formLink: "/services/insurance/two-wheeler-insurance",
  },
  {
    id: "life",
    title: "Life Insurance",
    description:
      "Secure your family’s tomorrow today. Life insurance provides financial stability and peace of mind, ensuring loved ones remain protected no matter what happens ahead.",
    icon: Shield,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-500",
    link: "/services/insurance/life-insurance/learn-more",
    formLink: "/services/insurance/life-insurance",
  },
  {
    id: "home",
    title: "Home & Shop Insurance",
    description:
      "Protect your home and business from unforeseen events like fire, theft, or natural disasters. Secure your property and its contents with a comprehensive plan.",
    icon: Home,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-500",
    link: "/services/insurance/home-shop-insurance/learn-more",
    formLink: "/services/insurance/home-shop-insurance",
  },
  {
    id: "travel",
    title: "Travel Insurance",
    description:
      "Travel anywhere fully protected. Lost bags, delays, or medical emergencies abroad — we cover surprises. Stay adventurous confidently knowing we’ve got your back always.",
    icon: Plane,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    link: "/services/insurance/travel-insurance/learn-more",
    formLink: "/services/insurance/travel-insurance",
  },
  {
    id: "personal-accident",
    title: "Personal Accident Insurance",
    description:
      "Accidents strike unexpectedly – stay prepared. Cover treatments, recovery, and protect income. A simple plan ensures you and your family stand strong when life surprises you.",
    icon: ShieldAlert,
    iconBgColor: "bg-indigo-100",
    iconColor: "text-indigo-500",
    link: "/services/insurance/personal-accident-insurance/learn-more",
    formLink: "/services/insurance/personal-accident-insurance",
  },
  {
    id: "commercial-vehicle",
    title: "Commercial Vehicle Insurance",
    description:
      "Keep your business moving with comprehensive protection for your fleet. Cover for damages, theft, and liability ensures your operations run smoothly without interruption.",
    icon: Truck,
    iconBgColor: "bg-cyan-100",
    iconColor: "text-cyan-500",
    link: "/services/insurance/commercial-vehicle-insurance/learn-more",
    formLink: "/services/insurance/commercial-vehicle-insurance",
  },
];

const InsurancePage = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCards = useMemo(() => {
    if (activeCategory === "all") return cards;
    if (activeCategory === "health") {
      return cards.filter((c) =>
        ["health", "personal-accident", "life"].includes(c.id)
      );
    }
    if (activeCategory === "vehicle") {
      return cards.filter((c) =>
        ["car", "two-wheeler", "commercial-vehicle"].includes(c.id)
      );
    }
    if (activeCategory === "other") {
      return cards.filter((c) => ["home", "travel"].includes(c.id));
    }
    return cards;
  }, [activeCategory]);

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
      description: "Receive a quote based on your details personally.",
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
    <div
      className="min-h-screen bg-[#F2F8F4] text-[#111315] pt-32 pb-16 font-sans relative"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(17,19,21,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(17,19,21,0.07) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title / Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111315] mb-4">
            INSURANCE PLANS
          </h1>
          <p className="text-lg md:text-xl text-[#5B6B7C] max-w-3xl mx-auto font-medium">
            Compare policies, optimize premiums, and secure what matters most.
          </p>
        </div>

        {/* Outlined Pill Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 border-b border-[#111315] pb-8">
          {[
            { id: "all", label: "ALL INSURANCE" },
            { id: "health", label: "HEALTH & LIFE" },
            { id: "vehicle", label: "VEHICLE INSURANCE" },
            { id: "other", label: "PROPERTY & TRAVEL" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold border border-[#111315] transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#5C9A78] text-white shadow-sm"
                  : "bg-white text-[#111315] hover:bg-[#F2F8F4]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredCards.map((option) => {
            const IconComponent = option.icon;
            // Determine category label
            let catLabel = "INSURANCE";
            if (["health", "personal-accident", "life"].includes(option.id)) {
              catLabel = "HEALTH";
            } else if (
              ["car", "two-wheeler", "commercial-vehicle"].includes(option.id)
            ) {
              catLabel = "VEHICLE";
            } else if (["home", "travel"].includes(option.id)) {
              catLabel = "PROPERTY";
            }

            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#111315] rounded-[24px] overflow-hidden shadow-sm flex flex-col justify-between h-full p-6 hover:-translate-y-1 transition-transform"
              >
                <div>
                  {/* Top Row Badges */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#D9F0E1] text-[#2F5541] border border-[rgba(17,19,21,0.15)] px-3 py-1 rounded-full text-[0.68rem] font-bold tracking-wider uppercase">
                      {catLabel}
                    </span>
                    <span className="bg-white text-[#111315] border border-[#111315] px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase">
                      VERIFIED
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-xl ${option.iconBgColor} flex items-center justify-center w-10 h-10`}
                    >
                      {IconComponent && (
                        <IconComponent className={`w-5 h-5 ${option.iconColor}`} />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#111315]">
                      {option.title}
                    </h3>
                  </div>

                  <p className="text-[#5B6B7C] text-sm leading-relaxed mb-4">
                    {option.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-[rgba(17,19,21,0.08)]">
                  <div>
                    <span className="text-[0.65rem] text-[#8B98A6] font-bold uppercase tracking-wider block">
                      NETWORK
                    </span>
                    <span className="text-[#111315] font-bold text-sm">
                      100% Cashless
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={option.link} passHref>
                      <button className="px-4 py-2 rounded-full text-xs font-semibold text-[#5B6B7C] hover:text-[#111315] transition-colors cursor-pointer">
                        Details
                      </button>
                    </Link>
                    <Link href={option.formLink} passHref>
                      <button className="bg-[#5C9A78] hover:bg-[#2F5541] text-white font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer">
                        Get Quote →
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FeatureBannerCarousel spacer if any, or just display the banner */}
        <div className="mb-20">
          <FeatureBannerCarousel />
        </div>

        {/* Help Center */}
        <div className="my-10 mx-auto max-w-4xl text-center bg-white border border-[#111315] rounded-[28px] p-8 shadow-sm mb-20">
          <Phone className="w-12 h-12 mx-auto mb-4 text-[#5C9A78]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase">
            Need Help? Talk to an Expert
          </h2>
          <p className="text-sm text-[#5B6B7C] mb-6 font-medium">
            Get personalized guidance on insurance plans and claim support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/services/learning-centre/contact")}
              className="bg-white border border-[#111315] text-[#111315] hover:bg-[#F2F8F4] px-6 py-3 rounded-full font-bold text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Schedule a Free Call
            </button>
            <a
              href="https://wa.me/+918696060387"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5C9A78] hover:bg-[#2F5541] text-white px-6 py-3 rounded-full font-bold text-xs transition flex items-center gap-2 cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4" />
              Chat with Us
            </a>
          </div>
        </div>

        {/* Steps Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase">
              GET INSURED IN 4 SIMPLE STEPS
            </h2>
            <p className="text-sm text-[#5B6B7C] font-medium">
              Our streamlined process makes securing your future quick and easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
            {applicationSteps.map((step, index) => (
              <div
                key={index}
                className="text-center relative bg-white border border-[#111315] p-6 rounded-[24px]"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#D9F0E1] border border-[rgba(17,19,21,0.15)] flex items-center justify-center mx-auto mb-2 text-[#2F5541]">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-white border border-[#111315] text-[#111315] w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#111315] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5B6B7C] leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white border border-[#111315] rounded-[28px] p-8 max-w-5xl mx-auto shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111315] mb-2 uppercase">
              WHY CHOOSE FISCAL FORUM
            </h2>
            <p className="text-sm text-[#5B6B7C] font-medium">
              We offer robust coverage coupled with direct coordinator support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <Zap />,
                title: "Compare & Save",
                desc: "Compare policy terms and secure maximum benefits at lowest premiums.",
              },
              {
                icon: <Lock />,
                title: "Quote Beat Promise",
                desc: "Provide any existing quote — we will match or beat the rates.",
              },
              {
                icon: <Users />,
                title: "Dedicated Support",
                desc: "Helpful direct calling support whenever updates or claims are needed.",
              },
              {
                icon: <Award />,
                title: "Query Resolution",
                desc: "Direct coordinate support for swift claim processing and clarifications.",
              },
              {
                icon: <Award />,
                title: "Trusted Partners",
                desc: "Affiliated with all Tier-1 insurance networks across the country.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 border-r last:border-0 border-[rgba(17,19,21,0.08)] flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#D9F0E1] text-[#2F5541] flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#111315] mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#5B6B7C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;