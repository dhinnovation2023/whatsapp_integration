import { handleCatchBlock } from "@/functions/common";
import { fetchOneContactByPhone } from "@/functions/whatsapp/fetchContacts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as { phone?: string }

        if (!body.phone) {
            throw new Error("Phone number is required!");
        }

        const contact = await fetchOneContactByPhone(body.phone);

        return NextResponse.json(contact);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}