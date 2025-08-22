import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { travelInsuranceRequests, usersTable } from "../../../config/schema";
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
    };
  }
  return {};
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // Personal
    const name = (form.get("name") as string)?.trim() || "";
    const phone = (form.get("phone") as string)?.trim() || "";
    const email = ((form.get("email") as string) || "").trim();
    const dob = ((form.get("dob") as string) || "").trim();
    const passportNumber = ((form.get("passportNumber") as string) || "").trim();

    // Trip
    const travelType = (form.get("travelType") as string)?.trim() || ""; // Single | Multi
    const destinations = ((form.get("destinations") as string) || "").trim();
    const startDate = ((form.get("startDate") as string) || "").trim();
    const endDate = ((form.get("endDate") as string) || "").trim();
    const numTravellersRaw = ((form.get("numTravellers") as string) || "").trim();
    const travellerAges = ((form.get("travellerAges") as string) || "").trim();

    // Coverage
    const coverageOptionsRaw = (form.get("coverageOptions") as string) || "[]";

    // Existing policy
    const hasExistingPolicyRaw = ((form.get("hasExistingPolicy") as string) || "").trim();
    const existingInsurer = ((form.get("existingInsurer") as string) || "").trim();
    const prevPolicyLink = ((form.get("prevPolicyLink") as string) || "").trim();

    // Insurer prefs
    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();

    // Validation
    if (!name) return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    if (!/^\d{10}$/.test(phone)) return NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400 });
    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    if (dob && !/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) return NextResponse.json({ success: false, error: "DOB must be dd/mm/yyyy" }, { status: 400 });
    if (!travelType) return NextResponse.json({ success: false, error: "Travel type is required" }, { status: 400 });
    if (startDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(startDate)) return NextResponse.json({ success: false, error: "Start date must be dd/mm/yyyy" }, { status: 400 });
    if (endDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(endDate)) return NextResponse.json({ success: false, error: "End date must be dd/mm/yyyy" }, { status: 400 });

    const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (prevPolicyLink && !isDrive(prevPolicyLink)) {
      return NextResponse.json({ success: false, error: "Previous policy link must be a public Google Drive URL" }, { status: 400 });
    }

    const numTravellers = numTravellersRaw ? parseInt(numTravellersRaw) : null;
    if (numTravellers !== null && (isNaN(numTravellers) || numTravellers <= 0)) {
      return NextResponse.json({ success: false, error: "Invalid number of travellers" }, { status: 400 });
    }

    let coverageOptions: string[] = [];
    let insurerPrefs: string[] = [];
    try { coverageOptions = JSON.parse(coverageOptionsRaw); if (!Array.isArray(coverageOptions)) coverageOptions = []; } catch {}
    try { insurerPrefs = JSON.parse(insurerPrefsRaw); if (!Array.isArray(insurerPrefs)) insurerPrefs = []; } catch {}

    const hasExistingPolicy = ["true","1","on","yes"].includes(hasExistingPolicyRaw.toLowerCase());

    // Resolve user to local UUID
    let userId: string | null = null;
    try {
      const cu = await currentUser();
      const clerkEmail = cu?.emailAddresses?.[0]?.emailAddress;
      const fullName = cu?.fullName ?? "Anonymous";
      if (clerkEmail) {
        const existing = await db.select().from(usersTable).where(eq(usersTable.email, clerkEmail));
        if (existing.length > 0) userId = existing[0].id as string;
        else {
          const [created] = await db.insert(usersTable).values({ name: fullName, email: clerkEmail, age: 18, password: "", role: "USER", status: "PENDING" }).returning();
          userId = created.id as string;
        }
      }
    } catch { userId = null; }

    const [saved] = await db.insert(travelInsuranceRequests).values({
      userId,
      name,
      email: email || null,
      phone,
      dob: dob || null,
      passportNumber: passportNumber || null,
      travelType,
      destinations: destinations || null,
      startDate: startDate || null,
      endDate: endDate || null,
      numTravellers,
      travellerAges: travellerAges || null,
      coverageOptions: JSON.stringify(coverageOptions),
      hasExistingPolicy,
      existingInsurer: existingInsurer || null,
      prevPolicyLink: prevPolicyLink || null,
      insurerPrefs: JSON.stringify(insurerPrefs),
      otherInsurer: otherInsurer || null,
    }).returning();

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Travel insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };
