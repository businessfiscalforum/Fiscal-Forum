"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const hotspots = [
  {
    id: "equity",
    label: "Equity",
    title: "Global Equity Markets",
    description: "Compound wealth and diversify across key industries.",
    position: { left: "18%", top: "28%" },
    color: "#10B981",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-400",
    link: "/services/stock-investment/equity-etfs",
    icon: "📈",
  },
  {
    id: "commodities",
    label: "Commodities",
    title: "Commodities Hub",
    description:
      "Hedge inflation and diversify with precious metals & gold.",
    position: { left: "9%", bottom: "22%" },
    color: "#3B82F6",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-400",
    link: "/services/stock-investment/commodities",
    icon: "🪙",
  },
  {
    id: "mtf",
    label: "MTF",
    title: "Margin Trade Funding",
    description:
      "Leverage broker funding to increase purchasing power.",
    position: { left: "6%", top: "10%" },
    color: "#F59E0B",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-400",
    link: "/services/stock-investment/mtf",
    icon: "⚡",
  },
  {
    id: "fiscal",
    label: "Fiscal Forum",
    title: "Fiscal Forum HQ",
    description: "Central intelligent hub for all wealth solutions.",
    position: { left: "45%", top: "38%" },
    color: "#1FA463",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-500",
    link: "/services/stock-investment",
    icon: "🏛️",
  },
  {
    id: "mutual",
    label: "Mutual Funds",
    title: "Mutual Funds",
    description:
      "Diverse professionally managed portfolios for long-term growth.",
    position: { right: "30%", top: "28%" },
    color: "#6366F1",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-400",
    link: "/services/mutual-funds",
    icon: "📊",
  },
  {
    id: "fo",
    label: "F&O Trading",
    title: "F&O Trading Desk",
    description: "Hedge risks and capture short-term movements.",
    position: { right: "24%", top: "55%" },
    color: "#F97316",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-400",
    link: "/services/stock-investment/futures-options",
    icon: "🎯",
  },
  {
    id: "ipo",
    label: "IPO",
    title: "IPO Ascension Tower",
    description: "Invest early in high-potential company listings.",
    position: { right: "7%", top: "14%" },
    color: "#A855F7",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-400",
    link: "/services/stock-investment/ipo",
    icon: "🚀",
  },
  {
    id: "insurance",
    label: "Insurance",
    title: "Insurance Fortress",
    description: "Secure and shield your family from financial risk.",
    position: { right: "12%", bottom: "12%" },
    color: "#EF4444",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
    link: "/services/insurance",
    icon: "🛡️",
  },
  {
    id: "bonds",
    label: "Bonds",
    title: "Bond Vault",
    description:
      "Stable fixed-income assets focused on safety & preservation.",
    position: { right: "33%", bottom: "24%" },
    color: "#14B8A6",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-400",
    link: "/services/govt-bonds-and-fd",
    icon: "🏦",
  },
];

