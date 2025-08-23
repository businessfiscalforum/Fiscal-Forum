import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { healthInsuranceRequests, usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

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
      "Access-Control-Allow-Credentials": "true",
    };
  }
  return {};
}

// Preflight handler
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
    const form = await req.formData();

    const name = (form.get("name") as string)?.trim() || "";
    const email = ((form.get("email") as string) || "").trim();
    const phone = (form.get("phone") as string)?.trim() || "";
    const policyType = ((form.get("policyType") as string) || "").trim();
    const membersCountRaw = (form.get("membersCount") as string) || "";
    const memberAges = ((form.get("memberAges") as string) || "").trim();
    const preExistingDiseases = ((form.get("preExistingDiseases") as string) || "").trim();
    const previousInsurer = ((form.get("previousInsurer") as string) || "").trim();
    const policyExpiry = ((form.get("policyExpiry") as string) || "").trim();
    const prevPolicyLink = ((form.get("prevPolicyLink") as string) || "").trim();
    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();
    const userId = ((form.get("userId") as string) || "").trim();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Phone must be 10 digits" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }
    if (!policyType) {
      return NextResponse.json(
        { success: false, error: "Policy type is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const membersCount = membersCountRaw ? Number(membersCountRaw) : null;
    if (membersCountRaw && (Number.isNaN(membersCount) || membersCount! < 1)) {
      return NextResponse.json(
        { success: false, error: "Members count must be a positive number" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (prevPolicyLink && !isDrive(prevPolicyLink)) {
      return NextResponse.json(
        { success: false, error: "Previous policy link must be a public Google Drive URL" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    let insurerPrefs: string[] = [];
    try {
      insurerPrefs = JSON.parse(insurerPrefsRaw);
      if (!Array.isArray(insurerPrefs)) insurerPrefs = [];
    } catch {
      insurerPrefs = [];
    }

    const [saved] = await db
      .insert(healthInsuranceRequests)
      .values({
        userId,
        name,
        email: email || null,
        phone,
        policyType,
        membersCount: membersCount ?? null,
        memberAges: memberAges || null,
        preExistingDiseases: preExistingDiseases || null,
        previousInsurer: previousInsurer || null,
        policyExpiry: policyExpiry || null,
        prevPolicyLink: prevPolicyLink || null,
        insurerPrefs: JSON.stringify(insurerPrefs),
        otherInsurer: otherInsurer || null,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    console.error("Health insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}

export const config = {
  api: { bodyParser: false },
};
