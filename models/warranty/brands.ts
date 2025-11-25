import mongoose from "mongoose";

export interface WarrantyBrandsModelInterface extends mongoose.Document {
    name: string,
    content: string,
    createdAt: Date | string,
    updatedAt: Date | string,
}

const warrantyBrandsSchema = new mongoose.Schema<WarrantyBrandsModelInterface>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
        unique: false,
    },
}, { timestamps: true });

const WarrantyBrandsModel = mongoose.models.WarrantyBrands || mongoose.model("WarrantyBrands", warrantyBrandsSchema);
export default WarrantyBrandsModel;