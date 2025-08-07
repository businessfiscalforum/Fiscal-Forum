// app/api/news/route.ts
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
        link: newsTable.link,
      })
      .from(newsTable)
      .orderBy(newsTable.publishDate)
      .limit(6); // Get latest 6

    return NextResponse.json(news);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}