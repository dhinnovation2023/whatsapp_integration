import CompletionCertBrandsModel from "@/models/completion-cert/brands";

export interface UpdateOneCompletionCertBrandRequestData {
    objectId: string,
    name: string,
    content: string,
}

export async function updateOneCompletionCertBrand ({objectId, ...data}: UpdateOneCompletionCertBrandRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            if (!objectId) {
                throw new Error("objectId field is required.")
            } else if (!data.name) {
                throw new Error("name field is required.")
            } else if (!data.content) {
                throw new Error("content field is required.")
            }

            await CompletionCertBrandsModel.findByIdAndUpdate(objectId, data);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}