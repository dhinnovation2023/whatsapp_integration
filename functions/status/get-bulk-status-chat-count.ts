import { dbConnect } from "@/config/dbConfig";
import ContactsModel from "@/models/contacts";

export interface BulkStatusChatCountResponseInterface {
    statusId: string,
    count: number,
}

export async function getBulkStatusChatCount({ statusIdList }: {
    statusIdList: string[],
}) {
    return new Promise<BulkStatusChatCountResponseInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            const result = await ContactsModel.aggregate(
                [
                    {
                        $match: {
                            statusId: {
                                $in: statusIdList,
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$statusId",
                            count: {
                                $sum: 1,
                            },
                        },
                    },
                ]
            ) as {
                _id: string,
                count: number,
            }[];

            const statusCountList: BulkStatusChatCountResponseInterface[] = result.map((statusItem) => ({
                statusId: statusItem._id,
                count: statusItem.count,
            }));

            return resolve(statusCountList);

        } catch (err) {
            reject(err);
        }
    })
}