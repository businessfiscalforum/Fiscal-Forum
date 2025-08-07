// app/(routes)/admin/news/page.tsx
import { db } from "../../../../config/db";
import { newsTable } from "../../../../config/schema";

import Link from "next/link";

export default async function NewsListPage() {

  const news = await db
    .select()
    .from(newsTable)
    .orderBy(newsTable.publishDate);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 py-20">
        <h1 className="text-2xl font-bold text-gray-800">News Articles</h1>
        <Link
          href="/admin/news/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add News
        </Link>
      </div>

      <div className="space-y-4">
        {news.length === 0 ? (
          <p className="text-gray-500">No news articles found.</p>
        ) : (
          news.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg bg-white shadow flex justify-between items-start py-12">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>📅 {item.publishDate}</span>
                  <span>👤 {item.author}</span>
                  <span>🔖 {item.category}</span>
                  <span>👁️ {item.views}</span>
                </div>
                {item.featured && (
                  <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/news/${item.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}