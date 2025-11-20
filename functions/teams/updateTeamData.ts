import { UpdateTeamDataApiRouteRequestDataInterface } from "@/app/api/teams/update/route";
import { dbConnect } from "@/config/dbConfig";
import TeamMemberModel from "@/models/team-member";
import { generateHashFromValue } from "../bcrypt";

export async function updateTeamData({ userId, password, ...details }: UpdateTeamDataApiRouteRequestDataInterface) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await dbConnect();

            let newHashPassword: string | undefined;

            if (password) {
                newHashPassword = await generateHashFromValue(password);
            }

            await TeamMemberModel.findOneAndUpdate(
                { userId },
                {
                    ...details,
                    password: newHashPassword,
                }
            )

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}