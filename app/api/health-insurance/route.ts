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
    };
  }
  return {};
}

export async function POST(req: NextRequest) {
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

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400 });
    }
    if (!policyType) {
      return NextResponse.json({ success: false, error: "Policy type is required" }, { status: 400 });
    }

    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    const membersCount = membersCountRaw ? Number(membersCountRaw) : null;
    if (membersCountRaw && (Number.isNaN(membersCount) || membersCount! < 1)) {
      return NextResponse.json({ success: false, error: "Members count must be a positive number" }, { status: 400 });
    }

    const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (prevPolicyLink && !isDrive(prevPolicyLink)) {
      return NextResponse.json({ success: false, error: "Previous policy link must be a public Google Drive URL" }, { status: 400 });
    }

    let insurerPrefs: string[] = [];
    try {
      insurerPrefs = JSON.parse(insurerPrefsRaw);
      if (!Array.isArray(insurerPrefs)) insurerPrefs = [];
    } catch {
      insurerPrefs = [];
    }

    // Resolve Clerk user -> local usersTable UUID
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
          const [created] = await db
            .insert(usersTable)
            .values({ name: fullName, email: clerkEmail, age: 18, password: "", role: "USER", status: "PENDING" })
            .returning();
          userId = created.id as string;
        }
      }
    } catch {
      userId = null;
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

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Health insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};


