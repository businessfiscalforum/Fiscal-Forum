// app/api/transfer-demat/route.ts
import { NextRequest } from 'next/server';
import { db } from '../../../config/db';
import { dematTransferRequests } from '../../../config/schema';

// POST handler
export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    
    // Extract fields
    const fullName = (formData.get('fullName') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';
    const currentBroker = (formData.get('currentBroker') as string)?.trim() || 'Motilal Oswal';
    const newClientId = (formData.get('newClientId') as string)?.trim() || '';
    const driveLink = (formData.get('driveLink') as string)?.trim() || '';

    // Validation - NOW CHECKING driveLink INSTEAD OF cmrOrDis
    if (!fullName || !email || !phone || !newClientId || !driveLink) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'All required fields must be filled' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Phone must be a 10-digit number' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Google Drive link validation
    if (!driveLink.includes('drive.google.com') || !driveLink.includes('/file/d/')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Please provide a valid Google Drive file link' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Insert into DB
    const [result] = await db.insert(dematTransferRequests).values({
      fullName,
      email,
      phone,
      currentBroker,
      newClientId,
      publicFileUrl: driveLink, // Store the drive link
    }).returning();

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        message: 'Transfer request submitted successfully!' 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error submitting demat transfer request:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process request. Please try again.' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};