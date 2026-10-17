-- Migration: 0002_fix_weekly_report_pricing.sql
-- Description: Fixes weekly report prices by removing the unintended static column default of 49
-- and aligning existing weekly report records with the intended ₹99 canonical price.
-- Preserves all intentionally customized prices (e.g., price NOT IN (49, NULL)).
-- DO NOT EXECUTE AUTOMATICALLY AGAINST PRODUCTION.
--
-- BEFORE APPLYING: Run this inspection query to view all weekly reports and their current prices:
--   SELECT id, title, report_type, price, created_at
--   FROM "research_reports"
--   WHERE "report_type" ILIKE '%weekly%' OR "report_type" = 'Weekly Research Report'
--   ORDER BY created_at DESC;

-- 1. Remove the static default of 49 from the price column so new reports
-- do not silently inherit 49 and can instead use report-type specific canonical pricing.
ALTER TABLE IF EXISTS "research_reports"
  ALTER COLUMN "price" DROP DEFAULT;

-- 2. Safely update existing weekly reports with NULL price to the intended ₹99
UPDATE "research_reports"
SET "price" = 99
WHERE ("report_type" ILIKE '%weekly%' OR "report_type" = 'Weekly Research Report')
  AND "price" IS NULL;

-- 3. Align weekly reports that automatically inherited the legacy column default of 49.
-- If any weekly reports were intentionally and specifically discounted/customized to ₹49,
-- exclude their specific IDs before running (e.g., AND id NOT IN ('custom-uuid-1')):
UPDATE "research_reports"
SET "price" = 99
WHERE ("report_type" ILIKE '%weekly%' OR "report_type" = 'Weekly Research Report')
  AND "price" = 49;

-- 4. Verification query after applying:
--   SELECT id, title, report_type, price FROM "research_reports"
--   WHERE "report_type" ILIKE '%weekly%' OR "report_type" = 'Weekly Research Report';
