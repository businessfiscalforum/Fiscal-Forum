// app/admin/layout.tsx
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex py-20">
      {/* Sidebar */}
      <aside className="w-35 md:w-50 lg:wd-60 bg-white shadow-lg h-screen sticky top-0 py-6 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6 space-y-1 px-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            📊 Dashboard
          </Link>

          {/* --- User & Auth --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Users & Auth
          </div>
          <Link
            href="/admin/users"
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm"
          >
            👥 Users
          </Link>

          {/* --- Content Management --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Content
          </div>
          <Link href="/admin/news" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📰 News
            {/* Table: newsTable */}
          </Link>
          <Link href="/admin/materials" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📰 Materials
            {/* Table: materialsTable */}
          </Link>
          <Link href="/admin/newsletter" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📰 Newsletter
            {/* Table: newsletter */}
          </Link>
          <Link href="/admin/reports" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📈 Research Reports
            {/* Table: researchReportsTable (API: /api/reports) */}
          </Link>
          <Link href="/admin/subscribers" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📧 Subscribers
            {/* Table: subscribers */}
          </Link>
          
          {/* --- Partner Requests --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Requests
          </div>
          <Link href="/admin/partner-requests" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            Partner Requests
          </Link>
          <Link href="/admin/custom-report-requests" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            Custom Report Requests
          </Link>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Partner Type
          </div>
          <Link href="/admin/b2b-partner" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            B2B Partner
          </Link>
          <Link href="/admin/business-development-partner" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            Busienss Development Partner
          </Link>
          <Link href="/admin/remisorship" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            Remisier Partner
          </Link>
          


          {/* --- Financial Applications --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Financial Applications
          </div>
          <Link href="/admin/quotes" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            💬 Quote Requests
            {/* Table: quoteRequestsTable */}
          </Link>
          <Link href="/admin/demat" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📄 Demat Applications
            {/* Table: dematApplications */}
          </Link>
          <Link href="/admin/demat-transfer" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🔁 Demat Transfers
            {/* Table: dematTransferRequests */}
          </Link>
          <Link href="/admin/unlisted-shares" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📈 Unlisted Shares
            {/* Table: unlistedShares */}
          </Link>
          <Link href="/admin/mf-preferences" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📊 MF Preferences
            {/* Table: mfPreferences */}
          </Link>
          <Link href="/admin/mf-transfer" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            💸 MF Transfers
            {/* Table: mfTransferForms */}
          </Link>
          <Link href="/admin/document-submissions" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📎 Document Submissions
            {/* Table: documentLinks */}
          </Link>

          {/* --- Insurance Requests --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Insurance Requests
          </div>
          <Link href="/admin/insurance/car" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🚗 Car Insurance
            {/* Table: carInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/health" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🏥 Health Insurance
            {/* Table: healthInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/life" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🌳 Life Insurance
            {/* Table: lifeInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/two-wheeler" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🛵 Two Wheeler
            {/* Table: twoWheelerInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/commercial-vehicle" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🚚 Commercial Vehicle
            {/* Table: commercialVehicleInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/personal-accident" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🛡️ Personal Accident
            {/* Table: personalAccidentInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/property" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🏠 Property Insurance
            {/* Table: propertyInsuranceRequests */}
          </Link>
          <Link href="/admin/insurance/travel" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            ✈️ Travel Insurance
            {/* Table: travelInsuranceRequests */}
          </Link>

          {/* --- Loan Applications --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Loan Applications
          </div>
          <Link href="/admin/loans/home" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🏡 Home Loan
            {/* Table: homeLoanApplications */}
          </Link>
          <Link href="/admin/loans/lap" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            💼 Loan Against Property
            {/* Table: lapApplications */}
          </Link>
          <Link href="/admin/loans/personal" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            💰 Personal Loan
            {/* Table: personalLoanApplications */}
          </Link>
          <Link href="/admin/loans/business" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🏭 Business Loan
            {/* Table: businessLoanApplications */}
          </Link>
          <Link href="/admin/loans/gold" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🪙 Gold Loan
            {/* Table: goldLoanApplications */}
          </Link>
          <Link href="/admin/loans/car" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🚘 Car Loan
            {/* Table: carLoanApplications */}
          </Link>
          <Link href="/admin/loans/education" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            🎓 Education Loan
            {/* Table: educationLoanApplications */}
          </Link>
          <Link href="/admin/loans/las" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📋 LAS Application
            {/* Table: lasApplications */}
          </Link>

          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Savings Account
          </div>
          <Link href="/admin/savings-account" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            Savings Account
            {/* Table: carInsuranceRequests */}
          </Link>

          {/* --- Products --- */}
          {/* <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Products
          </div>
          <Link href="/admin/credit-cards" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            💳 Credit Cards
          </Link> */}

          {/* --- Document Management --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Document Management
          </div>
          <Link href="/admin/mis-report-submissions" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📊 MIS Report Submissions
            {/* Table: mis_report_submissions (inferred from knowledge base) */}
          </Link>

          {/* --- Transactions & Finance --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Transactions & Finance
          </div>
          <Link href="/admin/withdrawal-requests" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            💸 Withdrawal Requests
            {/* Table: withdrawalRequests (inferred from knowledge base) */}
          </Link>

          {/* --- Other --- */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4">
            Other
          </div>
          <Link href="/admin/scheduled-calls" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition text-sm">
            📞 Scheduled Calls
            {/* Table: scheduledCalls */}
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