// app/(routes)/reports/[id]/page.tsx
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { ShareButton } from "../../_components/ShareButton";

// Define the expected structure of params for this dynamic route
interface ReportPageParams {
  id: string;
}

// Define the props type for the page component
interface ReportDetailPageProps {
  params: ReportPageParams;
  // searchParams?: { [key: string]: string | string[] | undefined }; // Uncomment if you use searchParams
}

export default async function ReportDetailPage({
  params,
}: ReportDetailPageProps) {
  // Extract the 'id' directly from params
  const { id } = params;

  // Fetch the report from the database using the id
  const [report] = await db
    .select()
    .from(researchReportsTable)
    .where(eq(researchReportsTable.id, id));

  // If no report is found, trigger a 404 page
  if (!report) {
    return notFound();
  }

  // Helper function to determine styling based on report rating
  const getRatingColor = (rating: string | null) => {
    switch (rating) {
      case "BUY":
        return "bg-green-100 text-green-800";
      case "HOLD":
        return "bg-yellow-100 text-yellow-800";
      case "SELL":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Render the report details page
  return (
    <article className="max-w-4xl mx-auto px-6 py-25">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {/* Display Rating Badge */}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(
              report.rating
            )}`}
          >
            {report.rating ?? "N/A"}
          </span>
          {/* Display Report Type Badge */}
          {report.reportType && (
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
              {report.reportType}
            </span>
          )}
          {/* Display Sector Badge */}
          {report.sector && (
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full">
              {report.sector}
            </span>
          )}
        </div>
        {/* Report Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          {report.title}
        </h1>
        {/* Author and Date Information */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
          {report.author && <span>By {report.author}</span>}
          {report.authorFirm && <span>{report.authorFirm}</span>}
          {report.publishDate && (
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-xs" />
              {format(new Date(report.publishDate), "MMM d, yyyy")}
            </span>
          )}
        </div>
      </div>

      {/* Stock/Company Performance Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Company & Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stock Ticker and Company Name */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Stock</p>
            <p className="text-2xl font-bold text-blue-600">
              {report.stock ?? "N/A"}
            </p>
            <p className="text-sm text-gray-600">{report.company ?? "N/A"}</p>
          </div>
          {/* Target and Current Price */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Target Price</p>
            <p className="text-2xl font-bold text-green-600">
              {report.targetPrice ?? "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Current: {report.currentPrice ?? "N/A"}
            </p>
          </div>
          {/* Projected Upside and Recommendation */}
          <div className="text-center">
            <p className="text-sm text-gray-500">Projected Upside</p>
            <p
              className={`text-2xl font-bold ${
                report.upside && parseFloat(report.upside) > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {report.upside ?? "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Recommendation: {report.recommendation ?? "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {report.summary && (
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Executive Summary
          </h2>
          <p>{report.summary}</p>
        </div>
      )}

      {/* Tags */}
      {report.tags && report.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {report.tags.map((tag: string, i: number) => (
            <span
              key={i} // Using index as key, consider a unique ID if available
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons (PDF View, Share) */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-6 rounded-xl">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          {/* Page Count and Publish Date */}
          {report.pages && <span>{report.pages} pages</span>}
          {report.publishDate && (
            <span>
              Published: {format(new Date(report.publishDate), "MMM d, yyyy")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* View PDF Button */}
          {report.pdfUrl && (
            <a
              href={report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FaFilePdf />
              View Full PDF
            </a>
          )}
          {/* Share Button Component */}
          {report.pdfUrl && (
            <ShareButton
              title={report.title ?? "Untitled Report"}
              pdfUrl={report.pdfUrl}
            />
          )}
        </div>
      </div>
    </article>
  );
}