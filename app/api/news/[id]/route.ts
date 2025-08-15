import { NextResponse } from 'next/server';
import { db } from '../../../../config/db';
import { newsTable } from '../../../../config/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// ✅ Correct typing for dynamic route context
type Context = {
  params: Promise<{ id: string }>;
};

// ✅ GET: Fetch single news item
export async function GET(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    const [newsItem] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!newsItem) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
    return NextResponse.json({ error: 'Failed to fetch news item' }, { status: 500 });
  }
}

// ✅ PUT: Update news item
export async function PUT(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params; // ✅ Unwrap the promise
    const body = await request.json();

    const [existingItem] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
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

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news item' }, { status: 500 });
  }
}

// ✅ DELETE: Delete news item
export async function DELETE(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params; // ✅ Unwrap the promise

    const [existingItem] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json({ error: 'News item not found' }, { status: 404 });
    }

    await db.delete(newsTable).where(eq(newsTable.id, id));

    revalidatePath('/news');
    revalidatePath(`/news/${id}`);
    revalidatePath('/admin/news');

    return NextResponse.json({ message: 'News item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news item' }, { status: 500 });
  }
}