// app/(routes)/reports/page.tsx
import ClientReportsPage from "./ClientReportsPage";
import { db } from "../../../config/db";
import { researchReportsTable, SelectResearchReport } from "../../../config/schema";
import { desc } from "drizzle-orm";

export default async function ReportsPage() {
  let reports: SelectResearchReport[] = [];
  try {
    if (process.env.DATABASE_URL || process.env.NEON_DATABASE_URL) {
      reports = await db
        .select()
        .from(researchReportsTable)
        .orderBy(desc(researchReportsTable.publishDate));
    }
  } catch (error) {
    console.error("Failed to fetch reports from DB:", error);
  }

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
