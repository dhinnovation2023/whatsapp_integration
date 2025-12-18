import mongoose from "mongoose";

export interface CompletionCertCustomersModelInterface {
    _id?: string,
    invoiceNo: string,
    brand: string,
    productName: string,
    customerType: string,
    customerName: string,
    phone: string,
    location: string,
    dateOfCompletion: Date | number,
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

const completionCertCustomersSchema = new mongoose.Schema<CompletionCertCustomersModelInterface>({
    brand: defaultTextSchemaRequired,
    customerName: defaultTextSchemaRequired,
    customerType: defaultTextSchemaRequired,
    dateOfCompletion: defaultDateSchemaRequired,
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

const CompletionCertCustomersModel = mongoose.models.CompletionCertCustomers || mongoose.model("CompletionCertCustomers", completionCertCustomersSchema);
export default CompletionCertCustomersModel;