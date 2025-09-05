// components/ReportCard.tsx

import { FaUser, FaFilePdf } from "react-icons/fa";
import { ShareButton } from "./ShareButton";

// ✅ Define exact enum to match DB
export const reportTypeOptions = [
  "Pre-Market Research Report",
  "Quarterly Results",
  "Industry Analysis",
  "Thematic Research Report",
  "Company Analysis",
  "Equity Research Report",
] as const;

export const ratingOptions = ["BUY", "HOLD", "SELL"] as const;

export type ReportType = (typeof reportTypeOptions)[number];
export type Rating = (typeof ratingOptions)[number];

// ✅ Interface matches DB exactly
export interface ResearchReport {
  id: string;
  title: string | null;
  stock: string | null;
  company: string | null;
  author: string | null;
  authorFirm: string | null;
  publishDate: string | null;
  sector: string | null;
  reportType: ReportType | null;
  rating: Rating | null;
  targetPrice: string | null;
  currentPrice: string | null;
  upside: string | null;
  pages: number | null;
  recommendation: string | null;
  tags: string[] | null;
  summary: string | null;
  pdfUrl: string | null;
  published: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface ReportCardProps {
  report: ResearchReport;
}

// ✅ Move formatDate into shared utility or define locally
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors py-20">
      {/* Report Details */}
      <td className="px-4 py-3">
        <div>
          <p className="font-semibold text-gray-800">{report.title}</p>
          <p
            className="text-sm text-gray-500 line-clamp-2"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
            aria-label={`Summary: ${report.summary}`}
          >
            {report.summary}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              {report.reportType}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
              {report.sector}
            </span>
            <span>{report.pages} pages</span>
            <span>•</span>
          </div>
        </div>
      </td>

      {/* Stock/Company */}
      <td className="px-4 py-3">
        <p className="font-medium text-gray-800">{report.stock}</p>
        <p className="text-sm text-gray-500">{report.company}</p>
      </td>

      {/* Author */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 overflow-hidden rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center"
            aria-hidden="true"
          >
            <FaUser className="text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{report.author}</p>
            <p className="text-xs text-gray-500">{report.authorFirm}</p>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-sm text-gray-600">
        {formatDate(report?.publishDate || "")}
      </td>

      {/* Rating & Target */}
      <td className="px-4 py-3">
        <p
          className={`font-semibold ${
            report.rating === "BUY"
              ? "text-green-600"
              : report.rating === "HOLD"
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        >
          {report.rating}
        </p>
        <p className="text-sm text-gray-500">Target: {report.targetPrice}</p>
      </td>

      {/* Performance */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <span
            className={`font-medium ${
              report?.upside?.startsWith("+")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {report?.upside ?? ""}
          </span>

          <span className="text-xs text-gray-600">
            ({report.recommendation})
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 whitespace-nowrap">
        <a
          href={report.pdfUrl ?? ""}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          aria-label={`View PDF for ${report.title}`}
        >
          <FaFilePdf />
          View PDF
        </a>
        <ShareButton
          title={report?.title ?? ""}
          pdfUrl={report?.pdfUrl ?? ""}
        />
      </td>
    </tr>
  );
}
