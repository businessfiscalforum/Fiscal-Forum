// app/admin/page.tsx

export default async function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-green-800">Welcome, Admin 👋</h1>
          <p className="text-gray-600 mt-2">Here is your admin dashboard overview.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <p className="text-3xl font-bold mt-2 text-green-700">2</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">Pending Approvals</h2>
            <p className="text-3xl font-bold mt-2 text-yellow-600">3</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold text-gray-700">News Published</h2>
            <p className="text-3xl font-bold mt-2 text-blue-600">10</p>
          </div>
        </section>
      </div>
    </div>
  );
}
