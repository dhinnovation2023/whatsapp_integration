import { handleCatchBlock } from "@/functions/common";
import { addOneCompletionCertCustomer } from "@/functions/completion-cert/customers/add-one";
import { uploadOneFile } from "@/functions/firebase/upload";
import serviceCustomerConfigs from "@/functions/service/customers/configs";
import { CompletionCertCustomersModelInterface } from "@/models/completion-cert/customers";
import { NextRequest, NextResponse } from "next/server";

export type AddNewCompletionCertCustomerRequestData = Omit<CompletionCertCustomersModelInterface, "uploads"> & {
    uploads: File[],
}

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const { uploads, ...data }: AddNewCompletionCertCustomerRequestData = {
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

        const uploadsUrls: string[] = [];

        for (const file of uploads) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePathname = await uploadOneFile({
                buffer,
                mime_type: file.type,
                folders: serviceCustomerConfigs.imagesFolder,
            });
            uploadsUrls.push(filePathname);
        }

        const savingData: CompletionCertCustomersModelInterface = {
            ...data,
            uploads: uploadsUrls,
        }

        await addOneCompletionCertCustomer(savingData);
        return NextResponse.json({ ok: true });

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message);
    }
}