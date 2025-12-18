import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "@/functions/common";
import CompletionCertBrandsModel, { CompletionCertBrandsModelInterface } from "@/models/completion-cert/brands";

export interface GetAllCompletionCertBrandsRequestData {
    currentPage: number,
    customLimit?: number,
}

export async function getAllCompletionCertBrands(option: GetAllCompletionCertBrandsRequestData) {
    return new Promise<CompletionCertBrandsModelInterface[]>(async (resolve, reject) => {
        try {

            await dbConnect();
            const LIMIT = option.customLimit || 10;
            const skip = (option.currentPage - 1) * LIMIT;

            const brands = await CompletionCertBrandsModel.find({}, null, {
                limit: LIMIT,
                skip,
            })

            return resolve(brands);

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}