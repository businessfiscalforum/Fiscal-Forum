import { db } from "../../../../config/db";
import { customReportsTable } from "../../../../config/schema";
import { desc } from "drizzle-orm";
import CustomReportRequestsClient from "./CustomReportRequestsClient";

export const dynamic = "force-dynamic";

export default async function CustomReportRequestsPage() {
  const data = await db
    .select()
    .from(customReportsTable)
    .orderBy(desc(customReportsTable.submittedAt));

  return <CustomReportRequestsClient initialData={data} />;
}
