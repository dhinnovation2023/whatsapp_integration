import { deleteOneProductById } from "@/functions/accounting/products/delete-one-product";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export interface DeleteOneProductRequestData {
    objectId: string,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as DeleteOneProductRequestData;

        if (!body.objectId) {
            throw new Error("Object Id is required.");
        }

        await deleteOneProductById(body.objectId);

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}