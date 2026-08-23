// pages/api/mis-report.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { misReportSubmissions } from "../../../config/schema";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
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
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const documentLink = (body.documentLink || "").trim();

    // Validation
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!documentLink) {
      return NextResponse.json(
        { success: false, error: "Document link is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    // URL validation
    try {
      new URL(documentLink);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid document link URL" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    // Save to database
    const [saved] = await db
      .insert(misReportSubmissions)
      .values({ name, email, documentLink, status: 'pending' })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    console.error("MIS Report submission error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};