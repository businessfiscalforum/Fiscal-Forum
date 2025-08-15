'use client';

import { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { FaArrowLeft, FaSave, FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
// import { revalidatePath } from 'next/cache';

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
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
    category: '',
    author: '',
    publishDate: '',
    readTime: '',
    views: '',
    link: '',
    featured: false,
    tags: [] as string[],
    // IPO specific fields
    ipoName: '',
    companyName: '',
    priceRange: '',
    issueSize: '',
    listingDate: '',
    currentPrice: '',
    listingGain: '',
    subscriptionRate: ''
  });

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        // Unwrap params promise
        const { id } = await params;
        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch news item (${response.status})`);
        }
        const data = await response.json();
        
        // Process data for form
        setInitialData(data);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          content: data.content || '',
          image: data.image || '',
          category: data.category || '',
          author: data.author || '',
          publishDate: data.publishDate ? data.publishDate.split('T')[0] : '',
          readTime: data.readTime || '',
          views: data.views || '',
          link: data.link || '',
          featured: data.featured || false,
          tags: (() => {
  try {
    if (!data.tags || data.tags === 'null' || data.tags === '') return [];
    const parsed = JSON.parse(data.tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse tags:', e);
    return [];
  }
})(),
          // IPO fields
          ipoName: data.ipoName || '',
          companyName: data.companyName || '',
          priceRange: data.priceRange || '',
          issueSize: data.issueSize || '',
          listingDate: data.listingDate || '',
          currentPrice: data.currentPrice || '',
          listingGain: data.listingGain || '',
          subscriptionRate: data.subscriptionRate || ''
        });
        // revalidatePath("/news");
        // revalidatePath(`/news/${id}`); // detail page
        // revalidatePath("/admin/news");

        // redirect("/admin/news");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Error fetching news item:', err);
        setError(err.message || 'Failed to load news item');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Unwrap params promise
      const { id } = await params;
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // ✅ Let JSON.stringify handle the array
      });

      if (!response.ok) {
        throw new Error(`Failed to update news (${response.status})`);
      }
      
      // Show success feedback
      alert('News updated successfully!');
      router.push('/admin/news');
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error updating news:', err);
      setError(err.message || 'Failed to update news item');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-blue-500 mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Loading news details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to News List</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Edit News Article</h1>
                <p className="mt-1 text-blue-100">
                  Update the details for this news item
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <FaExclamationTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {error && (
              <div className="rounded-lg bg-red-50 p-4 mb-6">
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
              <div className="border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      rows={8}
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Media & Links */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Media & Links</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      id="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                      External Link *
                    </label>
                    <input
                      type="url"
                      name="link"
                      id="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Publishing Details */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Publishing Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      name="publishDate"
                      id="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      id="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 min read"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="views" className="block text-sm font-medium text-gray-700 mb-2">
                      Views
                    </label>
                    <input
                      type="number"
                      name="views"
                      id="views"
                      value={formData.views}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Featured Article
                  </label>
                </div>
              </div>

              {/* Tags Section */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tags</h2>
                
                <TagInput 
                  tags={formData.tags} 
                  onChange={handleTagsChange} 
                />
              </div>

              {/* IPO Specific Fields */}
              {formData.category === 'IPO Scoop' && (
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h2 className="text-xl font-bold text-blue-900 mb-6">IPO Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ipoName" className="block text-sm font-medium text-blue-800 mb-2">
                        IPO Name
                      </label>
                      <input
                        type="text"
                        name="ipoName"
                        id="ipoName"
                        value={formData.ipoName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-blue-800 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="priceRange" className="block text-sm font-medium text-blue-800 mb-2">
                        Price Range
                      </label>
                      <input
                        type="text"
                        name="priceRange"
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="issueSize" className="block text-sm font-medium text-blue-800 mb-2">
                        Issue Size
                      </label>
                      <input
                        type="text"
                        name="issueSize"
                        id="issueSize"
                        value={formData.issueSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="listingDate" className="block text-sm font-medium text-blue-800 mb-2">
                        Listing Date
                      </label>
                      <input
                        type="text"
                        name="listingDate"
                        id="listingDate"
                        value={formData.listingDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="currentPrice" className="block text-sm font-medium text-blue-800 mb-2">
                        Current Price
                      </label>
                      <input
                        type="text"
                        name="currentPrice"
                        id="currentPrice"
                        value={formData.currentPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="listingGain" className="block text-sm font-medium text-blue-800 mb-2">
                        Listing Gain
                      </label>
                      <input
                        type="text"
                        name="listingGain"
                        id="listingGain"
                        value={formData.listingGain}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subscriptionRate" className="block text-sm font-medium text-blue-800 mb-2">
                        Subscription Rate
                      </label>
                      <input
                        type="text"
                        name="subscriptionRate"
                        id="subscriptionRate"
                        value={formData.subscriptionRate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition flex items-center justify-center"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center disabled:opacity-50"
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

// Tag Input Component
function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 inline-flex items-center rounded-full text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a tag..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}