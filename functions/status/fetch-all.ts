import { dbConnect } from "@/config/dbConfig";
import StatusModel, { StatusModelInterface } from "@/models/status";

export interface FetchAllStatusFilterInterface {
    currentPage?: number,
}

export async function fetchAllStatus({
    currentPage,
}: FetchAllStatusFilterInterface) {
    return new Promise<StatusModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            let limit;
            let skip;

            if (currentPage) {
                limit = 10;
                skip = (currentPage - 1) * limit;
            }

            const statusList = await StatusModel.find({}, null, { limit, skip });

            return resolve(statusList);

        } catch (err) {
            return reject(err);
        }
    })
}