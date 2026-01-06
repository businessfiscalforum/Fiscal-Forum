"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaNewspaper,
  FaEnvelope,
  FaShareAlt,
  FaCheck,
  FaLink
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- Sub-component: ShareButton ---
const ShareButton = ({ id, title }: { id: string; title: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card's redirect click
    const shareUrl = `${window.location.origin}/newsletter/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this research insight: ${title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all duration-200 group"
    >
      {copied ? (
        <>
          <FaCheck className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Copied</span>
        </>
      ) : (
        <>
          <FaShareAlt className="w-3 h-3 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Share</span>
        </>
      )}
    </button>
  );
};

// --- Main Page Component ---
export interface Newsletter {
  id: string;
  title: string;
  description?: string;
  image?: string;
  publishDate: string;
}

const ClientNewsletterPage = ({ initialNews }: { initialNews: Newsletter[] }) => {
  const router = useRouter();
  const [newsletter, setNewsletter] = useState<Newsletter[]>([]);
  const [newsletterLoading, setNewsletterLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletter = async () => {
      setNewsletterLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`);
        const data = await response.json();
        setNewsletter(data.newsletter || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setNewsletterLoading(false);
      }
    };
    fetchNewsletter();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-emerald-600 text-white rounded-3xl shadow-xl shadow-emerald-100 mb-6"
          >
            <FaEnvelope className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-emerald-900 mb-4 tracking-tight">
            Our <span className="text-emerald-500">Newsletters</span>
          </h1>
          <p className="text-emerald-700/70 font-medium max-w-lg mx-auto">
            Premium market research and investment newsletters delivered to your screen.
          </p>
        </div>

        {/* Newsletter Grid */}
        {newsletterLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsletter.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                onClick={() => router.push(`/newsletter/${item.id}`)}
                className="group flex flex-col h-full bg-white rounded-[2rem] border border-emerald-50 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Image Wrap */}
                <div className="relative h-48 w-full overflow-hidden">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-emerald-100 flex items-center justify-center"><FaNewspaper className="w-12 h-12 text-emerald-300" /></div>
                  )}
                  
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-emerald-900 leading-tight mb-3 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-emerald-700/60 line-clamp-2 mb-6 font-medium">
                    {item.description || "Deep dive into the latest market trends and financial movements."}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-emerald-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-emerald-300 uppercase tracking-tighter">Published</span>
                      <span className="text-xs font-bold text-emerald-700">{formatDate(item.publishDate)}</span>
                    </div>

                    {/* The Normal Share Button */}
                    <ShareButton id={item.id} title={item.title} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientNewsletterPage;