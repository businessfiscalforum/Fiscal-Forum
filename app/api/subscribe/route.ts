import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../config/db";
import { subscribers } from "../../../config/schema";
import { eq } from "drizzle-orm";

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

// --- Preflight handler ---
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
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new NextResponse(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    // Check if already subscribed
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);

    if (existingSubscriber.length > 0) {
      return new NextResponse(
        JSON.stringify({ message: "You are already subscribed!" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    // Add new subscriber
    await db.insert(subscribers).values({
      email: email,
      createdAt: new Date(),
    });

    return new NextResponse(
      JSON.stringify({ message: "Thank you for subscribing!" }),
      { status: 201, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to subscribe. Please sign-in to subscribe." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
    );
  }
}
