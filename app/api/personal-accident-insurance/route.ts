// app/api/personal-accident-insurance/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { personalAccidentInsuranceRequests, usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
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

// ✅ Handle preflight requests
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, { status: 200, headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const form = await req.formData();

    // --- Extract fields ---
    const name = (form.get("name") as string)?.trim() || "";
    const phone = (form.get("phone") as string)?.trim() || "";
    const email = ((form.get("email") as string) || "").trim();
    const dob = ((form.get("dob") as string) || "").trim();
    const occupation = ((form.get("occupation") as string) || "").trim();
    const coverageTypeRaw = (form.get("coverageType") as string) || "[]";
    const sumInsuredRaw = ((form.get("sumInsured") as string) || "").trim();
    const policyTermYearsRaw = ((form.get("policyTermYears") as string) || "").trim();
    const coverageOptionsRaw = (form.get("coverageOptions") as string) || "[]";
    const hasExistingPolicyRaw = ((form.get("hasExistingPolicy") as string) || "").trim();
    const existingInsurer = ((form.get("existingInsurer") as string) || "").trim();
    const prevPolicyLink = ((form.get("prevPolicyLink") as string) || "").trim();
    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();

    // --- Validation ---
    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400, headers: corsHeaders(origin) });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400, headers: corsHeaders(origin) });
    }
    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400, headers: corsHeaders(origin) });
    }
    if (dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
      return NextResponse.json({ success: false, error: "DOB must be dd/mm/yyyy" }, { status: 400, headers: corsHeaders(origin) });
    }
    if (!sumInsuredRaw || isNaN(Number(sumInsuredRaw)) || Number(sumInsuredRaw) <= 0) {
      return NextResponse.json({ success: false, error: "Sum insured is required and must be positive" }, { status: 400, headers: corsHeaders(origin) });
    }
    if (!policyTermYearsRaw || isNaN(Number(policyTermYearsRaw)) || Number(policyTermYearsRaw) <= 0) {
      return NextResponse.json({ success: false, error: "Policy term (years) is required and must be positive" }, { status: 400, headers: corsHeaders(origin) });
    }
    if (prevPolicyLink && !/^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(prevPolicyLink)) {
      return NextResponse.json({ success: false, error: "Previous policy link must be a public Google Drive URL" }, { status: 400, headers: corsHeaders(origin) });
    }

    // --- Parse arrays ---
    let coverageType: string[] = [];
    let coverageOptions: string[] = [];
    let insurerPrefs: string[] = [];
    try { coverageType = JSON.parse(coverageTypeRaw); if (!Array.isArray(coverageType)) coverageType = []; } catch {}
    try { coverageOptions = JSON.parse(coverageOptionsRaw); if (!Array.isArray(coverageOptions)) coverageOptions = []; } catch {}
    try { insurerPrefs = JSON.parse(insurerPrefsRaw); if (!Array.isArray(insurerPrefs)) insurerPrefs = []; } catch {}

    const hasExistingPolicy = ["true", "1", "on", "yes"].includes(hasExistingPolicyRaw.toLowerCase());

    // --- Resolve Clerk user ---
    let userId: string | null = null;
    try {
      const cu = await currentUser();
      const clerkEmail = cu?.emailAddresses?.[0]?.emailAddress;
      const fullName = cu?.fullName ?? "Anonymous";
      if (clerkEmail) {
        const existing = await db.select().from(usersTable).where(eq(usersTable.email, clerkEmail));
        if (existing.length > 0) {
          userId = existing[0].id as string;
        } else {
          const [created] = await db.insert(usersTable).values({
            name: fullName,
            email: clerkEmail,
            age: 18,
            password: "",
            role: "USER",
            status: "PENDING"
          }).returning();
          userId = created.id as string;
        }
      }
    } catch (userError) {
      console.error("Error resolving user:", userError);
    }

    // --- Save form ---
    const [saved] = await db.insert(personalAccidentInsuranceRequests).values({
      userId,
      name,
      email: email || null,
      phone,
      dob: dob || null,
      occupation: occupation || null,
      coverageType: JSON.stringify(coverageType),
      sumInsured: sumInsuredRaw,
      policyTermYears: policyTermYearsRaw,
      coverageOptions: JSON.stringify(coverageOptions),
      hasExistingPolicy,
      existingInsurer: existingInsurer || null,
      prevPolicyLink: prevPolicyLink || null,
      insurerPrefs: JSON.stringify(insurerPrefs),
      otherInsurer: otherInsurer || null,
    }).returning();

    return NextResponse.json({ success: true, data: saved }, { status: 201, headers: corsHeaders(origin) });
  } catch (error: unknown) {
    console.error("Personal accident insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500, headers: corsHeaders(origin) });
  }
}

export const config = { api: { bodyParser: false } };
