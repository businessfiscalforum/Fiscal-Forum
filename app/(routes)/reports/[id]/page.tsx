// app/(routes)/reports/[id]/page.tsx
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { FaFilePdf, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import { ShareButton } from "../../_components/ShareButton";
import Link from "next/link";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [report] = await db
    .select()
    .from(researchReportsTable)
    .where(eq(researchReportsTable.id, id));

  if (!report) {
    return notFound();
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto py-20">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/reports"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 text-sm" />
            <span className="text-sm">Back to Reports</span>
          </Link>
        </div>

        <article className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* Header Section */}
          <header className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(
                  report.rating
                )}`}
              >
                {report.rating ?? "N/A"}
              </span>
              {report.reportType && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                  {report.reportType}
                </span>
              )}
              {report.sector && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full">
                  {report.sector}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center leading-tight">
              {report.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
              {report.author && <span>By {report.author}</span>}
              {report.authorFirm && <span>{report.authorFirm}</span>}
              {report.publishDate && (
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-xs text-emerald-500" />
                  {format(new Date(report.publishDate), "MMM d, yyyy")}
                </span>
              )}
            </div>
          </header>

          {/* Stock/Company Performance Summary */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8 mb-8 border-t border-b border-emerald-100">
            <h2 className="text-xl font-bold text-emerald-800 mb-6 text-center">
              Company & Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-emerald-100">
                <p className="text-sm text-gray-500 mb-2">Stock</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {report.stock ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">{report.company ?? "N/A"}</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-emerald-100">
                <p className="text-sm text-gray-500 mb-2">Target Price</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {report.targetPrice ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Current: {report.currentPrice ?? "N/A"}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm text-center border border-emerald-100">
                <p className="text-sm text-gray-500 mb-2">Projected Upside</p>
                <p
                  className={`text-2xl font-bold ${
                    report.upside && parseFloat(report.upside) > 0
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {report.upside ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Recommendation: {report.recommendation ?? "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          {report.summary && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-emerald-500 pl-4">
                Executive Summary
              </h2>
              <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed">
                <p>{report.summary}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {report.tags && report.tags.length > 0 && (
            <div className="px-6 sm:px-8 pb-6">
              <div className="flex flex-wrap gap-2">
                {report.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-6 rounded-b-2xl border-t border-gray-100">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              {report.pages && <span>{report.pages} pages</span>}
              {report.publishDate && (
                <span>
                  Published: {format(new Date(report.publishDate), "MMM d, yyyy")}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              {report.pdfUrl && (
                <a
                  href={report.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <FaFilePdf />
                  View Full PDF
                </a>
              )}
              {report.pdfUrl && (
                <ShareButton
                  title={report.title ?? "Untitled Report"}
                  pdfUrl={report.pdfUrl}
                />
              )}
            </div>
          </div>
        </article>
      </div>
      
    </div>
  );
}