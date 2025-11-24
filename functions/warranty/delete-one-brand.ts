import { dbConnect } from "@/config/dbConfig";
import WarrantyBrandsModel from "@/models/warranty/brands";

export async function deleteOneWarrantyBrand (objectId: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            
            await dbConnect();
            await WarrantyBrandsModel.findByIdAndDelete(objectId);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}