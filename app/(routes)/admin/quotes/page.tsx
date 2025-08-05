// app/(routes)/admin/quotes/page.tsx
import { db } from "../../../../config/db";
import { quoteRequestsTable } from "../../../../config/schema";

export default async function QuoteRequestsPage() {
  const quotes = await db
    .select()
    .from(quoteRequestsTable)
    .orderBy(quoteRequestsTable.createdAt);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Loan Quote Requests
      </h1>
      <p className="text-gray-600 mb-8">Total: {quotes.length} request(s)</p>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm font-medium text-gray-500">Total Requests</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {quotes.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm font-medium text-gray-500">
              Avg. Loan Amount
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              ₹
              {Math.round(
                quotes.reduce((acc, q) => acc + q.loanAmount, 0) /
                  quotes.length || 0
              ).toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm font-medium text-gray-500">Avg. Tenure</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {Math.round(
                quotes.reduce((acc, q) => acc + q.tenure, 0) / quotes.length ||
                  0
              )}{" "}
              yrs
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="pl-6 py-4">Name</th>
                <th className="py-4">Email</th>
                <th className="py-4">Phone</th>
                <th className="py-4">Loan Type</th>
                <th className="py-4">Amount</th>
                <th className="py-4">Tenure</th>
                <th className="pr-6 py-4">EMI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-gray-500">
                    No quote requests found
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="pl-6 py-4 font-medium text-gray-800">
                      {quote.name}
                    </td>
                    <td className="py-4 text-gray-600">{quote.email}</td>
                    <td className="py-4 text-gray-600">{quote.phone}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        {quote.loanType}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">
                      ₹{quote.loanAmount.toLocaleString()}
                    </td>
                    <td className="py-4 text-gray-600">{quote.tenure} yrs</td>
                    <td className="pr-6 py-4 text-gray-600">
                      {quote.emi ? `₹${quote.emi.toLocaleString()}` : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
