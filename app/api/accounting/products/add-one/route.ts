import { addOneProduct } from "@/functions/accounting/products/add-one-product";
import { handleCatchBlock } from "@/functions/common";
import { ProductsModelInterface } from "@/models/accounting/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as ProductsModelInterface;

        if (
            !body.name ||
            !body.price ||
            !body.productType
        ) {
            throw new Error("Required fields are missing.")
        }

        await addOneProduct(body);
        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}