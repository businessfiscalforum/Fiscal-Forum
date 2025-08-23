// app/admin/users/page.tsx
import { db } from "../../../../config/db";
import { usersTable } from "../../../../config/schema";
import {  count, ilike, sql } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";

// Type for search params (passed from URL)
interface SearchParams {
  page?: string;
  search?: string;
}

// Define types for user data
type User = typeof usersTable.$inferSelect;

// Fetch users with pagination and search
async function fetchUsers({ page = '1', search = '' }: SearchParams) {
  const currentPage = Math.max(1, parseInt(page, 10));
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  // Build the where clause for search
const whereClause = search
  ? ilike(usersTable.name, `%${search}%`)
  : undefined;

  // Fetch users for the current page
  const users = await db
    .select()
    .from(usersTable)
    .where(whereClause)
    .limit(limit)
    .offset(offset);

  // Fetch total count (for pagination) - needs to account for search
  const countResult = await db
    .select({ count: count() })
    .from(usersTable)
    .where(whereClause);

  const totalUsers = countResult[0]?.count ?? 0;
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    pagination: {
      currentPage,
      totalPages,
      totalUsers,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}

// Loading Skeleton Component
function UsersTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 grid grid-cols-6 gap-4">
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-2"></div>
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-gray-200 grid grid-cols-6 gap-4">
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
            <div className="h-4 bg-gray-200 rounded col-span-2"></div>
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Users Page Component (Server Component)
export default async function UsersPage({ searchParams }: { searchParams: SearchParams }) {
  // Await searchParams if it's a Promise (Next.js 14+ App Router behavior)
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">A list of all registered users.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <form method="GET" className="flex-1 max-w-md">
            <label htmlFor="search" className="sr-only">Search users</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                defaultValue={resolvedSearchParams.search || ''}
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by name..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="submit"
                  className="px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Go
                </button>
              </div>
            </div>
          </form>
          {/* Add User Button (if needed) */}
          {/* <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Add User
          </button> */}
        </div>
      </div>

      {/* Suspense boundary for loading state */}
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTableContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}

// Client-side rendered table content (within Suspense)
async function UsersTableContent({ searchParams }: { searchParams: SearchParams }) {
  const { users, pagination } = await fetchUsers(searchParams);

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        user.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchParams.search ? `No users found matching "${searchParams.search}".` : 'No users found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 py-3">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(pagination.currentPage - 1) * 10 + 1}</span> to{' '}
              <span className="font-medium">{Math.min(pagination.currentPage * 10, pagination.totalUsers)}</span> of{' '}
              <span className="font-medium">{pagination.totalUsers}</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            {pagination.hasPrevPage && (
              <Link
                href={{ pathname: '/admin/users', query: { ...searchParams, page: pagination.currentPage - 1 } }}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {pagination.hasNextPage && (
              <Link
                href={{ pathname: '/admin/users', query: { ...searchParams, page: pagination.currentPage + 1 } }}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}