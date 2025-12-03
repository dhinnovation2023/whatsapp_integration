import { dbConnect } from "@/config/dbConfig";
import QuotationsModel, { QuotationsModelInterface } from "@/models/accounting/quotation";

export async function addOneQuotation (data: QuotationsModelInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            const quotation = new QuotationsModel(data);
            await quotation.save();

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}