/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { partnerRequests } from "../../../config/schema";
import { eq } from "drizzle-orm";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

// ✅ Handle preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

// ✅ GET handler (fetch all partner requests)
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const result = await db.select().from(partnerRequests);
    return NextResponse.json(result, {
      status: 200,
      headers: corsHeaders(origin) as HeadersInit,
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}

// ✅ PATCH handler (approve/reject request)
export async function PATCH(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const { id, accepted } = await req.json();

    if (!id || typeof accepted !== "boolean") {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const newStatus = accepted ? "Approved" : "Rejected";

    const [updated] = await db
      .update(partnerRequests)
      .set({ status: newStatus })
      .where(eq(partnerRequests.id, id))
      .returning();

    return NextResponse.json(
      { message: "Status updated successfully", updated },
      { status: 200, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
