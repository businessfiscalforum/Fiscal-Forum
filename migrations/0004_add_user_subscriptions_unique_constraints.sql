-- Migration: 0004_add_user_subscriptions_unique_constraints.sql
-- Description: Adds unique indexes on payment_id and order_id in user_subscriptions table
-- to strictly prevent duplicate entitlement rows under concurrent webhooks and browser verifications.
-- Safety: Uses CREATE UNIQUE INDEX IF NOT EXISTS.
-- Before applying to production:
-- Inspect for duplicate payment_id or order_id rows in user_subscriptions:
--   SELECT payment_id, COUNT(*) FROM user_subscriptions GROUP BY payment_id HAVING COUNT(*) > 1;
--   SELECT order_id, COUNT(*) FROM user_subscriptions GROUP BY order_id HAVING COUNT(*) > 1;

CREATE UNIQUE INDEX IF NOT EXISTS "user_subscriptions_payment_id_unique" ON "user_subscriptions" USING btree ("payment_id");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_subscriptions_order_id_unique" ON "user_subscriptions" USING btree ("order_id");
