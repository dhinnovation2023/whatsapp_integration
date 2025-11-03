import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "../common"
import { ChatRole } from "@/layouts/chatbot-layout/chat-interface/chat-history";
import MessagesModel from "@/models/messages";

export interface NewMessageDataInterface {
    role: ChatRole,
    number: string,
    message?: string,
    timestamp: string,
}

export async function saveMessageToDB({ data }: {
    data: NewMessageDataInterface,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            const newMessage = new MessagesModel({
                ...data,
            })

            await newMessage.save();
            console.log("Message saved...");

            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            reject(message);
        }
    })
}