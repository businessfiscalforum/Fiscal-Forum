import ForWomenClientPage from "./ForWomenClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nivesh Sakhi — Invest India, Her Way | Fiscal Forum",
  description:
    "Every piece in your jewellery box or item in your closet has a financial twin. Make your money work for you, Her way. Mapped to listed businesses and real investments.",
  keywords: [
    "Women Investing",
    "Nivesh Sakhi",
    "Digital Gold India",
    "Gold ETFs",
    "Silver ETFs",
    "Luxury Retail Stocks",
    "Indian FMCG Stocks",
    "Consumer Portfolios",
    "Fiscal Forum",
  ],
  openGraph: {
    title: "Nivesh Sakhi — Invest India, Her Way | Fiscal Forum",
    description:
      "Every piece in your jewellery box or item in your closet has a financial twin. Explore how your everyday brands map to listed stocks and real investments.",
    url: "https://www.fiscalforum.in/for-women",
    siteName: "Fiscal Forum",
    locale: "en_IN",
    type: "website",
  },
};

export default function ForWomenPage() {
  return (
    <main>
      <ForWomenClientPage />
    </main>
  );
}
