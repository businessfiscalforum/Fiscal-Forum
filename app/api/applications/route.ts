// app/api/applications/route.ts
import { db } from "../../../config/db";
import { applicationsTable, usersTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.emailAddresses.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;
  const body = await req.json();

  try {
    // Find logged-in user in DB
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Map every field exactly to DB columns
    const dataToInsert = {
      userId: user.id,

      // Main category
      type: body.type || "loan",
      loanType: body.loanType || null,

      // Applicant personal info
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      dateOfBirth: body.dateOfBirth ?? new Date(body.dateOfBirth).toISOString(),
      panNumber: body.panNumber || "",
      maritalStatus: body.maritalStatus || null,
      gender: body.gender || null,

      // Current address
      currentAddressLine1: body.currentAddressLine1 || "",
      currentAddressLine2: body.currentAddressLine2 || null,
      currentPincode: body.currentPincode || "",
      currentCity: body.currentCity || "",
      currentState: body.currentState || "",
      residenceType: body.residenceType || null,

      // Permanent address
      isPermanentAddressSameAsCurrent: body.isPermanentAddressSameAsCurrent ?? true,
      permanentAddressLine1: body.permanentAddressLine1 || null,
      permanentAddressLine2: body.permanentAddressLine2 || null,
      permanentPincode: body.permanentPincode || null,
      permanentCity: body.permanentCity || null,
      permanentState: body.permanentState || null,

      // Employment
      employmentType: body.employmentType || null,
      companyName: body.companyName || null,
      businessName: body.businessName || null,
      designation: body.designation || null,
      natureOfBusiness: body.natureOfBusiness || null,
      annualIncome: body.annualIncome || null,
      monthlyIncome: body.monthlyIncome || null,
      workExperience: body.workExperience || null,

      // Co-applicant
      hasCoApplicant: body.hasCoApplicant ?? false,
      coApplicantFirstName: body.coApplicantFirstName || null,
      coApplicantLastName: body.coApplicantLastName || null,
      coApplicantEmail: body.coApplicantEmail || null,
      coApplicantPhone: body.coApplicantPhone || null,
      coApplicantPan: body.coApplicantPan || null,
      coApplicantDateOfBirth: body.coApplicantDateOfBirth
        ? new Date(body.coApplicantDateOfBirth).toISOString()
        : null,
      coApplicantGender: body.coApplicantGender || null,
      coApplicantRelationship: body.coApplicantRelationship || null,
      coApplicantEmploymentType: body.coApplicantEmploymentType || null,
      coApplicantCompany: body.coApplicantCompany || null,
      coApplicantBusiness: body.coApplicantBusiness || null,
      coApplicantAnnualIncome: body.coApplicantAnnualIncome || null,
      coApplicantMonthlyIncome: body.coApplicantMonthlyIncome || null,

      // Property details
      propertyType: body.propertyType || null,
      propertyUsage: body.propertyUsage || null,
      propertyAge: body.propertyAge || null,
      propertyValue: body.propertyValue || null,
      propertyAddress: body.propertyAddress || null,
      propertyCity: body.propertyCity || null,
      propertyPincode: body.propertyPincode || null,
      propertyState: body.propertyState || null,
      transactionType: body.transactionType || null,
      agreementValue: body.agreementValue || null,
      downPayment: body.downPayment || null,

      // Car loan
      carType: body.carType || null,
      carMake: body.carMake || null,
      carModel: body.carModel || null,
      carVariant: body.carVariant || null,
      manufacturingYear: body.manufacturingYear || null,
      carPrice: body.carPrice || null,
      dealerName: body.dealerName || null,
      dealerLocation: body.dealerLocation || null,

      // Education loan
      educationLevel: body.educationLevel || null,
      courseType: body.courseType || null,
      courseName: body.courseName || null,
      courseDuration: body.courseDuration || null,
      institutionName: body.institutionName || null,
      institutionLocation: body.institutionLocation || null,
      institutionCountry: body.institutionCountry || null,
      totalCourseFee: body.totalCourseFee || null,
      previousEducation: body.previousEducation || null,
      previousMarks: body.previousMarks || null,

      // Gold loan
      goldWeight: body.goldWeight || null,
      goldPurity: body.goldPurity || null,
      goldType: body.goldType || null,
      estimatedValue: body.estimatedValue || null,
      goldItemsDescription: body.goldItemsDescription || null,
      preferredBranch: body.preferredBranch || null,
      appointmentDate: body.appointmentDate
        ? new Date(body.appointmentDate).toISOString()
        : null,

      // Securities loan
      securitiesType: body.securitiesType || null,
      securitiesValue: body.securitiesValue || null,
      portfolioDetails: body.portfolioDetails || null,
      dematAccountNumber: body.dematAccountNumber || null,
      brokerName: body.brokerName || null,
      pledgeableSecurities: body.pledgeableSecurities || null,
      averageHoldingPeriod: body.averageHoldingPeriod || null,

      // Business loan
      gstNumber: body.gstNumber || null,
      businessVintage: body.businessVintage || null,
      businessAddress: body.businessAddress || null,
      businessCity: body.businessCity || null,
      businessPincode: body.businessPincode || null,
      businessState: body.businessState || null,
      repaymentSource: body.repaymentSource || null,
      useOfFundsEquipment: body.useOfFundsEquipment || null,
      useOfFundsWorkingCapital: body.useOfFundsWorkingCapital || null,
      useOfFundsExpansion: body.useOfFundsExpansion || null,
      useOfFundsMarketing: body.useOfFundsMarketing || null,
      useOfFundsOther: body.useOfFundsOther || null,

      // Loan request
      loanAmount: body.loanAmount || null,
      loanTenure: body.loanTenure || null,
      loanPurpose: body.loanPurpose || null,

      // Credit & financial
      creditScore: body.creditScore || null,
      existingEMIs: body.existingEMIs || "0",

      // Banking
      salaryAccount: body.salaryAccount || null,
      bankName: body.bankName || null,
      accountNumber: body.accountNumber || null,

      // References
      reference1Name: body.reference1Name || null,
      reference1Phone: body.reference1Phone || null,
      reference1Relation: body.reference1Relation || null,
      reference2Name: body.reference2Name || null,
      reference2Phone: body.reference2Phone || null,
      reference2Relation: body.reference2Relation || null,

      // Status
      applicationStatus: body.applicationStatus || "INITIATED",
      paymentMethod: body.paymentMethod || null,
    };

    const [application] = await db
      .insert(applicationsTable)
      .values(dataToInsert)
      .returning();

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error("Application insert error:", err);
    return NextResponse.json(
      { error: "Failed to save application", details: String(err) },
      { status: 500 }
    );
  }
}


export async function GET() {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.emailAddresses.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = clerkUser.emailAddresses[0].emailAddress;

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const applications = await db
      .select()
      .from(applicationsTable)
      .where(eq(applicationsTable.userId, user.id))
      .orderBy(applicationsTable.createdAt);

    return NextResponse.json(applications, { status: 200 });
  } catch (err) {
    console.error("Application fetch error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
