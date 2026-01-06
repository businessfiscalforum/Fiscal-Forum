"use client";

import { useState } from "react";
import { FaShareAlt, FaCheck, FaLink, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareNews({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-all font-semibold text-sm border border-emerald-200"
      >
        <FaShareAlt className="text-emerald-600" />
        Share
      </button>

      {/* Dropdown Fallback for Desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 z-50 overflow-hidden"
          >
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-xl transition-colors text-sm text-gray-700"
            >
              {copied ? <FaCheck className="text-green-500" /> : <FaLink className="text-emerald-500" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-xl transition-colors text-sm text-gray-700"
            >
              <FaWhatsapp className="text-green-500" />
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-xl transition-colors text-sm text-gray-700"
            >
              <FaLinkedin className="text-blue-600" />
              LinkedIn
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}