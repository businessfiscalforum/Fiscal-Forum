// components/ReportCard.tsx


import { FaUser } from "react-icons/fa";
import { ShareButton } from "./ShareButton";

// ✅ Define exact enum to match DB
export const reportTypeOptions = [
  "Quarterly Results",
  "Sector Analysis",
  "Industry Report",
  "Thematic Report",
  "Company Analysis",
] as const;

export const ratingOptions = ["BUY", "HOLD", "SELL"] as const;

export type ReportType = (typeof reportTypeOptions)[number];
export type Rating = (typeof ratingOptions)[number];

// ✅ Interface matches DB exactly
export interface ResearchReport {
  id: string;
  title: string;
  stock: string;
  company: string;
  author: string;
  authorFirm: string;
  date: string;
  sector: string;
  reportType: ReportType; // ✅ Now matches DB
  rating: Rating;
  targetPrice: string;
  currentPrice: string;
  upside: string;
  pages: number;
  views: number;
  recommendation: string;
  tags: string[];
  summary: string;
  pdfUrl: string;
  published: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface ReportCardProps {
  report: ResearchReport;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Report Details */}
      <td className="px-4 py-3">
        <div>
          <p className="font-semibold text-gray-800">{report.title}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{report.summary}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {report.reportType}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
              {report.sector}
            </span>
            <span>{report.pages} pages</span>
            <span>•</span>
            <span>{report.views.toLocaleString()} views</span>
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
          <div className="w-8 h-8 overflow-hidden rounded-full border border-gray-300">
            <FaUser/>
          </div>
          <div>
            <p className="font-medium text-gray-800">{report.author}</p>
            <p className="text-xs text-gray-500">{report.authorFirm}</p>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="px-4 py-3">{report.date}</td>

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
            className={
              report.upside.startsWith("+")
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {report.upside}
          </span>
          <span className="text-xs text-gray-600">({report.recommendation})</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <a
          href={report.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          📄 View PDF
        </a>
        <ShareButton title={report.title} pdfUrl={report.pdfUrl} />
      </td>
    </tr>
    
  );
}