import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../../../config/db";
import { researchReportsTable } from "../../../../../config/schema";
import { eq } from "drizzle-orm";
import { hasReportAccess } from "../../../../../lib/entitlements";
import { extractGoogleDriveFileId, downloadDriveFileStream } from "../../../../../lib/googleDrive";
import { Readable } from "stream";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params;

    // 1. Authenticate user via Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required to view this report.", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    const clerkUserId = user.id;
    const userRole = user.publicMetadata?.role as string;

    // 2. Fetch report
    const [report] = await db
      .select()
      .from(researchReportsTable)
      .where(eq(researchReportsTable.id, reportId))
      .limit(1);

    if (!report) {
      return NextResponse.json(
        { error: "Report not found." },
        { status: 404 }
      );
    }

    // 3. Authorization: Require Admin privilege or Active Subscription covering category
    const { hasAccess } = await hasReportAccess(
      clerkUserId,
      userRole,
      report.reportType
    );

    if (!hasAccess) {
      return NextResponse.json(
        {
          error: "An active subscription is required to access this research report.",
          code: "SUBSCRIPTION_REQUIRED",
          subscribeUrl: "/reports/join",
          reportId,
          reportTitle: report.title,
          reportType: report.reportType,
        },
        { status: 403 }
      );
    }

    // 4. Retrieve Google Drive File ID safely
    const fileId = (report as { driveFileId?: string }).driveFileId || extractGoogleDriveFileId(report.pdfUrl);

    if (!fileId) {
      return NextResponse.json(
        {
          error: "Report file is currently unavailable.",
          code: "FILE_UNAVAILABLE",
        },
        { status: 404 }
      );
    }

    // 5. Stream the restricted file directly from Google Drive
    const { stream, name, mimeType } = await downloadDriveFileStream(fileId);

    // Convert Node Readable to Web ReadableStream
    const webStream = Readable.toWeb(stream) as ReadableStream<Uint8Array>;

    // Safely sanitize filename to prevent HTTP response header splitting / injection
    const rawTitle = (report.title || name || "report").replace(/[\r\n\t"\\/:]/g, " ").trim();
    const asciiFilename = rawTitle.replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, "_") || "report";
    const encodedFilename = encodeURIComponent(rawTitle || "report");

    return new Response(webStream, {
      status: 200,
      headers: {
        "Content-Type": mimeType || "application/pdf",
        "Content-Disposition": `inline; filename="${asciiFilename}.pdf"; filename*=UTF-8''${encodedFilename}.pdf`,
        // Non-negotiable security: Ensure browser and proxies never store/share this protected PDF
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Protected PDF streaming error:", errMsg);
    // Never expose Google Drive errors, internal URLs, or credentials to the client
    return NextResponse.json(
      { error: "Failed to retrieve protected report file." },
      { status: 500 }
    );
  }
}
