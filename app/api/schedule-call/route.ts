import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../config/db';
import { scheduledCalls } from '../../../config/schema';


const scheduleCallSchema = z.object({
  name: z.string().min(1, "Name is required"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
  preferredContactMethod: z.enum(["call", "whatsapp", "email"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validatedData = scheduleCallSchema.parse(body);

    // Insert into database
    const result = await db.insert(scheduledCalls).values({
      name: validatedData.name,
      countryCode: validatedData.countryCode,
      phone: validatedData.phone,
      email: validatedData.email,
      date: validatedData.date,
      time: validatedData.time,
      message: validatedData.message,
      preferredContactMethod: validatedData.preferredContactMethod || "call",
    }).returning({ id: scheduledCalls.id });

    return NextResponse.json({ 
      success: true, 
      message: "Call scheduled successfully", 
      id: result[0].id 
    }, { status: 201 });

  } catch (error) {
    console.error("Error scheduling call:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: error
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: "Failed to schedule call" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get all scheduled calls (for admin purposes)
    const calls = await db.select().from(scheduledCalls);
    
    return NextResponse.json({ 
      success: true, 
      data: calls 
    });
  } catch (error) {
    console.error("Error fetching scheduled calls:", error);
    
    return NextResponse.json({ 
      error: "Failed to fetch scheduled calls" 
    }, { status: 500 });
  }
}