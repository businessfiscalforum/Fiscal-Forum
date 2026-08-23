/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { homeLoanApplications } from '../../../config/schema';
import { db } from '../../../config/db';

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

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin) as HeadersInit,
  });
}

// Zod schema with correct preprocessing + optional fields
const applicationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  fatherName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  maritalStatus: z.enum(['Married', 'Unmarried', 'Others']),
  gender: z.enum(['Male', 'Female', 'Others']),
  mobileNo: z.string().min(10).max(15),
  emailId: z.string().email(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid format"),
  currentHomeAddress1: z.string().min(1),
  currentHomeAddress2: z.string().optional(),
  currentResidenceType: z.enum(['Owned', 'Rented']),
  currentPincode: z.string().length(6),
  currentState: z.string().min(1),
  currentCity: z.string().min(1),
  permanentAddressSame: z.boolean(),
  permanentHomeAddress1: z.string().min(1),
  permanentHomeAddress2: z.string().optional(),
  permanentResidenceType: z.enum(['Owned', 'Rented']),
  permanentPincode: z.string().length(6),
  permanentState: z.string().min(1),
  permanentCity: z.string().min(1),

  employmentType: z.enum(['Company', 'Self-Employed']),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  netMonthlySalary: z.preprocess(
    val => val === "" || val === null || val === undefined ? 0 : Number(val),
    z.number().min(0)
  ).default(0),

  propertyType: z.enum(['Residential', 'Commercial']),
  agreementValue: z.preprocess(val => Number(val), z.number().min(1)),
  loanAmountRequired: z.preprocess(val => Number(val), z.number().min(1)),
  propertyAddressLine1: z.string().min(1),
  propertyAddressLine2: z.string().optional(),
  propertyCity: z.string().min(1),

  noOfCurrentLoans: z.preprocess(val => val === "" ? 0 : Number(val), z.number().min(0).max(10)).default(0),
  existingLoanType: z.enum(['None', 'Personal', 'Car', 'Education', 'Other']).optional(),

  builderName: z.string().min(1),
  residenceSince: z.string().min(1),
  specialName: z.string().optional(),

  reference1: z.object({
    name: z.string().min(1),
    mobile: z.string().min(10).max(15),
    address: z.string().min(1),
  }),
  reference2: z.object({
    name: z.string().min(1),
    mobile: z.string().min(10).max(15),
    address: z.string().min(1),
  }),
});

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  try {
    const body = await req.json();
    const parsed = applicationSchema.parse(body);

    // Flatten references
    const insertData: any = {
      ...parsed,
      netMonthlySalary: parsed.netMonthlySalary ?? 0,
      noOfCurrentLoans: parsed.noOfCurrentLoans,
      agreementValue: parsed.agreementValue,
      loanAmountRequired: parsed.loanAmountRequired,
      reference1Name: parsed.reference1.name,
      reference1Mobile: parsed.reference1.mobile,
      reference1Address: parsed.reference1.address,
      reference2Name: parsed.reference2.name,
      reference2Mobile: parsed.reference2.mobile,
      reference2Address: parsed.reference2.address,
      panNumber: parsed.panNumber,
    };

    delete insertData.reference1;
    delete insertData.reference2;

    // Insert into DB
    const [result] = await db.insert(homeLoanApplications).values(insertData).returning();

    return NextResponse.json(
      { message: "Application submitted successfully", result },
      { status: 201, headers: corsHeaders(origin) as HeadersInit }
    );
  } catch (error) {
    console.error("Validation/DB error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400, headers: corsHeaders(origin) as HeadersInit }
      );
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as any;
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: "Email or mobile number already registered" },
          { status: 409, headers: corsHeaders(origin) as HeadersInit }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500, headers: corsHeaders(origin) as HeadersInit }
    );
  }
}