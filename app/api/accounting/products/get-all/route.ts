import { getAllProducts, GetAllProductsRequestData } from "@/functions/accounting/products/get-all-products";
import { handleCatchBlock } from "@/functions/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GetAllProductsRequestData;

        if (!body) {
            throw new Error("Required fields are missing.");
        }

        const products = await getAllProducts(body);

        return NextResponse.json(products);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}