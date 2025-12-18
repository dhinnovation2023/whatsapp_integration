import serviceCustomerConfigs from "../../service/customers/configs";
import { dbConnect } from "@/config/dbConfig";
import { deleteOneFirebaseUpload } from "@/functions/firebase/delete-one-file";
import { uploadOneFile } from "@/functions/firebase/upload";
import CompletionCertCustomersModel, { CompletionCertCustomersModelInterface } from "@/models/completion-cert/customers";

export type UpdateCompletionCertCustomerRequestData = Omit<CompletionCertCustomersModelInterface, "uploads"> & {
    uploads: File[],
}

export async function updateOneCompletionCertCustomer(data: UpdateCompletionCertCustomerRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!data._id) {
                throw new Error("Object Id is missing.");
            }

            const prevData = await CompletionCertCustomersModel.findById(data._id) as CompletionCertCustomersModelInterface;

            for (const filepath of prevData.uploads) {
                await deleteOneFirebaseUpload(filepath);
            }

            const newPaths: string[] = []
            for (const file of data.uploads) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const path = await uploadOneFile({
                    buffer,
                    folders: serviceCustomerConfigs.imagesFolder,
                    mime_type: file.type,
                })
                newPaths.push(path)
            }

            const updatedData: CompletionCertCustomersModelInterface = {
                ...data,
                uploads: newPaths,
            }

            await CompletionCertCustomersModel.findByIdAndUpdate(data._id, updatedData);

            return resolve();

        } catch (err) {
            reject(err);
        }
    })
}