import { handleCatchBlock } from "@/functions/common";
import { deleteOneStatus } from "@/functions/status/delete-one";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as { statusId?: string }

        if (!body || !body.statusId) {
            throw new Error("statusId field is required!");
        }

        await deleteOneStatus(body.statusId);
        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}