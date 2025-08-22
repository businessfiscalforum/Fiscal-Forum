// src/app/api/loan-against-securities/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../config/db'; // Adjust path as needed
import { lasApplication } from '../../../config/schema'; // Adjust path as needed


// Zod schema for validation (same as frontend)
const loanAgainstSecuritiesSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid format"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried", "Others"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z.string().min(10, "Mobile number must be at least 10 digits").max(15),
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

  // Securities Details
  securityType: z.enum(["Gold", "Silver", "Jewelry", "Property", "Other"]).optional(),
  securityValue: z.number().min(1, "Security value is required"),
  requiredLoanAmount: z.number().min(1, "Required loan amount is required"),

  // Loan Amount Required
  loanAmountRequired: z.number().min(1, "Loan amount is required"),

  // Existing Obligations
  noOfCurrentLoans: z.number().min(0).max(10),
  existingLoanType: z.enum(["None", "Personal", "Car", "Education", "Other"]).optional(),

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validatedData = loanAgainstSecuritiesSchema.parse(body);

    // Insert into database
    const result = await db.insert(lasApplication).values({
      // Applicant Details
      firstName: validatedData.firstName,
      middleName: validatedData.middleName,
      lastName: validatedData.lastName,
      fatherName: validatedData.fatherName,
      panNumber: validatedData.panNumber,
      dateOfBirth: validatedData.dateOfBirth,
      maritalStatus: validatedData.maritalStatus,
      gender: validatedData.gender,
      mobileNo: validatedData.mobileNo,
      emailId: validatedData.emailId,

      // Current Address
      currentHomeAddress1: validatedData.currentHomeAddress1,
      currentHomeAddress2: validatedData.currentHomeAddress2 || null,
      currentResidenceType: validatedData.currentResidenceType,
      currentCity: validatedData.currentCity,
      currentState: validatedData.currentState,
      currentPincode: validatedData.currentPincode,
      permanentHomeAddress1: validatedData.permanentHomeAddress1,
      permanentHomeAddress2: validatedData.permanentHomeAddress2 || null,
      permanentResidenceType: validatedData.permanentResidenceType,
      permanentCity: validatedData.permanentCity,
      permanentState: validatedData.permanentState,
      permanentPincode: validatedData.permanentPincode,
      permanentAddressSame: validatedData.permanentAddressSame,

      // Securities Details
      securityType: validatedData.securityType,
      securityValue: validatedData.securityValue.toString(), // Convert to string for decimal
      requiredLoanAmount: validatedData.requiredLoanAmount.toString(), // Convert to string for decimal

      // Loan Amount Required
      loanAmountRequired: validatedData.loanAmountRequired.toString(), // Convert to string for decimal

      // Existing Obligations
      noOfCurrentLoans: validatedData.noOfCurrentLoans,
      existingLoanType: validatedData.existingLoanType,

      // References
      reference1Name: validatedData.reference1.name,
      reference1Mobile: validatedData.reference1.mobile,
      reference1Address: validatedData.reference1.address,

      reference2Name: validatedData.reference2.name,
      reference2Mobile: validatedData.reference2.mobile,
      reference2Address: validatedData.reference2.address,
    }).returning({ id: lasApplication.id });

    return NextResponse.json({ 
      message: "Application submitted successfully", 
      id: result[0].id 
    }, { status: 201 });

  } catch (error) {
    console.error("Error submitting application:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: error
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: "Failed to submit application" 
    }, { status: 500 });
  }
}