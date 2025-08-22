import { NextResponse } from 'next/server';
import { db } from '../../../../config/db'; // Adjust path as needed
import { newsTable } from '../../../../config/schema'; // Adjust path as needed
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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


export async function GET() {
  try {
    const newsItems = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.category, 'News Buzz'))
      .orderBy(desc(newsTable.publishDate));

    revalidatePath("/news");
        revalidatePath("/admin/news");
    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error fetching News Buzz:', error);
    return NextResponse.json(
      { error: 'Failed to fetch News Buzz items' },
      { status: 500 }
    );
  }
}