// app/api/reports/route.ts
import { revalidatePath } from "next/cache";
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const [report] = await db
      .select()
      .from(researchReportsTable)
      .where(eq(researchReportsTable.id, id));

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // ✅ Sanitize date
    return NextResponse.json({
      ...report,
      date: report.date.toString(),
    });
  } catch (error) {
    console.error("GET /api/reports/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await db
      .delete(researchReportsTable)
      .where(eq(researchReportsTable.id, id));

    // ✅ Revalidate to update cached pages
    revalidatePath("/reports");
    revalidatePath("/admin/reports");
    revalidatePath(`/reports/${id}`);

    return NextResponse.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Delete report error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete report" },
      { status: 500 }
    );
  }
}