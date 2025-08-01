// app/api/applications/route.ts
import { db } from "../../../config/db";
import { applicationsTable, usersTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.emailAddresses.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;

  // Parse request body
  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    panNumber,
    employmentType,
    company,
    annualIncome,
    address,
    city,
    pincode,
    loanType,
    paymentMethod,
  } = await req.json();

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dateOfBirth ||
    !panNumber ||
    !employmentType ||
    !annualIncome ||
    !address ||
    !city ||
    !pincode ||
    !loanType
  ) {
    return NextResponse.json(
      { error: "Missing required application fields" },
      { status: 400 }
    );
  }

  try {
    // Find user in DB
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Insert new application

    const [application] = await db
      .insert(applicationsTable)
      .values({
        // Remove userId if not in schema, otherwise keep it if present in applicationsTable
        // userId: user.id, // Uncomment if userId exists in applicationsTable schema
        type: "loan", // hardcoded for loan apps
        loanType, // e.g., 'home-loan', 'personal'
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
        panNumber,
        employmentType,
        company: company || null,
        annualIncome,
        address,
        city,
        pincode,
        applicationStatus: "SUBMITTED", // updated from "INITIATED"
        paymentMethod: paymentMethod || null,
        userId: user.id,
      })
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error("Application insert error:", err);
    return NextResponse.json(
      { error: "Failed to save application", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.emailAddresses.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const applications = await db
      .select()
      .from(applicationsTable)
      .where(eq(applicationsTable.userId, user.id))
      .orderBy(applicationsTable.createdAt);

    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("Application fetch error:", err);
    return NextResponse.json(
      { error: "Server error", details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}