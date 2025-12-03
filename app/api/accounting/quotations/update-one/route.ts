import { updateOneQuotationById, UpdateQuotationRequestData } from "@/functions/accounting/quotations/update-one";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as UpdateQuotationRequestData;

        if (!body || !body.objectId) {
            throw new Error("Object Id is missing.");
        }

        await updateOneQuotationById(body);

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}