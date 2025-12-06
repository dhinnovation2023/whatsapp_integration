import { handleCatchBlock } from "@/functions/common";
import { createNewContact } from "@/functions/whatsapp/create-new-contact";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface CreateNewContactRequestData {
    phone?: string,
    name?: string,
}

export async function POST(request: NextRequest) {
    try {

        const userSession = await getServerSession();
        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in .env");
        }

        if (
            !userSession?.user?.email ||
            userSession.user.email !== SUPER_ADMIN_EMAIL
        ) {
            throw new Error("Only super admin can create new contact.")
        }

        const body = await request.json() as CreateNewContactRequestData | undefined;
        if (!body || !body?.phone || !body?.name) {
            throw new Error("Required fields are missing.");
        }

        const created = await createNewContact({
            name: body.name,
            phone: body.phone,
        })

        console.log(created)

        if (!created) {
            throw new Error("Contact already exist!");
        }

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}