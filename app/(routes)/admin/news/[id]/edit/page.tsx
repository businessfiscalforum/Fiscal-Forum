import { revalidatePath } from "next/cache";
import { db } from "../../../../../../config/db"; // Adjust path as needed
import { newsTable } from "../../../../../../config/schema"; // Adjust path as needed
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

// Define valid categories
const categoryOptions = [
  "News Buzz",
  "Corp Pulse",
  "IPO Scoop",
] as const;

// Type guard for category
function isValidCategory(
  value: string
): value is (typeof categoryOptions)[number] {
  return categoryOptions.includes(value as (typeof categoryOptions)[number]);
}

// Helper to format Date objects from Drizzle result to YYYY-MM-DD string for input[type="date"]
const formatDateForInput = (dateValue: string | Date | null | undefined): string => {
  if (!dateValue) return "";
  try {
    // Drizzle returns ISO strings or Date objects. We ensure it's a Date first.
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toISOString().split("T")[0];
  } catch {
    return String(dateValue).split("T")[0] || "";
  }
};


export default async function EditNewsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch the news item to edit
  const [newsItem] = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, id));

  if (!newsItem) {
    redirect("/admin/news");
  }

  // Server Action to handle form submission
  async function updateNews(formData: FormData) {
    "use server";

    // --- Extract Standard Fields ---
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const rawCategory = formData.get("category") as string;
    const author = formData.get("author") as string;
    const publishDate = formData.get("publishDate") as string;
    const readTime = formData.get("readTime") as string;
    const link = formData.get("link") as string;
    const featured = formData.get("featured") === "on";
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    // --- Extract ALL IPO Specific Fields ---
    const ipoName = formData.get("ipoName") as string;
    const companyName = formData.get("companyName") as string;
    const priceRange = formData.get("priceRange") as string;
    const issueSize = formData.get("issueSize") as string;
    const listingDate = formData.get("listingDate") as string;
    const currentPrice = formData.get("currentPrice") as string;
    const listingGain = formData.get("listingGain") as string;
    const subscriptionRate = formData.get("subscriptionRate") as string;
    const offerPrice = formData.get("offerPrice") as string;
    const openDate = formData.get("openDate") as string;
    const closeDate = formData.get("closeDate") as string;
    const allotmentDate = formData.get("allotmentDate") as string;
    const refundDate = formData.get("refundDate") as string;
    const applyLink = formData.get("applyLink") as string;

    // --- Validate Category ---
    if (!isValidCategory(rawCategory)) {
      console.error(`Invalid category submitted: ${rawCategory}`);
    }
    const category = rawCategory;

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
          publishDate: publishDate ? new Date(publishDate) : new Date(),
          readTime: readTime || null,
          link: link || null,
          featured,
          tags: JSON.stringify(tags),
          
          // --- IPO fields mapped ---
          ipoName: ipoName || null,
          companyName: companyName || null,
          priceRange: priceRange || null,
          issueSize: issueSize || null,
          listingDate: listingDate || null,
          currentPrice: currentPrice || null,
          listingGain: listingGain || null,
          subscriptionRate: subscriptionRate || null,
          
          applyLink: applyLink || null,
          offerPrice: offerPrice || null,
          openDate: openDate || null,
          closeDate: closeDate || null,
          allotmentDate: allotmentDate || null,
          refundDate: refundDate || null,
        })
        .where(eq(newsTable.id, id));

      // --- Revalidate relevant paths ---
      revalidatePath("/news");
      revalidatePath(`/news/${id}`);
      revalidatePath("/admin/news");

      // --- Redirect after successful update ---
      
    } catch (error) {
      console.error("Error updating news item:", error);
      throw error;
    }
    redirect("/admin/news");
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
              {/* 1. Basic Information */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-emerald-800 mb-2">Title *</label>
                    <input type="text" name="title" id="title" defaultValue={newsItem.title || ""} required className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="category" className="block text-sm font-medium text-emerald-800 mb-2">Category *</label>
                    <select name="category" id="category" defaultValue={newsItem.category || ""} required className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white">
                      <option value="">Select a category</option>
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-emerald-800 mb-2">Description</label>
                    <textarea name="description" id="description" rows={3} defaultValue={newsItem.description || ""} className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="content" className="block text-sm font-medium text-emerald-800 mb-2">Content *</label>
                    <textarea name="content" id="content" rows={8} defaultValue={newsItem.content || ""} required className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white font-sans text-sm whitespace-pre-wrap" />
                  </div>
                </div>
              </div>

              {/* 2. Media & Links */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">Media & Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="image" className="block text-sm font-medium text-emerald-800 mb-2">Image URL</label>
                    <input type="url" name="image" id="image" defaultValue={newsItem.image || ""} className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="link" className="block text-sm font-medium text-emerald-800 mb-2">External Link</label>
                    <input type="url" name="link" id="link" defaultValue={newsItem.link || ""} className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white" />
                  </div>
                </div>
              </div>

              {/* 3. Publishing Details */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">Publishing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-emerald-800 mb-2">Author *</label>
                    <input type="text" name="author" id="author" defaultValue={newsItem.author || ""} required className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white" />
                  </div>

                  <div>
                    <label htmlFor="publishDate" className="block text-sm font-medium text-emerald-800 mb-2">Publish Date</label>
                    <input
                      type="date"
                      name="publishDate"
                      id="publishDate"
                      defaultValue={formatDateForInput(newsItem.publishDate)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-emerald-800 mb-2">Read Time</label>
                    <input type="text" name="readTime" id="readTime" defaultValue={newsItem.readTime || ""} placeholder="e.g., 3 min read" className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white" />
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-emerald-800 mb-2">Comma-separated tags</label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      defaultValue={typeof newsItem.tags === 'string' ? newsItem.tags.replace(/[\["\]]/g, '') : (newsItem.tags || "")}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                      placeholder="e.g., finance, market, stocks"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center">
                  <input type="checkbox" name="featured" id="featured" defaultChecked={!!newsItem.featured} className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 border-emerald-300" />
                  <label htmlFor="featured" className="ml-2 block text-sm text-emerald-800">Featured Article</label>
                </div>
              </div>

              {/* 4. IPO Specific Fields (TEAL SECTION) */}
              <div className="border border-teal-200 rounded-xl p-6 bg-teal-50 shadow-md">
                <h2 className="text-2xl font-extrabold text-teal-900 mb-6 border-b border-teal-300 pb-2">
                  🚀 IPO Detail Fields (Optional)
                </h2>
                <p className="text-sm text-teal-700 mb-6 font-medium">
                  Fill these fields only if the content category is **IPO Scoop**.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                  {/* IPO Identification */}
                  <div>
                    <label htmlFor="ipoName" className="block text-sm font-medium text-teal-800 mb-2">IPO Name</label>
                    <input type="text" name="ipoName" id="ipoName" defaultValue={newsItem.ipoName || ""} placeholder="Ex: XYZ Tech IPO" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-teal-800 mb-2">Company Name</label>
                    <input type="text" name="companyName" id="companyName" defaultValue={newsItem.companyName || ""} placeholder="Ex: XYZ Technology Solutions Ltd." className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  {/* Pricing and Size */}
                  <div>
                    <label htmlFor="offerPrice" className="block text-sm font-medium text-teal-800 mb-2">Offer Price (Upper Band)</label>
                    <input type="text" name="offerPrice" id="offerPrice" defaultValue={newsItem.offerPrice || ""} placeholder="Ex: ₹105" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  <div>
                    <label htmlFor="priceRange" className="block text-sm font-medium text-teal-800 mb-2">Price Range (Ex: ₹100-105)</label>
                    <input type="text" name="priceRange" id="priceRange" defaultValue={newsItem.priceRange || ""} placeholder="Ex: ₹100 - ₹105" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  <div>
                    <label htmlFor="issueSize" className="block text-sm font-medium text-teal-800 mb-2">Issue Size</label>
                    <input type="text" name="issueSize" id="issueSize" defaultValue={newsItem.issueSize || ""} placeholder="Ex: 500 Cr" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  <div>
                    <label htmlFor="subscriptionRate" className="block text-sm font-medium text-teal-800 mb-2">Subscription Rate (Ex: 2.5x)</label>
                    <input type="text" name="subscriptionRate" id="subscriptionRate" defaultValue={newsItem.subscriptionRate || ""} placeholder="Ex: 2.5x" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  {/* IPO Timeline Dates */}
                  <div className="md:col-span-2 border-t border-teal-300 pt-6">
                    <h3 className="text-lg font-bold text-teal-800 mb-4">IPO Timeline</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      {/* Open Date */}
                      <div>
                        <label htmlFor="openDate" className="block text-sm font-medium text-teal-800 mb-2">IPO Open Date</label>
                        <input type="date" name="openDate" id="openDate" defaultValue={formatDateForInput(newsItem.openDate)} className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                      </div>

                      {/* Close Date */}
                      <div>
                        <label htmlFor="closeDate" className="block text-sm font-medium text-teal-800 mb-2">IPO Close Date</label>
                        <input type="date" name="closeDate" id="closeDate" defaultValue={formatDateForInput(newsItem.closeDate)} className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                      </div>

                      {/* Allotment Date */}
                      <div>
                        <label htmlFor="allotmentDate" className="block text-sm font-medium text-teal-800 mb-2">Allotment Date</label>
                        <input type="date" name="allotmentDate" id="allotmentDate" defaultValue={formatDateForInput(newsItem.allotmentDate)} className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                      </div>

                      {/* Refund Date */}
                      <div>
                        <label htmlFor="refundDate" className="block text-sm font-medium text-teal-800 mb-2">Refund Date</label>
                        <input type="date" name="refundDate" id="refundDate" defaultValue={formatDateForInput(newsItem.refundDate)} className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                      </div>

                      {/* Listing Date */}
                      <div>
                        <label htmlFor="listingDate" className="block text-sm font-medium text-teal-800 mb-2">Listing Date</label>
                        <input type="date" name="listingDate" id="listingDate" defaultValue={formatDateForInput(newsItem.listingDate)} className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Gains and Links */}
                  <div>
                    <label htmlFor="listingGain" className="block text-sm font-medium text-teal-800 mb-2">Listing Gain (Ex: +10%)</label>
                    <input type="text" name="listingGain" id="listingGain" defaultValue={newsItem.listingGain || ""} placeholder="Ex: +10% or -5%" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  <div>
                    <label htmlFor="currentPrice" className="block text-sm font-medium text-teal-800 mb-2">Current Price</label>
                    <input type="text" name="currentPrice" id="currentPrice" defaultValue={newsItem.currentPrice || ""} placeholder="Ex: ₹125" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
                  </div>

                  {/* Apply Link URL (Stretches across full width) */}
                  <div className="md:col-span-2">
                    <label htmlFor="applyLink" className="block text-sm font-medium text-teal-800 mb-2">Apply Link URL</label>
                    <input type="url" name="applyLink" id="applyLink" defaultValue={newsItem.applyLink || ""} placeholder="https://brokerage.com/apply-ipo" className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white" />
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