// app/(routes)/admin/news/[id]/edit/page.tsx
import { revalidatePath } from "next/cache";
import { db } from "../../../../../../config/db"; // Adjust path as needed
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { materials } from "../../../../../../config/schema";

export default async function EditMaterialPage({
  params,
}: {
  params:  Promise<{ id: string }>; 
}) {
  const { id } = await params;
  // Fetch the news item to edit
  const [materialItem] = await db
    .select()
    .from(materials)
    .where(eq(materials.id, id));

  if (!materialItem) {
    // Redirect if news item not found
    redirect("/admin/materials");
  }

  // Server Action to handle form submission
  async function updateMaterial(formData: FormData) {
    "use server";

    // --- Extract and validate form data ---
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;

    try {
      // --- Update the database ---
      await db
        .update(materials)
        .set({
          title,
          link: link || null,
        })
        .where(eq(materials.id, id));

      // --- Revalidate relevant paths ---
      revalidatePath("/materials"); // Assuming public materials list page
      revalidatePath(`/materials/${id}`); // Assuming public materials detail page
      revalidatePath("/admin/materials"); // Admin materials list

      // --- Redirect after successful update ---
      redirect("/admin/materials");
    } catch (error) {
      console.error("Error updating materials item:", error);
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
                  Edit Material
                </h1>
                <p className="mt-1 text-emerald-100">
                  Update the details for &quot;{materialItem.title}&quot;
                </p>
              </div>
              <div className="bg-emerald-500 p-3 rounded-full">
                <FaSave className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form action={updateMaterial} className="space-y-8">
              {/* Basic Information */}
              <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      defaultValue={materialItem.title || ""}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="link"
                      className="block text-sm font-medium text-emerald-800 mb-2"
                    >
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      id="link"
                      defaultValue={materialItem.link || ""}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
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
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}