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

// 🔄 Fixed: Use kebab-case to match frontend (e.g., 'home-loan')
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

// 🆕 Added: Employment Type Enum
export const employmentTypeEnum = pgEnum('employment_type', [
  'salaried',
  'self-employed',
  'business',
  'professional',
]);

// 🆕 Added: Annual Income Range Enum
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

// Applications Table
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


// Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;