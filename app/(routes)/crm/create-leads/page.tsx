"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserDetailContext } from "../../../../context/UserDetailContext";

const options = [
  "Stock Market",
  "Mutual Funds",
  "Insurance",
  "Loan",
  "Government Bonds & FDs",
  "Savings Account",
  "Credit Cards",
];

export type dataType = {
  id: string;
  type: string | null;
  subType: string | null;
  name: string | null;
  mobile: string | null;
  email: string | null;
  status: string | null;
};

type StatsType = {
  total: number;
  accepted: number;
  rejected: number;
  pending: number;
};

export default function Refferal() {
  const { userDetail } = useContext(UserDetailContext);
  const USER_ID = userDetail?.id;

  const [data, setData] = useState<dataType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [selected, setSelected] = useState<string>("Stock Market");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchStats() {
      if (!USER_ID) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/crm?userId=${USER_ID}`
        );
        if (!res.ok) throw new Error("Failed to fetch stats");
        const leads: dataType[] = await res.json();

        const total = leads.length;
        const accepted = leads.filter((l) => l.status === "Approved").length;
        const rejected = leads.filter((l) => l.status === "Rejected").length;
        const pending = leads.filter((l) => l.status === "Pending").length;

        setStats({ total, accepted, rejected, pending });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
  }, [USER_ID]);

  useEffect(() => {
    async function fetchData() {
      if (!selected || !USER_ID) return;
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/crm?type=${encodeURIComponent(
            selected
          )}&userId=${USER_ID}`
        );

        if (!res.ok) throw new Error(`Failed to fetch leads: ${res.status}`);

        const leads = await res.json();
        setData(leads);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selected, USER_ID]);

  if (!USER_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-6">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-700 mt-5 mb-6 text-center">
        Finance Leads
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 max-w-6xl mx-auto">
        {[
          { label: "Total Requests", value: stats.total, color: "text-green-700" },
          { label: "Accepted", value: stats.accepted, color: "text-green-700" },
          { label: "Rejected", value: stats.rejected, color: "text-red-600" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "Credits", value: stats.accepted, color: "text-blue-600" },
          { label: "Value (₹)", value: `₹ ${stats.accepted * 10}`, color: "text-purple-600" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-4 sm:p-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">{item.label}</p>
            <p className={`text-xl md:text-2xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Responsive Tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide justify-center">
          <div className="flex space-x-1 min-w-max">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`px-4 py-2 text-sm md:text-base font-medium rounded-lg whitespace-nowrap transition-colors
                  ${
                    selected === opt
                      ? "bg-green-600 text-white shadow"
                      : "bg-white text-gray-600 hover:bg-green-50"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {selected && (
        <div>
          {/* Create Lead Button */}
          <div className="mb-6 text-center">
            <Link href={`/crm/${selected.toLowerCase().replace(/\s+/g, "-")}`}>
              <button className="bg-green-600 text-white text-base md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-green-700 transition-colors">
                Create Lead
              </button>
            </Link>
          </div>

          {/* Responsive Table */}
          <div className="bg-white shadow-md rounded-2xl p-4 overflow-hidden">
            <h2 className="text-lg md:text-xl font-semibold text-green-700 mb-4">
              {selected} Leads
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-green-100 text-left">
                      <th className="p-3 text-xs md:text-sm font-semibold">Subtype</th>
                      <th className="p-3 text-xs md:text-sm font-semibold">Name</th>
                      <th className="p-3 text-xs md:text-sm font-semibold">Mobile</th>
                      <th className="p-3 text-xs md:text-sm font-semibold">Email</th>
                      <th className="p-3 text-xs md:text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((row) => (
                      <tr key={row.id} className="hover:bg-green-50">
                        <td className="p-3 text-xs md:text-sm">{row.subType}</td>
                        <td className="p-3 text-xs md:text-sm">{row.name}</td>
                        <td className="p-3 text-xs md:text-sm">{row.mobile}</td>
                        <td className="p-3 text-xs md:text-sm">{row.email}</td>
                        <td className="p-3 text-xs md:text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            row.status === "Approved" 
                              ? "bg-green-100 text-green-800" 
                              : row.status === "Rejected" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No leads found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}