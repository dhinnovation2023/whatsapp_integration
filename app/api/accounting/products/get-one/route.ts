import { getOneProductById } from "@/functions/accounting/products/get-one-product";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export interface GetOneProductRequestData {
    objectId?: string,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GetOneProductRequestData;
        
        if (!body || !body.objectId) {
            throw new Error("Object Id field is required");
        }

        const product = await getOneProductById(body.objectId);

        return NextResponse.json(product);
        
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}