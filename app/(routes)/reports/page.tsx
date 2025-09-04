// app/(routes)/reports/page.tsx
import ClientReportsPage from "./ClientReportsPage";
import { db } from "../../../config/db";
import { researchReportsTable } from "../../../config/schema";
import { desc } from "drizzle-orm";

export default async function ReportsPage() {
  // Fetch all published research reports
  const reports = await db
    .select()
    .from(researchReportsTable)
    .orderBy(desc(researchReportsTable.publishDate));

  // Serialize data (remove BigInt, ensure plain JSON)
  const serializedReports = reports.map((report) => ({
    id: report.id,
    title: report.title ?? "",
    stock: report.stock ?? "",
    company: report.company ?? "",
    author: report.author ?? "",
    authorFirm: report.authorFirm ?? "",
    publishDate: report.publishDate,
    sector: report.sector ?? "",
    reportType: report.reportType ?? "",
    rating: (report.rating as "BUY" | "HOLD" | "SELL" | null) ?? null,
    targetPrice: report.targetPrice ?? "",
    currentPrice: report.currentPrice ?? "",
    upside: report.upside ?? "",
    pages: report.pages ?? 0,
    recommendation: report.recommendation ?? "",
    summary: report.summary ?? "",
    pdfUrl: report.pdfUrl ?? "",
    tags: report.tags || [],
  }));

  return <ClientReportsPage initialReports={serializedReports} />;
}
