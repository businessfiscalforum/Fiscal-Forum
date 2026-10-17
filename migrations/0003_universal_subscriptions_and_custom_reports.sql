CREATE TABLE "subscription_payment_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" varchar(255),
	"clerk_user_id" varchar(255) NOT NULL,
	"customer_email" text NOT NULL,
	"customer_name" text,
	"customer_phone" varchar(20),
	"plan_id" varchar(100) NOT NULL,
	"access_scope" varchar(50) NOT NULL,
	"duration_months" integer NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"payment_id" varchar(255),
	"signature" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "subscription_payment_attempts_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"customer_email" text NOT NULL,
	"plan_id" varchar(100) NOT NULL,
	"access_scope" varchar(50) NOT NULL,
	"duration_months" integer NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"expiry_date" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'ACTIVE' NOT NULL,
	"order_id" varchar(255) NOT NULL,
	"payment_id" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "clerk_user_id" varchar(255);--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "order_id" varchar(255);--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "payment_id" varchar(255);--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "payment_status" varchar(50) DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "processing_status" varchar(50) DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "amount" integer DEFAULT 59900 NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "currency" varchar(10) DEFAULT 'INR' NOT NULL;--> statement-breakpoint
ALTER TABLE "custom_reports" ADD COLUMN "paid_at" timestamp;--> statement-breakpoint
CREATE INDEX "user_subscriptions_user_idx" ON "user_subscriptions" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "user_subscriptions_user_scope_idx" ON "user_subscriptions" USING btree ("clerk_user_id","access_scope");
