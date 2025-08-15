import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { dematApplications } from "../../../config/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.insert(dematApplications).values({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      pan: body.pan.toUpperCase(),
      city: body.city,
    });

    return NextResponse.json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
