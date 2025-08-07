// app/(routes)/news/[id]/page.tsx
import { db } from "../../../../config/db";
import { newsTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import {format} from 'date-fns';


export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const [news] = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, params.id));

  if (!news) {
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
          {news.category}
        </span>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{news.title}</h1>
        <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
          <span>By {news.author}</span>
          <span>{format(new Date(news.publishDate), 'MMM d, yyyy')}</span>
          <span>{news.readTime}</span>
        </div>
      </div>

      {/* Featured Image */}
      {news.image && (
        <div className="my-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={news.image}
            alt={news.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p>{news.description}</p>
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
        <span>Views: {news.views || "0"}</span>
        {news.featured && (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Featured
          </span>
        )}
      </div>
    </article>
  );
}