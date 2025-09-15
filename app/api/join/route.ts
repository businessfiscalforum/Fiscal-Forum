// app/api/join/route.ts
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "../../../config/db";
import { usersTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

// Map your plan IDs to Clerk's plan IDs
const PLAN_MAPPING = {
  "3m": "cplan_32NrDxRjTJqeiz5EB76HN8VXLuZ",
  "6m": "cplan_32NrShXfiEg1NHNigLkkz3OfWIF",
  "1y": "cplan_32NrlDzyG7ZSmbJgZCkfWc6HD19",
};

export async function POST(req: NextRequest) {
  try {
    // Get authentication data
    const { userId } = getAuth(req);
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get user data from Clerk
    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch user:", errorText);
      return new NextResponse("User not found", { status: 404 });
    }

    const clerkUser = await userResponse.json();
    const clerkEmail = clerkUser.email_addresses?.[0]?.email_address;
    const fullName = clerkUser.first_name && clerkUser.last_name 
      ? `${clerkUser.first_name} ${clerkUser.last_name}` 
      : clerkUser.username || "Anonymous";

    // Sync user with your database
    if (clerkEmail) {
      const existing = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, clerkEmail));
      
      if (existing.length === 0) {
        await db
          .insert(usersTable)
          .values({
            name: fullName,
            email: clerkEmail,
            age: 18,
            password: "",
            role: "USER",
            status: "PENDING",
          });
      }
    }

    // Get plan ID from request
    const { planId } = await req.json();

    // Validate plan ID
    const clerkPlanId = PLAN_MAPPING[planId as keyof typeof PLAN_MAPPING];
    if (!clerkPlanId) {
      return new NextResponse("Invalid plan ID", { status: 400 });
    }

    // Create checkout session using Clerk's REST API
    const response = await fetch(
      `https://api.clerk.dev/v1/users/${userId}/checkout`, // Fixed the URL (removed extra space)
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_id: clerkPlanId,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Clerk API Error:", errorText);
      return new NextResponse(`Clerk API error: ${errorText}`, { status: response.status });
    }

    const checkoutSession = await response.json();
    return NextResponse.json({ url: checkoutSession.url });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in /api/join:", error);
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
  }
}