import { dbConnect } from "@/config/dbConfig";
import CompletionCertCustomersModel, { CompletionCertCustomersModelInterface } from "@/models/completion-cert/customers";

export async function getAllCompletionCertCustomers({ currentPage }: {
    currentPage: number,
}) {
    return new Promise<CompletionCertCustomersModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();
            const limit = 10;
            const skip = (currentPage - 1) * limit;

            const customers = await CompletionCertCustomersModel.find({}, null, {
                limit,
                skip,
            })

            return resolve(customers);

        } catch (err) {
            return reject(err);
        }
    })
}