import { dbConnect } from "@/config/dbConfig";
import WarrantyBrandsModel, { WarrantyBrandsModelInterface } from "@/models/warranty/brands";

export async function fetchOneWarrantyBrand (objectId: string) {
    return new Promise<WarrantyBrandsModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const brand = await WarrantyBrandsModel.findById(objectId);
            return resolve(brand);
        } catch (err) {
            return reject(err);
        }
    })
}