// app/(routes)/newsletters/[id]/page.tsx
// Consider renaming the folder to /newsletters/ if this is specifically for newsletters
import { db } from "../../../../../config/db";
import { newsletter } from "../../../../../config/schema"; // Ensure this points to your newsletters table
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from 'date-fns';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { validate as isUUID } from "uuid"; // Add UUID validation

// Define the type based on your schema
interface NewsletterItem {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  image: string | null;
  author: string | null;
  publishDate: Date | string | null; // Match your schema type
  // Add other fields from your schema if needed (e.g., substackLink)
}

export default async function NewsletterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // Adjusted for Next.js 14+ App Router
}) {
  const { id } = await params; // Unwrap the promise

  // Prevent hitting DB with invalid UUID or "create"
  if (!isUUID(id)) {
    console.warn(`Invalid UUID provided: ${id}`);
    return notFound();
  }

  try {
    const newsletterItems = await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.id, id));

    if (!newsletterItems || newsletterItems.length === 0) {
      console.warn(`Newsletter with ID ${id} not found`);
      return notFound();
    }

    const newslet = newsletterItems[0];

    // --- Robust Date Handling ---
    let publishDateObj: Date | null = null;
    if (newslet.publishDate) {
        if (typeof newslet.publishDate === 'string') {
            // Handle potential string dates (e.g., from serialization)
            const parsedDate = new Date(newslet.publishDate);
            if (!isNaN(parsedDate.getTime())) {
                publishDateObj = parsedDate;
            }
        } else if (newslet.publishDate instanceof Date) {
            // Handle Date objects directly
            publishDateObj = newslet.publishDate;
        }
        // Add logging if date is invalid for debugging
        if (!publishDateObj) {
            console.error("Invalid publishDate value:", newslet.publishDate);
        }
    }

    const isoDateString = publishDateObj?.toISOString() ?? "";
    let formattedDate: string = "Unknown date";
    if (publishDateObj) {
        try {
            formattedDate = format(publishDateObj, 'MMMM d, yyyy');
        } catch (formatError) {
            console.error("Error formatting date:", formatError);
            formattedDate = "Invalid Date";
        }
    }
    // --- End Date Handling ---

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/admin/newsletter" // Ensure this path is correct for your admin structure
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2 text-sm" />
              <span className="text-sm">Back to Newsletters</span> {/* Updated text */}
            </Link>
          </div>

          {/* Category Banner */}
          {/* Using fixed styling as in the first version for consistency */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center py-4 px-6 rounded-xl mb-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold">Newsletter</h2> {/* Singular form might be better */}
          </div>

          <article className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <header className="p-6 sm:p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                {publishDateObj && (
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1.5 text-emerald-500 flex-shrink-0" />
                    {/* Use the correctly formatted ISO string for dateTime */}
                    <time dateTime={isoDateString}>{formattedDate}</time>
                  </div>
                )}
                {/* Provide a fallback author */}
                <div className="flex items-center">
                  <FaUser className="mr-1.5 text-emerald-500 flex-shrink-0" />
                  <span>By {newslet.author || 'Fiscal Forum'}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {newslet.title}
              </h1>
            </header>

            {/* Featured Image */}
            {newslet.image && (
              <div className="relative w-full h-64 sm:h-80 md:h-96">
                <Image
                  src={newslet.image}
                  alt={`Featured image for ${newslet.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false} // Set to true only if it's the LCP element
                  unoptimized={false} // Set to true only if you want to bypass Image Optimization
                />
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              {/* Description / Excerpt - Italic */}
              {newslet.description && (
                <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-1">
                  {newslet.description}
                </p>
              )}

              {/* Main Content */}
              {/* Conditionally render content or a message if it's missing */}
              {newslet.content ? (
                <div
                  className="prose prose-emerald max-w-none
                             prose-headings:font-bold prose-headings:text-gray-900
                             prose-p:leading-relaxed
                             prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                             prose-strong:text-gray-900
                             prose-li:marker:text-emerald-500
                             prose-img:rounded-xl prose-img:shadow-md
                             prose-hr:border-gray-200"
                  dangerouslySetInnerHTML={{ __html: newslet.content }}
                />
              ) : (
                <p className="text-gray-500 italic">
                  {/* Updated message to reflect newsletter context */}
                  Content for this newsletter is currently unavailable.
                </p>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    // Handle potential database errors gracefully
    console.error("Error fetching newsletter:", error);
    return notFound(); // Or render a generic error page
  }
}