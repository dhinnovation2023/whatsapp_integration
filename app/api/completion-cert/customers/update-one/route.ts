import { NextRequest, NextResponse } from "next/server";
import { handleCatchBlock } from "@/functions/common";
import { UpdateCompletionCertCustomerRequestData, updateOneCompletionCertCustomer } from "@/functions/completion-cert/customers/update-one";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const requestData: UpdateCompletionCertCustomerRequestData = {
            _id: formData.get('_id') as string,
            invoiceNo: formData.get("invoiceNo") as string,
            brand: formData.get("brand") as string,
            productName: formData.get("productName") as string,
            customerType: formData.get("customerType") as string,
            customerName: formData.get("customerName") as string,
            phone: formData.get("phone") as string,
            location: formData.get("location") as string,
            dateOfCompletion: new Date(Number(formData.get("dateOfCompletion") as string)),
            villaNo: formData.get("villaNo") as string,
            nthService: Number(formData.get("nthService") as string),
            uploads: formData.getAll("uploads") as File[],
        }

        await updateOneCompletionCertCustomer(requestData);
        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}