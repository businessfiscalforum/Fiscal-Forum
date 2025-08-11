import { NextResponse } from 'next/server';
import { db } from '../../../config/db';
import { subscribers } from '../../../config/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);

    if (existingSubscriber.length > 0) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 200 }
      );
    }

    // Add new subscriber
    await db.insert(subscribers).values({
      email: email,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Thank you for subscribing!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please sign-in to subscribe.' },
      { status: 500 }
    );
  }
}