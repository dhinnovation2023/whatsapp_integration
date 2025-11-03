import { handleCatchBlock } from "@/functions/common";
import { fetchAllContacts } from "@/functions/whatsapp/fetchContacts";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const contacts = await fetchAllContacts();
        return NextResponse.json(contacts);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}