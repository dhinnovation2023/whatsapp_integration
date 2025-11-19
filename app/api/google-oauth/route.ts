import { handleCatchBlock } from "@/functions/common";
import { getTokensFromCode, saveTokensToDB } from "@/functions/google-auth/googleOAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        const urlObject = URL.parse(request.url);
        const code = urlObject?.searchParams.get("code");
        if (!code) {
            throw new Error("Code not found in search params!");
        }

        const tokens = await getTokensFromCode(code);

        if (!tokens.access_token) {
            throw new Error("access_token not found in tokens");
        }

        await saveTokensToDB({ tokens });

        const redirectUrl = new URL('/app', request.nextUrl);
        console.log(redirectUrl)

        return NextResponse.redirect(redirectUrl)

    } catch (err) {
        console.log(err);
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}