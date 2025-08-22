import { db } from "../../../config/db";
import { usersTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

// Handle POST /api/your-endpoint
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.emailAddresses.length) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers }
    );
  }

  const userEmail = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const userName = clerkUser.fullName ?? "Anonymous";

  if (!userEmail) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400, headers }
    );
  }

  try {
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (existing.length > 0) {
      return NextResponse.json(existing[0], { status: 200, headers });
    }

    const hashedPassword = await bcrypt.hash("defaultpassword123", 10);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: userName,
        email: userEmail,
        age: 18,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
      })
      .returning();

    return NextResponse.json(newUser, { status: 201, headers });
  } catch (error) {
    console.error("User insert error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    );
  }
}

// Handle preflight CORS
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return NextResponse.json({}, { status: 200, headers: corsHeaders(origin) });
}
