// app/news/page.tsx
import ClientNewsPage from "./ClientNewsPage";
import { db } from "../../../config/db";
import { newsTable } from "../../../config/schema";
import { desc } from "drizzle-orm";
import { NewsItem } from "./ClientNewsPage"; // Import the interface

export default async function NewsPage() {
  const news = await db
      .select()
      .from(newsTable)
      .orderBy(desc(newsTable.publishDate));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedNews: NewsItem[] = news.map((item:any) => {
    return {
      id: String(item.id), 
      title: item.title,
      description: item.description ?? undefined, 
      content: item.content ?? undefined,
      image: item.image ?? undefined, 
      category: item.category,
      author: item.author,
      publishDate: item.publishDate.toISOString(), 
      readTime: item.readTime ?? undefined,
      link: item.link || "#", 
      featured: item.featured ?? false, 
      tags: item.tags ?? undefined, 
      ipoName: item.ipoName ?? undefined,
      companyName: item.companyName ?? undefined,
      priceRange: item.priceRange ?? undefined,
      issueSize: item.issueSize ?? undefined,
      listingDate: item.listingDate ?? undefined,
      currentPrice: item.currentPrice ?? undefined,
      listingGain: item.listingGain ?? undefined,
      subscriptionRate: item.subscriptionRate ?? undefined,
    };
  });

  return <ClientNewsPage initialNews={serializedNews} />;
}