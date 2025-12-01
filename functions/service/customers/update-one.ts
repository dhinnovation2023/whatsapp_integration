import { UpdateServiceCustomersRequestData } from "@/app/api/service/customers/update-one/route";
import { dbConnect } from "@/config/dbConfig";
import { deleteOneFirebaseUpload } from "@/functions/firebase/delete-one-file";
import { uploadOneFile } from "@/functions/firebase/upload";
import ServiceCustomersModel, { ServiceCustomersModelInterface } from "@/models/service/customers";
import serviceCustomerConfigs from "./configs";

export async function updateOneServiceCustomer (data: UpdateServiceCustomersRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!data._id) {
                throw new Error("Object Id is missing.");
            }

            const prevData = await ServiceCustomersModel.findById(data._id) as ServiceCustomersModelInterface;

            for (const filepath of prevData.uploads) {
                await deleteOneFirebaseUpload(filepath);
            }

            const newPaths: string[] = []
            for (const file of data.uploads) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const path = await uploadOneFile({
                    buffer,
                    folders: serviceCustomerConfigs.imagesFolder,
                    mime_type: file.type,
                })
                newPaths.push(path)
            }

            const updatedData: ServiceCustomersModelInterface = {
                ...data,
                uploads: newPaths,
            }
            
            await ServiceCustomersModel.findByIdAndUpdate(data._id, updatedData);

            return resolve();

        } catch (err) {
            reject(err);
        }
    })
}