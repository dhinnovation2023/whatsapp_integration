import mongoose, { Model, ObjectId } from "mongoose";

export interface QuotationsModelInterface {
    _id?: ObjectId | string,
    customerName: string,
    phone: string,
    location: string,
    products: {
        productId: string,
        price: number,
        tax: boolean,
        qty: number,
    }[],
    status?: "quoted" | "pending" | "invoiced",
    note?: {
        heading: string,
        content: string,
    }[],
    invoiceNo?: string,
    createdAt?: Date | number | string,
    updatedAt?: Date | number | string,
}

const NoteSchema = new mongoose.Schema({
    heading: { type: String },
    content: { type: String },
});

const quotationsSchema = new mongoose.Schema<QuotationsModelInterface>({
    customerName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    note: [NoteSchema],
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
                type: Boolean,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            }
        }
    ],
    invoiceNo: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ["quoted", "pending", "invoiced"],
        required: true,
    },
}, { timestamps: true })

quotationsSchema.pre('save', async function (next) {
    if (this.invoiceNo) {
        return next();
    }

    const Model = this.constructor as Model<QuotationsModelInterface>;

    const lastDoc = await Model.findOne({}, { invoiceNo: 1 })
        .sort({ invoiceNo: -1 })

    let nextNumber = 1;

    if (lastDoc && lastDoc.invoiceNo) {
        const lastNum = parseInt(lastDoc.invoiceNo.replace("QT", ""));
        nextNumber = lastNum + 1;
    }

    this.invoiceNo = `QT${String(nextNumber).padStart(4, "0")}`;
    return next();
})

const QuotationsModel = mongoose.models.Quotations || mongoose.model("Quotations", quotationsSchema);
export default QuotationsModel;