import mongoose from "mongoose";

export interface ServiceBrandsModelinterface extends mongoose.Document {
    name: string,
    content: string,
    createdAt: Date | number,
    updatedAt: Date | number,
}

const serviceBrandsSchema = new mongoose.Schema<ServiceBrandsModelinterface>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ServiceBrandsModel = mongoose.models.ServiceBrands || mongoose.model('ServiceBrands', serviceBrandsSchema);
export default ServiceBrandsModel;