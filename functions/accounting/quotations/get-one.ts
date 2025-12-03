import { dbConnect } from "@/config/dbConfig";
import QuotationsModel, { QuotationsModelInterface } from "@/models/accounting/quotation";

export async function getOneQuotationById (objectId: string | undefined) {
    return new Promise<QuotationsModelInterface>(async (resolve, reject) => {
        try {
            if (!objectId) {
                throw new Error("Object id is required");
            }

            await dbConnect();

            const quotation = await QuotationsModel.findById(objectId);
            if (!quotation) {
                throw new Error("Quotation not found!");
            }

            return resolve(quotation);

        } catch (err) {
            return reject(err);
        }
    })
}