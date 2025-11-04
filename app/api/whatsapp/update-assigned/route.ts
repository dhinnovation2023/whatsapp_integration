import { handleCatchBlock } from "@/functions/common";
import { updateAssigned } from "@/functions/whatsapp/update-assigned";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as {
            userId: string,
            phone: string,
        }

        await updateAssigned(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}