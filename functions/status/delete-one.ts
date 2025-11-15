import { dbConnect } from "@/config/dbConfig";
import StatusModel from "@/models/status";

export async function deleteOneStatus(statusId: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await StatusModel.findOneAndDelete({ statusId });
            return resolve();
        } catch (err) {
            return reject(err);
        }
    })
}