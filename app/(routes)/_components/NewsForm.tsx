// components/admin/NewsForm.tsx (or wherever this component is located)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Removed unused import
// import { uuid } from 'drizzle-orm/pg-core';

interface NewsFormData {
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  link: string;
  featured: boolean;
  tags: string[];
  // IPO fields
  ipoName?: string;
  companyName?: string;
  priceRange?: string;
  issueSize?: string;
  listingDate?: string;
  currentPrice?: string;
  listingGain?: string;
  subscriptionRate?: string;
  offerPrice?: string;
  openDate?: string;
  closeDate?: string;
  allotmentDate?: string;
  refundDate?: string;
  applyLink?: string;
}

interface NewsFormProps {
  initialData?: NewsFormData & { id?: number }; // id might not be used here, but kept for potential future use
  onSubmit: (data: NewsFormData) => Promise<void>;
}

export default function NewsForm({ initialData, onSubmit }: NewsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<NewsFormData>(
    initialData || {
      title: "",
      description: "",
      content: "",
      image: "",
      category: "",
      author: "",
      publishDate: new Date().toISOString().split("T")[0],
      readTime: "",
      link: "",
      featured: false,
      tags: [],
      ipoName: "",
      companyName: "",
      priceRange: "",
      issueSize: "",
      listingDate: "",
      currentPrice: "",
      listingGain: "",
      subscriptionRate: "",
    }
  );
  const [tagsInput, setTagsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    // Type assertion for checkbox
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const addTag = () => {
    if (tagsInput.trim() && !formData.tags.includes(tagsInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagsInput.trim()],
      });
      setTagsInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      router.push("/admin/news");
      router.refresh(); // Refresh the current route. Good for data consistency.
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save news item");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function for consistent input classes
  const inputClasses =
    "w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white disabled:bg-gray-100";
  const labelClasses = "block text-sm font-medium text-emerald-800 mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100"
    >
      {/* Basic Information Section */}
      <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className={labelClasses}>
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter the news title"
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClasses}>
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputClasses} appearance-none bg-white`}
            >
              <option value="">Select a category</option>
              <option value="News Buzz">News Buzz</option>
              <option value="Corp Pulse">Corp Pulse</option>
              <option value="IPO Scoop">IPO Scoop</option>
            </select>
          </div>

          <div>
            <label htmlFor="author" className={labelClasses}>
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Author name"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className={labelClasses}>
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Brief summary of the news article"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="content" className={labelClasses}>
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows={10}
              value={formData.content}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Full content of the news article"
            />
          </div>
        </div>
      </div>

      {/* Media & Links Section */}
      <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          Media & Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="image" className={labelClasses}>
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="link" className={labelClasses}>
              External Link/ Allotment Link (ipo)
            </label>
            <input
              type="url"
              name="link"
              id="link"
              value={formData.link}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://external-source.com/article"
            />
          </div>
        </div>
      </div>

      {/* Publishing Details Section */}
      <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          Publishing Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="publishDate" className={labelClasses}>
              Publish Date
            </label>
            <input
              type="date"
              name="publishDate"
              id="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="readTime" className={labelClasses}>
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              id="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g., 3 min read"
              className={inputClasses}
            />
          </div>

          <div className="flex items-end">
            <div className="flex items-center h-full pb-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 border-emerald-300"
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm font-medium text-emerald-800"
              >
                Featured Article
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">Tags</h2>
        <div className="mt-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="Add a tag (e.g., finance, markets)"
            className={`${inputClasses} flex-grow`}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <button
            type="button"
            onClick={addTag}
            className="px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition whitespace-nowrap"
          >
            Add Tag
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-emerald-500 hover:bg-emerald-200 hover:text-emerald-700 focus:outline-none focus:bg-emerald-500 focus:text-white"
                aria-label={`Remove tag ${tag}`}
              >
                <span className="sr-only">Remove</span>
                <svg
                  className="h-3 w-3"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* IPO Specific Fields Section */}
      {formData.category === "IPO Scoop" && (
        <div className="border border-teal-200 rounded-xl p-6 bg-teal-50 shadow-md">
          <h2 className="text-2xl font-extrabold text-teal-900 mb-6 border-b border-teal-300 pb-2">
            IPO Detail Fields (Optional)
          </h2>
          <p className="text-sm text-teal-700 mb-6 font-medium">
            Fill these fields only if the content category is IPO Scoop.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* --- IPO Identification --- */}

            {/* IPO Name */}
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
                defaultValue={formData.ipoName || ""}
                placeholder="Ex: XYZ Tech IPO"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* Company Name */}
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
                defaultValue={formData.companyName || ""}
                placeholder="Ex: XYZ Technology Solutions Ltd."
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* --- Pricing and Size --- */}

            {/* Offer Price (NEW: Single Attractive Price) */}
            <div>
              <label
                htmlFor="offerPrice"
                className="block text-sm font-medium text-teal-800 mb-2"
              >
                Offer Price (Upper Band)
              </label>
              <input
                type="text"
                name="offerPrice"
                id="offerPrice"
                defaultValue={formData.offerPrice || ""}
                placeholder="Ex: ₹105"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* Price Range */}
            <div>
              <label
                htmlFor="priceRange"
                className="block text-sm font-medium text-teal-800 mb-2"
              >
                Price Range (Ex: ₹100-105)
              </label>
              <input
                type="text"
                name="priceRange"
                id="priceRange"
                defaultValue={formData.priceRange || ""}
                placeholder="Ex: ₹100 - ₹105"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* Issue Size */}
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
                defaultValue={formData.issueSize || ""}
                placeholder="Ex: 500 Cr"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* Subscription Rate */}
            <div>
              <label
                htmlFor="subscriptionRate"
                className="block text-sm font-medium text-teal-800 mb-2"
              >
                Subscription Rate (Ex: 2.5x)
              </label>
              <input
                type="text"
                name="subscriptionRate"
                id="subscriptionRate"
                defaultValue={formData.subscriptionRate || ""}
                placeholder="Ex: 2.5x"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* --- IPO Timeline Dates (Date inputs are often simpler than text inputs for dates) --- */}
            <div className="md:col-span-2 border-t border-teal-300 pt-6">
              <h3 className="text-lg font-bold text-teal-800 mb-4">
                IPO Timeline
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Open Date */}
                <div>
                  <label
                    htmlFor="openDate"
                    className="block text-sm font-medium text-teal-800 mb-2"
                  >
                    IPO Open Date
                  </label>
                  <input
                    type="date"
                    name="openDate"
                    id="openDate"
                    defaultValue={
                      formData.openDate ? formData.openDate.split("T")[0] : ""
                    } // Cleans potential timestamp formatting for date input
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                  />
                </div>

                {/* Close Date */}
                <div>
                  <label
                    htmlFor="closeDate"
                    className="block text-sm font-medium text-teal-800 mb-2"
                  >
                    IPO Close Date
                  </label>
                  <input
                    type="date"
                    name="closeDate"
                    id="closeDate"
                    defaultValue={
                      formData.closeDate ? formData.closeDate.split("T")[0] : ""
                    }
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                  />
                </div>

                {/* Allotment Date */}
                <div>
                  <label
                    htmlFor="allotmentDate"
                    className="block text-sm font-medium text-teal-800 mb-2"
                  >
                    Allotment Date
                  </label>
                  <input
                    type="date"
                    name="allotmentDate"
                    id="allotmentDate"
                    defaultValue={
                      formData.allotmentDate
                        ? formData.allotmentDate.split("T")[0]
                        : ""
                    }
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                  />
                </div>

                {/* Refund Date */}
                <div>
                  <label
                    htmlFor="refundDate"
                    className="block text-sm font-medium text-teal-800 mb-2"
                  >
                    Refund Date
                  </label>
                  <input
                    type="date"
                    name="refundDate"
                    id="refundDate"
                    defaultValue={
                      formData.refundDate
                        ? formData.refundDate.split("T")[0]
                        : ""
                    }
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                  />
                </div>

                {/* Listing Date */}
                <div>
                  <label
                    htmlFor="listingDate"
                    className="block text-sm font-medium text-teal-800 mb-2"
                  >
                    Listing Date
                  </label>
                  <input
                    type="date"
                    name="listingDate"
                    id="listingDate"
                    defaultValue={
                      formData.listingDate
                        ? formData.listingDate.split("T")[0]
                        : ""
                    }
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* --- Gains and Links --- */}

            {/* Listing Gain / gmp */}
            <div>
              <label
                htmlFor="listingGain"
                className="block text-sm font-medium text-teal-800 mb-2"
              >
                GMP (Ex: +10%)
              </label>
              <input
                type="text"
                name="gmp"
                id="gmp"
                defaultValue={formData.listingGain || ""}
                placeholder="Ex: +10% or -5%"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* Current Price (Retained for flexibility, assuming you track it) */}
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
                defaultValue={formData.currentPrice || ""}
                placeholder="Ex: ₹125"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>

            {/* Apply Link URL (Stretches across full width) */}
            <div className="md:col-span-2">
              <label
                htmlFor="applyLink"
                className="block text-sm font-medium text-teal-800 mb-2"
              >
                Apply Link URL
              </label>
              <input
                type="url"
                name="applyLink"
                id="applyLink"
                defaultValue={formData.applyLink || ""}
                placeholder="https://brokerage.com/apply-ipo"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-emerald-200">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-6 py-3 border border-emerald-300 rounded-lg text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center justify-center disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition flex items-center justify-center shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save News Item"
          )}
        </button>
      </div>
    </form>
  );
}
