// config/schema.ts
import {
  boolean,
  decimal,
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

// 🆕 Property Type Enum (for Home Loan & LAP)
export const propertyTypeEnum = pgEnum('property_type', [
  'apartment',
  'villa',
  'plot',
  'commercial',
  'industrial',
]);

// 🆕 Property Usage Enum
export const propertyUsageEnum = pgEnum('property_usage', [
  'self-occupied',
  'rented',
  'under-construction',
  'ready-to-move',
]);

// 🆕 Car Type Enum
export const carTypeEnum = pgEnum('car_type', [
  'new',
  'used',
]);

// 🆕 Education Level Enum
export const educationLevelEnum = pgEnum('education_level', [
  'undergraduate',
  'postgraduate',
  'professional',
  'diploma',
]);

// 🆕 Course Type Enum
export const courseTypeEnum = pgEnum('course_type', [
  'engineering',
  'medical',
  'management',
  'law',
  'other',
]);

// 🆕 Securities Type Enum
export const securitiesTypeEnum = pgEnum('securities_type', [
  'mutual-funds',
  'shares',
  'bonds',
  'fixed-deposits',
]);

//news
export const newsCategoryEnum = pgEnum('news_category', [
  'blockchain',
  'fintech',
  'market-news',
  'research',
  'regulation',
  'crypto',
  'banking',
]);


// Users Table
export const usersTable = pgTable('users', {
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
  type: text('type').notNull().$type<'loan' | 'insurance'>(),
  loanType: loanTypeEnum('loan_type'),
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

// ✅ Home Loan Application Table
export const homeLoanApplicationTable = pgTable('home_loan_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Property Details
  propertyType: propertyTypeEnum('property_type').notNull(),
  propertyUsage: propertyUsageEnum('property_usage').notNull(),
  propertyValue: decimal('property_value', { precision: 15, scale: 2 }).notNull(),
  loanAmount: decimal('loan_amount', { precision: 15, scale: 2 }).notNull(),
  loanTenure: integer('loan_tenure').notNull(), // in years
  
  // Property Address
  propertyAddress: text('property_address').notNull(),
  propertyCity: text('property_city').notNull(),
  propertyPincode: text('property_pincode').notNull(),
  
  // Additional Details
  downPayment: decimal('down_payment', { precision: 15, scale: 2 }).notNull(),
  existingHomeLoan: boolean('existing_home_loan').default(false),
  existingLoanAmount: decimal('existing_loan_amount', { precision: 15, scale: 2 }),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ Car Loan Application Table
export const carLoanApplicationTable = pgTable('car_loan_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Car Details
  carType: carTypeEnum('car_type').notNull(),
  carMake: text('car_make').notNull(),
  carModel: text('car_model').notNull(),
  carVariant: text('car_variant'),
  manufacturingYear: integer('manufacturing_year'),
  
  // Loan Details
  carPrice: decimal('car_price', { precision: 12, scale: 2 }).notNull(),
  loanAmount: decimal('loan_amount', { precision: 12, scale: 2 }).notNull(),
  loanTenure: integer('loan_tenure').notNull(), // in years
  downPayment: decimal('down_payment', { precision: 12, scale: 2 }).notNull(),
  
  // Dealer Details
  dealerName: text('dealer_name'),
  dealerLocation: text('dealer_location'),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ Education Loan Application Table
export const educationLoanApplicationTable = pgTable('education_loan_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Course Details
  educationLevel: educationLevelEnum('education_level').notNull(),
  courseType: courseTypeEnum('course_type').notNull(),
  courseName: text('course_name').notNull(),
  courseDuration: integer('course_duration').notNull(), // in years
  
  // Institution Details
  institutionName: text('institution_name').notNull(),
  institutionLocation: text('institution_location').notNull(),
  institutionCountry: text('institution_country').notNull(),
  
  // Loan Details
  totalCourseFee: decimal('total_course_fee', { precision: 12, scale: 2 }).notNull(),
  loanAmount: decimal('loan_amount', { precision: 12, scale: 2 }).notNull(),
  
  // Academic Details
  previousEducation: text('previous_education').notNull(),
  previousMarks: decimal('previous_marks', { precision: 5, scale: 2 }).notNull(),
  
  // Co-applicant (usually parent/guardian)
  coApplicantName: text('co_applicant_name').notNull(),
  coApplicantRelation: text('co_applicant_relation').notNull(),
  coApplicantIncome: incomeRangeEnum('co_applicant_income').notNull(),
  coApplicantPan: text('co_applicant_pan').notNull(),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ Gold Loan Application Table
export const goldLoanApplicationTable = pgTable('gold_loan_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Gold Details
  goldWeight: decimal('gold_weight', { precision: 8, scale: 3 }).notNull(), // in grams
  goldPurity: decimal('gold_purity', { precision: 4, scale: 2 }).notNull(), // in karats
  goldType: text('gold_type').notNull(), // jewelry, coins, bars
  
  // Loan Details
  loanAmount: decimal('loan_amount', { precision: 10, scale: 2 }).notNull(),
  loanTenure: integer('loan_tenure').notNull(), // in months
  
  // Gold Items Description
  goldItemsDescription: text('gold_items_description').notNull(),
  estimatedValue: decimal('estimated_value', { precision: 12, scale: 2 }).notNull(),
  
  // Branch Preference
  preferredBranch: text('preferred_branch'),
  appointmentDate: timestamp('appointment_date', { mode: 'string' }),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ Loan Against Property (LAP) Application Table
export const lapApplicationTable = pgTable('lap_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Property Details
  propertyType: propertyTypeEnum('property_type').notNull(),
  propertyAge: integer('property_age').notNull(), // in years
  propertyValue: decimal('property_value', { precision: 15, scale: 2 }).notNull(),
  
  // Property Address
  propertyAddress: text('property_address').notNull(),
  propertyCity: text('property_city').notNull(),
  propertyPincode: text('property_pincode').notNull(),
  
  // Loan Details
  loanAmount: decimal('loan_amount', { precision: 15, scale: 2 }).notNull(),
  loanTenure: integer('loan_tenure').notNull(), // in years
  loanPurpose: text('loan_purpose').notNull(),
  
  // Property Ownership
  ownershipType: text('ownership_type').notNull(), // sole, joint
  coOwnerName: text('co_owner_name'),
  coOwnerRelation: text('co_owner_relation'),
  
  // Property Documents Status
  hasPropertyDocs: boolean('has_property_docs').default(false),
  hasClearTitle: boolean('has_clear_title').default(false),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ Loan Against Securities Application Table
export const securitiesLoanApplicationTable = pgTable('securities_loan_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Securities Details
  securitiesType: securitiesTypeEnum('securities_type').notNull(),
  securitiesValue: decimal('securities_value', { precision: 15, scale: 2 }).notNull(),
  
  // Portfolio Details
  portfolioDetails: text('portfolio_details').notNull(),
  dematAccountNumber: text('demat_account_number').notNull(),
  brokerName: text('broker_name').notNull(),
  
  // Loan Details
  loanAmount: decimal('loan_amount', { precision: 15, scale: 2 }).notNull(),
  loanPurpose: text('loan_purpose').notNull(),
  
  // Additional Securities Info
  pledgeableSecurities: text('pledgeable_securities').notNull(),
  averageHoldingPeriod: integer('average_holding_period'), // in months
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// ✅ Personal Loan Application Table
export const personalLoanApplicationTable = pgTable('personal_loan_applications', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Loan Details
  loanAmount: decimal('loan_amount', { precision: 12, scale: 2 }).notNull(),
  loanTenure: integer('loan_tenure').notNull(), // in months
  loanPurpose: text('loan_purpose').notNull(),
  
  // Employment Details (Additional)
  workExperience: integer('work_experience').notNull(), // in years
  monthlyIncome: decimal('monthly_income', { precision: 10, scale: 2 }).notNull(),
  
  // Financial Details
  existingEMIs: decimal('existing_emis', { precision: 10, scale: 2 }).default('0'),
  creditScore: integer('credit_score'),
  
  // Banking Details
  salaryAccount: text('salary_account').notNull(),
  bankName: text('bank_name').notNull(),
  accountNumber: text('account_number').notNull(),
  
  // References
  reference1Name: text('reference1_name').notNull(),
  reference1Phone: text('reference1_phone').notNull(),
  reference1Relation: text('reference1_relation').notNull(),
  
  reference2Name: text('reference2_name').notNull(),
  reference2Phone: text('reference2_phone').notNull(),
  reference2Relation: text('reference2_relation').notNull(),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// Business Application Table (already provided)
export const businessApplicationTable = pgTable('business_applications_table', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  applicationId: uuid('application_id')
    .notNull()
    .references(() => applicationsTable.id, { onDelete: 'cascade' }),

  // Business Details
  businessName: text('business_name').notNull(),
  gstNumber: text('gst_number').notNull(),
  businessVintage: text('business_vintage').notNull(),
  natureOfBusiness: text('nature_of_business').notNull(),
  businessAddress: text('business_address').notNull(),
  businessCity: text('business_city').notNull(),
  businessPincode: text('business_pincode').notNull(),

  // Loan Request
  loanPurpose: text('loan_purpose').notNull(),
  loanAmount: integer('loan_amount').notNull(),
  preferredTenure: text('preferred_tenure').notNull(),
  repaymentSource: text('repayment_source').notNull(),
  existingLoan: text('existing_loan').notNull(),
  existingLoanAmount: integer('existing_loan_amount'),

  // Use of Funds
  useOfFundsEquipment: integer('use_of_funds_equipment').default(0),
  useOfFundsWorkingCapital: integer('use_of_funds_working_capital').default(0),
  useOfFundsExpansion: integer('use_of_funds_expansion').default(0),
  useOfFundsMarketing: integer('use_of_funds_marketing').default(0),
  useOfFundsOther: integer('use_of_funds_other').default(0),

  // Co-Applicant
  hasCoApplicant: text('has_co_applicant').default('no').notNull(),
  coApplicantFirstName: text('co_applicant_first_name'),
  coApplicantLastName: text('co_applicant_last_name'),
  coApplicantEmail: text('co_applicant_email'),
  coApplicantPhone: text('co_applicant_phone'),
  coApplicantRelationship: text('co_applicant_relationship'),
  coApplicantIncome: text('co_applicant_income'),
  coApplicantPanNumber: text('co_applicant_pan_number'),

  applicationStatus: applicationStatusEnum('application_status')
    .default('SUBMITTED')
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});


export const quoteRequestsTable = pgTable('quote_requests', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(), 
  phone: text('phone').notNull(),
  loanType: text('loan_type').notNull(),
  loanAmount: integer('loan_amount').notNull(),

  tenure: integer('tenure').notNull(), // in years
  emi: integer('emi'), // pre-calculated EMI (optional)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});


export const newsTable = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(), // full article
  image: text('image').notNull(), // URL
  category: newsCategoryEnum('category').notNull(),
  author: text('author').notNull(),
  publishDate: timestamp('publish_date', { mode: 'string' }).notNull(),
  readTime: text('read_time').notNull(), // e.g., "6 min read"
  views: text('views').default('0'), // e.g., "15.2K"
  link: text('link'), // optional external link
  featured: boolean('featured').default(false),
  tags: text('tags').array(), // stores array of strings
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});

// Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;

export type InsertBusinessApplication = typeof businessApplicationTable.$inferInsert;
export type SelectBusinessApplication = typeof businessApplicationTable.$inferSelect;

export type InsertHomeLoanApplication = typeof homeLoanApplicationTable.$inferInsert;
export type SelectHomeLoanApplication = typeof homeLoanApplicationTable.$inferSelect;

export type InsertCarLoanApplication = typeof carLoanApplicationTable.$inferInsert;
export type SelectCarLoanApplication = typeof carLoanApplicationTable.$inferSelect;

export type InsertEducationLoanApplication = typeof educationLoanApplicationTable.$inferInsert;
export type SelectEducationLoanApplication = typeof educationLoanApplicationTable.$inferSelect;

export type InsertGoldLoanApplication = typeof goldLoanApplicationTable.$inferInsert;
export type SelectGoldLoanApplication = typeof goldLoanApplicationTable.$inferSelect;

export type InsertLapApplication = typeof lapApplicationTable.$inferInsert;
export type SelectLapApplication = typeof lapApplicationTable.$inferSelect;

export type InsertSecuritiesLoanApplication = typeof securitiesLoanApplicationTable.$inferInsert;
export type SelectSecuritiesLoanApplication = typeof securitiesLoanApplicationTable.$inferSelect;

export type InsertPersonalLoanApplication = typeof personalLoanApplicationTable.$inferInsert;
export type SelectPersonalLoanApplication = typeof personalLoanApplicationTable.$inferSelect;

export type InsertQuoteRequest = typeof quoteRequestsTable.$inferInsert;
export type SelectQuoteRequest = typeof quoteRequestsTable.$inferSelect;

export type InsertNews = typeof newsTable.$inferInsert;
export type SelectNews = typeof newsTable.$inferSelect;