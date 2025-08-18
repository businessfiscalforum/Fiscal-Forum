// config/schema.ts
import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
  decimal,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import z from 'zod';

// 🔁 Updated Enums (Aligned with frontend)

// Roles & Status
export const roleEnum = pgEnum('role', ['USER', 'ADMIN', 'AGENT', 'PARTNER']);
export const statusEnum = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED', 'BANNED']);

// 🔄 Loan Type Enum
export const loanTypeEnum = pgEnum('loan_type', [
  'home-loan',
  'property',
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
  'residential',
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

//research
export const reportTypeEnum = pgEnum('report_type', [
  'Quarterly Results',
  'Industry Analysis',
  'Thematic Report',
  'Company Analysis',
]);

export const ratingEnum = pgEnum("rating", ["BUY", "HOLD", "SELL"]);

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


// ✅ Unified Application Table (Single Form - All Loans)
export const applicationsTable = pgTable('applications_table', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  // 🔽 Loan Type Selection
  // type: text('type').notNull().$type<'loan' | 'insurance'>().default('loan'), // main category
  loanType: loanTypeEnum('loan_type'), // 'home-loan', 'personal', etc.
   loanAmountRequired: decimal('loan_amount_required', {
    precision: 14,
    scale: 2,
  }),
  // 👤 APPLICANT PERSONAL INFO
  firstName: text('first_name').notNull(),
  middleName: text('middle_name').notNull(),
  lastName: text('last_name').notNull(),
  fathersName: text('father_name').notNull(),
  // email: text('email').notNull(),
  // phone: text('phone').notNull(),
  pan:varchar('pan').unique().notNull(),
  dob:date('dob').notNull(),
  
  maritalStatus: text('marital_status').$type<'Married' | 'Unmarried' |'Divorced' | 'Widowed'>(), // or enum if preferred
  gender: text('gender').$type<'Male' | 'Female' | 'Other'>(),
  mobile: varchar('mobile').notNull().unique(),
  email: text('email').notNull(),

  // 🏠 CURRENT ADDRESS
  currentAddress1: text('current_address_line1').notNull(),
  currentAddress2: text('current_address_line2'),
  residenceType: text('residence_type').$type<'Rented' | 'Owned' | 'Leased'>(),
  currentPincode: text('current_pincode').notNull(),
  currentCity: text('current_city').notNull(),
  currentState: text('current_state').notNull(),
 

  // 🏡 PERMANENT ADDRESS (Conditional)
  permanenSameAsCurrent: boolean('is_permanent_address_same').default(true),
  permanentAddress1: text('permanent_address_line1'),
  permanentAddress2: text('permanent_address_line2'),
  permanentPincode: text('permanent_pincode'),
  permanentCity: text('permanent_city'),
  permanentState: text('permanent_state'),

  // 💼 EMPLOYMENT
  employmentType: employmentTypeEnum('employment_type'),
  companyName: text('company_name'),
  designation: text('designation'),
  netMonthlySalary: decimal('net_monthly_salary', { precision: 12, scale: 2 }),

  // Employment Address (Detailed)
  companyAddress1: text('company_address1'),
  companyAddress2: text('company_address2'),
  companyPincode: varchar('company_pincode', { length: 10 }),
  companyCity: varchar('company_city', { length: 100 }),
  companyState: varchar('company_state', { length: 100 }),
  currentJobStability: varchar('current_job_stability', {
    enum: ['less_than_6_months', '6_12_months', '1_2_years', '2_plus_years'],
  }),
  totalJobStability: varchar('total_job_stability', {
    enum: ['less_than_1_year', '1_3_years', '3_5_years', '5_plus_years'],
  }),

  // 🤝 CO-APPLICANT (Optional)
  // hasCoApplicant: boolean('has_co_applicant').default(false),
  // coApplicantFirstName: text('co_applicant_first_name'),
  // coApplicantLastName: text('co_applicant_last_name'),
  // coApplicantEmail: text('co_applicant_email'),
  // coApplicantPhone: text('co_applicant_phone'),
  // coApplicantPan: text('co_applicant_pan'),
  // coApplicantDateOfBirth: timestamp('co_applicant_dob', { mode: 'string' }),
  // coApplicantGender: text('co_applicant_gender').$type<'Male' | 'Female' | 'Other'>(),
  // coApplicantRelationship: text('co_applicant_relationship'),
  // coApplicantEmploymentType: employmentTypeEnum('co_applicant_employment_type'),
  // coApplicantCompany: text('co_applicant_company'),
  // coApplicantBusiness: text('co_applicant_business'),
  // coApplicantAnnualIncome: incomeRangeEnum('co_applicant_annual_income'),
  // coApplicantMonthlyIncome: decimal('co_applicant_monthly_income', { precision: 10, scale: 2 }),

  // 🏘️ PROPERTY DETAILS (Home Loan, LAP)
  propertyType: propertyTypeEnum('property_type'),
  // propertyUsage: propertyUsageEnum('property_usage'),
  // propertyAge: integer('property_age'), // for LAP
  propertyAddress1: text('property_address'),
  propertyAddress2: text('property_address'),
  propertyCity: text('property_city'),
  transactionType: text('transaction_type').$type<'New' | 'Resale'>(), // Home Loan
  agreementValue: decimal('agreement_value', { precision: 14, scale: 2 }),
  downPayment: decimal('down_payment', { precision: 15, scale: 2 }),

  // 🚗 CAR LOAN
  carType: carTypeEnum('car_type'),
  carYear: integer('car_year'), 
   carLoanType: varchar('car_loan_type', { enum: ['personal', 'commercial'] }),
  // carModel: text('car_model'),
  // carVariant: text('car_variant'),
  // manufacturingYear: integer('manufacturing_year'),
  // carPrice: decimal('car_price', { precision: 12, scale: 2 }),
  // dealerName: text('dealer_name'),
  // dealerLocation: text('dealer_location'),

  // 🎓 EDUCATION LOAN
  // educationLevel: educationLevelEnum('education_level'),
  // courseType: courseTypeEnum('course_type'),
  courseName: text('course_name'),
  countryName:varchar('country_name', { length: 100 }),
  // courseDuration: integer('course_duration'), // in years
  // institutionName: text('institution_name'),
  // institutionLocation: text('institution_location'),
  // institutionCountry: text('institution_country'),
  // totalCourseFee: decimal('total_course_fee', { precision: 12, scale: 2 }),
  // previousEducation: text('previous_education'),
  // previousMarks: decimal('previous_marks', { precision: 5, scale: 2 }),

  // 🪙 GOLD LOAN
  goldWeightGram: decimal('gold_weight_grams', { precision: 8, scale: 3 }), // grams
  goldPurityKarat: decimal('gold_purity_Karat', { precision: 4, scale: 2 }), // karats
  // goldType: text('gold_type'), // jewelry, coins, bars
  // estimatedValue: decimal('estimated_value', { precision: 12, scale: 2 }),
  // goldItemsDescription: text('gold_items_description'),
  // preferredBranch: text('preferred_branch'),
  // appointmentDate: timestamp('appointment_date', { mode: 'string' }),

  // 📈 SECURITIES LOAN
  securityType: varchar('security_type', {
    enum: ['shares', 'mutual_funds', 'bonds', 'fixed_deposits'],
  }),
  securityValue: decimal('security_value', { precision: 14, scale: 2 }),

  // === EXISTING OBLIGATIONS ===
  currentLoansCount: integer('current_loans_count').default(0).notNull(),

  // === ADDITIONAL DETAILS (Home Loan) ===
  buildersName: varchar('builders_name', { length: 255 }),
  residenceSince: varchar('residence_since', {
    enum: ['less_than_1_year', '1_3_years', '3_5_years', '5_plus_years'],
  }),
  specialName: varchar('special_name', { length: 100 }),

  // portfolioDetails: text('portfolio_details'),
  // dematAccountNumber: text('demat_account_number'),
  // brokerName: text('broker_name'),
  // pledgeableSecurities: text('pledgeable_securities'),
  // averageHoldingPeriod: integer('average_holding_period'), // in months

  // 💼 BUSINESS LOAN
  businessName: varchar('business_name', { length: 255 }),
  businessType: varchar('business_type', {
    enum: ['proprietorship', 'partnership', 'private_limited', 'public_limited'],
  }),
  yearsInBusiness: varchar('years_in_business', {
    enum: ['less_than_1_year', '1_3_years', '3_5_years', '5_plus_years'],
  }),
  annualTurnover: decimal('annual_turnover', { precision: 14, scale: 2 }),
  monthlyProfit: decimal('monthly_profit', { precision: 12, scale: 2 }),
  gstNumber: varchar('gst_number', { length: 15 }),

  // 💰 LOAN REQUEST (Universal)
  // loanAmount: decimal('loan_amount', { precision: 15, scale: 2 }),
  // loanTenure: integer('loan_tenure'), // in months or years (contextual)
  // loanPurpose: text('loan_purpose'),

  // 📉 CREDIT & FINANCIAL
  // creditScore: integer('credit_score'),
  // existingEMIs: decimal('existing_emis', { precision: 10, scale: 2 }).default('0'),

  // 🏦 BANKING DETAILS
  // salaryAccount: text('salary_account'),
  // bankName: text('bank_name'),
  // accountNumber: text('account_number'),

  // 📞 REFERENCES
  reference1Name: varchar('reference1_name', { length: 100 }),
  reference1Mobile: varchar('reference1_mobile', { length: 15 }),
  reference1Address: text('reference1_address'),

  reference2Name: varchar('reference2_name', { length: 100 }),
  reference2Mobile: varchar('reference2_mobile', { length: 15 }),
  reference2Address: text('reference2_address'),

  // 📊 STATUS & METADATA
  applicationStatus: applicationStatusEnum('application_status')
    .default('INITIATED')
    .notNull(),
  paymentMethod: paymentMethodEnum('payment_method'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdateFn(() => new Date()),
});


export const homeLoanApplications = pgTable("home_loan_applications", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  // Applicant Details
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  fatherName: text("father_name").notNull(),
  dateOfBirth: varchar("date_of_birth", { length: 20 }).notNull(),
  maritalStatus: varchar("marital_status", { length: 20 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  mobileNo: varchar("mobile_no", { length: 15 }).notNull(),
  emailId: text("email_id").notNull(),
  homeAddress1: text("home_address1").notNull(),
  homeAddress2: text("home_address2"),
  residenceType: varchar("residence_type", { length: 20 }).notNull(),
  pincode: varchar("pincode", { length: 6 }).notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),

  // Employment Details
  employmentType: varchar("employment_type", { length: 20 }).notNull(),
  companyName: text("company_name"),
  designation: text("designation"),
  netMonthlySalary: integer("net_monthly_salary").notNull(),

  // Property Details
  propertyType: varchar("property_type", { length: 20 }).notNull(),
  agreementValue: integer("agreement_value").notNull(),
  loanAmountRequired: integer("loan_amount_required").notNull(),
  propertyAddressLine1: text("property_address_line1").notNull(),
  propertyAddressLine2: text("property_address_line2"),
  propertyCity: text("property_city").notNull(),

  // Existing Obligations
  noOfCurrentLoans: integer("no_of_current_loans").notNull(),
  existingLoanType: varchar("existing_loan_type", { length: 20 }),

  // Additional Details
  builderName: text("builder_name").notNull(),
  residenceSince: varchar("residence_since", { length: 20 }).notNull(),
  specialName: text("special_name"),

  // References
  reference1Name: text("reference1_name").notNull(),
  reference1Mobile: varchar("reference1_mobile", { length: 15 }).notNull(),
  reference1Address: text("reference1_address").notNull(),

  reference2Name: text("reference2_name").notNull(),
  reference2Mobile: varchar("reference2_mobile", { length: 15 }).notNull(),
  reference2Address: text("reference2_address").notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});


export const lapApplications = pgTable('lap_applications', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  fatherName: varchar('father_name', { length: 50 }),
  dob: date('dob'),
  panNumber: varchar('pan_number', { length: 10 }),
  email: varchar('email', { length: 100 }),
  mobileNo: varchar('mobile_no', { length: 15 }),
  gender: varchar('gender', { length: 20 }).$type<'Male' | 'Female' | 'Others'>(),
  maritalStatus: varchar('marital_status', { length: 20 }).$type<'Married' | 'Unmarried'>(),
  currentAddress1: text('current_address_1'),
  currentAddress2: text('current_address_2'),
  residenceType: varchar('residence_type', { length: 20 }).$type<'Rented' | 'Owned'>(),
  city: varchar('city', { length: 50 }),
  state: varchar('state', { length: 50 }),
  pincode: varchar('pincode', { length: 10 }),
  permanentSameAsCurrent: boolean('permanent_same_as_current').default(false),
  employmentType: varchar('employment_type', { length: 20 }).$type<'Salaried' | 'Self Employed'>(),
  companyName: varchar('company_name', { length: 100 }),
  designation: varchar('designation', { length: 50 }),
  companyAddress1: text('company_address_1'),
  companyAddress2: text('company_address_2'),
  companyCity: varchar('company_city', { length: 50 }),
  companyState: varchar('company_state', { length: 50 }),
  monthlySalary: integer('monthly_salary').notNull(),
  experienceInMonths: integer('experience_in_months'),
  currentJobStability: varchar('current_job_stability', { length: 20 }).$type<'Less than 6 months' | '6-12 months' | '1-2 years' | 'More than 2 years'>(),
  propertyType: varchar('property_type', { length: 20 }).$type<'Residential' | 'Commercial'>(),
  agreementValue: integer('agreement_value') ,
  loanAmountRequired: integer('loan_amount_required').notNull(),
  propertyAddress1: text('property_address_1'),
  propertyAddress2: text('property_address_2'),
  propertyCity: varchar('property_city', { length: 50 }),
  propertyState: varchar('property_state', { length: 50 }),
  existingLoansCount: integer('existing_loans_count').default(0),
  existingLoanType: varchar("existing_loan_type", { length: 20 }),
  reference1Name: text("reference1_name").notNull(),
  reference1Mobile: varchar("reference1_mobile", { length: 15 }).notNull(),
  reference1Address: text("reference1_address").notNull(),

  reference2Name: text("reference2_name").notNull(),
  reference2Mobile: varchar("reference2_mobile", { length: 15 }).notNull(),
  reference2Address: text("reference2_address").notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
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
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content').notNull(),
  image: varchar('image', { length: 500 }), // URL to image
  category: varchar('category', { length: 100 }).notNull(),
  author: varchar('author', { length: 100 }).notNull(),
  publishDate: timestamp('publish_date').defaultNow().notNull(),
  readTime: varchar('read_time', { length: 50 }),
  views: varchar('views').notNull(),
  link: varchar('link', { length: 500 }).notNull(),
  featured: boolean('featured').default(false),
  tags: text('tags'), // JSON string array
  // IPO specific fields (optional)
  ipoName: varchar('ipo_name', { length: 255 }),
  companyName: varchar('company_name', { length: 255 }),
  priceRange: varchar('price_range', { length: 100 }),
  issueSize: varchar('issue_size', { length: 100 }),
  listingDate: varchar('listing_date', { length: 100 }),
  currentPrice: varchar('current_price', { length: 100 }),
  listingGain: varchar('listing_gain', { length: 100 }),
  subscriptionRate: varchar('subscription_rate', { length: 100 }),
});
//research

export const researchReportsTable = pgTable("research_reports", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  stock: text("stock").notNull(),
  company: text("company").notNull(),
  author: text("author").notNull(),
  authorFirm: text("author_firm").notNull(),
  date: timestamp("date", { mode: "string" }).notNull(), // "2024-01-25"
  sector: text("sector").notNull(),
  reportType: reportTypeEnum("report_type").notNull(),
  rating: ratingEnum("rating").notNull(),
  targetPrice: text("target_price").notNull(),
  currentPrice: text("current_price").notNull(),
  upside: text("upside").notNull(),
  pages: integer("pages").notNull(),
  views: integer("views").notNull().default(0),
  recommendation: text("recommendation").notNull(),
  tags: text("tags").array(), // ["Banking", "NPA Analysis"]
  summary: text("summary").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});

