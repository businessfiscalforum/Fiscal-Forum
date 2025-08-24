// app/admin/news/[id]/edit/page.tsx (or wherever this file is located)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function EditNewsLetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchNewsletterItem = async () => {
      try {
        // Unwrap params promise
        const { id } = await params;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/${id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch newsletter item (${response.status})`);
        }
        const data = await response.json();

        // Process data for form
        setInitialData(data);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
          image: data.image || "",
          author: data.author || "",
          publishDate: data.publishDate ? data.publishDate.split("T")[0] : "",
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error fetching newsletter item:", err);
        setError(err.message || "Failed to load news item");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletterItem();
  }, [params]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    // Use type assertion for checkbox
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Unwrap params promise
      const { id } = await params;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update newsletter (${response.status})`);
      }

      // Show success feedback
      alert("Newsletter updated successfully!");
      router.push("/admin/newsletter");
      router.refresh(); 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error updating newsletter:", err);
      setError(err.message || "Failed to update newsletter item");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      )
    ) {
      router.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-emerald-600 mx-auto" />
          <p className="mt-4 text-lg text-emerald-800">Loading newsletter details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Newsletter List</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Edit Newsletter Article
                </h1>
                <p className="mt-1 text-emerald-100">
                  Update the details for this newsletter item
                </p>
              </div>
              <div className="bg-emerald-500 p-3 rounded-full">
                <FaExclamationTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {/* Error Message Banner */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 mb-6 border border-red-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
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
                      value={formData.title}
                      onChange={handleInputChange}
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
                      value={formData.description}
                      onChange={handleInputChange}
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
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
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
                      value={formData.image}
                      onChange={handleInputChange}
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
                      value={formData.author}
                      onChange={handleInputChange}
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
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-emerald-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-emerald-300 rounded-lg text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center justify-center"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center justify-center shadow-md disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
