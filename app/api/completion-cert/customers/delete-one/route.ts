import { handleCatchBlock } from "@/functions/common";
import { deleteOneCompletionCertCustomerById } from "@/functions/completion-cert/customers/delete-one-by-id";
import { getOneCompletionCertCustomer } from "@/functions/completion-cert/customers/get-one";
import { deleteOneFirebaseUpload } from "@/functions/firebase/delete-one-file";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as {
            objectId?: string,
        }

        if (!body || !body.objectId) {
            throw new Error("ObjectId is required");
        }

        const completionCustomer = await getOneCompletionCertCustomer(body.objectId);

        if (!completionCustomer) {
            throw new Error("Completion Customer not found!");
        }

        if (completionCustomer.uploads.length > 0) {
            for (const path of completionCustomer.uploads) {
                await deleteOneFirebaseUpload(path);
            }
        }

        await deleteOneCompletionCertCustomerById(body.objectId);
        return NextResponse.json({ ok: true });
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}