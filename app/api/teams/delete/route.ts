import { handleCatchBlock } from "@/functions/common";
import { deleteUser } from "@/functions/teams/delete-team";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
        const session = await getServerSession();

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in .env file");
        }

        if (!session?.user || session.user.email !== SUPER_ADMIN_EMAIL) {
            throw new Error("User is not authorized");
        }

        const body = await request.json() as {
            userId?: string,
        }

        if (!body.userId) {
            throw new Error("userId is required");
        }

        await deleteUser(body.userId);

        return NextResponse.json(true)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}