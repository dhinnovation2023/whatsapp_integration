import { dbConnect } from "@/config/dbConfig";
import ServiceBrandsModel, { ServiceBrandsModelinterface } from "@/models/service/brand";

export async function fetchOneServiceBrand (objectId: string) {
    return new Promise<ServiceBrandsModelinterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const brand = await ServiceBrandsModel.findById(objectId);
            return resolve(brand);
        } catch (err) {
            reject(err);
        }
    })
}