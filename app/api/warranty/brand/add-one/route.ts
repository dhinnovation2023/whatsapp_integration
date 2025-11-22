import { handleCatchBlock } from "@/functions/common";
import { addNewWarrantyBrand, AddNewWarrantyBrandRequestData } from "@/functions/warranty/add-new-brand";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as AddNewWarrantyBrandRequestData;
        await addNewWarrantyBrand(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}