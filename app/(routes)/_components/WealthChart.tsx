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
        <h3 className="text-lg font-black text-black tracking-tight">
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
        <div className="lg:col-span-8 w-full h-[260px] relative">
          {/* Y Axis Label (Rotated) */}
          <div className="hidden sm:block absolute left-[-15px] top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-gray-400 tracking-wider">
            Projected Corpus (₹)
          </div>
          
          <div className="pl-1 sm:pl-6 h-full w-full">
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
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={10}
                  fontWeight="bold"
                  tickFormatter={formatYAxis}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number | string) => [formatCurrency(Number(value)), ""]}
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

        {/* Metrics Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Start Early Card */}
          <div className="bg-[#F4FBF7] border border-emerald-100 rounded-2xl p-4 flex flex-col items-start w-full shadow-[0px_4px_15px_rgba(0,0,0,0.01)]">
            <span className="text-[26px] font-black text-[#1FA463] leading-none">
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
            <span className="text-[26px] font-black text-gray-500 leading-none">
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
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          ⏳
        </div>
        <p className="text-xs font-bold text-gray-700">
          Delay costs you <span className="text-[#1FA463] font-black">{formatCurrency(opportunityCost)}</span> & <span className="text-[#1FA463] font-black">8 years</span> of freedom.
        </p>
      </div>
    </div>
  );
}
