import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export interface UpdateAssignedRequestData {
    userId: string,
    phone: string,
}

export async function updateAssigned({
    phone,
    userId,
}: UpdateAssignedRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            await ContactsModel.findOneAndUpdate({ phone }, {
                assigned: userId,
            })

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}