import { bucket } from "@/config/firebase";
import { handleCatchBlock } from "../common";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { saveMessageToDB } from "./saveMessage";

export async function saveFileToFirebase({
    fileId,
    mime_type,
    phone,
}: {
    fileId: string,
    mime_type: string,
    phone: string,
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
                    role: "client",
                    timestamp: "gjdgkjhfg",
                    attachments: {
                        path: pathname,
                        mime_type,
                    },
                }
            })

            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}