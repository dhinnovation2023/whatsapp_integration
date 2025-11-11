import { dbConnect } from "@/config/dbConfig";
import MessagesModel, { MessagesModelInterface } from "@/models/messages";

export async function fetchLastChatByPhone({
    phone,
}: {
    phone: string,
}) {
    return new Promise<MessagesModelInterface>(async (resolve, reject) => {
        try {

            await dbConnect();

            const lastChat = await MessagesModel.findOne({ phone }, null, {
                sort: {
                    _id: -1,
                }
            }) as MessagesModelInterface;

            return resolve(lastChat);

        } catch (err) {
            return reject(err);
        }
    })
}