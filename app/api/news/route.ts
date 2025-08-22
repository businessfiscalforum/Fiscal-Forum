import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { newsTable } from "../../../config/schema";
import { and, desc, eq, like, sql } from "drizzle-orm";

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
      search ? like(newsTable.title, `%${search}%`) : undefined,
      category ? eq(newsTable.category, category) : undefined
    );

    const newsItems = await db
      .select()
      .from(newsTable)
      .where(whereClause)
      .orderBy(desc(newsTable.publishDate))
      .limit(limit)
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(newsTable)
      .where(whereClause);

    const totalCount = parseInt(totalCountResult[0].count as string);

    return NextResponse.json(
      {
        news: newsItems,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalCount,
        },
      },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    const data = await request.json();

    if (!data.title || !data.content || !data.category) {
      return NextResponse.json(
        { error: "Title, content, and category are required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const [newItem] = await db
      .insert(newsTable)
      .values({
        ...data,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
      })
      .returning();

    return NextResponse.json(newItem, {
      status: 201,
      headers: corsHeaders(origin),
    });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news item" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
