"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function WhatsAppCommunityWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem("whatsapp_community_dismissed");
    if (!isDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    sessionStorage.setItem("whatsapp_community_dismissed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="whatsapp-community-widget-wrap">
      <a
        href="https://whatsapp.com/channel/0029VbCHLui8Pgs8ccUz6y0E"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-community-widget-link"
      >
        <div className="whatsapp-widget-icon-container">
          <Image
            src="/images/whatsapp-icon.png"
            alt="WhatsApp Icon"
            width={34}
            height={34}
            className="whatsapp-widget-icon"
          />
        </div>
        <div className="whatsapp-widget-text-container">
          <span className="whatsapp-widget-message">
            Join the Exclusive Finance Community
          </span>
        </div>
      </a>
      <button
        onClick={handleClose}
        className="whatsapp-widget-close-btn"
        aria-label="Close message"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
