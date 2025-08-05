
import { db } from "../../../config/db";
import { usersTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.emailAddresses.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const userName = clerkUser.fullName ?? "Anonymous";

  if (!userEmail) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (existing.length > 0) {
      return NextResponse.json(existing[0], { status: 200 });
    }

    const hashedPassword = await bcrypt.hash("defaultpassword123", 10);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: userName,
        email: userEmail,
        age: 18,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
      })
      .returning();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("User insert error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
