"use client";
import React, { useState } from "react";
import {
  FaBuilding,
  FaUsers,
  FaHandshake,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaChartLine,
  FaAward,
  FaRocket,
  FaLightbulb,
  FaWhatsapp,
  FaCheckCircle,
  FaCoins,
  FaNetworkWired,
  FaSync,
  FaChartBar,
  FaThumbsUp,
  FaUserFriends,
  FaMoneyBillWave,
  FaLayerGroup,
  FaBullseye,
  FaTachometerAlt,
  FaBell,
  FaGraduationCap,
  FaUsersCog,
  FaLink,
  FaShieldAlt,
  FaLock,
  FaEye,
  FaFileAlt,
  FaClipboardList,
  FaDatabase,
  FaServer,
  FaCloud,
  FaCogs,
  FaTools,
  FaRocket as FaRocketIcon,
  FaStar as FaStarIcon,
  FaHeart,
  FaSmile,
  FaSmileBeam,
  FaSmileWink,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { motion } from "framer-motion";

const WorkWithUsPage = () => {
  const [activePartnership, setActivePartnership] = useState<number>(0);

  const partnerships = [
    {
      id: 1,
      title: "Business Development Partner",
      icon: FaBuilding,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-500 to-teal-500",
      description:
        "Partner with us as a Business Development ally and help expand our reach to new heights. Build trusted relationships, connect with potential clients, and earn attractive rewards while growing your own network and success alongside a brand that values collaboration.",
      features: [
        "Expand reach to new markets",
        "Build trusted client relationships",
        "Attractive reward structure",
        "Network growth opportunities",
        "Brand collaboration benefits",
      ],
      benefits: [
        "High commission rates",
        "Marketing support provided",
        "Dedicated account manager",
        "Training and resources",
        "Performance bonuses",
      ],
      details: `
        <p class="mb-4">As a Business Development Partner, you become a key player in our growth strategy. This partnership model is ideal for professionals with strong networks and business development skills.</p>
        <p class="mb-4">Your role involves identifying potential clients who would benefit from our financial services, introducing them to our platform, and nurturing relationships until conversion. We provide comprehensive training to ensure you're equipped with all necessary knowledge to succeed.</p>
        <p class="mb-4">Our reward structure is designed to be highly beneficial, offering competitive commissions that increase with your performance and volume of referrals. You'll receive exclusive access to our marketing materials, training resources, and performance analytics to optimize your strategy.</p>
        <p class="mb-4">We also provide dedicated account managers who work closely with you to ensure your success. They offer personalized guidance, regular performance reviews, and strategic support to help you achieve your partnership goals.</p>
        <p class="mb-4">This partnership model encourages long-term collaboration with benefits that compound over time, making it an excellent choice for those seeking sustainable passive income through business relationships.</p>
      `,
    },
    {
      id: 2,
      title: "Remisorship",
      icon: FaUsers,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-500 to-teal-500",
      description:
        "Join as a Remisier and share opportunities with your network while earning extra benefits. Once the client referred by Remisier starts trading with Angel One, the Remisier will get 25% of total brokerage for the whole trading life-span of the client.",
      features: [
        "Simple referral process",
        "Network monetization",
        "Meaningful returns",
        "Trusted financial services",
        "Growth opportunities",
      ],
      benefits: [
        "Instant referral tracking",
        "Competitive payouts",
        "No minimum requirements",
        "Easy-to-use platform",
        "Monthly bonus incentives",
      ],
      details: `
        <p class="mb-4">Our Remisorship program allows you to monetize your existing network by referring potential clients to our platform. This is an excellent opportunity for anyone with a network of people interested in financial services.</p>
        <p class="mb-4">The beauty of this arrangement lies in its simplicity and effectiveness - when a client referred by you begins trading with Angel One, you receive 25% of the total brokerage for the entire trading lifespan of that client. This creates a long-term revenue stream that continues to benefit you as your referred clients remain active members of our platform.</p>
        <p class="mb-4">The process is straightforward: identify potential clients who might benefit from our services, introduce them to our platform, and watch as they become active traders. You don't need to be an expert in financial services to participate - our intuitive platform makes it easy for anyone to become a successful remisor.</p>
        <p class="mb-4">We handle all aspects of client onboarding and relationship management, allowing you to focus purely on referral generation and relationship building. Our remisier program also includes performance tracking tools that let you monitor your referrals and earnings in real-time, providing transparency and motivation to achieve higher targets.</p>
        <p class="mb-4">This model is particularly attractive for individuals who already have a strong network but want to monetize it without significant investment or expertise in financial services.</p>
      `,
    },
    {
      id: 3,
      title: "B2B Partner",
      icon: FaHandshake,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-500 to-teal-500",
      description:
        "Collaborate with us as a B2B Partner and unlock growth for your business too. Bring your services, align with our trusted network, and deliver greater value to your clients while expanding your reach and creating new possibilities together.",
      features: [
        "Business growth acceleration",
        "Service integration",
        "Trusted network access",
        "Client value enhancement",
        "Mutual growth opportunities",
      ],
      benefits: [
        "Revenue sharing model",
        "Joint marketing campaigns",
        "Technical integration support",
        "Priority customer support",
        "Strategic partnership benefits",
      ],
      details: `
        <p class="mb-4">The B2B Partner model represents a strategic collaboration where your organization works alongside ours to deliver enhanced value to your joint client base. This partnership goes beyond simple referrals, focusing on deep integration and co-creation of solutions that address complex business needs.</p>
        <p class="mb-4">As a B2B Partner, you gain access to our trusted network and established reputation, while bringing your specialized services to create comprehensive offerings for clients. The collaboration can involve various forms of integration, from joint marketing campaigns to technical solutions that enhance your existing service portfolio.</p>
        <p class="mb-4">We provide technical integration support to ensure seamless collaboration between our platforms and yours. This partnership model is particularly suitable for organizations that want to expand their service capabilities without significant infrastructure investment.</p>
        <p class="mb-4">You receive revenue sharing benefits along with priority customer support, joint marketing opportunities, and access to our extensive training resources. Strategic partnership benefits include co-developed marketing campaigns, shared lead generation initiatives, and collaborative approaches to solving complex client challenges.</p>
        <p class="mb-4">The B2B Partner model encourages innovation and creativity, allowing both parties to explore new business opportunities and revenue streams together. It's ideal for businesses looking to diversify their offerings and create synergistic value for their clients.</p>
      `,
    },
  ];

  const stats = [
    { icon: FaUsers, value: "500+", label: "Active Partners" },
    { icon: FaChartLine, value: "₹50L+", label: "Monthly Payouts" },
    { icon: FaAward, value: "98%", label: "Partner Satisfaction" },
    { icon: FaRocket, value: "150%", label: "Average Growth" },
  ];

  const featureIcons = [
    FaCoins,
    FaNetworkWired,
    FaSync,
    FaChartBar,
    FaThumbsUp,
    FaHandshake,
    FaUserFriends,
    FaMoneyBillWave,
    FaLayerGroup,
    FaBullseye,
    FaTachometerAlt,
    FaBell,
    FaGraduationCap,
    FaUsersCog,
    FaLink,
    FaShieldAlt,
    FaLock,
    FaEye,
    FaFileAlt,
    FaClipboardList,
    FaDatabase,
    FaServer,
    FaCloud,
    FaCogs,
    FaTools,
    FaRocketIcon,
    FaStarIcon,
    FaHeart,
    FaSmile,
    FaSmileBeam,
    FaSmileWink,
  ];

  return (
    <>
      <style>{`
        .wwu-page {
          background-color: #f0f5f0;
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .btn-primary {
          background-color: #16a34a;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover {
          background-color: #15803d;
          box-shadow: 0 4px 14px rgba(22,163,74,0.35);
        }
        .badge-yellow {
          background-color: #fde047;
          color: #713f12;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          display: inline-block;
        }
        .wwu-card {
          background: #ffffff;
          border: 1.5px solid #111827;
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .wwu-card:hover {
          box-shadow: 4px 4px 0px #111827;
          transform: translate(-2px, -2px);
        }
        .wwu-card-active {
          border-color: #ca8a04 !important;
          box-shadow: 4px 4px 0px #ca8a04 !important;
        }
        .wwu-stat-card {
          background: #ffffff;
          border: 1.5px solid #111827;
          border-radius: 14px;
          transition: box-shadow 0.2s ease;
        }
        .wwu-stat-card:hover {
          box-shadow: 3px 3px 0 #111827;
        }
        .wwu-detail-panel {
          background: #ffffff;
          border: 1.5px solid #111827;
          border-radius: 14px;
        }
        .wwu-benefits-panel {
          background: #f0fdf4;
          border: 1.5px solid #111827;
          border-radius: 14px;
        }
        .wwu-benefit-item {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 10px;
        }
        .wwu-feature-tile {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 10px;
        }
        .wwu-cta-section {
          background-color: #14532d;
          border: 2px solid #111827;
          border-radius: 20px;
        }
        .btn-cta-white {
          background: #ffffff;
          color: #15803d;
          border-radius: 10px;
          font-weight: 600;
          border: 1.5px solid #111827;
          transition: background-color 0.2s ease;
        }
        .btn-cta-white:hover { background-color: #f0fdf4; }
        .btn-cta-yellow {
          background: #fde047;
          color: #111827;
          border-radius: 10px;
          font-weight: 600;
          border: 1.5px solid #111827;
          transition: background-color 0.2s ease;
        }
        .btn-cta-yellow:hover { background-color: #fbbf24; }
        .btn-cta-green {
          background: #16a34a;
          color: #ffffff;
          border-radius: 10px;
          font-weight: 600;
          border: 1.5px solid #111827;
          transition: background-color 0.2s ease;
        }
        .btn-cta-green:hover { background-color: #15803d; }
        .wwu-tab {
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          background: #ffffff;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 10px 22px;
        }
        .wwu-tab.active {
          background: #fde047;
          border-color: #ca8a04;
          color: #111827;
          font-weight: 700;
        }
        .wwu-tab:hover:not(.active) {
          border-color: #16a34a;
          color: #16a34a;
        }
        .wwu-hero-badge {
          background: #fde047;
          border: 1.5px solid #ca8a04;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          color: #713f12;
          font-weight: 700;
        }
        .wwu-divider {
          border: none;
          border-top: 1.5px solid #d1d5db;
          margin: 0;
        }
        .wwu-heading-accent::after {
          content: '';
          display: block;
          width: 56px;
          height: 3px;
          background: #16a34a;
          margin: 10px auto 0;
          border-radius: 2px;
        }
        @media (max-width: 640px) {
          .wwu-card { border-radius: 12px; }
          .wwu-cta-section { border-radius: 14px; padding: 2rem 1.25rem; }
          .wwu-tab { padding: 8px 14px; font-size: 0.85rem; }
        }
      `}</style>

      <div className="wwu-page min-h-screen py-20 relative font-sans">
        <div className="relative z-10">
          <section className="pt-10 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="wwu-hero-badge mb-8 mx-auto w-fit"
              >
                <FaLightbulb className="text-yellow-700" />
                <span>Partnership Opportunities</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Work With Us
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Join our growing network of successful partners and unlock new
                opportunities for growth, collaboration, and financial success.
                Choose the partnership model that fits your goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="wwu-stat-card p-6 text-center">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <hr className="wwu-divider mx-6 mb-2" />

          <section className="py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 wwu-heading-accent">
                  Choose Your Partnership Path
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4">
                  Explore our three partnership models and find the perfect fit
                  for your business goals and expertise.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 h-full">
                {partnerships.map((partnership, index) => (
                  <motion.div
                    key={partnership.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -6 }}
                    className={`flex flex-col wwu-card relative cursor-pointer ${
                      activePartnership === index ? "wwu-card-active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePartnership(index);
                    }}
                  >
                    <div className="absolute top-4 left-4 z-10">
                      <span className="badge-yellow">FEATURED</span>
                    </div>

                    {activePartnership === index && (
                      <div className="absolute top-4 right-4 z-10 w-6 h-6 bg-yellow-400 border border-yellow-600 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-yellow-800 text-xs" />
                      </div>
                    )}

                    <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 border-b border-gray-200">
                      <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-md">
                        <partnership.icon className="text-2xl text-white" />
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow p-6">
                      <div className="text-center mb-4 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {partnership.title}
                        </h3>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href =
                              partnership.id === 1
                                ? "/work-with-us/business-development-partnership"
                                : partnership.id === 2
                                  ? "/work-with-us/remisorship"
                                  : "/work-with-us/b2b-partnership";
                          }}
                          className="btn-primary w-full px-6 py-3 flex items-center justify-center gap-2 text-sm"
                        >
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
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <hr className="wwu-divider mx-6 my-2" />

          <section className="py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 wwu-heading-accent">
                  Detailed Partnership Overview
                </h2>
                <p className="text-lg text-gray-500 max-w-3xl mx-auto mt-4">
                  Dive deeper into the specifics of each partnership model
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-3 justify-center mb-10">
                {partnerships.map((p, idx) => (
                  <button
                    key={idx}
                    className={`wwu-tab ${activePartnership === idx ? "active" : ""}`}
                    onClick={() => setActivePartnership(idx)}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="wwu-detail-panel p-6 sm:p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      {partnerships[activePartnership].icon &&
                        React.createElement(
                          partnerships[activePartnership].icon,
                          { className: "text-2xl text-white" }
                        )}
                    </div>
                    <div>
                      <span className="badge-yellow mb-1 block">FEATURED</span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {partnerships[activePartnership].title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: partnerships[activePartnership].details,
                    }}
                  ></div>

                  <hr className="wwu-divider my-6" />

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {partnerships[activePartnership].features.map(
                        (feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="wwu-benefits-panel p-6 sm:p-8"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center wwu-heading-accent">
                    Partnership Benefits
                  </h3>

                  <div className="space-y-4 mt-6">
                    {partnerships[activePartnership].benefits.map(
                      (benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * idx }}
                          className="wwu-benefit-item flex items-start gap-4 p-4"
                        >
                          <div className="mt-0.5">
                            <div className="w-8 h-8 bg-yellow-100 border border-yellow-300 rounded-full flex items-center justify-center flex-shrink-0">
                              <FaStarIcon className="text-yellow-600 text-sm" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {benefit}
                            </h4>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {featureIcons.slice(0, 6).map((Icon, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * idx }}
                        className="wwu-feature-tile flex flex-col items-center justify-center p-4"
                      >
                        <Icon className="text-green-600 text-2xl mb-1" />
                        <span className="text-xs text-center text-gray-500"></span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <hr className="wwu-divider mx-6 my-2" />

          <section className="py-16 sm:py-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="wwu-cta-section p-8 sm:p-12 text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="mb-4 flex justify-center">
                    <span className="badge-yellow text-sm px-4 py-1">
                      GET STARTED TODAY
                    </span>
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  >
                    Ready to Partner with Us?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl mb-8 text-white/90"
                  >
                    Take the first step towards a profitable partnership. Our
                    team is ready to discuss opportunities and help you get
                    started on your journey to success.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <a
                      href="tel:+918696060387"
                      className="btn-cta-white px-8 py-4 flex items-center justify-center gap-3 group"
                    >
                      <FaPhoneAlt />
                      Call Us Now
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="mailto:support@fiscalforum.in"
                      className="btn-cta-yellow px-8 py-4 flex items-center justify-center gap-3 group"
                    >
                      <FaEnvelope />
                      Send Inquiry
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="https://wa.me/918696060387"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta-green px-8 py-4 flex items-center justify-center gap-3 group"
                    >
                      <FaWhatsapp />
                      Chat on WhatsApp
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-white/30"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90 text-sm">
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-yellow-300" />
                        <span>+91 8696060387</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-yellow-300" />
                        <span>support@fiscalforum.in</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGlobe className="text-yellow-300" />
                        <span>www.fiscalforum.in</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href="https://wa.me/918696060387"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-14 h-14 bg-green-600 hover:bg-green-700 border-2 border-gray-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group hover:cursor-pointer">
              <svg
                className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.686z" />
              </svg>
            </button>
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default WorkWithUsPage;
