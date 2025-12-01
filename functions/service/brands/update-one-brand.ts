import { dbConnect } from "@/config/dbConfig";
import ServiceBrandsModel from "@/models/service/brand";
import { AddNewServiceBrandRequestData } from "./add-new-brand";

export interface UpdateServiceBrandRequestData extends AddNewServiceBrandRequestData {
    objectId: string,
}

export async function updateOneServiceBrand({ objectId, ...data }: UpdateServiceBrandRequestData) {
    return new Promise<void>(async (resolve, rejects) => {
        try {
            await dbConnect();
            await ServiceBrandsModel.findByIdAndUpdate(objectId, data);
            return resolve();

        } catch (err) {
            rejects(err);
        }
    })
}