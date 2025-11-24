import { handleCatchBlock } from "@/functions/common";
import { addOneWarrantyCustomers } from "@/functions/warranty/customers/add-one";
import { WarrantyCustomersModelInterface } from "@/models/warranty/customers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as WarrantyCustomersModelInterface;

        if (!body || Object.keys(body).length === 0) {
            throw new Error("Required fields are missing");
        }

        await addOneWarrantyCustomers(body);

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}