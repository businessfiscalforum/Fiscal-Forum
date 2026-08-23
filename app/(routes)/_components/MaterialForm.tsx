// components/admin/MaterialForm.tsx (or wherever this component is located)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Removed unused import
// import { uuid } from 'drizzle-orm/pg-core';

interface MaterialFormData {
  title: string;
  link: string;
}

interface MaterialFormProps {
  initialData?: MaterialFormData & { id?: number }; // id might not be used here, but kept for potential future use
  onSubmit: (data: MaterialFormData) => Promise<void>;
}

export default function MaterialForm({ initialData, onSubmit }: MaterialFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<MaterialFormData>(
    initialData || {
      title: '',
      link: '',
    }
  );
  const [tagsInput, setTagsInput] = useState('');
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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      router.push('/admin/materials');
      router.refresh(); // Refresh the current route. Good for data consistency.
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save material item');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function for consistent input classes
  const inputClasses = "w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white disabled:bg-gray-100";
  const labelClasses = "text-sm font-medium text-emerald-800 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
      {/* Basic Information Section */}
      <div className="border flex flex-col gap-4 border-emerald-200 rounded-xl p-6 bg-emerald-50/30">
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
              placeholder="Enter the material title"
              />
          </div>

          <div>
            <label htmlFor="link" className={labelClasses}>
              External Link
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
            'Save material Item'
          )}
        </button>
      </div>
    </form>
  );
}