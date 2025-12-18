import { dbConnect } from "@/config/dbConfig";
import CompletionCertCustomersModel, { CompletionCertCustomersModelInterface } from "@/models/completion-cert/customers";

export async function addOneCompletionCertCustomer(data: CompletionCertCustomersModelInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const customer = new CompletionCertCustomersModel(data);
            await customer.save()
            return resolve();
        } catch (err) {
            return reject(err)
        }
    })
}