import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { mfTransferForms } from "../../../config/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.clientCode || !body.panNo || 
        !body.mobileNo || !body.traderType || !body.existingBroker) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(body.panNo.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid PAN number format' },
        { status: 400 }
      );
    }
    
    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(body.mobileNo)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }
    
    // Validate traderType array
    if (!Array.isArray(body.traderType) || body.traderType.length === 0) {
      return NextResponse.json(
        { error: 'At least one trader type must be selected' },
        { status: 400 }
      );
    }
    
    // Insert into database
    const result = await db.insert(mfTransferForms).values({
      fullName: body.fullName,
      clientCode: body.clientCode,
      panNo: body.panNo.toUpperCase(),
      mobileNo: body.mobileNo,
      traderType: body.traderType.join(','), // Store as comma-separated string
      existingBroker: body.existingBroker,
    }).returning({ id: mfTransferForms.id });
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      id: result[0].id
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}