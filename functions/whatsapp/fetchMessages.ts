import { dbConnect } from "@/config/dbConfig";
import MessagesModel, { MessagesModelInterface } from "@/models/messages";

export async function fetchMessageByPhone({ phone, currentPage }: {
    phone: string,
    currentPage: number,
}) {
    return new Promise<MessagesModelInterface[]>(async (resolve, reject) => {
        try {

            await dbConnect();

            const LIMIT = 20;
            const skip = (currentPage - 1) * LIMIT;

            const message = MessagesModel.find({
                phone,
            }, null, {
                limit: LIMIT,
                skip,
                sort: {
                    createdAt: -1,
                }
            })

            return resolve(message);

        } catch (err) {
            return reject(err);
        }
    })
}