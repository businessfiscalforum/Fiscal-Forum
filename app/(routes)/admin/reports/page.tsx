// app/(routes)/admin/reports/page.tsx
// Note: I'm assuming this should be reports based on the data fetched and button link.
// If it's truly for 'news', you'll need to adjust the data fetching and fields accordingly.
export const revalidate = 0;
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import Link from "next/link";
import { DeleteReportButton } from "../../_components/DeleteReportButton";
import { FaPlus, FaEdit, FaFileAlt, FaChartLine } from "react-icons/fa"; // Import icons

export default async function ReportsListPage() {
  // Renamed component for clarity
  const reports = await db
    .select()
    .from(researchReportsTable)
    .orderBy(researchReportsTable.publishDate);

  return (
    <div className="space-y-6">
      {" "}
      {/* Reduced space-y */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
        {" "}
        {/* Adjusted padding and layout */}
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">
            {" "}
            {/* Changed color to emerald */}
            <FaChartLine className="inline mr-2 text-emerald-700" />{" "}
            {/* Added icon */}
            Research Reports
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your financial research reports
          </p>{" "}
          {/* Added subtitle */}
        </div>
        <Link
          href="/admin/reports/create" // Ensure this path is correct for reports
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition shadow-md" // Emerald theme, gradient, shadow
        >
          <FaPlus className="mr-2" /> {/* Added icon */}
          Add Report
        </Link>
      </div>
      {/* Reports List Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
        {" "}
        {/* Added container styling */}
        {reports.length === 0 ? (
          <div className="text-center py-12">
            {" "}
            {/* Centered message */}
            <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />{" "}
            {/* Icon */}
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No reports found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new research report.
            </p>
            <div className="mt-6">
              <Link
                href="/admin/reports/create"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Report
              </Link>
            </div>
          </div>
        ) : (
          // Use a simple list or table. List is often cleaner for cards.
          <ul className="divide-y divide-gray-200">
            {" "}
            {/* Use ul for list of items */}
            {reports.map((item) => (
              <li
                key={item.id}
                className="hover:bg-emerald-50/50 transition-colors duration-200"
              >
                {" "}
                {/* List item with hover effect */}
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {" "}
                  {/* Adjusted padding and layout */}
                  <div className="flex-1 min-w-0">
                    {" "}
                    {/* Content area */}
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>{" "}
                    {/* Truncate long titles */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-gray-500">
                      <span className="flex items-center">
                        📅{" "}
                        {item.publishDate
                          ? new Date(item.publishDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                      <span className="flex items-center">
                        👤 {item.author}
                      </span>
                      <span className="flex items-center">🔖 {item.stock}</span>
                      <span className="flex items-center">
                        Rating:
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            item.rating === "BUY"
                              ? "bg-green-100 text-green-800"
                              : item.rating === "SELL"
                                ? "bg-red-100 text-red-800"
                                : item.rating === "HOLD"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.rating}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {" "}
                    {/* Action buttons */}
                    <Link
                      href={`/admin/reports/${item.id}/edit`} // Ensure path is correct
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
                    >
                      <FaEdit className="mr-1 text-xs" /> {/* Added icon */}
                      Edit
                    </Link>
                    <DeleteReportButton id={item.id} />{" "}
                    {/* Assuming this component is styled */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
