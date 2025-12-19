import { handleCatchBlock } from "@/functions/common";
import { fetchTeamMemberByUserId } from "@/functions/teams/fetch-team-by-id";
import { updateAssigned } from "@/functions/whatsapp/update-assigned";
import MessagesModel, { MessagesModelInterface } from "@/models/messages";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in env file.")
        }

        const session = await getServerSession();
        if (!session?.user?.email || session.user.email !== SUPER_ADMIN_EMAIL) {
            throw new Error("User is not authorized!");
        }

        const body = await request.json() as {
            userId: string,
            phone: string,
        }

        const teamMember = await fetchTeamMemberByUserId(body.userId);

        const messageData: MessagesModelInterface = {
            messageType: "notification",
            newMessage: true,
            phone: body.phone,
            role: "team",
            timestamp: new Date().getTime().toString(),
            message: `Contact assigned to ${teamMember.name}`,
        }

        const message = new MessagesModel(messageData);
        await message.save();

        await updateAssigned(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}