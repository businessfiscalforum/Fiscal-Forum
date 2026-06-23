"use client";

import React, { useState } from "react";
import { User, Wallet, TrendingUp, Clock } from "lucide-react";
import WealthChart from "./WealthChart";
import ImpactComparison from "./ImpactComparison";


export default function WealthSimulator() {
  const [age, setAge] = useState<number>(27);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(25000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [stepUp, setStepUp] = useState<number>(8);

  const calculateProjection = () => {
    const data: { age: number; todayCorpus: number; lateCorpus: number }[] = [];
    
    const yearsToday = 60 - age;
    const yearsLate = Math.max(0, yearsToday - 10);
    
    let todayCorpus = 0;
    let todayInvested = 0;
    let currentMonthlyToday = monthlyInvestment;
    
    let lateCorpus = 0;
    let lateInvested = 0;
    let currentMonthlyLate = monthlyInvestment;

    const todayCorpusHistory: Record<number, number> = { [age]: 0 };
    const lateCorpusHistory: Record<number, number> = {};

    // Initialize late history with 0s for the first 10 years
    for (let a = age; a <= Math.min(60, age + 10); a++) {
      lateCorpusHistory[a] = 0;
    }

    // Start Today compounding Math
    for (let y = 1; y <= yearsToday; y++) {
      for (let m = 1; m <= 12; m++) {
        todayCorpus = (todayCorpus + currentMonthlyToday) * (1 + (expectedReturn / 12 / 100));
        todayInvested += currentMonthlyToday;
      }
      todayCorpusHistory[age + y] = todayCorpus;
      currentMonthlyToday *= (1 + (stepUp / 100));
    }

    // Start Late compounding Math
    for (let y = 1; y <= yearsLate; y++) {
      for (let m = 1; m <= 12; m++) {
        lateCorpus = (lateCorpus + currentMonthlyLate) * (1 + (expectedReturn / 12 / 100));
        lateInvested += currentMonthlyLate;
      }
      lateCorpusHistory[age + 10 + y] = lateCorpus;
      currentMonthlyLate *= (1 + (stepUp / 100));
    }

    // Generate chart data coordinates year by year
    for (let a = age; a <= 60; a++) {
      data.push({
        age: a,
        todayCorpus: Math.round(todayCorpusHistory[a] ?? todayCorpus),
        lateCorpus: Math.round(lateCorpusHistory[a] ?? (a < age + 10 ? 0 : lateCorpus)),
      });
    }

    return {
      chartData: data,
      todayFinal: Math.round(todayCorpus),
      lateFinal: Math.round(lateCorpus),
      todayInvested: Math.round(todayInvested),
      lateInvested: Math.round(lateInvested),
    };
  };

  const {
    chartData,
    todayFinal,
    lateFinal,
    todayInvested,
    lateInvested,
  } = calculateProjection();

  const opportunityCost = todayFinal - lateFinal;

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* 2-Column Hero layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Side: Headline & Inputs */}
        <div className="lg:col-span-5 space-y-4 lg:space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1FA463]/10 border border-[#1FA463]/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA463] animate-pulse" />
            <span className="text-[10px] font-bold text-[#1FA463] uppercase tracking-wider">
              Wealth Simulator
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black leading-[1.1] tracking-tight">
            Your Future<br />
            Rewards<br />
            <span className="text-[#1FA463]">
              Early
            </span> Moves.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base font-semibold text-gray-500 max-w-md leading-relaxed">
            See how starting early can create life-changing wealth. Your future self will thank you.
          </p>

          {/* Four Interactive Cards */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Card 1: Age */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0px_4px_15px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#1FA463]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Age</span>
              </div>
              <div className="text-2xl font-black text-black mt-2">{age}</div>
              <input
                type="range"
                min="20"
                max="50"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1FA463] mt-3"
              />
            </div>

            {/* Card 2: Monthly Investment */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0px_4px_15px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-[#1FA463]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly Investment</span>
              </div>
              <div className="text-xl font-black text-black mt-2">
                ₹{monthlyInvestment >= 100000 ? `${(monthlyInvestment / 100000).toFixed(1)} L` : monthlyInvestment.toLocaleString("en-IN")}
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1FA463] mt-3"
              />
            </div>

            {/* Card 3: Expected Return */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0px_4px_15px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#1FA463]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Expected Return</span>
              </div>
              <div className="text-xl font-black text-black mt-2">{expectedReturn}% p.a.</div>
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1FA463] mt-3"
              />
            </div>

            {/* Card 4: Step-up */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0px_4px_15px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#1FA463]" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Step-up</span>
              </div>
              <div className="text-xl font-black text-black mt-2">{stepUp}% p.a.</div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={stepUp}
                onChange={(e) => setStepUp(Number(e.target.value))}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#1FA463] mt-3"
              />
            </div>

          </div>
        </div>

        {/* Right Side: Redesigned Chart Card */}
        <div className="lg:col-span-7">
          <WealthChart
            data={chartData}
            todayFinal={todayFinal}
            lateFinal={lateFinal}
            opportunityCost={opportunityCost}
          />
        </div>

      </div>

      {/* Side-by-side Visual comparison with metrics */}
      <ImpactComparison
        todayFinal={todayFinal}
        lateFinal={lateFinal}
        todayInvested={todayInvested}
        lateInvested={lateInvested}
      />


    </div>
  );
}
