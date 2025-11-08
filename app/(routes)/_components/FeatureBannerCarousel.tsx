"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// Mock tracking function (replace with your GA/GTM)
const trackEvent = (category: string, label: string) => {
  console.log(`[GA] ${category} | ${label}`);
};

type FeatureCard = {
  id: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  href: string;
  bgColor: string; // Tailwind class or custom color
  icon: React.ReactNode;
  trackLabel: string;
};

const featureCards: FeatureCard[] = [
  {
    id: "investment",
    title: "Investment Plans",
    subtitle: "Invest ₹10K and Get ₹1 Crore return*",
    buttonText: "Get A Callback",
    href: "insurance/investment-plan-card",
    bgColor: "bg-gradient-to-r from-lime-400 to-lime-500",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    trackLabel: "Investment Plans",
  },
  {
    id: "health",
    title: "Health Insurance",
    subtitle: "Book Free Health Insurance Consultation at home",
    buttonText: "Book home visit",
    href: "insurance/health-insurance-card",
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    trackLabel: "Health Insurance",
  },
  {
    id: "sip",
    title: "SIP Calculator",
    subtitle:
      "Reach your financial goals. Make investment simple with our SIP calculator",
    buttonText: "Calculate now",
    href: "insurance/sip-calculator",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-500",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
    trackLabel: "SIP Calculator",
  },
  {
    id: "home",
    title: "Home Insurance",
    subtitle:
      "₹50 Lakh Cover for Your Home Insurance starting at Just ₹80/month*",
    buttonText: "Get Quote",
    href: "insurance/home-insurance-card",
    bgColor: "bg-gradient-to-r from-cyan-400 to-cyan-500",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 5.99L19.53 19H4.47L12 5.99zM12 2L1 9l4 4.99L12 19l7-5.01L23 9l-11-7zm0 15.59L8.24 14H11V12H7v4h3.24L12 17.59z" />
      </svg>
    ),
    trackLabel: "Home Insurance",
  },
  {
    id: "askff",
    title: "AskFF",
    subtitle: "Got a question about insurance? Write to us",
    buttonText: "Write to us",
    href: "insurance/askff",
    bgColor: "bg-gradient-to-r from-red-400 to-red-500",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.67 0-5.25-.75-7.47-2.09L12 16l7.47 2.09C17.25 19.25 14.67 20 12 20zm0-2c-2.67 0-5.25-.75-7.47-2.09L12 16l7.47 2.09C17.25 19.25 14.67 20 12 20z" />
      </svg>
    ),
    trackLabel: "AskFF",
  },
  {
    id: "sip1",
    title: "SIP Calculator",
    subtitle:
      "Reach your financial goals. Make investment simple with our SIP calculator",
    buttonText: "Calculate now",
    href: "insurance/sip-calculator",
    bgColor: "bg-gradient-to-r from-purple-400 to-pink-500",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
    trackLabel: "SIP Calculator",
  },
];

export default function FeatureCardCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 3, // 👈 GROUP BY 3
    skipSnaps: false,
    dragFree: false,
  });

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const handleCardClick = (trackLabel: string) => {
    trackEvent('carousel-featurebanner', trackLabel);
  };

  return (
    <div className="blk-prd featurebox py-8">
      <div className="container mx-auto px-4">
        <div className="featurebanner relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-2">
              {featureCards.map((card) => (
                <div key={card.id} className="flex-[0_0_calc(100%/3)] px-2">
                  {/* Your card JSX — remove the inner <button> to fix drag */}
                  <Link
                    href={card.href}
                    onClick={() => handleCardClick(card.trackLabel)}
                    className={`block rounded-xl p-5 shadow-lg ${card.bgColor} text-white h-[220px] flex flex-col justify-between`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-xs font-medium opacity-80">
                        {card.title}
                      </div>
                      <div className="text-2xl">{card.icon}</div>
                    </div>
                    <div className="mb-4 flex-grow">
                      <p
                        className="text-lg font-semibold leading-tight"
                        dangerouslySetInnerHTML={{ __html: card.subtitle }}
                      />
                    </div>
                    {card.buttonText && (
                      <div className="text-white/90 text-sm font-medium">
                        {card.buttonText} →
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Dots — now based on real scroll snaps */}
          <div className="embla__dots flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  selectedIndex === idx ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
