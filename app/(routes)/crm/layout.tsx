// app/admin/layout.tsx
import Link from "next/link";

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex py-20">
      {/* Sidebar */}
      <aside className="w-40 md:w-56 lg:w-64 bg-white shadow-lg h-screen sticky top-0 py-6 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6 space-y-1 px-4">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Refferals
          </div>
          <Link href="/crm/refferal-links" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">Refferal Links</Link>
          <Link href="/crm/create-leads" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">Create Leads</Link>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Others
          </div>
          <Link
            href="/crm/mis-reports"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📊 MIS Reports
          </Link>
          <Link
            href="/crm/refer-earn"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            💸 Refer and Earn
          </Link>
          <Link
            href="/crm/materials"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📁 Materials
          </Link>
          <Link
            href="/crm/contact-us"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📞 Contact Us
          </Link>
          <Link
            href="/crm/withdraw-commission"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            💰 Withdraw Commission
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
