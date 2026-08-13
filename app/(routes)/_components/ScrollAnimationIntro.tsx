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
  const [step, setStep] = useState(6); // Starts at step 6 (falling buildings)
  
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Step 1: Sentinel Intersection to lock body scroll and trigger active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger if entering from the bottom of the screen (scrolling down)
        const isEnteringFromBottom = entry.boundingClientRect.top > 100;

        if (entry.isIntersecting && !isActive && isEnteringFromBottom) {
          setIsActive(true);
          setStep(6);
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

  // Step 2: Trigger transition completion when reaching step 8
  useEffect(() => {
    if (isActive && step === 8) {
      document.body.style.overflow = "";
      onComplete();
    }
  }, [step, isActive, onComplete]);

  // Automate Step 6 -> Step 7 transition after building cascade completes (5 seconds)
  useEffect(() => {
    if (isActive && step === 6) {
      const timer = setTimeout(() => {
        setStep(7);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step, isActive]);

  // Automate Step 7 -> Step 8 transition after showing final welcome message (3 seconds)
  useEffect(() => {
    if (isActive && step === 7) {
      const timer = setTimeout(() => {
        setStep(8);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, isActive]);

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
              backgroundColor: "rgba(12, 31, 22, 0.98)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center select-none font-sans overflow-hidden"
          >
            {/* Skip Button */}
            {step < 8 && (
              <button
                onClick={handleSkip}
                className="absolute top-6 right-6 z-[100] rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white shadow-lg active:scale-95"
              >
                Skip Intro ⏭️
              </button>
            )}

            {/* CORE WORKSPACE CONTAINER */}
            <motion.div
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{
                opacity: 1,
                scale: 0.78,
              }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="relative w-full max-w-[1200px] aspect-[1024/667] max-h-[85vh] rounded-none overflow-hidden border border-white/10 shadow-2xl bg-black translate-y-[8vh]"
            >
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

              {/* FALLING BUILDINGS */}
              {BUILDINGS.map((building, i) => (
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

              {/* FINAL TEXT CALL (Step 7) */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
