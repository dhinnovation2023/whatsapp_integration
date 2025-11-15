import { handleCatchBlock } from "@/functions/common";
import { updateOneStatus } from "@/functions/status/update-one";
import { NextRequest, NextResponse } from "next/server";

export interface UpdateStatusApiRouteRequestData {
    statusId: string,
    name: string,
    color: string,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as UpdateStatusApiRouteRequestData;
        await updateOneStatus(body);
        return NextResponse.json(true);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}