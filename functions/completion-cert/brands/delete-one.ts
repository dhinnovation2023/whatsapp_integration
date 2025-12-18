import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "@/functions/common"
import CompletionCertBrandsModel from "@/models/completion-cert/brands";

export async function deleteOneCompletionCertBrand (objectId: string | undefined) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!objectId) {
                throw new Error("Object Id is required for deleting brands");
            }

            await CompletionCertBrandsModel.findByIdAndDelete(objectId);
            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
} 