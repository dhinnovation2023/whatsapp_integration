import { dbConnect } from "@/config/dbConfig";
import ProductsModel, { ProductsModelInterface } from "@/models/accounting/products";

export async function getOneProductById (objectId: string | undefined) {
    return new Promise<ProductsModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!objectId) {
                throw new Error("Object id is required.")
            }

            const product = await ProductsModel.findById(objectId);
            if (!product) {
                throw new Error("Product not found!");
            }

            return resolve(product);

        } catch (err) {
            reject(err);
        }
    })
}