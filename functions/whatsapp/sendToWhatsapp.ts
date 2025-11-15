import { handleCatchBlock } from "../common";
import { createBot } from "@awadoc/whatsapp-cloud-api";
import axios from "axios";
import { v4 as uuid } from "uuid";

export async function sendTextToWhatsapp({
    phone,
    text,
    context,
}: {
    text: string,
    phone: string,
    context?: {
        wamid: string,
    }
}) {
    return new Promise<{
        wamid: string,
        context?: {
            wamid: string,
        }
    }>(async (resolve, reject) => {
        try {

            const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

            if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
                throw new Error("WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID is required!");
            }

            if (context) {
                const wamid = await sendToWhatsappWithReplayMessage({
                    ACCESS_TOKEN,
                    PHONE_NUMBER_ID,
                    phone,
                    message: {
                        text,
                        context,
                    },
                })

                return resolve({
                    wamid,
                    context,
                })

            }

            const bot = createBot(PHONE_NUMBER_ID, ACCESS_TOKEN);
            const result = await bot.sendText(phone, text);

            return resolve({
                wamid: result.messageId,
            });

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}

export async function sendFileToWhatsapp({ filrebaseFileUrl, phone, context }: {
    filrebaseFileUrl: string,
    phone: string,
    context?: {
        wamid: string,
    },
}) {
    return new Promise<{
        wamid: string,
        context?: { wamid: string },
    }>(async (resolve, reject) => {
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
            if (context) {
                const wamid = await sendToWhatsappWithReplayMessage({
                    ACCESS_TOKEN,
                    PHONE_NUMBER_ID,
                    phone,
                    message: {
                        context,
                        fileUrl,
                    },
                })

                return resolve({ wamid, context })

            }

            const bot = createBot(PHONE_NUMBER_ID, ACCESS_TOKEN);
            const result = await bot.sendDocument(
                phone,
                fileUrl,
            );

            return resolve({ wamid: result.messageId });

        } catch (err) {
            return reject(err);
        }
    })
}

function sendToWhatsappWithReplayMessage({
    ACCESS_TOKEN,
    PHONE_NUMBER_ID,
    message,
    phone,
}: {
    ACCESS_TOKEN: string,
    PHONE_NUMBER_ID: string,
    phone: string,
    message: {
        text?: string,
        fileUrl?: string,
        context: {
            wamid: string,
        },
    }
}) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const facebookUrl = `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`;
            const requestConfig = {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
            const requestData: {
                messaging_product: string,
                to: string,
                context: {
                    message_id: string,
                },
                type: "text" | "document",
                text?: {
                    body: string,
                },
                document?: {
                    link: string,
                    filename: string,
                },
            } = {
                messaging_product: "whatsapp",
                to: phone,
                type: "text",
                context: {
                    message_id: message.context.wamid,
                },
                text: undefined,
                document: undefined,
            }

            if (message.text) {
                requestData["type"] = "text";
                requestData["text"] = {
                    body: message.text,
                }
            } else if (message.fileUrl) {
                requestData["type"] = "document";
                requestData["document"] = {
                    link: message.fileUrl,
                    filename: uuid(),
                }
            }

            const response = await axios.post<{
                messaging_product: string,
                contacts: {
                    input: string,
                    wa_id: string,
                }[],
                messages: {
                    id: string,
                }[]
            }>(
                facebookUrl,
                requestData,
                requestConfig,
            )

            const wamid = response.data.messages[0].id;

            if (!wamid) {
                throw new Error("wamid not found in response.");
            }

            return resolve(wamid);

        } catch (err) {
            return reject(err);
        }
    })
}