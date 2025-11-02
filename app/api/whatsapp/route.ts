import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// ---- Helpers ----
async function sendText(to: string, body: string) {
    const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: { body },
        }),
    });

    if (!res.ok) {
        const err = await res.text();
        console.error("WhatsApp send error:", err);
        throw new Error(`Failed to send message: ${res.status}`);
    }
}

// ---- GET: Webhook verification ----
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");
    console.log("Mode: ", mode);
    console.log("token: ", token);

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
            const from = m.from;             // Customer WhatsApp ID (phone)
            const type = m.type;             // 'text', 'image', etc.

            console.log(m);

            // Example: simple auto-replies like in your Express sample
            if (type === "text") {
                await sendText(from, "Got your text!");
            } else if (type === "image") {
                await sendText(from, "Nice image!");
            } else {
                await sendText(from, "Thanks for your message!");
            }

            // TODO: upsert contact, create/find conversation, auto-assign to an agent,
            // and store the message in your DB here.
        }

        // Always 200 to acknowledge receipt (prevents retries)
        return NextResponse.json({ received: true });
    } catch (e) {
        console.error("Webhook handling error:", e);
        // Still return 200 so WhatsApp doesn’t keep retrying (log & monitor internally)
        return NextResponse.json({ received: true });
    }
}
