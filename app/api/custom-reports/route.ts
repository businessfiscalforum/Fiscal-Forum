import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { customReportsRequest } from "../../../config/schema";

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
    const mobile = (body.mobile || "").trim();
    const topic = (body.topic || "").trim();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Phone must be 10 digits" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const [saved] = await db
      .insert(customReportsRequest)
      .values({ name, mobile, topic })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    console.error("Car insurance POST error:", error);
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


