import { handleCatchBlock } from "@/functions/common";
import { addNewStatus } from "@/functions/status/add-new";
import { NextRequest, NextResponse } from "next/server";

export interface AddStatusApiRouteRequestData {
    name: string,
    color: string,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as AddStatusApiRouteRequestData;
        await addNewStatus(body);
        return NextResponse.json(true);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}