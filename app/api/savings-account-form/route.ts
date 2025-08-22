import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db"; // drizzle db instance
import { savingsApplications } from "../../../config/schema"; // your drizzle schema

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
    // Parse the form data
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const mobileNo = formData.get("mobileNo") as string;
    const panNo = formData.get("panNo") as string;
    const pincode = formData.get("pincode") as string;
    const state = formData.get("state") as string;
    const district = formData.get("district") as string;

    // Detect account type from referer URL
    const referer = req.headers.get("referer") || "";
    let bankType = "regular"; // default

    if (referer.includes("/indusInd")) bankType = "IndusInd";
    else if (referer.includes("/axis")) bankType = "Axis";
    else if (referer.includes("/fi")) bankType = "Fi";

    // Insert into Neon Postgres using Drizzle
    await db.insert(savingsApplications).values({
      name,
      email,
      mobileNo,
      panNo,
      pincode,
      state,
      district,
      bankType,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error saving form data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
