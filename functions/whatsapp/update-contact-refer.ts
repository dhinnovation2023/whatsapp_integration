import { dbConnect } from "@/config/dbConfig";
import ContactsModel, { ContactReferSource } from "@/models/contacts";

export async function updateContactRefer({
    phone,
    referSource,
}: {
    phone: string,
    referSource: ContactReferSource,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            const updatedContact = await ContactsModel.findOneAndUpdate(
                { phone },
                [
                    {
                        $set: {
                            referSource: {
                                $cond: [
                                    {
                                        $or: [
                                            { $eq: ["$referSource", []] },
                                            { $eq: ["$referSource", null] }
                                        ]
                                    },
                                    [referSource],
                                    { $setUnion: ["$referSource", [referSource]] },
                                ]
                            }
                        }
                    }
                ],
                {
                    new: true,
                }
            );

            console.log(updatedContact);
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}