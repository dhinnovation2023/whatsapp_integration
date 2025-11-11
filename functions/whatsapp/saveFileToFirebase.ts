import { bucket } from "@/config/firebase";
import { handleCatchBlock } from "../common";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { saveMessageToDB } from "./saveMessage";
import { ChatRole } from "@/layouts/chatbot-layout/chat-interface/chat-history";

async function SaveFileToDatabase({
    buffer,
    chatRole,
    mime_type,
    phone,
    timestamp,
    caption,
    wamid,
}: {
    buffer: Buffer,
    mime_type: string,
    phone: string,
    chatRole: ChatRole,
    timestamp: string,
    caption?: string,
    wamid?: string,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            const filename = uuid();
            const pathname = `whatsapp/${filename}`;

            const file = bucket.file(pathname);

            await file.save(
                buffer,
                {
                    metadata: {
                        contentType: mime_type,
                    }
                }
            )

            await saveMessageToDB({
                data: {
                    newMessage: true,
                    phone,
                    role: chatRole,
                    timestamp,
                    attachments: {
                        path: pathname,
                        mime_type,
                        caption,
                    },
                    wamid,
                }
            })

            return resolve(pathname);

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}

export async function saveWhatsappFileToFirebase({
    fileId,
    mime_type,
    phone,
    timestamp,
    caption,
    wamid,
}: {
    fileId: string,
    mime_type: string,
    phone: string,
    timestamp: string,
    caption?: string,
    wamid?: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

            if (!WHATSAPP_ACCESS_TOKEN || !PHONE_NUMBER_ID) {
                throw new Error("WHATSAPP_ACCESS_TOKEN and PHONE_NUMBER_ID isrequired.");
            }

            const metaRes = await axios.get(
                `https://graph.facebook.com/v20.0/${fileId}`,
                {
                    headers: {
                        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                    }
                }
            );

            const fileUrl = metaRes.data.url as string;

            const fileRes = await axios.get(fileUrl, {
                responseType: "arraybuffer",
                headers: { Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}` },
            })

            const buffer = Buffer.from(fileRes.data);

            await SaveFileToDatabase({
                buffer,
                chatRole: "client",
                mime_type,
                phone,
                timestamp,
                caption,
                wamid,
            })

            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}

export async function saveLocalFileToFirebase(props: {
    file: File,
    phone: string,
    mime_type: string,
    chatRole: ChatRole,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            const arrayBuffer = await props.file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer);

            const timestamp = Date.now();

            const pathname = await SaveFileToDatabase({
                buffer,
                chatRole: props.chatRole,
                mime_type: props.mime_type,
                phone: props.phone,
                timestamp: `${timestamp}`,
            })

            return resolve(pathname);

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}