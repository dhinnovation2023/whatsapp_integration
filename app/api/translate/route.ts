import { handleCatchBlock } from "@/functions/common";
import { translateLanguage } from "@/functions/translate";
import { NextRequest, NextResponse } from "next/server";

export interface TranslateLanguageApiRequestDataInterface {
    text: string,
    languageCode: string,
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as TranslateLanguageApiRequestDataInterface;
        
        if (!body.text || !body.languageCode) {
            throw new Error("text and languageCode field are required!");
        }

        const translation = await translateLanguage(body.text, body.languageCode);

        return NextResponse.json(translation);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}