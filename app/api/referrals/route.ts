import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { usersTable } from "../../../config/schema";
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const referCode = searchParams.get("referCode");

  if (!referCode) {
    return NextResponse.json({ error: "Missing referCode" }, { status: 400 });
  }

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.referrerCode, referCode));

  return NextResponse.json(users);
}