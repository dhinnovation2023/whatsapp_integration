import { handleCatchBlock } from "@/functions/common";
import { createTeamMember } from "@/functions/teams/create-team";
import { NextRequest, NextResponse } from "next/server";

export interface ApiRouteRequestDataTeamCreate {
    email: string,
    name: string,
    password: string,
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as ApiRouteRequestDataTeamCreate;
        await createTeamMember(body);

        return NextResponse.json(true)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}