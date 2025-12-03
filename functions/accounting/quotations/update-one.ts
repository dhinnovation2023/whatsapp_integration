import { dbConnect } from "@/config/dbConfig";
import QuotationsModel, { QuotationsModelInterface } from "@/models/accounting/quotation";

export type UpdateQuotationRequestData = Omit<QuotationsModelInterface, "_id"> & {
    objectId: string,
}

export async function updateOneQuotationById ({objectId, ...data}: UpdateQuotationRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            if (!objectId) {
                throw new Error("ObjectId is required");
            }

            await dbConnect();

            await QuotationsModel.findByIdAndUpdate(objectId, data);
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}