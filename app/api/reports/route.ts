// app/api/reports/route.ts

import { db } from "../../../config/db";
import { researchReportsTable } from "../../../config/schema";
import { NextResponse } from "next/server";
// app/api/reports/route.ts
export async function GET() {
  try {
    const reports = await db
      .select({
        id: researchReportsTable.id,
        title: researchReportsTable.title,
        stock: researchReportsTable.stock,
        company: researchReportsTable.company,
        author: researchReportsTable.author,
        authorFirm: researchReportsTable.authorFirm,
        date: researchReportsTable.date,
        sector: researchReportsTable.sector,
        reportType: researchReportsTable.reportType,
        rating: researchReportsTable.rating,
        targetPrice: researchReportsTable.targetPrice,
        currentPrice: researchReportsTable.currentPrice,
        upside: researchReportsTable.upside,
        pages: researchReportsTable.pages,
        views: researchReportsTable.views,
        recommendation: researchReportsTable.recommendation,
        summary: researchReportsTable.summary,
        pdfUrl: researchReportsTable.pdfUrl,
        tags: researchReportsTable.tags,
        published: researchReportsTable.published,
      })
      .from(researchReportsTable)
      .orderBy(researchReportsTable.date);

    // ✅ Sanitize dates to string
    const sanitizedReports = reports.map((report) => ({
      ...report,
      date: report.date.toString(),
    }));
    const response = NextResponse.json(sanitizedReports);

    // --- CORS Configuration ---
    // Allow requests from your other domain
    response.headers.set('Access-Control-Allow-Origin', 'https://fiscalforum.in');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return NextResponse.json(sanitizedReports);
  } catch (error) {
    console.error("API Error - GET /api/reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}