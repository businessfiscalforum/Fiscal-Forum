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
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("placeholder")) {
      return NextResponse.json([], { headers: corsHeaders(origin) });
    }
    const reportItems = await db
      .select()
      .from(researchReportsTable)
      .where(eq(researchReportsTable.reportType, 'Pre-Market Research Report'))
      .orderBy(desc(researchReportsTable.createdAt));
    
    revalidatePath("/reports");
    revalidatePath("/admin/reports");

    const sanitized = reportItems.map((item) => {
      const safe = item;
      return {
        ...safe,
        pdfUrl: `/api/reports/${item.id}/pdf`,
      };
    });

    return NextResponse.json(sanitized, {
      headers: corsHeaders(origin),
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message.replace(/postgresql:\/\/[^@\s]+@/g, "postgresql://[redacted]@") : String(error);
    console.warn("GET /api/reports/pre-market-report query failed. Error:", errMsg);
    return NextResponse.json([], {
      headers: corsHeaders(origin),
    });
  }
}
