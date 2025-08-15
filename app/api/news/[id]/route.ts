import { NextResponse } from 'next/server';
import { db } from '../../../../config/db';
import { newsTable } from '../../../../config/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [newsItem] = await db
.select()
      .from(newsTable)
      .where(eq(newsTable.id, params.id)) 
      .limit(1);

    if (!newsItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news item' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const id = params.id;

    // Check if item exists
    const [existingItem] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      );
    }

    const [updatedItem] = await db
      .update(newsTable)
      .set({
        ...data,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        publishDate: data.publishDate ? new Date(data.publishDate) : existingItem.publishDate,
      })
      .where(eq(newsTable.id, id))
      .returning();

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; 
    
    // Check if item exists
    const [existingItem] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id))
      .limit(1);

    if (!existingItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      );
    }

    await db.delete(newsTable).where(eq(newsTable.id, id));
    revalidatePath("/news");
    revalidatePath(`/news/${id}`);
    revalidatePath("/admin/news");

    return NextResponse.json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news item' },
      { status: 500 }
    );
  }
}