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
  const { type, loanType, insuranceType, paymentMethod } = await req.json();

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (!user) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    const [application] = await db
      .insert(applicationsTable)
      .values({
        userId: user.id,
        type,
        loanType,
        insuranceType,
        applicationStatus: "INITIATED",
        paymentMethod,
      })
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error("Application insert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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
      .where(eq(applicationsTable.userId, user.id));

    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("Application fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
