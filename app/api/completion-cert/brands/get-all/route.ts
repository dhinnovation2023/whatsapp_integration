import { handleCatchBlock } from "@/functions/common";
import { getAllCompletionCertBrands, GetAllCompletionCertBrandsRequestData } from "@/functions/completion-cert/brands/get-all";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as GetAllCompletionCertBrandsRequestData;

        if (!body || !body.currentPage) {
            throw new Error("currentPage field is required.")
        }

        const brands = await getAllCompletionCertBrands(body);
        return NextResponse.json(brands);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}