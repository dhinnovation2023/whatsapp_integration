import mongoose from "mongoose";

export interface ProductsModelInterface {
    _id?: string,
    name: string,
    price: number,
    productType: ProductsType,
    createdAt?: Date | string,
}

export type ProductsType = "product" | "service";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productType: {
        type: String,
        enum: ["product", "service"],
        required: true,
    },
}, { timestamps: true })

const ProductsModel = mongoose.models.Products || mongoose.model("Products", productsSchema);
export default ProductsModel;