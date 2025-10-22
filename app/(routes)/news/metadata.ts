// app/(routes)/news/metadata.ts

export const metadata = {
  title: "News & Insights | Fiscal Forum – Market Updates, IPO Scoop & Financial Trends",
  description:
    "Stay updated with the latest financial news, market buzz, corporate announcements, and IPO insights from Fiscal Forum. Real-time coverage for smart investors.",
  keywords: [
    "Fiscal Forum news",
    "stock market news India",
    "IPO updates",
    "financial news",
    "market insights",
    "corporate announcements",
    "investment news",
    "real-time stock updates",
    "IPO scoop Fiscal Forum",
    "business news India",
  ],
  authors: [{ name: "Fiscal Forum Team", url: "https://www.fiscalforum.in" }],
  creator: "Fiscal Forum",
  publisher: "Fiscal Forum",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.fiscalforum.in/news",
  },
  openGraph: {
    title: "Latest Financial News & IPO Updates | Fiscal Forum",
    description:
      "Get real-time market buzz, corporate pulse, and IPO scoop — all in one place. Trusted insights for Indian investors.",
    url: "https://www.fiscalforum.in/news",
    siteName: "Fiscal Forum",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market News & IPO Updates | Fiscal Forum",
    description:
      "Real-time financial news, IPO analysis, and market trends for smart investing in India.",
    site: "@FiscalForum",
    creator: "@FiscalForum",
  },
};