import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export async function makeContactUnread({ phone }: {
    phone: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const contact = await ContactsModel.findOneAndUpdate(
                { phone },
                {
                    $set: {
                        unread: {
                            $add: [
                                { $ifNull: ["$unread", 1] },
                                1,
                            ]
                        }
                    }
                }
            )

            console.log("unread updated:", contact);

            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}