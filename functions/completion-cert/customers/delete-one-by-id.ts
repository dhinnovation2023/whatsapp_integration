import { dbConnect } from "@/config/dbConfig";
import CompletionCertCustomersModel from "@/models/completion-cert/customers";

export async function deleteOneCompletionCertCustomerById(objectId: string | undefined) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!objectId) {
                throw new Error('objectId is required for delete');
            }

            await CompletionCertCustomersModel.findByIdAndDelete(objectId);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}