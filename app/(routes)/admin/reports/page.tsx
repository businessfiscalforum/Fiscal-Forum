// // app/(routes)/admin/reports/page.tsx
// import Link from "next/link";
// import { db } from "../../../../config/db";
// import { researchReportsTable } from "../../../../config/schema";
// import { ReportCard, ResearchReport } from "../../components/ReportCard";

// export default async function ReportsListPage() {
//   const reports = await db
//     .select()
//     .from(researchReportsTable)
//     .orderBy(researchReportsTable.date);

//   // ✅ Convert Date to string
//   const formattedReports = reports.map((report) => ({
//     ...report,
//     date: report.date.toString().split("T")[0],
//   })) as ResearchReport[]; 

//   return (
//     <div className="max-w-full mx-auto py-20">
//       <h1 className="text-2xl font-bold mb-6">Research Reports</h1>
//       <Link
//         href="/admin/reports/create"
//         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         + Add Report
//       </Link>

//       <div className="mt-8 overflow-x-auto">
//         <table className="w-full text-left border border-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3">Report Details</th>
//               <th className="px-4 py-3">Company / Sector</th>
//               <th className="px-4 py-3">Author</th>
//               <th className="px-4 py-3">Date</th>
//               <th className="px-4 py-3">Rating & Target</th>
//               <th className="px-4 py-3">Performance</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>

//           </thead>
//           <tbody>
//             {formattedReports.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
//                   No research reports found.
//                 </td>
//               </tr>
//             ) : (
//               formattedReports.map((report) => (
//                 <ReportCard key={report.id} report={report} />
//               ))
//             )}
//           </tbody>
//         </table>
        
//       </div>
//     </div>
//   );
// }

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
        <h1 className="text-2xl font-bold text-gray-800">News Articles</h1>
        <Link
          href="/admin/news/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add News
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