import { handleCatchBlock } from "@/functions/common";
import { saveMessageToDB } from "@/functions/whatsapp/saveMessage";
import { sendTextToWhatsapp } from "@/functions/whatsapp/sendToWhatsapp";
import { NextRequest, NextResponse } from "next/server";

export interface SendWhatsappMessage {
    phone_number: string,
    message: string,
}

export async function POST(request: NextRequest) {

    try {

        const data = await request.json() as {
            phone: string,
            text: string,
        }

        console.log(data);

        await sendTextToWhatsapp(data);

        await saveMessageToDB({
            data: {
                phone: data.phone,
                role: "team",
                timestamp: "11-11-2023",
                message: data.text,
                newMessage: false,
            }
        })

        return NextResponse.json(true)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }

}