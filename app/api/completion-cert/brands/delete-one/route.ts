import { handleCatchBlock } from "@/functions/common";
import { deleteOneCompletionCertBrand } from "@/functions/completion-cert/brands/delete-one";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = request.json() as {
            objectId?: string,
        }

        if (!body || !body.objectId) {
            throw new Error("ObjectId field is required.")
        }

        await deleteOneCompletionCertBrand(body.objectId);
        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}