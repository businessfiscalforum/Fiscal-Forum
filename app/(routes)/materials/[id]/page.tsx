// app/(routes)/materials/[id]/page.tsx
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from 'date-fns';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { db } from "../../../../config/db";
import { materials } from "../../../../config/schema";

export default async function MaterialDetailPage(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const materialItems = await db
    .select()
    .from(materials)
    .where(eq(materials.id, id));

  if (!materialItems || materialItems.length === 0) {
    return notFound();
  }

  const material = materialItems[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/admin/materials"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2 text-sm" />
            <span className="text-sm">Back</span>
          </Link>
        </div>

        <article className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100">

          {/* Header Section */}
          <header className="p-6 sm:p-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {material.title}
            </h1>
          </header>

          {/* Image Section */}
          {material.link && (
            <div className="relative w-full h-96">
              <iframe
                src={material.link}
                className="w-full h-full rounded-lg border"
                allowFullScreen
              ></iframe>
            </div>
          )}

        </article>
      </div>
    </div>
  );
}
