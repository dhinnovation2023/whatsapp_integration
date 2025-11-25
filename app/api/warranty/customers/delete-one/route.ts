import { handleCatchBlock } from "@/functions/common";
import { deleteOneWarrantyCustomerByObjectId } from "@/functions/warranty/customers/delete-one-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as {
            objectId?: string,
        }

        await deleteOneWarrantyCustomerByObjectId(body.objectId);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}