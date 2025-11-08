import { handleCatchBlock } from "@/functions/common";
import { fetchTeamMemberByUserId } from "@/functions/teams/fetch-team-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as { userId: string };

        if (!body.userId) {
            throw new Error("Field userId is required in request body.");
        }

        const user = await fetchTeamMemberByUserId(body.userId);
        return NextResponse.json(user);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}