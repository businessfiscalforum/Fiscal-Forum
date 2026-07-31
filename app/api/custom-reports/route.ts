import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/db";
import { customReportsTable } from "../../../config/schema";

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

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const mobile = (body.mobile || "").trim();
    const age = body.age ? String(body.age).trim() : null;
    const category = (body.category || "").trim();
    const capitalInvestBorrow = body.capitalInvestBorrow ? String(body.capitalInvestBorrow).trim() : null;
    const returnExpected = body.returnExpected ? String(body.returnExpected).trim() : null;
    const investmentGoal = body.investmentGoal ? String(body.investmentGoal).trim() : null;
    const riskTolerance = body.riskTolerance ? String(body.riskTolerance).trim() : null;
    const investmentStyle = body.investmentStyle ? String(body.investmentStyle).trim() : null;
    const monthlySavings = body.monthlySavings ? String(body.monthlySavings).trim() : null;
    const addDetails = body.addDetails ? String(body.addDetails).trim() : null;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category is required" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Phone must be 10 digits" },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const [saved] = await db
      .insert(customReportsTable)
      .values({
        name,
        email,
        mobile,
        age,
        category,
        capitalInvestBorrow,
        returnExpected,
        investmentGoal,
        riskTolerance,
        investmentStyle,
        monthlySavings,
        addDetails,
      })
      .returning();

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    console.error("Custom report POST error:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
};


