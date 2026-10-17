-- Migration: 0001_add_report_purchase_system.sql
-- Description:
--   1. Adds 'drive_file_id' and 'price' to 'research_reports' without an unintended global default.
--   2. Explicitly backfills canonical prices:
--        - 'Pre-Market Research Report' -> 49 (₹49)
--        - 'Weekly Research Report'     -> 99 (₹99)
--      Preserves custom prices and other report types (e.g. Thematic, Equity).
--   3. Creates 'payment_attempts' with foreign key to 'research_reports'(id).
--   4. Creates 'purchase_entitlements' with unique constraint on (clerk_user_id, report_id).
--   5. Creates 'webhook_events' with unique constraint on event_id for idempotency.
--
-- Target: neondb (production)
-- DO NOT EXECUTE AUTOMATICALLY AGAINST PRODUCTION.

BEGIN;

-- 1. Alter research_reports table to add drive_file_id and price (NO static DEFAULT 49)
ALTER TABLE IF EXISTS "research_reports"
  ADD COLUMN IF NOT EXISTS "drive_file_id" text,
  ADD COLUMN IF NOT EXISTS "price" integer;

-- 2. Explicitly backfill report prices based on canonical rules (only where price is NULL)
-- Pre-Market Research Reports: ₹49
UPDATE "research_reports"
SET "price" = 49
WHERE ("report_type" = 'Pre-Market Research Report' OR "report_type"::text ILIKE '%pre-market%')
  AND "price" IS NULL;

-- Weekly Research Reports: ₹99
UPDATE "research_reports"
SET "price" = 99
WHERE ("report_type" = 'Weekly Research Report' OR "report_type"::text ILIKE '%weekly%')
  AND "price" IS NULL;

-- Note: Thematic Research Reports, Equity Research Reports, and customized prices
-- remain untouched (NULL or explicit value), preserving custom pricing flexibility.

-- 3. Create payment_attempts table
CREATE TABLE IF NOT EXISTS "payment_attempts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "order_id" varchar(255) NOT NULL UNIQUE,
  "clerk_user_id" varchar(255) NOT NULL,
  "user_email" text NOT NULL,
  "report_id" uuid NOT NULL REFERENCES "research_reports"("id") ON DELETE CASCADE,
  "amount" integer NOT NULL,
  "currency" varchar(10) DEFAULT 'INR' NOT NULL,
  "receipt" varchar(255),
  "status" varchar(50) DEFAULT 'created' NOT NULL,
  "payment_id" varchar(255),
  "signature" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp
);

CREATE INDEX IF NOT EXISTS "payment_attempts_user_report_idx"
  ON "payment_attempts" ("clerk_user_id", "report_id");

-- 4. Create purchase_entitlements table
CREATE TABLE IF NOT EXISTS "purchase_entitlements" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "clerk_user_id" varchar(255) NOT NULL,
  "user_email" text NOT NULL,
  "report_id" uuid NOT NULL REFERENCES "research_reports"("id") ON DELETE CASCADE,
  "order_id" varchar(255) NOT NULL,
  "payment_id" varchar(255) NOT NULL,
  "amount" integer NOT NULL,
  "status" varchar(50) DEFAULT 'ACTIVE' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Unique constraint ensuring each user has at most one purchase per report
CREATE UNIQUE INDEX IF NOT EXISTS "purchase_entitlement_user_report_idx"
  ON "purchase_entitlements" ("clerk_user_id", "report_id");

-- Index on email for quick lookup
CREATE INDEX IF NOT EXISTS "purchase_entitlement_email_report_idx"
  ON "purchase_entitlements" ("user_email", "report_id");

-- 5. Create webhook_events table for idempotency
CREATE TABLE IF NOT EXISTS "webhook_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "event_id" varchar(255) NOT NULL UNIQUE,
  "event_type" varchar(100) NOT NULL,
  "payload" text,
  "status" varchar(50) DEFAULT 'PROCESSING' NOT NULL,
  "processed_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL
);

COMMIT;
