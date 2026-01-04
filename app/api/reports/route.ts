import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { researchReportsTable } from "../../../config/schema";
import { eq, desc } from "drizzle-orm";

/* ---- ENUM SAFE LIST (MUST MATCH DB ENUM EXACTLY) ---- */
const REPORT_TYPES = [
  "Pre-Market Research Report",
  "Quarterly Results",
  "Industry Analysis",
  "Thematic Research Report",
  "Company Analysis",
  "Equity Research Report",
] as const;

type ReportType = (typeof REPORT_TYPES)[number];

/* ---- GET HANDLER ---- */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawType = searchParams.get("type");

    const reportType: ReportType | undefined =
      rawType && REPORT_TYPES.includes(rawType as ReportType)
        ? (rawType as ReportType)
        : undefined;

    const reports = reportType
      ? await db
          .select({
            id: researchReportsTable.id,
            title: researchReportsTable.title,
            stock: researchReportsTable.stock,
            company: researchReportsTable.company,
            author: researchReportsTable.author,
            authorFirm: researchReportsTable.authorFirm,
            publishDate: researchReportsTable.publishDate,
            sector: researchReportsTable.sector,
            reportType: researchReportsTable.reportType,
            rating: researchReportsTable.rating,
            targetPrice: researchReportsTable.targetPrice,
            currentPrice: researchReportsTable.currentPrice,
            upside: researchReportsTable.upside,
            pages: researchReportsTable.pages,
            recommendation: researchReportsTable.recommendation,
            summary: researchReportsTable.summary,
            pdfUrl: researchReportsTable.pdfUrl,
            tags: researchReportsTable.tags,
            published: researchReportsTable.published,
          })
          .from(researchReportsTable)
          .where(eq(researchReportsTable.reportType, reportType))
          .orderBy(desc(researchReportsTable.publishDate))
      : await db
          .select({
            id: researchReportsTable.id,
            title: researchReportsTable.title,
            stock: researchReportsTable.stock,
            company: researchReportsTable.company,
            author: researchReportsTable.author,
            authorFirm: researchReportsTable.authorFirm,
            publishDate: researchReportsTable.publishDate,
            sector: researchReportsTable.sector,
            reportType: researchReportsTable.reportType,
            rating: researchReportsTable.rating,
            targetPrice: researchReportsTable.targetPrice,
            currentPrice: researchReportsTable.currentPrice,
            upside: researchReportsTable.upside,
            pages: researchReportsTable.pages,
            recommendation: researchReportsTable.recommendation,
            summary: researchReportsTable.summary,
            pdfUrl: researchReportsTable.pdfUrl,
            tags: researchReportsTable.tags,
            published: researchReportsTable.published,
          })
          .from(researchReportsTable)
          .orderBy(desc(researchReportsTable.publishDate));

    const sanitizedReports = reports.map((r) => ({
      ...r,
      publishDate: r.publishDate?.toString(),
    }));

    return NextResponse.json(sanitizedReports);
  } catch (error) {
    console.error("GET /api/reports error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch reports",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
