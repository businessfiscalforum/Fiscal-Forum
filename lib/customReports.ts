import { db } from "../config/db";
import { customReportsTable } from "../config/schema";
import { eq } from "drizzle-orm";
import { getRazorpayInstance } from "./razorpay";

export const CUSTOM_REPORT_PRICE = {
  RUPEES: 599,
  PAISE: 59900,
} as const;

export const CUSTOM_REPORT_CATEGORIES = [
  "Mutual Funds",
  "Mutual Fund",
  "Stocks",
  "Credit Card",
  "Insurance",
  "Loans",
  "Loan",
] as const;

export const CANONICAL_CATEGORIES = [
  "Mutual Funds",
  "Stocks",
  "Credit Card",
  "Insurance",
  "Loans",
] as const;

export class CustomReportError extends Error {
  code: string;
  status: number;
  constructor(message: string, code: string, status: number = 400) {
    super(message);
    this.name = "CustomReportError";
    this.code = code;
    this.status = status;
  }
}

/**
 * Normalizes and validates the selected Customized Report category against the 5 approved categories.
 */
export function validateCustomReportCategory(category: string): string {
  if (!category || typeof category !== "string") {
    throw new CustomReportError("Category is required.", "MISSING_CATEGORY", 400);
  }

  const clean = category.trim().toLowerCase();
  if (clean === "mutual funds" || clean === "mutual fund") return "Mutual Funds";
  if (clean === "stocks" || clean === "stock") return "Stocks";
  if (clean === "credit card" || clean === "credit cards") return "Credit Card";
  if (clean === "insurance") return "Insurance";
  if (clean === "loans" || clean === "loan") return "Loans";

  throw new CustomReportError(
    `Invalid category: '${category}'. Supported categories are: Mutual Funds, Stocks, Credit Card, Insurance, Loans.`,
    "INVALID_CATEGORY",
    400
  );
}

/**
 * Shared validation and persistence for Customized Report request in PENDING payment state.
 * Creates a Razorpay order for exactly ₹599 (59,900 paise).
 */
export async function createCustomReportOrder(payload: {
  name: string;
  email: string;
  mobile: string;
  category: string;
  clerkUserId?: string | null;
  // Category-specific questionnaire fields
  age?: string | null;
  capitalInvestBorrow?: string | null;
  returnExpected?: string | null;
  investmentGoal?: string | null;
  riskTolerance?: string | null;
  investmentStyle?: string | null;
  monthlySavings?: string | null;
  addDetails?: string | null;
  occupation?: string | null;
  investmentPreference?: string | null;
  annualIncome?: string | null;
  dependents?: string | null;
  maritalStatus?: string | null;
  existingInsurance?: string | null;
  insuranceCovers?: string | null;
  loansLiabilities?: string | null;
  monthlySpending?: string | null;
  spendingCategories?: string | null;
  flyFrequency?: string | null;
  travelType?: string | null;
  loungeImportance?: string | null;
  feeComfort?: string | null;
  loanPurpose?: string | null;
  loanEmployment?: string | null;
  loanMonthlyIncome?: string | null;
  loanIncomeStability?: string | null;
  loanAmount?: string | null;
  loanHasCollateral?: string | null;
  loanCollateralType?: string | null;
}) {
  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const mobile = (payload.mobile || "").trim();

  if (!name) {
    throw new CustomReportError("Full name is required.", "MISSING_NAME", 400);
  }

  if (!email || !email.includes("@")) {
    throw new CustomReportError("Valid email address is required.", "INVALID_EMAIL", 400);
  }

  if (!/^\d{10}$/.test(mobile)) {
    throw new CustomReportError("Mobile/WhatsApp number must be exactly 10 digits.", "INVALID_MOBILE", 400);
  }

  const validatedCategory = validateCustomReportCategory(payload.category);
  const amountInPaise = CUSTOM_REPORT_PRICE.PAISE;

  // 1. Insert request in PENDING state
  const [report] = await db
    .insert(customReportsTable)
    .values({
      name,
      email,
      mobile,
      category: validatedCategory,
      clerkUserId: payload.clerkUserId || null,
      paymentStatus: "PENDING",
      processingStatus: "PENDING",
      amount: amountInPaise,
      currency: "INR",
      age: payload.age || null,
      capitalInvestBorrow: payload.capitalInvestBorrow || null,
      returnExpected: payload.returnExpected || null,
      investmentGoal: payload.investmentGoal || null,
      riskTolerance: payload.riskTolerance || null,
      investmentStyle: payload.investmentStyle || null,
      monthlySavings: payload.monthlySavings || null,
      addDetails: payload.addDetails || null,
      occupation: payload.occupation || null,
      investmentPreference: payload.investmentPreference || null,
      annualIncome: payload.annualIncome || null,
      dependents: payload.dependents || null,
      maritalStatus: payload.maritalStatus || null,
      existingInsurance: payload.existingInsurance || null,
      insuranceCovers: payload.insuranceCovers || null,
      loansLiabilities: payload.loansLiabilities || null,
      monthlySpending: payload.monthlySpending || null,
      spendingCategories: payload.spendingCategories || null,
      flyFrequency: payload.flyFrequency || null,
      travelType: payload.travelType || null,
      loungeImportance: payload.loungeImportance || null,
      feeComfort: payload.feeComfort || null,
      loanPurpose: payload.loanPurpose || null,
      loanEmployment: payload.loanEmployment || null,
      loanMonthlyIncome: payload.loanMonthlyIncome || null,
      loanIncomeStability: payload.loanIncomeStability || null,
      loanAmount: payload.loanAmount || null,
      loanHasCollateral: payload.loanHasCollateral || null,
      loanCollateralType: payload.loanCollateralType || null,
    })
    .returning();

  // 2. Create Razorpay order for ₹599
  const razorpay = getRazorpayInstance();
  const receipt = `cr_${report.id.replace(/-/g, "").slice(0, 10)}_${Date.now()}`.slice(0, 40);

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt,
    notes: {
      purchaseType: "CUSTOM_REPORT",
      customReportId: report.id,
      category: validatedCategory,
      email,
      mobile,
    },
  });

  // 3. Link orderId to the stored report
  await db
    .update(customReportsTable)
    .set({ orderId: order.id })
    .where(eq(customReportsTable.id, report.id));

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  return {
    customReportId: report.id,
    orderId: order.id,
    amount: order.amount,
    currency: "INR",
    keyId,
    category: validatedCategory,
    name,
    email,
    mobile,
  };
}

