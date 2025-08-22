import { NextResponse } from 'next/server';
import { db } from '../../../../config/db'; // Adjust path as needed
import { researchReportsTable } from '../../../../config/schema'; // Adjust path as needed
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

// ✅ OPTIONS handler for preflight requests
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  try {
    const reportItems = await db
      .select()
      .from(researchReportsTable)
      .where(eq(researchReportsTable.reportType, 'Thematic Research Report'))
      .orderBy(desc(researchReportsTable.createdAt));
    
    revalidatePath("/reports");
    revalidatePath("/admin/reports");

    return NextResponse.json(reportItems, {
      headers: corsHeaders(origin),
    });
  } catch (error) {
    console.error('Error fetching Thematic Research Report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Thematic Research Report' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
