// app/api/loan-applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../config/db'; // adjust path
import { applicationsTable } from '../../../config/schema'; // adjust path

// Zod schema for validation (must match applicationsTable)
const LoanApplicationSchema = z.object({
  userId: z.string(),
  loanType: z.string(),
  loanAmountRequired: z.string().optional(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  fathersName: z.string(),
  pan: z.string(),
  dob: z.string(),
  maritalStatus: z.string().optional(),
  gender: z.string().optional(),
  mobile: z.string(),
  email: z.string(),
  currentAddress1: z.string(),
  currentAddress2: z.string().optional(),
  residenceType: z.string().optional(),
  currentPincode: z.string(),
  currentCity: z.string(),
  currentState: z.string(),
  permanenSameAsCurrent: z.boolean().optional(),
  permanentAddress1: z.string().optional(),
  permanentAddress2: z.string().optional(),
  permanentPincode: z.string().optional(),
  permanentCity: z.string().optional(),
  permanentState: z.string().optional(),
  employmentType: z.string().optional(),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  netMonthlySalary: z.string().optional(),
  companyAddress1: z.string().optional(),
  companyAddress2: z.string().optional(),
  companyPincode: z.string().optional(),
  companyCity: z.string().optional(),
  companyState: z.string().optional(),
  currentJobStability: z.string().optional(),
  totalJobStability: z.string().optional(),
  propertyType: z.string().optional(),
  propertyAddress1: z.string().optional(),
  propertyAddress2: z.string().optional(),
  propertyCity: z.string().optional(),
  transactionType: z.string().optional(),
  agreementValue: z.string().optional(),
  downPayment: z.string().optional(),
  carType: z.string().optional(),
  carYear: z.number().optional(),
  carLoanType: z.string().optional(),
  courseName: z.string().optional(),
  countryName: z.string().optional(),
  goldWeightGram: z.string().optional(),
  goldPurityKarat: z.string().optional(),
  securityType: z.string().optional(),
  securityValue: z.string().optional(),
  currentLoansCount: z.number().optional(),
  buildersName: z.string().optional(),
  residenceSince: z.string().optional(),
  specialName: z.string().optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  yearsInBusiness: z.string().optional(),
  annualTurnover: z.string().optional(),
  monthlyProfit: z.string().optional(),
  gstNumber: z.string().optional(),
  reference1Name: z.string().optional(),
  reference1Mobile: z.string().optional(),
  reference1Address: z.string().optional(),
  reference2Name: z.string().optional(),
  reference2Mobile: z.string().optional(),
  reference2Address: z.string().optional(),
  applicationStatus: z.string().optional(),
  paymentMethod: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoanApplicationSchema.parse(body);

    const permanentData = parsed.permanenSameAsCurrent
      ? {
          permanentAddress1: parsed.currentAddress1,
          permanentAddress2: parsed.currentAddress2,
          permanentPincode: parsed.currentPincode,
          permanentState: parsed.currentState,
          permanentCity: parsed.currentCity,
        }
      : {
          permanentAddress1: parsed.permanentAddress1,
          permanentAddress2: parsed.permanentAddress2,
          permanentPincode: parsed.permanentPincode,
          permanentState: parsed.permanentState,
          permanentCity: parsed.permanentCity,
        };

    const [application] = await db
      .insert(applicationsTable)
      .values({
        ...parsed,
        ...permanentData,
        loanAmountRequired: parsed.loanAmountRequired
          ? parseFloat(parsed.loanAmountRequired)
          : null,
        netMonthlySalary: parsed.netMonthlySalary
          ? parseFloat(parsed.netMonthlySalary)
          : null,
        agreementValue: parsed.agreementValue
          ? parseFloat(parsed.agreementValue)
          : null,
        downPayment: parsed.downPayment
          ? parseFloat(parsed.downPayment)
          : null,
        goldWeightGram: parsed.goldWeightGram
          ? parseFloat(parsed.goldWeightGram)
          : null,
        goldPurityKarat: parsed.goldPurityKarat
          ? parseFloat(parsed.goldPurityKarat)
          : null,
        securityValue: parsed.securityValue
          ? parseFloat(parsed.securityValue)
          : null,
        annualTurnover: parsed.annualTurnover
          ? parseFloat(parsed.annualTurnover)
          : null,
        monthlyProfit: parsed.monthlyProfit
          ? parseFloat(parsed.monthlyProfit)
          : null,
      } as typeof applicationsTable.$inferInsert)
      .returning();

    return NextResponse.json(
      { success: true, message: 'Application submitted!', id: application.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await db
      .select({
        id: applicationsTable.id,
        firstName: applicationsTable.firstName,
        lastName: applicationsTable.lastName,
        loanType: applicationsTable.loanType,
        loanAmountRequired: applicationsTable.loanAmountRequired,
        mobile: applicationsTable.mobile,
        email: applicationsTable.email,
        applicationStatus: applicationsTable.applicationStatus,
        createdAt: applicationsTable.createdAt,
      })
      .from(applicationsTable)
      .limit(100);

    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
