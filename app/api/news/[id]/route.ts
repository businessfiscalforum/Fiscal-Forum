// app/api/news/route.ts
import { revalidatePath } from "next/cache";
import { db } from "../../../../config/db";
import { newsTable } from "../../../../config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const [news] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, id));

    if (!news || !news.published) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // ✅ Sanitize dates for JSON serialization
    return NextResponse.json({
      ...news,
      publishDate: news.publishDate.toString(),
      createdAt: news.createdAt?.toISOString() || null,
      updatedAt: news.updatedAt?.toISOString() || null,
    });
  } catch (error) {
    console.error("GET /api/news/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news article" },
      { status: 500 }
    );
  }
}


// DELETE with query param: /api/news?id=123
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await db.delete(newsTable).where(eq(newsTable.id, id));

    revalidatePath("/news");
    revalidatePath(`/news/${id}`);
    revalidatePath("/admin/news");

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
