import { db } from "../../../config/db";
import { usersTable } from "../../../config/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
];

function corsHeaders(origin: string | null):HeadersInit {
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

// GET - fetch user by email query param
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400, headers });
  }

  try {
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!existing.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers });
    }

    return NextResponse.json(existing[0], { status: 200, headers });
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers });
  }
}

// POST - create new user
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  const body = await req.json();
  const { email, name } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400, headers });
  }

  try {
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing.length) {
      return NextResponse.json(existing[0], { status: 200, headers });
    }

    const hashedPassword = await bcrypt.hash("defaultpassword123", 10);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: name || "Anonymous",
        email,
        age: 18,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
      })
      .returning();

    return NextResponse.json(newUser, { status: 201, headers });
  } catch (error) {
    console.error("User insert error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers });
  }
}
