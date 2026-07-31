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

    const occupation = body.occupation ? String(body.occupation).trim() : null;
    const investmentPreference = body.investmentPreference ? String(body.investmentPreference).trim() : null;
    const annualIncome = body.annualIncome ? String(body.annualIncome).trim() : null;
    const dependents = body.dependents ? String(body.dependents).trim() : null;
    const maritalStatus = body.maritalStatus ? String(body.maritalStatus).trim() : null;
    const existingInsurance = body.existingInsurance ? String(body.existingInsurance).trim() : null;
    const insuranceCovers = body.insuranceCovers ? String(body.insuranceCovers).trim() : null;
    const loansLiabilities = body.loansLiabilities ? String(body.loansLiabilities).trim() : null;
    const monthlySpending = body.monthlySpending ? String(body.monthlySpending).trim() : null;
    const spendingCategories = body.spendingCategories ? String(body.spendingCategories).trim() : null;
    const flyFrequency = body.flyFrequency ? String(body.flyFrequency).trim() : null;
    const travelType = body.travelType ? String(body.travelType).trim() : null;
    const loungeImportance = body.loungeImportance ? String(body.loungeImportance).trim() : null;
    const feeComfort = body.feeComfort ? String(body.feeComfort).trim() : null;
    const loanPurpose = body.loanPurpose ? String(body.loanPurpose).trim() : null;
    const loanEmployment = body.loanEmployment ? String(body.loanEmployment).trim() : null;
    const loanMonthlyIncome = body.loanMonthlyIncome ? String(body.loanMonthlyIncome).trim() : null;
    const loanIncomeStability = body.loanIncomeStability ? String(body.loanIncomeStability).trim() : null;
    const loanAmount = body.loanAmount ? String(body.loanAmount).trim() : null;
    const loanHasCollateral = body.loanHasCollateral ? String(body.loanHasCollateral).trim() : null;
    const loanCollateralType = body.loanCollateralType ? String(body.loanCollateralType).trim() : null;

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
        occupation,
        investmentPreference,
        annualIncome,
        dependents,
        maritalStatus,
        existingInsurance,
        insuranceCovers,
        loansLiabilities,
        monthlySpending,
        spendingCategories,
        flyFrequency,
        travelType,
        loungeImportance,
        feeComfort,
        loanPurpose,
        loanEmployment,
        loanMonthlyIncome,
        loanIncomeStability,
        loanAmount,
        loanHasCollateral,
        loanCollateralType,
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


