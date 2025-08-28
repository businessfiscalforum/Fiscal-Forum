"use client";
import React, { useState } from "react";
import {
  FaBuilding,
  FaUsers,
  FaHandshake,
  FaArrowRight,
  FaStar,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaChartLine,
  FaAward,
  FaRocket,
  FaLightbulb,
  FaWhatsapp,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

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
      title: "Remisorship",
      icon: FaUsers,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100",
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-30">
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-20 px-6">
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
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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
              </div> */}
            </div>
          </section>

          {/* Partnership Cards */}
          <section className="py-8 px-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                {partnerships.map((partnership, index) => (
                  <div
                    key={partnership.id}
                    className={`flex flex-col bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl`}
                  >
                    {/* Card Header with Gradient Background */}
                    <div
                      className={`relative h-48 flex items-center justify-center ${partnership.bgColor} bg-opacity-20`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br opacity-20"></div>
                      <div
                        className={`relative z-10 w-24 h-24 bg-gradient-to-r ${partnership.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <partnership.icon className="text-3xl text-white" />
                      </div>
                    </div>

                    {/* Card Body - Flex grow to fill space */}
                    <div className="flex flex-col flex-grow p-8">
                      <div className="text-center mb-6 flex-grow">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {partnership.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {partnership.description}
                        </p>
                      </div>

                      {/* CTA Button Container - Pushes button to bottom */}
                      <div className="mt-auto">
                        <Link
                          href={
                            partnership.id === 1
                              ? "/work-with-us/business-development-partnership"
                              : partnership.id === 2
                                ? "/work-with-us/remisorship"
                                : "/work-with-us/b2b-partnership"
                          }
                          className={`block w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-4 px-6 rounded-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:from-emerald-700 hover:to-teal-800 hover:shadow-lg`}
                        >
                          Learn More
                          <FaArrowRight className="inline-block ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </Link>
                      </div>
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

                <div className="relative z-10 text-center">
                  <h2 className="text-4xl font-bold mb-6 text-white">
                    Ready to Partner with Us?
                  </h2>
                  <p className="text-xl mb-8 text-white/90">
                    Take the first step towards a profitable partnership. Our
                    team is ready to discuss opportunities and help you get
                    started on your journey to success.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Call Button */}
                    <a
                      href="tel:+918696060387"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 group"
                    >
                      <FaPhoneAlt />
                      Call Us Now
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Email Button */}
                    <a
                      href="mailto:support@fiscalforum.in"
                      className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-white hover:text-gray-900 transition-all duration-300 group"
                    >
                      <FaEnvelope />
                      Send Inquiry
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href="https://wa.me/918696060387"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 group"
                    >
                      <FaWhatsapp />
                      Chat on WhatsApp
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-emerald-400" />
                        <span>+91 8696060387</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-emerald-400" />
                        <span>support@fiscalforum.in</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGlobe className="text-emerald-400" />
                        <span>www.fiscalforum.in</span>
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
