import { dbConnect } from "@/config/dbConfig";
import ServiceCustomersModel, { ServiceCustomersModelInterface } from "@/models/service/customers";

export async function getOneServiceCustomer (objectId: string) {
    return new Promise<ServiceCustomersModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const customer = await ServiceCustomersModel.findById(objectId);
            return resolve(customer);
        } catch (err) {
            return reject(err);
        }
    })
}