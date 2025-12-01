import mongoose from "mongoose";

export interface ServiceCustomersModelInterface {
    _id?: string,
    invoiceNo: string,
    brand: string,
    productName: string,
    customerType: string,
    customerName: string,
    phone: string,
    location: string,
    dateOfService: Date | number,
    villaNo: string,
    nthService: number,
    uploads: string[],
    reminded?: boolean,

    // timestamp
    createdAt?: Date,
    updatedAt?: Date,
}

const defaultTextSchemaRequired = {
    type: String,
    required: true,
}

const defaultNumberSchemaRequired = {
    type: Number,
    required: true,
}

const defaultDateSchemaRequired = {
    type: Date,
    required: true,
}

const serviceCustomersSchema = new mongoose.Schema<ServiceCustomersModelInterface>({
    brand: defaultTextSchemaRequired,
    customerName: defaultTextSchemaRequired,
    customerType: defaultTextSchemaRequired,
    dateOfService: defaultDateSchemaRequired,
    invoiceNo: defaultTextSchemaRequired,
    location: defaultTextSchemaRequired,
    nthService: defaultNumberSchemaRequired,
    phone: defaultTextSchemaRequired,
    productName: defaultTextSchemaRequired,
    villaNo: defaultTextSchemaRequired,
    reminded: {
        type: Boolean,
        required: false,
    },
    uploads: {
        type: [String],
        required: true,
        default: [],
    },
}, { timestamps: true })

const ServiceCustomersModel = mongoose.models.ServiceCustomers || mongoose.model("ServiceCustomers", serviceCustomersSchema);
export default ServiceCustomersModel;