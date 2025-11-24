import { dbConnect } from "@/config/dbConfig";
import WarrantyBrandsModel, { WarrantyBrandsModelInterface } from "@/models/warranty/brands";

export async function getAllWarrantyBrands (data: {
    currentPage: number,
    customLimit?: number,
}) {
    return new Promise<WarrantyBrandsModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            const limit = data.customLimit || 10;
            const skip = (data.currentPage - 1) * limit;

            const brands = await WarrantyBrandsModel.find({}, null, {
                limit,
                skip,
            });

            return resolve(brands);

        } catch (err) {
            reject(err);
        }
    })
}