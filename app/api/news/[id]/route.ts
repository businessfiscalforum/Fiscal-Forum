import { NextResponse } from 'next/server';
import { db } from '../../../../config/db';
import { newsTable } from '../../../../config/schema';
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

    const [newsItem] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!newsItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    return NextResponse.json(newsItem, { headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Error fetching news item:', error);
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
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    const [updatedItem] = await db
      .update(newsTable)
      .set({
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        publishDate: body.publishDate ? new Date(body.publishDate) : existingItem.publishDate,
      })
      .where(eq(newsTable.id, id))
      .returning();

    revalidatePath('/news');
    revalidatePath(`/news/${id}`);
    revalidatePath('/admin/news');

    return NextResponse.json(updatedItem, { headers: corsHeaders(origin) });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news item' },
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
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404, headers: corsHeaders(origin) }
      );
    }

    await db.delete(newsTable).where(eq(newsTable.id, id));

    revalidatePath('/news');
    revalidatePath(`/news/${id}`);
    revalidatePath('/admin/news');

    return NextResponse.json(
      { message: 'News item deleted successfully' },
      { status: 200, headers: corsHeaders(origin) }
    );
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news item' },
      { status: 500, headers: corsHeaders(origin) }
    );
  }
}
