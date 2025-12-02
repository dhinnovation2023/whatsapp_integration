import { dbConnect } from "@/config/dbConfig";
import ProductsModel, { ProductsModelInterface } from "@/models/accounting/products";

export async function addOneProduct (data: ProductsModelInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const product = new ProductsModel(data);
            await product.save();

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}