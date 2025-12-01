import { dbConnect } from "@/config/dbConfig";
import ServiceCustomersModel from "@/models/service/customers";

export async function deleteOneServiceCustomerById (objectId: string | undefined) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!objectId) {
                throw new Error('objectId is required for delete');
            }

            await ServiceCustomersModel.findByIdAndDelete(objectId);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}