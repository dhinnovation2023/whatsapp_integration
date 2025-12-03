import { dbConnect } from "@/config/dbConfig";
import QuotationsModel from "@/models/accounting/quotation";

export async function deleteOneQuotationById (objectId: string | undefined) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            if (!objectId) {
                throw new Error("Object id is required.");
            }

            await QuotationsModel.findByIdAndDelete(objectId);

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}