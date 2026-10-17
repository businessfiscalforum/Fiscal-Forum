import Razorpay from "razorpay";
import crypto from "crypto";

export interface RazorpayCredentialCheck {
  keyIdPresent: boolean;
  keySecretPresent: boolean;
  isTestMode: boolean;
  keyIdLength: number;
  keySecretLength: number;
}

export function checkRazorpayCredentials(): RazorpayCredentialCheck {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  return {
    keyIdPresent: Boolean(key_id),
    keySecretPresent: Boolean(key_secret),
    isTestMode: Boolean(key_id?.startsWith("rzp_test_")),
    keyIdLength: key_id?.length ?? 0,
    keySecretLength: key_secret?.length ?? 0,
  };
}

export function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are missing from environment variables.");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

/**
 * Constant-time comparison for SHA-256 hex signatures.
 * Safely handles malformed, mismatched-length, or non-hex inputs without throwing exceptions.
 */
function safeTimingEqual(expectedHex: string, providedHex: string): boolean {
  if (
    typeof expectedHex !== "string" ||
    typeof providedHex !== "string" ||
    !expectedHex ||
    !providedHex
  ) {
    return false;
  }

  const cleanExpected = expectedHex.trim().toLowerCase();
  const cleanProvided = providedHex.trim().toLowerCase();

  // A valid SHA256 hex digest must be exactly 64 hex characters
  if (!/^[0-9a-f]{64}$/.test(cleanExpected) || !/^[0-9a-f]{64}$/.test(cleanProvided)) {
    return false;
  }

  try {
    const bufExpected = Buffer.from(cleanExpected, "utf-8");
    const bufProvided = Buffer.from(cleanProvided, "utf-8");

    if (bufExpected.length !== bufProvided.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufExpected, bufProvided);
  } catch {
    return false;
  }
}

/**
 * Validates the HMAC SHA256 signature sent by Razorpay client after checkout.
 * Expected formula: HMAC-SHA256(order_id + "|" + payment_id, RAZORPAY_KEY_SECRET)
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (
    !orderId ||
    typeof orderId !== "string" ||
    !paymentId ||
    typeof paymentId !== "string" ||
    !signature ||
    typeof signature !== "string"
  ) {
    return false;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error("verifyPaymentSignature: RAZORPAY_KEY_SECRET is not configured.");
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return safeTimingEqual(expectedSignature, signature);
  } catch {
    console.error("verifyPaymentSignature: Error during HMAC computation.");
    return false;
  }
}

/**
 * Validates the webhook signature against the raw request body.
 * Expected formula: HMAC-SHA256(rawBody, RAZORPAY_WEBHOOK_SECRET)
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  if (
    typeof rawBody !== "string" ||
    !signature ||
    typeof signature !== "string"
  ) {
    return false;
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("verifyWebhookSignature: RAZORPAY_WEBHOOK_SECRET is not configured.");
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    return safeTimingEqual(expectedSignature, signature);
  } catch {
    console.error("verifyWebhookSignature: Error during webhook HMAC computation.");
    return false;
  }
}

/**
 * Canonical report price constants across Fiscal Forum.
 * Daily Pre-Market reports = ₹49 (4,900 paise)
 * Weekly reports = ₹99 (9,900 paise)
 */
export const REPORT_PRICES = {
  DAILY_PRE_MARKET_RUPEES: 49,
  WEEKLY_RUPEES: 99,
  DAILY_PRE_MARKET_PAISE: 4900,
  WEEKLY_PAISE: 9900,
} as const;

/**
 * Calculates report price strictly on the server in paise (1 INR = 100 paise).
 * Never accepts prices submitted by the browser.
 * Rejects negative, zero, or non-finite prices.
 *
 * Pricing rule precedence:
 * 1. Rejects invalid, non-finite, zero, or negative prices.
 * 2. If report is a Weekly report:
 *    - If price is set to the legacy table default of ₹49 or is null/undefined:
 *      Uses canonical Weekly price of ₹99 (9,900 paise) so the accidental ₹49 column default
 *      never silently overrides the intended ₹99 weekly price.
 *    - If price is explicitly set to any other customized price (e.g. ₹99, ₹149, ₹199):
 *      Respects the explicit price in paise.
 * 3. If report is a Pre-Market / Daily report:
 *    - If price is explicitly customized (e.g. ₹49, ₹79): respects price * 100.
 *    - If null/undefined: defaults to ₹49 (4,900 paise).
 * 4. All other report types:
 *    - Respects explicit price if provided, otherwise defaults to canonical ₹49 (4,900 paise).
 */
export function calculateReportPriceInPaise(report: {
  price?: number | null;
  reportType?: string | null;
}): number {
  if (report.price !== undefined && report.price !== null) {
    if (typeof report.price !== "number" || !Number.isFinite(report.price) || report.price <= 0) {
      throw new Error("Invalid report price configured.");
    }
  }

  const type = (report.reportType || "").toLowerCase();
  const isWeekly = type.includes("weekly");

  // Handle Weekly reports: Ensure legacy DB default of ₹49 does NOT override intended ₹99
  if (isWeekly) {
    if (
      report.price === undefined ||
      report.price === null ||
      report.price === REPORT_PRICES.DAILY_PRE_MARKET_RUPEES
    ) {
      return REPORT_PRICES.WEEKLY_PAISE; // ₹99 = 9,900 paise
    }
    return Math.round(report.price * 100);
  }

  // Pre-market and other reports with explicit prices
  if (report.price !== undefined && report.price !== null) {
    return Math.round(report.price * 100);
  }

  // Canonical default for Pre-Market and other reports is ₹49 (4,900 paise)
  return REPORT_PRICES.DAILY_PRE_MARKET_PAISE;
}
