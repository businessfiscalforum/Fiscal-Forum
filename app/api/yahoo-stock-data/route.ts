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

// Preflight handler (important for POST/fetch requests)
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json({}, { headers: corsHeaders(origin)as HeadersInit });
}

// Define the structure for your simplified index data
interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  percentageChange: number;
  error?: string;
}

// Map common Indian indices to their Yahoo Finance symbols
const indexSymbols: { symbol: string; name: string }[] = [
  { symbol: "^NSEI", name: "NIFTY 50" },           // Nifty 50
  { symbol: "^BSESN", name: "SENSEX" },            // BSE Sensex
  { symbol: "^NSEBANK", name: "NIFTY BANK" },      // Nifty Bank
  { symbol: "^CNXIT", name: "NIFTY IT" },          // Nifty IT (Now Nifty Info Tech)
  { symbol: "^NSEMDCP50", name: "NIFTY MIDCAP 50" }, // Nifty Midcap 50

  // Bank Ex, Dowjones, Nasdaq, S&P 500--->> Add this
  // 
];

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const indexDataPromises = indexSymbols.map(async ({ symbol, name }) => {
      try {
        const result = await yahooFinance.quote(symbol);

        if (
          !result ||
          result.regularMarketPrice === undefined ||
          result.regularMarketPrice === null
        ) {
          console.warn(`No valid data returned for symbol: ${symbol}`);
          return {
            symbol,
            name,
            value: 0,
            change: 0,
            percentageChange: 0,
            error: `No data available for ${name}`,
          };
        }

        return {
          symbol,
          name,
          value: result.regularMarketPrice,
          change:
            result.regularMarketChange !== undefined &&
            result.regularMarketChange !== null
              ? result.regularMarketChange
              : 0,
          percentageChange:
            result.regularMarketChangePercent !== undefined &&
            result.regularMarketChangePercent !== null
              ? result.regularMarketChangePercent
              : 0,
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (fetchError: any) {
        console.error(
          `Error fetching data for ${symbol} from Yahoo Finance:`,
          fetchError.message
        );
        return {
          symbol,
          name,
          value: 0,
          change: 0,
          percentageChange: 0,
          error: `Failed to fetch ${name}`,
        };
      }
    });

    const results: IndexData[] = await Promise.all(indexDataPromises);

    return NextResponse.json({ indices: results }, { headers: corsHeaders(origin) as HeadersInit });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Unexpected error in Yahoo Finance API route:", err);
    return NextResponse.json(
      { error: "Failed to fetch stock data from Yahoo Finance" },
      { status: 500, headers: corsHeaders(origin) as HeadersInit  }
    );
  }
}
