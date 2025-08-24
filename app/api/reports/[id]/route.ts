// app/api/reports/route.ts
import { revalidatePath } from "next/cache";
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
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

// ✅ GET all reports
export async function GET(req: NextRequest) {
  try {
    const reports = await db.select().from(researchReportsTable);

    return withCORS(
      req,
      NextResponse.json(
        reports.map((r) => ({
          ...r,
          date: r.publishDate.toString(),
        }))
      )
    );
  } catch (error) {
    console.error("GET /api/reports error:", error);
    return withCORS(
      req,
      NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
    );
  }
}

// (Optional) add POST if you want to create a report
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const [newReport] = await db
      .insert(researchReportsTable)
      .values(body)
      .returning();

    revalidatePath("/reports");
    revalidatePath("/admin/reports");

    return withCORS(req, NextResponse.json(newReport, { status: 201 }));
  } catch (error) {
    console.error("POST /api/reports error:", error);
    return withCORS(
      req,
      NextResponse.json({ error: "Failed to create report" }, { status: 500 })
    );
  }
}
