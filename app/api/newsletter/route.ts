import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { newsletter } from "../../../config/schema";
import { and, desc, like, sql } from "drizzle-orm";

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
  const offset = (page - 1) * limit;
  const origin = request.headers.get("origin");

  try {
    const whereClause = and(
      search ? like(newsletter.title, `%${search}%`) : undefined,
    );

    const newsletterItems = await db
      .select()
      .from(newsletter)
      .where(whereClause)
      .orderBy(desc(newsletter.publishDate))
      .limit(limit)
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql`count(*)` })
      .from(newsletter)
      .where(whereClause);

    const totalCount = parseInt(totalCountResult[0].count as string);

    return NextResponse.json(
      {
        newsletter: newsletterItems,
      },
      { headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    const data = await request.json();

    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const [newItem] = await db
      .insert(newsletter)
      .values({
        ...data,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
      })
      .returning();

    return NextResponse.json(newItem, {
      status: 201,
      headers: corsHeaders(origin),
    });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return NextResponse.json(
      { error: "Failed to create newsletter item" },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
