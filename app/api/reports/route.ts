// app/api/reports/route.ts
import { db } from "../../../config/db";
import { researchReportsTable } from "../../../config/schema";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

function withCORS(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v as string));
  return res;
}

export async function OPTIONS(req: NextRequest) {
  return withCORS(req, new NextResponse(null, { status: 204 }));
}

export async function GET(req: NextRequest) {
  try {
    const reports = await db
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
        views: researchReportsTable.views,
        recommendation: researchReportsTable.recommendation,
        summary: researchReportsTable.summary,
        pdfUrl: researchReportsTable.pdfUrl,
        tags: researchReportsTable.tags,
        published: researchReportsTable.published,
      })
      .from(researchReportsTable)
      .orderBy(researchReportsTable.publishDate);

    const sanitizedReports = reports.map((report) => ({
      ...report,
      date: report.publishDate.toString(),
    }));

    return withCORS(req, NextResponse.json(sanitizedReports));
  } catch (error) {
    console.error("API Error - GET /api/reports:", error);
    return withCORS(
      req,
      NextResponse.json(
        {
          error: "Failed to fetch reports",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      )
    );
  }
}
