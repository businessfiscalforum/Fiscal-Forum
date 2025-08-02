// config/schema.ts
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// 🔁 Updated Enums (Aligned with frontend)

// Roles & Status
export const roleEnum = pgEnum('role', ['USER', 'ADMIN', 'AGENT', 'PARTNER']);
export const statusEnum = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED', 'BANNED']);

// 🔄 Loan Type Enum
export const loanTypeEnum = pgEnum('loan_type', [
  'home-loan',
  'lap',
  'personal',
  'business',
  'gold',
  'car',
  'education',
  'securities',
]);

export const insuranceTypeEnum = pgEnum('insurance_type', [
  'LIFE',
  'HEALTH',
  'CAR',
  'TERM',
  'TRAVEL',
  'PROPERTY',
]);

// 🆕 Employment Type Enum
export const employmentTypeEnum = pgEnum('employment_type', [
  'salaried',
  'self-employed',
  'business',
  'professional',
]);

// 🆕 Annual Income Range Enum
export const incomeRangeEnum = pgEnum('annual_income', [
  '3-5',
  '5-10',
  '10-15',
  '15-25',
  '25+',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'UPI',
  'CARD',
  'NETBANKING',
  'WALLET',
  'EMI',
]);

export const applicationStatusEnum = pgEnum('application_status', [
  'INITIATED',
  'IN_PROGRESS',
  'SUBMITTED',
  'UNDER_REVIEW',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
  'DISBURSED',
]);

export const transactionTypeEnum = pgEnum('transaction_type', [
  'DEPOSIT',
  'WITHDRAWAL',
  'TRANSFER',
  'PAYMENT',
]);

// Users Table
export const usersTable = pgTable('users_table', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').default('USER').notNull(),
  status: statusEnum('status').default('PENDING').notNull(),
});

// Generic Applications Table (for all loan types)
export const applicationsTable = pgTable('applications_table', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  // Loan/Insurance Type
  type: text('type').notNull().$type<'loan' | 'insurance'>(), // "loan" or "insurance"
  loanType: loanTypeEnum('loan_type'), // e.g., 'home-loan'
  insuranceType: insuranceTypeEnum('insurance_type'),

  // Personal Info
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  dateOfBirth: timestamp('date_of_birth', { mode: 'string' }).notNull(),
  panNumber: text('pan_number').notNull(),

  // Employment & Financial
  employmentType: employmentTypeEnum('employment_type').notNull(),
  company: text('company'),
  annualIncome: incomeRangeEnum('annual_income').notNull(),

  // Address
  address: text('address').notNull(),
  city: text('city').notNull(),
  pincode: text('pincode').notNull(),

  // Status & Metadata
  applicationStatus: applicationStatusEnum('application_status')
    .default('INITIATED')
    .notNull(),
  paymentMethod: paymentMethodEnum('payment_method'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ NEW: Business-Specific Application Table
export const businessApplicationTable = pgTable('business_applications_table', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  // Foreign Key to applicationsTable (optional, if you want 1:1)
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Business Details
  businessName: text('business_name').notNull(),
  gstNumber: text('gst_number').notNull(),
  businessVintage: text('business_vintage').notNull(), // e.g., '3-5'
  natureOfBusiness: text('nature_of_business').notNull(), // e.g., 'manufacturing'
  businessAddress: text('business_address').notNull(),
  businessCity: text('business_city').notNull(),
  businessPincode: text('business_pincode').notNull(),

  // Loan Request
  loanPurpose: text('loan_purpose').notNull(), // e.g., 'working-capital'
  loanAmount: integer('loan_amount').notNull(),
  preferredTenure: text('preferred_tenure').notNull(), // e.g., '5'
  repaymentSource: text('repayment_source').notNull(), // e.g., 'business-revenue'
  existingLoan: text('existing_loan').notNull(), // 'yes'/'no'
  existingLoanAmount: integer('existing_loan_amount'), // nullable

  // Use of Funds (₹)
  useOfFundsEquipment: integer('use_of_funds_equipment').default(0),
  useOfFundsWorkingCapital: integer('use_of_funds_working_capital').default(0),
  useOfFundsExpansion: integer('use_of_funds_expansion').default(0),
  useOfFundsMarketing: integer('use_of_funds_marketing').default(0),
  useOfFundsOther: integer('use_of_funds_other').default(0),

  // Co-Applicant
  hasCoApplicant: text('has_co_applicant').default('no').notNull(), // 'yes'/'no'
  coApplicantFirstName: text('co_applicant_first_name'),
  coApplicantLastName: text('co_applicant_last_name'),
  coApplicantEmail: text('co_applicant_email'),
  coApplicantPhone: text('co_applicant_phone'),
  coApplicantRelationship: text('co_applicant_relationship'),
  coApplicantIncome: text('co_applicant_income'), // income range
  coApplicantPanNumber: text('co_applicant_pan_number'),

  // Status & Metadata
  applicationStatus: applicationStatusEnum('application_status')
    .default('SUBMITTED')
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;

// ✅ New: Business Application Types
export type InsertBusinessApplication = typeof businessApplicationTable.$inferInsert;
export type SelectBusinessApplication = typeof businessApplicationTable.$inferSelect;