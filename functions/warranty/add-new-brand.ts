import { dbConnect } from "@/config/dbConfig";
import WarrantyBrandsModel from "@/models/warranty/brands";

export interface AddNewWarrantyBrandRequestData {
    name: String,
    content: string,
}

export async function addNewWarrantyBrand (data: AddNewWarrantyBrandRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            
            const newBrand = new WarrantyBrandsModel(data);
            await newBrand.save();

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}