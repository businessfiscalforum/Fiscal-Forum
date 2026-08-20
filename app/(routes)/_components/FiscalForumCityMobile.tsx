"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  Rocket, 
  Zap, 
  Banknote, 
  ShieldCheck, 
  Activity, 
  Coins, 
  ChevronRight 
} from "lucide-react";

const clickAreas = [
  {
    id: "equity",
    link: "/services/learn-earn/equity-etfs",
    style: { left: "20%", top: "18%", width: "16%", height: "28%" },
  },
  {
    id: "commodities",
    link: "/services/learn-earn/commodities",
    style: { left: "10%", top: "54%", width: "22%", height: "28%" },
  },
  {
    id: "mtf",
    link: "/services/learn-earn/mtf",
    style: { left: "12%", top: "8%", width: "10%", height: "46%" },
  },
  {
    id: "fiscal",
    link: "/services/learn-earn",
    style: { left: "42%", top: "30%", width: "20%", height: "30%" },
  },
  {
    id: "mutual",
    link: "/services/mutual-funds",
    style: { left: "62%", top: "18%", width: "16%", height: "24%" },
  },
  {
    id: "fo",
    link: "/services/learn-earn/futures-options",
    style: { left: "62%", top: "44%", width: "20%", height: "24%" },
  },
  {
    id: "ipo",
    link: "/services/learn-earn/ipo",
    style: { left: "78%", top: "12%", width: "16%", height: "34%" },
  },
  {
    id: "insurance",
    link: "/services/insurance",
    style: { left: "76%", top: "58%", width: "18%", height: "28%" },
  },
  {
    id: "bonds",
    link: "/services/govt-bonds-and-fd",
    style: { left: "50%", top: "60%", width: "14%", height: "22%" },
  },
];

const mobileCategories = [
  {
    id: "equity",
    label: "Equity",
    link: "/services/learn-earn/equity-etfs",
    icon: "/images/cat-equity.png",
  },
  {
    id: "mutual",
    label: "Mutual Funds",
    link: "/services/mutual-funds",
    icon: "/images/cat-mutual.png",
  },
  {
    id: "ipo",
    label: "IPO",
    link: "/services/learn-earn/ipo",
    icon: "/images/cat-ipo.png",
  },
  {
    id: "mtf",
    label: "MTF",
    link: "/services/learn-earn/mtf",
    icon: "/images/cat-mtf.png",
  },
  {
    id: "bonds",
    label: "Bonds",
    link: "/services/govt-bonds-and-fd",
    icon: "/images/cat-bonds.png",
  },
  {
    id: "insurance",
    label: "Insurance",
    link: "/services/insurance",
    icon: "/images/cat-insurance.png",
  },
  {
    id: "fo",
    label: "F&O Trading",
    link: "/services/learn-earn/futures-options",
    icon: "/images/cat-fo.png",
  },
  {
    id: "commodities",
    label: "Commodities",
    link: "/services/learn-earn/commodities",
    icon: "/images/cat-commodities.png",
  },
];

export default function FiscalForumCityMobile() {
  return (
    <>
    <section className="relative overflow-hidden bg-[#F4FBF7] py-12 border-b border-black">
      <div className="relative mx-auto max-w-xl px-4 select-none">
        
        {/* Heading */}
        <div className="text-center flex flex-col items-center max-w-xs mx-auto">
          <h2 className="text-[20px] font-extrabold text-black uppercase tracking-tight leading-snug">
            Step into the world of finance
          </h2>
          <p className="text-[11px] font-bold text-gray-500 mt-2.5 leading-relaxed max-w-[280px] mx-auto">
            Choose a building to explore. Discover products, understand opportunities, and find what fits your financial goals.
          </p>
        </div>

        {/* Main Isometric Map Card */}
        <div className="mt-6 border border-black bg-white p-3 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.04)] max-w-[340px] mx-auto">
          <div className="relative bg-gray-50/50 rounded-xl border border-black/5 p-1.5 overflow-hidden">
            <Image
              src="/fiscal-forum-solutions.png"
              alt="Fiscal Forum City"
              width={800}
              height={450}
              priority
              className="h-auto w-full rounded-lg object-contain"
            />
            
            {/* Responsive Clickable Overlays for each building */}
            {clickAreas.map((area) => (
              <Link
                key={area.id}
                href={area.link}
                className="absolute cursor-pointer rounded-xl bg-transparent hover:bg-[#1FA463]/8 active:bg-[#1FA463]/15 transition-all duration-200 z-20 border border-transparent hover:border-[#1FA463]/10"
                style={area.style as React.CSSProperties}
                aria-label={`Go to ${area.id}`}
              />
            ))}
          </div>
        </div>

        {/* Section divider label */}
        <h3 className="text-center text-[12px] font-extrabold text-black uppercase tracking-widest mt-8 mb-4">
          Explore by Category
        </h3>

        {/* 2-Column Category Grid */}
        <div className="grid grid-cols-2 gap-3 px-1 max-w-[340px] mx-auto">
          {mobileCategories.map((spot) => (
            <Link
              key={spot.id}
              href={spot.link}
              className="flex items-center justify-between bg-white border border-black/5 rounded-xl p-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-black/10 active:scale-98 transition-all"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                {/* Cartoon Category Illustration */}
                <div className="w-10 h-10 relative shrink-0">
                  <Image
                    src={spot.icon}
                    alt={spot.label}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[9px] font-extrabold text-black uppercase tracking-tight leading-tight truncate">
                    {spot.label}
                  </span>
                  <span className="text-[8px] font-bold text-[#1FA463] uppercase tracking-wider mt-0.5">
                    Explore Now
                  </span>
                </div>
              </div>
              <ChevronRight size={10} className="text-gray-400 shrink-0 ml-1.5" />
            </Link>
          ))}
        </div>

        {/* Confidence Trust Footer Badge */}
        <div className="flex items-center justify-center gap-1.5 mt-8 text-[10px] font-bold text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1FA463] shrink-0" />
          <span>Learn, invest and grow with confidence.</span>
        </div>

      </div>
    </section>

    {/* CTA Banner */}
    <div className="bg-white border-b border-black py-10 w-full text-center flex items-center justify-center select-none">
      <p className="text-sm font-bold text-black px-4 max-w-xs mx-auto leading-relaxed">
        While others are building wealth, what&apos;s stopping you? Start Clicking{" "}
        <Link
          href="/services/learn-earn"
          className="inline-block bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black px-2.5 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 active:translate-y-0 mx-1 align-middle text-xs"
        >
          here
        </Link>
        .
      </p>
    </div>
    </>
  );
}
