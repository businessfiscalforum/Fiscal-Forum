/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Trash2, Edit, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- UPDATED COMPLETE INTERFACE ---
interface NewsItem {
    // ID MUST be string to match Drizzle UUID
    id: string; 
    title: string;
    description: string | null;
    content: string | null;
    image: string | null;
    category: string;
    author: string;
    publishDate: string | Date;
    readTime: string | null;
    link: string;
    featured: boolean;
    tags: string | null;
    ipoName: string | null;
    companyName: string | null;
    priceRange: string | null;
    issueSize: string | null;
    listingDate: string | null;
    currentPrice: string | null;
    listingGain: string | null;
    subscriptionRate: string | null;
    applyLink: string | null;
    offerPrice: string | null;
    openDate: string | null;
    closeDate: string | null;
    allotmentDate: string | null;
    refundDate: string | null;
    // Allow dynamic keys for safe iteration
    [key: string]: any; 
}
// ------------------------------------

// Helper function to format any value (reused from previous steps)
function formatValue(value: any): string {
    if (value === null || value === undefined) return "—";
    
    // Format Date objects or date strings
    if (value instanceof Date) {
        return format(value, 'MMM dd, yyyy');
    }
    if (typeof value === "string") {
        // Format date strings if they look like dates and aren't too long
        if (!isNaN(Date.parse(value)) && value.length < 50 && value.includes('-')) {
            return format(new Date(value), 'MMM dd, yyyy');
        }
        // Truncate long strings for table display
        if (value.length > 20) {
            return value.substring(0, 17) + '...';
        }
    }
    
    // Handle booleans
    if (typeof value === "boolean") {
        return value ? 'Yes' : 'No';
    }
    
    return String(value);
}

// Map database column names to readable headers
const COLUMN_HEADERS: Record<string, string> = {
    id: 'ID',
    title: 'Title',
    category: 'Category',
    author: 'Author',
    publishDate: 'Pub Date',
    featured: 'Featured',
    description: 'Desc',
    content: 'Content',
    readTime: 'Read Time',
    link: 'Link',
    tags: 'Tags',
    ipoName: 'IPO Name',
    companyName: 'Company',
    priceRange: 'Price Range',
    issueSize: 'Issue Size',
    listingDate: 'List Date',
    currentPrice: 'Cur Price',
    listingGain: 'Gain',
    subscriptionRate: 'Sub Rate',
    applyLink: 'Apply Link',
    offerPrice: 'Offer Price',
    openDate: 'Open Date',
    closeDate: 'Close Date',
    allotmentDate: 'Allot Date',
    refundDate: 'Refund Date',
};


export default function NewsList() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); 

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            // NOTE: Assuming your API returns the raw database objects
            const res = await fetch(`/api/news`); // Changed to assumed admin route
            const data = await res.json();
            
            const fetchedItems = Array.isArray(data) ? data : data.news || []; 
            
            // Normalize data types for client state
            const normalizedItems: NewsItem[] = fetchedItems.map((item: any) => ({
                ...item,
                // FIX: Ensure ID is always a string
                id: String(item.id), 
                // Ensure publishDate is a usable Date object
                publishDate: item.publishDate ? new Date(item.publishDate) : new Date(),
                featured: item.featured === true,
            }));

            setNewsItems(normalizedItems);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteNews = async (id: string) => { // ID must be string
        if (!confirm('Are you sure you want to delete this news item?')) return;
        
        try {
            const res = await fetch(`/api/admin/news/${id}`, { 
                method: 'DELETE',
            });
            
            if (res.ok) {
                setNewsItems(newsItems.filter(item => item.id !== id));
                router.refresh(); 
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting news:', error);
            alert('Failed to delete news item');
        }
    };

    if (loading) {
        return <div className="flex justify-center py-10">Loading...</div>;
    }
    
    if (newsItems.length === 0) {
        return <div className="p-4 text-center text-gray-500">No news items found.</div>;
    }

    // Get all column keys from the first item
    const allKeys = Object.keys(newsItems[0]);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {/* Explicit Headers for ALL Fields */}
                        {allKeys.map((key) => (
                            <th 
                                key={key} 
                                className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap max-w-[100px] border-r border-gray-200 last:border-r-0"
                            >
                                {COLUMN_HEADERS[key] || key.replace(/([A-Z])/g, ' $1').trim()}
                            </th>
                        ))}
                        
                        {/* Static Action Header */}
                        <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {newsItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                            
                            {/* Dynamic Data Cells for ALL Fields */}
                            {allKeys.map((key) => (
                                <td 
                                    key={key} 
                                    className="py-2 px-3 text-xs text-gray-700 max-w-[150px] truncate border-r border-gray-100 last:border-r-0"
                                    title={String(item[key as keyof NewsItem] || '')} // Show full content on hover
                                >
                                    {formatValue(item[key as keyof NewsItem])}
                                </td>
                            ))}
                            
                            {/* Actions Column */}
                            <td className="py-2 px-3 text-xs font-medium whitespace-nowrap text-center">
                                <div className="flex space-x-2 justify-center">
                                    <Link
                                        href={`/admin/news/${item.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                                        aria-label="Edit"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={`/news/${item.id}`} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-900 transition-colors"
                                        aria-label="View"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            deleteNews(item.id);
                                        }}
                                        className="text-red-600 hover:text-red-900 transition-colors"
                                        aria-label="Delete"
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
