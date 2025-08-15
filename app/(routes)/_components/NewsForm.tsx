'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uuid } from 'drizzle-orm/pg-core';

interface NewsFormData {
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: number;
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
}

interface NewsFormProps {
  initialData?: NewsFormData & { id?: number };
  onSubmit: (data: NewsFormData) => Promise<void>;
}

export default function NewsForm({ initialData, onSubmit }: NewsFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<NewsFormData>(
    initialData || {
      title: '',
      description: '',
      content: '',
      image: '',
      category: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '',
      views: 0,
      link: '',
      featured: false,
      tags: [],
      ipoName: '',
      companyName: '',
      priceRange: '',
      issueSize: '',
      listingDate: '',
      currentPrice: '',
      listingGain: '',
      subscriptionRate: '',
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
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
      setTagsInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      router.push('/admin/news');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save news item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            <option value="News Buzz">News Buzz</option>
            <option value="Corp Pulse">Corp Pulse</option>
            <option value="IPO Scoop">IPO Scoop</option>
            <option value="Market News">Market News</option>
            <option value="Policy">Policy</option>
            <option value="Commodities">Commodities</option>
            <option value="Forex">Forex</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Earnings">Earnings</option>
            <option value="Automotive">Automotive</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content *
          </label>
          <textarea
            name="content"
            id="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author *
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">
            Link *
          </label>
          <input
            type="url"
            name="link"
            id="link"
            value={formData.link}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">
            Publish Date
          </label>
          <input
            type="date"
            name="publishDate"
            id="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">
            Read Time
          </label>
          <input
            type="text"
            name="readTime"
            id="readTime"
            value={formData.readTime}
            onChange={handleChange}
            placeholder="e.g., 3 min read"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="views" className="block text-sm font-medium text-gray-700">
            Views
          </label>
          <input
            type="number"
            name="views"
            id="views"
            value={formData.views}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Featured Article
          </label>
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="mt-1 flex">
          <input
            type="text"
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="Add a tag"
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
              >
                <span className="sr-only">Remove</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* IPO Specific Fields */}
      {formData.category === 'IPO Scoop' && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">IPO Details</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="ipoName" className="block text-sm font-medium text-gray-700">
                IPO Name
              </label>
              <input
                type="text"
                name="ipoName"
                id="ipoName"
                value={formData.ipoName || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <input
                type="text"
                name="priceRange"
                id="priceRange"
                value={formData.priceRange || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="issueSize" className="block text-sm font-medium text-gray-700">
                Issue Size
              </label>
              <input
                type="text"
                name="issueSize"
                id="issueSize"
                value={formData.issueSize || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="listingDate" className="block text-sm font-medium text-gray-700">
                Listing Date
              </label>
              <input
                type="text"
                name="listingDate"
                id="listingDate"
                value={formData.listingDate || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
                Current Price
              </label>
              <input
                type="text"
                name="currentPrice"
                id="currentPrice"
                value={formData.currentPrice || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="listingGain" className="block text-sm font-medium text-gray-700">
                Listing Gain
              </label>
              <input
                type="text"
                name="listingGain"
                id="listingGain"
                value={formData.listingGain || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="subscriptionRate" className="block text-sm font-medium text-gray-700">
                Subscription Rate
              </label>
              <input
                type="text"
                name="subscriptionRate"
                id="subscriptionRate"
                value={formData.subscriptionRate || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}