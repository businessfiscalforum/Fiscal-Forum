// app/api/reports/route.ts
import { db } from "../../../config/db";
import { researchReportsTable } from "../../../config/schema";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const reports = await db
      .select()
      .from(researchReportsTable)
      .orderBy(researchReportsTable.date);

    return NextResponse.json(reports);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}