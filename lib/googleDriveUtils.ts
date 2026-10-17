/**
 * Extracts Google Drive File ID from standard Drive sharing/view URLs or raw IDs.
 */
export function extractGoogleDriveFileId(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If already an ID: alphanumeric string with length between 25 and 60
  if (/^[a-zA-Z0-9_-]{25,60}$/.test(trimmed)) {
    return trimmed;
  }

  // https://drive.google.com/file/d/<ID>/view or /preview
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // https://drive.google.com/open?id=<ID> or ?id=<ID>
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }

  return null;
}
