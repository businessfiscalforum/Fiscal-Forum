// app/admin/page.tsx
import { db } from "../../../../config/db";
import { usersTable } from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.emailAddresses?.[0]?.emailAddress) redirect("/sign-in");

  const email = clerkUser.emailAddresses[0].emailAddress;

  const [dbUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!dbUser || dbUser.role !== "ADMIN") redirect("/");

  const allUsers = await db.select().from(usersTable);

  const totalUsers = allUsers.length;
  const adminCount = allUsers.filter((u) => u.role === "ADMIN").length;
  const approvedCount = allUsers.filter((u) => u.status === "APPROVED").length;
  const pendingCount = allUsers.filter((u) => u.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-10">

      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage users and applications</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {dbUser.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-700 text-sm sm:text-base">{dbUser.name}</span>
            <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 text-xs sm:text-sm font-medium rounded-full">
              Admin
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 mt-6">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard label="Total Users" value={totalUsers} color="blue" />
          <StatCard label="Admins" value={adminCount} color="purple" />
          <StatCard label="Approved" value={approvedCount} color="green" />
          <StatCard label="Pending" value={pendingCount} color="yellow" />
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          <div className="px-4 sm:px-6 py-5 border-b bg-gray-50">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">All Users</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {totalUsers} user(s) registered
            </p>
          </div>

          {/* scrollable on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="pl-4 sm:pl-6 py-3 sm:py-4">Name</th>
                  <th className="py-3 sm:py-4">Email</th>
                  <th className="py-3 sm:py-4">Age</th>
                  <th className="py-3 sm:py-4">Role</th>
                  <th className="pr-4 sm:pr-6 py-3 sm:py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {totalUsers === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  allUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="pl-4 sm:pl-6 py-3 sm:py-4 font-medium text-gray-800">{user.name}</td>
                      <td className="py-3 sm:py-4 text-gray-600">{user.email}</td>
                      <td className="py-3 sm:py-4 text-gray-600">{user.age}</td>
                      <td className="py-3 sm:py-4"><RoleBadge role={user.role} /></td>
                      <td className="pr-4 sm:pr-6 py-3 sm:py-4"><StatusBadge status={user.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ----- Components ----- */

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 ${colorClasses[color]} rounded-lg flex items-center justify-center text-white font-bold`}
        >
          {value}
        </div>
        <div className="ml-4">
          <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-800 border-purple-200",
    USER: "bg-gray-100 text-gray-800 border-gray-200",
    AGENT: "bg-blue-100 text-blue-800 border-blue-200",
    PARTNER: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <span
      className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full border ${colors[role] || "bg-gray-100"}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    REJECTED: "bg-red-100 text-red-800 border-red-200",
    BANNED: "bg-red-200 text-red-900 border-red-300",
  };

  return (
    <span
      className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full border ${colors[status] || "bg-gray-100"}`}
    >
      {status}
    </span>
  );
}
