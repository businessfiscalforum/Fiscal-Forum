// app/api/reports/route.ts
import { revalidatePath } from "next/cache";
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

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
          date: r?.publishDate?.toString(),
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

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const [deleted] = await db
      .delete(researchReportsTable)
      .where(eq(researchReportsTable.id, id)) // ensure correct type
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    revalidatePath("/reports");
    revalidatePath(`/reports/${id}`);
    revalidatePath("/admin/reports");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/reports/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
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

// ✅ PUT: Update report (accepts partial payload)
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract id from the URL path
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop(); // gets the [id]

    if (!id) {
      return withCORS(
        req,
        NextResponse.json({ error: "Missing report ID" }, { status: 400 })
      );
    }

    const body = await req.json();

    const [updated] = await db
      .update(researchReportsTable)
      .set({ ...body })
      .where(eq(researchReportsTable.id, id))
      .returning();

    revalidatePath("/reports");
    revalidatePath(`/reports/${id}`);
    revalidatePath("/admin/reports");

    return withCORS(req, NextResponse.json(updated));
  } catch (error) {
    console.error("PUT /api/reports/[id] error:", error);
    return withCORS(
      req,
      NextResponse.json({ error: "Failed to update report" }, { status: 500 })
    );
  }
}
