import { handleCatchBlock } from "@/functions/common";
import { updateOneServiceBrand, UpdateServiceBrandRequestData } from "@/functions/service/brands/update-one-brand";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { objectId, ...data } = await request.json() as UpdateServiceBrandRequestData;

        if (!objectId) {
            throw new Error("Object Id is required for update brand data");
        }

        await updateOneServiceBrand({
            objectId,
            ...data,
        })

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}