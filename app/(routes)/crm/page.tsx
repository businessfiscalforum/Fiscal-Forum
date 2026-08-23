"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CRMHomePage() {
  // Dummy revenue data
  const data = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 },
    { month: "Aug", revenue: 0 },
    { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 },
    { month: "Nov", revenue: 0 },
    { month: "Dec", revenue: 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <span className="text-sm text-gray-500">Total revenue per sharing</span>
          <span className="text-2xl font-semibold mt-2">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <span className="text-sm text-gray-500">Revenue growth</span>
          <span className="text-2xl font-semibold mt-2 text-red-500">0 ↓</span>
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Revenue Analysis</h2>
          <select className="border rounded-md px-2 py-1 text-sm focus:outline-none">
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Yesterday</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">This week</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Revenue per sharing</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        {/* New cards */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Demat opened</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Brokerage generated</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">SIP</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">MF commission</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Insurance policy issued</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Insurance commission</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Saving account opened</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Saving account commission</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Credit card issued</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Credit card commission</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Loan disbursed</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Loan commission</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <span className="text-sm text-gray-500">Govt bonds commission</span>
          <span className="text-xl font-semibold mt-1">0</span>
        </div>
      </div>
    </div>
  );
}
