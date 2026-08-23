// app/(routes)/newsletter/metadata.ts

export const metadata = {
  title: "Newsletters | Fiscal Forum – Financial Insights & Market Trends",
  description:
    "Subscribe to Fiscal Forum’s curated newsletters for expert analysis, market trends, investment tips, and financial updates delivered straight to your inbox.",
  keywords: [
    "Fiscal Forum newsletter",
    "financial newsletters India",
    "investment insights",
    "market trends newsletter",
    "stock market updates",
    "free financial newsletter",
    "personal finance tips",
    "mutual fund alerts",
    "IPO updates newsletter",
    "wealth management insights",
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
    canonical: "https://www.fiscalforum.in/newsletter",
  },
  openGraph: {
    title: "Financial Newsletters | Fiscal Forum",
    description:
      "Get expert financial insights, market analysis, and investment strategies delivered weekly. Stay ahead of the curve with Fiscal Forum’s trusted newsletters.",
    url: "https://www.fiscalforum.in/newsletter",
    siteName: "Fiscal Forum",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscribe to Our Financial Newsletters | Fiscal Forum",
    description:
      "Expert market analysis, investment tips, and financial trends — all in one curated newsletter. Free for Indian investors.",
    site: "https://x.com/FiscalForum?t=wozZYda22CGrRjCN5ciBfA&s=08" 
  },
};