import { handleCatchBlock } from "@/functions/common";
import { updateOneCompletionCertBrand, UpdateOneCompletionCertBrandRequestData } from "@/functions/completion-cert/brands/update-one";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as UpdateOneCompletionCertBrandRequestData;
        await updateOneCompletionCertBrand(body);

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}