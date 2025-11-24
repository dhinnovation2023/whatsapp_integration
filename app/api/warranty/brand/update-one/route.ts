import { handleCatchBlock } from "@/functions/common";
import { updateOneWarrantyBrand, UpdateWarrantyBrandRequestData } from "@/functions/warranty/update-one-brand";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as UpdateWarrantyBrandRequestData;
        if (!body.objectId) {
            throw new Error("Object ID is required for update brand data.");
        }

        await updateOneWarrantyBrand(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}