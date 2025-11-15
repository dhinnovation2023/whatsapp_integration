import { UpdateTeamDataApiRouteRequestDataInterface } from "@/app/api/teams/update/route";
import { dbConnect } from "@/config/dbConfig";
import TeamMemberModel from "@/models/team-member";

export async function updateTeamData({ userId, ...details }: UpdateTeamDataApiRouteRequestDataInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            await TeamMemberModel.findOneAndUpdate(
                { userId },
                { ...details }
            )

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}