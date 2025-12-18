import { handleCatchBlock } from "@/functions/common";
import { deleteOneCompletionCertBrand } from "@/functions/completion-cert/brands/delete-one";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        const session = await getServerSession();
        if (!session?.user?.email) {
            throw new Error("User in not logged in.")
        }

        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

        if (!SUPER_ADMIN_EMAIL) {
            throw new Error("Please provide SUPER_ADMIN_EMAIL in .env file");
        }

        if (SUPER_ADMIN_EMAIL !== session.user.email) {
            throw new Error("User is not authorized to do this.");
        }

        const urlObject = new URL(request.url);
        const objectId = urlObject.searchParams.get("id");

        if (!objectId) {
            throw new Error("Object id is not valid!");
        }

        await deleteOneCompletionCertBrand(objectId);
        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message);
    }
}