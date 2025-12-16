import mongoose from "mongoose";

export interface CompletionCertBrandsModelInterface extends mongoose.Document {
    name: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
}

const completionCertBrandsSchema = new mongoose.Schema<CompletionCertBrandsModelInterface>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const CompletionCertBrandsModel = mongoose.models.CompletionCertBrands || mongoose.model("CompletionCertBrands", completionCertBrandsSchema);
export default CompletionCertBrandsModel;