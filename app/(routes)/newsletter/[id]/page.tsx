// app/(routes)/news/[id]/page.tsx
import { db } from "../../../../config/db";
import { newsletter } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from 'date-fns';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';

export default async function NewsletterDetailPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const newsletterItems = await db
    .select()
    .from(newsletter)
    .where(eq(newsletter.id, id));

  if (!newsletterItems || newsletterItems.length === 0) {
    return notFound();
  }

  const item = newsletterItems[0];

  // --- Date Handling (Same as news detail page) ---
  let publishDateObj: Date;
  if (typeof item.publishDate === 'string') {
    publishDateObj = new Date(item.publishDate);
  } else if (item.publishDate instanceof Date) {
    publishDateObj = item.publishDate;
  } else {
    console.error("Unexpected publishDate type for newsletter:", typeof item.publishDate, item.publishDate);
    publishDateObj = new Date();
  }

  const isoDateString = publishDateObj.toISOString();
  let formattedDate: string;
  try {
    formattedDate = format(publishDateObj, 'MMMM d, yyyy');
  } catch (e) {
    console.error("Error formatting date for newsletter:", e);
    formattedDate = "Invalid Date";
  }
  // --- End Date Handling ---

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-30 sm:py-30 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 text-sm" />
            <span className="text-sm">Back to News</span>
          </Link>
        </div>

        {/* Newsletter Banner (Static) */}
        <div className={`bg-gradient-to-r from-emerald-600 to-green-700 text-white text-center py-4 px-6 rounded-xl mb-8 shadow-lg`}>
          <h2 className="text-xl sm:text-2xl font-bold">Newsletter</h2>
        </div>

        <article className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* Header Section */}
          <header className="p-6 sm:p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1.5 text-emerald-500 flex-shrink-0" />
                <time dateTime={isoDateString}>{formattedDate}</time>
              </div>
              <div className="flex items-center">
                <FaUser className="mr-1.5 text-emerald-500 flex-shrink-0" />
                <span>By {item.author || 'Fiscal Forum'}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {item.title}
            </h1>
          </header>

          {/* Featured Image */}
          {item.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={item.image}
                alt={`Featured image for ${item.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                unoptimized // Add if your images might not be from a standard image host
              />
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            {/* Description / Excerpt - Italic */}
            {item.description && (
              <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-1">
                {item.description}
              </p>
            )}

            {/* Main Content */}
            {item.content ? (
              // Using the same styling classes as the news detail page for consistency
              <div
                className="prose prose-emerald max-w-none
                           prose-headings:font-bold prose-headings:text-gray-900
                           prose-p:leading-relaxed
                           prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-gray-900
                           prose-li:marker:text-emerald-500
                           prose-img:rounded-xl prose-img:shadow-md
                           prose-hr:border-gray-200"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ) : (
              <p className="text-gray-500 italic">Content for this newsletter is currently unavailable.</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}