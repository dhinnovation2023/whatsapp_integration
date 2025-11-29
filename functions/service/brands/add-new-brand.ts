import { dbConnect } from "@/config/dbConfig";
import ServiceBrandsModel, { ServiceBrandsModelinterface } from "@/models/service/brand";

export interface AddNewServiceBrandRequestData {
    name: string,
    content: string,
}

export async function addNewServiceBrand(data: ServiceBrandsModelinterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const newBrand = new ServiceBrandsModel(data);
            await newBrand.save();

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}