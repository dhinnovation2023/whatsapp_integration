import { dbConnect } from "@/config/dbConfig";
import WarrantyCustomersModel from "@/models/warranty/customers";

export async function deleteOneWarrantyCustomerByObjectId(objectId:string | undefined) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            if (!objectId) {
                throw new Error("Field objectId is required.");
            }

            await dbConnect();
            await WarrantyCustomersModel.findByIdAndDelete(objectId);

            return resolve();
        } catch (err) {
            reject(err);
        }
    })
}