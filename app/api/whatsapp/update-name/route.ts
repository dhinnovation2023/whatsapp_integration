import { handleCatchBlock } from "@/functions/common";
import { updateContactName, UpdateContactNameRequestData } from "@/functions/whatsapp/updateContactName";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as UpdateContactNameRequestData;

        if (!body.newName) {
            throw new Error("Name field is required.")
        }

        await updateContactName(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}