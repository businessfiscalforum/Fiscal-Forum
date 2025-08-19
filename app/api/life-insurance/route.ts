import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { lifeInsuranceRequests, usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = (form.get("name") as string)?.trim() || "";
    const email = ((form.get("email") as string) || "").trim();
    const phone = (form.get("phone") as string)?.trim() || "";
    const dob = ((form.get("dob") as string) || "").trim();
    const gender = ((form.get("gender") as string) || "").trim();
    const occupation = ((form.get("occupation") as string) || "").trim();
    const policyTypesRaw = (form.get("policyTypes") as string) || "[]";
    const sumAssuredRaw = (form.get("sumAssured") as string) || "";
    const policyTermYearsRaw = (form.get("policyTermYears") as string) || "";
    const premiumFrequency = ((form.get("premiumFrequency") as string) || "").trim();
    const hasExistingPolicyRaw = (form.get("hasExistingPolicy") as string) || "false";
    const existingInsurer = ((form.get("existingInsurer") as string) || "").trim();
    const prevPolicyLink = ((form.get("prevPolicyLink") as string) || "").trim();
    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400 });
    }
    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    const sumAssured = sumAssuredRaw ? Number(sumAssuredRaw) : null;
    if (sumAssuredRaw && (Number.isNaN(sumAssured) || sumAssured! <= 0)) {
      return NextResponse.json({ success: false, error: "Sum assured must be a positive number" }, { status: 400 });
    }
    const policyTermYears = policyTermYearsRaw ? Number(policyTermYearsRaw) : null;
    if (policyTermYearsRaw && (Number.isNaN(policyTermYears) || policyTermYears! <= 0)) {
      return NextResponse.json({ success: false, error: "Policy term must be a positive number" }, { status: 400 });
    }

    const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (prevPolicyLink && !isDrive(prevPolicyLink)) {
      return NextResponse.json({ success: false, error: "Previous policy link must be a public Google Drive URL" }, { status: 400 });
    }

    let policyTypes: string[] = [];
    try {
      policyTypes = JSON.parse(policyTypesRaw);
      if (!Array.isArray(policyTypes)) policyTypes = [];
    } catch {
      policyTypes = [];
    }

    let insurerPrefs: string[] = [];
    try {
      insurerPrefs = JSON.parse(insurerPrefsRaw);
      if (!Array.isArray(insurerPrefs)) insurerPrefs = [];
    } catch {
      insurerPrefs = [];
    }

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
      .insert(lifeInsuranceRequests)
      .values({
        userId,
        name,
        email: email || null,
        phone,
        dob: dob || null,
        gender: gender || null,
        occupation: occupation || null,
        policyTypes: JSON.stringify(policyTypes),
        sumAssured: sumAssured as any,
        policyTermYears: policyTermYears ?? null,
        premiumFrequency: premiumFrequency || null,
        hasExistingPolicy: String(hasExistingPolicyRaw).toLowerCase() === "true",
        existingInsurer: existingInsurer || null,
        prevPolicyLink: prevPolicyLink || null,
        insurerPrefs: JSON.stringify(insurerPrefs),
        otherInsurer: otherInsurer || null,
      })
      .returning();

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Life insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};


