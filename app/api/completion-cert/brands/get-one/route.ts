import { handleCatchBlock } from "@/functions/common";
import { getOneCompletionCertBrand } from "@/functions/completion-cert/brands/get-one";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as { objectId: string };
        if (!body) {
            throw new Error("Required fields are missing.")
        }

        const brand = await getOneCompletionCertBrand(body.objectId);
        return NextResponse.json(brand);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}