import { ChangeContactStatusRequestDataInterface } from "@/app/api/whatsapp/update-status/route";
import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export async function changeContactStatus(data: ChangeContactStatusRequestDataInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await ContactsModel.findOneAndUpdate(
                { phone: data.phone },
                { statusId: data.statusId }
            )

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}