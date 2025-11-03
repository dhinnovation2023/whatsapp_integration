import { dbConnect } from "@/config/dbConfig";
import MessagesModel, { MessagesModelInterface } from "@/models/messages";

export async function fetchMessageByPhone({ phone }: {
    phone: string,
}) {
    return new Promise<MessagesModelInterface[]>(async (resolve, reject) => {
        try {

            await dbConnect();

            const message = MessagesModel.find({
                phone,
            })

            return resolve(message);

        } catch (err) {
            return reject(err);
        }
    })
}