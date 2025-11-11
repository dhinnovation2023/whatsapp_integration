import { handleCatchBlock } from "@/functions/common";
import { makeContactRead } from "@/functions/whatsapp/makeContactRead";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as {
            phone?: string,
        }

        if (!body.phone) {
            throw new Error("Phone field is required!");
        }

        await makeContactRead({ phone: body.phone });

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}