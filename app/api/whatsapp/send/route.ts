import { handleCatchBlock } from "@/functions/common";
import { NextResponse } from "next/server";

export interface SendWhatsappMessage {
    phone_number: string,
    message: string,
}

export async function POST() {

    try {

        const PHONE_NUMBER_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID;
        const ACCESS_TOKEN = process.env.META_WHATSAPP_ACCESS_TOKEN;

        if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
            throw new Error("PHONE_NUMBER_ID or ACCESS_TOKEN is missing in .env");
        }

        // const bot = createBot(PHONE_NUMBER_ID, ACCESS_TOKEN);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }

}