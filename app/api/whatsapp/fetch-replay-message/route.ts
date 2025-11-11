import { handleCatchBlock } from "@/functions/common";
import { fetchReplayMessage } from "@/functions/whatsapp/fetchReplayMessage";
import { NextRequest, NextResponse } from "next/server";

export interface FetchReplayMessageApiRouteMessage {
    wamid?: string,
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as FetchReplayMessageApiRouteMessage;

        if (!body.wamid) {
            throw new Error("Whatsapp message id not found!");
        }

        const replayMessage = await fetchReplayMessage(body);

        return NextResponse.json(replayMessage);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}