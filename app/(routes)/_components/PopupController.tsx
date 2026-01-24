"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

// --- POPUP COMPONENTS ---

const ResearchPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="w-full max-w-[450px] bg-white border-t-8 border-emerald-600 shadow-2xl relative">
    <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-slate-100"><X size={20} /></button>
    <div className="p-8 flex flex-col items-center text-center">
      <div className="bg-emerald-100 p-3 mb-4"><FileText className="w-8 h-8 text-emerald-700" /></div>
      <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight text-balance">Why Settle for Guesses?</h2>
      <p className="text-slate-500 font-medium mb-6">Institutional-grade Equity, Pre-Market, and Thematic Reports at your fingertips.</p>
      <div className="w-full space-y-2 mb-8 text-left">
        {['Equity Reports', 'Pre-Market Research', 'Thematic Insights'].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700 border-l-4 border-emerald-500 pl-3 py-1">{item}</div>
        ))}
      </div>
      {/* Added onClick={onClose} to close dialog on redirect */}
      <Link href="/reports" onClick={onClose} className="w-full bg-emerald-600 text-white py-4 font-black hover:bg-emerald-700 transition-colors text-center uppercase">
        Get the Alpha Edge
      </Link>
    </div>
  </div>
);

const LoanPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="w-full max-w-[450px] bg-slate-900 border-t-8 border-amber-500 shadow-2xl relative">
    <button onClick={onClose} className="absolute top-2 right-2 p-1 text-white hover:bg-white/10"><X size={20} /></button>
    <div className="p-8 text-center text-white">
      <h2 className="text-3xl font-black mb-2 italic">CAPITAL ON DEMAND</h2>
      <p className="text-amber-400 font-bold mb-6 text-sm uppercase tracking-[0.2em]">Fast Approval • Minimum Paperwork</p>
      <div className="bg-white/5 border border-white/10 p-6 mb-8 text-left">
        <p className="text-slate-400 text-xs mb-4 uppercase">Application Status: Ready</p>
        <div className="h-2 bg-slate-800 w-full mb-6">
          <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1 }} className="h-full bg-amber-500" />
        </div>
        <p className="text-sm font-medium">Fill the application and get approved in moments.</p>
      </div>
      {/* Added onClick={onClose} to close dialog on redirect */}
      <Link href="/services/loan" onClick={onClose} className="w-full bg-amber-500 text-slate-950 py-4 font-black hover:bg-amber-400 text-center block uppercase">
        GET APPROVED NOW
      </Link>
    </div>
  </div>
);

const StockPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="w-full max-w-[450px] bg-white border-t-8 border-blue-600 shadow-2xl relative">
    <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-slate-100"><X size={20} /></button>
    <div className="p-8 text-center">
      <h2 className="text-2xl font-black text-blue-900 mb-4 uppercase">CONNECT TO THE GIANTS</h2>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {['Angel One', 'Motilal Oswal', 'Alice Blue', 'Nuvama', 'Upstox', 'Choice'].map((partner) => (
          <div key={partner} className="border border-slate-200 p-2 text-[10px] font-bold text-center bg-slate-50 uppercase">{partner}</div>
        ))}
      </div>
      <p className="text-slate-600 text-sm mb-6 font-medium">Trade with India&apos;s most trusted brokers via Fiscal Forum.</p>
      {/* Added onClick={onClose} to close dialog on redirect */}
      <Link href="/services/stock-investment" onClick={onClose} className="w-full bg-blue-600 text-white py-4 font-black tracking-widest block uppercase">
        START TRADING
      </Link>
    </div>
  </div>
);

const MutualFundPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="w-full max-w-[450px] bg-white shadow-2xl overflow-hidden relative">
    <button onClick={onClose} className="absolute top-4 right-4 z-20 p-1 hover:bg-slate-100"><X size={20} /></button>
    <div className="flex h-3 w-full">
      <div className="flex-1 bg-red-500" /><div className="flex-1 bg-blue-500" /><div className="flex-1 bg-green-500" /><div className="flex-1 bg-yellow-500" /><div className="flex-1 bg-purple-500" />
    </div>
    <div className="p-8 bg-gradient-to-br from-slate-50 to-white">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text text-transparent italic leading-tight uppercase">MAXIMIZE RETURNS</h2>
        <p className="text-slate-400 text-xs font-bold uppercase mt-1">Diversified Portfolio Access</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['Choice', 'Nuvama', 'NJ Wealth', 'Prudent'].map((mf) => (
          <span key={mf} className="px-3 py-1 text-[10px] font-black border-2 border-slate-900 uppercase">{mf}</span>
        ))}
      </div>
      {/* Added onClick={onClose} to close dialog on redirect */}
      <Link href="/services/mutual-funds" onClick={onClose} className="w-full bg-slate-950 text-white py-5 font-black flex items-center justify-center gap-3 group uppercase">
        INVEST IN TOP FUNDS <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </Link>
    </div>
  </div>
);

// --- CONTROLLER LOGIC ---

export default function PopupController() {
  const [activePopup, setActivePopup] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePopup((current) => {
        if (current === null) {
          return Math.floor(Math.random() * 4);
        }
        return current;
      });
    }, 180000);
    return () => clearInterval(interval);
  }, []);

  const closePopup = () => setActivePopup(null);

  return (
    <AnimatePresence>
      {activePopup !== null && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {activePopup === 0 && <ResearchPopup onClose={closePopup} />}
            {activePopup === 1 && <LoanPopup onClose={closePopup} />}
            {activePopup === 2 && <StockPopup onClose={closePopup} />}
            {activePopup === 3 && <MutualFundPopup onClose={closePopup} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}