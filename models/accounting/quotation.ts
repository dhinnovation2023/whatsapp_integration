import mongoose from "mongoose";

export interface QuotationsModelInterface {
    customerName: string,
    phone: string,
    location: string,
    products: {
        productId: string,
        price: number,
        tax: boolean,
    }[],
    note: string,
}

const quotationsSchema = new mongoose.Schema<QuotationsModelInterface>({
    customerName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            tax: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true })

const QuotationsModel = mongoose.models.Quotations || mongoose.model("Quotations", quotationsSchema);
export default QuotationsModel;