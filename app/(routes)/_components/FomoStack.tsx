"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, UserPlus, FileText, CheckCircle2 } from "lucide-react";

const FOMO_MESSAGES = [
  { text: "Pre-market equity research report released", type: "pre_market" },
  { text: "Thematic investment report just published", type: "research" },
  { text: "Daily market research note sent to subscribers", type: "newsletter" },
  { text: "Fresh equity research report downloaded", type: "research" },
  { text: "Breaking financial news updated", type: "news" },
  { text: "Weekly stock market newsletter dispatched", type: "newsletter" },
  { text: "High-conviction stock idea added", type: "equity" },
  { text: "Pre-market outlook shared with members", type: "pre_market" },
  { text: "Sector-focused thematic report unlocked", type: "research" },
  { text: "Long-term investment thesis published", type: "investment" },

  { text: "New credit card comparison report live", type: "credit_card" },
  { text: "Loan eligibility & rate analysis updated", type: "loan" },
  { text: "Smart borrowing guide accessed by users", type: "loan" },

  { text: "Equity research alert sent on WhatsApp", type: "whatsapp" },
  { text: "Pre-market report shared on WhatsApp group", type: "whatsapp" },
  { text: "Investor newsletter forwarded 50+ times", type: "newsletter" },

  { text: "New referral partner joined the platform", type: "referral" },
  { text: "Business development partner onboarded", type: "business" },
  { text: "B2B research collaboration initiated", type: "b2b" },
  { text: "Remisiership inquiry received", type: "remisiership" },
  { text: "Distribution partner signed up", type: "partner" },
  { text: "Strategic alliance discussion started", type: "business" },

  { text: "Premium research access unlocked by users", type: "premium" },
  { text: "Equity model portfolio reviewed", type: "portfolio" },
  { text: "Morning market brief published", type: "pre_market" },
  { text: "Research-backed stock watchlist updated", type: "equity" },
  { text: "Institutional-style research note released", type: "research" },
  { text: "Investor demand rising for thematic reports", type: "research" },
  { text: "New WhatsApp investor community member joined", type: "whatsapp" }
];


export default function FomoStack() {
  const [messages, setMessages] = useState<{ id: number; text: string; type: string }[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessage = { id: Date.now(), ...FOMO_MESSAGES[index] };
        return [...prev, newMessage].slice(-3);
      });
      setIndex((prev) => (prev + 1) % FOMO_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-[9998] flex flex-col gap-2 sm:gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: -20, transition: { duration: 0.2 } }}
            layout
            className="
              relative overflow-hidden
              w-[260px] xs:w-[300px] sm:w-[340px] md:w-[380px] 
              min-h-[60px] sm:h-[75px]
              bg-white/90 backdrop-blur-md 
              border-l-4 border-emerald-500 
              border-y border-r border-emerald-100/50
              rounded-xl shadow-lg
              flex items-center px-3 sm:px-5 gap-3 sm:gap-4
            "
          >
            {/* Glossy Shimmer */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent skew-x-12"
            />

            <div className="bg-emerald-100 p-1.5 sm:p-2 rounded-lg text-emerald-600 shrink-0">
              {msg.type === 'report' && <FileText className="w-4 h-4 sm:w-5 sm:h-5" />}
              {msg.type === 'signup' && <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />}
              {msg.type === 'news' && <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}
              {msg.type === 'partner' && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>

            <div className="flex flex-col overflow-hidden">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-emerald-600 font-bold">Live Activity</span>
              <p className="text-[11px] sm:text-sm font-semibold text-slate-800 leading-tight truncate sm:whitespace-normal">
                {msg.text}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}