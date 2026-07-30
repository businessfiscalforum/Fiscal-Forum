"use client";

import React from "react";
import { Check, X } from "lucide-react";

interface ScenarioBreakdownTableProps {
  todayFinal: number;
  lateFinal: number;
  todayInvested: number;
  lateInvested: number;
}

export default function ScenarioBreakdownTable({
  todayFinal,
  lateFinal,
  todayInvested,
  lateInvested,
}: ScenarioBreakdownTableProps) {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(value / 100000).toFixed(2)} L`;
  };

  const todayMultiplier = todayInvested > 0 ? (todayFinal / todayInvested).toFixed(2) + "x" : "N/A";
  const lateMultiplier = lateInvested > 0 ? (lateFinal / lateInvested).toFixed(2) + "x" : "N/A";
  const opportunityCost = todayFinal - lateFinal;

  return (
    <div className="bg-white border border-black rounded-3xl p-6 md:p-10 shadow-md space-y-6">
      <h3 className="text-2xl font-bold uppercase text-black tracking-tight">
        Scenario Breakdown
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="py-4 text-left font-bold text-black uppercase tracking-wider">
                Investment Metric
              </th>
              <th className="py-4 text-center font-bold text-[#1FA463] uppercase tracking-wider">
                Start Today
              </th>
              <th className="py-4 text-center font-bold text-gray-500 uppercase tracking-wider">
                Start 10 Years Late
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 font-semibold text-gray-700">
            {/* Portfolio at 60 */}
            <tr>
              <td className="py-4 font-bold text-black uppercase text-xs">
                Portfolio at Age 60
              </td>
              <td className="py-4 text-center text-emerald-800 bg-emerald-50/20 font-bold text-base">
                {formatCurrency(todayFinal)}
              </td>
              <td className="py-4 text-center text-gray-500 bg-gray-50/20 font-bold text-base">
                {formatCurrency(lateFinal)}
              </td>
            </tr>

            {/* Total Invested */}
            <tr>
              <td className="py-4 font-bold text-black uppercase text-xs">
                Total Amount Invested
              </td>
              <td className="py-4 text-center font-bold text-black">
                {formatCurrency(todayInvested)}
              </td>
              <td className="py-4 text-center font-bold text-black">
                {formatCurrency(lateInvested)}
              </td>
            </tr>

            {/* Wealth Multiplier */}
            <tr>
              <td className="py-4 font-bold text-black uppercase text-xs">
                Wealth Multiplier
              </td>
              <td className="py-4 text-center font-bold text-emerald-700">
                {todayMultiplier}
              </td>
              <td className="py-4 text-center font-bold text-gray-600">
                {lateMultiplier}
              </td>
            </tr>

            {/* Opportunity Cost */}
            <tr>
              <td className="py-4 font-bold text-black uppercase text-xs">
                Opportunity Cost of Delay
              </td>
              <td className="py-4 text-center text-emerald-600 font-bold">
                ₹0 (None)
              </td>
              <td className="py-4 text-center text-red-600 font-bold">
                {formatCurrency(opportunityCost)}
              </td>
            </tr>

            {/* Retirement Age */}
            <tr>
              <td className="py-4 font-bold text-black uppercase text-xs">
                Retirement Age Target
              </td>
              <td className="py-4 text-center font-bold text-black">
                60 Years
              </td>
              <td className="py-4 text-center font-bold text-black">
                68 Years
              </td>
            </tr>

            {/* Dream Lifestyle */}
            <tr>
              <td className="py-4 font-bold text-black uppercase text-xs">
                Dream Lifestyle Status
              </td>
              <td className="py-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-[#1FA463] text-[#1FA463] rounded-full text-xs font-bold uppercase">
                  <Check className="w-3.5 h-3.5" />
                  Achievable
                </span>
              </td>
              <td className="py-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 border border-red-300 text-red-600 rounded-full text-xs font-bold uppercase">
                  <X className="w-3.5 h-3.5" />
                  Delayed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
