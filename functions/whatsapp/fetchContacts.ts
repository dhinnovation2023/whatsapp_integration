import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "../common"
import ContactsModel, { ContactsModelInterface } from "@/models/contacts";

export async function fetchAllContacts () {
    return new Promise<ContactsModelInterface[]>(async (resolve, reject) => {
        try {

            await dbConnect();
            const contacts = await ContactsModel.find();
            return resolve(contacts);

        } catch (err) {
            const message = handleCatchBlock(err);
            reject(message);
        }
    })
}