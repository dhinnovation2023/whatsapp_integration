import { handleCatchBlock } from "@/functions/common";
import { addNewServiceBrand } from "@/functions/service/brands/add-new-brand";
import { ServiceBrandsModelinterface } from "@/models/service/brand";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as ServiceBrandsModelinterface;
        if (!body) {
            throw new Error("Required fields are missing.")
        }

        await addNewServiceBrand(body);
        return NextResponse.json(true);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}