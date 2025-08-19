// app/api/education-loan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../config/db';
import { educationLoanApplications } from '../../../config/schema';
import { eq } from 'drizzle-orm';

// Schema for Education Loan Application
const educationLoanSchema = z.object({
  // Applicant Details
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  panNumber: z.string().min(10, "PAN number must be 10 characters").max(10).optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.enum(["Married", "Unmarried", "Others"]),
  gender: z.enum(["Male", "Female", "Others"]),
  mobileNo: z.string().min(10, "Mobile number must be at least 10 digits").max(15),
  emailId: z.string().email("Invalid email address"),

  // Current Address
  homeAddress1: z.string().min(1, "Address is required"),
  homeAddress2: z.string().optional(),
  residenceType: z.enum(["Owned", "Rented"]),
  pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  permanentAddressSame: z.boolean().default(false),

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
      homeAddress1: parsedData.data.homeAddress1,
      homeAddress2: parsedData.data.homeAddress2,
      residenceType: parsedData.data.residenceType,
      pincode: parsedData.data.pincode,
      state: parsedData.data.state,
      city: parsedData.data.city,
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