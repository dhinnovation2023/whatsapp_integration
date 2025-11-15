import { handleCatchBlock } from "@/functions/common";
import { fetchAllStatus } from "@/functions/status/fetch-all";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const statusList = await fetchAllStatus({});
        return NextResponse.json(statusList);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}