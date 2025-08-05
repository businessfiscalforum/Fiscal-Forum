// app/news/page.tsx
import ClientNewsPage from "./ClientNewsPage";
import { db } from "../../../config/db";
import { newsTable } from "../../../config/schema";
import { desc } from "drizzle-orm";

export default async function NewsPage() {
  // Fetch all published news
  const news = await db
    .select()
    .from(newsTable)
    .orderBy(desc(newsTable.publishDate));

  // Convert to plain JSON (remove BigInt, etc.)
  const serializedNews = news.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image || undefined,
    category: item.category,
    author: item.author,
    publishDate: item.publishDate,
    readTime: item.readTime,
    views: item.views,
    link: item.link || `#`,
    featured: item.featured || false,
    tags: item.tags || [],
  }));

  return <ClientNewsPage initialNews={serializedNews} />;
}