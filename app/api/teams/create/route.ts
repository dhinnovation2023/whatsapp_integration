import { handleCatchBlock } from "@/functions/common";
import { createTeamMember } from "@/functions/teams/create-team";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface ApiRouteRequestDataTeamCreate {
    email: string,
    name: string,
    password: string,
}

export async function POST(request: NextRequest) {
    try {

        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("please provide SUPER_ADMIN_EMAIL in .env file");
        }

        const session = await getServerSession();
        if (!session?.user || session.user.email !== SUPER_ADMIN_EMAIL) {
            throw new Error("User is not autherized!");
        }

        const body = await request.json() as ApiRouteRequestDataTeamCreate;
        await createTeamMember(body);

        return NextResponse.json(true)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}