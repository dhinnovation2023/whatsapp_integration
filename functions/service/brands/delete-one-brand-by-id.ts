import { dbConnect } from "@/config/dbConfig";
import ServiceBrandsModel from "@/models/service/brand";

export async function deleteOneServiceBrandById (objectId: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await ServiceBrandsModel.findByIdAndDelete(objectId);

            return resolve();

        } catch (err) {
            reject(err);
        }
    })
}