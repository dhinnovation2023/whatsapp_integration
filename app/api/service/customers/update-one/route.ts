import { NextRequest, NextResponse } from "next/server";
import { handleCatchBlock } from "@/functions/common";
import { updateOneServiceCustomer } from "@/functions/service/customers/update-one";
import { ServiceCustomersModelInterface } from "@/models/service/customers";

export type UpdateServiceCustomersRequestData = Omit<ServiceCustomersModelInterface, "uploads"> & {
    uploads: File[],
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const requestData: UpdateServiceCustomersRequestData = {
            _id: formData.get('_id') as string,
            invoiceNo: formData.get("invoiceNo") as string,
            brand: formData.get("brand") as string,
            productName: formData.get("productName") as string,
            customerType: formData.get("customerType") as string,
            customerName: formData.get("customerName") as string,
            phone: formData.get("phone") as string,
            location: formData.get("location") as string,
            dateOfService: new Date(Number(formData.get("dateOfService") as string)),
            villaNo: formData.get("villaNo") as string,
            nthService: Number(formData.get("nthService") as string),
            uploads: formData.getAll("uploads") as File[],
        }

        console.log(requestData);

        await updateOneServiceCustomer(requestData);

        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}