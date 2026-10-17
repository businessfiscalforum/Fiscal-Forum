import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  createCustomReportOrder,
  CustomReportError,
} from "../../../lib/customReports";
import { logSafeDiagnostic } from "../../../lib/diagnosticLogger";

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000",
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
    let clerkUserId: string | null = null;
    try {
      const user = await currentUser();
      if (user && user.id) {
        clerkUserId = user.id;
      }
    } catch {
      // Clerk user is optional for custom reports
    }

    const body = await req.json().catch(() => ({}));

    const result = await createCustomReportOrder({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      category: body.category,
      clerkUserId,
      age: body.age ? String(body.age).trim() : null,
      capitalInvestBorrow: body.capitalInvestBorrow ? String(body.capitalInvestBorrow).trim() : null,
      returnExpected: body.returnExpected ? String(body.returnExpected).trim() : null,
      investmentGoal: body.investmentGoal ? String(body.investmentGoal).trim() : null,
      riskTolerance: body.riskTolerance ? String(body.riskTolerance).trim() : null,
      investmentStyle: body.investmentStyle ? String(body.investmentStyle).trim() : null,
      monthlySavings: body.monthlySavings ? String(body.monthlySavings).trim() : null,
      addDetails: body.addDetails ? String(body.addDetails).trim() : null,
      occupation: body.occupation ? String(body.occupation).trim() : null,
      investmentPreference: body.investmentPreference ? String(body.investmentPreference).trim() : null,
      annualIncome: body.annualIncome ? String(body.annualIncome).trim() : null,
      dependents: body.dependents ? String(body.dependents).trim() : null,
      maritalStatus: body.maritalStatus ? String(body.maritalStatus).trim() : null,
      existingInsurance: body.existingInsurance ? String(body.existingInsurance).trim() : null,
      insuranceCovers: body.insuranceCovers ? String(body.insuranceCovers).trim() : null,
      loansLiabilities: body.loansLiabilities ? String(body.loansLiabilities).trim() : null,
      monthlySpending: body.monthlySpending ? String(body.monthlySpending).trim() : null,
      spendingCategories: body.spendingCategories ? String(body.spendingCategories).trim() : null,
      flyFrequency: body.flyFrequency ? String(body.flyFrequency).trim() : null,
      travelType: body.travelType ? String(body.travelType).trim() : null,
      loungeImportance: body.loungeImportance ? String(body.loungeImportance).trim() : null,
      feeComfort: body.feeComfort ? String(body.feeComfort).trim() : null,
      loanPurpose: body.loanPurpose ? String(body.loanPurpose).trim() : null,
      loanEmployment: body.loanEmployment ? String(body.loanEmployment).trim() : null,
      loanMonthlyIncome: body.loanMonthlyIncome ? String(body.loanMonthlyIncome).trim() : null,
      loanIncomeStability: body.loanIncomeStability ? String(body.loanIncomeStability).trim() : null,
      loanAmount: body.loanAmount ? String(body.loanAmount).trim() : null,
      loanHasCollateral: body.loanHasCollateral ? String(body.loanHasCollateral).trim() : null,
      loanCollateralType: body.loanCollateralType ? String(body.loanCollateralType).trim() : null,
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error: unknown) {
    if (error instanceof CustomReportError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: error.status, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    const diag = logSafeDiagnostic("Custom report create-order", error);
    let clientMessage = "Failed to initialize custom report payment.";
    let clientStatus = 500;

    if (diag.httpStatus === 401 && diag.exceptionName === "RazorpayAPIError") {
      clientMessage = "Payment gateway authentication failed. Please check server gateway credentials.";
      clientStatus = 502;
    } else if (diag.httpStatus === 400 && diag.providerErrorCode) {
      clientMessage = `Payment gateway rejected order: ${diag.message}`;
      clientStatus = 400;
    }

    return NextResponse.json(
      { success: false, error: clientMessage },
      { status: clientStatus, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}
