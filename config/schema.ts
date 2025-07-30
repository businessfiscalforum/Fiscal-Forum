// schema.ts

import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Enums
export const roleEnum = pgEnum('role', ['USER', 'ADMIN', 'AGENT', 'PARTNER']);
export const statusEnum = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED', 'BANNED']);
export const loanTypeEnum = pgEnum('loan_type', ['PERSONAL', 'HOME', 'CAR', 'EDUCATION', 'BUSINESS']);
export const insuranceTypeEnum = pgEnum('insurance_type', ['LIFE', 'HEALTH', 'CAR', 'TERM', 'TRAVEL', 'PROPERTY']);
export const paymentMethodEnum = pgEnum('payment_method', ['UPI', 'CARD', 'NETBANKING', 'WALLET', 'EMI']);
export const applicationStatusEnum = pgEnum('application_status', ['INITIATED', 'IN_PROGRESS', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED']);
export const transactionTypeEnum = pgEnum('transaction_type', ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT']);
export const usersTable = pgTable('users_table', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: roleEnum('role').default('USER').notNull(),
  status: statusEnum('status').default('PENDING').notNull(),
});
export const applicationsTable = pgTable('applications_table', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  type: text('type').notNull(), // can be "loan" or "insurance"
  loanType: loanTypeEnum('loan_type'),
  insuranceType: insuranceTypeEnum('insurance_type'),
  applicationStatus: applicationStatusEnum('application_status').default('INITIATED').notNull(),
  paymentMethod: paymentMethodEnum('payment_method'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;
