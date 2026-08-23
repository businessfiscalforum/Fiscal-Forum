"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface ChartDataPoint {
  age: number;
  todayCorpus: number;
  lateCorpus: number;
}

interface WealthChartProps {
  data: ChartDataPoint[];
  todayFinal: number;
  lateFinal: number;
  opportunityCost: number;
}

export default function WealthChart({ data, todayFinal, lateFinal, opportunityCost }: WealthChartProps) {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  };

  const formatYAxis = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    }
    return `₹${(value / 100000).toFixed(0)} L`;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.03)] flex flex-col gap-6 w-full">
      {/* Header with Legends */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 className="text-lg font-bold text-black tracking-tight">
          Wealth at Age 60
        </h3>
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1FA463]" />
            <span className="text-gray-500">If you start early</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span className="text-gray-500">If you start 10 years late</span>
          </div>
        </div>
      </div>

      {/* Chart & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Canvas */}
        <div className="lg:col-span-8 w-full flex flex-col gap-3">
          <div className="w-full h-[260px] flex items-center">
            {/* Y Axis Label (Rotated) */}
            <div
              className="hidden sm:block text-[10px] font-bold text-gray-400 tracking-wider select-none shrink-0"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                marginRight: "16px"
              }}
            >
              Projected Corpus (₹)
            </div>

            <div className="flex-1 h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="age"
                    stroke="#9ca3af"
                    fontSize={11}
                    fontWeight="bold"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `Age ${val}`}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={10}
                    fontWeight="bold"
                    tickFormatter={formatYAxis}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <Tooltip
                    formatter={(value?: number | string | readonly (number | string)[]) => [
                      formatCurrency(Number(value || 0)),
                      "",
                    ]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      color: "#000",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="todayCorpus"
                    name="Start Early"
                    stroke="#1FA463"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lateCorpus"
                    name="10 Years Late"
                    stroke="#9CA3AF"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* X Axis Label */}
          <div className="text-center text-[10px] font-bold text-gray-400 tracking-wider mt-1 select-none">
            Age (Years)
          </div>
        </div>

        {/* Metrics Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Start Early Card */}
          <div className="bg-[#F4FBF7] border border-emerald-100 rounded-2xl p-4 flex flex-col items-start w-full shadow-[0px_4px_15px_rgba(0,0,0,0.01)]">
            <span className="text-[26px] font-bold text-[#1FA463] leading-none">
              {formatCurrency(todayFinal)}
            </span>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                If you start today
              </span>
              <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-[#1FA463] text-xs font-bold">
                ↑
              </span>
            </div>
          </div>

          {/* Start Late Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-start w-full shadow-[0px_4px_15px_rgba(0,0,0,0.01)]">
            <span className="text-[26px] font-bold text-gray-500 leading-none">
              {formatCurrency(lateFinal)}
            </span>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                If you start 10 years later
              </span>
              <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs font-bold">
                ↓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delay alert banner */}
      <div className="bg-white border border-black rounded-xl p-4 md:p-5 flex items-center gap-3.5 shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-black flex items-center justify-center text-xl shadow-sm flex-shrink-0">
          ⏳
        </div>
        <p className="text-xs sm:text-sm md:text-base font-bold text-black leading-snug">
          Delay costs you <span className="text-[#1FA463] font-bold">{formatCurrency(opportunityCost)}</span> & <span className="text-[#1FA463] font-bold">8 years</span> of freedom.
        </p>
      </div>
    </div>
  );
}
