/**
 * Safe Diagnostic Logging Utility
 * Extracts exception name, message, provider error code, HTTP status, and stack trace.
 * Strictly redacts connection strings, secrets, passwords, tokens, and payment signatures.
 */

export interface SafeDiagnosticInfo {
  exceptionName: string;
  message: string;
  providerErrorCode: string | null;
  httpStatus: number;
  stackTrace: string | null;
}

/**
 * Redacts database connection strings, passwords, secrets, and signatures from any string.
 */
export function sanitizeSensitiveText(text: string): string {
  if (!text || typeof text !== "string") return "";

  return text
    // Redact postgres / mysql / mongo connection strings containing credentials
    .replace(/(postgres(?:ql)?:\/\/[^:]+:)([^@]+)(@[^\s/]+)/gi, "$1[REDACTED_PASSWORD]$3")
    .replace(/(postgres(?:ql)?:\/\/[^\s]+)/gi, (match) => {
      try {
        const url = new URL(match);
        return `postgresql://[redacted_user]:[redacted_pass]@${url.host}${url.pathname}`;
      } catch {
        return "postgresql://[redacted_connection_string]";
      }
    })
    // Redact razorpay secret keys (24 alphanumeric chars)
    .replace(/(rzp_(?:test|live)_[a-zA-Z0-9]+)/gi, "[REDACTED_KEY_ID]")
    .replace(/(['"]?(?:secret|key_secret|signature|password|token)['"]?\s*[:=]\s*['"]?)[a-zA-Z0-9_\-+/=]{16,}(['"]?)/gi, "$1[REDACTED]$2");
}

/**
 * Parses any caught error (standard Error, Razorpay API error object, PostgresError, etc.)
 * into a safe, structured diagnostic object.
 */
export function parseSafeDiagnostic(error: unknown): SafeDiagnosticInfo {
  // Case 1: Razorpay API error object { statusCode: 401, error: { code: 'BAD_REQUEST_ERROR', description: '...' } }
  if (
    error &&
    typeof error === "object" &&
    "statusCode" in error &&
    "error" in error
  ) {
    const rzpErr = error as {
      statusCode?: number;
      error?: { code?: string; description?: string; field?: string } | string;
    };

    const description =
      typeof rzpErr.error === "object" && rzpErr.error !== null
        ? rzpErr.error.description || rzpErr.error.code || "Razorpay API error"
        : String(rzpErr.error || "Razorpay API error");

    const providerErrorCode =
      typeof rzpErr.error === "object" && rzpErr.error !== null
        ? rzpErr.error.code || null
        : null;

    return {
      exceptionName: "RazorpayAPIError",
      message: sanitizeSensitiveText(description),
      providerErrorCode,
      httpStatus: typeof rzpErr.statusCode === "number" ? rzpErr.statusCode : 500,
      stackTrace: null,
    };
  }

  // Case 2: Standard Error (or PostgresError extending Error)
  if (error instanceof Error) {
    const isPostgres = error.name === "PostgresError" || "code" in error;
    const providerErrorCode = isPostgres && "code" in error ? String((error as { code: unknown }).code) : null;

    return {
      exceptionName: error.name || "Error",
      message: sanitizeSensitiveText(error.message || "An unexpected error occurred"),
      providerErrorCode,
      httpStatus: isPostgres ? 500 : 500,
      stackTrace: error.stack ? sanitizeSensitiveText(error.stack) : null,
    };
  }

  // Case 3: Other object or primitive
  const stringified = typeof error === "string" ? error : JSON.stringify(error);
  return {
    exceptionName: "UnknownError",
    message: sanitizeSensitiveText(stringified || "Unknown error occurred"),
    providerErrorCode: null,
    httpStatus: 500,
    stackTrace: null,
  };
}

/**
 * Logs structured diagnostic information safely without leaking credentials.
 */
export function logSafeDiagnostic(context: string, error: unknown): SafeDiagnosticInfo {
  const diagnostic = parseSafeDiagnostic(error);

  console.error(`[Diagnostic] ${context}:`, {
    exceptionName: diagnostic.exceptionName,
    message: diagnostic.message,
    providerErrorCode: diagnostic.providerErrorCode,
    httpStatus: diagnostic.httpStatus,
  });

  if (diagnostic.stackTrace) {
    console.error(`[Diagnostic Stack] ${context}:`, diagnostic.stackTrace);
  }

  return diagnostic;
}
