import { handleCatchBlock } from "@/functions/common";
import { generateBasicReport, GenerateBasicReportRequestDataInterface } from "@/functions/reports/basic-report";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as GenerateBasicReportRequestDataInterface;
        if (!body) {
            throw new Error("Required fields missing.");
        }
        const sheetUrl = await generateBasicReport(body);
        return NextResponse.json(sheetUrl);
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}