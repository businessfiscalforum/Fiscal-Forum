import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { mfTransferForms } from "../../../config/schema";

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

    if (
      !body.fullName ||
      !body.clientCode ||
      !body.panNo ||
      !body.mobileNo ||
      !body.typeofInvestment ||
      !body.existingBroker
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders(origin)  as HeadersInit}
      );
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(body.panNo.toUpperCase())) {
      return NextResponse.json(
        { error: "Invalid PAN number format" },
        { status: 400, headers: corsHeaders(origin)  as HeadersInit}
      );
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(body.mobileNo)) {
      return NextResponse.json(
        { error: "Invalid mobile number format" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (
      !Array.isArray(body.typeofInvestment) ||
      body.typeofInvestment.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one trader type must be selected" },
        { status: 400, headers: corsHeaders(origin)  as HeadersInit}
      );
    }

    const result = await db
      .insert(mfTransferForms)
      .values({
        fullName: body.fullName,
        clientCode: body.clientCode,
        panNo: body.panNo.toUpperCase(),
        mobileNo: body.mobileNo,
        typeofInvestment: body.typeofInvestment.join(","), // Store as comma-separated
        existingBroker: body.existingBroker,
      })
      .returning({ id: mfTransferForms.id });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        id: result[0].id,
      },
      { status: 201, headers: corsHeaders(origin)  as HeadersInit}
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500, headers: corsHeaders(origin)  as HeadersInit}
    );
  }
}
