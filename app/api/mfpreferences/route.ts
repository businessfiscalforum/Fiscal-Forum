import { NextResponse } from 'next/server';
import { db } from '../../../config/db';
import { mfPreferences } from '../../../config/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.clientId || 
        !body.fundType || !body.company) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }
    
    // Validate fundType is not empty
    if (body.fundType.split(',').filter(Boolean).length === 0) {
      return NextResponse.json(
        { error: 'Select at least one fund type' },
        { status: 400 }
      );
    }
    
    // Insert into database
    const result = await db.insert(mfPreferences).values({
      name: body.name,
      clientId: body.clientId,
      fundType: body.fundType, // Already comma-separated
      company: body.company,
    }).returning({ id: mfPreferences.id });
    
    return NextResponse.json({
      success: true,
      message: 'Preferences submitted successfully!',
      id: result[0].id
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to submit preferences. Please try again.' },
      { status: 500 }
    );
  }
}