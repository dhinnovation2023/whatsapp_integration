import { handleCatchBlock } from "@/functions/common";
import { deleteOneFirebaseUpload } from "@/functions/firebase/delete-one-file";
import { deleteOneServiceCustomerById } from "@/functions/service/customers/delete-one-by-id";
import { getOneServiceCustomer } from "@/functions/service/customers/get-one";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as {
            objectId?: string,
        }

        if (!body || !body.objectId) {
            throw new Error("ObjectId is required");
        }

        const serviceCustomer = await getOneServiceCustomer(body.objectId);

        if (!serviceCustomer) {
            throw new Error("Service Customer not found!");
        }

        if (serviceCustomer.uploads.length > 0) {
            for (const path of serviceCustomer.uploads) {
                await deleteOneFirebaseUpload(path);
            }
        }

        await deleteOneServiceCustomerById(body.objectId);
        return NextResponse.json({ ok: true });
    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}