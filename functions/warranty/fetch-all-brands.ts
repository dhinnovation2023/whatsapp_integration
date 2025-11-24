import { dbConnect } from "@/config/dbConfig";
import WarrantyBrandsModel, { WarrantyBrandsModelInterface } from "@/models/warranty/brands";

export async function getAllWarrantyBrands (data: {
    currentPage: number,
}) {
    return new Promise<WarrantyBrandsModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            const limit = 10;
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