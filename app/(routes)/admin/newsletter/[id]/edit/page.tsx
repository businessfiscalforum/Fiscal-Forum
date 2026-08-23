// app/(routes)/admin/newsletter/[id]/edit/page.tsx
import { revalidatePath } from "next/cache";
import { db } from "../../../../../../config/db"; // Adjust path as needed
import { newsletter } from "../../../../../../config/schema"; // Adjust path as needed
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default async function EditNewsletterPage({
  params,
}: {
  params: Promise<{ id: string }>; // Assuming params is a promise that needs awaiting
}) {
  const { id } = await params;

  // --- Fetch the newsletter item to edit ---
  const [newsletterItem] = await db
    .select()
    .from(newsletter)
    .where(eq(newsletter.id, id));

  if (!newsletterItem) {
    // Redirect if newsletter item not found
    redirect("/admin/newsletter");
  }

  // --- Server Action to handle form submission ---
  async function updateNewsletter(formData: FormData) {
    "use server";

    // --- Extract form data ---
    // Using nullish coalescing and empty string fallbacks for safety
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const image = (formData.get("image") as string) || null; // Handle empty string as null
    const author = formData.get("author") as string;
    const publishDate = formData.get("publishDate") as string; // Comes as YYYY-MM-DD string

    try {
      await db
        .update(newsletter)
        .set({
          title,
          description,
          content,
          image :image || null,
          author,
          publishDate: publishDate ? new Date(publishDate) : new Date(),
        })
        .where(eq(newsletter.id, id));

      // --- Revalidate relevant paths ---
      // Assuming you have public newsletter list/detail pages
      revalidatePath("/news"); // Adjust path if needed
      revalidatePath(`/news/${id}`); // Adjust path if needed
      // Revalidate the admin list page
      revalidatePath("/admin/newsletter");

      // --- Redirect after successful update ---
      redirect("/admin/newsletter");
    } catch (error) {
      console.error("Error updating newsletter item:", error);
      // Consider adding user-facing error handling here (e.g., setting form state)
      // For now, re-throwing will likely result in a 500 error page
      throw error;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/admin/newsletter"
            className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Newsletter List</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
          {/* Header Section with Emerald Theme */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Edit Newsletter
                </h1>
                <p className="mt-1 text-emerald-100">
                  Update the details for &quot;{newsletterItem.title}&quot;
                </p>
              </div>
              <div className="bg-emerald-500 p-3 rounded-full">
                <FaSave className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form action={updateNewsletter} className="space-y-8">
              {/* Basic Information */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
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
                      defaultValue={newsletterItem.title || ""}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

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
                      defaultValue={newsletterItem.author || ""}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Description *
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      defaultValue={newsletterItem.description || ""}
                      required
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
                      defaultValue={newsletterItem.content || ""}
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
                  <div>
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
                      defaultValue={newsletterItem.image || ""}
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
                      // Ensure newsletterItem.publishDate is a Date object or valid date string
                      defaultValue={
                        newsletterItem.publishDate
                          ? new Date(newsletterItem.publishDate).toISOString().split('T')[0]
                          : ""
                      }
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-emerald-200">
                <Link
                  href="/admin/newsletter"
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