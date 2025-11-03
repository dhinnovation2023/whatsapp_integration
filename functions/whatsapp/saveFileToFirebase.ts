import { handleCatchBlock } from "../common";
import axios from "axios";

export async function saveFileToFirebase({ fileId }: {
    fileId: string,
    mime_type: string,
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

            console.log(metaRes);
            
            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}