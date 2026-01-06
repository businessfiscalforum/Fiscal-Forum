"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LiveUserPulse() {
  const [count, setCount] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => Math.max(85, prev + (Math.floor(Math.random() * 5) - 2)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-4 sm:top-auto sm:bottom-6 sm:right-6 z-[9999] pointer-events-none"
    >
      <div className="
        flex items-center gap-2 sm:gap-3 
        bg-emerald-950/90 backdrop-blur-md 
        px-3 py-1.5 sm:px-4 sm:py-2 rounded-full 
        border border-emerald-400/30 
        shadow-xl
      ">
        <div className="relative flex h-2 w-2 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-emerald-500"></span>
        </div>

        <div className="flex flex-col">
          <span className="text-white text-[10px] sm:text-[13px] font-bold leading-none">
            {count} Online
          </span>
          <span className="text-emerald-400 text-[7px] sm:text-[9px] uppercase tracking-widest font-black mt-0.5 sm:mt-1">
            Live Pulse
          </span>
        </div>
      </div>
    </motion.div>
  );
}