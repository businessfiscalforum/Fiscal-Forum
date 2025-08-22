import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../config/db';
import { unlistedShares } from '../../../config/schema';

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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const fullName = formData.get('fullName') as string;
    const clientCode = formData.get('clientCode') as string;
    const panNo = (formData.get('panNo') as string).toUpperCase();
    const mobileNo = formData.get('mobileNo') as string;
    const consistency = formData.get('consistency') as string;
    const traderType = formData.getAll('traderType') as string[]; // Array from checkboxes
    const existingBroker = formData.get('existingBroker') as string;
    
    // Validate required fields
    if (!fullName || !clientCode || !panNo || !mobileNo || !consistency || 
        traderType.length === 0 || !existingBroker) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNo)) {
      return NextResponse.json(
        { error: 'Invalid PAN number format' },
        { status: 400 }
      );
    }
    
    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNo)) {
      return NextResponse.json(
        { error: 'Invalid mobile number format' },
        { status: 400 }
      );
    }
    
    // Insert into database
    const result = await db.insert(unlistedShares).values({
      fullName,
      clientCode,
      panNo,
      mobileNo,
      consistency,
      traderType: traderType.join(','), // Store as comma-separated string
      existingBroker,
    }).returning({ id: unlistedShares.id });
    
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
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