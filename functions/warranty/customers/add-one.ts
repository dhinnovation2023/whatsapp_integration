import { dbConnect } from "@/config/dbConfig";
import WarrantyCustomersModel, { WarrantyCustomersModelInterface } from "@/models/warranty/customers";

export async function addOneWarrantyCustomers (data: WarrantyCustomersModelInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const newCustomer = new WarrantyCustomersModel(data);

            await newCustomer.save();

            return resolve();

        } catch (err) {
            reject(err);
        }
    })
}