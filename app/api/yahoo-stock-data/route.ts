// app/api/yahoo-stock-data/route.ts
import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json({}, { headers: corsHeaders(origin) as HeadersInit });
}

interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  percentageChange: number;
  error?: string;
}

interface YahooQuote {
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
}

const indexSymbols = [
  { symbol: "^NSEI", name: "NIFTY 50" },
  { symbol: "^BSESN", name: "SENSEX" },
  { symbol: "^NSEBANK", name: "NIFTY BANK" },
  { symbol: "^CNXIT", name: "NIFTY IT" },
  { symbol: "^NSEMDCP50", name: "NIFTY MIDCAP 50" },
  { symbol: "^DJI", name: "Dow Jones Industrial Average" },
  { symbol: "^IXIC", name: "NASDAQ Composite" },
  { symbol: "^GSPC", name: "S&P 500" }
];

// Safe wrapper for Yahoo quote()
async function safeQuote(symbol: string): Promise<YahooQuote | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000); // 3 sec timeout

  try {
    const data = await yahooFinance.quote(
      symbol,
      {},
      { signal: controller.signal, validateResult: false }
    );

    clearTimeout(timeout);
    return data as YahooQuote;
  } catch (err) {
    console.error("Yahoo API error for symbol:", symbol, err);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  const indexDataPromises = indexSymbols.map(async ({ symbol, name }) => {
    const result = await safeQuote(symbol);

    // If symbol failed / Yahoo returned null
    if (!result || result.regularMarketPrice == null) {
      return {
        symbol,
        name,
        value: 0,
        change: 0,
        percentageChange: 0,
        error: `No data available for ${name}`
      };
    }

    // Normal success response
    return {
      symbol,
      name,
      value: result.regularMarketPrice ?? 0,
      change: result.regularMarketChange ?? 0,
      percentageChange: result.regularMarketChangePercent ?? 0,
    };
  });

  const results: IndexData[] = await Promise.all(indexDataPromises);

  return NextResponse.json(
    { indices: results },
    { headers: corsHeaders(origin) as HeadersInit }
  );
}
