// app/admin/layout.tsx
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex py-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 py-6 overflow-y-auto"> {/* Added overflow-y-auto for long lists */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6 space-y-1 px-4"> {/* Reduced space-y */}
          <a
            href="/admin"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            📊 Dashboard
          </a>

          {/* --- User & Auth --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Users & Auth
          </div>
          <a
            href="/admin/users"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm" // Smaller padding & font
          >
            👥 Users
          </a>

          {/* --- Content Management --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Content
          </div>
          <a
            href="/admin/news"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📰 News
          </a>
          <a
            href="/admin/reports"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📈 Research Reports
          </a>
          <a
            href="/admin/subscribers"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📧 Subscribers
          </a>

          {/* --- Financial Applications --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Financial Applications
          </div>
          <a
            href="/admin/quotes"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            💬 Quote Requests
          </a>
          <a
            href="/admin/demat"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📄 Demat Applications
          </a>
          <a
            href="/admin/demat-transfer"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🔁 Demat Transfers
          </a>
          <a
            href="/admin/investment-forms"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📈 Unlisted Shares
          </a>
          <a
            href="/admin/mf-preferences"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📊 MF Preferences
          </a>
          <a
            href="/admin/mf-transfer"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            💸 MF Transfers
          </a>
          <a
            href="/admin/document-submissions"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📎 Document Submissions
          </a>

          {/* --- Insurance Requests --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Insurance Requests
          </div>
          <a
            href="/admin/insurance/car"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🚗 Car Insurance
          </a>
          <a
            href="/admin/insurance/health"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🏥 Health Insurance
          </a>
          <a
            href="/admin/insurance/life"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🌳 Life Insurance
          </a>
          <a
            href="/admin/insurance/two-wheeler"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🛵 Two Wheeler
          </a>
          <a
            href="/admin/insurance/commercial-vehicle"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🚚 Commercial Vehicle
          </a>
          <a
            href="/admin/insurance/personal-accident"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🛡️ Personal Accident
          </a>
          <a
            href="/admin/insurance/property"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🏠 Property Insurance
          </a>
          <a
            href="/admin/insurance/travel"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            ✈️ Travel Insurance
          </a>

          {/* --- Loan Applications --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Loan Applications
          </div>
          <a
            href="/admin/loans/home"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🏡 Home Loan
          </a>
          <a
            href="/admin/loans/lap"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            💼 Loan Against Property
          </a>
          <a
            href="/admin/loans/personal"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            💰 Personal Loan
          </a>
          <a
            href="/admin/loans/business"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🏭 Business Loan
          </a>
          <a
            href="/admin/loans/gold"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🪙 Gold Loan
          </a>
          <a
            href="/admin/loans/car"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🚘 Car Loan
          </a>
          <a
            href="/admin/loans/education"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            🎓 Education Loan
          </a>
          <a
            href="/admin/loans/las"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📋 LAS Application
          </a>

          {/* --- Other --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Other
          </div>
          <a
            href="/admin/scheduled-calls"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            📞 Scheduled Calls
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-8 overflow-auto"> {/* Adjusted padding */}
        {children}
      </main>
    </div>
  );
}