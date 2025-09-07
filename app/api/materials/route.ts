import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { and, desc, eq, like, sql } from "drizzle-orm";
import { materials } from "../../../config/schema";

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

// ✅ Preflight request handler
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const offset = (page - 1) * limit;
  const origin = request.headers.get("origin");

  try {
    const whereClause = and(
      search ? like(materials.title, `%${search}%`) : undefined,
    );

    const materialItems = await db
      .select()
      .from(materials)
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(materials)
      .where(whereClause);

    const totalCount = parseInt(totalCountResult[0].count as string);

    return NextResponse.json(
      {
        materials: materialItems,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
        },
      },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    const data = await request.json();

    // Relaxed: accept partial payloads; backend no longer enforces required fields

    const [materialItems] = await db
      .insert(materials)
      .values({
        ...data,
        tags: Array.isArray(data.tags) ? JSON.stringify(data.tags) : null,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
      })
      .returning();

    return NextResponse.json(materialItems, {
      status: 201,
      headers: corsHeaders(origin),
    });
  } catch (error) {
    console.error("Error creating material:", error);
    return NextResponse.json(
      { error: "Failed to create material item" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
