"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, UserPlus, FileText, CheckCircle2, 
  MessageSquare, CreditCard, Landmark, PieChart, X 
} from "lucide-react";

// Helper to map types to Icons
const IconMap = ({ type }: { type: string }) => {
  const iconClass = "w-4 h-4 sm:w-5 sm:h-5";
  switch (type) {
    case 'research': case 'report': case 'premium': return <FileText className={iconClass} />;
    case 'signup': case 'referral': case 'business': case 'partner': return <UserPlus className={iconClass} />;
    case 'news': case 'equity': case 'pre_market': return <TrendingUp className={iconClass} />;
    case 'whatsapp': return <MessageSquare className={iconClass} />;
    case 'credit_card': return <CreditCard className={iconClass} />;
    case 'loan': return <Landmark className={iconClass} />;
    case 'portfolio': return <PieChart className={iconClass} />;
    default: return <CheckCircle2 className={iconClass} />;
  }
};

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
  { text: "New referral partner joined the platform", type: "referral" },
  { text: "Business development partner onboarded", type: "business" },
  { text: "B2B research collaboration initiated", type: "b2b" },
  { text: "Premium research access unlocked by users", type: "premium" },
  { text: "Equity model portfolio reviewed", type: "portfolio" },
  { text: "Morning market brief published", type: "pre_market" },
  { text: "Research-backed stock watchlist updated", type: "equity" },
  { text: "Institutional-style research note released", type: "research" },
  { text: "New WhatsApp investor community member joined", type: "whatsapp" }
];

export default function FomoStack() {
  const [messages, setMessages] = useState<{ id: number; text: string; type: string }[]>([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (index < FOMO_MESSAGES.length) {
      const interval = setInterval(() => {
        setMessages((prev) => {
          const newMessage = { id: Date.now(), ...FOMO_MESSAGES[index] };
          return [...prev, newMessage].slice(-3);
        });
        setIndex((prev) => prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    } 
    
    if (index >= FOMO_MESSAGES.length) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setMessages([]), 1000);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // Function to manually dismiss a message
  const dismissMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  if (!isVisible && messages.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-[9998] flex flex-col gap-2 sm:gap-3 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.5 } }}
            className="
              relative overflow-hidden
              w-[260px] xs:w-[300px] sm:w-[340px] md:w-[380px] 
              min-h-[60px] sm:h-[70px]
              bg-white/90 backdrop-blur-sm 
              border-l-4 border-emerald-500/50 
              border-y border-r 
              rounded-xl shadow-md
              flex items-center px-3 sm:px-5 gap-3 sm:gap-4
              pointer-events-auto
            "
          >
            {/* Small Close Button */}
            <button 
              onClick={() => dismissMessage(msg.id)}
              className="absolute top-1 right-1 p-1 text-slate-400 hover:text-emerald-600 transition-colors z-10"
              aria-label="Close"
            >
              <X size={12} />
            </button>

            {/* Shimmer Effect */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent skew-x-12 pointer-events-none"
            />

            <div className="bg-emerald-50 p-1.5 sm:p-2 rounded-lg text-emerald-600/70 shrink-0 pointer-events-none">
              <IconMap type={msg.type} />
            </div>

            <div className="flex flex-col overflow-hidden pointer-events-none">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-emerald-600/40 font-bold italic">
                Platform Update
              </span>
              <p className="text-[11px] sm:text-sm font-medium text-slate-600 leading-tight">
                {msg.text}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}