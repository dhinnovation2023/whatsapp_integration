import mongoose from "mongoose";

export interface ContactsModelInterface {
    name: string,
    phone: string,
    assigned?: string,
    unread?: number | null,
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
    }
}, { timestamps: true })

const ContactsModel = mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema);
export default ContactsModel;