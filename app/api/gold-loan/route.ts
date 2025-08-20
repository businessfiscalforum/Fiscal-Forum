/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { goldLoanApplications } from '../../../config/schema';
import { db } from '../../../config/db';

// Zod schema - EXACT MATCH with frontend
const goldLoanSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father’s name is required"),
  panNumber: z.string().min(10, "PAN number must be 10 characters").max(10).optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),

  // Current Address
  homeAddress1: z.string().min(1, "Address is required"),
  homeAddress2: z.string().optional(),
  residenceType: z.enum(["Owned", "Rented"]),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  permanentAddressSame: z.boolean().default(false),

  // Gold Loan Details
  goldWeight: z
    .preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().min(1, "Gold weight must be greater than 0").optional()
    )
    .optional(),
  goldPurity: z
    .enum(["22K", "24K", "18K", "14K", "Other"])
    .optional(),

  // Loan Amount
  loanAmountRequired: z.number().min(1, "Loan amount is required"),

  // Existing Obligations
  noOfCurrentLoans: z.number().min(0).max(10),
  existingLoanType: z
    .enum(["None", "Personal", "Car", "Education", "Other"])
    .optional(),

  // References
  reference1: z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    address: z.string().min(1, "Address is required"),
  }),
  reference2: z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    address: z.string().min(1, "Address is required"),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = goldLoanSchema.parse(body);

    // Prepare data for insertion - EXACT MATCH with DB schema
    const insertData = {
      firstName: parsed.firstName,
      middleName: parsed.middleName || null,
      lastName: parsed.lastName,
      fatherName: parsed.fatherName,
      panNumber: parsed.panNumber || null,
      dateOfBirth: parsed.dateOfBirth, // Keep as string for Drizzle
      maritalStatus: parsed.maritalStatus,
      gender: parsed.gender,
      mobileNo: parsed.mobileNo,
      emailId: parsed.emailId,
      homeAddress1: parsed.homeAddress1,
      homeAddress2: parsed.homeAddress2 || null,
      residenceType: parsed.residenceType,
      city: parsed.city,
      state: parsed.state,
      pincode: parsed.pincode,
      permanentAddressSame: parsed.permanentAddressSame,
      goldWeight: parsed.goldWeight || null,
      goldPurity: parsed.goldPurity || null,
      loanAmountRequired: parsed.loanAmountRequired,
      noOfCurrentLoans: parsed.noOfCurrentLoans,
      existingLoanType: parsed.existingLoanType || null,
      
      // Flatten references
      reference1Name: parsed.reference1.name,
      reference1Mobile: parsed.reference1.mobile,
      reference1Address: parsed.reference1.address,
      reference2Name: parsed.reference2.name,
      reference2Mobile: parsed.reference2.mobile,
      reference2Address: parsed.reference2.address,
    };

    const [result] = await db.insert(goldLoanApplications).values(insertData).returning();

    return NextResponse.json(
      { message: "Gold loan application submitted successfully",  result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gold Loan Application Error:", error);

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

export async function GET() {
  return NextResponse.json({
    message: "Gold Loan Application API endpoint",
    method: "POST"
  });
}