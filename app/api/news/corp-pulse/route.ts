import { NextResponse } from 'next/server';
import { db } from '../../../../config/db'; // Adjust path as needed
import { newsTable } from '../../../../config/schema'; 
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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

// ✅ OPTIONS handler for preflight requests
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
      return NextResponse.json([], { headers: corsHeaders(origin) });
    }
    const newsItems = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.category, 'Corp Pulse'))
      .orderBy(desc(newsTable.publishDate));
    
    revalidatePath("/news");
    revalidatePath("/admin/news");

    return NextResponse.json(newsItems, {
      headers: corsHeaders(origin),
    });
  } catch {
    return NextResponse.json([], {
      headers: corsHeaders(origin),
    });
  }
}
