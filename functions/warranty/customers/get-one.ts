import { dbConnect } from "@/config/dbConfig";
import WarrantyCustomersModel, { WarrantyCustomersModelInterface } from "@/models/warranty/customers";

export async function getOneWarrantyCustomerData(objectId: string) {
    return new Promise<WarrantyCustomersModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const targetCustomer = WarrantyCustomersModel.findById(objectId);

            return resolve(targetCustomer);
        } catch (err) {
            return reject(err);
        }
    })
}