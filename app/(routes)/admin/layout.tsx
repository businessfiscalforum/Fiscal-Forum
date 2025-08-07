export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex py-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 py-20">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6 space-y-2 px-4">
          <a
            href="/admin"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            📊 Dashboard
          </a>
          <a
            href="/admin/quotes"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            💬 Quote Requests
          </a>
          <a
            href="/admin/news"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            📰 News
          </a>
          <a
            href="/admin/reports"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
          >
            📈 Research Reports
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}