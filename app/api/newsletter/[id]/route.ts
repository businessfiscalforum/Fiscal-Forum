import { NextResponse } from 'next/server';
import { db } from '../../../../config/db';
import { newsletter } from '../../../../config/schema';
import { eq } from 'drizzle-orm';
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

    const [newsletterItem] = await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.id, id))
      .limit(1);

    if (!newsletterItem) {
      return NextResponse.json(
        { error: 'Newsletter item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json(newsletterItem, { headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Error fetching newsletter item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter item' },
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
      .from(newsletter)
      .where(eq(newsletter.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Newsletter item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    const [updatedItem] = await db
      .update(newsletter)
      .set({
        ...body,
        publishDate: body.publishDate ? new Date(body.publishDate) : existingItem.publishDate,
      })
      .where(eq(newsletter.id, id))
      .returning();

    revalidatePath('/newsletter');
    revalidatePath(`/newsletter/${id}`);
    revalidatePath('/admin/newsletter');

    return NextResponse.json(updatedItem, { headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Error updating newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to update newsletter item' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}

// ✅ DELETE: Delete newsletter item
export async function DELETE(request: Request, { params }: Context) {
  const origin = request.headers.get("origin");
  try {
    const { id } = await params;

    const [existingItem] = await db
      .select()
      .from(newsletter)
      .where(eq(newsletter.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Newsletter item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    await db.delete(newsletter).where(eq(newsletter.id, id));

    revalidatePath('/newsletter');
    revalidatePath(`/newsletter/${id}`);
    revalidatePath('/admin/newsletter');

    return NextResponse.json(
      { message: 'Newsletter item deleted successfully' },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to delete newsletter item' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
