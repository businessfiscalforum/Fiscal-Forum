import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { dematApplications } from "../../../config/schema";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.insert(dematApplications).values({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      pan: body.pan.toUpperCase(),
      city: body.city,
    });

    return NextResponse.json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
