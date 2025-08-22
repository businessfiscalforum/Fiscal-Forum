import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { propertyInsuranceRequests, usersTable } from "../../../config/schema";
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

function withCORS(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v as string));
  return res;
}

export async function OPTIONS(req: NextRequest) {
  return withCORS(
    req,
    new NextResponse(null, { status: 204 }) // no content for preflight
  );
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = (form.get("name") as string)?.trim() || "";
    const phone = (form.get("phone") as string)?.trim() || "";
    const email = ((form.get("email") as string) || "").trim();
    const propertyAddress = ((form.get("propertyAddress") as string) || "").trim();

    const propertyType = (form.get("propertyType") as string)?.trim() || "";
    const propertyOwnership = ((form.get("propertyOwnership") as string) || "").trim();
    const propertyValueRaw = ((form.get("propertyValue") as string) || "").trim();
    const contentsValueRaw = ((form.get("contentsValue") as string) || "").trim();
    const constructionType = ((form.get("constructionType") as string) || "").trim();
    const yearOfConstructionRaw = ((form.get("yearOfConstruction") as string) || "").trim();

    const coverageOptionsRaw = (form.get("coverageOptions") as string) || "[]";

    const hasExistingPolicyRaw = ((form.get("hasExistingPolicy") as string) || "").trim();
    const existingInsurer = ((form.get("existingInsurer") as string) || "").trim();
    const policyExpiry = ((form.get("policyExpiry") as string) || "").trim();
    const prevPolicyLink = ((form.get("prevPolicyLink") as string) || "").trim();

    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();

    // --- Validation ---
    if (!name) return withCORS(req, NextResponse.json({ success: false, error: "Name is required" }, { status: 400 }));
    if (!/^\d{10}$/.test(phone)) return withCORS(req, NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400 }));
    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) return withCORS(req, NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 }));
    if (!propertyType) return withCORS(req, NextResponse.json({ success: false, error: "Property type is required" }, { status: 400 }));

    if (policyExpiry && !/^\d{2}\/\d{2}\/\d{4}$/.test(policyExpiry)) {
      return withCORS(req, NextResponse.json({ success: false, error: "Policy expiry must be dd/mm/yyyy" }, { status: 400 }));
    }

    const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (prevPolicyLink && !isDrive(prevPolicyLink)) {
      return withCORS(req, NextResponse.json({ success: false, error: "Previous policy link must be a public Google Drive URL" }, { status: 400 }));
    }

    const propertyValue = propertyValueRaw || null;
    const contentsValue = contentsValueRaw || null;
    const yearOfConstruction = yearOfConstructionRaw ? parseInt(yearOfConstructionRaw) : null;
    if (yearOfConstruction !== null && (yearOfConstruction < 1800 || yearOfConstruction > new Date().getFullYear())) {
      return withCORS(req, NextResponse.json({ success: false, error: "Invalid year of construction" }, { status: 400 }));
    }

    let coverageOptions: string[] = [];
    let insurerPrefs: string[] = [];
    try { coverageOptions = JSON.parse(coverageOptionsRaw); if (!Array.isArray(coverageOptions)) coverageOptions = []; } catch {}
    try { insurerPrefs = JSON.parse(insurerPrefsRaw); if (!Array.isArray(insurerPrefs)) insurerPrefs = []; } catch {}

    const hasExistingPolicy = ["true","1","on","yes"].includes(hasExistingPolicyRaw.toLowerCase());

    // --- Resolve user ---
    let userId: string | null = null;
    try {
      const cu = await currentUser();
      const clerkEmail = cu?.emailAddresses?.[0]?.emailAddress;
      const fullName = cu?.fullName ?? "Anonymous";
      if (clerkEmail) {
        const existing = await db.select().from(usersTable).where(eq(usersTable.email, clerkEmail));
        if (existing.length > 0) userId = existing[0].id as string;
        else {
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
    } catch {
      userId = null;
    }

    // --- Insert DB record ---
    const [saved] = await db.insert(propertyInsuranceRequests).values({
      userId,
      name,
      email: email || null,
      phone,
      propertyAddress: propertyAddress || null,
      propertyType,
      propertyOwnership: propertyOwnership || null,
      propertyValue,
      contentsValue,
      constructionType: constructionType || null,
      yearOfConstruction,
      coverageOptions: JSON.stringify(coverageOptions),
      hasExistingPolicy,
      existingInsurer: existingInsurer || null,
      policyExpiry: policyExpiry || null,
      prevPolicyLink: prevPolicyLink || null,
      insurerPrefs: JSON.stringify(insurerPrefs),
      otherInsurer: otherInsurer || null,
    }).returning();

    return withCORS(req, NextResponse.json({ success: true, data: saved }, { status: 201 }));
  } catch (error: unknown) {
    console.error("Property insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return withCORS(req, NextResponse.json({ success: false, error: message }, { status: 500 }));
  }
}
