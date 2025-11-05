import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export async function makeContactRead({ phone }: {
    phone: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();
            await ContactsModel.findOneAndUpdate(
                {
                    phone,
                    unread: { $ne: null }
                },
                {
                    unread: null,
                }
            )

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}