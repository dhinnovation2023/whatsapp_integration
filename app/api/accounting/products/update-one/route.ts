import { updateOneProductById, UpdateOneProductRequestData } from "@/functions/accounting/products/update-one-product";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as UpdateOneProductRequestData;

        if (!body || !body._id) {
            throw new Error("_id is required.");
        }

        await updateOneProductById(body);

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}