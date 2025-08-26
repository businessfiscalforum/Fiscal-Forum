// components/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export function NewsCard({
  id,
  title,
  description,
  image,
  author,
  publishDate,
  readTime,
  category,
  featured,
}: NewsCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full py-20">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
            {category}
          </span>
          <span className="text-xs text-gray-500">{publishDate}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            By {author} • {readTime}
          </div>
          <Link
            href={`/news/${id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}