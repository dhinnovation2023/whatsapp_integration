import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export async function getNoStatusContactsCount() {
    return new Promise<number>(async (resolve, reject) => {
        try {
            await dbConnect();
            const [{ count }] = await ContactsModel.aggregate(
                [
                    {
                        $match: {
                            $or: [
                                {
                                    statusId: {
                                        $exists: false,
                                    },
                                },
                                {
                                    statusId: null,
                                }
                            ],
                        },
                    },
                    {
                        $count: "count",
                    }
                ]
            ) as [{ count: number }]

            return resolve(count);

        } catch (err) {
            return reject(err);
        }
    })
}