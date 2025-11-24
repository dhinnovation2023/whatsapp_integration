import { handleCatchBlock } from "@/functions/common";
import { deleteOneWarrantyBrand } from "@/functions/warranty/delete-one-brand";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.email) {
            throw new Error("User in not logged in.")
        }

        const SUPER_ADMIN_EMAIL =  process.env.SUPER_ADMIN_EMAIL;
        
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

        await deleteOneWarrantyBrand(objectId);

        const redirectTarget = new URL('/app/warranty-cert', request.nextUrl);

        return NextResponse.redirect(redirectTarget);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}