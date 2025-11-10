import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";
import { saveMessageToDB } from "@/functions/whatsapp/saveMessage";
import { saveWhatsappFileToFirebase } from "@/functions/whatsapp/saveFileToFirebase";
import { makeContactUnread } from "@/functions/whatsapp/makeContactUnread";

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

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: true });

    try {
        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;
        const messages = value?.messages || [];

        for (const m of messages) {
            const from = m.from;
            const timestamp = m.timestamp;

            console.log("Test Voice Message:", m);

            // save to database

            await dbConnect();
            const contactExist = await ContactsModel.findOne({
                phone: from,
            })

            if (!contactExist) {
                const newContact = new ContactsModel({
                    name: "unknown",
                    phone: from,
                })

                await newContact.save();
            }

            if (m.type === "text") {
                await saveMessageToDB({
                    data: {
                        phone: from,
                        role: "client",
                        timestamp: timestamp,
                        message: m.text.body,
                        newMessage: true,
                    }
                })
            }

            if (m.type === "image") {
                await saveWhatsappFileToFirebase({
                    fileId: m.image.id,
                    mime_type: m.image.mime_type,
                    phone: from,
                    timestamp,
                })
            }

            if (m.type === "document") {
                await saveWhatsappFileToFirebase({
                    fileId: m.document.id,
                    mime_type: m.document.mime_type,
                    phone: from,
                    timestamp,
                })
            }

            await makeContactUnread({ phone: from });
        }

        return NextResponse.json({ received: true });
    } catch (e) {
        console.error("Webhook handling error:", e);
        return NextResponse.json({ received: true });
    }
}
