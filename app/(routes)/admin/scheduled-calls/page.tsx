import { db } from "../../../../config/db";
import { scheduledCalls } from "../../../../config/schema";
import { desc, count, ilike, or } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaComment,
  FaSearch,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";
import { format } from "date-fns";

// Type for scheduled call rows
type ScheduledCall = typeof scheduledCalls.$inferSelect;

// Fetch scheduled calls with pagination + search
async function fetchScheduledCalls(params: {
  page?: string;
  search?: string;
}) {
  const { page = "1", search = "" } = params;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const whereClause =
    search && search.trim() !== ""
      ? or(
          ilike(scheduledCalls.name, `%${search}%`),
          ilike(scheduledCalls.email, `%${search}%`),
          ilike(scheduledCalls.phone, `%${search}%`)
        )
      : undefined;

  const callList = await db
    .select()
    .from(scheduledCalls)
    .where(whereClause)
    .orderBy(desc(scheduledCalls.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: count() })
    .from(scheduledCalls)
    .where(whereClause);

  const totalUsers = Number(countResult[0]?.count ?? 0);
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    scheduledCalls: callList,
    pagination: {
      currentPage,
      totalPages,
      totalUsers,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}

// Skeleton while loading
function CallsTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded col-span-1"></div>
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="px-6 py-4 border-b border-gray-200 grid grid-cols-5 gap-4"
          >
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded col-span-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Page
export default function ScheduledCallsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="space-y-6">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <FaPhone className="text-emerald-700" />
            Scheduled Calls
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage user requests for scheduled calls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <form method="GET" className="flex-1 max-w-md">
            <label htmlFor="search" className="sr-only">
              Search calls
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                defaultValue={searchParams.search || ""}
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by name, email, or phone..."
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

      {/* Table */}
      <Suspense fallback={<CallsTableSkeleton />}>
        <CallsTableContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Table Content
async function CallsTableContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { scheduledCalls: callList, pagination } =
    await fetchScheduledCalls(searchParams);

  return (
    <>
      <div className="bg-white shadow rounded-2xl overflow-hidden border border-emerald-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Contact", "Scheduled For", "Message", "Requested On"].map(
                  (header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-emerald-800 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {callList.length > 0 ? (
                callList.map((call) => {
                  const scheduledDate = call.date
                    ? format(new Date(call.date), "MMM d, yyyy")
                    : "N/A";
                  const scheduledTime = call.time || "N/A";
                  const createdAt = call.createdAt
                    ? format(new Date(call.createdAt), "MMM d, yyyy h:mm a")
                    : "N/A";

                  return (
                    <tr
                      key={call.id}
                      className="hover:bg-emerald-50/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        {call.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <FaEnvelope className="text-gray-400 text-xs" />
                            <span>{call.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <FaPhone className="text-gray-400 text-xs" />
                            <span>
                              {call.countryCode} {call.phone}
                            </span>
                          </div>
                          {call.preferredContactMethod && (
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                              <FaInfoCircle className="text-gray-400 text-xs" />
                              <span className="capitalize">
                                {call.preferredContactMethod}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        {scheduledDate} @ {scheduledTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        <div className="flex items-start gap-2">
                          <FaComment className="text-gray-400 mt-0.5 text-xs" />
                          <span className="line-clamp-2">
                            {call.message || "No message provided."}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        {createdAt}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-gray-500 bg-gray-50"
                  >
                    <FaPhone className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No scheduled calls found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchParams.search
                        ? `No results for "${searchParams.search}".`
                        : "There are currently no scheduled call requests."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 py-3">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(pagination.currentPage - 1) * 10 + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(pagination.currentPage * 10, pagination.totalUsers)}
              </span>{" "}
              of <span className="font-medium">{pagination.totalUsers}</span>{" "}
              results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end gap-3">
            {pagination.hasPrevPage && (
              <Link
                href={{
                  pathname: "/admin/scheduled-calls",
                  query: {
                    ...searchParams,
                    page: (pagination.currentPage - 1).toString(),
                  },
                }}
                className="px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </Link>
            )}
            {pagination.hasNextPage && (
              <Link
                href={{
                  pathname: "/admin/scheduled-calls",
                  query: {
                    ...searchParams,
                    page: (pagination.currentPage + 1).toString(),
                  },
                }}
                className="px-4 py-2 border rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
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
