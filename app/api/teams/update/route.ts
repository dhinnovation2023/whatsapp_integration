import { handleCatchBlock } from "@/functions/common";
import { updateTeamData } from "@/functions/teams/updateTeamData";
import { NextRequest, NextResponse } from "next/server";

export interface UpdateTeamDataApiRouteRequestDataInterface {
    userId: string,
    name: string,
    email: string,
    labelColor: string,
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as UpdateTeamDataApiRouteRequestDataInterface;

        if (!body) {
            throw new Error("Missing data!");
        }

        await updateTeamData(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}