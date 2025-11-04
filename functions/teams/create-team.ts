import { ApiRouteRequestDataTeamCreate } from "@/app/api/teams/create/route";
import { handleCatchBlock } from "../common";
import { generateHashFromValue } from "../bcrypt";
import { dbConnect } from "@/config/dbConfig";
import TeamMemberModel, { TeamMembersModelInterface } from "@/models/team-member";
import { v4 as uuid } from "uuid";

export async function createTeamMember(data: ApiRouteRequestDataTeamCreate) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();

            const userExist = await TeamMemberModel.findOne({ email: data.email });

            if (userExist) {
                throw new Error("Email already exist")
            }

            const userId = uuid();
            const hashPassword = await generateHashFromValue(data.password);

            const newTeamMember = new TeamMemberModel<TeamMembersModelInterface>({
                name: data.name,
                userId: userId,
                email: data.email,
                password: hashPassword,
            });

            await newTeamMember.save();
            return resolve();

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}