import { dbConnect } from "@/config/dbConfig";
import ProductsModel, { ProductsModelInterface } from "@/models/accounting/products";

export type UpdateOneProductRequestData = Omit<ProductsModelInterface, "_id"> & {
    _id: string,
}

export async function updateOneProductById({ _id, ...data }: UpdateOneProductRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!_id) {
                throw new Error("ObjectId is required.");
            }

            await ProductsModel.findByIdAndUpdate(_id, data);

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}