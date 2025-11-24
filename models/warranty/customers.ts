import mongoose from "mongoose";

export interface WarrantyCustomersModelInterface {
    _id?: string,
    invoiceNo: string,
    brand: string,
    productName: string,
    customerType: string,
    customerName: string,
    phone: string,
    location: string,
    dateOfSupply: Date | number,
    warrantyPeriod: string,
    currentDate: Date | number,
    villaNo: string,

    // timestamp
    createdAt?: Date,
    updatedAt?: Date,
}

const defaultTextSchemaRequired = {
    type: String,
    required: true,
}

const defaultDateSchemaRequired = {
    type: Date,
    required: true,
}

const warrantyCustomersSchema = new mongoose.Schema<WarrantyCustomersModelInterface>({
    brand: defaultTextSchemaRequired,
    currentDate: defaultDateSchemaRequired,
    customerName: defaultTextSchemaRequired,
    customerType: defaultTextSchemaRequired,
    dateOfSupply: defaultDateSchemaRequired,
    invoiceNo: defaultTextSchemaRequired,
    location: defaultTextSchemaRequired,
    phone: defaultTextSchemaRequired,
    productName: defaultTextSchemaRequired,
    villaNo: defaultTextSchemaRequired,
    warrantyPeriod: defaultTextSchemaRequired,
}, { timestamps: true });

const WarrantyCustomersModel = mongoose.models.WarrantyCustomers || mongoose.model('WarrantyCustomers', warrantyCustomersSchema);
export default WarrantyCustomersModel;