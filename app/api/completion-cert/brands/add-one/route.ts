import { handleCatchBlock } from "@/functions/common";
import { addOneCompletionCertBrand, AddOneCompletionCertBrandRequestData } from "@/functions/completion-cert/brands/add-one";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as AddOneCompletionCertBrandRequestData;

        if (!body || !body.name || !body.content) {
            throw new Error("Required fields are missing.");
        }

        await addOneCompletionCertBrand(body);

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}