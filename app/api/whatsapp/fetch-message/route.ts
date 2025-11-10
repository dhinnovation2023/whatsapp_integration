import { handleCatchBlock } from "@/functions/common";
import { fetchMessageByPhone } from "@/functions/whatsapp/fetchMessages";
import { makeContactRead } from "@/functions/whatsapp/makeContactRead";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const {
            phone,
        } = await request.json() as {
            phone: string,
        }

        if (!phone) {
            throw new Error("Phone number is required!");
        }

        const message = await fetchMessageByPhone({ phone });

        return NextResponse.json(message)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}