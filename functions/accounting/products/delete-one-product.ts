import { dbConnect } from "@/config/dbConfig";
import ProductsModel from "@/models/accounting/products";

export async function deleteOneProductById (objectId: string | undefined) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!objectId) {
                throw new Error("ObjectId is required");
            }

            await ProductsModel.findByIdAndDelete(objectId);
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}