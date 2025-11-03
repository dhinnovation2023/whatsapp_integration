import { ChatRole } from "@/layouts/chatbot-layout/chat-interface/chat-history";
import mongoose from "mongoose";

export interface MessagesModelInterface {
    role: ChatRole,
    number: string,
    message?: string,
    timestamp: string,
    isNew: boolean,
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
})

const MessagesModel = mongoose.models.Messages || mongoose.model("Messages", messageSchema)
export default MessagesModel;