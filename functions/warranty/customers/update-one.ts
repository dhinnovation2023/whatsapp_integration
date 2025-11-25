import { dbConnect } from "@/config/dbConfig";
import WarrantyCustomersModel, { WarrantyCustomersModelInterface } from "@/models/warranty/customers";

export async function updateOneWarrantyDataById
    ({ _id, ...data }: WarrantyCustomersModelInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            if (!_id) {
                throw new Error("Required field ID is missing.")
            }

            await dbConnect();
            await WarrantyCustomersModel.findByIdAndUpdate(_id, data);
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}