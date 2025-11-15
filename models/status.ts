import mongoose from "mongoose";

export interface StatusModelInterface {
    name: string,
    color: string,
    statusId: string,
    createdAt: Date,
    updatedAt: Date,
} 

const statusSchema = new mongoose.Schema<StatusModelInterface>({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    statusId: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const StatusModel = mongoose.models.Status || mongoose.model('Status', statusSchema);
export default StatusModel;