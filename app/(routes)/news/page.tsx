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


  // Serialize data for client-side component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedNews: NewsItem[] = news.map((item:any) => {
    // Ensure all fields are strings or the correct primitive type
    // Handle potential nulls or undefined values
    return {
      id: String(item.id), // Ensure ID is a string
      title: item.title,
      description: item.description ?? undefined, // Convert null to undefined if preferred
      content: item.content ?? undefined,
      image: item.image ?? undefined, // Pass null/undefined as is, handled by <img>
      category: item.category,
      author: item.author,
      publishDate: item.publishDate.toISOString(), // Convert Date to ISO string
      readTime: item.readTime ?? undefined,
      link: item.link || "#", // Provide default if empty string
      featured: item.featured ?? false, // Convert null to false
      tags: item.tags ?? undefined, // Pass tags as string, component will parse if needed
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