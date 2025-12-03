import { getOneQuotationById } from "@/functions/accounting/quotations/get-one";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export interface GetOneQuotationRequestData {
    objectId?: string,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GetOneQuotationRequestData;
        const quotation = await getOneQuotationById(body.objectId);
        return NextResponse.json(quotation);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}