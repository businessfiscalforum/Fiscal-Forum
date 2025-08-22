/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { carLoanApplications } from '../../../config/schema';
import { db } from '../../../config/db';

// Zod schema - EXACT MATCH with frontend
const carLoanSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father’s name is required"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid format"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried", "Others"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15),
  emailId: z.string().email("Invalid email address"),

  // Current Address
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

  // Employment Details
  employmentType: z.enum(["Company", "Self-Employed"]),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  netMonthlySalary: z
    .preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().optional()
    )
    .optional(),

  // Car Details
  carType: z
    .enum(["Sedan", "Hatchback", "SUV", "MUV", "Other"])
    .optional(),
  year: z
    .preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().min(1980, "Year must be after 1980").max(new Date().getFullYear(), "Year cannot be in future").optional()
    )
    .optional(),
  loanType: z
    .enum(["New Car", "Used Car", "Finance Only"])
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
    const parsed = carLoanSchema.parse(body);

    // Prepare data for insertion - EXACT MATCH with DB schema
    const insertData = {
      firstName: parsed.firstName,
      middleName: parsed.middleName || null,
      lastName: parsed.lastName,
      fatherName: parsed.fatherName,
      panNumber: parsed.panNumber,
      dateOfBirth: parsed.dateOfBirth, // Keep as string for Drizzle
      maritalStatus: parsed.maritalStatus,
      gender: parsed.gender,
      mobileNo: parsed.mobileNo,
      emailId: parsed.emailId,
      currentHomeAddress1: parsed.currentHomeAddress1,
      currentHomeAddress2: parsed.currentHomeAddress2 || null,
      currentResidenceType: parsed.currentResidenceType,
      currentCity: parsed.currentCity,
      currentState: parsed.currentState,
      currentPincode: parsed.currentPincode,
      permanentHomeAddress1: parsed.permanentHomeAddress1,
      permanentHomeAddress2: parsed.permanentHomeAddress2 || null,
      permanentResidenceType: parsed.permanentResidenceType,
      permanentCity: parsed.permanentCity,
      permanentState: parsed.permanentState,
      permanentPincode: parsed.permanentPincode,
      permanentAddressSame: parsed.permanentAddressSame,
      employmentType: parsed.employmentType,
      companyName: parsed.companyName || null,
      designation: parsed.designation || null,
      netMonthlySalary: parsed.netMonthlySalary || null,
      carType: parsed.carType || null,
      year: parsed.year || null,
      loanType: parsed.loanType || null,
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

    const [result] = await db.insert(carLoanApplications).values(insertData).returning();

    return NextResponse.json(
      { message: "Car loan application submitted successfully",  result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Car Loan Application Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error},
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
    message: "Car Loan Application API endpoint",
    method: "POST"
  });
}