import { UpdateStatusApiRouteRequestData } from "@/app/api/status/update/route";
import { dbConnect } from "@/config/dbConfig";
import StatusModel from "@/models/status";

export async function updateOneStatus(data: UpdateStatusApiRouteRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            await StatusModel.findOneAndUpdate(
                { statusId: data.statusId },
                { ...data },
            );

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}