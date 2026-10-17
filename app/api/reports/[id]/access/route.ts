import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../../../config/db";
import { researchReportsTable } from "../../../../../config/schema";
import { eq } from "drizzle-orm";
import { hasReportAccess } from "../../../../../lib/entitlements";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params;

    const [report] = await db
      .select({
        id: researchReportsTable.id,
        title: researchReportsTable.title,
        reportType: researchReportsTable.reportType,
      })
      .from(researchReportsTable)
      .where(eq(researchReportsTable.id, reportId))
      .limit(1);

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({
        isSignedIn: false,
        hasAccess: false,
        requiresSubscription: true,
        subscribeUrl: "/reports/join",
        title: report.title,
      });
    }

    const clerkUserId = user.id;
    const userRole = user.publicMetadata?.role as string;

    const { hasAccess, reason } = await hasReportAccess(clerkUserId, userRole, report.reportType);

    return NextResponse.json({
      isSignedIn: true,
      hasAccess,
      isAdmin: reason === "ADMIN",
      isSubscribed: reason === "SUBSCRIBED",
      requiresSubscription: !hasAccess,
      subscribeUrl: "/reports/join",
      title: report.title,
      pdfUrl: hasAccess ? `/api/reports/${reportId}/pdf` : null,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Access check error:", errMsg);
    return NextResponse.json({ error: "Failed to check access" }, { status: 500 });
  }
}
