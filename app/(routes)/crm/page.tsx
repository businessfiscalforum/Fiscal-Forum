"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserDetailContext } from "../../../context/UserDetailContext";

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

  // ✅ Fetch stats only when USER_ID is available
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

  // ✅ Fetch leads only when USER_ID is available
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

        if (!res.ok) {
          throw new Error(`Failed to fetch leads: ${res.status}`);
        }

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

  // ✅ Loader while waiting for user details
  if (!USER_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 pt-30">
      <h1 className="text-6xl font-bold text-green-700 mb-6 text-center">
        Finance Leads
      </h1>

      {/* ✅ Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-green-700">{stats.total}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Accepted</p>
          <p className="text-2xl font-bold text-green-700">{stats.accepted}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Credits</p>
          <p className="text-2xl font-bold text-blue-600">{stats.accepted}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Value (₹)</p>
          <p className="text-2xl font-bold text-purple-600">
            ₹ {stats.accepted * 10}
          </p>
        </div>
      </div>

      {/* Styled Navbar (tabs style) */}
      <div className="flex justify-center mb-6 h-20">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`px-4 py-2 mx-2 relative text-xl font-medium transition-colors duration-300
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
              <button className="bg-green-600 text-white text-xl px-8 py-4 rounded-xl hover:bg-green-700">
                Create Lead
              </button>
            </Link>
          </div>

          {/* Table or Loader */}
          <div className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              {selected} Leads
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100 text-left">
                    <th className="p-3 border-b">Subtype</th>
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Mobile</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row) => (
                      <tr key={row.id} className="hover:bg-green-50">
                        <td className="p-3 border-b">{row.subType}</td>
                        <td className="p-3 border-b">{row.name}</td>
                        <td className="p-3 border-b">{row.mobile}</td>
                        <td className="p-3 border-b">{row.email}</td>
                        <td className="p-3 border-b">{row.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-4 text-center text-gray-500"
                      >
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
