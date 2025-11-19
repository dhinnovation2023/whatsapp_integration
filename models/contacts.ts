import mongoose from "mongoose";

export interface ContactsModelInterface {
    name: string,
    phone: string,
    assigned?: string,
    unread?: number | null,
    statusId?: string,
    createdAt: Date,
    updatedAt: Date,
} 

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    assigned: {
        type: String,
    },
    unread: {
        type: Number,
    },
    statusId: {
        type: String,
    }
}, { timestamps: true })

const ContactsModel = mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema);
export default ContactsModel;