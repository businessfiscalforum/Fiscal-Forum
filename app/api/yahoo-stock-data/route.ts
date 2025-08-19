// app/api/yahoo-stock-data/route.ts
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

// Define the structure for your simplified index data
interface IndexData {
  symbol: string; // Yahoo Finance symbol (e.g., "^NSEI")
  name: string;   // Display name (e.g., "NIFTY 50")
  value: number;  // Current price
  change: number; // Absolute change
  percentageChange: number; // Percentage change
}

// Map common Indian indices to their Yahoo Finance symbols
const indexSymbols: { symbol: string; name: string }[] = [
  { symbol: "^NSEI", name: "NIFTY 50" },
  { symbol: "^BSESN", name: "SENSEX" },
  { symbol: "^NSEBANK", name: "NIFTY BANK" },
  { symbol: "^CNXIT", name: "NIFTY IT" }, // Example for Nifty IT
  // Add more as needed, e.g., "^NSMIDCP", "^HSCODE"
];

export async function GET() {
  try {
    const indexDataPromises = indexSymbols.map(async ({ symbol, name }) => {
      try {
        // Fetch quote data from Yahoo Finance
        const result = await yahooFinance.quote(symbol);

        // Check if data was returned and has necessary fields
        if (!result || result.regularMarketPrice === undefined || result.regularMarketPrice === null) {
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
          change: result.regularMarketChange !== undefined && result.regularMarketChange !== null ? result.regularMarketChange : 0,
          percentageChange: result.regularMarketChangePercent !== undefined && result.regularMarketChangePercent !== null ? result.regularMarketChangePercent : 0,
        };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (fetchError: any) {
        console.error(`Error fetching data for ${symbol} from Yahoo Finance:`, fetchError.message);
        // Return error object for this specific index
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

    // Wait for all promises to resolve
    const results = await Promise.all(indexDataPromises);

    return NextResponse.json({ indices: results });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Unexpected error in Yahoo Finance API route:', err);
    return NextResponse.json({ error: 'Failed to fetch stock data from Yahoo Finance' }, { status: 500 });
  }
}