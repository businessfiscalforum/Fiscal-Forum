// app/(routes)/admin/news/[id]/edit/page.tsx
import { db } from "../../../../../../config/db";
import { newsTable } from "../../../../../../config/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

// ✅ Define allowed categories
const allowedCategories = [
  'blockchain',
  'fintech',
  'market-news',
  'research',
  'regulation',
  'crypto',
  'banking'
] as const;

type NewsCategory = (typeof allowedCategories)[number];

// ✅ Type guard
function isValidCategory(value: string): value is NewsCategory {
  return allowedCategories.includes(value as NewsCategory);
}

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [news] = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, id));

  if (!news) {
    redirect("/admin/news");
  }

  async function update(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const rawCategory = formData.get("category") as string;
    const author = formData.get("author") as string;
    const publishDate = formData.get("publishDate") as string;
    const readTime = formData.get("readTime") as string;
    const views = formData.get("views") as string;
    const link = formData.get("link") as string;
    const featured = formData.get("featured") === "on";
    const tags = (formData.get("tags") as string)
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    // ✅ Validate category
    if (!isValidCategory(rawCategory)) {
      throw new Error(`Invalid category: ${rawCategory}`);
    }
    const category = rawCategory;

    await db
      .update(newsTable)
      .set({
        title,
        description,
        content,
        image,
        category,
        author,
        publishDate,
        readTime,
        views,
        link: link.trim() || null,
        featured,
        tags,
      })
      .where(eq(newsTable.id, id));

    redirect("/admin/news");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-20">
      <h1 className="text-2xl font-bold mb-6">Edit News Article</h1>
      <form action={update} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            defaultValue={news.title}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={news.description}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Content</label>
          <textarea
            name="content"
            defaultValue={news.content}
            required
            rows={6}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="image"
            defaultValue={news.image || ""}
            type="url"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" defaultValue={news.category} className="w-full border border-gray-300 rounded-lg p-2">
            {allowedCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            name="author"
            defaultValue={news.author}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Publish Date</label>
          <input
            name="publishDate"
            type="date"
            defaultValue={news.publishDate}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Read Time</label>
          <input
            name="readTime"
            defaultValue={news.readTime}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Views</label>
          <input
            name="views"
            defaultValue={news.views || ""}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">External Link</label>
          <input
            name="link"
            defaultValue={news.link || ""}
            type="url"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={news.featured ?? false} // ✅ Handle null
          />
          <label htmlFor="featured">Featured Article</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            name="tags"
            defaultValue={news.tags?.join(", ") || ""}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Update News
        </button>
      </form>
    </div>
  );
}