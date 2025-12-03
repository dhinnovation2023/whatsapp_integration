import { deleteOneQuotationById } from "@/functions/accounting/quotations/delete-one";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export interface DeleteOneQuotationRequestData {
    objectId?: string,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as DeleteOneQuotationRequestData;

        if (!body || !body.objectId) {
            throw new Error("ObjectId is required");
        }

        await deleteOneQuotationById(body.objectId);
        return NextResponse.json({ ok: true });
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}