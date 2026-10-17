import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getGoogleDriveClient, extractGoogleDriveFileId } from "../../../../lib/googleDrive";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const userRole = user.publicMetadata?.role as string;
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized. Admin privileges required." },
        { status: 403 }
      );
    }

    const fileParam = req.nextUrl.searchParams.get("fileId") || req.nextUrl.searchParams.get("url");
    const fileId = extractGoogleDriveFileId(fileParam) || fileParam;

    if (!fileId) {
      return NextResponse.json({
        message: "Google Drive service configuration status",
        hasServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY || !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
        instructions: "Pass ?fileId=<ID_OR_URL> to test file accessibility.",
      });
    }

    const drive = getGoogleDriveClient();
    const res = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, size",
    });

    return NextResponse.json({
      success: true,
      file: {
        id: res.data.id,
        name: res.data.name,
        mimeType: res.data.mimeType,
        size: res.data.size,
      },
      message: "Service account successfully authenticated and accessed the restricted Google Drive file!",
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Admin Google Drive verification error:", errMsg);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to access Google Drive file. Check service account permissions.",
      },
      { status: 500 }
    );
  }
}
