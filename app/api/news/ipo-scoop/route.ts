import { NextResponse } from 'next/server';
import { db } from '../../../../config/db'; // Adjust path as needed
import { newsTable } from '../../../../config/schema'; // Adjust path as needed

import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const newsItems = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.category, 'IPO Scoop'))
      .orderBy(desc(newsTable.publishDate));
    
    revalidatePath("/news");
    revalidatePath("/admin/news");

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error fetching IPO Scoop:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IPO Scoop items' },
      { status: 500 }
    );
  }
}