import { addOneQuotation } from "@/functions/accounting/quotations/add-one";
import { handleCatchBlock } from "@/functions/common";
import { QuotationsModelInterface } from "@/models/accounting/quotation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as QuotationsModelInterface;

        if (!body) {
            throw new Error("Required fields are missing.");
        }

        const requestData: typeof body = {
            ...body,
            status: "quoted",
        }

        await addOneQuotation(requestData);

        return NextResponse.json({ ok: true })

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}