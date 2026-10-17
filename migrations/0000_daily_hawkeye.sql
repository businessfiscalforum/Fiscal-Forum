-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."annual_income" AS ENUM('3-5', '5-10', '10-15', '15-25', '25+');--> statement-breakpoint
CREATE TYPE "public"."application_status" AS ENUM('INITIATED', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED', 'DISBURSED');--> statement-breakpoint
CREATE TYPE "public"."car_type" AS ENUM('new', 'used');--> statement-breakpoint
CREATE TYPE "public"."course_type" AS ENUM('engineering', 'medical', 'management', 'law', 'other');--> statement-breakpoint
CREATE TYPE "public"."education_level" AS ENUM('undergraduate', 'postgraduate', 'professional', 'diploma');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('salaried', 'self-employed');--> statement-breakpoint
CREATE TYPE "public"."insurance_type" AS ENUM('LIFE', 'HEALTH', 'CAR', 'TERM', 'TRAVEL', 'PROPERTY');--> statement-breakpoint
CREATE TYPE "public"."loan_type" AS ENUM('home-loan', 'property', 'personal', 'business', 'gold', 'car', 'education', 'securities');--> statement-breakpoint
CREATE TYPE "public"."news_category" AS ENUM('blockchain', 'fintech', 'market-news', 'research', 'regulation', 'crypto', 'banking');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('UPI', 'CARD', 'NETBANKING', 'WALLET', 'EMI');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('residential', 'commercial', 'industrial');--> statement-breakpoint
CREATE TYPE "public"."property_usage" AS ENUM('self-occupied', 'rented', 'under-construction', 'ready-to-move');--> statement-breakpoint
CREATE TYPE "public"."rating" AS ENUM('BUY', 'HOLD', 'SELL');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('Pre-Market Research Report', 'Quarterly Results', 'Industry Analysis', 'Thematic Research Report', 'Company Analysis', 'Equity Research Report', 'Weekly Research Report');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('Pending', 'Approved', 'Rejected');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN', 'AGENT', 'PARTNER');--> statement-breakpoint
CREATE TYPE "public"."securities_type" AS ENUM('mutual-funds', 'shares', 'bonds', 'fixed-deposits');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'BANNED');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT');--> statement-breakpoint
CREATE TYPE "public"."vehicle_insurance_type" AS ENUM('OD', 'Comprehensive', 'Third party');--> statement-breakpoint
CREATE TABLE "b2b_partner" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"account_number" varchar(20) NOT NULL,
	"ifsc_code" varchar(11) NOT NULL,
	"aadhaar_number" varchar(12) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "buisness_development_partner" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"account_number" varchar(20) NOT NULL,
	"ifsc_code" varchar(11) NOT NULL,
	"aadhaar_number" varchar(12) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"last_name" varchar(50) NOT NULL,
	"father_name" varchar(100) NOT NULL,
	"date_of_birth" date NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"email_id" varchar(100) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"gender" varchar(20) NOT NULL,
	"marital_status" varchar(20) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"employment_type" varchar(20) NOT NULL,
	"company_name" varchar(100),
	"designation" varchar(50),
	"net_monthly_salary" integer,
	"business_name" varchar(100) NOT NULL,
	"business_type" varchar(50) NOT NULL,
	"years_in_business" integer,
	"gst_number" varchar(15),
	"annual_turnover" integer,
	"monthly_profit" integer,
	"loan_amount_required" integer NOT NULL,
	"no_of_current_loans" integer NOT NULL,
	"existing_loan_type" varchar(20),
	"reference1_name" text NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" text NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "car_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"last_name" varchar(50) NOT NULL,
	"father_name" varchar(100) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"date_of_birth" date NOT NULL,
	"marital_status" varchar(20) NOT NULL,
	"gender" varchar(20) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"email_id" varchar(100) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"employment_type" varchar(20) NOT NULL,
	"company_name" varchar(100),
	"designation" varchar(50),
	"net_monthly_salary" integer,
	"car_type" varchar(20),
	"year" integer,
	"loan_type" varchar(20),
	"loan_amount_required" integer NOT NULL,
	"no_of_current_loans" integer NOT NULL,
	"existing_loan_type" varchar(20),
	"reference1_name" text NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" text NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "car_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"previous_insurer" varchar(255),
	"policy_expiry" varchar(20),
	"rc_link" text NOT NULL,
	"prev_insurance_link" text NOT NULL,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"registration_number" varchar(20) NOT NULL,
	"vehicle_insurance_type" "vehicle_insurance_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demat_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"pan" varchar(10) NOT NULL,
	"city" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demat_transfer_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"client_code" varchar(100) NOT NULL,
	"pan_no" varchar(10) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"consistency" varchar(20) NOT NULL,
	"trader_type" text NOT NULL,
	"existing_broker" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "document_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"document_sent" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"last_name" varchar(50) NOT NULL,
	"father_name" varchar(50) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"marital_status" varchar(10),
	"gender" varchar(10),
	"mobile_no" varchar(15) NOT NULL,
	"email_id" varchar(100) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"employment_type" varchar(15),
	"company_name" varchar(100),
	"designation" varchar(100),
	"net_monthly_salary" integer,
	"course_type" varchar(20),
	"course_name" varchar(100) NOT NULL,
	"university_name" varchar(100) NOT NULL,
	"country_name" varchar(50) NOT NULL,
	"loan_amount_required" integer NOT NULL,
	"no_of_current_loans" integer DEFAULT 0,
	"existing_loan_type" varchar(15),
	"reference1_name" varchar(50) NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" varchar(50) NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "education_loan_applications_email_id_unique" UNIQUE("email_id")
);
--> statement-breakpoint
CREATE TABLE "gold_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"last_name" varchar(50) NOT NULL,
	"father_name" varchar(100) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"date_of_birth" date NOT NULL,
	"marital_status" varchar(10) NOT NULL,
	"gender" varchar(20) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"email_id" varchar(100) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"gold_weight" integer,
	"gold_purity" varchar(10),
	"loan_amount_required" integer NOT NULL,
	"no_of_current_loans" integer NOT NULL,
	"existing_loan_type" varchar(20),
	"reference1_name" text NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" text NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "home_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text NOT NULL,
	"father_name" text NOT NULL,
	"date_of_birth" varchar(20) NOT NULL,
	"marital_status" varchar(20) NOT NULL,
	"gender" varchar(10) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"email_id" text NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"employment_type" varchar(20) NOT NULL,
	"company_name" text,
	"designation" text,
	"net_monthly_salary" integer NOT NULL,
	"property_type" varchar(20) NOT NULL,
	"agreement_value" integer NOT NULL,
	"loan_amount_required" integer NOT NULL,
	"property_address_line1" text NOT NULL,
	"property_address_line2" text,
	"property_city" text NOT NULL,
	"no_of_current_loans" integer NOT NULL,
	"existing_loan_type" varchar(20),
	"builder_name" text NOT NULL,
	"residence_since" varchar(20) NOT NULL,
	"special_name" text,
	"reference1_name" text NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" text NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lap_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"last_name" varchar(50) NOT NULL,
	"father_name" varchar(50),
	"dob" date,
	"pan_number" varchar(10) NOT NULL,
	"email" varchar(100),
	"mobile_no" varchar(15),
	"gender" varchar(20),
	"marital_status" varchar(20),
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"employment_type" varchar(20),
	"company_name" varchar(100),
	"designation" varchar(50),
	"company_address_1" text,
	"company_address_2" text,
	"company_city" varchar(50),
	"company_state" varchar(50),
	"monthly_salary" integer NOT NULL,
	"experience_in_months" integer,
	"current_job_stability" varchar(20),
	"property_type" varchar(20),
	"agreement_value" integer,
	"loan_amount_required" integer NOT NULL,
	"property_address_1" text,
	"property_address_2" text,
	"property_city" varchar(50),
	"property_state" varchar(50),
	"existing_loans_count" integer DEFAULT 0,
	"existing_loan_type" varchar(20),
	"reference1_name" text NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" text NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "health_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"policy_type" varchar(50) NOT NULL,
	"members_count" integer,
	"member_ages" text,
	"pre_existing_diseases" text,
	"previous_insurer" varchar(255),
	"policy_expiry" varchar(20),
	"prev_policy_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loan_against_securities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"middle_name" varchar(255),
	"last_name" varchar(255) NOT NULL,
	"father_name" varchar(255) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"date_of_birth" varchar(20) NOT NULL,
	"marital_status" varchar NOT NULL,
	"gender" varchar NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"email_id" varchar(255) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"security_type" varchar,
	"security_value" numeric(14, 2) NOT NULL,
	"required_loan_amount" numeric(14, 2) NOT NULL,
	"loan_amount_required" numeric(14, 2) NOT NULL,
	"no_of_current_loans" integer NOT NULL,
	"existing_loan_type" varchar,
	"reference1_name" varchar(50) NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" varchar(50) NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "life_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"dob" varchar(20),
	"gender" varchar(20),
	"occupation" varchar(255),
	"policy_types" text,
	"sum_assured" numeric(14, 2),
	"policy_term_years" integer,
	"premium_frequency" varchar(50),
	"has_existing_policy" boolean DEFAULT false,
	"existing_insurer" varchar(255),
	"prev_policy_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mf_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"client_id" varchar(100) NOT NULL,
	"fund_type" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mf_transfer_forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"client_code" varchar(100) NOT NULL,
	"pan_no" varchar(10) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"type_of_investment" text NOT NULL,
	"existing_broker" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"description" text,
	"content" text,
	"image" varchar(500),
	"category" varchar(100),
	"author" varchar(100),
	"publish_date" timestamp DEFAULT now(),
	"read_time" varchar(50),
	"link" varchar(500),
	"featured" boolean DEFAULT false,
	"tags" text,
	"ipo_name" varchar(255),
	"company_name" varchar(255),
	"price_range" varchar(100),
	"issue_size" varchar(100),
	"listing_date" varchar(100),
	"current_price" varchar(100),
	"listing_gain" varchar(100),
	"subscription_rate" varchar(100),
	"apply_link" varchar(500),
	"offer_price" varchar(100),
	"close_date" varchar(100),
	"allotment_date" varchar(100),
	"open_date" varchar(100),
	"refund_date" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "newsletter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255),
	"description" text,
	"content" text,
	"image" varchar(500),
	"author" varchar(100),
	"publish_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "property_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"property_address" text,
	"property_type" varchar(50) NOT NULL,
	"property_ownership" varchar(20),
	"property_value" varchar,
	"contents_value" varchar,
	"construction_type" varchar(50),
	"year_of_construction" integer,
	"coverage_options" text,
	"has_existing_policy" boolean DEFAULT false,
	"existing_insurer" varchar(255),
	"policy_expiry" varchar(20),
	"prev_policy_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "personal_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"middle_name" varchar(50),
	"last_name" varchar(50) NOT NULL,
	"father_name" varchar(100) NOT NULL,
	"date_of_birth" date NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"email_id" varchar(100) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"gender" varchar(20) NOT NULL,
	"marital_status" varchar(20) NOT NULL,
	"current_home_address1" text NOT NULL,
	"current_home_address2" text,
	"current_residence_type" varchar(20) NOT NULL,
	"current_pincode" varchar(6) NOT NULL,
	"current_state" text NOT NULL,
	"current_city" text NOT NULL,
	"permanent_address_same" boolean DEFAULT false,
	"permanent_home_address1" text NOT NULL,
	"permanent_home_address2" text,
	"permanent_residence_type" varchar(20) NOT NULL,
	"permanent_pincode" varchar(6) NOT NULL,
	"permanent_state" text NOT NULL,
	"permanent_city" text NOT NULL,
	"employment_type" varchar(20) NOT NULL,
	"company_name" varchar(100),
	"designation" varchar(50),
	"net_monthly_salary" integer,
	"loan_amount_required" integer NOT NULL,
	"no_of_current_loans" integer NOT NULL,
	"existing_loan_type" varchar(20),
	"reference1_name" text NOT NULL,
	"reference1_mobile" varchar(15) NOT NULL,
	"reference1_address" text NOT NULL,
	"reference2_name" text NOT NULL,
	"reference2_mobile" varchar(15) NOT NULL,
	"reference2_address" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "personal_accident_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"dob" varchar(20),
	"occupation" varchar(255),
	"coverage_type" text,
	"sum_insured" varchar,
	"policy_term_years" varchar,
	"coverage_options" text,
	"has_existing_policy" boolean DEFAULT false,
	"existing_insurer" varchar(255),
	"prev_policy_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"loan_type" text NOT NULL,
	"loan_amount" integer NOT NULL,
	"tenure" integer NOT NULL,
	"emi" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "remisorship" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"account_number" varchar(20) NOT NULL,
	"ifsc_code" varchar(11) NOT NULL,
	"aadhaar_number" varchar(12) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "research_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"stock" text,
	"company" text,
	"author" text,
	"author_firm" text,
	"publish_date" timestamp,
	"sector" text,
	"report_type" "report_type",
	"rating" "rating",
	"target_price" text,
	"current_price" text,
	"upside" text,
	"pages" integer,
	"recommendation" text,
	"tags" text[],
	"summary" text,
	"pdf_url" text,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "savings_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"pan_no" varchar(20) NOT NULL,
	"pincode" varchar(10) NOT NULL,
	"state" varchar(100) NOT NULL,
	"district" varchar(100) NOT NULL,
	"bank_type" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pan_regex_check" CHECK ((pan_no)::text ~ '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'::text)
);
--> statement-breakpoint
CREATE TABLE "scheduled_calls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"country_code" varchar(10) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"time" varchar(20) NOT NULL,
	"message" text,
	"preferred_contact_method" varchar DEFAULT 'call',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "two_wheeler_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"previous_insurer" varchar(255),
	"policy_expiry" varchar(20),
	"rc_link" text,
	"prev_insurance_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"registration_number" varchar(20) NOT NULL,
	"vehicle_insurance_type" "vehicle_insurance_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "unlisted_shares" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"client_code" varchar(100) NOT NULL,
	"pan_no" varchar(10) NOT NULL,
	"mobile_no" varchar(15) NOT NULL,
	"consistency" varchar(20) NOT NULL,
	"trader_type" text NOT NULL,
	"existing_broker" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pan_regex_check" CHECK ((pan_no)::text ~ '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'::text)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"refer_code" varchar(8),
	"referrer_code" varchar(8),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_refer_code_unique" UNIQUE("refer_code")
);
--> statement-breakpoint
CREATE TABLE "custom_reports_request" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"topic" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "materials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"link" varchar
);
--> statement-breakpoint
CREATE TABLE "partner_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar,
	"sub_type" varchar,
	"name" varchar,
	"mobile" varchar(10),
	"email" varchar,
	"status" "request_status" DEFAULT 'Pending',
	"user_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mis_report_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"document_link" text NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commercial_vehicle_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"business_name" varchar(255),
	"business_type" varchar(100),
	"gst_number" varchar(50),
	"vehicle_type" varchar(100) NOT NULL,
	"vehicle_make" varchar(100),
	"vehicle_model" varchar(100),
	"vehicle_year" varchar,
	"vehicle_capacity" varchar(50),
	"vehicle_value" numeric(14, 2),
	"previous_insurer" varchar(255),
	"policy_expiry" varchar(20),
	"current_policy_number" varchar(100),
	"primary_use" varchar(100),
	"operating_area" varchar(255),
	"annual_mileage" varchar(50),
	"coverage_type" text,
	"additional_covers" text,
	"rc_link" text,
	"prev_insurance_link" text,
	"business_license_link" text,
	"gst_certificate_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"special_requirements" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "withdrawal_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid,
	"amount" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travel_insurance_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(15) NOT NULL,
	"dob" varchar(20),
	"passport_number" varchar(30),
	"travel_type" varchar(50) NOT NULL,
	"destinations" text,
	"start_date" varchar(20),
	"end_date" varchar(20),
	"num_travellers" integer,
	"traveller_ages" text,
	"coverage_options" text,
	"has_existing_policy" boolean DEFAULT false,
	"existing_insurer" varchar(255),
	"prev_policy_link" text,
	"insurer_prefs" text,
	"other_insurer" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"mobile" varchar(15) NOT NULL,
	"age" varchar(10),
	"category" varchar(100) NOT NULL,
	"capital" varchar(100),
	"return_expected" varchar(100),
	"investment_goal" text,
	"risk_tolerance" varchar(50),
	"investment_style" text,
	"monthly_savings" varchar(100),
	"details" text,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"occupation" varchar(255),
	"investment_preference" varchar(100),
	"annual_income" varchar(100),
	"dependents" varchar(50),
	"marital_status" varchar(50),
	"existing_insurance" text,
	"insurance_covers" text,
	"loans_liabilities" text,
	"monthly_spending" varchar(100),
	"spending_categories" text,
	"fly_frequency" varchar(100),
	"travel_type" varchar(100),
	"lounge_importance" varchar(10),
	"fee_comfort" varchar(255),
	"loan_purpose" varchar(255),
	"loan_employment" varchar(255),
	"loan_monthly_income" varchar(100),
	"loan_income_stability" varchar(100),
	"loan_amount" varchar(100),
	"loan_has_collateral" varchar(50),
	"loan_collateral_type" varchar(100)
);
--> statement-breakpoint
ALTER TABLE "car_insurance_requests" ADD CONSTRAINT "car_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_insurance_requests" ADD CONSTRAINT "health_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "life_insurance_requests" ADD CONSTRAINT "life_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_insurance_requests" ADD CONSTRAINT "property_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_accident_insurance_requests" ADD CONSTRAINT "personal_accident_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "two_wheeler_insurance_requests" ADD CONSTRAINT "two_wheeler_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commercial_vehicle_insurance_requests" ADD CONSTRAINT "commercial_vehicle_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawal_requests" ADD CONSTRAINT "withdrawal_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "travel_insurance_requests" ADD CONSTRAINT "travel_insurance_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
*/