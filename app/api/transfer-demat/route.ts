// app/api/transfer-demat/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../config/db";
import { dematTransferRequests } from "../../../config/schema";

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

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const formData = await request.formData();

    const fullName = formData.get("fullName") as string;
    const clientCode = formData.get("clientCode") as string;
    const panNo = (formData.get("panNo") as string).toUpperCase();
    const mobileNo = formData.get("mobileNo") as string;
    const consistency = formData.get("consistency") as string;
    const traderType = formData.getAll("traderType") as string[];
    const existingBroker = formData.get("existingBroker") as string;

    // Validate required fields
    if (
      !fullName ||
      !clientCode ||
      !panNo ||
      !mobileNo ||
      !consistency ||
      traderType.length === 0 ||
      !existingBroker
    ) {
      return new NextResponse(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNo)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid PAN number format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid mobile number format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    const result = await db
      .insert(dematTransferRequests)
      .values({
        fullName,
        clientCode,
        panNo,
        mobileNo,
        consistency,
        traderType: traderType.join(","), // store as CSV
        existingBroker,
      })
      .returning({ id: dematTransferRequests.id });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Application submitted successfully",
        id: result[0].id,
      }),
      { status: 201, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to submit application" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
    );
  }
}
