import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export interface UpdateContactNameRequestData {
    phone: string,
    newName: string,
}

export async function updateContactName({
    newName,
    phone,
}: UpdateContactNameRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();
            await ContactsModel.findOneAndUpdate(
                { phone },
                { name: newName },
            );

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}