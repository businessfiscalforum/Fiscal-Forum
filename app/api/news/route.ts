//api/news/route.ts
import { db } from "../../../config/db";
import { newsTable } from "../../../config/schema";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const news = await db
      .select({
        id: newsTable.id,
        title: newsTable.title,
        description: newsTable.description,
        image: newsTable.image,
        publishDate: newsTable.publishDate,
        published: newsTable.published,
        link: newsTable.link,
        category: newsTable.category,
        author: newsTable.author,
        readTime: newsTable.readTime,
        views: newsTable.views,
        featured: newsTable.featured,
        tags: newsTable.tags,
      })
      .from(newsTable)
      .orderBy(newsTable.publishDate)
      .limit(6);

    // ✅ Sanitize dates
    const sanitizedNews = news.map((item) => ({
      ...item,
      publishDate: item.publishDate.toString(),
    }));
     const response = NextResponse.json(sanitizedNews);

    // --- CORS Configuration ---
    // Allow requests from your other domain
    response.headers.set('Access-Control-Allow-Origin', 'https://wwww.fiscalforum.in');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return NextResponse.json(sanitizedNews);
  } catch (error) {
    console.error("API Error - GET /api/news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}