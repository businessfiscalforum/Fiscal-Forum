import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { commercialVehicleInsuranceRequests, usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // Personal Information
    const name = (form.get("name") as string)?.trim() || "";
    const email = ((form.get("email") as string) || "").trim();
    const phone = (form.get("phone") as string)?.trim() || "";
    const businessName = ((form.get("businessName") as string) || "").trim();
    const businessType = ((form.get("businessType") as string) || "").trim();
    const gstNumber = ((form.get("gstNumber") as string) || "").trim();

    // Vehicle Information
    const vehicleType = (form.get("vehicleType") as string)?.trim() || "";
    const vehicleMake = ((form.get("vehicleMake") as string) || "").trim();
    const vehicleModel = ((form.get("vehicleModel") as string) || "").trim();
    const vehicleYear = (form.get("vehicleYear") as string)?.trim() || "";
    const vehicleCapacity = ((form.get("vehicleCapacity") as string) || "").trim();
    const vehicleValue = (form.get("vehicleValue") as string)?.trim() || "";

    // Insurance Details
    const previousInsurer = ((form.get("previousInsurer") as string) || "").trim();
    const policyExpiry = ((form.get("policyExpiry") as string) || "").trim();
    const currentPolicyNumber = ((form.get("currentPolicyNumber") as string) || "").trim();

    // Business Operations
    const primaryUse = ((form.get("primaryUse") as string) || "").trim();
    const operatingArea = ((form.get("operatingArea") as string) || "").trim();
    const annualMileage = ((form.get("annualMileage") as string) || "").trim();

    // Coverage Requirements
    const coverageTypeRaw = (form.get("coverageType") as string) || "[]";
    const additionalCoversRaw = (form.get("additionalCovers") as string) || "[]";

    // Documents
    const rcLink = (form.get("rcLink") as string)?.trim() || "";
    const prevInsuranceLink = (form.get("prevInsuranceLink") as string)?.trim() || "";
    const businessLicenseLink = (form.get("businessLicenseLink") as string)?.trim() || "";
    const gstCertificateLink = (form.get("gstCertificateLink") as string)?.trim() || "";

    // Insurer Preferences
    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();

    // Additional Information
    const specialRequirements = ((form.get("specialRequirements") as string) || "").trim();

    // Validation
    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json({ success: false, error: "Phone must be 10 digits" }, { status: 400 });
    }
    if (!vehicleType) {
      return NextResponse.json({ success: false, error: "Vehicle type is required" }, { status: 400 });
    }

    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    // GST validation (if provided)
    if (gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstNumber)) {
      return NextResponse.json({ success: false, error: "Invalid GST number format" }, { status: 400 });
    }

    // Vehicle year validation
    if (vehicleYear && (!/^\d{4}$/.test(vehicleYear) || parseInt(vehicleYear) < 1900 || parseInt(vehicleYear) > new Date().getFullYear() + 1)) {
      return NextResponse.json({ success: false, error: "Invalid vehicle year" }, { status: 400 });
    }

    // Policy expiry validation
    if (policyExpiry && !/^\d{2}\/\d{2}\/\d{4}$/.test(policyExpiry)) {
      return NextResponse.json({ success: false, error: "Policy expiry must be in dd/mm/yyyy format" }, { status: 400 });
    }

    // Google Drive link validation
    const isDrive = (link: string) => /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (rcLink && !isDrive(rcLink)) {
      return NextResponse.json({ success: false, error: "RC link must be a public Google Drive URL" }, { status: 400 });
    }
    if (prevInsuranceLink && !isDrive(prevInsuranceLink)) {
      return NextResponse.json({ success: false, error: "Previous insurance link must be a public Google Drive URL" }, { status: 400 });
    }
    if (businessLicenseLink && !isDrive(businessLicenseLink)) {
      return NextResponse.json({ success: false, error: "Business license link must be a public Google Drive URL" }, { status: 400 });
    }
    if (gstCertificateLink && !isDrive(gstCertificateLink)) {
      return NextResponse.json({ success: false, error: "GST certificate link must be a public Google Drive URL" }, { status: 400 });
    }

    // Parse JSON arrays
    let coverageType: string[] = [];
    let additionalCovers: string[] = [];
    let insurerPrefs: string[] = [];

    try {
      coverageType = JSON.parse(coverageTypeRaw);
      if (!Array.isArray(coverageType)) coverageType = [];
    } catch {
      coverageType = [];
    }

    try {
      additionalCovers = JSON.parse(additionalCoversRaw);
      if (!Array.isArray(additionalCovers)) additionalCovers = [];
    } catch {
      additionalCovers = [];
    }

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
      .insert(commercialVehicleInsuranceRequests)
      .values({
        userId,
        name,
        email: email || null,
        phone,
        businessName: businessName || null,
        businessType: businessType || null,
        gstNumber: gstNumber || null,
        vehicleType,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
        vehicleYear: vehicleYear ? parseInt(vehicleYear) : null,
        vehicleCapacity: vehicleCapacity || null,
        vehicleValue: vehicleValue ? parseFloat(vehicleValue) : null,
        previousInsurer: previousInsurer || null,
        policyExpiry: policyExpiry || null,
        currentPolicyNumber: currentPolicyNumber || null,
        primaryUse: primaryUse || null,
        operatingArea: operatingArea || null,
        annualMileage: annualMileage || null,
        coverageType: JSON.stringify(coverageType),
        additionalCovers: JSON.stringify(additionalCovers),
        rcLink: rcLink || null,
        prevInsuranceLink: prevInsuranceLink || null,
        businessLicenseLink: businessLicenseLink || null,
        gstCertificateLink: gstCertificateLink || null,
        insurerPrefs: JSON.stringify(insurerPrefs),
        otherInsurer: otherInsurer || null,
        specialRequirements: specialRequirements || null,
      })
      .returning();

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Commercial vehicle insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};