export const subscribers = pgTable('subscribers', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});



export const dematApplications = pgTable("demat_applications", {
  id: uuid("id").defaultRandom().notNull().primaryKey().unique(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  pan: varchar("pan", { length: 10 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const dematTransferRequests = pgTable('demat_transfer_requests', {
  id: uuid("id").defaultRandom().notNull().primaryKey().unique(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 15 }).notNull(),
  currentBroker: text('current_broker').default('Motilal Oswal'),
  newClientId: text('new_client_id').notNull(),
  publicFileUrl: text('public_file_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const investmentProfiles = pgTable('investment_profiles', {
  id: uuid("id").defaultRandom().notNull().primaryKey().unique(),
  name: text('name').notNull(),
  clientCode: varchar('client_code', { length: 50 }).notNull(),
  panNo: varchar('pan_no', { length: 10 }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  consistency: text('consistency').notNull(),
  traderType: text('trader_type').notNull(),
  existingBroker: text('existing_broker').notNull(),
  investmentType: text('investment_type').notNull(), 
  createdAt: timestamp('created_at').defaultNow(),
},(table) => {
  return {
    panRegexCheck: check('pan_regex_check', sql`${table.panNo} ~ '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'`),
  };
});

export const savingsApplications = pgTable("savings_applications", {
  id: uuid("id").defaultRandom().notNull().primaryKey().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  mobileNo: varchar("mobile_no", { length: 15 }).notNull(),
  panNo: varchar("pan_no", { length: 20 }).notNull(),
  pincode: varchar("pincode", { length: 10 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  district: varchar("district", { length: 100 }).notNull(),
  bankType: varchar("bank_type", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
},(table) => {
  return {
    panRegexCheck: check('pan_regex_check', sql`${table.panNo} ~ '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'`),
  };
});
// Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;


export type InsertQuoteRequest = typeof quoteRequestsTable.$inferInsert;
export type SelectQuoteRequest = typeof quoteRequestsTable.$inferSelect;

export type InsertNews = typeof newsTable.$inferInsert;
export type SelectNews = typeof newsTable.$inferSelect;

export type InsertResearchReport = typeof researchReportsTable.$inferInsert;
export type SelectResearchReport = typeof researchReportsTable.$inferSelect;

export type InsertSubscribers = typeof subscribers.$inferInsert;
export type SelectSubscribers = typeof subscribers.$inferSelect;

export type InsertDemat = typeof dematApplications.$inferInsert;
export type SelectDemat = typeof dematApplications.$inferSelect

export type InsertDematTransferApplication = typeof dematTransferRequests.$inferInsert;
export type SelectDematTransferApplication = typeof dematTransferRequests.$inferSelect;

export type InsertInvestmentForm = typeof investmentProfiles.$inferInsert;
export type SelectInvestmentForm = typeof investmentProfiles.$inferSelect;

export type InsertHomeApp = typeof homeLoanApplications.$inferInsert;
export type SelectHomeApp = typeof homeLoanApplications.$inferSelect

export type InsertLapApplication = typeof lapApplications.$inferInsert;
export type SelectLapApplication = typeof lapApplications.$inferSelect;