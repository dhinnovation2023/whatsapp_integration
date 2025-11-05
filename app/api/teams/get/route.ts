import { handleCatchBlock } from "@/functions/common";
import { fetchTeamMembers } from "@/functions/teams/fetch-teams";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
    try {

        const session = await getServerSession();
        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in .env file.");
        }

        if (!session?.user || session.user.email !== SUPER_ADMIN_EMAIL) {
            throw new Error("User is not authorized!");
        }

        const users = await fetchTeamMembers("name email userId");
        return NextResponse.json(users);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 404 })
    }
}