import { handleCatchBlock } from "../common";
import { createBot } from "@awadoc/whatsapp-cloud-api";

export async function sendTextToWhatsapp({
    phone,
    text,
}: {
    text: string,
    phone: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

            if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
                throw new Error("WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID is required!");
            }

            const bot = createBot(PHONE_NUMBER_ID, ACCESS_TOKEN);
            await bot.sendText(phone, text);

            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}