/**
 * Reconciles Customized Report payment independently via Razorpay API.
 * Resolves purchase strictly through server-side database attempt record.
 */
export async function reconcileCustomReportPayment(params: {
  orderId: string;
  paymentId: string;
  signature?: string;
}) {
  const { orderId, paymentId } = params;

  if (!orderId || !paymentId) {
    throw new CustomReportError("Missing required orderId or paymentId.", "MISSING_PARAMETERS", 400);
  }

  // 1. Fetch server-side report record by orderId
  const [report] = await db
    .select()
    .from(customReportsTable)
    .where(eq(customReportsTable.orderId, orderId))
    .limit(1);

  if (!report) {
    throw new CustomReportError(
      `Custom report order '${orderId}' not found.`,
      "ORDER_NOT_FOUND",
      404
    );
  }

  // If already marked paid with same paymentId, return idempotent success
  if (report.paymentStatus === "PAID" && report.paymentId === paymentId) {
    return {
      customReportId: report.id,
      orderId,
      paymentId,
      category: report.category,
      alreadyProcessed: true,
    };
  }

  // 2. Fetch payment details directly from Razorpay API
  const razorpay = getRazorpayInstance();
  const payment = await razorpay.payments.fetch(paymentId);

  if (!payment) {
    throw new CustomReportError(
      `Payment '${paymentId}' could not be retrieved from Razorpay.`,
      "PAYMENT_NOT_FOUND",
      404
    );
  }

  // 3. Verify payment properties
  if (payment.id !== paymentId) {
    throw new CustomReportError("Payment ID mismatch.", "PAYMENT_ID_MISMATCH", 400);
  }

  if (payment.order_id !== orderId) {
    throw new CustomReportError("Payment order_id mismatch.", "ORDER_MISMATCH", 400);
  }

  if (payment.status !== "captured") {
    throw new CustomReportError(
      `Payment is in '${payment.status}' status. Access requires captured payment.`,
      "PAYMENT_NOT_CAPTURED",
      400
    );
  }

  if (Number(payment.amount) !== CUSTOM_REPORT_PRICE.PAISE) {
    throw new CustomReportError("Payment amount mismatch.", "AMOUNT_MISMATCH", 400);
  }

  if (payment.currency?.toUpperCase() !== "INR") {
    throw new CustomReportError("Payment currency mismatch.", "CURRENCY_MISMATCH", 400);
  }

  // 4. Update custom report record to PAID and ACCEPTED
  await db
    .update(customReportsTable)
    .set({
      paymentStatus: "PAID",
      processingStatus: "ACCEPTED",
      paymentId,
      paidAt: new Date(),
    })
    .where(eq(customReportsTable.id, report.id));

  return {
    customReportId: report.id,
    orderId,
    paymentId,
    category: report.category,
    alreadyProcessed: false,
  };
}
