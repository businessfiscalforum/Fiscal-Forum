// app/api/reports/route.ts
import { revalidatePath } from "next/cache";
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [report] = await db
      .select()
      .from(researchReportsTable)
      .where(eq(researchReportsTable.id, params.id));

    if (!report) {
      return withCORS(req, NextResponse.json({ error: "Report not found" }, { status: 404 }));
    }

    return withCORS(
      req,
      NextResponse.json({
        ...report,
        date: report.date.toString(), // ensure serializable
      })
    );
  } catch (error) {
    console.error("GET /api/reports/[id] error:", error);
    return withCORS(req, NextResponse.json({ error: "Failed to fetch report" }, { status: 500 }));
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(researchReportsTable)
      .where(eq(researchReportsTable.id, params.id));

    revalidatePath("/reports");
    revalidatePath("/admin/reports");
    revalidatePath(`/reports/${params.id}`);

    return withCORS(req, NextResponse.json({
      success: true,
      message: "Report deleted successfully",
    }));
  } catch (error) {
    console.error("DELETE /api/reports/[id] error:", error);
    return withCORS(req, NextResponse.json(
      { success: false, error: "Failed to delete report" },
      { status: 500 }
    ));
  }
}