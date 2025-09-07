import ClientNewsletterPage, { Newsletter } from "./ClientNewsletterPage";
import { db } from "../../../config/db";
import { newsletter } from "../../../config/schema"; 
import { desc } from "drizzle-orm";

export default async function NewsletterPage() {
  const rows = await db
    .select()
    .from(newsletter)
    .orderBy(desc(newsletter.publishDate));

  // Serialize data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serializedNewsletters: Newsletter[] = rows.map((item: any) => ({
    id: String(item.id),
    title: item.title,
    description: item.description ?? undefined,
    content: item.content ?? undefined,
    image: item.image ?? undefined,
    author: item.author ?? undefined,
    publishDate: item.publishDate?.toISOString() ?? new Date().toISOString(),
  }));

  return <ClientNewsletterPage initialNews={serializedNewsletters} />;
}
