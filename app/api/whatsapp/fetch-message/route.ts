import { handleCatchBlock } from "@/functions/common";
import { fetchMessageByPhone } from "@/functions/whatsapp/fetchMessages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const {
            phone,
            currentPage,
        } = await request.json() as {
            phone: string,
            currentPage?: number,
        }

        if (!phone) {
            throw new Error("Phone number is required!");
        }

        if (!currentPage) {
            throw new Error("currentPage is required.");
        }

        const message = await fetchMessageByPhone({ phone, currentPage });

        return NextResponse.json(message)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}