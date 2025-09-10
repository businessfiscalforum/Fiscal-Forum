// config/schema.ts
import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  date,
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
  'property',
  'personal',
  'business',
  'gold',
  'car',
  'education',
  'securities',
]);

export const vehicleInsuranceTypeEnum = pgEnum("vehicle_insurance_type", [
  "OD",
  "Comprehensive",
  "Third party",
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
  'Pre-Market Research Report',
  'Quarterly Results',
  'Industry Analysis',
  'Thematic Research Report',
  'Company Analysis',
  'Equity Research Report'
]);

export const RequestStatusEnum = pgEnum('request_status', [
  'Pending',
  'Approved',
  'Rejected',
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
  referCode: varchar('refer_code', { length: 8 }).unique(),
  referrerCode: varchar('referrer_code', { length: 8 }),
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
  panNumber: varchar('pan_number', { length: 10 }).notNull(), // Optional
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),

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
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  email: varchar('email', { length: 100 }),
  mobileNo: varchar('mobile_no', { length: 15 }),
  gender: varchar('gender', { length: 20 }).$type<'Male' | 'Female' | 'Others'>(),
  maritalStatus: varchar('marital_status', { length: 20 }).$type<'Married' | 'Unmarried'>(),
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),
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


export const personalLoanApplications = pgTable('personal_loan_applications', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  
  // Applicant Details
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  fatherName: varchar('father_name', { length: 100 }).notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  emailId: varchar('email_id', { length: 100 }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  gender: varchar('gender', { length: 20 }).$type<'Male' | 'Female' | 'Others'>().notNull(),
  maritalStatus: varchar('marital_status', { length: 20 }).$type<'Married' | 'Unmarried' | 'Others'>().notNull(),
  
  // Current Address
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),
  
  // Employment Details
  employmentType: varchar('employment_type', { length: 20 }).$type<'Company' | 'Self-Employed'>().notNull(),
  companyName: varchar('company_name', { length: 100 }),
  designation: varchar('designation', { length: 50 }),
  netMonthlySalary: integer('net_monthly_salary'),
  
  // Loan Details
  loanAmountRequired: integer('loan_amount_required').notNull(),
  
  // Existing Obligations
  noOfCurrentLoans: integer('no_of_current_loans').notNull(),
  existingLoanType: varchar("existing_loan_type", { length: 20 }).$type<'None' | 'Personal' | 'Car' | 'Education' | 'Other'>(),
  
  // References (in same table) - Flattened
  reference1Name: text("reference1_name").notNull(),
  reference1Mobile: varchar("reference1_mobile", { length: 15 }).notNull(),
  reference1Address: text("reference1_address").notNull(),
  
  reference2Name: text("reference2_name").notNull(),
  reference2Mobile: varchar("reference2_mobile", { length: 15 }).notNull(),
  reference2Address: text("reference2_address").notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

export const businessLoanApplications = pgTable('business_loan_applications', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  // Applicant Details
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  fatherName: varchar('father_name', { length: 100 }).notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(), // Optional
  emailId: varchar('email_id', { length: 100 }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  gender: varchar('gender', { length: 20 }).$type<'Male' | 'Female' | 'Others'>().notNull(),
  maritalStatus: varchar('marital_status', { length: 20 }).$type<'Married' | 'Unmarried' | 'Others'>().notNull(),
  
  // Current Address
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),
  
  // Employment Details
  employmentType: varchar('employment_type', { length: 20 }).$type<'Company' | 'Self-Employed'>().notNull(),
  companyName: varchar('company_name', { length: 100 }),
  designation: varchar('designation', { length: 50 }),
  netMonthlySalary: integer('net_monthly_salary'),
  
  // Business Details
  businessName: varchar('business_name', { length: 100 }).notNull(),
  businessType: varchar('business_type', { length: 50 }).$type<'Sole Proprietorship' | 'Partnership' | 'Private Limited' | 'Public Limited' | 'LLP'>().notNull(),
  yearsInBusiness: integer('years_in_business'),
  gstNumber: varchar('gst_number', { length: 15 }),
  annualTurnover: integer('annual_turnover'),
  monthlyProfit: integer('monthly_profit'),
  
  // Loan Details
  loanAmountRequired: integer('loan_amount_required').notNull(),
  
  // Existing Obligations
  noOfCurrentLoans: integer('no_of_current_loans').notNull(),
  existingLoanType: varchar("existing_loan_type", { length: 20 }).$type<'None' | 'Personal' | 'Car' | 'Education' | 'Other'>(),
  
  // References (in same table)
  reference1Name: text("reference1_name").notNull(),
  reference1Mobile: varchar("reference1_mobile", { length: 15 }).notNull(),
  reference1Address: text("reference1_address").notNull(),
  
  reference2Name: text("reference2_name").notNull(),
  reference2Mobile: varchar("reference2_mobile", { length: 15 }).notNull(),
  reference2Address: text("reference2_address").notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});


