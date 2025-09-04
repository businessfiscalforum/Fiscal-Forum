// app/(routes)/news/[id]/page.tsx
import { db } from "../../../../../config/db";
import { newsTable } from "../../../../../config/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
// Import format
import { format } from 'date-fns';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaClock, FaEye, FaStar } from 'react-icons/fa';

// Helper function to determine banner style
const getBannerStyle = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('ipo')) {
    return "bg-gradient-to-r from-teal-600 to-emerald-700";
  } else if (lowerCategory.includes('corp') || lowerCategory.includes('pulse')) {
    return "bg-gradient-to-r from-green-600 to-teal-700";
  } else {
    // Default for News Buzz or other categories
    return "bg-gradient-to-r from-emerald-600 to-green-700";
  }
};

// Helper function to determine banner text
const getBannerText = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('ipo')) {
    return "IPO Scoop";
  } else if (lowerCategory.includes('corp') || lowerCategory.includes('pulse')) {
    return "Corp Pulse";
  } else {
    // Default for News Buzz or other categories
    return "News Buzz";
  }
};

export default async function NewsDetailPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const newsItems = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, id));

  if (!newsItems || newsItems.length === 0) {
    return notFound();
  }

  const news = newsItems[0];

  // Ensure publishDate is a Date object (this is what Drizzle ORM should provide by default)
  // Handle potential cases where it might be a string (e.g., from serialization) gracefully
  let publishDateObj: Date;
  if (typeof news.publishDate === 'string') {
    // If it's unexpectedly a string, try to parse it
    publishDateObj = new Date(news.publishDate);
  } else if (news.publishDate instanceof Date) {
    // If it's correctly a Date object
    publishDateObj = news.publishDate;
  } else {
    // Fallback if type is unexpected
    console.error("Unexpected publishDate type:", typeof news.publishDate, news.publishDate);
    publishDateObj = new Date(); // Use current date as fallback
  }

  // --- Critical Fix ---
  // 1. Use the Date object (`publishDateObj`) to get the ISO string for `dateTime`.
  //    toISOString() provides the required format (e.g., "2024-06-13T10:30:00.000Z").
  const isoDateString = publishDateObj.toISOString();

  // 2. Use the Date object (`publishDateObj`) with date-fns `format` for display.
  let formattedDate: string;
  try {
    formattedDate = format(publishDateObj, 'MMMM d, yyyy');
  } catch (e) {
    console.error("Error formatting date:", e);
    formattedDate = "Invalid Date";
  }
  // --- End Critical Fix ---

  const bannerText = getBannerText(news.category ?? "");
  const bannerStyle = getBannerStyle(news.category ?? "");


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 text-sm" />
            <span className="text-sm">Back</span>
          </Link>
        </div>

        {/* Category Banner */}
        <div className={`${bannerStyle} text-white text-center py-4 px-6 rounded-xl mb-8 shadow-lg`}>
          <h2 className="text-xl sm:text-2xl font-bold">{bannerText}</h2>
        </div>

        <article className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* Header Section */}
          <header className="p-6 sm:p-8">
            {/* Meta Information */}
            {/* Use isoDateString (string) for the dateTime attribute */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1.5 text-emerald-500 flex-shrink-0" />
                {/* Pass the ISO string to dateTime, display the formatted date */}
                <time dateTime={isoDateString}>{formattedDate}</time>
              </div>
              <div className="flex items-center">
                <FaUser className="mr-1.5 text-emerald-500 flex-shrink-0" />
                <span>By {news.author || 'Fiscal Forum'}</span>
              </div>
              {news.readTime && (
                <div className="flex items-center">
                  <FaClock className="mr-1.5 text-emerald-500 flex-shrink-0" />
                  <span>{news.readTime}</span>
                </div>
              )}
            </div>

            {/* Category Badge & Featured Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                {news.category}
              </span>
              {news.featured && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                  <FaStar className="h-3.5 w-3.5 mr-1" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>
          </header>

          {/* Featured Image */}
          {news.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={news.image}
                alt={`Featured image for ${news.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            {/* Description / Excerpt - Italic */}
            {news.description && (
              <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-1">
                {news.description}
              </p>
            )}

            {/* Main Content */}
            {news.content ? (
              <div
                className="prose prose-emerald max-w-none
                           prose-headings:font-bold prose-headings:text-gray-900
                           prose-p:leading-relaxed
                           prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-gray-900
                           prose-li:marker:text-emerald-500
                           prose-img:rounded-xl prose-img:shadow-md
                           prose-hr:border-gray-200"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            ) : (
              <p className="text-gray-500 italic">Content for this article is currently unavailable.</p>
            )}
          </div>

          {/* Article Footer */}
          <footer className="p-6 sm:p-8 pt-0 border-t border-gray-100 text-xs sm:text-sm text-gray-500 flex items-center justify-between">
            {news.featured && (
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                  <FaStar className="h-3 w-3 mr-1" />
                  Featured
                </span>
              </div>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
}