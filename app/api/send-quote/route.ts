import { db } from "../../../config/db";
import { quoteRequestsTable } from "../../../config/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, loanAmount, tenure, loanType } = body;

    if (!name || !email || !phone || !loanAmount || !tenure || !loanType) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, phone, loanAmount, tenure, loanType",
        },
        { status: 400 }
      );
    }

    const validLoanTypes = [
      "lap",
      "home-loan",
      "personal",
      "business",
      "gold",
      "car",
      "education",
      "securities",
    ] as const;

    if (!validLoanTypes.includes(loanType)) {
      return NextResponse.json(
        {
          error: `Invalid loan type. Must be one of: ${validLoanTypes.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // EMI Calculation
    const rate = 8.5 / 12 / 100;
    const time = tenure * 12;
    const emi = Math.round(
      (loanAmount * rate * Math.pow(1 + rate, time)) /
        (Math.pow(1 + rate, time) - 1)
    );

    const [inserted] = await db
      .insert(quoteRequestsTable)
      .values({
        name,
        email,
        phone,
        loanType,
        loanAmount,
        tenure,
        emi,
      })
      .returning();

    return NextResponse.json(
      { message: "Quote saved successfully", data: inserted },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
