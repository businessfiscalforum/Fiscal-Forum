// pages/api/withdrawal-request.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { withdrawalRequests, usersTable } from "../../../config/schema";
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
    const mobile = (body.mobile || "").trim();

    // Validation
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (!mobile) {
      return NextResponse.json(
        { success: false, error: "Mobile is required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Mobile must be 10 digits" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    // Resolve Clerk user -> local usersTable UUID
    let userId: string | null = null;
    try {
      const cu = await currentUser();
      const clerkEmail = cu?.emailAddresses?.[0]?.emailAddress;
      const fullName = cu?.fullName ?? "Anonymous";
      if (clerkEmail) {
        const existing = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, clerkEmail));
        if (existing.length > 0) {
          userId = existing[0].id as string;
        } else {
          const [created] = await db
            .insert(usersTable)
            .values({
              name: fullName,
              email: clerkEmail,
              age: 18,
              password: "",
              role: "USER",
              status: "PENDING",
            })
            .returning();
          userId = created.id as string;
        }
      }
    } catch {
      userId = null;
    }

    // Save to database
    const [saved] = await db
      .insert(withdrawalRequests)
      .values({
        name,
        email,
        mobile,
        status: 'pending',
        userId: userId || null
      })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) }
      );
  } catch (error: unknown) {
    console.error("Withdrawal request POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

export const config = {
  api: { bodyParser: true },
};