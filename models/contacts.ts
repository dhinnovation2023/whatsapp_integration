import mongoose from "mongoose";

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

const ContactsModel = mongoose.models.ContactModels || mongoose.model("Contacts", contactsSchema);
export default ContactsModel;