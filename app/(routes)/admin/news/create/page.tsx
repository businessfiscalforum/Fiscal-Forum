// app/(routes)/admin/news/create/page.tsx
import { db } from "../../../../../config/db";
import { newsTable } from "../../../../../config/schema";
import { redirect } from "next/navigation";


// ✅ Define allowed categories (must match your enum)
const allowedCategories = [
  'blockchain',
  'fintech',
  'market-news',
  'research',
  'regulation',
  'crypto',
  'banking'
] as const; // `as const` makes it a tuple of literals

// ✅ Type-safe category type
type NewsCategory = (typeof allowedCategories)[number];
function isValidCategory(value: string): value is NewsCategory {
  return allowedCategories.includes(value as NewsCategory);
}

export default async function CreateNewsPage() {
  async function create(formData: FormData) {
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
      throw new Error(`Invalid category: ${rawCategory}. Must be one of [${allowedCategories.join(", ")}]`);
    }
    const category = rawCategory;

    await db.insert(newsTable).values({
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
    });

    redirect("/admin/news");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-20">
      <h1 className="text-2xl font-bold mb-6">Create News Article</h1>
      <form action={create} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Content</label>
          <textarea
            name="content"
            required
            rows={6}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="image"
            type="url"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" required className="w-full border border-gray-300 rounded-lg p-2">
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
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Publish Date</label>
          <input
            name="publishDate"
            type="date"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Read Time</label>
          <input
            name="readTime"
            placeholder="e.g., 6 min read"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Views</label>
          <input
            name="views"
            placeholder="e.g., 15.2K"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">External Link (optional)</label>
          <input
            name="link"
            type="url"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="featured" id="featured" />
          <label htmlFor="featured">Featured Article</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input
            name="tags"
            placeholder="blockchain, tokenization, goldman-sachs"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Publish News
        </button>
      </form>
    </div>
  );
}