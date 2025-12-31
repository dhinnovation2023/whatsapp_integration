import { dbConnect } from "@/config/dbConfig";
import ProductsModel, { ProductsModelInterface, ProductsType } from "@/models/accounting/products";

export interface GetAllProductsRequestData {
    currentPage: number,
    searchText?: string,
    productType?: ProductsType,
}

export async function getAllProducts(data: GetAllProductsRequestData) {
    return new Promise<ProductsModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            if (!data.currentPage) {
                throw new Error("currentPage field is required!");
            }

            const limit = 10;
            const skip = (data.currentPage - 1) * limit;

            const findQuery: {
                // eslint-disable-next-line
                [key: string]: any,
            } = {};

            if (data.productType) {
                findQuery["productType"] = data.productType;
            }

            if (data.searchText) {
                findQuery["name"] = { $regex: data.searchText, $options: "i" }
            }

            const products = await ProductsModel.find(findQuery, null, {
                limit,
                skip,
                sort: {
                    createdAt: -1,
                }
            });

            return resolve(products);

        } catch (err) {
            return reject(err);
        }
    })
}