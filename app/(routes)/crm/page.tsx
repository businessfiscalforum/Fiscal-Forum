"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserDetailContext } from "../../../context/UserDetailContext";
import ReferralSection from "../_components/ReferralSection";

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

export default function FinanceLeadsPage() {
  const { userDetail } = useContext(UserDetailContext);
  const USER_ID = userDetail?.id;

  const [data, setData] = useState<dataType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [selected, setSelected] = useState<string>("Loan");
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
    <div className="min-h-screen bg-green-50 !pt-30 p-4 md:p-6">
      <ReferralSection />
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-700 mt-5 mb-6 text-center">
        Finance Leads
      </h1>

      {/* ✅ Stats Section */}
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

      {/* ✅ Responsive Navbar (scrollable on small screens) */}
      <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center mb-6 h-16 space-x-4 px-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`whitespace-nowrap px-3 md:px-4 py-2 relative text-base md:text-lg font-medium transition-colors duration-300
              ${
                selected === opt
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-emerald-500"
              }`}
          >
            {opt}
            {selected === opt && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-emerald-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {selected && (
        <div>
          {/* Create Lead Button */}
          <div className="mb-6 text-center">
            <Link href={`/crm/${selected.toLowerCase().replace(/\s+/g, "-")}`}>
              <button className="bg-green-600 text-white text-base md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-green-700">
                Create Lead
              </button>
            </Link>
          </div>

          {/* ✅ Responsive Table */}
          <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto">
            <h2 className="text-lg md:text-xl font-semibold text-green-700 mb-4">
              {selected} Leads
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <table className="w-full border-collapse text-sm md:text-base">
                <thead>
                  <tr className="bg-green-100 text-left">
                    <th className="p-2 md:p-3 border-b">Subtype</th>
                    <th className="p-2 md:p-3 border-b">Name</th>
                    <th className="p-2 md:p-3 border-b">Mobile</th>
                    <th className="p-2 md:p-3 border-b">Email</th>
                    <th className="p-2 md:p-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row) => (
                      <tr key={row.id} className="hover:bg-green-50">
                        <td className="p-2 md:p-3 border-b">{row.subType}</td>
                        <td className="p-2 md:p-3 border-b">{row.name}</td>
                        <td className="p-2 md:p-3 border-b">{row.mobile}</td>
                        <td className="p-2 md:p-3 border-b">{row.email}</td>
                        <td className="p-2 md:p-3 border-b">{row.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
