import { dbConnect } from "@/config/dbConfig";
import CompletionCertCustomersModel, { CompletionCertCustomersModelInterface } from "@/models/completion-cert/customers";

export async function getOneCompletionCertCustomer(objectId: string) {
    return new Promise<CompletionCertCustomersModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const customer = await CompletionCertCustomersModel.findById(objectId);
            console.log(customer)
            return resolve(customer);
        } catch (err) {
            return reject(err);
        }
    })
}