export const goldLoanApplications = pgTable('gold_loan_applications', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  
  // Applicant Details
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  fatherName: varchar('father_name', { length: 100 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(), // Optional
  dateOfBirth: date('date_of_birth').notNull(),
  maritalStatus: varchar('marital_status', { length: 10 }).$type<'Married' | 'Unmarried'>().notNull(),
  gender: varchar('gender', { length: 20 }).$type<'Male' | 'Female' | 'Others'>().notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  emailId: varchar('email_id', { length: 100 }).notNull(),
  
  // Current Address
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),
  
  // Gold Loan Details
  goldWeight: integer('gold_weight'), // Weight in grams
  goldPurity: varchar('gold_purity', { length: 10 }).$type<'22K' | '24K' | '18K' | '14K' | 'Other'>(),
  
  // Loan Details
  loanAmountRequired: integer('loan_amount_required').notNull(),
  
  // Existing Obligations
  noOfCurrentLoans: integer('no_of_current_loans').notNull(),
  existingLoanType: varchar("existing_loan_type", { length: 20 }).$type<'None' | 'Personal' | 'Car' | 'Education' | 'Other'>(),
  
  // References (in same table)
  reference1Name: text("reference1_name").notNull(),
  reference1Mobile: varchar("reference1_mobile", { length: 15 }).notNull(),
  reference1Address: text("reference1_address").notNull(),
  
  reference2Name: text("reference2_name").notNull(),
  reference2Mobile: varchar("reference2_mobile", { length: 15 }).notNull(),
  reference2Address: text("reference2_address").notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

export const carLoanApplications = pgTable('car_loan_applications', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  
  // Applicant Details
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  fatherName: varchar('father_name', { length: 100 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(), // Optional
  dateOfBirth: date('date_of_birth').notNull(),
  maritalStatus: varchar('marital_status', { length: 20 }).$type<'Married' | 'Unmarried' | 'Others'>().notNull(),
  gender: varchar('gender', { length: 20 }).$type<'Male' | 'Female' | 'Others'>().notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  emailId: varchar('email_id', { length: 100 }).notNull(),
  
  // Current Address
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),
  
  // Employment Details
  employmentType: varchar('employment_type', { length: 20 }).$type<'Company' | 'Self-Employed'>().notNull(),
  companyName: varchar('company_name', { length: 100 }),
  designation: varchar('designation', { length: 50 }),
  netMonthlySalary: integer('net_monthly_salary'),
  
  // Car Details
  carType: varchar('car_type', { length: 20 }).$type<'Sedan' | 'Hatchback' | 'SUV' | 'MUV' | 'Other'>(),
  year: integer('year'),
  loanType: varchar('loan_type', { length: 20 }).$type<'New Car' | 'Used Car' | 'Finance Only'>(),
  
  // Loan Details
  loanAmountRequired: integer('loan_amount_required').notNull(),
  
  // Existing Obligations
  noOfCurrentLoans: integer('no_of_current_loans').notNull(),
  existingLoanType: varchar("existing_loan_type", { length: 20 }).$type<'None' | 'Personal' | 'Car' | 'Education' | 'Other'>(),
  
  // References (in same table)
  reference1Name: text("reference1_name").notNull(),
  reference1Mobile: varchar("reference1_mobile", { length: 15 }).notNull(),
  reference1Address: text("reference1_address").notNull(),
  
  reference2Name: text("reference2_name").notNull(),
  reference2Mobile: varchar("reference2_mobile", { length: 15 }).notNull(),
  reference2Address: text("reference2_address").notNull(),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});


export const educationLoanApplications = pgTable('education_loan_applications', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  

  // Applicant Details
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName: varchar('last_name', { length: 50 }).notNull(),
  fatherName: varchar('father_name', { length: 50 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }).notNull(),
  maritalStatus: varchar('marital_status', { length: 10, enum: ['Married', 'Unmarried', 'Others'] }),
  gender: varchar('gender', { length: 10, enum: ['Male', 'Female', 'Others'] }),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  emailId: varchar('email_id', { length: 100 }).notNull().unique(),
  
  // Address
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),
  
  // Employment
  employmentType: varchar('employment_type', { length: 15, enum: ['Company', 'Self-Employed'] }),
  companyName: varchar('company_name', { length: 100 }),
  designation: varchar('designation', { length: 100 }),
  netMonthlySalary: integer('net_monthly_salary'),
  
  // Course Details
  courseType: varchar('course_type', { length: 20, enum: ['Undergraduate', 'Postgraduate', 'PhD', 'Diploma', 'Certificate', 'Other'] }),
  courseName: varchar('course_name', { length: 100 }).notNull(),
  universityName: varchar('university_name', { length: 100 }).notNull(),
  countryName: varchar('country_name', { length: 50 }).notNull(),
  
  // Loan Amount
  loanAmountRequired: integer('loan_amount_required').notNull(),
  
  // Existing Obligations
  noOfCurrentLoans: integer('no_of_current_loans').default(0).$defaultFn(() => 0),
  existingLoanType: varchar('existing_loan_type', { length: 15, enum: ['None', 'Personal', 'Car', 'Education', 'Other'] }),
  
  // References
  reference1Name: varchar('reference1_name', { length: 50 }).notNull(),
  reference1Mobile: varchar('reference1_mobile', { length: 15 }).notNull(),
  reference1Address: text('reference1_address').notNull(),
  
  reference2Name: varchar('reference2_name', { length: 50 }).notNull(),
  reference2Mobile: varchar('reference2_mobile', { length: 15 }).notNull(),
  reference2Address: text('reference2_address').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const lasApplication = pgTable('loan_against_securities', {
  // Primary key
  id: uuid("id").defaultRandom().primaryKey().notNull(),

  // Applicant Details
  firstName: varchar('first_name', { length: 255 }).notNull(),
  middleName: varchar('middle_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  fatherName: varchar('father_name', { length: 255 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  dateOfBirth: varchar('date_of_birth', { length: 20 }).notNull(), // Storing as varchar as it comes from a date input
  maritalStatus: varchar('marital_status', { enum: ["Married", "Unmarried", "Others"] }).notNull(),
  gender: varchar('gender', { enum: ["Male", "Female", "Others"] }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  emailId: varchar('email_id', { length: 255 }).notNull(),
  
  // Current Address
  currentHomeAddress1: text("current_home_address1").notNull(),
  currentHomeAddress2: text("current_home_address2"),
  currentResidenceType: varchar("current_residence_type", { length: 20 }).notNull(),
  currentPincode: varchar("current_pincode", { length: 6 }).notNull(),
  currentState: text("current_state").notNull(),
  currentCity: text("current_city").notNull(),
  permanentAddressSame: boolean("permanent_address_same").default(false),
  permanentHomeAddress1: text("permanent_home_address1").notNull(),
  permanentHomeAddress2: text("permanent_home_address2"),
  permanentResidenceType: varchar("permanent_residence_type", { length: 20 }).notNull(),
  permanentPincode: varchar("permanent_pincode", { length: 6 }).notNull(),
  permanentState: text("permanent_state").notNull(),
  permanentCity: text("permanent_city").notNull(),

  // Securities Details
  securityType: varchar('security_type', { enum: ["Gold", "Silver", "Jewelry", "Property", "Other"] }),
  securityValue: decimal('security_value', { precision: 14, scale: 2 }).notNull(),
  requiredLoanAmount: decimal('required_loan_amount', { precision: 14, scale: 2 }).notNull(),
  
  // Loan Amount Required (Duplicate field from schema, but included as requested)
  loanAmountRequired: decimal('loan_amount_required', { precision: 14, scale: 2 }).notNull(),
  
  // Existing Obligations
  noOfCurrentLoans: integer('no_of_current_loans').notNull(),
  existingLoanType: varchar('existing_loan_type', { enum: ["None", "Personal", "Car", "Education", "Other"] }),
  
  // References (Stored as JSONB)
  reference1Name: varchar('reference1_name', { length: 50 }).notNull(),
  reference1Mobile: varchar('reference1_mobile', { length: 15 }).notNull(),
  reference1Address: text('reference1_address').notNull(),

  reference2Name: varchar('reference2_name', { length: 50 }).notNull(),
  reference2Mobile: varchar('reference2_mobile', { length: 15 }).notNull(),
  reference2Address: text('reference2_address').notNull(),
});

export const scheduledCalls = pgTable("scheduled_calls", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  countryCode: varchar("country_code", { length: 10 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  date: date("date").notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  message: text("message"),
  preferredContactMethod: varchar("preferred_contact_method", { 
    enum: ["call", "whatsapp", "email"] 
  }).default("call"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  title: varchar('title', { length: 255 }),
  description: text('description'),
  content: text('content'),
  image: varchar('image', { length: 500 }), // URL to image
  category: varchar('category', { length: 100 }),
  author: varchar('author', { length: 100 }),
  publishDate: timestamp('publish_date').defaultNow(),
  readTime: varchar('read_time', { length: 50 }),
  link: varchar('link', { length: 500 }),
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

export const newsletter = pgTable("newsletter", {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  content: text('content'),
  image: varchar('image', { length: 500 }),
  author: varchar('author', { length: 100 }),
  publishDate: timestamp('publish_date').defaultNow(),
});

export const researchReportsTable = pgTable("research_reports", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title"),
  stock: text("stock"),
  company: text("company"),
  author: text("author"),
  authorFirm: text("author_firm"),
  publishDate: timestamp("publish_date", { mode: "string" }), 
  sector: text("sector"),
  reportType: reportTypeEnum("report_type"),
  rating: ratingEnum("rating"),
  targetPrice: text("target_price"),
  currentPrice: text("current_price"),
  upside: text("upside"),
  pages: integer("pages"),
  recommendation: text("recommendation"),
  tags: text("tags").array(),
  summary: text("summary"),
  pdfUrl: text("pdf_url"),
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
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  clientCode: varchar('client_code', { length: 100 }).notNull(),
  panNo: varchar('pan_no', { length: 10 }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  consistency: varchar('consistency', { length: 20 }).notNull(),
  traderType: text('trader_type').notNull(),
  existingBroker: varchar('existing_broker', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const unlistedShares = pgTable('unlisted_shares', {
   id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  clientCode: varchar('client_code', { length: 100 }).notNull(),
  panNo: varchar('pan_no', { length: 10 }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  consistency: varchar('consistency', { length: 20 }).notNull(),
  traderType: text('trader_type').notNull(), 
  existingBroker: varchar('existing_broker', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
// Car Insurance Requests
export const carInsuranceRequests = pgTable('car_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 15 }).notNull(),
  previousInsurer: varchar('previous_insurer', { length: 255 }),
  policyExpiry: varchar('policy_expiry', { length: 20 }), // dd/mm/yyyy from UI
  rcLink: text('rc_link').notNull(),
  prevInsuranceLink: text('prev_insurance_link').notNull(),
  insurerPrefs: text('insurer_prefs'), // JSON string of selected insurers
  otherInsurer: varchar('other_insurer', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  registrationNumber: varchar("registration_number", { length: 20 }).notNull(),
  insuranceType: vehicleInsuranceTypeEnum("vehicle_insurance_type").notNull(),
});

// Health Insurance Requests
export const healthInsuranceRequests = pgTable('health_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 15 }).notNull(),
  policyType: varchar('policy_type', { length: 50 }).notNull(),
  membersCount: integer('members_count'),
  memberAges: text('member_ages'),
  preExistingDiseases: text('pre_existing_diseases'),
  previousInsurer: varchar('previous_insurer', { length: 255 }),
  policyExpiry: varchar('policy_expiry', { length: 20 }),
  prevPolicyLink: text('prev_policy_link'),
  insurerPrefs: text('insurer_prefs'),
  otherInsurer: varchar('other_insurer', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Life Insurance Requests
export const lifeInsuranceRequests = pgTable('life_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 15 }).notNull(),
  dob: varchar('dob', { length: 20 }),
  gender: varchar('gender', { length: 20 }),
  occupation: varchar('occupation', { length: 255 }),
  policyTypes: text('policy_types'), // JSON string array
  sumAssured: decimal('sum_assured', { precision: 14, scale: 2 }),
  policyTermYears: integer('policy_term_years'),
  premiumFrequency: varchar('premium_frequency', { length: 50 }), // Monthly/Quarterly/Half-Yearly/Yearly
  hasExistingPolicy: boolean('has_existing_policy').default(false),
  existingInsurer: varchar('existing_insurer', { length: 255 }),
  prevPolicyLink: text('prev_policy_link'),
  insurerPrefs: text('insurer_prefs'), // JSON string array
  otherInsurer: varchar('other_insurer', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Two Wheeler Insurance Requests
export const twoWheelerInsuranceRequests = pgTable('two_wheeler_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 15 }).notNull(),
  previousInsurer: varchar('previous_insurer', { length: 255 }),
  policyExpiry: varchar('policy_expiry', { length: 20 }),
  rcLink: text('rc_link'),
  prevInsuranceLink: text('prev_insurance_link'),
  insurerPrefs: text('insurer_prefs'), // JSON string array
  otherInsurer: varchar('other_insurer', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  registrationNumber: varchar("registration_number", { length: 20 }).notNull(),
  insuranceType: vehicleInsuranceTypeEnum("vehicle_insurance_type").notNull(),
});

export const commercialVehicleInsuranceRequests = pgTable('commercial_vehicle_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  // Personal Information
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 15 }).notNull(),
  businessName: varchar('business_name', { length: 255 }),
  businessType: varchar('business_type', { length: 100 }),
  gstNumber: varchar('gst_number', { length: 50 }),
  
  // Vehicle Information
  vehicleType: varchar('vehicle_type', { length: 100 }).notNull(), // Truck, Bus, Van, etc.
  vehicleMake: varchar('vehicle_make', { length: 100 }),
  vehicleModel: varchar('vehicle_model', { length: 100 }),
  vehicleYear: varchar('vehicle_year'),
  vehicleCapacity: varchar('vehicle_capacity', { length: 50 }), // Tonnage/Seating capacity
  vehicleValue: decimal('vehicle_value', { precision: 14, scale: 2 }),
  
  // Insurance Details
  previousInsurer: varchar('previous_insurer', { length: 255 }),
  policyExpiry: varchar('policy_expiry', { length: 20 }),
  currentPolicyNumber: varchar('current_policy_number', { length: 100 }),
  
  // Business Operations
  primaryUse: varchar('primary_use', { length: 100 }), // Goods transport, Passenger transport, etc.
  operatingArea: varchar('operating_area', { length: 255 }), // City, State, National
  annualMileage: varchar('annual_mileage', { length: 50 }),
  
  // Coverage Requirements
  coverageType: text('coverage_type'), // JSON string array: Third Party, Comprehensive, etc.
  additionalCovers: text('additional_covers'), // JSON string array: Roadside assistance, etc.
  
  // Documents
  rcLink: text('rc_link'),
  prevInsuranceLink: text('prev_insurance_link'),
  businessLicenseLink: text('business_license_link'),
  gstCertificateLink: text('gst_certificate_link'),
  
  // Insurer Preferences
  insurerPrefs: text('insurer_prefs'), // JSON string array
  otherInsurer: varchar('other_insurer', { length: 255 }),
  
  // Additional Information
  specialRequirements: text('special_requirements'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const personalAccidentInsuranceRequests = pgTable('personal_accident_insurance_requests', {
	id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }), // Added userId column
	// Personal Details
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }),
	phone: varchar('phone', { length: 15 }).notNull(),
	dob: varchar('dob', { length: 20 }), // dd/mm/yyyy
	occupation: varchar('occupation', { length: 255 }),
	// Policy Requirements
	coverageType: text('coverage_type'), // JSON string array: ["Individual", "Family Coverage"]
	sumInsured: varchar('sum_insured'), // Schema defines this as varchar
	policyTermYears: varchar('policy_term_years'), // Schema defines this as varchar
	coverageOptions: text('coverage_options'), // JSON string array: Accidental Death, Permanent Disability, etc.
	// Existing Policy
	hasExistingPolicy: boolean('has_existing_policy').default(false),
	existingInsurer: varchar('existing_insurer', { length: 255 }),
	prevPolicyLink: text('prev_policy_link'),
	// Insurer Preference
	insurerPrefs: text('insurer_prefs'), // JSON string array
	otherInsurer: varchar('other_insurer', { length: 255 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const propertyInsuranceRequests = pgTable('property_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
	userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
	// Personal Details
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }),
	phone: varchar('phone', { length: 15 }).notNull(),
	propertyAddress: text('property_address'),
	// Property Details
	propertyType: varchar('property_type', { length: 50 }).notNull(), // Home, Shop/Business
	propertyOwnership: varchar('property_ownership', { length: 20 }), // Owned, Rented
	propertyValue: varchar('property_value'),
	contentsValue: varchar('contents_value'),
	constructionType: varchar('construction_type', { length: 50 }), // RCC, Non-RCC, Other
	yearOfConstruction: integer('year_of_construction'),
	// Coverage
	coverageOptions: text('coverage_options'), // JSON string array
	// Existing Policy
	hasExistingPolicy: boolean('has_existing_policy').default(false),
	existingInsurer: varchar('existing_insurer', { length: 255 }),
	policyExpiry: varchar('policy_expiry', { length: 20 }), // dd/mm/yyyy
	prevPolicyLink: text('prev_policy_link'),
	// Insurer Preference
	insurerPrefs: text('insurer_prefs'), // JSON string array
	otherInsurer: varchar('other_insurer', { length: 255 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const travelInsuranceRequests = pgTable('travel_insurance_requests', {
  id: uuid('id').defaultRandom().notNull().primaryKey().unique(),
	userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
	// Personal Details
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }),
	phone: varchar('phone', { length: 15 }).notNull(),
	dob: varchar('dob', { length: 20 }), // dd/mm/yyyy
	passportNumber: varchar('passport_number', { length: 30 }),
	// Trip Details
	travelType: varchar('travel_type', { length: 50 }).notNull(), // Single Trip | Multi-Trip (Annual)
	destinations: text('destinations'),
	startDate: varchar('start_date', { length: 20 }), // dd/mm/yyyy
	endDate: varchar('end_date', { length: 20 }), // dd/mm/yyyy
	numTravellers: integer('num_travellers'),
	travellerAges: text('traveller_ages'), // free text or JSON array
	// Coverage Requirements
	coverageOptions: text('coverage_options'), // JSON string array
	// Existing Policy
	hasExistingPolicy: boolean('has_existing_policy').default(false),
	existingInsurer: varchar('existing_insurer', { length: 255 }),
	prevPolicyLink: text('prev_policy_link'),
	// Insurer Preference
	insurerPrefs: text('insurer_prefs'), // JSON string array
	otherInsurer: varchar('other_insurer', { length: 255 }),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const mfPreferences = pgTable('mf_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  clientId: varchar('client_id', { length: 100 }).notNull(),
  fundType: varchar('fund_type', { length: 255 }).notNull(), 
  company: varchar('company', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const mfTransferForms = pgTable('mf_transfer_forms', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  clientCode: varchar('client_code', { length: 100 }).notNull(),
  panNo: varchar('pan_no', { length: 10 }).notNull(),
  mobileNo: varchar('mobile_no', { length: 15 }).notNull(),
  typeofInvestment: text('type_of_investment').notNull(), // Store as comma-separated string
  existingBroker: varchar('existing_broker', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Schema for document submission form
export const documentSubmissions = pgTable('document_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  documentSent: boolean('document_sent').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const businessDevelopmentPartner = pgTable('buisness_development_partner', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  accountNumber: varchar('account_number', { length: 20 }).notNull(),
  ifscCode: varchar('ifsc_code', { length: 11 }).notNull(),
  aadhaar: varchar('aadhaar_number', { length: 12 }).notNull(),
});

export const remisorship = pgTable('remisorship', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  accountNumber: varchar('account_number', { length: 20 }).notNull(),
  ifscCode: varchar('ifsc_code', { length: 11 }).notNull(),
  aadhaar: varchar('aadhaar_number', { length: 12 }).notNull(),
});

export const b2bPartner = pgTable('b2b_partner', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  panNumber: varchar('pan_number', { length: 10 }).notNull(),
  accountNumber: varchar('account_number', { length: 20 }).notNull(),
  ifscCode: varchar('ifsc_code', { length: 11 }).notNull(),
  aadhaar: varchar('aadhaar_number', { length: 12 }).notNull(),
});

export const customReportsRequest = pgTable('custom_reports_request', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  mobile: varchar('mobile', { length: 15 }).notNull(),
  topic: varchar('topic').notNull(),
});

export const materials = pgTable('materials', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title'),
  link: varchar('link'),
});

export const partnerRequests = pgTable('partner_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type'),
  subType: varchar('sub_type'),
  name: varchar('name'),
  mobile: varchar('mobile', {length: 10}),
  email: varchar('email'),
  status: RequestStatusEnum('status').default("Pending"),
  userId: varchar("user_id").notNull(),
});

// Types
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertQuoteRequest = typeof quoteRequestsTable.$inferInsert;
export type SelectQuoteRequest = typeof quoteRequestsTable.$inferSelect;

export type InsertNews = typeof newsTable.$inferInsert;
export type SelectNews = typeof newsTable.$inferSelect;

export type InsertNewsLetters = typeof newsletter.$inferInsert;
export type SelectNewsLetters = typeof newsletter.$inferSelect;

export type InsertResearchReport = typeof researchReportsTable.$inferInsert;
export type SelectResearchReport = typeof researchReportsTable.$inferSelect;

export type InsertSubscribers = typeof subscribers.$inferInsert;
export type SelectSubscribers = typeof subscribers.$inferSelect;

export type InsertDemat = typeof dematApplications.$inferInsert;
export type SelectDemat = typeof dematApplications.$inferSelect

export type InsertDematTransferApplication = typeof dematTransferRequests.$inferInsert;
export type SelectDematTransferApplication = typeof dematTransferRequests.$inferSelect;

export type InsertInvestmentForm = typeof unlistedShares.$inferInsert;
export type SelectInvestmentForm = typeof unlistedShares.$inferSelect

export type InsertCarInsuranceRequest = typeof carInsuranceRequests.$inferInsert;
export type SelectCarInsuranceRequest = typeof carInsuranceRequests.$inferSelect;

export type InsertHealthInsuranceRequest = typeof healthInsuranceRequests.$inferInsert;
export type SelectHealthInsuranceRequest = typeof healthInsuranceRequests.$inferSelect;

export type InsertLifeInsuranceRequest = typeof lifeInsuranceRequests.$inferInsert;
export type SelectLifeInsuranceRequest = typeof lifeInsuranceRequests.$inferSelect;

export type InsertTwoWheelerInsuranceRequest = typeof twoWheelerInsuranceRequests.$inferInsert;
export type SelectTwoWheelerInsuranceRequest = typeof twoWheelerInsuranceRequests.$inferSelect;

export type InsertCommercialVehicleInsuranceRequest = typeof commercialVehicleInsuranceRequests.$inferInsert;
export type SelectCommercialVehicleInsuranceRequest = typeof commercialVehicleInsuranceRequests.$inferSelect;

export type InsertPersonalAccidentInsuranceRequest = typeof personalAccidentInsuranceRequests.$inferInsert;
export type SelectPersonalAccidentInsuranceRequest = typeof personalAccidentInsuranceRequests.$inferSelect;

export type InsertPropertyInsuranceRequest = typeof propertyInsuranceRequests.$inferInsert;
export type SelectPropertyInsuranceRequest = typeof propertyInsuranceRequests.$inferSelect;

export type InsertTravelInsuranceRequest = typeof travelInsuranceRequests.$inferInsert;
export type SelectTravelInsuranceRequest = typeof travelInsuranceRequests.$inferSelect;

export type InsuranceType = (typeof vehicleInsuranceTypeEnum.enumValues)[number];

export type InsertHomeApp = typeof homeLoanApplications.$inferInsert;
export type SelectHomeApp = typeof homeLoanApplications.$inferSelect

export type InsertLapApplication = typeof lapApplications.$inferInsert;
export type SelectLapApplication = typeof lapApplications.$inferSelect;

export type InsertPersonalApplication = typeof personalLoanApplications.$inferInsert;
export type SelectPersonalApplication = typeof personalLoanApplications.$inferSelect;

export type InsertBusinessApplication = typeof businessLoanApplications.$inferInsert;
export type SelectBusinessApplication = typeof businessLoanApplications.$inferSelect;

export type InsertGoldApplication = typeof goldLoanApplications.$inferInsert;
export type SelectGoldApplication = typeof goldLoanApplications.$inferSelect;

export type InsertCardApplication = typeof carLoanApplications.$inferInsert;
export type SelcectCarApplication = typeof carLoanApplications.$inferSelect;

export type InsertEducationApplication = typeof educationLoanApplications.$inferInsert;
export type SelectEducationApplication = typeof educationLoanApplications.$inferSelect

export type InsertLasApplication = typeof lasApplication.$inferInsert;
export type SelectLasApplication = typeof lasApplication.$inferSelect;

export type InsertCall = typeof scheduledCalls.$inferInsert;
export type SelectCall = typeof scheduledCalls.$inferSelect;

export type InsertMfPref = typeof mfPreferences.$inferInsert;
export type SelectMfPref = typeof mfPreferences.$inferSelect;

export type InsertMfTransfer = typeof mfTransferForms.$inferInsert;
export type SelectMfTransfer = typeof mfTransferForms.$inferSelect;

export type InsertDocMf = typeof documentSubmissions.$inferInsert;
export type SelectDocMf = typeof documentSubmissions.$inferSelect;

export type InsertBusinessDevelopmentPartner = typeof businessDevelopmentPartner.$inferInsert;
export type SelectBusinessDevelopmentPartner = typeof businessDevelopmentPartner.$inferSelect;

export type InsertRemisorship = typeof remisorship.$inferInsert;
export type SelectRemisorship = typeof remisorship.$inferSelect;

export type InsertB2BPartner = typeof b2bPartner.$inferInsert;
export type SelectB2BPartner = typeof b2bPartner.$inferSelect;

export type InsertCustomReportsRequests = typeof customReportsRequest.$inferInsert;
export type SelectCustomReportsRequests = typeof customReportsRequest.$inferSelect;

export type InsertMaterialsRequests = typeof materials.$inferInsert;
export type SelectMaterialsRequests = typeof materials.$inferSelect;

export type InsertPartnerRequests = typeof partnerRequests.$inferInsert;
export type SelectPartnerRequests = typeof partnerRequests.$inferSelect;