export default function FiscalForumCity() {
  const [activeSpot, setActiveSpot] = useState<string | null>(null);

  return (
    <>
      <section className="relative overflow-hidden bg-[#F4FBF7] py-16 border-b border-black">
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          {/* Heading */}
          <div className="mb-12 text-center flex flex-col items-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
              Step into the world of finance
            </h2>
            <p className="text-sm sm:text-base font-semibold text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Choose a building to explore. Discover products, understand opportunities, and find what fits your financial goals.
            </p>
          </div>

          {/* Main Diagram */}
          <div className="relative overflow-hidden rounded-3xl border border-black bg-white p-4 md:p-6 shadow-lg">
            {/* Image with overlay dimming when a spot is active */}
            <div className="relative bg-gray-50/50 rounded-2xl border border-black p-2 md:p-4 overflow-hidden">
              <Image
                src="/fiscal-forum-solutions.png"
                alt="Fiscal Forum City"
                width={1800}
                height={1000}
                priority
                className={`h-auto w-full rounded-xl object-contain transition-all duration-500 ${activeSpot ? "brightness-[0.65]" : "brightness-100"
                  }`}
              />

              {/* Glow spotlight effect when a hotspot is active */}
              <AnimatePresence>
                {activeSpot && (
                  <motion.div
                    key={activeSpot}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle 180px at ${(() => {
                        const spot = hotspots.find(
                          (s) => s.id === activeSpot
                        );
                        if (!spot) return "50% 50%";
                        const pos = spot.position;
                        const x =
                          "left" in pos
                            ? pos.left
                            : `calc(100% - ${pos.right})`;
                        const y =
                          "top" in pos
                            ? pos.top
                            : `calc(100% - ${pos.bottom})`;
                        return `${x} ${y}`;
                      })()
                        }, rgba(255,255,255,0.35) 0%, transparent 100%)`,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* HOTSPOTS */}
              {hotspots.map((spot) => {
                const isActive = activeSpot === spot.id;
                const tooltipGoesLeft =
                  "right" in spot.position &&
                  parseFloat(spot.position.right || "50") < 50;

                return (
                  <div
                    key={spot.id}
                    className="absolute z-20"
                    style={spot.position as React.CSSProperties}
                    onMouseEnter={() => setActiveSpot(spot.id)}
                    onMouseLeave={() => setActiveSpot(null)}
                  >
                    <div className="group relative flex items-center justify-center">
                      {/* Outer pulse ring */}
                      <span
                        className={`absolute w-10 h-10 rounded-full transition-all duration-300 ${isActive
                          ? "scale-100 opacity-100 animate-ping"
                          : "scale-50 opacity-0"
                          }`}
                        style={{
                          backgroundColor: spot.color,
                          animationDuration: "1.5s",
                        }}
                      />

                      {/* Static glow ring */}
                      <span
                        className={`absolute w-12 h-12 rounded-full transition-all duration-500 ${isActive
                          ? "scale-100 opacity-30"
                          : "scale-50 opacity-0"
                          }`}
                        style={{
                          backgroundColor: spot.color,
                        }}
                      />

                      {/* Interactive dot / label */}
                      <motion.span
                        layout
                        className={`
                        relative z-10
                        cursor-pointer
                        border-2
                        border-black
                        rounded-xl
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        select-none
                        transition-all
                        duration-300
                        whitespace-nowrap
                        ${isActive
                            ? "px-3 py-2 shadow-sm scale-110 -translate-y-1"
                            : "bg-green-200 hover:bg-green-300 text-black px-2 py-1.5 shadow-sm"
                          }
                      `}
                        style={{
                          backgroundColor: isActive ? spot.color : undefined,
                          color: isActive ? "#fff" : "#000",
                        }}
                      >
                        <span>
                          {isActive && <span className="mr-1">{spot.icon}</span>}
                          {spot.label}
                        </span>
                      </motion.span>

                      {/* Tooltip Card */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 8 }}
                            transition={{
                              duration: 0.25,
                              ease: "easeOut",
                            }}
                            className={`
                            pointer-events-auto
                            absolute
                            top-1/2
                            -translate-y-1/2
                            z-30
                            w-64
                            rounded-2xl
                            border-2
                            border-black
                            bg-white
                            p-4
                            shadow-md
                            ${tooltipGoesLeft
                                ? "right-full mr-4"
                                : "left-full ml-4"
                              }
                          `}
                          >
                            {/* Accent bar */}
                            <div
                              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                              style={{ backgroundColor: spot.color }}
                            />

                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-lg">{spot.icon}</span>
                              <h4 className="text-xs font-bold text-black uppercase tracking-tight">
                                {spot.title}
                              </h4>
                            </div>

                            <p className="text-[10px] font-bold text-gray-500 leading-relaxed mb-3">
                              {spot.description}
                            </p>

                            <Link
                              href={spot.link}
                              className="
                              inline-flex items-center gap-1
                              text-[9px] font-bold uppercase tracking-wider
                              px-3 py-1.5
                              rounded-lg
                              border border-black
                              shadow-sm
                              transition-all duration-200
                               hover:-translate-y-0.5
                              hover:shadow-sm
                               active:translate-y-0
                              active:shadow-sm
                            "
                              style={{
                                backgroundColor: spot.color,
                                color: "#fff",
                              }}
                            >
                              Explore →
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Banner */}
          <AnimatePresence>
            {activeSpot && (
              <motion.div
                key={activeSpot}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 flex items-center gap-4 rounded-2xl border border-black bg-white p-4 shadow-sm"
              >
                <span className="text-2xl">
                  {hotspots.find((s) => s.id === activeSpot)?.icon}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-black uppercase tracking-tight">
                    {hotspots.find((s) => s.id === activeSpot)?.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    {
                      hotspots.find((s) => s.id === activeSpot)
                        ?.description
                    }
                  </p>
                </div>
                <Link
                  href={
                    hotspots.find((s) => s.id === activeSpot)?.link ||
                    "/"
                  }
                  className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-black shadow-sm bg-[#1FA463] text-white transition-all  hover:-translate-y-0.5 hover:shadow-sm"
                >
                  Learn More →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-white border-b border-black py-12 w-full text-center flex items-center justify-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black px-6 sm:px-12 max-w-7xl mx-auto leading-relaxed">
          While others are building wealth, what&apos;s stopping you? Start Clicking{" "}
          <Link
            href="/services/stock-investment"
            className="inline-block bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 active:translate-y-0 mx-1.5 align-middle"
          >
            here
          </Link>
          .
        </p>
      </div>
    </>
  );
}