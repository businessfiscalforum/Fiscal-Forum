import { NextRequest } from 'next/server';
import { db } from '../../../config/db';
import { investmentProfiles } from '../../../config/schema';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = (formData.get('name') as string)?.trim() || '';
    const clientCode = (formData.get('clientCode') as string)?.trim() || '';
    const panNo = (formData.get('panNo') as string)?.trim().toUpperCase() || '';
    const mobileNo = (formData.get('mobileNo') as string)?.trim() || '';
    const consistency = (formData.get('consistency') as string)?.trim() || '';
    const traderType = (formData.get('traderType') as string)?.trim() || '';
    const existingBroker = (formData.get('existingBroker') as string)?.trim() || '';

    // Validation
    if (!name || !clientCode || !panNo || !mobileNo || !consistency || !traderType || !existingBroker) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'All fields are required' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // PAN validation
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNo)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid PAN format' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobileNo)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Mobile number must be 10 digits' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Determine investment type from URL
    const referer = req.headers.get('referer') || '';
    let investmentType = 'equity';
    
    if (referer.includes('/futures-options')) investmentType = 'futures-options';
    else if (referer.includes('/ipo')) investmentType = 'ipo';
    else if (referer.includes('/mtf')) investmentType = 'mtf';
    else if (referer.includes('/commodities')) investmentType = 'commodities';
    else if (referer.includes('/unlisted-shares')) investmentType = 'unlisted-shares';

    // Insert into DB
    const [result] = await db.insert(investmentProfiles).values({
      name,
      clientCode,
      panNo,
      mobileNo,
      consistency,
      traderType,
      existingBroker,
      investmentType,
    }).returning();

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        message: 'Investment profile submitted successfully!' 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error submitting investment profile:', error);
    
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

export const config = {
  api: {
    bodyParser: false,
  },
};