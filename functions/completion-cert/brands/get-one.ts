import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "@/functions/common"
import CompletionCertBrandsModel, { CompletionCertBrandsModelInterface } from "@/models/completion-cert/brands";

export async function getOneCompletionCertBrand (objectId: string | undefined) {
    return new Promise<CompletionCertBrandsModelInterface>(async (resolve, reject) => {
        try {

            await dbConnect();
            
            if (!objectId) {
                throw new Error("ObjectId is required!");
            }

            const brand = await CompletionCertBrandsModel.findById(objectId);
            return reject(brand);

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}