import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../config/db";
import {
  webhookEventsTable,
  subscriptionPaymentAttemptsTable,
  customReportsTable,
  paymentAttemptsTable,
} from "../../../../config/schema";
import { eq } from "drizzle-orm";
import { getRazorpayInstance, verifyWebhookSignature } from "../../../../lib/razorpay";
import { reconcileSubscriptionPayment } from "../../../../lib/subscriptions";
import { reconcileCustomReportPayment } from "../../../../lib/customReports";
import { reconcilePaymentAndGrantAccess } from "../../../../lib/entitlements";

export async function POST(req: NextRequest) {
  let eventId = "";

  try {
    // 1. Validate signature header presence
    const signature = req.headers.get("x-razorpay-signature");
    if (!signature || typeof signature !== "string") {
      return NextResponse.json({ error: "Missing x-razorpay-signature header" }, { status: 400 });
    }

    // 2. Read exact raw request body before parsing JSON
    const rawBody = await req.text();

    // 3. Verify cryptographic webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn("Invalid Razorpay webhook signature rejected.");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    // 4. Safely parse JSON payload
    let payload: {
      id?: string;
      event?: string;
      payload?: {
        payment?: { entity?: { id?: string; order_id?: string; status?: string; amount?: number; currency?: string } };
        order?: { entity?: { id?: string; status?: string; amount?: number } };
      };
    };
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
    }

    eventId = payload.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const eventType = payload.event;

    // 5. Reliable atomic idempotency check with lifecycle state (PROCESSING, PROCESSED, FAILED)
    const PROCESSING_LEASE_TIMEOUT_MS = 5 * 60 * 1000; // 5-minute crash lease timeout

    try {
      await db.insert(webhookEventsTable).values({
        eventId,
        eventType: eventType || "unknown",
        payload: rawBody,
        status: "PROCESSING",
      });
    } catch {
      // Record exists or concurrent request arrived
      const [existing] = await db
        .select()
        .from(webhookEventsTable)
        .where(eq(webhookEventsTable.eventId, eventId))
        .limit(1);

      if (existing?.status === "PROCESSED") {
        return NextResponse.json({ message: "Duplicate event already processed" }, { status: 200 });
      }

      // Check for active vs stale PROCESSING lease using createdAt (when current lease started)
      const isStaleProcessing =
        existing?.status === "PROCESSING" &&
        existing.createdAt &&
        Date.now() - new Date(existing.createdAt).getTime() > PROCESSING_LEASE_TIMEOUT_MS;

      if (existing?.status === "PROCESSING" && !isStaleProcessing) {
        // Return retryable 503 so Razorpay retries if the other worker crashes
        return NextResponse.json(
          { error: "Event currently being processed by another active worker." },
          { status: 503, headers: { "Retry-After": "10" } }
        );
      }

      // If previous status was FAILED or stale PROCESSING lease, take over lease and retry safely
      await db
        .update(webhookEventsTable)
        .set({ status: "PROCESSING", createdAt: new Date() })
        .where(eq(webhookEventsTable.eventId, eventId));
    }

    // 6. Handle supported events
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;

      const orderId = paymentEntity?.order_id || orderEntity?.id;
      let paymentId = paymentEntity?.id;

      if (!orderId) {
        console.warn(`Webhook ${eventId}: Event missing order_id.`);
        throw new Error("Event missing order_id");
      }

      const razorpay = getRazorpayInstance();

      // If paymentId not in payload, fetch payments for the order from Razorpay
      if (!paymentId) {
        const orderPayments = (await razorpay.orders.fetchPayments(orderId)) as {
          items?: Array<{ id: string; status: string }>;
        };
        const capturedItem = orderPayments?.items?.find((p) => p.status === "captured");
        if (capturedItem) {
          paymentId = capturedItem.id;
        }
      }

      if (!paymentId) {
        console.warn(`Webhook ${eventId}: Could not identify real payment ID for order ${orderId}.`);
        throw new Error("Payment ID not yet available for order");
      }

      // Resolve purchase strictly through server-side database records
      const [subAttempt] = await db
        .select({ id: subscriptionPaymentAttemptsTable.id })
        .from(subscriptionPaymentAttemptsTable)
        .where(eq(subscriptionPaymentAttemptsTable.orderId, orderId))
        .limit(1);

      if (subAttempt) {
        await reconcileSubscriptionPayment({ orderId, paymentId });
      } else {
        const [customReport] = await db
          .select({ id: customReportsTable.id })
          .from(customReportsTable)
          .where(eq(customReportsTable.orderId, orderId))
          .limit(1);

        if (customReport) {
          await reconcileCustomReportPayment({ orderId, paymentId });
        } else {
          // Check legacy payment attempts for audit logging
          const [legacyAttempt] = await db
            .select({ id: paymentAttemptsTable.id })
            .from(paymentAttemptsTable)
            .where(eq(paymentAttemptsTable.orderId, orderId))
            .limit(1);

          if (legacyAttempt) {
            await reconcilePaymentAndGrantAccess({ orderId, paymentId });
          } else {
            console.warn(`Webhook ${eventId}: Untracked order ${orderId}.`);
            throw new Error(`Order ${orderId} not found in database records.`);
          }
        }
      }
    } else if (eventType === "payment.failed") {
      // Safely handle payment failure without granting access or overwriting captured state
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;
      const orderId = paymentEntity?.order_id || orderEntity?.id;
      const paymentId = paymentEntity?.id;

      if (orderId) {
        const [subAttempt] = await db
          .select()
          .from(subscriptionPaymentAttemptsTable)
          .where(eq(subscriptionPaymentAttemptsTable.orderId, orderId))
          .limit(1);

        if (subAttempt) {
          // Late payment.failed must NEVER overwrite a captured/paid state
          if (subAttempt.status.toUpperCase() === "PENDING") {
            await db
              .update(subscriptionPaymentAttemptsTable)
              .set({
                status: "FAILED",
                ...(paymentId ? { paymentId } : {}),
              })
              .where(eq(subscriptionPaymentAttemptsTable.orderId, orderId));
          }
        } else {
          const [customReport] = await db
            .select()
            .from(customReportsTable)
            .where(eq(customReportsTable.orderId, orderId))
            .limit(1);

          if (customReport) {
            if (customReport.paymentStatus.toUpperCase() === "PENDING") {
              await db
                .update(customReportsTable)
                .set({
                  paymentStatus: "FAILED",
                  ...(paymentId ? { paymentId } : {}),
                })
                .where(eq(customReportsTable.orderId, orderId));
            }
          } else {
            const [legacyAttempt] = await db
              .select()
              .from(paymentAttemptsTable)
              .where(eq(paymentAttemptsTable.orderId, orderId))
              .limit(1);

            if (legacyAttempt) {
              if (legacyAttempt.status.toLowerCase() === "pending") {
                await db
                  .update(paymentAttemptsTable)
                  .set({
                    status: "failed",
                    ...(paymentId ? { paymentId } : {}),
                  })
                  .where(eq(paymentAttemptsTable.orderId, orderId));
              }
            }
          }
        }
      }
    } else if (eventType === "refund.processed") {
      // Process refund events: Distinguish full refund from partial refund
      const refundEntity = (payload.payload as any)?.refund?.entity;
      const paymentEntity = payload.payload?.payment?.entity;
      const paymentId = refundEntity?.payment_id || paymentEntity?.id;
      const refundAmount = Number(refundEntity?.amount || 0);
      const totalAmount = Number(paymentEntity?.amount || 0);

      if (paymentId) {
        const isFullRefund = totalAmount > 0 && refundAmount >= totalAmount;
        const [subAttempt] = await db
          .select()
          .from(subscriptionPaymentAttemptsTable)
          .where(eq(subscriptionPaymentAttemptsTable.paymentId, paymentId))
          .limit(1);

        if (subAttempt && isFullRefund) {
          await db
            .update(subscriptionPaymentAttemptsTable)
            .set({ status: "REFUNDED" })
            .where(eq(subscriptionPaymentAttemptsTable.id, subAttempt.id));
        }
      }
    }

    // 7. Mark event as PROCESSED only after all business logic succeeds
    await db
      .update(webhookEventsTable)
      .set({
        status: "PROCESSED",
        processedAt: new Date(),
      })
      .where(eq(webhookEventsTable.eventId, eventId));

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Webhook processing error:", errMsg);

    // If an event ID was recorded, set status to FAILED so it can be retried
    if (eventId) {
      try {
        await db
          .update(webhookEventsTable)
          .set({ status: "FAILED" })
          .where(eq(webhookEventsTable.eventId, eventId));
      } catch (dbErr: unknown) {
        const dbErrMsg = dbErr instanceof Error ? dbErr.message : String(dbErr);
        console.error("Failed to update webhook event status to FAILED:", dbErrMsg);
      }
    }

    // Return 500 so Razorpay retries webhook delivery
    return NextResponse.json({ error: "Webhook handling failed." }, { status: 500 });
  }
}
