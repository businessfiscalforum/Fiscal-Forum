/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../config/db";
import { partnerRequests } from "../../../config/schema";

// ✅ Allowed origins
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

// ✅ Handle preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

// ✅ Validation schema (Zod)
const applicationSchema = z.object({
  type: z.string(),
  subType: z.string(),
  name: z.string().min(1, "Name is required"),
  mobileNo: z.string().min(10).max(15),
  emailId: z.string().email(),
  userId: z.string().uuid(), // 👈 new field
});

// ✅ POST handler
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const body = await req.json();
    const parsed = applicationSchema.parse(body);

    // Insert into partner_requests table
    const [result] = await db
      .insert(partnerRequests)
      .values({
        type: parsed.type,
        subType: parsed.subType || "",
        name: parsed.name,
        mobile: parsed.mobileNo, // 👈 map mobileNo → mobile
        email: parsed.emailId,   // 👈 map emailId → email
        userId: parsed.userId,   // 👈 store userId
      })
      .returning();

    return NextResponse.json(
      { message: "Application submitted successfully", result },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error) {
    console.error("Validation/DB error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten() },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (error && typeof error === "object" && "code" in error) {
      const dbError = error as any;
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "Email or mobile number already registered" },
          { status: 409, headers: corsHeaders(origin) as HeadersInit }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
