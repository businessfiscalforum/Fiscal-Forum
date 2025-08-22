// app/api/education-loan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../config/db';
import { educationLoanApplications } from '../../../config/schema';

// Schema for Education Loan Application
const educationLoanSchema = z.object({
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

  // Employment Details
  employmentType: z.enum(["Company", "Self-Employed"]),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  netMonthlySalary: z.number().optional(),

  // Course Details
  courseType: z.enum(["Undergraduate", "Postgraduate", "PhD", "Diploma", "Certificate", "Other"]).optional(),
  courseName: z.string().min(1, "Course name is required"),
  universityName: z.string().min(1, "University/Institute name is required"),
  countryName: z.string().min(1, "Country name is required"),

  // Loan Amount
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input using Zod
    const parsedData = educationLoanSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsedData.error },
        { status: 400 }
      );
    }


    // Insert into database
    const [newApplication] = await db.insert(educationLoanApplications).values({
      // Applicant Details
      firstName: parsedData.data.firstName,
      middleName: parsedData.data.middleName,
      lastName: parsedData.data.lastName,
      fatherName: parsedData.data.fatherName,
      panNumber: parsedData.data.panNumber,
      dateOfBirth: new Date(parsedData.data.dateOfBirth),
      maritalStatus: parsedData.data.maritalStatus,
      gender: parsedData.data.gender,
      mobileNo: parsedData.data.mobileNo,
      emailId: parsedData.data.emailId,

      // Address
      currentHomeAddress1: parsedData.data.currentHomeAddress1,
      currentHomeAddress2: parsedData.data.currentHomeAddress2 || null,
      currentResidenceType: parsedData.data.currentResidenceType,
      currentCity: parsedData.data.currentCity,
      currentState: parsedData.data.currentState,
      currentPincode: parsedData.data.currentPincode,
      permanentHomeAddress1: parsedData.data.permanentHomeAddress1,
      permanentHomeAddress2: parsedData.data.permanentHomeAddress2 || null,
      permanentResidenceType: parsedData.data.permanentResidenceType,
      permanentCity: parsedData.data.permanentCity,
      permanentState: parsedData.data.permanentState,
      permanentPincode: parsedData.data.permanentPincode,
      permanentAddressSame: parsedData.data.permanentAddressSame,

      // Employment
      employmentType: parsedData.data.employmentType,
      companyName: parsedData.data.companyName,
      designation: parsedData.data.designation,
      netMonthlySalary: parsedData.data.netMonthlySalary,

      // Course Details
      courseType: parsedData.data.courseType,
      courseName: parsedData.data.courseName,
      universityName: parsedData.data.universityName,
      countryName: parsedData.data.countryName,

      // Loan Amount
      loanAmountRequired: parsedData.data.loanAmountRequired,

      // Existing Obligations
      noOfCurrentLoans: parsedData.data.noOfCurrentLoans,
      existingLoanType: parsedData.data.existingLoanType,

      // References
      reference1Name: parsedData.data.reference1.name,
      reference1Mobile: parsedData.data.reference1.mobile,
      reference1Address: parsedData.data.reference1.address,

      reference2Name: parsedData.data.reference2.name,
      reference2Mobile: parsedData.data.reference2.mobile,
      reference2Address: parsedData.data.reference2.address,
    }).returning();

    console.log('✅ Education Loan Application Saved:', newApplication);

    return NextResponse.json(
      { message: 'Application submitted successfully', data: newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing education loan application:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch applications (optional)
export async function GET() {
  return NextResponse.json({
    message: "Education Loan Application API endpoint",
    method: "POST"
  });
}