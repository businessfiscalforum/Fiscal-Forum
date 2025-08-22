/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { lapApplications } from '../../../config/schema';
import { db } from '../../../config/db';

// Zod schema aligned with DB
const applicationSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  fatherName: z.string().optional(),
  dob: z.string().optional(), // DB: date, so we’ll cast later
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid format"),
  email: z.string().email(),
  mobileNo: z.string().min(10).max(15),
  gender: z.enum(['Male', 'Female', 'Others']),
  maritalStatus: z.enum(['Married', 'Unmarried']),
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

  employmentType: z.enum(['Salaried', 'Self Employed']),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  companyAddress1: z.string().optional(),
  companyAddress2: z.string().optional(),
  companyCity: z.string().optional(),
  companyState: z.string().optional(),

  monthlySalary: z.preprocess(val => Number(val), z.number().min(0)), // NOT optional, DB requires notNull()
  experienceInMonths: z.preprocess(val => Number(val), z.number().min(0)).optional(),
  currentJobStability: z.enum(['Less than 6 months', '6-12 months', '1-2 years', 'More than 2 years']).optional(),

  propertyType: z.enum(['Residential', 'Commercial']),
  agreementValue: z.preprocess(val => Number(val), z.number().min(1)), // DB: integer
  loanAmountRequired: z.preprocess(val => Number(val), z.number().min(1)), // DB: notNull
  propertyAddress1: z.string().min(1),
  propertyAddress2: z.string().optional(),
  propertyCity: z.string().min(1),
  propertyState: z.string().min(1),

  existingLoansCount: z.preprocess(val => Number(val), z.number().min(0)).default(0),
  existingLoanType: z.enum(['None', 'Personal', 'Car', 'Education', 'Other']).optional(),

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
  try {
    const body = await req.json();
    const parsed = applicationSchema.parse(body);

    const insertData = {
      ...parsed,

      // Cast date string → JS Date (since DB column is date)
      dob: parsed.dob ? parsed.dob : null,

      // Flatten references
      reference1Name: parsed.reference1.name,
      reference1Mobile: parsed.reference1.mobile,
      reference1Address: parsed.reference1.address,
      reference2Name: parsed.reference2.name,
      reference2Mobile: parsed.reference2.mobile,
      reference2Address: parsed.reference2.address,
    };

    delete (insertData as any).reference1;
    delete (insertData as any).reference2;

    const [result] = await db.insert(lapApplications).values(insertData).returning();

    return NextResponse.json(
      { message: "Application submitted successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Validation/DB error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
