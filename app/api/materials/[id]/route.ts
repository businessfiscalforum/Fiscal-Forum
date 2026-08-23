import { NextResponse } from 'next/server';
import { db } from '../../../../config/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { materials } from '../../../../config/schema';

const allowedOrigins = [
  "https://www.fiscalforum.in",
  "https://fiscalforum.in",
  "http://localhost:3000"
];

function corsHeaders(origin: string | null): HeadersInit {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }
  return {};
}

// ✅ OPTIONS handler (needed for preflight)
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}

type Context = {
  params: Promise<{ id: string }>;
};

// ✅ GET: Fetch single news item
export async function GET(request: Request, { params }: Context) {
  const origin = request.headers.get("origin");
  try {
    const { id } = await params;

    const [newsItem] = await db
      .select()
      .from(materials)
      .where(eq(materials.id, id))
      .limit(1);

    if (!newsItem) {
      return NextResponse.json(
        { error: 'Material item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json(newsItem, { headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Error fetching material item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news item' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

// ✅ PUT: Update news item
export async function PUT(request: Request, { params }: Context) {
  const origin = request.headers.get("origin");
  try {
    const { id } = await params;
    const body = await request.json();

    const [existingItem] = await db
      .select()
      .from(materials)
      .where(eq(materials.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Material item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    const [updatedItem] = await db
      .update(materials)
      .set({
        ...body,
      })
      .where(eq(materials.id, id))
      .returning();

    revalidatePath('/materials');
    revalidatePath(`/materials/${id}`);
    revalidatePath('/admin/materials');

    return NextResponse.json(updatedItem, { headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Error updating material:', error);
    return NextResponse.json(
      { error: 'Failed to update material item' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

// ✅ DELETE: Delete news item
export async function DELETE(request: Request, { params }: Context) {
  const origin = request.headers.get("origin");
  try {
    const { id } = await params;

    const [existingItem] = await db
      .select()
      .from(materials)
      .where(eq(materials.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Material item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    await db.delete(materials).where(eq(materials.id, id));

    revalidatePath('/materials');
    revalidatePath(`/materials/${id}`);
    revalidatePath('/admin/materials');

    return NextResponse.json(
      { message: 'Material item deleted successfully' },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error('Error deleting material:', error);
    return NextResponse.json(
      { error: 'Failed to delete material item' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
