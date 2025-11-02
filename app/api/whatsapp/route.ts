import { NextRequest, NextResponse } from "next/server";
import { createBot } from "@awadoc/whatsapp-cloud-api"

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
        // Meta expects the raw challenge string in 200 response
        return new NextResponse(challenge, { status: 200 });
    }

    return new NextResponse("Forbidden", { status: 403 });
}

// ---- POST: Incoming webhooks (messages, statuses, etc.) ----
export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: true });

    try {
        // WhatsApp payload shape: entry[] -> changes[] -> value
        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;
        const messages = value?.messages || [];

        for (const m of messages) {
            const from = m.from;
            // const type = m.type;

            // save to database

            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
            const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

            if (!PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
                throw new Error("Please provide PHONE_NUMBER_ID and WHATSAPP_ACCESS_NUMBER in .env file");
            }

            const bot = createBot(PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN);
            bot.sendText(from, "Test message from vishnu");
        }

        // Always 200 to acknowledge receipt (prevents retries)
        return NextResponse.json({ received: true });
    } catch (e) {
        console.error("Webhook handling error:", e);
        // Still return 200 so WhatsApp doesn’t keep retrying (log & monitor internally)
        return NextResponse.json({ received: true });
    }
}
