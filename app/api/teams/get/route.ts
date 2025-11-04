import { handleCatchBlock } from "@/functions/common";
import { fetchTeamMembers } from "@/functions/teams/fetch-teams";
import { NextResponse } from "next/server";

export async function POST() {
    try {

        const users = await fetchTeamMembers("name email userId");
        return NextResponse.json(users);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}