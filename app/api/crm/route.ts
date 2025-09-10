/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "../../../config/db";
import { partnerRequests } from "../../../config/schema";

// CORS config
const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

// ✅ GET /api/crm?type=Loan&userId=123
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const userId = searchParams.get("userId");

    let rows;
    console.log("Type, userID: ", type, userId);

    if (type && userId) {
      // filter by both type and userId
      rows = await db
        .select()
        .from(partnerRequests)
        .where(and(eq(partnerRequests.type, type), eq(partnerRequests.userId, userId)));
    } else if (userId) {
      // filter only by userId
      rows = await db
        .select()
        .from(partnerRequests)
        .where(eq(partnerRequests.userId, userId));
    } else if (type) {
      // filter only by type
      rows = await db
        .select()
        .from(partnerRequests)
        .where(eq(partnerRequests.type, type));
    } else {
      // return all requests
      rows = await db.select().from(partnerRequests);
    }

    return NextResponse.json(rows, {
      status: 200,
      headers: corsHeaders(origin) as HeadersInit,
    });
  } catch (error) {
    console.error("DB fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
