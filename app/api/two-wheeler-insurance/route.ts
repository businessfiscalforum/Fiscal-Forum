import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db";
import { InsuranceType, twoWheelerInsuranceRequests, usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
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
    const previousInsurer = ((form.get("previousInsurer") as string) || "").trim();
    const policyExpiry = ((form.get("policyExpiry") as string) || "").trim();
    const rcLink = (form.get("rcLink") as string)?.trim() || "";
    const prevInsuranceLink = (form.get("prevInsuranceLink") as string)?.trim() || "";
    const insurerPrefsRaw = (form.get("insurerPrefs") as string) || "[]";
    const otherInsurer = ((form.get("otherInsurer") as string) || "").trim();
    const registrationNumber = ((form.get("registrationNumber") as string) || "").trim();
    const insuranceTypeRaw = form.get("insuranceType");

    const insuranceType =
      typeof insuranceTypeRaw === "string"
        ? (insuranceTypeRaw.trim() as InsuranceType)
        : null;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Phone must be 10 digits" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    if (email && !/^([^\s@]+)@([^\s@]+)\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }
    if (!registrationNumber) {
      return NextResponse.json(
        { success: false, error: "Registration Number is required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }
    if (!insuranceType) {
      return NextResponse.json(
        { success: false, error: "Insurance Type is required" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }

    const isDrive = (link: string) =>
      /^(https?:\/\/)?(www\.)?drive\.google\.com\//i.test(link);
    if (rcLink && !isDrive(rcLink)) {
      return NextResponse.json(
        { success: false, error: "RC link must be a public Google Drive URL" },
        { status: 400, headers: corsHeaders(origin) }
      );
    }
    if (prevInsuranceLink && !isDrive(prevInsuranceLink)) {
      return NextResponse.json(
        {
          success: false,
          error: "Previous insurance link must be a public Google Drive URL",
        },
        { status: 400, headers: corsHeaders(origin) }
      );
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
        const existing = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, clerkEmail));
        if (existing.length > 0) {
          userId = existing[0].id as string;
        } else {
          const [created] = await db
            .insert(usersTable)
            .values({
              name: fullName,
              email: clerkEmail,
              age: 18,
              password: "",
              role: "USER",
              status: "PENDING",
            })
            .returning();
          userId = created.id as string;
        }
      }
    } catch {
      userId = null;
    }

    const [saved] = await db
      .insert(twoWheelerInsuranceRequests)
      .values({
        userId,
        name,
        email: email || null,
        phone,
        previousInsurer: previousInsurer || null,
        policyExpiry: policyExpiry || null,
        rcLink: rcLink || null,
        prevInsuranceLink: prevInsuranceLink || null,
        insurerPrefs: JSON.stringify(insurerPrefs),
        otherInsurer: otherInsurer || null,
        registrationNumber,
        insuranceType,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) }
    );
  } catch (error: unknown) {
    console.error("Two wheeler insurance POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders(req.headers.get("origin")) }
    );
  }
}

export const config = {
  api: { bodyParser: false },
};
