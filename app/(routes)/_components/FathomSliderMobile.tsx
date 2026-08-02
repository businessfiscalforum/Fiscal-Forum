"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Target, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./fathom.css";

const SLIDES_DATA = [
  { id: 0, label: "Report" },
  { id: 1, label: "Mutual Funds" },
  { id: 2, label: "Stocks" },
  { id: 3, label: "Credit Cards" },
  { id: 4, label: "Insurance" },
];

export default function FathomSliderMobile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
    swiperRef?.autoplay?.stop();
  }, [swiperRef]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    swiperRef?.autoplay?.start();
  }, [swiperRef]);

  // Keyboard accessibility for lightbox close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox]);

  return (
    <div className="relative w-full overflow-hidden bg-[#F4F1EA] pt-20 border-b border-black select-none">
      {/* Ledger Grid Background */}
      <div className="ledger-bg opacity-65 absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* Swiper Viewport with Dynamic Auto Height */}
      <Swiper
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        autoHeight={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full relative z-10"
      >
        {/* SLIDE 0: REPORT */}
        <SwiperSlide>
          <div className="w-full flex flex-col px-5 pb-6 relative">
            {/* Header Title & Advisor cutout section */}
            <div className="relative w-full min-h-[210px] mt-2 mb-4 pt-2">
              {/* Word pops titles stacked left */}
              <div className="w-[65%] flex flex-col items-start gap-2.5 z-20 relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-[#FFDE21] text-black font-extrabold text-[22px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10"
                >
                  Unlock
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 1.2 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="bg-[#FFDE21] text-black font-extrabold text-[22px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10"
                >
                  institutional-quality
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: -0.6 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="bg-[#FFDE21] text-black font-extrabold text-[22px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10"
                >
                  research at your
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 1.8 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                  className="bg-[#FFDE21] text-black font-extrabold text-[22px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10"
                >
                  fingertips
                </motion.div>
              </div>

              {/* Pointing Advisor Cutout on the right */}
              <div className="absolute right-0 bottom-[-22px] w-[110px] z-10 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="relative w-full"
                >
                  <Image
                    src="/fathom/advisor-cutout.png"
                    alt="Fiscal Forum Advisor"
                    width={100}
                    height={175}
                    className="object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.3)] relative z-30 mx-auto"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {/* Custom Oval Shadow under advisor feet */}
                  <div className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-[70px] h-[5px] bg-black/15 rounded-[50%] blur-[3px] z-10" />
                </motion.div>
              </div>
            </div>

            {/* Research Report Card Tilted */}
            <div className="w-full flex justify-center py-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2.2 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onClick={openLightbox}
                className="relative cursor-zoom-in active:scale-[0.99] transition-transform border border-black/5 shadow-[0_20px_45px_rgba(0,0,0,0.16)] rounded-lg overflow-hidden max-w-[250px] w-full bg-white"
              >
                <Image
                  src="/fathom/research-report.png"
                  alt="Equity Research Report Preview"
                  width={250}
                  height={340}
                  className="w-full h-auto object-contain"
                  priority
                />
                <span className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center pointer-events-none shadow-md">
                  <Search size={14} />
                </span>
              </motion.div>
            </div>

            {/* Callout Cards stacked below */}
            <div className="flex flex-col gap-2 mt-4 w-full max-w-[340px] mx-auto">
              {[
                {
                  icon: <Search className="w-3.5 h-3.5 text-[#1FA463]" />,
                  text: <>We don&apos;t limit to <span className="text-[#1FA463] font-bold">Research</span>,</>,
                },
                {
                  icon: <TrendingUp className="w-3.5 h-3.5 text-[#1FA463]" />,
                  text: <>we help you <span className="text-[#1FA463] font-bold">park your money</span></>,
                },
                {
                  icon: <Target className="w-3.5 h-3.5 text-[#1FA463]" />,
                  text: <>in <span className="text-[#1FA463] font-bold">right assets</span> according to</>,
                },
                {
                  icon: <User className="w-3.5 h-3.5 text-[#1FA463]" />,
                  text: <>your <span className="text-[#1FA463] font-bold">needs</span>.</>,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + idx * 0.15 }}
                  className="flex items-center bg-white border border-black/5 rounded-2xl py-2.5 px-4 shadow-[0_6px_14px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-emerald-50 border border-black/5 flex items-center justify-center mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-gray-800 text-sm font-semibold tracking-tight leading-snug">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Orange Button */}
            <div className="mt-6 text-center">
              <p className="font-bold text-[#0B0B0B] text-sm mb-1.5">
                Want your market research report?
              </p>
              <Link
                href="/reports"
                className="inline-flex w-full max-w-[280px] py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_5px_15px_rgba(255,85,0,0.32)] items-center justify-center gap-2 active:scale-98 transition-all"
              >
                CLICK HERE <span className="text-sm font-light">→</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 1: MUTUAL FUNDS */}
        <SwiperSlide>
          <div className="w-full flex flex-col px-5 pb-6 relative">
            <div className="flex flex-col items-start gap-2 pt-4 px-1">
              <div className="bg-[#1FA463] text-white font-extrabold text-[20px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10 -rotate-[1.2deg]">
                Mutual Funds
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold mt-2.5 px-1 leading-relaxed max-w-[320px]">
              Turn disciplined investing into lasting wealth with expertly selected mutual funds in top AMCs.
            </p>

            {/* Stacking Images Vertically for Mobile */}
            <div className="flex flex-col gap-3 mt-3 w-full max-w-[320px] mx-auto">
              <div className="border-t-4 border-[#1FA463] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 rotate-[0.6deg] max-w-[280px] mx-auto w-full">
                <Image
                  src="/fathom/mutual-fund-amcs.png"
                  alt="Mutual Funds AMCs"
                  width={280}
                  height={150}
                  className="w-full rounded-lg object-contain"
                />
              </div>
              <div className="border-t-4 border-[#1FA463] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 -rotate-[0.6deg] max-w-[220px] mx-auto w-full">
                <Image
                  src="/fathom/fund-recommendations.png"
                  alt="Fund Recommendations"
                  width={220}
                  height={240}
                  className="w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-bold text-[#0B0B0B] text-sm mb-1.5">
                Want recommendations like these?
              </p>
              <Link
                href="/services/mutual-funds"
                className="inline-flex w-full max-w-[280px] py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_5px_15px_rgba(255,85,0,0.32)] items-center justify-center gap-2 active:scale-98 transition-all"
              >
                CLICK HERE <span className="text-sm font-light">→</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2: STOCKS */}
        <SwiperSlide>
          <div className="w-full flex flex-col px-5 pb-6 relative">
            <div className="flex flex-col items-start gap-2 pt-4 px-1">
              <div className="bg-[#C9A227] text-white font-extrabold text-[20px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10 rotate-[0.8deg]">
                Stocks
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold mt-2.5 px-1 leading-relaxed max-w-[320px]">
              Discover high-potential stocks backed by in-depth research and market insights. Invest with confidence, not speculation.
            </p>

            <div className="flex flex-col gap-3 mt-3 w-full max-w-[320px] mx-auto">
              <div className="border-t-4 border-[#C9A227] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 -rotate-[1deg] max-w-[280px] mx-auto w-full">
                <Image
                  src="/fathom/stocks-bull.png"
                  alt="Stocks Bull"
                  width={280}
                  height={190}
                  className="w-full rounded-lg object-contain"
                />
              </div>
              <div className="border-t-4 border-[#C9A227] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 rotate-[0.8deg] max-w-[280px] mx-auto w-full">
                <Image
                  src="/fathom/stocks-recommend.png"
                  alt="Stock breakdown"
                  width={280}
                  height={200}
                  className="w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-bold text-[#0B0B0B] text-sm mb-1.5">
                Want recommendations like this?
              </p>
              <Link
                href="/services/stock-investment"
                className="inline-flex w-full max-w-[280px] py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_5px_15px_rgba(255,85,0,0.32)] items-center justify-center gap-2 active:scale-98 transition-all"
              >
                CLICK HERE <span className="text-sm font-light">→</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3: CREDIT CARDS */}
        <SwiperSlide>
          <div className="w-full flex flex-col px-5 pb-6 relative">
            <div className="flex flex-col items-start gap-2 pt-4 px-1">
              <div className="bg-[#4C7A96] text-white font-extrabold text-[20px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10 -rotate-[0.6deg]">
                Credit Cards
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold mt-2.5 px-1 leading-relaxed max-w-[320px]">
              Unlock exclusive rewards, smarter spending, and greater financial flexibility. Find the right credit card tailored to your needs in minutes.
            </p>

            <div className="flex flex-col gap-3 mt-3 w-full max-w-[320px] mx-auto">
              <div className="border-t-4 border-[#4C7A96] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 rotate-[1.5deg] max-w-[140px] mx-auto w-full">
                <Image
                  src="/fathom/credit-card.png"
                  alt="Credit Card"
                  width={140}
                  height={190}
                  className="w-full rounded-lg object-contain"
                />
              </div>
              <div className="border-t-4 border-[#4C7A96] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 -rotate-[0.8deg] max-w-[280px] mx-auto w-full">
                <Image
                  src="/fathom/credit-cards-grid.png"
                  alt="Credit cards lineup"
                  width={280}
                  height={200}
                  className="w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-bold text-[#0B0B0B] text-sm mb-1.5">
                Want to save money using credit card?
              </p>
              <Link
                href="/services/credit-card"
                className="inline-flex w-full max-w-[280px] py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_5px_15px_rgba(255,85,0,0.32)] items-center justify-center gap-2 active:scale-98 transition-all"
              >
                CLICK HERE <span className="text-sm font-light">→</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 4: INSURANCE */}
        <SwiperSlide>
          <div className="w-full flex flex-col px-5 pb-6 relative">
            <div className="flex flex-col items-start gap-2 pt-4 px-1">
              <div className="bg-[#B5654F] text-white font-extrabold text-[20px] px-3.5 py-1.5 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,0.18)] border border-black/10 rotate-[1deg]">
                Insurance
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold mt-2.5 px-1 leading-relaxed max-w-[320px]">
              Life is unpredictable, but your financial future doesn&apos;t have to be. Find the right insurance plan for every stage of life.
            </p>

            <div className="flex flex-col gap-3 mt-3 w-full max-w-[320px] mx-auto">
              <div className="border-t-4 border-[#B5654F] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 -rotate-[1deg] max-w-[280px] mx-auto w-full">
                <Image
                  src="/fathom/insurance-family.png"
                  alt="Insurance Family"
                  width={280}
                  height={190}
                  className="w-full rounded-lg object-contain"
                />
              </div>
              <div className="border-t-4 border-[#B5654F] bg-white p-2 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-black/5 rotate-[0.6deg] max-w-[280px] mx-auto w-full">
                <Image
                  src="/fathom/insurance-recommend.png"
                  alt="Insurance types"
                  width={280}
                  height={200}
                  className="w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-bold text-[#0B0B0B] text-sm mb-1.5">
                Don&apos;t want to risk your family life?
              </p>
              <Link
                href="/services/insurance"
                className="inline-flex w-full max-w-[280px] py-3 bg-[#FF5500] hover:bg-[#E64D00] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_5px_15px_rgba(255,85,0,0.32)] items-center justify-center gap-2 active:scale-98 transition-all"
              >
                CLICK HERE <span className="text-sm font-light">→</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Swipe Instructions & Pagination Dots */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center py-4 select-none">
        <p className="text-center text-[11px] font-semibold text-gray-500 max-w-[250px] mb-3">
          Swipe or tap the arrows to see what&apos;s inside the report.
        </p>
        <div className="flex gap-2.5 items-center">
          {SLIDES_DATA.map((slide) => (
            <button
              key={slide.id}
              onClick={() => {
                swiperRef?.slideTo(slide.id);
              }}
              className={`h-2 transition-all duration-300 rounded-full ${
                currentIndex === slide.id ? "bg-[#1FA463] w-4.5" : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to ${slide.label} slide`}
            />
          ))}
        </div>
      </div>

      {/* Section Divider Line */}
      <div className="w-full h-px bg-black z-10 relative" aria-hidden="true" />

      {/* Closing CTA */}
      <div className="relative z-10 w-full bg-white py-12 px-6 flex flex-col items-center select-none border-b border-black">
        <div className="w-full max-w-[320px] mx-auto flex flex-col items-center">
          {/* Visual Image */}
          <div className="w-full flex justify-center mb-6">
            <Image
              src="/fathom/research-reports.png"
              alt="Research Reports Showcase"
              width={320}
              height={240}
              className="w-full max-w-[260px] h-auto object-contain rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-black/5"
            />
          </div>
          
          {/* Text Contents */}
          <div className="text-center flex flex-col items-center">
            <h3 className="text-base font-extrabold text-black leading-snug tracking-tight">
              Everything you need to invest smarter, all in one place.
            </h3>
            <p className="text-xs font-bold text-gray-500 mt-2.5 leading-relaxed">
              Get actionable market insights, in-depth research, and reports personalized to your investment goals.
            </p>
            
            <Link
              href="/reports"
              className="inline-flex w-full max-w-[280px] py-3.5 mt-6 bg-[#1FA463] hover:bg-[#157847] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[0_5px_15px_rgba(31,164,99,0.32)] items-center justify-center gap-2 active:scale-98 transition-all"
            >
              CLICK HERE <span className="text-sm font-light">→</span>
            </Link>
            
            <p className="text-[10px] font-bold text-gray-400 mt-4">
              To get your research backed reports ...
            </p>
          </div>
        </div>
      </div>

      {/* Left/Right Arrow Overlays */}
      {currentIndex > 0 && (
        <button
          onClick={() => swiperRef?.slidePrev()}
          className="absolute left-2.5 top-[38%] transform -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-black/10 flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} className="text-gray-700 mr-0.5" />
        </button>
      )}
      {currentIndex < SLIDES_DATA.length - 1 && (
        <button
          onClick={() => swiperRef?.slideNext()}
          className="absolute right-2.5 top-[38%] transform -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-black/10 flex items-center justify-center shadow-md active:scale-90 transition-transform"
          aria-label="Next slide"
        >
          <ChevronRight size={18} className="text-gray-700 ml-0.5" />
        </button>
      )}

      {/* Lightbox Enlargement (Framer Motion) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={closeLightbox} />

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="relative z-[160] max-w-full max-h-[85vh] w-auto h-auto flex flex-col items-center"
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-9 h-9 bg-white text-black border border-black/5 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
              <Image
                src="/fathom/research-report.png"
                alt="Enlarged Research Report"
                width={560}
                height={800}
                className="rounded-lg max-h-[75vh] object-contain shadow-2xl bg-white p-1"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
