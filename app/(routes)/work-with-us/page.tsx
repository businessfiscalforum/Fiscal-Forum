"use client";
import React, { useState } from "react";
import {
  FaBuilding,
  FaUsers,
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaChartLine,
  FaAward,
  FaRocket,
  FaLightbulb,
  FaDollarSign,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "lucide-react";

const slides = [
  {
    title: "Car Insurance",
    subtitle: "Protect Your Drive with",
    description:
      "Get comprehensive car insurance that covers accidents, theft, and third-party liabilities — drive worry-free.",
    image: "/asset1.jpg",
    gradient: "from-blue-600 via-blue-500 to-purple-600",
    path: "/car-insurance",
  },
  {
    title: "Health",
    subtitle: "Safeguard Your Health",
    description:
      "Stay financially prepared for medical emergencies with customizable health insurance plans for individuals and families.",
    image: "/asset3.jpg",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    path: "/health-insurance",
  },
  {
    title: "Life Insurance",
    subtitle: "Explore",
    description:
      "Plan for tomorrow with life insurance solutions designed to support your loved ones even in your absence.",
    image: "/asset4.jpg",
    gradient: "from-indigo-600 via-purple-500 to-pink-600",
    path: "/life-insurance",
  },
  {
    title: "Savings Account",
    subtitle: "Open a High-Interest",
    description:
      "Grow your money safely with easy access and competitive interest rates. Perfect for everyday banking needs.",
    image: "/asset5.jpg",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
    path: "/savings-account",
  },
  {
    title: "Credit Card",
    subtitle: "Power Your Spending with the Right",
    description:
      "Enjoy cashback, rewards, and easy EMIs with credit cards suited to your lifestyle and spending habits.",
    image: "/asset2.jpg",
    gradient: "from-orange-600 via-red-500 to-pink-600",
    path: "/credit-card",
  },
  {
    title: "Stock Market",
    subtitle: "Start Investing in the",
    description:
      "Tap into long-term growth by investing in equity markets. Build wealth through diversified stocks tailored to your financial goals.",
    image: "/asset6.jpg",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    path: "/stock-investment",
  },
  {
    title: "Mutual Funds",
    subtitle: "Explore",
    description:
      "Choose from a range of mutual fund schemes managed by experts to suit your investment horizon and risk appetite.",
    image: "/asset7.jpg",
    gradient: "from-cyan-600 via-blue-500 to-indigo-600",
    path: "/mutual-funds",
  },
];

const WorkWithUsPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const partnerships = [
    {
      id: 1,
      title: "Business Development Partner",
      icon: FaBuilding,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-100",
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
    },
    {
      id: 2,
      title: "Referral Partner",
      icon: FaUsers,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100",
      description:
        "Join as a Referral Partner and share opportunities with your network while earning extra benefits. It's a simple, rewarding way to grow together — connect people to trusted financial services and enjoy meaningful returns for every successful referral you make.",
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
    },
    {
      id: 3,
      title: "B2B Partner",
      icon: FaHandshake,
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-100",
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
    },
  ];

  const stats = [
    { icon: FaUsers, value: "500+", label: "Active Partners" },
    { icon: FaChartLine, value: "₹50L+", label: "Monthly Payouts" },
    { icon: FaAward, value: "98%", label: "Partner Satisfaction" },
    { icon: FaRocket, value: "150%", label: "Average Growth" },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "Business Development Partner",
      content:
        "Partnering with this company has been a game-changer for my business. The support and commission structure are exceptional.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Referral Partner",
      content:
        "The referral program is straightforward and rewarding. I've been able to generate significant passive income.",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      role: "B2B Partner",
      content:
        "Our collaboration has opened new revenue streams and helped us serve our clients better with integrated solutions.",
      rating: 5,
    },
  ];

  return (
    <>
      <div className="text-gray-800 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
        {/* Floating Background Elements */}
        {/* <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div> */}

        {/* Hero Section */}
        <section className="relative w-full h-screen overflow-hidden">
          {/* Swiper will control background image and content */}
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
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  {/* <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                /> */}
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}/80`}
                  ></div>
                </div>

                {/* Content */}
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
                      className="uppercase tracking-widest text-sm text-yellow-200 font-semibold mb-2"
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
                        Know More
                        <FaRocket className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Pagination is now styled */}
          <div className="swiper-pagination absolute bottom-8 w-full flex justify-center z-20"></div>
        </section>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-violet-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full mb-8">
                <FaLightbulb className="text-emerald-600" />
                <span className="text-emerald-700 font-semibold">
                  Partnership Opportunities
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Work With Us
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Join our growing network of successful partners and unlock new
                opportunities for growth, collaboration, and financial success.
                Choose the partnership model that fits your goals.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Cards */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Choose Your Partnership Path
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore our three partnership models and find the perfect fit
                  for your business goals and expertise.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {partnerships.map((partnership, index) => (
                  <div
                    key={partnership.id}
                    className={`group relative overflow-hidden rounded-3xl transition-all duration-500 ${
                      hoveredCard === partnership.id
                        ? "scale-105 shadow-2xl"
                        : "shadow-lg hover:shadow-xl"
                    }`}
                    onMouseEnter={() => setHoveredCard(partnership.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${partnership.bgColor} opacity-50`}
                    ></div>

                    {/* Main Card Content */}
                    <div className="relative bg-white/90 backdrop-blur-sm p-8 h-full border border-gray-100">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${partnership.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <partnership.icon className="text-3xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {partnership.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {partnership.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <FaCheckCircle className="text-emerald-500" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {partnership.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-600"
                            >
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <FaDollarSign className="text-green-500" />
                          Benefits & Rewards
                        </h4>
                        <ul className="space-y-3">
                          {partnership.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-600"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <button
                        className={`w-full bg-gradient-to-r ${partnership.color} text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 group/btn hover:cursor-pointer`}
                      >
                        Learn More
                        <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Floating Badge */}
                    {index === 1 && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  What Our Partners Say
                </h2>
                <p className="text-xl text-gray-600">
                  Hear from successful partners who have grown with us
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">
                      {testimonial.content}
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-emerald-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-6">
                    Ready to Partner with Us?
                  </h2>
                  <p className="text-xl mb-8 text-white/90">
                    Take the first step towards a profitable partnership. Our
                    team is ready to discuss opportunities and help you get
                    started on your journey to success.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 group hover:cursor-pointer">
                      <FaPhoneAlt />
                      Call Us Now
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-white hover:text-gray-900 transition-all duration-300 group hover:cursor-pointer">
                      <FaEnvelope />
                      Send Inquiry
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-emerald-400" />
                        <span>+91 9876543210</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-emerald-400" />
                        <span>partners@company.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGlobe className="text-emerald-400" />
                        <span>www.company.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* WhatsApp Float Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/91988926437"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group hover:cursor-pointer">
              <svg
                className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.686z" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default WorkWithUsPage;
