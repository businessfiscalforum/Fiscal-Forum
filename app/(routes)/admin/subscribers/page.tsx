// app/admin/subscribers/page.tsx
import { db } from "../../../../config/db";
import { subscribers } from "../../../../config/schema";
import { desc, like, count } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaSearch } from 'react-icons/fa';

// Type for search params
interface SearchParams {
  page?: string;
  search?: string;
}

// Define type for subscriber data
type Subscriber = typeof subscribers.$inferSelect;

// Fetch subscribers with pagination and search
async function fetchSubscribers({ page = '1', search = '' }: SearchParams) {
  const currentPage = Math.max(1, parseInt(page, 10));
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const whereClause = search
    ? like(subscribers.email, `%${search}%`)
    : undefined;

  const subscriberList = await db
    .select()
    .from(subscribers)
    .where(whereClause)
    .orderBy(desc(subscribers.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: count() })
    .from(subscribers)
    .where(whereClause);

  const totalSubscribers = countResult[0]?.count ?? 0;
  const totalPages = Math.ceil(totalSubscribers / limit);

  return {
    subscribers: subscriberList,
    pagination: {
      currentPage,
      totalPages,
      totalSubscribers,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}

// Loading Skeleton Component
function SubscribersTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 grid grid-cols-4 gap-4">
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          <div className="h-4 bg-gray-200 rounded col-span-2"></div>
          <div className="h-4 bg-gray-200 rounded col-span-1"></div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-gray-200 grid grid-cols-4 gap-4">
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
            <div className="h-4 bg-gray-200 rounded col-span-2"></div>
            <div className="h-4 bg-gray-200 rounded col-span-1"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Subscribers Page Component (Server Component)
export default async function SubscribersPage({ searchParams }: { searchParams: SearchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <FaUser className="text-emerald-700" />
            Newsletter Subscribers
          </h1>
          <p className="mt-1 text-sm text-gray-600">Manage users subscribed to your newsletter.</p>
        </div>
        <div className="flex items-center gap-3">
          <form method="GET" className="flex-1 max-w-md">
            <label htmlFor="search" className="sr-only">Search subscribers</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                defaultValue={resolvedSearchParams.search || ''}
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by email..."
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
        </div>
      </div>

      <Suspense fallback={<SubscribersTableSkeleton />}>
        <SubscribersTableContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}

// Client-side rendered table content (within Suspense)
async function SubscribersTableContent({ searchParams }: { searchParams: SearchParams }) {
  const { subscribers: subscriberList, pagination } = await fetchSubscribers(searchParams);

  return (
    <>
      <div className="bg-white shadow rounded-2xl overflow-hidden border border-emerald-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider">Subscribed on</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriberList.length > 0 ? (
                subscriberList.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-emerald-50/50 transition-colors duration-150">
                    {/* ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                      {subscriber.id}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400 flex-shrink-0" />
                        {subscriber.email}
                      </div>
                    </td>

                    {/* Subscribed On */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-emerald-600 flex-shrink-0" />
                        {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500 bg-gray-50">
                    <FaUser className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No subscribers found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchParams.search
                        ? `No subscribers match the search term "${searchParams.search}".`
                        : "Looks like nobody has subscribed to your newsletter yet."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination.totalPages > 1 && (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 py-3">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(pagination.currentPage - 1) * 10 + 1}</span> to{' '}
              <span className="font-medium">{Math.min(pagination.currentPage * 10, pagination.totalSubscribers)}</span> of{' '}
              <span className="font-medium">{pagination.totalSubscribers}</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end gap-3">
            {pagination.hasPrevPage && (
              <Link
                href={{ pathname: '/admin/subscribers', query: { ...searchParams, page: (pagination.currentPage - 1).toString() } }}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
              >
                Previous
              </Link>
            )}
            {pagination.hasNextPage && (
              <Link
                href={{ pathname: '/admin/subscribers', query: { ...searchParams, page: (pagination.currentPage + 1).toString() } }}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
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
