'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Trash2, Edit, Eye } from 'lucide-react';

interface NewsletterItem {
  id: string;  // 👈 UUID from API, not number
  title: string;
  description: string;
  content: string;
  image?: string;
  author: string;
  publishDate: string;
}

export default function NewsList() {
  const [newsletterItems, setNewsletterItems] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsletter();
  }, []);

  const fetchNewsletter = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`);
      if (!res.ok) throw new Error("Failed to fetch newsletter");
      const data = await res.json();

      // ✅ Fix: API returns { newsletter: [...] }
      setNewsletterItems(Array.isArray(data.newsletter) ? data.newsletter : []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching newsletter:", err);
      setError("Failed to load newsletter");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this newsletter item?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNewsletterItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting newsletter:", error);
      alert("Failed to delete newsletter item");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {newsletterItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.publishDate ? format(new Date(item.publishDate), "MMM dd, yyyy") : "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/newsletter/${item.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/newsletter/${item.id}`}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => deleteNews(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
