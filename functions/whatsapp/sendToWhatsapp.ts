import { handleCatchBlock } from "../common";
import { createBot } from "@awadoc/whatsapp-cloud-api";

export async function sendTextToWhatsapp({
    phone,
    text,
}: {
    text: string,
    phone: string,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

            if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
                throw new Error("WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID is required!");
            }

            const bot = createBot(PHONE_NUMBER_ID, ACCESS_TOKEN);
            const result = await bot.sendText(phone, text);

            return resolve(result.messageId);

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}

export async function sendFileToWhatsapp({ filrebaseFileUrl, phone }: {
    filrebaseFileUrl: string,
    phone: string,
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {

            const PRODUCTION_BASE_URL = process.env.PRODUCTION_BASE_URL;
            
            if (!PRODUCTION_BASE_URL) {
                throw new Error("PRODUCTION_BASE_URL is required in .env file.")
            }

            const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

            if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
                throw new Error("WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID is required!");
            }

            const fileUrl = `${PRODUCTION_BASE_URL}/api/whatsapp/fetch-files/${encodeURIComponent(filrebaseFileUrl)}`;

            const bot = createBot(PHONE_NUMBER_ID, ACCESS_TOKEN);
            const result = await bot.sendDocument(
                phone, 
                fileUrl,
            );

            return resolve(result.messageId);

        } catch (err) {
            return reject(err);
        }
    })
}