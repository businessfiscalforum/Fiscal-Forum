// app/(routes)/admin/parnet-requests/page.tsx
"use client";

import { useEffect, useState } from "react";

interface PartnerRequest {
  id: string;
  type: string;
  subType?: string;
  name: string;
  mobile: string;
  email: string;
  status: string;
  createdAt?: string;
}

export default function PartnerRequestsPage() {
  const [data, setData] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/partner-requests`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();

        // sort by type
        const sorted = result.sort((a: PartnerRequest, b: PartnerRequest) =>
          a.type.localeCompare(b.type)
        );
        setData(sorted);
      } catch (err) {
        console.error("Error fetching partner requests:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAction = async (id: string, accepted: boolean) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partner-requests`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, accepted }),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      // update UI state
      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: accepted ? "Approved" : "Rejected" }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="py-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Partner Requests</h1>
      <p className="text-gray-600 mb-8">Total: {data.length} requests(s)</p>

      {data.length === 0 ? (
        <div>No Data!</div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 py-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  {keys.map((key) => (
                    <th key={key} className="py-4 px-6">
                      {key}
                    </th>
                  ))}
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {keys.map((key) => (
                      <td key={key} className="py-4 px-6 text-gray-700">
                        {formatValue(item[key as keyof typeof item])}
                      </td>
                    ))}

                    {/* Action buttons */}
                    <td className="py-4 px-6">
                      {item.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600"
                            onClick={() => handleAction(item.id, true)}
                          >
                            Approve
                          </button>
                          <button
                            className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                            onClick={() => handleAction(item.id, false)}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatValue(value: any) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") return value.toLocaleString();
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
}
