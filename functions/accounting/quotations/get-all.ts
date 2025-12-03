import { dbConnect } from "@/config/dbConfig";
import QuotationsModel, { QuotationsModelInterface } from "@/models/accounting/quotation";

export interface GetAllQuotationsRequestData {
    currentPage: number,
    searchText?: string,
}

export async function getAllQuotations(data: GetAllQuotationsRequestData) {
    return new Promise<QuotationsModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            const limit = 10;
            const skip = (data.currentPage - 1) * limit;

            const findQuery: {
                // eslint-disable-next-line
                [key: string]: any,
            } = {};

            if (data.searchText) {
                findQuery["invoiceNo"] = { $regex: data.searchText, $options: "i" }
            }

            const quotations = await QuotationsModel.find(findQuery, null, {
                limit,
                skip,
            })

            return resolve(quotations);

        } catch (err) {
            return reject(err);
        }
    })
}