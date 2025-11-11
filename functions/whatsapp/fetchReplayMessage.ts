import { FetchReplayMessageApiRouteMessage } from "@/app/api/whatsapp/fetch-replay-message/route";
import { dbConnect } from "@/config/dbConfig";
import MessagesModel, { MessagesModelInterface } from "@/models/messages";

export async function fetchReplayMessage({
    wamid
}: FetchReplayMessageApiRouteMessage) {
    return new Promise<MessagesModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const replayMessage = await MessagesModel.findOne({ wamid });
            return resolve(replayMessage);
        } catch (err) {
            return reject(err);
        }
    })
}