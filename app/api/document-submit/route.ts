import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { documentSubmissions } from "../../../config/schema";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, mobile, documentSent } = body;

    // Validate required fields
    if (!name || !email || !mobile || documentSent === undefined) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return NextResponse.json({ error: "Mobile must be a 10-digit number" }, { status: 400 });
    }

    // Insert into DB
    const result = await db.insert(documentSubmissions).values({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      mobile: mobile.trim(),
      documentSent: Boolean(documentSent),
    }).returning({ id: documentSubmissions.id });

    return NextResponse.json({
      success: true,
      message: "Document submission recorded successfully!",
      id: result[0].id,
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to submit document information" },
      { status: 500 }
    );
  }
}
