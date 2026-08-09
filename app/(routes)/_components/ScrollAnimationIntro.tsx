"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ScrollAnimationIntroProps {
  onComplete: () => void;
}

// Bounding box definitions using CSS clip-path inset (top, right, bottom, left)
const BUILDINGS = [
  { name: "Central", clipPath: "inset(0% 35% 0% 35%)", dustX: "50%", dustY: "88%" },
  { name: "MTF", clipPath: "inset(0% 82% 45% 0%)", dustX: "9%", dustY: "58%" },
  { name: "Equity", clipPath: "inset(0% 65% 45% 18%)", dustX: "27%", dustY: "42%" },
  { name: "Commodities", clipPath: "inset(55% 65% 0% 0%)", dustX: "22%", dustY: "98%" },
  { name: "Bonds", clipPath: "inset(55% 24% 0% 58%)", dustX: "68%", dustY: "86%" },
  { name: "Mutual", clipPath: "inset(0% 18% 45% 65%)", dustX: "72%", dustY: "35%" },
  { name: "IPO", clipPath: "inset(0% 0% 45% 82%)", dustX: "90.5%", dustY: "38%" },
  { name: "FO", clipPath: "inset(45% 18% 25% 65%)", dustX: "78.5%", dustY: "65%" },
  { name: "Insurance", clipPath: "inset(55% 0% 0% 76%)", dustX: "90.5%", dustY: "98%" },
];

