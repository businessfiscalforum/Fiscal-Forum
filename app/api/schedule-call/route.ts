import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../config/db";
import { scheduledCalls } from "../../../config/schema";

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

const scheduleCallSchema = z.object({
  name: z.string().min(1, "Name is required"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
  preferredContactMethod: z.enum(["call", "whatsapp", "email"]).optional(),
});

// --- Handle Preflight ---
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

// --- Schedule Call ---
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const body = await req.json();
    const validatedData = scheduleCallSchema.parse(body);

    const result = await db
      .insert(scheduledCalls)
      .values({
        name: validatedData.name,
        countryCode: validatedData.countryCode,
        phone: validatedData.phone,
        email: validatedData.email,
        date: validatedData.date,
        time: validatedData.time,
        message: validatedData.message,
        preferredContactMethod: validatedData.preferredContactMethod || "call",
      })
      .returning({ id: scheduledCalls.id });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Call scheduled successfully",
        id: result[0].id,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin),
        },
      }
    );
  } catch (error) {
    console.error("Error scheduling call:", error);

    let responseBody: unknown;
    let status = 500;

    if (error instanceof z.ZodError) {
      responseBody = { error: "Validation failed", details: error };
      status = 400;
    } else {
      responseBody = { error: "Failed to schedule call" };
    }

    return new NextResponse(JSON.stringify(responseBody), {
      status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(origin),
      },
    });
  }
}

// --- Fetch All Calls (Admin) ---
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const calls = await db.select().from(scheduledCalls);
    return new NextResponse(
      JSON.stringify({ success: true, data: calls }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin),
        },
      }
    );
  } catch (error) {
    console.error("Error fetching scheduled calls:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch scheduled calls" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(origin),
        },
      }
    );
  }
}
