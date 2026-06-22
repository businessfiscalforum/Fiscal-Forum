"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, TrendingUp, Sparkles, AlertCircle } from "lucide-react";

interface ImpactComparisonProps {
  todayFinal: number;
  lateFinal: number;
  todayInvested: number;
  lateInvested: number;
}

export default function ImpactComparison({
  todayFinal,
  lateFinal,
  todayInvested,
  lateInvested,
}: ImpactComparisonProps) {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  };

  const todayMultiplier = (todayFinal / todayInvested).toFixed(1);
  const lateMultiplier = (lateFinal / lateInvested).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-black text-black uppercase tracking-tight">
          See the Real Impact of Time
        </h3>
        <p className="text-sm font-semibold text-gray-500 mt-1">
          A side-by-side look at how your wealth accumulates over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Proactive Path (Start Today) */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.02)] hover:border-emerald-500/20 transition-all">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Illustration */}
            <div className="w-36 h-36 relative flex-shrink-0 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-center p-3 overflow-hidden">
              <Image
                src="/start_today_illustration.png"
                alt="Start Today"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* Metrics & Details */}
            <div className="flex-grow space-y-4 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Proactive Path
                </span>
                <h4 className="text-xl font-black text-black mt-2">
                  Start Today (Age 27)
                </h4>
              </div>

              {/* Data List */}
              <div className="bg-[#F4FBF7] border border-emerald-50 rounded-2xl p-4 grid grid-cols-3 gap-2 text-left">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Portfolio</div>
                  <div className="text-sm font-black text-[#1FA463] mt-0.5">{formatCurrency(todayFinal)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Invested</div>
                  <div className="text-sm font-black text-black mt-0.5">{formatCurrency(todayInvested)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Multiplier</div>
                  <div className="text-sm font-black text-[#1FA463] mt-0.5 flex items-center gap-0.5">
                    {todayMultiplier}x <TrendingUp className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs font-bold text-gray-600 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA463] mt-0.5 flex-shrink-0" />
                  <span>Full Financial Freedom at Age 60</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA463] mt-0.5 flex-shrink-0" />
                  <span>Stress-Free Retirement and Calm Future</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA463] mt-0.5 flex-shrink-0" />
                  <span>Live Your Dream Lifestyle and Pursue Passions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Delayed Path (Start 10 Years Late) */}
        <div className="bg-white border border-red-100 rounded-3xl p-6 shadow-[0px_8px_30px_rgba(0,0,0,0.02)] hover:border-red-500/10 transition-all">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Illustration */}
            <div className="w-36 h-36 relative flex-shrink-0 bg-red-50/20 rounded-2xl border border-red-100 flex items-center justify-center p-3 overflow-hidden">
              <Image
                src="/start_late_illustration.png"
                alt="Start Late"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            {/* Metrics & Details */}
            <div className="flex-grow space-y-4 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Delayed Path
                </span>
                <h4 className="text-xl font-black text-black mt-2">
                  Start 10 Years Late (Age 37)
                </h4>
              </div>

              {/* Data List */}
              <div className="bg-red-50/10 border border-red-50/30 rounded-2xl p-4 grid grid-cols-3 gap-2 text-left">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Portfolio</div>
                  <div className="text-sm font-black text-red-700 mt-0.5">{formatCurrency(lateFinal)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Invested</div>
                  <div className="text-sm font-black text-black mt-0.5">{formatCurrency(lateInvested)}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Multiplier</div>
                  <div className="text-sm font-black text-red-700 mt-0.5 flex items-center gap-0.5">
                    {lateMultiplier}x <AlertCircle className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 text-xs font-bold text-gray-600 text-left">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Delayed Portfolio Growth Timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Limited Financial Choices & Lower Buffer</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Prolonged Working Years to catch up</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