export default function ScrollAnimationIntro({ onComplete }: ScrollAnimationIntroProps) {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0); // Steps 0 to 8
  
  const sentinelRef = useRef<HTMLDivElement>(null);
  const accumulatedDelta = useRef(0);
  const touchStartY = useRef(0);
  const stepRef = useRef(step);
  stepRef.current = step;
  const lastStepChangeTime = useRef(0);

  // Lock scroll for 2 seconds on every step change
  useEffect(() => {
    lastStepChangeTime.current = Date.now();
  }, [step]);
  
  const SCROLL_THRESHOLD = 240; // Scroll delta threshold to trigger step change

  // Step 1: Sentinel Intersection to lock body scroll and trigger active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true);
          setStep(0);
          document.body.style.overflow = "hidden";
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  // Clean up body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Step 2: Handle mouse wheel and touch gestures inside active transition
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (stepRef.current >= 6) return;
      
      const now = Date.now();
      if (now - lastStepChangeTime.current < 1000) {
        accumulatedDelta.current = 0;
        return;
      }
      
      accumulatedDelta.current += e.deltaY;

      if (accumulatedDelta.current >= SCROLL_THRESHOLD) {
        accumulatedDelta.current = 0;
        setStep((prev) => {
          if (prev >= 8) return 8;
          return prev + 1;
        });
      } else if (accumulatedDelta.current <= -SCROLL_THRESHOLD) {
        accumulatedDelta.current = 0;
        setStep((prev) => Math.max(0, prev - 1));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (stepRef.current >= 6) return;

      const now = Date.now();
      if (now - lastStepChangeTime.current < 1000) {
        accumulatedDelta.current = 0;
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;

      if (Math.abs(deltaY) > 10) {
        accumulatedDelta.current += deltaY * 1.5;
        touchStartY.current = currentY;

        if (accumulatedDelta.current >= SCROLL_THRESHOLD) {
          accumulatedDelta.current = 0;
          setStep((prev) => {
            if (prev >= 8) return 8;
            return prev + 1;
          });
        } else if (accumulatedDelta.current <= -SCROLL_THRESHOLD) {
          accumulatedDelta.current = 0;
          setStep((prev) => Math.max(0, prev - 1));
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isActive]);

  // Step 3: Trigger transition completion
  useEffect(() => {
    if (step === 8) {
      document.body.style.overflow = "";
      onComplete();
    }
  }, [step, onComplete]);

  // Automate Step 6 -> Step 7 transition after building cascade completes
  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        setStep(7);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Automate Step 7 -> Step 8 transition after showing final welcome message
  useEffect(() => {
    if (step === 7) {
      const timer = setTimeout(() => {
        setStep(8);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleSkip = () => {
    document.body.style.overflow = "";
    onComplete();
  };

  return (
    <>
      {/* Sentinel that hooks scroll trigger */}
      <div ref={sentinelRef} className="h-4 w-full bg-transparent" />

      <AnimatePresence>
        {isActive && step <= 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backgroundColor: step >= 2 ? "rgba(12, 31, 22, 0.98)" : "rgba(12, 31, 22, 0)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center select-none font-sans overflow-hidden"
          >
            {/* Skip Button */}
            {step < 6 && (
              <button
                onClick={handleSkip}
                className="absolute top-6 right-6 z-[100] rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white shadow-lg active:scale-95"
              >
                Skip Intro ⏭️
              </button>
            )}

            {/* Scroll Navigation Helper */}
            {step < 6 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-1.5 pointer-events-none opacity-90 animate-pulse">
                <span className="px-4 py-1.5 bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded-full shadow-lg">
                  Scroll down to know more
                </span>
                <div className="flex gap-1.5 mt-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        step >= i + 1 ? "bg-emerald-400 scale-125" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}



            {/* Clouds Overlay sweep */}
            <AnimatePresence>
              {step >= 1 && step <= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 pointer-events-none z-30"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, 50, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-[#E5F5EC]/60 filter blur-[90px]"
                  />
                  <motion.div
                    animate={{
                      scale: [1.1, 0.9, 1.1],
                      x: [0, -60, 0],
                      y: [0, 40, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[20%] w-[75vw] h-[75vw] rounded-full bg-white/70 filter blur-[100px]"
                  />
                  <motion.div
                    animate={{
                      scale: [0.9, 1.1, 0.9],
                      x: [0, 40, 0],
                      y: [0, 50, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                    className="absolute top-[20%] left-[25%] w-[60vw] h-[60vw] rounded-full bg-[#D8F0E3]/70 filter blur-[110px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ======================================================== */}
            {/* 2. CORE WORKSPACE CONTAINER (Steps 2 to 7)                */}
            {/* ======================================================== */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{
                  opacity: 1,
                  scale: step >= 6 ? 0.78 : 1.0,
                }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="relative w-full max-w-[1200px] aspect-[1024/667] max-h-[85vh] rounded-none overflow-hidden border border-white/10 shadow-2xl bg-black translate-y-[8vh]"
              >
                {/* Static Monument Background (fades to black at Step 6) */}
                <motion.div
                  animate={step === 6 ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-0"
                >
                    <Image
                      src="/monument.jpg"
                      alt="Fiscal Forum Headquarters"
                      fill
                      priority
                      className="w-full h-full object-fill"
                    />
                </motion.div>

                {/* Final Complete City fading in on Step 7 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={step >= 7 ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <Image
                    src="/empire.jpg"
                    alt="Fiscal Forum City"
                    fill
                    priority
                    className="w-full h-full object-fill"
                  />
                </motion.div>

                {/* ======================================================== */}
                {/* 3. BUSINESSMAN WALK ANIMATION (Step 3 to 7)              */}
                {/* ======================================================== */}
                {step >= 3 && step <= 5 && (
                  <motion.div
                    initial={{
                      left: "50%",
                      x: "-50%",
                      top: "78%",
                      width: "14%",
                      opacity: 0,
                    }}
                    animate={{
                      left: "50%",
                      x: "-50%",
                      top: step >= 4 ? "53%" : "70%",
                      width: step >= 4 ? "6.5%" : "12.5%",
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 45,
                      damping: 15,
                    }}
                    className="absolute aspect-[469/787] z-20 pointer-events-none"
                  >
                    <div className="relative w-full h-full">
                      {/* Businessman image */}
                      <Image
                        src="/businessman-nobg.png"
                        alt="Businessman"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ======================================================== */}
                {/* 4. DIALOGUE BUBBLES                                      */}
                {/* ======================================================== */}
                
                {/* Dialogue 1: Businessman (Step 4 & 5) */}
                <AnimatePresence>
                  {step === 4 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-100%" }}
                      animate={{ scale: 1, opacity: 1, x: "-50%", y: "-100%" }}
                      exit={{ scale: 0, opacity: 0, x: "-50%", y: "-100%" }}
                      transition={{ type: "spring", stiffness: 120, damping: 12 }}
                      className="absolute z-40 bg-white text-gray-900 border border-gray-100 shadow-2xl rounded-2xl px-6 py-4.5 max-w-[360px] text-center"
                      style={{
                        left: "50%",
                        top: "51%",
                        transformOrigin: "bottom center",
                      }}
                    >
                      <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed">
                        &quot;Kya yaar ! Pata nahin , when will I understand the Financial Markets ...&quot;
                      </p>
                      {/* Triangle Pointer */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dialogue 2: Monument Dome Replies (Step 5) */}
                <AnimatePresence>
                  {step === 5 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-100%" }}
                      animate={{ scale: 1, opacity: 1, x: "-50%", y: "-100%" }}
                      exit={{ scale: 0, opacity: 0, x: "-50%", y: "-100%" }}
                      transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
                      className="absolute z-40 bg-white text-gray-900 border border-gray-100 shadow-2xl rounded-2xl px-6 py-4.5 max-w-[360px] text-center"
                      style={{
                        left: "50%",
                        top: "22%",
                        transformOrigin: "bottom center",
                      }}
                    >
                      <p className="text-xs md:text-sm font-extrabold text-emerald-600 tracking-wider uppercase mb-1">
                        Fiscal Forum HQ
                      </p>
                      <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">
                        &quot;Koi Ni ! We have the solution for you ...&quot;
                      </p>
                      {/* Triangle Pointer */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ======================================================== */}
                {/* 5. FALLING BUILDINGS (Step 6 & 7)                        */}
                {/* ======================================================== */}
                {step >= 6 &&
                  BUILDINGS.map((building, i) => (
                    <motion.div
                      key={building.name}
                      initial={{ y: -800, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 45,
                        damping: 14,
                        delay: i * 0.45, // slow cascading stagger step-by-step
                      }}
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{ clipPath: building.clipPath }}
                    >
                      <Image
                        src="/empire.jpg"
                        alt={building.name}
                        fill
                        className="w-full h-full object-fill"
                      />
                    </motion.div>
                  ))}



                {/* ======================================================== */}
                {/* 6. FINAL TEXT CALL (Step 7)                              */}
                {/* ======================================================== */}
                <AnimatePresence>
                  {step === 7 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-100%" }}
                      animate={{ scale: 1, opacity: 1, x: "-50%", y: "-100%" }}
                      exit={{ scale: 0, opacity: 0, x: "-50%", y: "-100%" }}
                      transition={{ type: "spring", stiffness: 110, damping: 14 }}
                      className="absolute z-40 bg-white text-gray-900 border border-gray-100 shadow-2xl rounded-2xl px-7 py-5.5 max-w-[450px] text-center"
                      style={{
                        left: "50%",
                        top: "22%",
                        transformOrigin: "bottom center",
                      }}
                    >
                      <p className="text-xs md:text-sm font-extrabold text-emerald-600 tracking-wider uppercase mb-1">
                        Welcome to Fiscal Forum
                      </p>
                      <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed animate-pulse">
                        &quot;Let&apos;s deep dive into the new world of finance like never before&quot;
                      </p>
                      {/* Triangle Pointer */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
