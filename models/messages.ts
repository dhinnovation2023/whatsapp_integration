import { ChatRole } from "@/layouts/chatbot-layout/chat-interface/chat-history";
import mongoose from "mongoose";

export interface MessagesModelInterface {
    role: ChatRole,
    phone: string,
    message?: string,
    timestamp: string,
    newMessage: boolean,
    attachments?: {
        path: string,
        mime_type: string,
    }
    location?: {
        latitude: number,
        longitude: number,
    },
    chatBy: string,
    updatedAt: string,
    createdAt: string,
    wamid?: string,
}

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    timestamp: {
        type: String,
        required: true,
    },
    newMessage: {
        type: Boolean,
        required: true,
    },
    attachments: {
        path: { type: String },
        mime_type: { type: String },
        caption: { type: String },
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    chatBy: {
        type: String,
    },
    mamid: {
        type: String,
    }
}, { timestamps: true })

const MessagesModel = mongoose.models.Messages || mongoose.model("Messages", messageSchema)
export default MessagesModel;