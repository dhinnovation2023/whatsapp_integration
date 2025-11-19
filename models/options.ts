import mongoose from "mongoose";

export interface OptionsModelInterface {
    name: "google-oauth",
    value: string, // JSON Stringify data
    createdAt: Date | string,
    updatedAt: Date | string,
}

const optionsSchema = new mongoose.Schema<OptionsModelInterface>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const OptionsModel = mongoose.models.Options || mongoose.model("Options", optionsSchema);
export default OptionsModel;