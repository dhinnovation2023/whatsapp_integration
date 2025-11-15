import { AddStatusApiRouteRequestData } from "@/app/api/status/add/route";
import { dbConnect } from "@/config/dbConfig";
import StatusModel from "@/models/status";
import { v4 as uuid } from "uuid";

export async function addNewStatus(data: AddStatusApiRouteRequestData) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();
            const statusId = uuid();

            const nameExist = await StatusModel.findOne({ name: data.name });

            if (nameExist) {
                throw new Error("Status name already exist!");
            }

            const newStatus = new StatusModel({
                ...data,
                statusId,
            });

            await newStatus.save();
            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}