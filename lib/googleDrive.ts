import "server-only";
import { google } from "googleapis";
import { Readable } from "stream";

export { extractGoogleDriveFileId } from "./googleDriveUtils";

/**
 * Creates authenticated Google Drive API client using service account credentials.
 * Supports both individual env vars and full JSON string.
 */
export function getGoogleDriveClient() {
  let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  // Support full JSON string in GOOGLE_SERVICE_ACCOUNT_KEY
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    try {
      const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
      clientEmail = parsed.client_email;
      privateKey = parsed.private_key;
    } catch (e) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON:", e);
    }
  }

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Service Account credentials missing. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY (or GOOGLE_SERVICE_ACCOUNT_KEY) in environment variables."
    );
  }

  // Handle newline escapes in private key (e.g. from Vercel / .env)
  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: formattedPrivateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

/**
 * Streams a protected file directly from Google Drive.
 * Never saves to disk; returns the Readable stream and metadata.
 */
export async function downloadDriveFileStream(fileId: string): Promise<{
  stream: Readable;
  name: string;
  mimeType: string;
}> {
  const drive = getGoogleDriveClient();

  // 1. Fetch file metadata
  let name = "report.pdf";
  let mimeType = "application/pdf";

  try {
    const meta = await drive.files.get({
      fileId,
      fields: "id, name, mimeType",
    });
    if (meta.data.name) name = meta.data.name;
    if (meta.data.mimeType) mimeType = meta.data.mimeType;
  } catch {
    // Ignore metadata error and proceed to download
  }

  // 2. Fetch file content as a stream
  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
    },
    {
      responseType: "stream",
    }
  );

  return {
    stream: response.data as Readable,
    name,
    mimeType,
  };
}
