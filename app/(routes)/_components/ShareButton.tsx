// components/ShareButton.tsx
"use client";

import { useState } from "react";
import { FaShare } from "react-icons/fa";

interface ShareButtonProps {
  title: string;
  pdfUrl: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, pdfUrl }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      const fullUrl = pdfUrl.startsWith("http")
        ? pdfUrl
        : `${window.location.origin}${pdfUrl}`;

      if (navigator.share) {
        await navigator.share({
          title,
          text: `Check out this research report: ${title}`,
          url: fullUrl,
        });
      } else {
        await navigator.clipboard.writeText(fullUrl);
        alert("PDF link copied to clipboard!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Share failed:", error.message);
      }

      const fullUrl = pdfUrl.startsWith("http")
        ? pdfUrl
        : `${window.location.origin}${pdfUrl}`;

      alert(`Unable to share automatically. Copy this link:\n\n${fullUrl}`);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg transition-colors font-medium"
    >
      <FaShare size={16} />
    </button>
  );
};
