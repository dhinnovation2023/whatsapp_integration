import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "../common"
import { ChatRole } from "@/layouts/chatbot-layout/chat-interface/chat-history";
import MessagesModel from "@/models/messages";
import { getServerSession } from "next-auth";

export interface NewMessageDataInterface {
    role: ChatRole,
    phone: string,
    timestamp: string,
    newMessage: boolean,
    message?: string,
    attachments?: {
        path: string,
        mime_type: string,
        caption?: string,
    },
    location?: {
        latitude: number,
        longitude: number,
    }
}

export async function saveMessageToDB({ data }: {
    data: NewMessageDataInterface,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const session = await getServerSession();

            if (data.role === "team") {
                if (!session || !session.user?.name) {
                    throw new Error("User not authorized!");
                }
            }

            await dbConnect();

            const newMessage = new MessagesModel({
                ...data,
                chatBy: data.role === "team" ? session?.user?.name : undefined,
            })

            await newMessage.save();
            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            reject(message);
        }
    })
}