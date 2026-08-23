// Add this at the top of app/page.tsx (outside the component)
export const metadata = {
  title: "Fiscal Forum | Financial Insights, Research & Premium Services",
  description:
    "Fiscal Forum offers expert financial research, investment tools, credit cards, loans, insurance, and savings accounts. Empowering smarter money decisions for every Indian.",
  keywords: [
    "Fiscal Forum",
    "financial services India",
    "investment research",
    "credit cards",
    "mutual funds",
    "stock investment",
    "insurance plans",
    "savings account",
    "personal loan",
    "Sovereign Gold Bonds",
    "financial advisory",
    "brokerage sharing",
    "refer and earn India",
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
    canonical: "https://www.fiscalforum.in/",
  },
  openGraph: {
    title: "Fiscal Forum – Your Trusted Financial Partner",
    description:
      "Access premium financial services: stock trading, mutual funds, insurance, credit cards, loans & more — all in one trusted platform.",
    url: "https://www.fiscalforum.in/",
    siteName: "Fiscal Forum",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.fiscalforum.in/og-image-home.jpg", // 🔜 Replace with real image
        width: 1200,
        height: 630,
        alt: "Fiscal Forum – Financial Services, Research & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiscal Forum – Smart Financial Decisions Start Here",
    description:
      "Invest, insure, save, and grow with India’s trusted financial platform. WhatsApp: +91 86960 60387",
    site: "https://x.com/FiscalForum?t=wozZYda22CGrRjCN5ciBfA&s=08"
  },
};