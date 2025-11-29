import { dbConnect } from "@/config/dbConfig";
import ServiceBrandsModel, { ServiceBrandsModelinterface } from "@/models/service/brand";

export async function fetchAllServiceBrands (data: {
    currentPage: number,
    customLimit: number,
}) {
    return new Promise<ServiceBrandsModelinterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();
            const LIMIT = data.customLimit || 10;
            const skip = (data.currentPage - 1) * LIMIT;

            const brands = await ServiceBrandsModel.find({}, null, {
                limit: LIMIT,
                skip,
            })

            return resolve(brands);

        } catch (err) {
            return reject(err);
        }
    })
}