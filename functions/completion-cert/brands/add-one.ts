import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "@/functions/common"
import CompletionCertBrandsModel from "@/models/completion-cert/brands";

export interface AddOneCompletionCertBrandRequestData {
    name?: string,
    content?: string,
}

export async function addOneCompletionCertBrand (data: AddOneCompletionCertBrandRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            if (!data.name || !data.content) {
                throw new Error("Required fields are missing.");
            }

            const brand = new CompletionCertBrandsModel(data);
            await brand.save();

            return resolve();
        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}