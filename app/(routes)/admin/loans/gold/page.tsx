// app/(routes)/admin/quotes/page.tsx
import { db } from "../../../../../config/db";
import { goldLoanApplications } from "../../../../../config/schema";

export default async function QuoteRequestsPage() {
  const data = await db
    .select()
    .from(goldLoanApplications)
    .orderBy(goldLoanApplications.createdAt);

  // Get column names dynamically (from first row if data exists)
  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="py-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gold Loan Applications</h1>
      <p className="text-gray-600 mb-8">
        Total: {data.length} application(s)
      </p>

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
