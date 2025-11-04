import { handleCatchBlock } from "@/functions/common";
import { deleteUser } from "@/functions/teams/delete-team";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as {
            userId?: string,
        }

        if (!body.userId) {
            throw new Error("userId is required");
        }

        console.log(body)

        await deleteUser(body.userId);

        return NextResponse.json(true)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}