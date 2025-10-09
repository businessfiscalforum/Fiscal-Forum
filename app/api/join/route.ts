// app/api/join/route.ts
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "../../../config/db";
import { usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const PLAN_MAPPING: Record<string, string> = {
  "3m": "cplan_32NrDxRjTJqeiz5EB76HN8VXLuZ",
  "6m": "cplan_32NrShXfiEg1NHNigLkkz3OfWIF",
  "1y": "cplan_32NrlDzyG7ZSmbJgZCkfWc6HD19",
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch user from Clerk securely
    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      // headers: {
      //   Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      //   "Content-Type": "application/json",
      // },
    });

    if (!userResponse.ok) {
      return new NextResponse("User not found", { status: 404 });
    }

    const clerkUser = await userResponse.json();
    const clerkEmail = clerkUser.email_addresses?.[0]?.email_address;
    const fullName =
      clerkUser.first_name && clerkUser.last_name
        ? `${clerkUser.first_name} ${clerkUser.last_name}`
        : clerkUser.username || "Anonymous";

    // Sync with database (only if email exists)
    if (clerkEmail) {
      const existing = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, clerkEmail));

      if (existing.length === 0) {
        await db.insert(usersTable).values({
          name: fullName,
          email: clerkEmail,
          age: 18,
          password: "", 
          role: "USER",
          status: "PENDING",
        });
      }
    }

    // Parse planId from request
    const { planId } = await req.json();

    const clerkPlanId = PLAN_MAPPING[planId as keyof typeof PLAN_MAPPING];
    if (!clerkPlanId) {
      return new NextResponse("Invalid plan ID", { status: 400 });
    }

    // Create checkout session securely
    const checkoutResponse = await fetch(
      `https://api.clerk.dev/v1/users/${userId}/checkout`,
      // {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ plan_id: clerkPlanId }),
      // }
    );

    if (!checkoutResponse.ok) {
      return new NextResponse("Failed to create checkout session", {
        status: checkoutResponse.status,
      });
    }

    const checkoutSession = await checkoutResponse.json();

    // Return only the safe URL
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error in /api/join:", error); // ok to log generic error
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
