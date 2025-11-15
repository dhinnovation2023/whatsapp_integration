import { handleCatchBlock } from "@/functions/common";
import { changeContactStatus } from "@/functions/whatsapp/update-status";
import { NextRequest, NextResponse } from "next/server";

export interface ChangeContactStatusRequestDataInterface {
    statusId?: string,
    phone?: string,
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as ChangeContactStatusRequestDataInterface;
        
        if (!body || !body.phone || !body.statusId) {
            throw new Error("Field phone and statusId is required");
        }

        await changeContactStatus(body);
        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message);
    }
}