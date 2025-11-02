import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    number: {
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
})

const MessagesModel = mongoose.models.Messages || mongoose.model("Messages", messageSchema)
export default MessagesModel;