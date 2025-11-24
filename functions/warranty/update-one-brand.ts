import { dbConnect } from "@/config/dbConfig";
import { AddNewWarrantyBrandRequestData } from "./add-new-brand";
import WarrantyBrandsModel from "@/models/warranty/brands";

export interface UpdateWarrantyBrandRequestData extends AddNewWarrantyBrandRequestData {
    objectId: string,
}

export async function updateOneWarrantyBrand ({objectId, ...data}: UpdateWarrantyBrandRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await WarrantyBrandsModel.findByIdAndUpdate(objectId, data)

            return resolve()
        } catch (err) {
            return reject(err);
        }
    })
}