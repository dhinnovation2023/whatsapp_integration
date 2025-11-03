import mongoose from "mongoose";

export interface ContactsModelInterface {
    name: string,
    phone: string,
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
}, { timestamps: true })

const ContactsModel = mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema);
export default ContactsModel;