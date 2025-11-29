import { dbConnect } from "@/config/dbConfig";
import ServiceCustomersModel, { ServiceCustomersModelInterface } from "@/models/service/customers";

export async function addOneServiceCustomer (data: ServiceCustomersModelInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const customer = new ServiceCustomersModel(data);
            await customer.save()
            return resolve();
        } catch (err) {
            return reject(err)
        }
    })
}