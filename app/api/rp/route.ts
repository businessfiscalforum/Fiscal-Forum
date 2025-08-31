import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { remisorship } from "../../../config/schema";

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

    const name = (body.name as string)?.trim() || "";
    const mobile = (body.mobile as string)?.trim() || "";
    const email = (body.email as string)?.trim() || "";
    const accountNumber = (body.accountNumber as string)?.trim() || "";
    const ifsc = (body.ifsc as string)?.trim().toUpperCase() || "";
    const panNumber = (body.pan as string)?.trim().toUpperCase() || "";
    const aadhaar = (body.aadhaar as string)?.trim() || "";

    // --- Validations ---
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      return NextResponse.json(
        { success: false, error: "Invalid name" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^([^\s@]+)@([^\s@]+\.[^\s@]+)$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^\d{9,18}$/.test(accountNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid account number (must be 9-18 digits)" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      return NextResponse.json(
        { success: false, error: "Invalid IFSC code" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid PAN number" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^[0-9]{12}$/.test(aadhaar)) {
      return NextResponse.json(
        { success: false, error: "Invalid Aadhaar number" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    // --- Insert into Neon DB ---
    const [saved] = await db
      .insert(remisorship)
      .values({
        name,
        mobile,
        email,
        accountNumber,
        ifscCode: ifsc,
        panNumber,
        aadhaar,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    console.error("BDP form POST error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
