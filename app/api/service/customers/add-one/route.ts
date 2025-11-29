import { handleCatchBlock } from "@/functions/common";
import { uploadOneFile } from "@/functions/firebase/upload";
import { addOneServiceCustomer } from "@/functions/service/customers/add-one";
import { ServiceCustomersModelInterface } from "@/models/service/customers";
import { NextRequest, NextResponse } from "next/server";

export type AddNewServiceCustomerRequestDataInterface = Omit<ServiceCustomersModelInterface, "uploads"> & {
    uploads: File[],
}

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const {uploads, ...data}: AddNewServiceCustomerRequestDataInterface = {
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

        const uploadsUrls: string[] = [];

        for (const file of uploads) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePathname = await uploadOneFile({
                buffer,
                mime_type: file.type,
                folders: ['others'],
            });
            uploadsUrls.push(filePathname);
        }

        const savingData: ServiceCustomersModelInterface = {
            ...data,
            uploads: uploadsUrls,
        }

        await addOneServiceCustomer(savingData);
        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message);
    }
}