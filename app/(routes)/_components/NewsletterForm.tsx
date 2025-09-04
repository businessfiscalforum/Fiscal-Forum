// components/admin/NewsletterForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the form data interface matching your database schema
interface NewsletterFormData {
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
}

// Props interface for the form component
interface NewsletterFormProps {
  initialData?: NewsletterFormData & { id?: string };
  onSubmit: (data: NewsletterFormData) => Promise<void>;
}

export default function NewsletterForm({ initialData, onSubmit }: NewsletterFormProps) {
  const router = useRouter();
  
  // Initialize form state with default values or existing data
  const [formData, setFormData] = useState<NewsletterFormData>(
    initialData || {
      title: '',
      description: '',
      content: '',
      image: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0], // Default to today
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for all form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      router.push('/admin/newsletter');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save newsletter');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function for consistent input classes
  const inputClasses = "w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white disabled:bg-gray-100";
  const labelClasses = "block text-sm font-medium text-emerald-800 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
      {/* Basic Information Section */}
      <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">Newsletter Details</h2>
        <div className="space-y-6">
          <div>
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
              placeholder="Enter the newsletter title"
            />
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

          <div>
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
              placeholder="Brief summary of the newsletter"
            />
          </div>

          <div>
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

      {/* Media and Publishing Section */}
      <div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">Media & Publishing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="image" className={labelClasses}>
              Featured Image URL
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://example.com/image.jpg"
            />
          </div>

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
        </div>
      </div>

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
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Newsletter'
          )}
        </button>
      </div>
    </form>
  );
}