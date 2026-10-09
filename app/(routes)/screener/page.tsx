import ClientScreenerPage from "./ClientScreenerPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NSE Equity Screener | Fiscal Forum",
  description: "Search, filter and rank every live NSE-listed equity by valuation, profitability, market-cap tier and index membership.",
  keywords: "NSE screener, stock filter, equity analysis, P/E ratio, market cap, Fiscal Forum",
};

export default function ScreenerPage() {
  return <ClientScreenerPage />;
}
