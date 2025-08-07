// app/(routes)/admin/news/page.tsx
import { db } from "../../../../config/db";
import { researchReportsTable } from "../../../../config/schema";

import Link from "next/link";

export default async function NewsListPage() {

  const reports = await db
    .select()
    .from(researchReportsTable)
    .orderBy(researchReportsTable.date);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 py-20">
        <h1 className="text-2xl font-bold text-gray-800">Research</h1>
        <Link
          href="/admin/reports/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Research
        </Link>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports articles found.</p>
        ) : (
          reports.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg bg-white shadow flex justify-between items-start py-12">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>📅 {item.date}</span>
                  <span>👤 {item.author}</span>
                  <span>🔖 {item.stock}</span>
                  <span>👁️ {item.views}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Link
                  href={`/admin/reports/${item.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}