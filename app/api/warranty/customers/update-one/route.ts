import { handleCatchBlock } from "@/functions/common";
import { updateOneWarrantyDataById } from "@/functions/warranty/customers/update-one";
import { WarrantyCustomersModelInterface } from "@/models/warranty/customers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as WarrantyCustomersModelInterface;
        await updateOneWarrantyDataById(body);
        return NextResponse.json(true);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}