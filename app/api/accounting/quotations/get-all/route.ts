import { getAllQuotations, GetAllQuotationsRequestData } from "@/functions/accounting/quotations/get-all";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GetAllQuotationsRequestData;

        if (!body || !body.currentPage) {
            throw new Error("Required fields are missing.");
        }

        const quotations = await getAllQuotations(body);
        return NextResponse.json(quotations);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}