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

            await ContactsModel.findOneAndUpdate(
                { phone },
                [
                    {
                        $set: {
                            referSource: {
                                $let: {
                                    vars: {
                                        current: { $ifNull: ["$referSource", []] }
                                    },
                                    in: {
                                        $cond: [
                                            { $eq: ["$$current", []] },
                                            [referSource],
                                            { $setUnion: ["$$current", [referSource]] }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                ],
                { new: true }
            );

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}