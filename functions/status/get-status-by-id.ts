import { dbConnect } from "@/config/dbConfig";
import StatusModel, { StatusModelInterface } from "@/models/status";

export async function getOneStatusById(statusId: string) {
    return new Promise<StatusModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const status = await StatusModel.findOne({ statusId });
            return resolve(status);
        } catch (err) {
            return reject(err);
        }
    })
}