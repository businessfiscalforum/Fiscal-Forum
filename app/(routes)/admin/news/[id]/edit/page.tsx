// app/(routes)/admin/news/[id]/edit/page.tsx
import { revalidatePath } from "next/cache";
import { db } from "../../../../../../config/db"; // Adjust path as needed
import { newsTable } from "../../../../../../config/schema"; // Adjust path as needed
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

// Define valid categories
const categoryOptions = [
  'News Buzz',
  'Corp Pulse',
  'IPO Scoop',
  'Market News',
  'Policy',
  'Commodities',
  'Forex',
  'Cryptocurrency',
  'Earnings',
  'Automotive',
  'Technology'
] as const;

// Type guard for category
function isValidCategory(value: string): value is (typeof categoryOptions)[number] {
  return categoryOptions.includes(value as (typeof categoryOptions)[number]);
}

export default async function EditNewsPage({
  params,
}: {
  params:  Promise<{ id: string }>; 
}) {
  const { id } = await params;
  // Fetch the news item to edit
  const [newsItem] = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, id));

  if (!newsItem) {
    // Redirect if news item not found
    redirect("/admin/news");
  }

  // Server Action to handle form submission
  async function updateNews(formData: FormData) {
    "use server";

    // --- Extract and validate form data ---
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const rawCategory = formData.get("category") as string;
    const author = formData.get("author") as string;
    const publishDate = formData.get("publishDate") as string; // Comes as YYYY-MM-DD string
    const readTime = formData.get("readTime") as string;
    const link = formData.get("link") as string;
    const featured = formData.get("featured") === "on";
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // --- IPO Specific Fields ---
    const ipoName = formData.get("ipoName") as string;
    const companyName = formData.get("companyName") as string;
    const priceRange = formData.get("priceRange") as string;
    const issueSize = formData.get("issueSize") as string;
    const listingDate = formData.get("listingDate") as string;
    const currentPrice = formData.get("currentPrice") as string;
    const listingGain = formData.get("listingGain") as string;
    const subscriptionRate = formData.get("subscriptionRate") as string;

    // --- Validate Category ---
    if (!isValidCategory(rawCategory)) {
      console.error(`Invalid category submitted: ${rawCategory}`);
    }
    const category = rawCategory; // Use the validated/raw value

    try {
      // --- Update the database ---
      await db
        .update(newsTable)
        .set({
          title,
          description: description,
          content: content,
          image: image || null,
          category,
          author,
          publishDate: publishDate ? new Date(publishDate) : new Date(), // Convert string to Date
          readTime: readTime || null,
          link: link || null,
          featured,
          tags:JSON.stringify(tags),
          // IPO fields
          ipoName: ipoName || null,
          companyName: companyName || null,
          priceRange: priceRange || null,
          issueSize: issueSize || null,
          listingDate: listingDate || null,
          currentPrice: currentPrice || null,
          listingGain: listingGain || null,
          subscriptionRate: subscriptionRate || null,
        })
        .where(eq(newsTable.id, id));

      // --- Revalidate relevant paths ---
      revalidatePath("/news"); // Assuming public news list page
      revalidatePath(`/news/${id}`); // Assuming public news detail page
      revalidatePath("/admin/news"); // Admin news list

      // --- Redirect after successful update ---
      redirect("/admin/news");
    } catch (error) {
      console.error("Error updating news item:", error);
      // Consider adding user-facing error handling here
      // For now, it will likely result in a 500 error page
      throw error; // Re-throw to trigger error page
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to News List</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
          {/* Header Section with Emerald Theme */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Edit News Article
                </h1>
                <p className="mt-1 text-emerald-100">
                  Update the details for &quot;{newsItem.title}&quot;
                </p>
              </div>
              <div className="bg-emerald-500 p-3 rounded-full">
                <FaSave className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form action={updateNews} className="space-y-8">
              {/* Basic Information */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      defaultValue={newsItem.title || ""}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Category *
                    </label>
                    <select
                      name="category"
                      id="category"
                      defaultValue={newsItem.category || ""}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      defaultValue={newsItem.description || ""}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Content *
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      rows={8}
                      defaultValue={newsItem.content || ""}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white font-mono text-sm" // Added monospace font for content
                    />
                  </div>
                </div>
              </div>

              {/* Media & Links */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">
                  Media & Links
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      id="image"
                      defaultValue={newsItem.image || ""}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="link"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      External Link
                    </label>
                    <input
                      type="url"
                      name="link"
                      id="link"
                      defaultValue={newsItem.link || ""}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Publishing Details */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">
                  Publishing Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      defaultValue={newsItem.author || ""}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="publishDate"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Publish Date
                    </label>
                    <input
                      type="date"
                      name="publishDate"
                      id="publishDate"
                      // Format the date for the input field (YYYY-MM-DD)
                      defaultValue={newsItem.publishDate ? new Date(newsItem.publishDate).toISOString().split('T')[0] : ""}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="readTime"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Read Time
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      id="readTime"
                      defaultValue={newsItem.readTime || ""}
                      placeholder="e.g., 3 min read"
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    defaultChecked={!!newsItem.featured} // Handle potential null/undefined
                    className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 border-emerald-300"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 block text-sm text-emerald-800"
                  >
                    Featured Article
                  </label>
                </div>
              </div>

              {/* Tags Section */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">Tags</h2>
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-emerald-800 mb-2"
                  >
                    Comma-separated tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    // Convert tags array to comma-separated string
                    defaultValue={Array.isArray(newsItem.tags) ? newsItem.tags.join(", ") : (newsItem.tags ? String(newsItem.tags) : "")}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    placeholder="e.g., finance, market, stocks"
                  />
                </div>
              </div>

              {/* IPO Specific Fields */}
              {/* These fields are always present in the form, visibility can be handled by JS on the client if needed,
                  but the server action handles them regardless. The category check can be done on submit if needed. */}
              <div className="border border-teal-200 rounded-xl p-6 bg-teal-50">
                <h2 className="text-xl font-bold text-teal-900 mb-6">
                  IPO Details (Optional)
                </h2>
                <p className="text-sm text-teal-700 mb-4">Fill these fields if the category is &quot;IPO Scoop&quot;.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="ipoName"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      IPO Name
                    </label>
                    <input
                      type="text"
                      name="ipoName"
                      id="ipoName"
                      defaultValue={newsItem.ipoName || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      defaultValue={newsItem.companyName || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="priceRange"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Price Range
                    </label>
                    <input
                      type="text"
                      name="priceRange"
                      id="priceRange"
                      defaultValue={newsItem.priceRange || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="issueSize"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Issue Size
                    </label>
                    <input
                      type="text"
                      name="issueSize"
                      id="issueSize"
                      defaultValue={newsItem.issueSize || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="listingDate"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Listing Date
                    </label>
                    <input
                      type="text" 
                      name="listingDate"
                      id="listingDate"
                      defaultValue={newsItem.listingDate || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="currentPrice"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Current Price
                    </label>
                    <input
                      type="text"
                      name="currentPrice"
                      id="currentPrice"
                      defaultValue={newsItem.currentPrice || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="listingGain"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Listing Gain
                    </label>
                    <input
                      type="text"
                      name="listingGain"
                      id="listingGain"
                      defaultValue={newsItem.listingGain || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subscriptionRate"
                      className="block text-sm font-medium text-teal-800 mb-2"
                    >
                      Subscription Rate
                    </label>
                    <input
                      type="text"
                      name="subscriptionRate"
                      id="subscriptionRate"
                      defaultValue={newsItem.subscriptionRate || ""}
                      className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-emerald-200">
                <Link
                  href="/admin/news"
                  className="px-6 py-3 border border-emerald-300 rounded-lg text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center justify-center text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center justify-center shadow-md"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}