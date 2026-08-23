import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { mfPreferences } from "../../../config/schema";

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

// Handle preflight requests
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const body = await req.json();

    if (!body.name || !body.clientId || !body.fundType || !body.company) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (body.fundType.split(",").filter(Boolean).length === 0) {
      return NextResponse.json(
        { error: "Select at least one fund type" },
        { status: 400, headers: corsHeaders(origin)  as HeadersInit}
      );
    }

    const result = await db
      .insert(mfPreferences)
      .values({
        name: body.name,
        clientId: body.clientId,
        fundType: body.fundType, // already comma-separated
        company: body.company,
      })
      .returning({ id: mfPreferences.id });

    return NextResponse.json(
      {
        success: true,
        message: "Preferences submitted successfully!",
        id: result[0].id,
      },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to submit preferences. Please try again." },
      { status: 500, headers: corsHeaders(origin)  as HeadersInit}
    );
  }
}
