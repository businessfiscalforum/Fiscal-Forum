import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { savingsApplications } from "../../../config/schema";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
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

function withCORS(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v as string));
  return res;
}

export async function OPTIONS(req: NextRequest) {
  return withCORS(req, new NextResponse(null, { status: 204 }));
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const mobileNo = (formData.get("mobileNo") as string) ?? "";
    const panNo = (formData.get("panNo") as string) ?? "";
    const pincode = (formData.get("pincode") as string) ?? "";
    const state = (formData.get("state") as string) ?? "";
    const district = (formData.get("district") as string) ?? "";

    // Detect bank type from referer
    const referer = req.headers.get("referer") || "";
    let bankType = "regular";
    if (referer.includes("/indusInd")) bankType = "IndusInd";
    else if (referer.includes("/axis")) bankType = "Axis";
    else if (referer.includes("/fi")) bankType = "Fi";

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

    return withCORS(req, NextResponse.json({ success: true }, { status: 201 }));
  } catch (error: unknown) {
    console.error("Error saving form data:", error);
    const message = error instanceof Error ? error.message : "Something went wrong";
    return withCORS(req, NextResponse.json({ success: false, error: message }, { status: 500 }));
  }
}
