import { db } from "../../../config/db";
import { quoteRequestsTable } from "../../../config/schema";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

// --- Handle Preflight ---
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const body = await req.json();
    const { name, email, phone, loanAmount, tenure, loanType } = body;

    if (!name || !email || !phone || !loanAmount || !tenure || !loanType) {
      return new NextResponse(
        JSON.stringify({
          error:
            "Missing required fields: name, email, phone, loanAmount, tenure, loanType",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        }
      );
    }

    const validLoanTypes = [
      "lap",
      "home-loan",
      "personal",
      "business",
      "gold",
      "car",
      "education",
      "securities",
    ] as const;

    if (!validLoanTypes.includes(loanType)) {
      return new NextResponse(
        JSON.stringify({
          error: `Invalid loan type. Must be one of: ${validLoanTypes.join(", ")}`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        }
      );
    }

    // EMI Calculation
    const rate = 8.5 / 12 / 100;
    const time = tenure * 12;
    const emi = Math.round(
      (loanAmount * rate * Math.pow(1 + rate, time)) /
        (Math.pow(1 + rate, time) - 1)
    );

    const [inserted] = await db
      .insert(quoteRequestsTable)
      .values({
        name,
        email,
        phone,
        loanType,
        loanAmount,
        tenure,
        emi,
      })
      .returning();

    return new NextResponse(
      JSON.stringify({ message: "Quote saved successfully", data: inserted }),
      {
        status: 201,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      }
    );
  } catch (error) {
    console.error("Error saving quote:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      }
    );
  }
}
